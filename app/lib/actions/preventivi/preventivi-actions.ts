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
        }
      }
    });
    return preventivo;
  } catch (error) {
    console.error('Error fetching preventivo:', error);
    return null;
  }
}

export async function updatePreventivo(data: any): Promise<ApiResponse<PreventivoType>> {
  try {
    const parsedData = parseFormDates(data);
    const validatedData = updatePreventivoSchema.safeParse(parsedData);
    if (!validatedData.success) {
      return handleValidationErrors(validatedData.error);
    }

    const preventivo = await prisma.preventivo.update({
      where: { id: validatedData.data.id },
      data: validatedData.data
    });

    revalidatePath('/dashboard/preventivi-table');
    return { success: true, data: preventivo as PreventivoType };
  } catch (error) {
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

export async function getNumberOfPreventivi(): Promise<DBResult<number>> {
  try {
    const count = await prisma.preventivo.count();
    return { success: true, values: count };
  } catch (error) {
    console.error('Error counting preventivi:', error);
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

      // 2. Crea i servizi a terra
      if (data.serviziATerra && data.serviziATerra.length > 0) {
        for (const servizio of data.serviziATerra) {
          const parsedServizioData = parseFormDates(servizio);
          parsedServizioData.id_preventivo = preventivo.id;
          
          // Trova gli ID delle entità correlate
          if (parsedServizioData.destinazione) {
            const destinazione = await tx.destinazione.findFirst({
              where: { nome: parsedServizioData.destinazione }
            });
            parsedServizioData.id_destinazione = destinazione?.id;
          }
          
          if (parsedServizioData.fornitore) {
            const fornitore = await tx.fornitore.findFirst({
              where: { nome: parsedServizioData.fornitore }
            });
            parsedServizioData.id_fornitore = fornitore?.id;
          }

          // Rimuovi i campi nome che non servono per il database
          delete parsedServizioData.destinazione;
          delete parsedServizioData.fornitore;
          delete parsedServizioData.groupId;
          delete parsedServizioData.pagamenti;

          const validatedServizioData = createServiziATerraSchema.safeParse(parsedServizioData);
          if (validatedServizioData.success) {
            await tx.serviziATerra.create({
              data: {
                id_preventivo: validatedServizioData.data.id_preventivo!,
                id_fornitore: validatedServizioData.data.id_fornitore,
                id_destinazione: validatedServizioData.data.id_destinazione,
                descrizione: validatedServizioData.data.descrizione,
                data: validatedServizioData.data.data,
                numero_notti: validatedServizioData.data.numero_notti,
                numero_camere: validatedServizioData.data.numero_camere,
                totale: validatedServizioData.data.totale,
                valuta: validatedServizioData.data.valuta,
                cambio: validatedServizioData.data.cambio,
                ricarico: validatedServizioData.data.ricarico,
                servizio_aggiuntivo: validatedServizioData.data.servizio_aggiuntivo
              }
            });
          }
        }
      }

      // 3. Crea i servizi aggiuntivi
      if (data.serviziAggiuntivi && data.serviziAggiuntivi.length > 0) {
        for (const servizio of data.serviziAggiuntivi) {
          const parsedServizioData = parseFormDates(servizio);
          parsedServizioData.id_preventivo = preventivo.id;
          parsedServizioData.servizio_aggiuntivo = true;
          
          // Trova gli ID delle entità correlate
          if (parsedServizioData.destinazione) {
            const destinazione = await tx.destinazione.findFirst({
              where: { nome: parsedServizioData.destinazione }
            });
            parsedServizioData.id_destinazione = destinazione?.id;
          }
          
          if (parsedServizioData.fornitore) {
            const fornitore = await tx.fornitore.findFirst({
              where: { nome: parsedServizioData.fornitore }
            });
            parsedServizioData.id_fornitore = fornitore?.id;
          }

          // Rimuovi i campi nome che non servono per il database
          delete parsedServizioData.destinazione;
          delete parsedServizioData.fornitore;
          delete parsedServizioData.groupId;
          delete parsedServizioData.pagamenti;

          const validatedServizioData = createServiziATerraSchema.safeParse(parsedServizioData);
          if (validatedServizioData.success) {
            await tx.serviziATerra.create({
              data: validatedServizioData.data
            });
          }
        }
      }

      // 4. Crea i voli
      if (data.voli && data.voli.length > 0) {
        for (const volo of data.voli) {
          const parsedVoloData = parseFormDates(volo);
          parsedVoloData.id_preventivo = preventivo.id;
          
          // Trova l'ID del fornitore
          if (parsedVoloData.fornitore) {
            const fornitore = await tx.fornitore.findFirst({
              where: { nome: parsedVoloData.fornitore }
            });
            parsedVoloData.id_fornitore = fornitore?.id;
          }

          // Rimuovi i campi che non servono per il database
          delete parsedVoloData.fornitore;
          delete parsedVoloData.groupId;

          const validatedVoloData = createVoloSchema.safeParse(parsedVoloData);
          if (validatedVoloData.success) {
            await tx.volo.create({
              data: validatedVoloData.data
            });
          }
        }
      }

      // 5. Crea le assicurazioni
      if (data.assicurazioni && data.assicurazioni.length > 0) {
        for (const assicurazione of data.assicurazioni) {
          const parsedAssicurazioneData = { ...assicurazione };
          parsedAssicurazioneData.id_preventivo = preventivo.id;
          
          // Trova l'ID del fornitore
          if (parsedAssicurazioneData.fornitore) {
            const fornitore = await tx.fornitore.findFirst({
              where: { nome: parsedAssicurazioneData.fornitore }
            });
            parsedAssicurazioneData.id_fornitore = fornitore?.id;
          }

          // Rimuovi i campi che non servono per il database
          delete parsedAssicurazioneData.fornitore;
          delete parsedAssicurazioneData.groupId;

          const validatedAssicurazioneData = createAssicurazioneSchema.safeParse(parsedAssicurazioneData);
          if (validatedAssicurazioneData.success) {
            await tx.assicurazione.create({
              data: validatedAssicurazioneData.data
            });
          }
        }
      }

      // 6. Crea il preventivo al cliente
      if (data.preventivoAlCliente) {
        const preventivoAlClienteData = {
          id_preventivo: preventivo.id,
          descrizione_viaggio: data.preventivoAlCliente.descrizione_viaggio
        };

        const validatedPreventivoAlClienteData = createPreventivoAlClienteSchema.safeParse(preventivoAlClienteData);
        if (validatedPreventivoAlClienteData.success) {
          const preventivoAlCliente = await tx.preventivoAlCliente.create({
            data: validatedPreventivoAlClienteData.data
          });

          // Crea le righe del preventivo al cliente
          if (data.preventivoAlCliente.righePrimoTipo) {
            for (const row of data.preventivoAlCliente.righePrimoTipo) {
              const rowData = {
                preventivo_al_cliente_id: preventivoAlCliente.id,
                destinazione: row.destinazione,
                descrizione: row.descrizione,
                individuale: row.individuale,
                numero: row.numero,
                is_primo_tipo: true
              };

              const validatedRowData = createPreventivoAlClienteRowSchema.safeParse(rowData);
              if (validatedRowData.success) {
                await tx.preventivoAlClienteRow.create({
                  data: validatedRowData.data
                });
              }
            }
          }

          if (data.preventivoAlCliente.righeSecondoTipo) {
            for (const row of data.preventivoAlCliente.righeSecondoTipo) {
              const rowData = {
                preventivo_al_cliente_id: preventivoAlCliente.id,
                destinazione: row.destinazione,
                descrizione: row.descrizione,
                individuale: row.individuale,
                numero: row.numero,
                is_primo_tipo: false
              };

              const validatedRowData = createPreventivoAlClienteRowSchema.safeParse(rowData);
              if (validatedRowData.success) {
                await tx.preventivoAlClienteRow.create({
                  data: validatedRowData.data
                });
              }
            }
          }
        }
      }

      return preventivo;
    });

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
