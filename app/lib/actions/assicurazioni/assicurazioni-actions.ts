"use server";

import { revalidatePath } from 'next/cache';
import type { Assicurazione as AssicurazioneType } from '../../definitions';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse, DBResult } from '../utils/types';
import { assicurazioneSchema, createAssicurazioneSchema, updateAssicurazioneSchema } from '../entity-zod-schemas';

export async function createAssicurazione(data: any): Promise<ApiResponse<AssicurazioneType>> {
  try {
    const parsedData = parseFormDates(data);
    
    // Trova l'ID del fornitore se il nome è fornito
    if (parsedData.fornitore) {
      const fornitore = await prisma.fornitore.findFirst({
        where: { nome: parsedData.fornitore }
      });
      parsedData.id_fornitore = fornitore?.id;
      delete parsedData.fornitore;
    }

    const validatedData = createAssicurazioneSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const assicurazione = await prisma.assicurazione.create({
      data: {
        id_preventivo: validatedData.data.id_preventivo!,
        id_fornitore: validatedData.data.id_fornitore,
        assicurazione: validatedData.data.assicurazione,
        netto: validatedData.data.netto,
        ricarico: validatedData.data.ricarico,
        numero: validatedData.data.numero
      }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: assicurazione as AssicurazioneType };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllAssicurazioni(): Promise<AssicurazioneType[]> {
  try {
    const assicurazioni = await prisma.assicurazione.findMany({
      orderBy: { assicurazione: 'asc' },
      include: {
        preventivo: true,
        fornitore: true
      }
    });
    return assicurazioni as AssicurazioneType[];
  } catch (error) {
    console.error('Error fetching assicurazioni:', error);
    return [];
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
    return { success: true, values: assicurazioni as AssicurazioneType[] };
  } catch (error) {
    console.error('Error fetching assicurazioni by preventivo:', error);
    return { success: false, errorsMessage: 'Errore nel recupero assicurazioni' };
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
      return { success: false, errorsMessage: 'Assicurazione non trovata' };
    }
    
    return { success: true, values: assicurazione as AssicurazioneType };
  } catch (error) {
    console.error('Error fetching assicurazione by id:', error);
    return { success: false, errorsMessage: 'Errore nel recupero assicurazione' };
  }
}

export async function updateAssicurazione(data: any): Promise<ApiResponse<AssicurazioneType>> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = updateAssicurazioneSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const assicurazione = await prisma.assicurazione.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: assicurazione as AssicurazioneType };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteAssicurazioneById(id: string): Promise<ApiResponse> {
  try {
    await prisma.assicurazione.delete({
      where: { id }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}
