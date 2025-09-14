import { useCallback } from 'react';
import { 
  ServizioATerraInputGroup, 
  VoloInputGroup, 
  AssicurazioneInputGroup,
  PreventivoAlClienteInputGroup,
  PreventivoAlClienteRow
} from '../general-interface.defs';
import { 
  getDestinazioneById, 
  getFornitoreById 
} from '@/app/lib/actions';
import { PreventivoAlCliente } from '@/app/lib/definitions';

export function useEntityTransformation() {
  
  // Trasforma servizi a terra da DB a InputGroup
  const transformServiziATerra = useCallback(async (serviziATerra: any[]): Promise<ServizioATerraInputGroup[]> => {
    const res: ServizioATerraInputGroup[] = [];
    
    for (let i = 0; i < serviziATerra.length; i++) {
      const servizio = serviziATerra[i];
      
      // Fetch destinazione se presente
      let destinazione = "";
      if (servizio?.id_destinazione) {
        const destinazioneResult = await getDestinazioneById(servizio.id_destinazione);
        if (destinazioneResult.success) {
          destinazione = destinazioneResult.values?.nome || "";
        }
      }
      
      // Fetch fornitore se presente
      let fornitore = "";
      if (servizio?.id_fornitore) {
        const fornitoreResult = await getFornitoreById(servizio.id_fornitore);
        if (fornitoreResult.success) {
          fornitore = fornitoreResult.values?.nome || "";
        }
      }
      
      // Crea InputGroup
      const inputGroup = new ServizioATerraInputGroup(
        i,
        destinazione,
        fornitore,
        servizio?.descrizione,
        servizio?.data,
        servizio?.numero_notti,
        servizio?.numero_camere,
        servizio?.valuta,
        servizio?.totale,
        servizio?.cambio,
        servizio?.servizio_aggiuntivo,
        servizio?.id
      );
      
      res.push(inputGroup);
    }
    
    return res;
  }, []);

  // Trasforma voli da DB a InputGroup
  const transformVoli = useCallback(async (voli: any[]): Promise<VoloInputGroup[]> => {
    const res: VoloInputGroup[] = [];
    
    for (let i = 0; i < voli.length; i++) {
      const volo = voli[i];
      
      // Fetch fornitore se presente
      let fornitore = "";
      if (volo?.id_fornitore) {
        const fornitoreResult = await getFornitoreById(volo.id_fornitore);
        if (fornitoreResult.success) {
          fornitore = fornitoreResult.values?.nome || "";
        }
      }
      
      // Crea InputGroup
      const inputGroup = new VoloInputGroup(
        i,
        fornitore,
        volo?.compagnia_aerea,
        volo?.descrizione,
        volo?.data_partenza,
        volo?.data_arrivo,
        volo?.totale,
        volo?.ricarico,
        volo?.numero,
        volo?.valuta,
        volo?.cambio,
        volo?.id
      );
      
      res.push(inputGroup);
    }
    
    return res;
  }, []);

  // Trasforma assicurazioni da DB a InputGroup
  const transformAssicurazioni = useCallback(async (assicurazioni: any[]): Promise<AssicurazioneInputGroup[]> => {
    const res: AssicurazioneInputGroup[] = [];
    
    for (let i = 0; i < assicurazioni.length; i++) {
      const assicurazione = assicurazioni[i];
      
      // Fetch fornitore se presente
      let fornitore = "";
      if (assicurazione?.id_fornitore) {
        const fornitoreResult = await getFornitoreById(assicurazione.id_fornitore);
        if (fornitoreResult.success) {
          fornitore = fornitoreResult.values?.nome || "";
        }
      }
      
      // Crea InputGroup
      const inputGroup = new AssicurazioneInputGroup(
        i,
        fornitore,
        assicurazione?.assicurazione,
        assicurazione?.netto,
        assicurazione?.ricarico,
        assicurazione?.numero,
        assicurazione?.id
      );
      
      res.push(inputGroup);
    }
    
    return res;
  }, []);

  // Trasforma preventivo al cliente da DB a InputGroup
  const transformPreventivoAlCliente = useCallback(async (preventivoAlCliente: PreventivoAlCliente): Promise<PreventivoAlClienteInputGroup> => {
    const righePrimoTipo = preventivoAlCliente.righePrimoTipo.map((row, i) => 
      new PreventivoAlClienteRow(
        i, 
        row.destinazione, 
        row.descrizione, 
        row.individuale, 
        row.numero, 
        row.id
      )
    );
    
    const righeSecondoTipo = preventivoAlCliente.righeSecondoTipo.map((row, i) => 
      new PreventivoAlClienteRow(
        i, 
        row.destinazione, 
        row.descrizione, 
        row.individuale, 
        row.numero, 
        row.id
      )
    );
    
    return new PreventivoAlClienteInputGroup(
      preventivoAlCliente.descrizione_viaggio,
      righePrimoTipo,
      righeSecondoTipo,
      preventivoAlCliente.id
    );
  }, []);

  // Trasforma tutti i dati di un preventivo in una volta
  const transformPreventivoCompleto = useCallback(async (data: {
    serviziATerra?: any[];
    serviziAggiuntivi?: any[];
    voli?: any[];
    assicurazioni?: any[];
    preventivoAlCliente?: PreventivoAlCliente;
  }) => {
    const [
      serviziATerraInputGroup,
      serviziAggiuntiviInputGroup,
      voliInputGroup,
      assicurazioniInputGroup,
      preventivoAlClienteInputGroup
    ] = await Promise.all([
      data.serviziATerra ? transformServiziATerra(data.serviziATerra) : Promise.resolve([]),
      data.serviziAggiuntivi ? transformServiziATerra(data.serviziAggiuntivi) : Promise.resolve([]),
      data.voli ? transformVoli(data.voli) : Promise.resolve([]),
      data.assicurazioni ? transformAssicurazioni(data.assicurazioni) : Promise.resolve([]),
      data.preventivoAlCliente ? transformPreventivoAlCliente(data.preventivoAlCliente) : Promise.resolve(new PreventivoAlClienteInputGroup())
    ]);

    return {
      serviziATerra: serviziATerraInputGroup,
      serviziAggiuntivi: serviziAggiuntiviInputGroup,
      voli: voliInputGroup,
      assicurazioni: assicurazioniInputGroup,
      preventivoAlCliente: preventivoAlClienteInputGroup
    };
  }, [transformServiziATerra, transformVoli, transformAssicurazioni, transformPreventivoAlCliente]);

  return {
    transformServiziATerra,
    transformVoli,
    transformAssicurazioni,
    transformPreventivoAlCliente,
    transformPreventivoCompleto
  };
}
