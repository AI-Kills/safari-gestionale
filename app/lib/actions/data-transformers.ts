import { 
  ServizioATerraInputGroup, 
  VoloInputGroup, 
  AssicurazioneInputGroup, 
  PreventivoAlClienteInputGroup,
  PreventivoAlClienteRow 
} from '@/app/dashboard/(overview)/general-interface/general-interface.defs';
import { getDestinazioneById, getFornitoreById } from './actions';
import type { PreventivoAlCliente } from '../definitions';

// Trasformatori per InputGroups
export class DataTransformers {
  
  static async serviziATerraToInputGroup(servizi: any[]): Promise<ServizioATerraInputGroup[]> {
    const transformedServices = await Promise.all(
      servizi.map(async (servizio, index) => {
        const [destinazione, fornitore] = await Promise.all([
          servizio.id_destinazione ? this.getDestinazioneNome(servizio.id_destinazione) : "",
          servizio.id_fornitore ? this.getFornitoreNome(servizio.id_fornitore) : ""
        ]);

        return new ServizioATerraInputGroup(
          index,
          destinazione,
          fornitore,
          servizio.descrizione,
          servizio.data,
          servizio.numero_notti,
          servizio.numero_camere,
          servizio.valuta,
          servizio.totale,
          servizio.cambio,
          servizio.servizio_aggiuntivo,
          servizio.id
        );
      })
    );
    
    return transformedServices;
  }

  static async voliToInputGroup(voli: any[]): Promise<VoloInputGroup[]> {
    const transformedFlights = await Promise.all(
      voli.map(async (volo, index) => {
        const fornitore = volo.id_fornitore 
          ? await this.getFornitoreNome(volo.id_fornitore) 
          : "";

        return new VoloInputGroup(
          index,
          fornitore,
          volo.compagnia_aerea,
          volo.descrizione,
          volo.data_partenza,
          volo.data_arrivo,
          volo.totale,
          volo.ricarico,
          volo.numero,
          volo.valuta,
          volo.cambio,
          volo.id
        );
      })
    );

    return transformedFlights;
  }

  static async assicurazioniToInputGroup(assicurazioni: any[]): Promise<AssicurazioneInputGroup[]> {
    const transformedInsurances = await Promise.all(
      assicurazioni.map(async (assicurazione, index) => {
        const fornitore = assicurazione.id_fornitore 
          ? await this.getFornitoreNome(assicurazione.id_fornitore) 
          : "";

        return new AssicurazioneInputGroup(
          index,
          fornitore,
          assicurazione.assicurazione,
          assicurazione.netto,
          assicurazione.ricarico,
          assicurazione.numero,
          assicurazione.id
        );
      })
    );

    return transformedInsurances;
  }

  static preventivoAlClienteToInputGroup(
    preventivoAlCliente: PreventivoAlCliente
  ): PreventivoAlClienteInputGroup {
    return new PreventivoAlClienteInputGroup(
      preventivoAlCliente.descrizione_viaggio,
      preventivoAlCliente.righePrimoTipo.map(
        (row, i) => new PreventivoAlClienteRow(
          i, row.destinazione, row.descrizione, row.individuale, row.numero, row.id
        )
      ),
      preventivoAlCliente.righeSecondoTipo.map(
        (row, i) => new PreventivoAlClienteRow(
          i, row.destinazione, row.descrizione, row.individuale, row.numero, row.id
        )
      ),
      preventivoAlCliente.id
    );
  }

  // Helper methods
  private static async getDestinazioneNome(id: string): Promise<string> {
    const result = await getDestinazioneById(id);
    return result.success ? result.values?.nome || "" : "";
  }

  private static async getFornitoreNome(id: string): Promise<string> {
    const result = await getFornitoreById(id);
    return result.success ? result.values?.nome || "" : "";
  }
}

// Utility per batch operations
export class BatchOperations {
  
  static async executeWithErrorHandling<T>(
    operations: Promise<T>[]
  ): Promise<{ success: boolean; results: T[]; errors: string[] }> {
    const results: T[] = [];
    const errors: string[] = [];

    const settledResults = await Promise.allSettled(operations);
    
    settledResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        errors.push(`Operation ${index} failed: ${result.reason}`);
      }
    });

    return {
      success: errors.length === 0,
      results,
      errors
    };
  }

  static async updateEntityBatch<T>(
    existingIds: string[],
    newData: Array<T & { id?: string }>,
    createFn: (data: T) => Promise<any>,
    updateFn: (id: string, data: T) => Promise<any>,
    deleteFn: (id: string) => Promise<any>
  ) {
    const newIds = newData.map(item => (item as any).id).filter(Boolean);
    const idsToDelete = existingIds.filter(id => !newIds.includes(id));
    
    // Delete operations
    const deleteOps = idsToDelete.map(id => deleteFn(id));
    
    // Create/Update operations
    const upsertOps = newData.map(item => {
      if ((item as any).id) {
        return updateFn((item as any).id, item);
      } else {
        return createFn(item);
      }
    });

    return this.executeWithErrorHandling([...deleteOps, ...upsertOps]);
  }
}
