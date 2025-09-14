"use server";

import { revalidatePath } from 'next/cache';
import type { ServizioATerra as ServiziATerraType } from '../../definitions';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse, DBResult } from '../utils/types';
import { serviziATerraSchema, createServiziATerraSchema, updateServiziATerraSchema } from '../entity-zod-schemas';

export async function createServiziATerra(data: any): Promise<ApiResponse<ServiziATerraType>> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = createServiziATerraSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const servizio = await prisma.serviziATerra.create({
      data: {
        id_preventivo: validatedData.data.id_preventivo!,
        id_fornitore: validatedData.data.id_fornitore,
        id_destinazione: validatedData.data.id_destinazione,
        descrizione: validatedData.data.descrizione,
        data: validatedData.data.data,
        numero_notti: validatedData.data.numero_notti,
        numero_camere: validatedData.data.numero_camere,
        totale: validatedData.data.totale,
        valuta: validatedData.data.valuta,
        cambio: validatedData.data.cambio,
        ricarico: validatedData.data.ricarico,
        servizio_aggiuntivo: validatedData.data.servizio_aggiuntivo
      }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: servizio as ServiziATerraType };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function createServizioATerra(data: any, preventivoId: string, isServizioAggiuntivo: boolean): Promise<ApiResponse<ServiziATerraType>> {
  try {
    console.log('🏗️ createServizioATerra called with:', { data, preventivoId, isServizioAggiuntivo });
    
    const parsedData = parseFormDates(data);
    parsedData.id_preventivo = preventivoId;
    parsedData.servizio_aggiuntivo = isServizioAggiuntivo;
    
    // Pulizia dati: converti stringhe vuote in null
    Object.keys(parsedData).forEach(key => {
      if (parsedData[key] === '' || parsedData[key] === 'undefined') {
        parsedData[key] = null;
      }
      // Converti stringhe numeriche vuote in null
      if (['totale', 'cambio', 'ricarico', 'numero_notti', 'numero_camere'].includes(key)) {
        if (parsedData[key] === '' || isNaN(parsedData[key])) {
          parsedData[key] = null;
        } else if (typeof parsedData[key] === 'string') {
          parsedData[key] = parseFloat(parsedData[key]);
        }
      }
    });
    
    console.log('📅 After parseFormDates and cleanup:', parsedData);
    
    // Trova gli ID delle entità correlate se i nomi sono forniti
    if (parsedData.destinazione) {
      console.log('🌍 Looking for destinazione:', parsedData.destinazione);
      const destinazione = await prisma.destinazione.findFirst({
        where: { nome: parsedData.destinazione }
      });
      console.log('🌍 Found destinazione:', destinazione);
      parsedData.id_destinazione = destinazione?.id;
      delete parsedData.destinazione;
    }
    
    if (parsedData.fornitore) {
      console.log('🏢 Looking for fornitore:', parsedData.fornitore);
      const fornitore = await prisma.fornitore.findFirst({
        where: { nome: parsedData.fornitore }
      });
      console.log('🏢 Found fornitore:', fornitore);
      parsedData.id_fornitore = fornitore?.id;
      delete parsedData.fornitore;
    }

    // Rimuovi campi che non servono per il database
    delete parsedData.groupId;
    delete parsedData.pagamenti;

    console.log('🔧 Data before validation:', parsedData);

    const validatedData = createServiziATerraSchema.safeParse(parsedData);
    if (!validatedData.success) {
      console.error('❌ Validation failed:', validatedData.error);
      console.error('❌ Validation issues:', validatedData.error.issues);
      return handleValidationErrors(validatedData.error);
    }

    console.log('✅ Validation successful:', validatedData.data);

    const servizio = await prisma.serviziATerra.create({
      data: {
        id_preventivo: validatedData.data.id_preventivo!,
        id_fornitore: validatedData.data.id_fornitore,
        id_destinazione: validatedData.data.id_destinazione,
        descrizione: validatedData.data.descrizione,
        data: validatedData.data.data,
        numero_notti: validatedData.data.numero_notti,
        numero_camere: validatedData.data.numero_camere,
        totale: validatedData.data.totale,
        valuta: validatedData.data.valuta,
        cambio: validatedData.data.cambio,
        ricarico: validatedData.data.ricarico,
        servizio_aggiuntivo: validatedData.data.servizio_aggiuntivo
      }
    });

    console.log('🎉 Servizio created successfully:', servizio.id);
    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: servizio as ServiziATerraType };
  } catch (error) {
    console.error('💥 Error in createServizioATerra:', error);
    return handlePrismaError(error);
  }
}

export async function getAllServiziATerra(): Promise<ServiziATerraType[]> {
  try {
    const servizi = await prisma.serviziATerra.findMany({
      orderBy: { data: 'desc' },
      include: {
        preventivo: true,
        destinazione: true,
        fornitore: true
      }
    });
    return servizi as ServiziATerraType[];
  } catch (error) {
    console.error('Error fetching servizi a terra:', error);
    return [];
  }
}

export async function fetchServiziATerraByPreventivoId(preventivoId: string): Promise<DBResult<ServiziATerraType[]>> {
  try {
    const servizi = await prisma.serviziATerra.findMany({
      where: { 
        id_preventivo: preventivoId,
        servizio_aggiuntivo: false
      },
      include: {
        destinazione: true,
        fornitore: true
      }
    });
    return { success: true, values: servizi as ServiziATerraType[] };
  } catch (error) {
    console.error('Error fetching servizi a terra by preventivo:', error);
    return { success: false, errorsMessage: 'Errore nel recupero servizi a terra' };
  }
}

export async function fetchServiziAggiuntiviByPreventivoId(preventivoId: string): Promise<DBResult<ServiziATerraType[]>> {
  try {
    const servizi = await prisma.serviziATerra.findMany({
      where: { 
        id_preventivo: preventivoId,
        servizio_aggiuntivo: true
      },
      include: {
        destinazione: true,
        fornitore: true
      }
    });
    return { success: true, values: servizi as ServiziATerraType[] };
  } catch (error) {
    console.error('Error fetching servizi aggiuntivi by preventivo:', error);
    return { success: false, errorsMessage: 'Errore nel recupero servizi aggiuntivi' };
  }
}

export async function fetchServizioATerraById(id: string): Promise<DBResult<ServiziATerraType>> {
  try {
    const servizio = await prisma.serviziATerra.findUnique({
      where: { id },
      include: {
        destinazione: true,
        fornitore: true
      }
    });
    
    if (!servizio) {
      return { success: false, errorsMessage: 'Servizio a terra non trovato' };
    }
    
    return { success: true, values: servizio as ServiziATerraType };
  } catch (error) {
    console.error('Error fetching servizio a terra by id:', error);
    return { success: false, errorsMessage: 'Errore nel recupero servizio a terra' };
  }
}

export async function updateServizioATerra(data: any): Promise<ApiResponse<ServiziATerraType>> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = updateServiziATerraSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const servizio = await prisma.serviziATerra.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: servizio as ServiziATerraType };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteServizioATerraById(id: string): Promise<ApiResponse> {
  try {
    await prisma.serviziATerra.delete({
      where: { id }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}
