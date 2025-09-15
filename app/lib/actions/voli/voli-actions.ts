"use server";

import { revalidatePath } from 'next/cache';
import type { Volo as VoloType } from '../../definitions';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse, DBResult } from '../utils/types';
import { voloSchema, createVoloSchema, updateVoloSchema } from '../entity-zod-schemas';

export async function createVolo(data: any): Promise<ApiResponse<VoloType>> {
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

    // Salva i pagamenti prima di rimuoverli
    const pagamentiVolo = parsedData.pagamenti || [];

    // Rimuovi campi che non servono per il database
    delete parsedData.groupId;
    delete parsedData.pagamenti;

    const validatedData = createVoloSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const volo = await prisma.volo.create({
      data: {
        id_preventivo: validatedData.data.id_preventivo!,
        id_fornitore: validatedData.data.id_fornitore,
        compagnia_aerea: validatedData.data.compagnia_aerea,
        descrizione: validatedData.data.descrizione,
        data_partenza: validatedData.data.data_partenza,
        data_arrivo: validatedData.data.data_arrivo,
        totale: validatedData.data.totale,
        ricarico: validatedData.data.ricarico,
        numero: validatedData.data.numero,
        valuta: validatedData.data.valuta,
        cambio: validatedData.data.cambio
      }
    });

    // Crea i pagamenti per questo volo
    if (pagamentiVolo.length > 0) {
      console.log('💰 Creating pagamenti for volo:', pagamentiVolo.length);
      for (const pagamento of pagamentiVolo) {
        if (pagamento.banca || pagamento.importo_in_euro || pagamento.importo_in_valuta) {
          // Trova l'ID della banca se specificata
          let id_banca = null;
          if (pagamento.banca) {
            const banca = await prisma.banca.findFirst({
              where: { nome: pagamento.banca }
            });
            id_banca = banca?.id;
          }

          await prisma.pagamenti_voli.create({
            data: {
              id_volo: volo.id,
              id_banca: id_banca,
              importo: pagamento.importo_in_euro,
              importo_in_valuta: pagamento.importo_in_valuta,
              data_scadenza: pagamento.data_scadenza,
              data_incasso: pagamento.data_pagamento
            }
          });
          console.log('💰 Pagamento volo created successfully');
        }
      }
    }

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: volo as VoloType };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllVoli(): Promise<VoloType[]> {
  try {
    const voli = await prisma.volo.findMany({
      orderBy: { data_partenza: 'desc' },
      include: {
        preventivo: true,
        fornitore: true
      }
    });
    return voli as VoloType[];
  } catch (error) {
    console.error('Error fetching voli:', error);
    return [];
  }
}

export async function fetchVoliByPreventivoId(preventivoId: string): Promise<DBResult<VoloType[]>> {
  try {
    const voli = await prisma.volo.findMany({
      where: { id_preventivo: preventivoId },
      include: {
        fornitore: true,
        pagamenti_voli: {
          include: {
            banche: true
          }
        }
      }
    });
    return { success: true, values: voli as VoloType[] };
  } catch (error) {
    console.error('Error fetching voli by preventivo:', error);
    return { success: false, errorsMessage: 'Errore nel recupero voli' };
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
      return { success: false, errorsMessage: 'Volo non trovato' };
    }
    
    return { success: true, values: volo as VoloType };
  } catch (error) {
    console.error('Error fetching volo by id:', error);
    return { success: false, errorsMessage: 'Errore nel recupero volo' };
  }
}

export async function updateVolo(data: any): Promise<ApiResponse<VoloType>> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = updateVoloSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const volo = await prisma.volo.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: volo as VoloType };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteVoloById(id: string): Promise<ApiResponse> {
  try {
    await prisma.volo.delete({
      where: { id }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}
