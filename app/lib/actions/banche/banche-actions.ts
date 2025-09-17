"use server";

import { revalidatePath } from 'next/cache';
import type { Banca } from '../../definitions';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse, DBResult } from '../utils/types';
import { 
  bancaSchema, 
  createBancaSchema, 
  updateBancaSchema 
} from '../entity-zod-schemas';

export async function createBanca(data: any): Promise<ApiResponse<Banca>> {
  try {
    const parsedData = parseFormDates(data);
    
    const validatedData = createBancaSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const banca = await prisma.banca.create({
      data: {
        nome: validatedData.data.nome!
      }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: banca as Banca };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllBanche(): Promise<Banca[]> {
  try {
    const banche = await prisma.banca.findMany({
      orderBy: { nome: 'asc' }
    });
    return banche as Banca[];
  } catch (error) {
    console.error('Error fetching banche:', error);
    return [];
  }
}

export async function getBanca(id: string): Promise<Banca | null> {
  try {
    const banca = await prisma.banca.findUnique({
      where: { id }
    });
    return banca as Banca;
  } catch (error) {
    console.error('Error fetching banca:', error);
    return null;
  }
}

export async function getBancaByNome(nome: string): Promise<DBResult<Banca>> {
  try {
    const banca = await prisma.banca.findFirst({
      where: { nome: nome }
    });
    if (banca) {
      return { success: true, values: banca as Banca };
    } else {
      return { success: false, errorsMessage: `Banca con nome '${nome}' non trovata` };
    }
  } catch (error) {
    console.error('Error fetching banca by nome:', error);
    return { success: false, errorsMessage: 'Errore nel recupero banca per nome' };
  }
}

export async function updateBanca(data: any): Promise<ApiResponse<Banca>> {
  try {
    const parsedData = parseFormDates(data);
    
    const validatedData = updateBancaSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const banca = await prisma.banca.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: banca as Banca };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteBanca(id: string): Promise<ApiResponse> {
  try {
    await prisma.banca.delete({
      where: { id }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}
