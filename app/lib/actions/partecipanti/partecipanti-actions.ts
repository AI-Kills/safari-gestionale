"use server";

import { revalidatePath } from 'next/cache';
import type { Partecipante } from '../../definitions';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse, DBResult } from '../utils/types';
import { 
  partecipanteSchema, 
  createPartecipanteSchema, 
  updatePartecipanteSchema 
} from '../entity-zod-schemas';

export async function createPartecipante(data: any): Promise<ApiResponse<Partecipante>> {
  try {
    const parsedData = parseFormDates(data);
    
    const validatedData = createPartecipanteSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const partecipante = await prisma.partecipanti.create({
      data: {
        id_preventivo: validatedData.data.id_preventivo!,
        nome: validatedData.data.nome,
        cognome: validatedData.data.cognome,
        tot_quota: validatedData.data.tot_quota
      }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: partecipante as Partecipante };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllPartecipanti(): Promise<Partecipante[]> {
  try {
    const partecipanti = await prisma.partecipanti.findMany({
      orderBy: [{ cognome: 'asc' }, { nome: 'asc' }]
    });
    return partecipanti as Partecipante[];
  } catch (error) {
    console.error('Error fetching partecipanti:', error);
    return [];
  }
}

export async function getPartecipante(id: string): Promise<Partecipante | null> {
  try {
    const partecipante = await prisma.partecipanti.findUnique({
      where: { id }
    });
    return partecipante as Partecipante;
  } catch (error) {
    console.error('Error fetching partecipante:', error);
    return null;
  }
}

export async function updatePartecipante(data: any): Promise<ApiResponse<Partecipante>> {
  try {
    const parsedData = parseFormDates(data);
    
    const validatedData = updatePartecipanteSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const partecipante = await prisma.partecipanti.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: partecipante as Partecipante };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deletePartecipante(id: string): Promise<ApiResponse> {
  try {
    // Prima elimina tutti gli incassi collegati al partecipante
    await prisma.incassi_partecipanti.deleteMany({
      where: { id_partecipante: id }
    });

    // Poi elimina il partecipante
    await prisma.partecipanti.delete({
      where: { id }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getPartecipantiByPreventivo(preventivoId: string): Promise<DBResult<Partecipante[]>> {
  try {
    console.log('🔍 DEBUG: getPartecipantiByPreventivo called with preventivoId:', preventivoId);
    
    // Prima verifica se esistono partecipanti per questo preventivo
    const count = await prisma.partecipanti.count({
      where: { id_preventivo: preventivoId }
    });
    console.log('🔍 DEBUG: Found', count, 'partecipanti for preventivo', preventivoId);
    
    const partecipanti = await prisma.partecipanti.findMany({
      where: { id_preventivo: preventivoId },
      orderBy: [{ cognome: 'asc' }, { nome: 'asc' }],
      include: {
        incassi_partecipanti: {
          include: {
            banche: true
          }
        }
      }
    });
    
    console.log('🔍 DEBUG: getPartecipantiByPreventivo returning', partecipanti.length, 'partecipanti');
    return { success: true, values: partecipanti as any };
  } catch (error) {
    console.error('Error fetching partecipanti by preventivo:', error);
    return { success: false, errorsMessage: 'Errore nel recupero partecipanti del preventivo' };
  }
}

export async function fetchPartecipantiByPreventivoId(preventivoId: string): Promise<DBResult<Partecipante[]>> {
  try {
    const partecipanti = await prisma.partecipanti.findMany({
      where: { id_preventivo: preventivoId },
      orderBy: [{ cognome: 'asc' }, { nome: 'asc' }]
    });
    return { success: true, values: partecipanti as Partecipante[] };
  } catch (error) {
    console.error('Error fetching partecipanti by preventivo:', error);
    return { success: false, errorsMessage: 'Errore nel recupero partecipanti del preventivo' };
  }
}
