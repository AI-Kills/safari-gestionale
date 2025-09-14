"use server";

import { revalidatePath } from 'next/cache';
import type { PreventivoAlCliente, PreventivoAlClienteRow } from '../../definitions';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse, DBResult } from '../utils/types';
import { 
  preventivoAlClienteSchema, 
  createPreventivoAlClienteSchema, 
  updatePreventivoAlClienteSchema,
  preventivoAlClienteRowSchema,
  createPreventivoAlClienteRowSchema,
  updatePreventivoAlClienteRowSchema
} from '../entity-zod-schemas';

export async function fetchPreventivoAlClienteByPreventivoId(preventivoId: string): Promise<DBResult<PreventivoAlCliente>> {
  try {
    let preventivoAlCliente = await prisma.preventivoAlCliente.findFirst({
      where: { id_preventivo: preventivoId },
      include: {
        rows: true
      }
    });
    
    // Se non esiste, creane uno vuoto
    if (!preventivoAlCliente) {
      preventivoAlCliente = await prisma.preventivoAlCliente.create({
        data: {
          id_preventivo: preventivoId,
          descrizione_viaggio: null
        },
        include: {
          rows: true
        }
      });
    }

    // Separa le righe per tipo
    const righePrimoTipo = preventivoAlCliente.rows.filter(row => row.is_primo_tipo);
    const righeSecondoTipo = preventivoAlCliente.rows.filter(row => !row.is_primo_tipo);

    const result = {
      ...preventivoAlCliente,
      righePrimoTipo,
      righeSecondoTipo
    };
    
    return { success: true, values: result as PreventivoAlCliente };
  } catch (error) {
    console.error('Error fetching preventivo al cliente by preventivo:', error);
    return { success: false, errorsMessage: 'Errore nel recupero preventivo al cliente' };
  }
}

export async function updatePreventivoAlClienteDescrizione(data: any): Promise<ApiResponse> {
  try {
    const parsedData = parseFormDates(data);
    
    await prisma.preventivoAlCliente.update({
      where: { id: parsedData.id },
      data: {
        descrizione_viaggio: parsedData.descrizione_viaggio
      }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function createPreventivoAlClienteRow(data: any, isPrimoTipo: boolean, preventivoAlClienteId: string): Promise<ApiResponse> {
  try {
    const parsedData = parseFormDates(data);
    parsedData.id_preventivo_al_cliente = preventivoAlClienteId;
    parsedData.is_primo_tipo = isPrimoTipo;

    const validatedData = createPreventivoAlClienteRowSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    await prisma.preventivoAlClienteRow.create({
      data: {
        id_preventivo_al_cliente: validatedData.data.id_preventivo_al_cliente!,
        senza_assicurazione: validatedData.data.senza_assicurazione,
        destinazione: validatedData.data.destinazione,
        descrizione: validatedData.data.descrizione,
        individuale: validatedData.data.individuale,
        numero: validatedData.data.numero,
        is_primo_tipo: validatedData.data.is_primo_tipo
      }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function updatePreventivoAlClienteRow(data: any, isPrimoTipo: boolean, preventivoAlClienteId: string): Promise<ApiResponse> {
  try {
    const parsedData = parseFormDates(data);
    parsedData.is_primo_tipo = isPrimoTipo;

    const validatedData = updatePreventivoAlClienteRowSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    await prisma.preventivoAlClienteRow.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    revalidatePath('/dashboard/preventivi-table');
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

    revalidatePath('/dashboard/preventivi-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}
