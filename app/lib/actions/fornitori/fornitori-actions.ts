"use server";

import { revalidatePath } from 'next/cache';
import type { Fornitore as FornitoreType } from '../../definitions';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse, DBResult } from '../utils/types';
import { fornitoreSchema, createFornitoreSchema, updateFornitoreSchema } from '../entity-zod-schemas';

export async function createFornitore(data: any): Promise<ApiResponse<FornitoreType>> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = createFornitoreSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const fornitore = await prisma.fornitore.create({
      data: {
        nome: validatedData.data.nome!,
        valuta: validatedData.data.valuta
      }
    });

    revalidatePath('/dashboard/fornitori');
    return { success: true, data: fornitore as FornitoreType };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllFornitori(): Promise<FornitoreType[]> {
  try {
    const fornitori = await prisma.fornitore.findMany({
      orderBy: { nome: 'asc' }
    });
    return fornitori as FornitoreType[];
  } catch (error) {
    console.error('Error fetching fornitori:', error);
    return [];
  }
}

export async function updateFornitore(data: any): Promise<ApiResponse<FornitoreType>> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = updateFornitoreSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const fornitore = await prisma.fornitore.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    revalidatePath('/dashboard/fornitori');
    return { success: true, data: fornitore as FornitoreType };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getFornitoreById(id: string): Promise<DBResult<FornitoreType>> {
  try {
    const fornitore = await prisma.fornitore.findUnique({
      where: { id }
    });
    
    if (!fornitore) {
      return { success: false, errorsMessage: 'Fornitore non trovato' };
    }
    
    return { success: true, values: fornitore as FornitoreType };
  } catch (error) {
    console.error('Error fetching fornitore by id:', error);
    return { success: false, errorsMessage: 'Errore nel recupero fornitore' };
  }
}

export async function deleteFornitore(id: string): Promise<ApiResponse> {
  try {
    await prisma.fornitore.delete({
      where: { id }
    });

    revalidatePath('/dashboard/fornitori');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}
