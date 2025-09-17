"use server";

import { revalidatePath } from 'next/cache';
import type { Preventivo as PreventivoType } from '../../definitions';
import { prisma, handleValidationErrors, handlePrismaError, parseFormDates } from '../utils/helpers';
import type { ApiResponse, DBResult } from '../utils/types';
import { 
  preventivoSchema, 
  createPreventivoSchema, 
  updatePreventivoSchema,
  createServiziATerraSchema,
  createVoloSchema,
  createAssicurazioneSchema,
  createPreventivoAlClienteSchema,
  createPreventivoAlClienteRowSchema
} from '../entity-zod-schemas';
import { createServizioATerra } from '../servizi-a-terra/servizi-a-terra-actions';
import { createVolo } from '../voli/voli-actions';
import { createAssicurazione } from '../assicurazioni/assicurazioni-actions';
import { createPartecipante } from '../partecipanti/partecipanti-actions';
import { createIncassoPartecipante } from '../partecipanti/incassi-partecipanti-actions';
import { getBancaByNome } from '../banche/banche-actions';
import { createPreventivoAlClienteRow } from './preventivi-al-cliente-actions';

export async function createPreventivo(data: any): Promise<ApiResponse<PreventivoType>> {
  try {
    const parsedData = parseFormDates(data);
    // Set current date if not provided
    if (!parsedData.data) {
      parsedData.data = new Date();
    }
    
    const validatedData = createPreventivoSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const preventivo = await prisma.preventivo.create({
      data: {
        id_cliente: validatedData.data.id_cliente!,
        percentuale_ricarico: validatedData.data.percentuale_ricarico,
        note: validatedData.data.note,
        brand: validatedData.data.brand,
        adulti: validatedData.data.adulti,
        bambini: validatedData.data.bambini,
        destinazione: validatedData.data.destinazione,
        tipo_viaggio: validatedData.data.tipo_viaggio,
        note_operative: validatedData.data.note_operative,
        riferimento: validatedData.data.riferimento,
        data_partenza: validatedData.data.data_partenza,
        operatore: validatedData.data.operatore,
        feedback: validatedData.data.feedback,
        stato: validatedData.data.stato,
        numero_preventivo: validatedData.data.numero_preventivo,
        data: new Date()
      }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: preventivo as PreventivoType };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getAllPreventivi(): Promise<any[]> {
  try {
    const preventivi = await prisma.preventivo.findMany({
      orderBy: { data: 'desc' },
      include: {
        cliente: true
      }
    });
    return preventivi as any[];
  } catch (error) {
    console.error('Error fetching preventivi:', error);
    return [];
  }
}

export async function getPreventivo(id: string): Promise<any | null> {
  try {
    const preventivo = await prisma.preventivo.findUnique({
      where: { id },
      include: {
        cliente: true,
        serviziATerra: {
          include: {
            fornitore: true,
            destinazione: true
          }
        },
        voli: {
          include: {
            fornitore: true
          }
        },
        assicurazioni: {
          include: {
            fornitore: true
          }
        },
        preventiviAlCliente: {
          include: {
            rows: true
          }
        },
        partecipanti: {
          include: {
            incassi_partecipanti: {
              include: {
                banche: true
              }
            }
          }
        }
      }
    });
    return preventivo;
  } catch (error) {
    console.error('Error fetching preventivo:', error);
    return null;
  }
}

export async function getPreventivoByNumero(numeroPreventivo: string): Promise<any | null> {
  try {
    const preventivo = await prisma.preventivo.findFirst({
      where: { numero_preventivo: numeroPreventivo },
      include: {
        cliente: true,
        serviziATerra: {
          include: {
            fornitore: true,
            destinazione: true
          }
        },
        voli: {
          include: {
            fornitore: true
          }
        },
        assicurazioni: {
          include: {
            fornitore: true
          }
        },
        preventiviAlCliente: {
          include: {
            rows: true
          }
        },
        partecipanti: {
          include: {
            incassi_partecipanti: {
              include: {
                banche: true
              }
            }
          }
        }
      }
    });
    return preventivo;
  } catch (error) {
    console.error('Error fetching preventivo by numero:', error);
    return null;
  }
}

export async function updatePreventivo(data: any): Promise<ApiResponse<PreventivoType>> {
  try {
    console.log('🔧 updatePreventivo called with:', data);
    
    const parsedData = parseFormDates(data);
    console.log('📅 After parseFormDates:', parsedData);
    
    const validatedData = updatePreventivoSchema.safeParse(parsedData);
    if (!validatedData.success) {
      console.error('❌ Preventivo validation failed:', validatedData.error);
      console.error('❌ Validation issues:', validatedData.error.issues);
      return handleValidationErrors(validatedData.error);
    }

    console.log('✅ Preventivo validation successful:', validatedData.data);

    const preventivo = await prisma.preventivo.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    console.log('🎉 Preventivo updated successfully:', preventivo.id);
    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: preventivo as PreventivoType };
  } catch (error) {
    console.error('💥 Error in updatePreventivo:', error);
    return handlePrismaError(error);
  }
}

export async function deletePreventivo(id: string): Promise<ApiResponse> {
  try {
    await prisma.preventivo.delete({
      where: { id }
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function getPreventiviByCliente(clienteId: string): Promise<PreventivoType[]> {
  try {
    const preventivi = await prisma.preventivo.findMany({
      where: { id_cliente: clienteId },
      orderBy: { data: 'desc' },
      include: {
        cliente: true
      }
    });
    return preventivi as any;
  } catch (error) {
    console.error('Error fetching preventivi by cliente:', error);
    return [];
  }
}

export async function getMaxPreventivoNumber(): Promise<DBResult<number>> {
  try {
    const result = await prisma.preventivo.findMany({
      select: { numero_preventivo: true },
      where: { 
        numero_preventivo: { not: null } 
      }
    });

    // Se non ci sono preventivi, inizia da 0
    if (result.length === 0) {
      return { success: true, values: 0 };
    }

    // Estrae i numeri dai string formato "0001", "0015", etc.
    const numbers = result
      .map(p => {
        if (!p.numero_preventivo) return 0;
        // Converte da "0001" a 1, da "0015" a 15, etc.
        return parseInt(p.numero_preventivo, 10);
      })
      .filter(n => !isNaN(n) && n > 0); // Filtra numeri validi

    if (numbers.length === 0) {
      return { success: true, values: 0 };
    }

    // Trova il massimo
    const maxNumber = Math.max(...numbers);
    return { success: true, values: maxNumber };
  } catch (error) {
    console.error('Error finding max preventivo number:', error);
    return { success: false, errorsMessage: 'Errore nel recupero massimo numero preventivo' };
  }
}

export async function getNumberOfPreventivi(): Promise<DBResult<number>> {
  try {
    // Ora utilizza il massimo numero invece del count
    const result = await getMaxPreventivoNumber();
    return result;
  } catch (error) {
    console.error('Error getting preventivi number:', error);
    return { success: false, errorsMessage: 'Errore nel conteggio preventivi' };
  }
}

export async function fetchPreventiviByIdCliente(clienteId: string): Promise<DBResult<PreventivoType[]>> {
  try {
    const preventivi = await prisma.preventivo.findMany({
      where: { id_cliente: clienteId },
      orderBy: { data: 'desc' },
      include: {
        cliente: true
      }
    });
    return { success: true, values: preventivi as PreventivoType[] };
  } catch (error) {
    console.error('Error fetching preventivi by cliente:', error);
    return { success: false, errorsMessage: 'Errore nel recupero preventivi del cliente' };
  }
}

export async function fetchAllPreventiviWithCliente(): Promise<PreventivoType[]> {
  try {
    const preventivi = await prisma.preventivo.findMany({
      orderBy: { data: 'desc' },
      include: {
        cliente: true
      }
    });
    return preventivi as PreventivoType[];
  } catch (error) {
    console.error('Error fetching preventivi with cliente:', error);
    return [];
  }
}

export async function submitCreatePreventivoGI(data: any): Promise<ApiResponse> {
  try {
    console.log('submitCreatePreventivoGI called with:', data);
    
    // Validazione dei dati in ingresso
    if (!data.cliente || !data.preventivo) {
      return {
        success: false,
        error: 'Dati cliente o preventivo mancanti'
      };
    }

    // Inizia una transazione per creare tutto insieme
    const result = await prisma.$transaction(async (tx) => {
      // 1. Crea il preventivo principale
      const parsedPreventivoData = parseFormDates(data.preventivo);
      if (!parsedPreventivoData.data) {
        parsedPreventivoData.data = new Date();
      }

      // Aggiungi l'ID del cliente al preventivo
      parsedPreventivoData.id_cliente = data.cliente.id;

      const validatedPreventivoData = createPreventivoSchema.safeParse(parsedPreventivoData);
      if (!validatedPreventivoData.success) {
        throw new Error(`Errore validazione preventivo: ${JSON.stringify(validatedPreventivoData.error.issues)}`);
      }

      const preventivo = await tx.preventivo.create({
        data: {
          id_cliente: validatedPreventivoData.data.id_cliente!,
          percentuale_ricarico: validatedPreventivoData.data.percentuale_ricarico,
          note: validatedPreventivoData.data.note,
          brand: validatedPreventivoData.data.brand,
          adulti: validatedPreventivoData.data.adulti,
          bambini: validatedPreventivoData.data.bambini,
          destinazione: validatedPreventivoData.data.destinazione,
          tipo_viaggio: validatedPreventivoData.data.tipo_viaggio,
          note_operative: validatedPreventivoData.data.note_operative,
          riferimento: validatedPreventivoData.data.riferimento,
          data_partenza: validatedPreventivoData.data.data_partenza,
          operatore: validatedPreventivoData.data.operatore,
          feedback: validatedPreventivoData.data.feedback,
          stato: validatedPreventivoData.data.stato,
          numero_preventivo: validatedPreventivoData.data.numero_preventivo,
          data: new Date()
        }
      });





      return preventivo;
    });

    // 2. Ora crea i servizi (fuori dalla transazione, dopo che il preventivo esiste)
    // Crea i servizi a terra
    console.log('🏗️ Creating servizi a terra:', data.serviziATerra?.length || 0);
    if (data.serviziATerra && data.serviziATerra.length > 0) {
      for (const servizio of data.serviziATerra) {
        console.log(`Creating servizio a terra:`, servizio);
        const servizioResult = await createServizioATerra(servizio, result.id, false);
        if (!servizioResult.success) {
          console.error(`Failed to create servizio a terra:`, servizioResult);
          throw new Error(`Errore nella creazione del servizio a terra: ${servizioResult.error || 'Errore sconosciuto'}`);
        }
      }
    }

    // 3. Crea i servizi aggiuntivi
    console.log('🏗️ Creating servizi aggiuntivi:', data.serviziAggiuntivi?.length || 0);
    if (data.serviziAggiuntivi && data.serviziAggiuntivi.length > 0) {
      for (const servizio of data.serviziAggiuntivi) {
        console.log(`Creating servizio aggiuntivo:`, servizio);
        const servizioResult = await createServizioATerra(servizio, result.id, true);
        if (!servizioResult.success) {
          console.error(`Failed to create servizio aggiuntivo:`, servizioResult);
          throw new Error(`Errore nella creazione del servizio aggiuntivo: ${servizioResult.error || 'Errore sconosciuto'}`);
        }
      }
    }

    // 4. Crea i voli
    console.log('🏗️ Creating voli:', data.voli?.length || 0);
    if (data.voli && data.voli.length > 0) {
      for (const volo of data.voli) {
        console.log(`Creating volo:`, volo);
        const voloData = { ...volo, id_preventivo: result.id };
        const voloResult = await createVolo(voloData);
        if (!voloResult.success) {
          console.error(`Failed to create volo:`, voloResult);
          throw new Error(`Errore nella creazione del volo: ${voloResult.error || 'Errore sconosciuto'}`);
        }
      }
    }

    // 5. Crea le assicurazioni
    console.log('🏗️ Creating assicurazioni:', data.assicurazioni?.length || 0);
    if (data.assicurazioni && data.assicurazioni.length > 0) {
      for (const assicurazione of data.assicurazioni) {
        console.log(`Creating assicurazione:`, assicurazione);
        const assicurazioneData = { ...assicurazione, id_preventivo: result.id };
        const assicurazioneResult = await createAssicurazione(assicurazioneData);
        if (!assicurazioneResult.success) {
          console.error(`Failed to create assicurazione:`, assicurazioneResult);
          throw new Error(`Errore nella creazione dell'assicurazione: ${assicurazioneResult.error || 'Errore sconosciuto'}`);
        }
      }
    }

    // 6. Crea i partecipanti
    console.log('🏗️ Creating partecipanti:', data.partecipanti?.length || 0);
    console.log('🔥 SERVER: partecipanti data structure:', JSON.stringify(data.partecipanti?.map((p: any) => ({
      nome: p.nome,
      cognome: p.cognome,
      tot_quota: p.tot_quota,
      id: p.id,
      incassiCount: p.incassi?.length || 0,
      keys: Object.keys(p)
    })), null, 2));

    
    if (data.partecipanti && data.partecipanti.length > 0) {
      for (const partecipante of data.partecipanti) {
        console.log(`Creating partecipante:`, partecipante);
        const partecipanteData = { ...partecipante, id_preventivo: result.id };
        const partecipanteResult = await createPartecipante(partecipanteData);
        if (!partecipanteResult.success) {
          console.error(`Failed to create partecipante:`, partecipanteResult);
          throw new Error(`Errore nella creazione del partecipante: ${partecipanteResult.error || 'Errore sconosciuto'}`);
        }

        // Crea gli incassi del partecipante se presenti
        if (partecipante.incassi && partecipante.incassi.length > 0) {
          console.log(`Creating ${partecipante.incassi.length} incassi for partecipante`);
                     for (const incasso of partecipante.incassi) {
             console.log(`Creating incasso:`, incasso);
             
             // Trova l'ID della banca se il nome è fornito
             let id_banca = null;
             if (incasso.banca && incasso.banca.trim() !== '') {
               const bancaResult = await getBancaByNome(incasso.banca);
               if (bancaResult.success && bancaResult.values) {
                 id_banca = bancaResult.values.id;
               } else {
                 console.warn(`Banca '${incasso.banca}' non trovata, incasso salvato senza banca`);
               }
             }

             const incassoData = { 
               id_partecipante: partecipanteResult.data!.id,
               id_banca: id_banca,
               importo: incasso.importo_in_euro,
               importo_in_valuta: incasso.importo_in_valuta,
               data_scadenza: incasso.data_scadenza ? new Date(incasso.data_scadenza) : undefined,
               data_incasso: incasso.data_pagamento ? new Date(incasso.data_pagamento) : undefined
             };
             const incassoResult = await createIncassoPartecipante(incassoData);
            if (!incassoResult.success) {
              console.error(`Failed to create incasso for partecipante:`, incassoResult);
              throw new Error(`Errore nella creazione dell'incasso del partecipante: ${incassoResult.error || 'Errore sconosciuto'}`);
            }
          }
        }
      }
    }

    // 7. Crea il preventivo al cliente
    console.log('🏗️ Creating preventivo al cliente');
    if (data.preventivoAlCliente) {
      await updatePreventivoAlClienteCompleto(result.id, data.preventivoAlCliente);
    }

    // Revalida le pagine che potrebbero essere cambiate
    revalidatePath('/dashboard/preventivi-table');
    revalidatePath('/dashboard/general-interface');

    return { 
      success: true, 
      data: result
    };
  } catch (error) {
    console.error('Errore in submitCreatePreventivoGI:', error);
    return handlePrismaError(error);
  }
}

// Funzione semplificata per aggiornare preventivo completo
export async function updatePreventivoCompleto(data: any): Promise<ApiResponse> {
  try {
    console.log('updatePreventivoCompleto called with:', data);
    
    // Esegui operazioni sequenzialmente per evitare conflitti
    // 1. Aggiorna il preventivo principale
    const preventivoResult = await updatePreventivo(data.preventivo);
    if (!preventivoResult.success) {
      throw new Error(`Errore aggiornamento preventivo: ${preventivoResult.error}`);
    }
    
    // 2. Gestisci servizi a terra (elimina tutti e ricrea)
    await updateServiziATerraCompleto(data.preventivo.id, data.serviziATerra || [], false);
    
    // 3. Gestisci servizi aggiuntivi (elimina tutti e ricrea)
    await updateServiziATerraCompleto(data.preventivo.id, data.serviziAggiuntivi || [], true);
    
    // 4. Gestisci voli (elimina tutti e ricrea)
    await updateVoliCompleto(data.preventivo.id, data.voli || []);
    
    // 5. Gestisci assicurazioni (elimina tutti e ricrea)
    await updateAssicurazioniCompleto(data.preventivo.id, data.assicurazioni || []);
    
    // 6. Gestisci partecipanti (elimina tutti e ricrea)
    await updatePartecipantiCompleto(data.preventivo.id, data.partecipanti || []);
    
    // 7. Gestisci preventivo al cliente
    await updatePreventivoAlClienteCompleto(data.preventivo.id, data.preventivoAlCliente);

    revalidatePath('/dashboard/preventivi-table');
    revalidatePath('/dashboard/general-interface');

    return { success: true };
  } catch (error) {
    console.error('Errore in updatePreventivoCompleto:', error);
    return handlePrismaError(error);
  }
}

// Helper functions per l'aggiornamento
async function updateServiziATerraCompleto(preventivoId: string, servizi: any[], isServizioAggiuntivo: boolean): Promise<void> {
  console.log(`Updating servizi a terra: ${servizi.length} servizi, isServizioAggiuntivo: ${isServizioAggiuntivo}`);
  
  // Prima trova tutti i servizi esistenti per eliminare i pagamenti
  const existingServizi = await prisma.serviziATerra.findMany({
    where: { 
      id_preventivo: preventivoId,
      servizio_aggiuntivo: isServizioAggiuntivo
    },
    select: { id: true }
  });

  // Elimina tutti i pagamenti dei servizi esistenti
  if (existingServizi.length > 0) {
    await prisma.pagamenti_servizi_a_terra.deleteMany({
      where: {
        id_servizio_a_terra: {
          in: existingServizi.map(s => s.id)
        }
      }
    });
  }

  // Ora elimina tutti i servizi esistenti del tipo specificato
  await prisma.serviziATerra.deleteMany({
    where: { 
      id_preventivo: preventivoId,
      servizio_aggiuntivo: isServizioAggiuntivo
    }
  });

  // Crea i nuovi servizi
  for (let i = 0; i < servizi.length; i++) {
    const servizio = servizi[i];
    console.log(`Creating servizio ${i + 1}/${servizi.length}:`, servizio);
    
    try {
      const result = await createServizioATerra(servizio, preventivoId, isServizioAggiuntivo);
      if (!result.success) {
        console.error(`Failed to create servizio ${i + 1}:`, result);
        throw new Error(`Errore nella creazione del servizio ${i + 1}: ${result.error || 'Errore sconosciuto'}`);
      }
      console.log(`Successfully created servizio ${i + 1}`);
    } catch (error) {
      console.error(`Error creating servizio ${i + 1}:`, error);
      throw error;
    }
  }
}

async function updateVoliCompleto(preventivoId: string, voli: any[]): Promise<void> {
  console.log(`Updating voli: ${voli.length} voli`);
  
  // Prima trova tutti i voli esistenti per eliminare i pagamenti
  const existingVoli = await prisma.volo.findMany({
    where: { id_preventivo: preventivoId },
    select: { id: true }
  });

  // Elimina tutti i pagamenti dei voli esistenti
  if (existingVoli.length > 0) {
    await prisma.pagamenti_voli.deleteMany({
      where: {
        id_volo: {
          in: existingVoli.map(v => v.id)
        }
      }
    });
  }

  // Ora elimina tutti i voli esistenti
  await prisma.volo.deleteMany({
    where: { id_preventivo: preventivoId }
  });

  // Crea i nuovi voli
  for (let i = 0; i < voli.length; i++) {
    const volo = voli[i];
    console.log(`Creating volo ${i + 1}/${voli.length}:`, volo);
    
    try {
      const voloData = { ...volo, id_preventivo: preventivoId };
      const result = await createVolo(voloData);
      if (!result.success) {
        console.error(`Failed to create volo ${i + 1}:`, result);
        throw new Error(`Errore nella creazione del volo ${i + 1}: ${result.error || 'Errore sconosciuto'}`);
      }
      console.log(`Successfully created volo ${i + 1}`);
    } catch (error) {
      console.error(`Error creating volo ${i + 1}:`, error);
      throw error;
    }
  }
}

async function updateAssicurazioniCompleto(preventivoId: string, assicurazioni: any[]): Promise<void> {
  console.log(`Updating assicurazioni: ${assicurazioni.length} assicurazioni`);
  
  // Elimina tutte le assicurazioni esistenti
  await prisma.assicurazione.deleteMany({
    where: { id_preventivo: preventivoId }
  });

  // Crea le nuove assicurazioni
  for (let i = 0; i < assicurazioni.length; i++) {
    const assicurazione = assicurazioni[i];
    console.log(`Creating assicurazione ${i + 1}/${assicurazioni.length}:`, assicurazione);
    
    try {
      const assicurazioneData = { ...assicurazione, id_preventivo: preventivoId };
      const result = await createAssicurazione(assicurazioneData);
      if (!result.success) {
        console.error(`Failed to create assicurazione ${i + 1}:`, result);
        throw new Error(`Errore nella creazione dell'assicurazione ${i + 1}: ${result.error || 'Errore sconosciuto'}`);
      }
      console.log(`Successfully created assicurazione ${i + 1}`);
    } catch (error) {
      console.error(`Error creating assicurazione ${i + 1}:`, error);
      throw error;
    }
  }
}

async function updatePartecipantiCompleto(preventivoId: string, partecipanti: any[]): Promise<void> {
  console.log(`Updating partecipanti: ${partecipanti.length} partecipanti`);
  
  // Prima trova tutti i partecipanti esistenti per eliminare gli incassi
  const existingPartecipanti = await prisma.partecipanti.findMany({
    where: { id_preventivo: preventivoId },
    select: { id: true }
  });

  // Elimina tutti gli incassi dei partecipanti esistenti
  if (existingPartecipanti.length > 0) {
    await prisma.incassi_partecipanti.deleteMany({
      where: {
        id_partecipante: {
          in: existingPartecipanti.map(p => p.id)
        }
      }
    });
  }

  // Ora elimina tutti i partecipanti esistenti
  await prisma.partecipanti.deleteMany({
    where: { id_preventivo: preventivoId }
  });

  // Crea i nuovi partecipanti
  for (let i = 0; i < partecipanti.length; i++) {
    const partecipante = partecipanti[i];
    console.log(`Creating partecipante ${i + 1}/${partecipanti.length}:`, partecipante);
    
    try {
      const partecipanteData = { ...partecipante, id_preventivo: preventivoId };
      const result = await createPartecipante(partecipanteData);
      if (!result.success) {
        console.error(`Failed to create partecipante ${i + 1}:`, result);
        throw new Error(`Errore nella creazione del partecipante ${i + 1}: ${result.error || 'Errore sconosciuto'}`);
      }
      console.log(`Successfully created partecipante ${i + 1}`);

      // Crea gli incassi del partecipante se presenti
      if (partecipante.incassi && partecipante.incassi.length > 0) {
        console.log(`Creating ${partecipante.incassi.length} incassi for partecipante ${i + 1}`);
        for (let j = 0; j < partecipante.incassi.length; j++) {
          const incasso = partecipante.incassi[j];
          console.log(`Creating incasso ${j + 1}/${partecipante.incassi.length}:`, incasso);
          
                     try {
                           // Trova l'ID della banca se il nome è fornito
              let id_banca = null;
              if (incasso.banca && incasso.banca.trim() !== '') {
                const bancaResult = await getBancaByNome(incasso.banca);
                if (bancaResult.success && bancaResult.values) {
                  id_banca = bancaResult.values.id;
                } else {
                  console.warn(`Banca '${incasso.banca}' non trovata, incasso salvato senza banca`);
                }
              }

             const incassoData = { 
               id_partecipante: result.data!.id,
               id_banca: id_banca,
               importo: incasso.importo_in_euro,
               importo_in_valuta: incasso.importo_in_valuta,
               data_scadenza: incasso.data_scadenza ? new Date(incasso.data_scadenza) : undefined,
               data_incasso: incasso.data_pagamento ? new Date(incasso.data_pagamento) : undefined
             };
             const incassoResult = await createIncassoPartecipante(incassoData);
            if (!incassoResult.success) {
              console.error(`Failed to create incasso ${j + 1} for partecipante ${i + 1}:`, incassoResult);
              throw new Error(`Errore nella creazione dell'incasso ${j + 1} del partecipante ${i + 1}: ${incassoResult.error || 'Errore sconosciuto'}`);
            }
            console.log(`Successfully created incasso ${j + 1} for partecipante ${i + 1}`);
          } catch (error) {
            console.error(`Error creating incasso ${j + 1} for partecipante ${i + 1}:`, error);
            throw error;
          }
        }
      }
    } catch (error) {
      console.error(`Error creating partecipante ${i + 1}:`, error);
      throw error;
    }
  }
}

async function updatePreventivoAlClienteCompleto(preventivoId: string, preventivoAlCliente: any): Promise<void> {
  if (!preventivoAlCliente) {
    console.log('No preventivo al cliente to update');
    return;
  }

  console.log('Updating preventivo al cliente:', preventivoAlCliente);

  // Trova il preventivo al cliente esistente
  const existing = await prisma.preventivoAlCliente.findFirst({
    where: { id_preventivo: preventivoId },
    include: { rows: true }
  });

  if (existing) {
    // Elimina le righe esistenti
    await prisma.preventivoAlClienteRow.deleteMany({
      where: { id_preventivo_al_cliente: existing.id }
    });

    // Aggiorna la descrizione
    await prisma.preventivoAlCliente.update({
      where: { id: existing.id },
      data: {
        descrizione_viaggio: preventivoAlCliente.descrizione_viaggio
      }
    });

    // Crea le nuove righe primo tipo
    if (preventivoAlCliente.righePrimoTipo && preventivoAlCliente.righePrimoTipo.length > 0) {
      console.log(`Creating ${preventivoAlCliente.righePrimoTipo.length} righe primo tipo`);
      for (let i = 0; i < preventivoAlCliente.righePrimoTipo.length; i++) {
        const row = preventivoAlCliente.righePrimoTipo[i];
        try {
          const result = await createPreventivoAlClienteRow(row, true, existing.id);
          if (!result.success) {
            console.error(`Failed to create riga primo tipo ${i + 1}:`, result);
            throw new Error(`Errore nella creazione della riga primo tipo ${i + 1}: ${result.error || 'Errore sconosciuto'}`);
          }
        } catch (error) {
          console.error(`Error creating riga primo tipo ${i + 1}:`, error);
          throw error;
        }
      }
    }

    // Crea le nuove righe secondo tipo
    if (preventivoAlCliente.righeSecondoTipo && preventivoAlCliente.righeSecondoTipo.length > 0) {
      console.log(`Creating ${preventivoAlCliente.righeSecondoTipo.length} righe secondo tipo`);
      for (let i = 0; i < preventivoAlCliente.righeSecondoTipo.length; i++) {
        const row = preventivoAlCliente.righeSecondoTipo[i];
        try {
          const result = await createPreventivoAlClienteRow(row, false, existing.id);
          if (!result.success) {
            console.error(`Failed to create riga secondo tipo ${i + 1}:`, result);
            throw new Error(`Errore nella creazione della riga secondo tipo ${i + 1}: ${result.error || 'Errore sconosciuto'}`);
          }
        } catch (error) {
          console.error(`Error creating riga secondo tipo ${i + 1}:`, error);
          throw error;
        }
      }
    }
  } else {
    console.log('No existing preventivo al cliente found');
  }
}
