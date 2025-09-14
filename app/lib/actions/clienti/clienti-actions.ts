"use server";

import { revalidatePath } from 'next/cache';
import type { Cliente as ClienteType } from '../../definitions';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse } from '../utils/types';
import { clienteSchema, createClienteSchema, updateClienteSchema } from '../entity-zod-schemas';
import type { DBResult } from '../utils/types';

export async function createCliente(data: any): Promise<DBResult<ClienteType>> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = createClienteSchema.safeParse(parsedData);
    if (!validatedData.success) {
      const errors: Record<string, string> = {};
      validatedData.error.issues.forEach((issue: any) => {
        const key = issue.path.join('.');
        errors[key] = issue.message;
      });
      return { success: false, errors, errorsMessage: 'Errori di validazione' };
    }

    const cliente = await prisma.cliente.create({
      data: {
        ...validatedData.data,
        email: validatedData.data.email!
      }
    });

    revalidatePath('/dashboard/clienti-table');
    return { success: true, values: cliente as ClienteType };
  } catch (error: any) {
    console.error('Error creating cliente:', error);
    return { success: false, errorsMessage: error.message || 'Errore nella creazione del cliente' };
  }
}

export async function getAllClienti(): Promise<any[]> {
  try {
    const clienti = await prisma.cliente.findMany({
      orderBy: { cognome: 'asc' }
    });
    return clienti;
  } catch (error) {
    console.error('Error fetching clienti:', error);
    return [];
  }
}

export async function getCliente(id: string): Promise<any | null> {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: {
        preventivi: true
      }
    });
    return cliente;
  } catch (error) {
    console.error('Error fetching cliente:', error);
    return null;
  }
}

export async function updateCliente(data: any): Promise<DBResult<ClienteType>> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = updateClienteSchema.safeParse(parsedData);
    if (!validatedData.success) {
      const errors: Record<string, string> = {};
      validatedData.error.issues.forEach((issue: any) => {
        const key = issue.path.join('.');
        errors[key] = issue.message;
      });
      return { success: false, errors, errorsMessage: 'Errori di validazione' };
    }

    const cliente = await prisma.cliente.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    revalidatePath('/dashboard/clienti-table');
    return { success: true, values: cliente as ClienteType };
  } catch (error: any) {
    console.error('Error updating cliente:', error);
    return { success: false, errorsMessage: error.message || 'Errore nell\'aggiornamento del cliente' };
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

export async function searchClienti(searchData: any): Promise<DBResult<ClienteType[]>> {
  try {
    const where: any = {};
    
    if (searchData.nome) {
      where.nome = { contains: searchData.nome, mode: 'insensitive' };
    }
    if (searchData.cognome) {
      where.cognome = { contains: searchData.cognome, mode: 'insensitive' };
    }
    if (searchData.email) {
      where.email = { contains: searchData.email, mode: 'insensitive' };
    }
    if (searchData.tel) {
      where.tel = { contains: searchData.tel };
    }
    if (searchData.citta) {
      where.citta = { contains: searchData.citta, mode: 'insensitive' };
    }
    
    const clienti = await prisma.cliente.findMany({
      where,
      orderBy: { cognome: 'asc' },
      take: 50 // Limite per performance
    });
    
    return { success: true, values: clienti as ClienteType[] };
  } catch (error) {
    console.error('Error searching clienti:', error);
    return { success: false, errorsMessage: 'Errore nella ricerca clienti' };
  }
}
