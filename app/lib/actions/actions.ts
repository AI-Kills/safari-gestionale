"use server";

import { PrismaClient } from '@prisma/client';
import { signIn, signOut } from "../../../auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from 'next/cache';
import type { 
  Cliente as ClienteType, 
  Fornitore as FornitoreType, 
  Destinazione as DestinazioneType, 
  Banca as BancaType,
  Preventivo as PreventivoType,
  ServizioATerra as ServiziATerraType,
  Volo as VoloType,
  Assicurazione as AssicurazioneType
} from '../definitions';
import {
  userSchema,
  createUserSchema,
  updateUserSchema,
  clienteSchema,
  createClienteSchema,
  updateClienteSchema,
  fornitoreSchema,
  createFornitoreSchema,
  updateFornitoreSchema,
  destinazioneSchema,
  createDestinazioneSchema,
  updateDestinazioneSchema,
  bancaSchema,
  createBancaSchema,
  updateBancaSchema,
  preventivoSchema,
  createPreventivoSchema,
  updatePreventivoSchema,
  serviziATerraSchema,
  createServiziATerraSchema,
  updateServiziATerraSchema,
  voloSchema,
  createVoloSchema,
  updateVoloSchema,
  assicurazioneSchema,
  createAssicurazioneSchema,
  updateAssicurazioneSchema,
  preventivoAlClienteSchema,
  createPreventivoAlClienteSchema,
  updatePreventivoAlClienteSchema,
  preventivoAlClienteRowSchema,
  createPreventivoAlClienteRowSchema,
  updatePreventivoAlClienteRowSchema
} from './entity-zod-schemas';

const prisma = new PrismaClient();

export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  errors?: Array<{
    code: string
    message: string
    path?: string[]
  }>
}

export type DBResult<T = any> = {
  success: boolean
  values?: T
  errors?: Record<string, string>
  errorsMessage?: string
}

export type State<T = any> = {
  errors?: T
  message?: string
}

// Helper function for validation errors
function handleValidationErrors(zodError: any): ApiResponse {
  return {
    success: false,
    errors: zodError.issues.map((issue: any) => ({
      code: issue.code,
      message: issue.message,
      path: issue.path.map(String).map(String)
    }))
  };
}

// Helper function for error handling
function handlePrismaError(error: any): ApiResponse {
  console.error('Prisma error:', error);
  
  if (error.code === 'P2002') {
    return {
      success: false,
      error: 'Record già esistente con questi dati unici'
    };
  }
  
  if (error.code === 'P2025') {
    return {
      success: false,
      error: 'Record non trovato'
    };
  }
  
  return {
    success: false,
    error: 'Errore del database'
  };
}

// ============================================================================
// AUTH ACTIONS
// ============================================================================

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut();
}

// Alias per compatibilità
export const _signOut = signOutAction;

// ============================================================================
// USER ACTIONS
// ============================================================================

