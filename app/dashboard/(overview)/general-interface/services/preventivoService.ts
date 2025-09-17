import { 
  getNumberOfPreventivi,
  submitCreatePreventivoGI,
  updatePreventivoCompleto,
  fetchServiziATerraByPreventivoId,
  fetchServiziAggiuntiviByPreventivoId,
  fetchVoliByPreventivoId,
  fetchAssicurazioniByPreventivoId,
  fetchPreventivoAlClienteByPreventivoId,
  getPartecipantiByPreventivo,
  getPreventivoByNumero
} from '@/app/lib/actions';
import { 
  Data, 
  PreventivoInputGroup,
  ClienteInputGroup,
  ServizioATerraInputGroup,
  VoloInputGroup,
  AssicurazioneInputGroup,
  PreventivoAlClienteInputGroup,
  PartecipanteInputGroup,
  Pagamento
} from '../general-interface.defs';
import { dataErrors, validationErrorsToString, numberToExcelFormat } from '../helpers';
import { debugDataConversion, validateDateFields } from './debugUtils';

export class PreventivoService {
  
  // Helper per convertire class instances a plain objects
  private static convertToPlainObject(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }
    
    if (obj instanceof Date) {
      return obj.toISOString();
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => PreventivoService.convertToPlainObject(item));
    }
    
    if (typeof obj === 'object') {
      const plainObj: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          plainObj[key] = PreventivoService.convertToPlainObject(obj[key]);
        }
      }
      return plainObj;
    }
    
    return obj;
  }

  static async getNextPreventivoNumber(): Promise<{ success: boolean; numeroPreventivo?: string; error?: string }> {
    try {
      const result = await getNumberOfPreventivi();
      
      if (result.success) {
        const numeroPreventivo = numberToExcelFormat((result.values || 0) + 1);
        return {
          success: true,
          numeroPreventivo,
          error: undefined
        };
      } else {
        return {
          success: false,
          error: result.errorsMessage || 'Errore nel recupero numero preventivi'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.toString()
      };
    }
  }

  static async duplicatePreventivo(data: Data) {
    console.log('🔥 DUPLICATE: Starting with partecipanti count:', data.partecipanti?.length || 0);
    if (data.partecipanti && data.partecipanti.length > 0) {
      console.log('🔥 DUPLICATE: First partecipante:', {
        nome: data.partecipanti[0].nome,
        cognome: data.partecipanti[0].cognome,
        tot_quota: data.partecipanti[0].tot_quota,
        incassiCount: data.partecipanti[0].incassi?.length || 0
      });
    }
    
    // Prima ottieni il prossimo numero preventivo
    const numeroResult = await this.getNextPreventivoNumber();
    if (!numeroResult.success) {
      return {
        success: false,
        error: numeroResult.error || 'Errore nel recupero numero preventivo'
      };
    }

    // Crea una copia dei dati rimuovendo gli ID esistenti e aggiornando il numero preventivo
    const duplicatedData: Data = {
      cliente: data.cliente,
      preventivo: data.preventivo ? {
        ...data.preventivo,
        id: undefined, // Rimuove l'ID esistente per crearne uno nuovo
        numero_preventivo: numeroResult.numeroPreventivo!
      } : undefined,
      serviziATerra: data.serviziATerra?.map(servizio => ({
        ...servizio,
        id: undefined // Rimuove gli ID esistenti
      })),
      serviziAggiuntivi: data.serviziAggiuntivi?.map(servizio => ({
        ...servizio,
        id: undefined // Rimuove gli ID esistenti
      })),
      voli: data.voli?.map(volo => ({
        ...volo,
        id: undefined // Rimuove gli ID esistenti
      })),
      assicurazioni: data.assicurazioni?.map(assicurazione => ({
        ...assicurazione,
        id: undefined // Rimuove gli ID esistenti
      })),
      partecipanti: data.partecipanti?.map(partecipante => {
        const duplicatedIncassi = partecipante.incassi?.map(incasso => 
          new Pagamento(
            undefined, // Rimuove l'ID dell'incasso
            incasso.banca,
            incasso.data_scadenza,
            incasso.data_pagamento,
            incasso.importo_in_valuta,
            incasso.importo_in_euro
          )
        ) || [];
        
        return new PartecipanteInputGroup(
          partecipante.groupId,
          partecipante.nome,
          partecipante.cognome,
          partecipante.tot_quota,
          undefined, // Rimuove l'ID del partecipante
          duplicatedIncassi
        );
      }),
      preventivoAlCliente: data.preventivoAlCliente ? {
        ...data.preventivoAlCliente,
        id: undefined, // Rimuove l'ID esistente
        righePrimoTipo: data.preventivoAlCliente.righePrimoTipo?.map(row => ({
          ...row,
          id: undefined // Rimuove gli ID esistenti
        })),
        righeSecondoTipo: data.preventivoAlCliente.righeSecondoTipo?.map(row => ({
          ...row,
          id: undefined // Rimuove gli ID esistenti
        }))
      } : undefined
    };

    console.log('🔥 DUPLICATE: After processing, partecipanti count:', duplicatedData.partecipanti?.length || 0);
    if (duplicatedData.partecipanti && duplicatedData.partecipanti.length > 0) {
      console.log('🔥 DUPLICATE: First duplicated partecipante:', {
        nome: duplicatedData.partecipanti[0].nome,
        cognome: duplicatedData.partecipanti[0].cognome,
        tot_quota: duplicatedData.partecipanti[0].tot_quota,
        incassiCount: duplicatedData.partecipanti[0].incassi?.length || 0,
        hasId: !!duplicatedData.partecipanti[0].id,
        constructor: duplicatedData.partecipanti[0].constructor.name
      });
    }

    // Usa il metodo createPreventivo per creare il duplicato
    return await this.createPreventivo(duplicatedData);
  }

  static async createPreventivo(data: Data) {
    console.log('🔥 CREATE: Received partecipanti count:', data.partecipanti?.length || 0);
    if (data.partecipanti && data.partecipanti.length > 0) {
      console.log('🔥 CREATE: First partecipante before conversion:', {
        nome: data.partecipanti[0].nome,
        cognome: data.partecipanti[0].cognome,
        tot_quota: data.partecipanti[0].tot_quota,
        incassiCount: data.partecipanti[0].incassi?.length || 0,
        hasId: !!data.partecipanti[0].id,
        constructor: data.partecipanti[0].constructor.name
      });
    }

    // Validazione dati obbligatori
    const errors = dataErrors(data);
    if (errors.length > 0) {
      return {
        success: false,
        error: errors.join('\n')
      };
    }

    try {
      console.log('🎯 PreventivoService.createPreventivo - Partecipanti before conversion:', 
        JSON.stringify(data.partecipanti?.map((p: any) => ({
          nome: p.nome,
          cognome: p.cognome,
          incassiCount: p.incassi?.length || 0,
          incassi: p.incassi
        })), null, 2)
      );
      
      const plainData = PreventivoService.convertToPlainObject(data);
      
      console.log('🔥 CREATE: After conversion, partecipanti count:', plainData.partecipanti?.length || 0);
      if (plainData.partecipanti && plainData.partecipanti.length > 0) {
        console.log('🔥 CREATE: First partecipante after conversion:', {
          nome: plainData.partecipanti[0].nome,
          cognome: plainData.partecipanti[0].cognome,
          tot_quota: plainData.partecipanti[0].tot_quota,
          incassiCount: plainData.partecipanti[0].incassi?.length || 0,
          hasId: !!plainData.partecipanti[0].id
        });
      }
      
      console.log('🎯 PreventivoService.createPreventivo - Partecipanti after conversion:', 
        JSON.stringify(plainData.partecipanti?.map((p: any) => ({
          nome: p.nome,
          cognome: p.cognome,
          incassiCount: p.incassi?.length || 0,
          incassi: p.incassi
        })), null, 2)
      );
      
      console.log('🔥 CREATE: About to send to server, full data keys:', Object.keys(plainData));
      const result = await submitCreatePreventivoGI(plainData);
      
      if (result.success) {
        return {
          success: true,
          error: null
        };
      } else {
        return {
          success: false,
          error: result.error || validationErrorsToString(result.errors)
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.toString()
      };
    }
  }

  static async updatePreventivo(data: Data) {
    // Validazione dati obbligatori
    const errors = dataErrors(data);
    if (errors.length > 0) {
      return {
        success: false,
        error: errors.join('\n')
      };
    }

    try {
      // Debug data prima della conversione
      debugDataConversion(data, 'Data Before Conversion');
      console.log('🎯 PreventivoService.updatePreventivo - Partecipanti before conversion:', 
        JSON.stringify(data.partecipanti?.map((p: any) => ({
          nome: p.nome,
          cognome: p.cognome,
          incassiCount: p.incassi?.length || 0,
          incassi: p.incassi
        })), null, 2)
      );
      
      const plainData = PreventivoService.convertToPlainObject(data);
      
      // Debug data dopo la conversione
      debugDataConversion(plainData, 'Data After Conversion');
      console.log('🎯 PreventivoService.updatePreventivo - Partecipanti after conversion:', 
        JSON.stringify(plainData.partecipanti?.map((p: any) => ({
          nome: p.nome,
          cognome: p.cognome,
          incassiCount: p.incassi?.length || 0,
          incassi: p.incassi
        })), null, 2)
      );
      
      // Valida che non ci siano date invalide
      const dateErrors = validateDateFields(plainData, 'PlainData');
      if (dateErrors.length > 0) {
        console.error('❌ Date validation errors:', dateErrors);
      }
      
      const result = await updatePreventivoCompleto(plainData);
      
      if (result.success) {
        return {
          success: true,
          error: null
        };
      } else {
        return {
          success: false,
          error: result.error || 'Errore nell\'aggiornamento del preventivo'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.toString()
      };
    }
  }

  static async fetchPreventivoCompleto(preventivo: PreventivoInputGroup) {
    try {
      const [serviziATerra, serviziAggiuntivi, voli, assicurazioni, preventivoAlCliente, partecipanti] = await Promise.all([
        fetchServiziATerraByPreventivoId(preventivo.id),
        fetchServiziAggiuntiviByPreventivoId(preventivo.id),
        fetchVoliByPreventivoId(preventivo.id),
        fetchAssicurazioniByPreventivoId(preventivo.id),
        fetchPreventivoAlClienteByPreventivoId(preventivo.id),
        getPartecipantiByPreventivo(preventivo.id)
      ]);
      
      console.log('🔍 PreventivoService.fetchPreventivoCompleto - Raw partecipanti from DB:', JSON.stringify(partecipanti, null, 2));

      // Verifica che tutte le chiamate siano andate a buon fine
      const allResults = [serviziATerra, serviziAggiuntivi, voli, assicurazioni, preventivoAlCliente, partecipanti];
      const failedResults = allResults.filter(r => !r.success);
      
      if (failedResults.length > 0) {
        const errorMessage = failedResults.map(r => r.errorsMessage).join('\n');
        return {
          success: false,
          data: null,
          error: errorMessage
        };
      }

      return {
        success: true,
        data: {
          serviziATerra: serviziATerra.values,
          serviziAggiuntivi: serviziAggiuntivi.values,
          voli: voli.values,
          assicurazioni: assicurazioni.values,
          preventivoAlCliente: preventivoAlCliente.values,
          partecipanti: partecipanti.values
        },
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.toString()
      };
    }
  }

  static async fetchPreventivoCompletoByNumero(numeroPreventivo: string) {
    try {
      // Prima cerca il preventivo per numero
      const preventivo = await getPreventivoByNumero(numeroPreventivo);
      
      if (!preventivo) {
        return {
          success: false,
          data: null,
          error: `Preventivo con numero ${numeroPreventivo} non trovato`
        };
      }

      // Poi carica tutti i dati correlati
      const [serviziATerra, serviziAggiuntivi, voli, assicurazioni, preventivoAlCliente, partecipanti] = await Promise.all([
        fetchServiziATerraByPreventivoId(preventivo.id),
        fetchServiziAggiuntiviByPreventivoId(preventivo.id),
        fetchVoliByPreventivoId(preventivo.id),
        fetchAssicurazioniByPreventivoId(preventivo.id),
        fetchPreventivoAlClienteByPreventivoId(preventivo.id),
        getPartecipantiByPreventivo(preventivo.id)
      ]);
      
      console.log('🔍 PreventivoService.fetchPreventivoCompletoByNumero - Raw partecipanti from DB:', JSON.stringify(partecipanti, null, 2));

      // Verifica che tutte le chiamate siano andate a buon fine
      const allResults = [serviziATerra, serviziAggiuntivi, voli, assicurazioni, preventivoAlCliente, partecipanti];
      const failedResults = allResults.filter(r => !r.success);
      
      if (failedResults.length > 0) {
        const errorMessage = failedResults.map(r => r.errorsMessage).join('\n');
        return {
          success: false,
          data: null,
          error: errorMessage
        };
      }

      return {
        success: true,
        data: {
          preventivo,
          serviziATerra: serviziATerra.values,
          serviziAggiuntivi: serviziAggiuntivi.values,
          voli: voli.values,
          assicurazioni: assicurazioni.values,
          preventivoAlCliente: preventivoAlCliente.values,
          partecipanti: partecipanti.values
        },
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.toString()
      };
    }
  }
}
