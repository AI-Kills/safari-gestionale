"use server";

import { revalidatePath } from 'next/cache';
import type { Destinazione as DestinazioneType } from '../../definitions';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse, DBResult } from '../utils/types';
import { destinazioneSchema, createDestinazioneSchema, updateDestinazioneSchema } from '../entity-zod-schemas';

export async function createDestinazione(data: any): Promise<ApiResponse<DestinazioneType>> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = createDestinazioneSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const destinazione = await prisma.destinazione.create({
      data: {
        nome: validatedData.data.nome!
      }
    });

    revalidatePath('/dashboard/destinazioni');
    return { success: true, data: destinazione as DestinazioneType };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllDestinazioni(): Promise<DestinazioneType[]> {
  try {
    const destinazioni = await prisma.destinazione.findMany({
      orderBy: { nome: 'asc' }
    });
    return destinazioni as DestinazioneType[];
  } catch (error) {
    console.error('Error fetching destinazioni:', error);
    return [];
  }
}

export async function getDestinazioneById(id: string): Promise<DBResult<DestinazioneType>> {
  try {
    const destinazione = await prisma.destinazione.findUnique({
      where: { id }
    });
    
    if (!destinazione) {
      return { success: false, errorsMessage: 'Destinazione non trovata' };
    }
    
    return { success: true, values: destinazione as DestinazioneType };
  } catch (error) {
    console.error('Error fetching destinazione by id:', error);
    return { success: false, errorsMessage: 'Errore nel recupero destinazione' };
  }
}

export async function updateDestinazione(data: any): Promise<ApiResponse<DestinazioneType>> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = updateDestinazioneSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const destinazione = await prisma.destinazione.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    revalidatePath('/dashboard/destinazioni');
    return { success: true, data: destinazione as DestinazioneType };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteDestinazione(id: string): Promise<ApiResponse> {
  try {
    await prisma.destinazione.delete({
      where: { id }
    });

    revalidatePath('/dashboard/destinazioni');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}