export async function createUser(data: any): Promise<ApiResponse> {
  try {
    const validatedData = createUserSchema.safeParse(data);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);
    
    const user = await prisma.user.create({
      data: {
        email: validatedData.data.email,
        password: hashedPassword
      }
    });

    revalidatePath('/dashboard');
    return { success: true, data: user as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllUsers(): Promise<any[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: { email: 'asc' }
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function updateUser(data: any): Promise<ApiResponse> {
  try {
    const validatedData = updateUserSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const updateData: any = { ...validatedData.data };
    delete updateData.id;

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await prisma.user.update({
      where: { id: validatedData.data.id },
      data: updateData
    });

    revalidatePath('/dashboard');
    return { success: true, data: user as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteUser(id: string): Promise<ApiResponse> {
  try {
    await prisma.user.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ============================================================================
// CLIENT ACTIONS
// ============================================================================

export async function createCliente(data: any): Promise<ApiResponse> {
  try {
    const validatedData = createClienteSchema.safeParse(data);
    if (!validatedData.success) {
      // Creo un oggetto con chiavi-valori per gli errori
      const errorMap: { [key: string]: string[] } = {};
      validatedData.error.issues.forEach(issue => {
        const key = issue.path.join('.');
        if (!errorMap[key]) {
          errorMap[key] = [];
        }
        errorMap[key].push(issue.message);
      });
      
      return {
        success: false,
        errors: errorMap
      };
    }

    const cliente = await prisma.cliente.create({
      data: validatedData.data as any
    });

    revalidatePath('/dashboard/clienti-table');
    return { success: true, data: cliente as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllClienti(): Promise<any[]> {
  try {
    const clienti = await prisma.cliente.findMany({
      orderBy: [
        { cognome: 'asc' },
        { nome: 'asc' }
      ]
    });
    return clienti as any;
  } catch (error) {
    console.error('Error fetching clienti:', error);
    return [];
  }
}

export async function getCliente(id: string): Promise<any | null> {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id }
    });
    return cliente as any;
  } catch (error) {
    console.error('Error fetching cliente:', error);
    return null;
  }
}

export async function updateCliente(data: any): Promise<ApiResponse<ClienteType>> {
  try {
    const validatedData = updateClienteSchema.safeParse(data);
    if (!validatedData.success) {
      // Creo un oggetto con chiavi-valori per gli errori
      const errorMap: { [key: string]: string[] } = {};
      validatedData.error.issues.forEach(issue => {
        const key = issue.path.join('.');
        if (!errorMap[key]) {
          errorMap[key] = [];
        }
        errorMap[key].push(issue.message);
      });
      
      return {
        success: false,
        errors: errorMap
      };
    }

    const updateData: any = { ...validatedData.data };
    delete updateData.id;

    const cliente = await prisma.cliente.update({
      where: { id: validatedData.data.id },
      data: updateData
    });

    revalidatePath('/dashboard/clienti-table');
    return { success: true, data: cliente as any as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteCliente(id: string): Promise<ApiResponse> {
  try {
    await prisma.cliente.delete({
      where: { id }
    });

    revalidatePath('/dashboard/clienti-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ============================================================================
// FORNITORE ACTIONS
// ============================================================================

export async function createFornitore(data: any): Promise<ApiResponse<FornitoreType>> {
  try {
    const validatedData = createFornitoreSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const fornitore = await prisma.fornitore.create({
      data: validatedData.data as any
    });

    revalidatePath('/dashboard');
    return { success: true, data: fornitore as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllFornitori(): Promise<FornitoreType[]> {
  try {
    const fornitori = await prisma.fornitore.findMany({
      orderBy: { nome: 'asc' }
    });
    return fornitori;
  } catch (error) {
    console.error('Error fetching fornitori:', error);
    return [];
  }
}

export async function updateFornitore(data: any): Promise<ApiResponse<FornitoreType>> {
  try {
    const validatedData = updateFornitoreSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const updateData: any = { ...validatedData.data };
    delete updateData.id;

    const fornitore = await prisma.fornitore.update({
      where: { id: validatedData.data.id },
      data: updateData
    });

    revalidatePath('/dashboard');
    return { success: true, data: fornitore as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteFornitore(id: string): Promise<ApiResponse> {
  try {
    await prisma.fornitore.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ============================================================================
// DESTINAZIONE ACTIONS
// ============================================================================

export async function createDestinazione(data: any): Promise<ApiResponse<DestinazioneType>> {
  try {
    const validatedData = createDestinazioneSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const destinazione = await prisma.destinazione.create({
      data: validatedData.data as any
    });

    revalidatePath('/dashboard');
    return { success: true, data: destinazione as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllDestinazioni(): Promise<DestinazioneType[]> {
  try {
    const destinazioni = await prisma.destinazione.findMany({
      orderBy: { nome: 'asc' }
    });
    return destinazioni;
  } catch (error) {
    console.error('Error fetching destinazioni:', error);
    return [];
  }
}

export async function updateDestinazione(data: any): Promise<ApiResponse<DestinazioneType>> {
  try {
    const validatedData = updateDestinazioneSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const updateData: any = { ...validatedData.data };
    delete updateData.id;

    const destinazione = await prisma.destinazione.update({
      where: { id: validatedData.data.id },
      data: updateData
    });

    revalidatePath('/dashboard');
    return { success: true, data: destinazione as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteDestinazione(id: string): Promise<ApiResponse> {
  try {
    await prisma.destinazione.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ============================================================================
// BANCA ACTIONS
// ============================================================================

export async function createBanca(data: any): Promise<ApiResponse<BancaType>> {
  try {
    const validatedData = createBancaSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const banca = await prisma.banca.create({
      data: validatedData.data as any
    });

    revalidatePath('/dashboard');
    return { success: true, data: banca as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllBanche(): Promise<BancaType[]> {
  try {
    const banche = await prisma.banca.findMany({
      orderBy: { nome: 'asc' }
    });
    return banche;
  } catch (error) {
    console.error('Error fetching banche:', error);
    return [];
  }
}

export async function updateBanca(data: any): Promise<ApiResponse<BancaType>> {
  try {
    const validatedData = updateBancaSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const updateData: any = { ...validatedData.data };
    delete updateData.id;

    const banca = await prisma.banca.update({
      where: { id: validatedData.data.id },
      data: updateData
    });

    revalidatePath('/dashboard');
    return { success: true, data: banca as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteBanca(id: string): Promise<ApiResponse> {
  try {
    await prisma.banca.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ============================================================================
// PREVENTIVO ACTIONS
// ============================================================================

export async function createPreventivo(data: any): Promise<ApiResponse<PreventivoType>> {
  try {
    const validatedData = createPreventivoSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const preventivo = await prisma.preventivo.create({
      data: validatedData.data as any
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: preventivo as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllPreventivi(): Promise<PreventivoType[]> {
  try {
    const preventivi = await prisma.preventivo.findMany({
      orderBy: { data: 'desc' },
      include: {
        cliente: true
      }
    });
    return preventivi as any;
  } catch (error) {
    console.error('Error fetching preventivi:', error);
    return [];
  }
}

export async function getPreventivo(id: string): Promise<any | null> {
  try {
    const preventivo = await prisma.preventivo.findUnique({
      where: { id },
      include: {
        cliente: true,
        serviziATerra: {
          include: {
            fornitore: true,
            destinazione: true
          }
        },
        voli: {
          include: {
            fornitore: true
          }
        },
        assicurazioni: {
          include: {
            fornitore: true
          }
        },
        preventiviAlCliente: {
          include: {
            rows: true
          }
        }
      }
    });
    return preventivo;
  } catch (error) {
    console.error('Error fetching preventivo completo:', error);
    return null;
  }
}

export async function updatePreventivo(data: any): Promise<ApiResponse<PreventivoType>> {
  try {
    const validatedData = updatePreventivoSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const updateData: any = { ...validatedData.data };
    delete updateData.id;

    const preventivo = await prisma.preventivo.update({
      where: { id: validatedData.data.id },
      data: updateData
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: preventivo as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deletePreventivo(id: string): Promise<ApiResponse> {
  try {
    // Delete related records first due to foreign key constraints
    await prisma.$transaction(async (tx) => {
      await tx.preventivoAlClienteRow.deleteMany({
        where: {
          preventivoAlCliente: {
            id_preventivo: id
          }
        }
      });
      
      await tx.preventivoAlCliente.deleteMany({
        where: { id_preventivo: id }
      });
      
      await tx.assicurazione.deleteMany({
        where: { id_preventivo: id }
      });
      
      await tx.volo.deleteMany({
        where: { id_preventivo: id }
      });
      
      await tx.serviziATerra.deleteMany({
        where: { id_preventivo: id }
      });
      
      await tx.preventivo.delete({
        where: { id }
      });
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ============================================================================
// SERVIZI A TERRA ACTIONS
// ============================================================================

export async function createServiziATerra(data: any): Promise<ApiResponse<ServiziATerraType>> {
  try {
    const validatedData = createServiziATerraSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const servizio = await prisma.serviziATerra.create({
      data: validatedData.data as any
    });

    revalidatePath('/dashboard');
    return { success: true, data: servizio as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function updateServiziATerra(data: any): Promise<ApiResponse<ServiziATerraType>> {
  try {
    const validatedData = updateServiziATerraSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const updateData: any = { ...validatedData.data };
    delete updateData.id;

    const servizio = await prisma.serviziATerra.update({
      where: { id: validatedData.data.id },
      data: updateData
    });

    revalidatePath('/dashboard');
    return { success: true, data: servizio as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteServiziATerra(id: string): Promise<ApiResponse> {
  try {
    await prisma.serviziATerra.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ============================================================================
// VOLO ACTIONS
// ============================================================================

export async function createVolo(data: any): Promise<ApiResponse<VoloType>> {
  try {
    const validatedData = createVoloSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const volo = await prisma.volo.create({
      data: validatedData.data as any
    });

    revalidatePath('/dashboard');
    return { success: true, data: volo as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function updateVolo(data: any): Promise<ApiResponse<VoloType>> {
  try {
    const validatedData = updateVoloSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const updateData: any = { ...validatedData.data };
    delete updateData.id;

    const volo = await prisma.volo.update({
      where: { id: validatedData.data.id },
      data: updateData
    });

    revalidatePath('/dashboard');
    return { success: true, data: volo as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteVolo(id: string): Promise<ApiResponse> {
  try {
    await prisma.volo.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ============================================================================
// ASSICURAZIONE ACTIONS
// ============================================================================

export async function createAssicurazione(data: any): Promise<ApiResponse<AssicurazioneType>> {
  try {
    const validatedData = createAssicurazioneSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const assicurazione = await prisma.assicurazione.create({
      data: validatedData.data as any
    });

    revalidatePath('/dashboard');
    return { success: true, data: assicurazione as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function updateAssicurazione(data: any): Promise<ApiResponse<AssicurazioneType>> {
  try {
    const validatedData = updateAssicurazioneSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          code: issue.code,
          message: issue.message,
          path: issue.path.map(String)
        }))
      };
    }

    const updateData: any = { ...validatedData.data };
    delete updateData.id;

    const assicurazione = await prisma.assicurazione.update({
      where: { id: validatedData.data.id },
      data: updateData
    });

    revalidatePath('/dashboard');
    return { success: true, data: assicurazione as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteAssicurazione(id: string): Promise<ApiResponse> {
  try {
    await prisma.assicurazione.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export async function getClienteByEmail(email: string): Promise<ClienteType | null> {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email }
    });
    return cliente as any;
  } catch (error) {
    console.error('Error fetching cliente by email:', error);
    return null;
  }
}

export async function getPreventiviByCliente(clienteId: string): Promise<PreventivoType[]> {
  try {
    const preventivi = await prisma.preventivo.findMany({
      where: { id_cliente: clienteId },
      orderBy: { data: 'desc' }
    });
    return preventivi as any;
  } catch (error) {
    console.error('Error fetching preventivi by cliente:', error);
    return [];
  }
}

export async function getFornitoreByNome(nome: string): Promise<FornitoreType | null> {
  try {
    const fornitore = await prisma.fornitore.findUnique({
      where: { nome }
    });
    return fornitore;
  } catch (error) {
    console.error('Error fetching fornitore by nome:', error);
    return null;
  }
}

export async function getDestinazioneByNome(nome: string): Promise<DestinazioneType | null> {
  try {
    const destinazione = await prisma.destinazione.findUnique({
      where: { nome }
    });
    return destinazione;
  } catch (error) {
    console.error('Error fetching destinazione by nome:', error);
    return null;
  }
}

// ============================================================================
// SEARCH AND UTILITY FUNCTIONS
// ============================================================================

export async function searchClienti(clienteData: any): Promise<ClienteType[]> {
  try {
    // Costruisco le condizioni di ricerca basate sui campi forniti
    const whereConditions: any[] = [];
    
    if (clienteData.nome) {
      whereConditions.push({ nome: { contains: clienteData.nome, mode: 'insensitive' } });
    }
    if (clienteData.cognome) {
      whereConditions.push({ cognome: { contains: clienteData.cognome, mode: 'insensitive' } });
    }
    if (clienteData.email) {
      whereConditions.push({ email: { contains: clienteData.email, mode: 'insensitive' } });
    }
    if (clienteData.tel) {
      whereConditions.push({ tel: { contains: clienteData.tel, mode: 'insensitive' } });
    }
    if (clienteData.cf) {
      whereConditions.push({ cf: { contains: clienteData.cf, mode: 'insensitive' } });
    }
    
    // Se non ci sono condizioni di ricerca, restituisco array vuoto
    if (whereConditions.length === 0) {
      return [];
    }

    const clienti = await prisma.cliente.findMany({
      where: {
        OR: whereConditions
      },
      orderBy: [
        { cognome: 'asc' },
        { nome: 'asc' }
      ]
    });
    return clienti as any;
  } catch (error) {
    console.error('Error searching clienti:', error);
    return [];
  }
}

export async function getDestinazioneById(id: string): Promise<ApiResponse<DestinazioneType>> {
  try {
    const destinazione = await prisma.destinazione.findUnique({
      where: { id }
    });
    
    if (!destinazione) {
      return {
        success: false,
        error: 'Destinazione non trovata'
      };
    }
    
    return { success: true, data: destinazione as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getFornitoreById(id: string): Promise<ApiResponse<FornitoreType>> {
  try {
    const fornitore = await prisma.fornitore.findUnique({
      where: { id }
    });
    
    if (!fornitore) {
      return {
        success: false,
        error: 'Fornitore non trovato'
      };
    }
    
    return { success: true, data: fornitore as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function fetchServizioATerraById(id: string): Promise<DBResult<ServiziATerraType>> {
  try {
    const servizio = await prisma.serviziATerra.findUnique({
      where: { id },
      include: {
        fornitore: true,
        destinazione: true
      }
    });
    
    if (!servizio) {
      return {
        success: false,
        errorsMessage: 'Servizio a terra non trovato'
      };
    }
    
    return { success: true, values: servizio };
  } catch (error) {
    console.error('Error fetching servizio a terra by id:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel recupero del servizio a terra' 
    };
  }
}

export async function fetchVoloById(id: string): Promise<DBResult<VoloType>> {
  try {
    const volo = await prisma.volo.findUnique({
      where: { id },
      include: {
        fornitore: true
      }
    });
    
    if (!volo) {
      return {
        success: false,
        errorsMessage: 'Volo non trovato'
      };
    }
    
    return { success: true, values: volo };
  } catch (error) {
    console.error('Error fetching volo by id:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel recupero del volo' 
    };
  }
}

export async function fetchAssicurazioneById(id: string): Promise<DBResult<AssicurazioneType>> {
  try {
    const assicurazione = await prisma.assicurazione.findUnique({
      where: { id },
      include: {
        fornitore: true
      }
    });
    
    if (!assicurazione) {
      return {
        success: false,
        errorsMessage: 'Assicurazione non trovata'
      };
    }
    
    return { success: true, values: assicurazione };
  } catch (error) {
    console.error('Error fetching assicurazione by id:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel recupero dell\'assicurazione' 
    };
  }
}

// ============================================================================
// DATA FETCHING FUNCTIONS (MIGRATION FROM data.ts)
// ============================================================================

export async function fetchPreventiviByIdCliente(clienteId: string): Promise<DBResult<PreventivoType[]>> {
  try {
    const preventivi = await prisma.preventivo.findMany({
      where: { id_cliente: clienteId },
      orderBy: { data: 'desc' }
    });
    return { success: true, values: preventivi as any };
  } catch (error) {
    console.error('Error fetching preventivi by cliente:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel recupero dei preventivi del cliente' 
    };
  }
}

export async function fetchServiziATerraByPreventivoId(preventivoId: string): Promise<DBResult<ServiziATerraType[]>> {
  try {
    const servizi = await prisma.serviziATerra.findMany({
      where: { 
        id_preventivo: preventivoId,
        servizio_aggiuntivo: false
      },
      include: {
        fornitore: true,
        destinazione: true
      }
    });
    return { success: true, values: servizi };
  } catch (error) {
    console.error('Error fetching servizi a terra:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel recupero dei servizi a terra' 
    };
  }
}

export async function fetchServiziAggiuntiviByPreventivoId(preventivoId: string): Promise<DBResult<ServiziATerraType[]>> {
  try {
    const servizi = await prisma.serviziATerra.findMany({
      where: { 
        id_preventivo: preventivoId,
        servizio_aggiuntivo: true
      },
      include: {
        fornitore: true,
        destinazione: true
      }
    });
    return { success: true, values: servizi };
  } catch (error) {
    console.error('Error fetching servizi aggiuntivi:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel recupero dei servizi aggiuntivi' 
    };
  }
}

export async function fetchVoliByPreventivoId(preventivoId: string): Promise<DBResult<VoloType[]>> {
  try {
    const voli = await prisma.volo.findMany({
      where: { id_preventivo: preventivoId },
      include: {
        fornitore: true
      }
    });
    return { success: true, values: voli };
  } catch (error) {
    console.error('Error fetching voli:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel recupero dei voli' 
    };
  }
}

export async function fetchAssicurazioniByPreventivoId(preventivoId: string): Promise<DBResult<AssicurazioneType[]>> {
  try {
    const assicurazioni = await prisma.assicurazione.findMany({
      where: { id_preventivo: preventivoId },
      include: {
        fornitore: true
      }
    });
    return { success: true, values: assicurazioni };
  } catch (error) {
    console.error('Error fetching assicurazioni:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel recupero delle assicurazioni' 
    };
  }
}

export async function getNumberOfPreventivi(): Promise<DBResult<number>> {
  try {
    const count = await prisma.preventivo.count();
    return { success: true, values: count };
  } catch (error) {
    console.error('Error counting preventivi:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel conteggio dei preventivi' 
    };
  }
}

export async function fetchPreventivoAlClienteByPreventivoId(preventivoId: string): Promise<DBResult<any>> {
  try {
    const preventivoAlCliente = await prisma.preventivoAlCliente.findFirst({
      where: { id_preventivo: preventivoId },
      include: {
        rows: true
      }
    });
    
    if (!preventivoAlCliente) {
      return { 
        success: false, 
        errorsMessage: 'Preventivo al cliente non trovato' 
      };
    }

    // Trasformo i dati nel formato atteso
    const result = {
      id: preventivoAlCliente.id,
      descrizione_viaggio: preventivoAlCliente.descrizione_viaggio,
      righePrimoTipo: preventivoAlCliente.rows.filter(row => !row.senza_assicurazione),
      righeSecondoTipo: preventivoAlCliente.rows.filter(row => row.senza_assicurazione)
    };
    
    return { success: true, values: result };
  } catch (error) {
    console.error('Error fetching preventivo al cliente:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel recupero del preventivo al cliente' 
    };
  }
}

export async function fetchAllPreventiviWithCliente(): Promise<DBResult<any[]>> {
  try {
    const preventivi = await prisma.preventivo.findMany({
      include: {
        cliente: true
      },
      orderBy: { data: 'desc' }
    });
    return { success: true, values: preventivi as any };
  } catch (error) {
    console.error('Error fetching preventivi with cliente:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel recupero dei preventivi con cliente' 
    };
  }
}

export async function fetchAllPreventiviAlCliente(): Promise<DBResult<any[]>> {
  try {
    const preventiviAlCliente = await prisma.preventivoAlCliente.findMany({
      include: {
        rows: true,
        preventivo: {
          include: {
            cliente: true
          }
        }
      }
    });
    return { success: true, values: preventiviAlCliente };
  } catch (error) {
    console.error('Error fetching preventivi al cliente:', error);
    return { 
      success: false, 
      errorsMessage: 'Errore nel recupero dei preventivi al cliente' 
    };
  }
}

// ============================================================================
// MISSING FUNCTIONS FOR SPECIFIC FEATURES
// ============================================================================

export async function deleteServizioATerraById(id: string): Promise<ApiResponse> {
  try {
    await prisma.serviziATerra.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteVoloById(id: string): Promise<ApiResponse> {
  try {
    await prisma.volo.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteAssicurazioneById(id: string): Promise<ApiResponse> {
  try {
    await prisma.assicurazione.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function createServizioATerra(data: any, preventivoId: string, isAggiuntivo: boolean): Promise<ApiResponse<ServiziATerraType>> {
  try {
    const servizio = await prisma.serviziATerra.create({
      data: {
        ...data,
        id_preventivo: preventivoId,
        servizio_aggiuntivo: isAggiuntivo
      }
    });

    revalidatePath('/dashboard');
    return { success: true, data: servizio as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function updatePreventivoAlClienteDescrizione(data: any): Promise<ApiResponse> {
  try {
    await prisma.preventivoAlCliente.update({
      where: { id: data.id },
      data: {
        descrizione_viaggio: data.descrizione_viaggio
      }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function updatePreventivoAlClienteRow(data: any, isPrimoTipo: boolean, preventivoAlClienteId: string): Promise<ApiResponse> {
  try {
    await prisma.preventivoAlClienteRow.update({
      where: { id: data.id },
      data: {
        destinazione: data.destinazione,
        descrizione: data.descrizione,
        individuale: data.individuale,
        numero: data.numero,
        senza_assicurazione: !isPrimoTipo
      }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deletePreventivoAlClienteRowById(id: string): Promise<ApiResponse> {
  try {
    await prisma.preventivoAlClienteRow.delete({
      where: { id }
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function createPreventivoAlClienteRow(data: any, isPrimoTipo: boolean, preventivoAlClienteId: string): Promise<ApiResponse> {
  try {
    const row = await prisma.preventivoAlClienteRow.create({
      data: {
        id_preventivo_al_cliente: preventivoAlClienteId,
        destinazione: data.destinazione,
        descrizione: data.descrizione,
        individuale: data.individuale,
        numero: data.numero,
        senza_assicurazione: !isPrimoTipo
      }
    });

    revalidatePath('/dashboard');
    return { success: true, data: row as any };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function submitCreatePreventivoGI(data: any): Promise<ApiResponse> {
  try {
    // Questa funzione deve essere implementata in base alla logica specifica
    // Per ora ritorno un placeholder
    console.log('submitCreatePreventivoGI called with:', data);
    return { 
      success: false, 
      error: 'Funzione submitCreatePreventivoGI da implementare' 
    };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function addFundamentalEntity(entityType: string, data: any): Promise<ApiResponse> {
  try {
    // Gestisce l'aggiunta di entità fondamentali (destinazioni, fornitori, banche)
    switch (entityType.toLowerCase()) {
      case 'destinazione':
        return await createDestinazione(data);
      case 'fornitore':
        return await createFornitore(data);
      case 'banca':
        return await createBanca(data);
      default:
        return {
          success: false,
          error: `Tipo di entità non supportato: ${entityType}`
        };
    }
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function setOptionsJson(options: any): Promise<ApiResponse> {
  try {
    // Questa funzione gestisce le opzioni di configurazione
    // Per ora ritorno un placeholder
    console.log('setOptionsJson called with:', options);
    return { 
      success: true, 
      data: options 
    };
  } catch (error) {
    return handlePrismaError(error);
  }
}

// Cleanup function to disconnect Prisma on app shutdown
export async function disconnectPrisma() {
  await prisma.$disconnect();
}
