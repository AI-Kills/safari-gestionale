"use server";

import { revalidatePath } from 'next/cache';
import type { IncassoPartecipante } from '../../definitions';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse, DBResult } from '../utils/types';
import { 
  incassoPartecipanteSchema, 
  createIncassoPartecipanteSchema, 
  updateIncassoPartecipanteSchema 
} from '../entity-zod-schemas';

export async function createIncassoPartecipante(data: any): Promise<ApiResponse<IncassoPartecipante>> {
  try {
    const parsedData = parseFormDates(data);
    
    const validatedData = createIncassoPartecipanteSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const incasso = await prisma.incassi_partecipanti.create({
      data: {
        id_partecipante: validatedData.data.id_partecipante!,
        id_banca: validatedData.data.id_banca,
        importo: validatedData.data.importo,
        importo_in_valuta: validatedData.data.importo_in_valuta,
        data_scadenza: validatedData.data.data_scadenza,
        data_incasso: validatedData.data.data_incasso
      }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: incasso as IncassoPartecipante };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllIncassiPartecipanti(): Promise<IncassoPartecipante[]> {
  try {
    const incassi = await prisma.incassi_partecipanti.findMany({
      orderBy: { data_scadenza: 'asc' },
      include: {
        partecipanti: true,
        banche: true
      }
    });
    return incassi as any;
  } catch (error) {
    console.error('Error fetching incassi partecipanti:', error);
    return [];
  }
}

export async function getIncassoPartecipante(id: string): Promise<IncassoPartecipante | null> {
  try {
    const incasso = await prisma.incassi_partecipanti.findUnique({
      where: { id },
      include: {
        partecipanti: true,
        banche: true
      }
    });
    return incasso as any;
  } catch (error) {
    console.error('Error fetching incasso partecipante:', error);
    return null;
  }
}

export async function updateIncassoPartecipante(data: any): Promise<ApiResponse<IncassoPartecipante>> {
  try {
    const parsedData = parseFormDates(data);
    
    const validatedData = updateIncassoPartecipanteSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const incasso = await prisma.incassi_partecipanti.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: incasso as IncassoPartecipante };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteIncassoPartecipante(id: string): Promise<ApiResponse> {
  try {
    await prisma.incassi_partecipanti.delete({
      where: { id }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getIncassiByPartecipante(partecipanteId: string): Promise<DBResult<IncassoPartecipante[]>> {
  try {
    const incassi = await prisma.incassi_partecipanti.findMany({
      where: { id_partecipante: partecipanteId },
      orderBy: { data_scadenza: 'asc' },
      include: {
        banche: true
      }
    });
    return { success: true, values: incassi as any };
  } catch (error) {
    console.error('Error fetching incassi by partecipante:', error);
    return { success: false, errorsMessage: 'Errore nel recupero incassi del partecipante' };
  }
}

export async function fetchIncassiPartecipantiByPartecipanteId(partecipanteId: string): Promise<DBResult<IncassoPartecipante[]>> {
  try {
    const incassi = await prisma.incassi_partecipanti.findMany({
      where: { id_partecipante: partecipanteId },
      orderBy: { data_scadenza: 'asc' }
    });
    return { success: true, values: incassi as IncassoPartecipante[] };
  } catch (error) {
    console.error('Error fetching incassi partecipanti by partecipante:', error);
    return { success: false, errorsMessage: 'Errore nel recupero incassi partecipanti del partecipante' };
  }
}
