"use server";

import { revalidatePath } from 'next/cache';
import { signIn, signOut } from "../../../auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

import { 
  clienteService, 
  preventivoService, 
  fornitoreService, 
  destinazioneService, 
  bancaService 
} from './api-layer';

import { DataTransformers, BatchOperations } from './data-transformers';

import {
  createClienteSchema,
  updateClienteSchema,
  createPreventivoSchema,
  updatePreventivoSchema,
  // ... altri schemas
} from './entity-zod-schemas';

import type { ApiResponse, DBResult } from './actions';
import type { Data } from '@/app/dashboard/(overview)/general-interface/general-interface.defs';

// ============================================================================
// AUTH ACTIONS (rimangono invariate)
// ============================================================================

export async function authenticate(prevState: string | undefined, formData: FormData) {
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

// ============================================================================
// SIMPLIFIED CRUD OPERATIONS
// ============================================================================

// Cliente operations
export async function createCliente(data: any): Promise<ApiResponse> {
  const validatedData = createClienteSchema.safeParse(data);
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

  return clienteService.create(validatedData.data);
}

export async function getAllClienti() {
  return clienteService.getAll([{ cognome: 'asc' }, { nome: 'asc' }]);
}

export async function getCliente(id: string) {
  return clienteService.getById(id);
}

export async function updateCliente(data: any): Promise<ApiResponse> {
  const validatedData = updateClienteSchema.safeParse(data);
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

  const { id, ...updateData } = validatedData.data;
  return clienteService.update(id, updateData);
}

export async function deleteCliente(id: string): Promise<ApiResponse> {
  return clienteService.delete(id);
}

export async function searchClienti(searchTerm: string) {
  // Questa logica rimane custom perché ha una query specifica
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    const clienti = await prisma.cliente.findMany({
      where: {
        OR: [
          { nome: { contains: searchTerm, mode: 'insensitive' } },
          { cognome: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
          { tel: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      orderBy: [{ cognome: 'asc' }, { nome: 'asc' }]
    });
    
    await prisma.$disconnect();
    return clienti;
  } catch (error) {
    console.error('Error searching clienti:', error);
    return [];
  }
}

// ============================================================================
// COMPLEX OPERATIONS WITH TRANSFORMATIONS
// ============================================================================

export async function getPreventivoCompleto(preventivoId: string): Promise<DBResult<Data>> {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    const [serviziATerra, serviziAggiuntivi, voli, assicurazioni, preventivoAlCliente] = 
      await Promise.all([
        prisma.serviziATerra.findMany({
          where: { id_preventivo: preventivoId, servizio_aggiuntivo: false },
          include: { fornitore: true, destinazione: true }
        }),
        prisma.serviziATerra.findMany({
          where: { id_preventivo: preventivoId, servizio_aggiuntivo: true },
          include: { fornitore: true, destinazione: true }
        }),
        prisma.volo.findMany({
          where: { id_preventivo: preventivoId },
          include: { fornitore: true }
        }),
        prisma.assicurazione.findMany({
          where: { id_preventivo: preventivoId },
          include: { fornitore: true }
        }),
        prisma.preventivoAlCliente.findFirst({
          where: { id_preventivo: preventivoId },
          include: { rows: true }
        })
      ]);

    // Usa i trasformatori per convertire i dati
    const [
      serviziATerraInputGroup,
      serviziAggiuntiviInputGroup, 
      voliInputGroup,
      assicurazioniInputGroup
    ] = await Promise.all([
      DataTransformers.serviziATerraToInputGroup(serviziATerra),
      DataTransformers.serviziATerraToInputGroup(serviziAggiuntivi),
      DataTransformers.voliToInputGroup(voli),
      DataTransformers.assicurazioniToInputGroup(assicurazioni)
    ]);

    const preventivoAlClienteInputGroup = preventivoAlCliente 
      ? DataTransformers.preventivoAlClienteToInputGroup({
          id: preventivoAlCliente.id,
          descrizione_viaggio: preventivoAlCliente.descrizione_viaggio,
          righePrimoTipo: preventivoAlCliente.rows.filter(row => !row.senza_assicurazione),
          righeSecondoTipo: preventivoAlCliente.rows.filter(row => row.senza_assicurazione)
        })
      : undefined;

    await prisma.$disconnect();

    return {
      success: true,
      values: {
        preventivo: undefined, // Da impostare dal chiamante
        serviziATerra: serviziATerraInputGroup,
        serviziAggiuntivi: serviziAggiuntiviInputGroup,
        voli: voliInputGroup,
        assicurazioni: assicurazioniInputGroup,
        preventivoAlCliente: preventivoAlClienteInputGroup
      }
    };

  } catch (error) {
    console.error('Error fetching preventivo completo:', error);
    return {
      success: false,
      errorsMessage: 'Errore nel recupero del preventivo completo'
    };
  }
}

export async function updatePreventivoCompleto(data: Data): Promise<ApiResponse> {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // Usa batch operations per gestire gli aggiornamenti
    const operations = await Promise.allSettled([
      updatePreventivo(data.preventivo),
      updateServiziATerraWithBatch(data, prisma),
      updateVoliWithBatch(data, prisma),
      updateAssicurazioniWithBatch(data, prisma),
      // updatePreventivoAlCliente(data) // Da implementare
    ]);

    await prisma.$disconnect();

    const failures = operations.filter(op => op.status === 'rejected');
    if (failures.length > 0) {
      console.error('Some operations failed:', failures);
      return { success: false, error: 'Alcuni aggiornamenti sono falliti' };
    }

    revalidatePath('/dashboard');
    return { success: true };

  } catch (error) {
    console.error('Error updating preventivo completo:', error);
    return { success: false, error: 'Errore nell\'aggiornamento del preventivo' };
  }
}

// Helper functions per batch operations
async function updateServiziATerraWithBatch(data: Data, prisma: any) {
  const existingServizi = await prisma.serviziATerra.findMany({
    where: { id_preventivo: data.preventivo.id, servizio_aggiuntivo: false }
  });

  return BatchOperations.updateEntityBatch(
    existingServizi.map((s: any) => s.id),
    data.serviziATerra,
    (servizio) => prisma.serviziATerra.create({
      data: { ...servizio, id_preventivo: data.preventivo.id, servizio_aggiuntivo: false }
    }),
    (id, servizio) => prisma.serviziATerra.update({
      where: { id },
      data: servizio
    }),
    (id) => prisma.serviziATerra.delete({ where: { id } })
  );
}

async function updateVoliWithBatch(data: Data, prisma: any) {
  const existingVoli = await prisma.volo.findMany({
    where: { id_preventivo: data.preventivo.id }
  });

  return BatchOperations.updateEntityBatch(
    existingVoli.map((v: any) => v.id),
    data.voli,
    (volo) => prisma.volo.create({
      data: { ...volo, id_preventivo: data.preventivo.id }
    }),
    (id, volo) => prisma.volo.update({
      where: { id },
      data: volo
    }),
    (id) => prisma.volo.delete({ where: { id } })
  );
}

async function updateAssicurazioniWithBatch(data: Data, prisma: any) {
  const existingAssicurazioni = await prisma.assicurazione.findMany({
    where: { id_preventivo: data.preventivo.id }
  });

  return BatchOperations.updateEntityBatch(
    existingAssicurazioni.map((a: any) => a.id),
    data.assicurazioni,
    (assicurazione) => prisma.assicurazione.create({
      data: { ...assicurazione, id_preventivo: data.preventivo.id }
    }),
    (id, assicurazione) => prisma.assicurazione.update({
      where: { id },
      data: assicurazione
    }),
    (id) => prisma.assicurazione.delete({ where: { id } })
  );
}

// ============================================================================
// SIMPLE CRUD FOR OTHER ENTITIES
// ============================================================================

export const createFornitore = (data: any) => fornitoreService.create(data);
export const getAllFornitori = () => fornitoreService.getAll({ nome: 'asc' });
export const updateFornitore = (data: any) => {
  const { id, ...updateData } = data;
  return fornitoreService.update(id, updateData);
};
export const deleteFornitore = (id: string) => fornitoreService.delete(id);

export const createDestinazione = (data: any) => destinazioneService.create(data);
export const getAllDestinazioni = () => destinazioneService.getAll({ nome: 'asc' });
export const updateDestinazione = (data: any) => {
  const { id, ...updateData } = data;
  return destinazioneService.update(id, updateData);
};
export const deleteDestinazione = (id: string) => destinazioneService.delete(id);

export const createBanca = (data: any) => bancaService.create(data);
export const getAllBanche = () => bancaService.getAll({ nome: 'asc' });
export const updateBanca = (data: any) => {
  const { id, ...updateData } = data;
  return bancaService.update(id, updateData);
};
export const deleteBanca = (id: string) => bancaService.delete(id);
