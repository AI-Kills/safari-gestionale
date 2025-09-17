import { useCallback } from 'react';
import { 
  ServizioATerraInputGroup, 
  VoloInputGroup, 
  AssicurazioneInputGroup,
  PreventivoAlClienteInputGroup,
  PreventivoAlClienteRow,
  PartecipanteInputGroup
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
      
      // Trasforma i pagamenti se presenti
      let pagamenti = [];
      if (servizio?.pagamenti_servizi_a_terra) {
        pagamenti = servizio.pagamenti_servizi_a_terra.map((pagamento: any) => ({
          id: pagamento.id,
          banca: pagamento.banche?.nome || '',
          data_scadenza: pagamento.data_scadenza,
          data_pagamento: pagamento.data_incasso,
          importo_in_euro: pagamento.importo,
          importo_in_valuta: pagamento.importo_in_valuta
        }));
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
        servizio?.id,
        pagamenti
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
      
      // Trasforma i pagamenti se presenti
      let pagamenti = [];
      if (volo?.pagamenti_voli) {
        pagamenti = volo.pagamenti_voli.map((pagamento: any) => ({
          id: pagamento.id,
          banca: pagamento.banche?.nome || '',
          data_scadenza: pagamento.data_scadenza,
          data_pagamento: pagamento.data_incasso,
          importo_in_euro: pagamento.importo,
          importo_in_valuta: pagamento.importo_in_valuta
        }));
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
        volo?.id,
        pagamenti
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

  // Trasforma partecipanti da DB a InputGroup
  const transformPartecipanti = useCallback(async (partecipanti: any[]): Promise<PartecipanteInputGroup[]> => {
    console.log('🔍 transformPartecipanti - Raw partecipanti from DB:', JSON.stringify(partecipanti, null, 2));
    const res: PartecipanteInputGroup[] = [];
    
    for (let i = 0; i < partecipanti.length; i++) {
      const partecipante = partecipanti[i];
      console.log(`🔍 Processing partecipante ${i + 1}:`, partecipante);
      console.log(`🔍 incassi_partecipanti for partecipante ${i + 1}:`, partecipante?.incassi_partecipanti);
      
      // Trasforma gli incassi se presenti
      let incassi = [];
      if (partecipante?.incassi_partecipanti) {
        console.log(`📊 Found ${partecipante.incassi_partecipanti.length} incassi for partecipante ${i + 1}`);
        incassi = partecipante.incassi_partecipanti.map((incasso: any, incassoIndex: number) => {
          console.log(`💰 Processing incasso ${incassoIndex + 1}:`, incasso);
          return {
            id: incasso.id,
            banca: incasso.banche?.nome || '',
            data_scadenza: incasso.data_scadenza,
            data_pagamento: incasso.data_incasso,
            importo_in_euro: incasso.importo,
            importo_in_valuta: incasso.importo_in_valuta // FIX: era incasso.importo
          };
        });
      } else {
        console.log(`⚠️ No incassi_partecipanti found for partecipante ${i + 1}`);
      }
      
      // Crea InputGroup
      const inputGroup = new PartecipanteInputGroup(
        i,
        partecipante?.nome,
        partecipante?.cognome,
        Number(partecipante?.tot_quota) || 0,
        partecipante?.id,
        incassi
      );
      
      console.log(`✅ Created InputGroup for partecipante ${i + 1}:`, {
        id: inputGroup.id,
        nome: inputGroup.nome,
        cognome: inputGroup.cognome,
        incassi: inputGroup.incassi,
        incassiCount: inputGroup.incassi?.length || 0
      });
      
      res.push(inputGroup);
    }
    
    console.log(`🎯 transformPartecipanti final result: ${res.length} partecipanti with incassi summary:`, 
      res.map((p, idx) => ({
        index: idx,
        nome: p.nome,
        cognome: p.cognome,
        incassiCount: p.incassi?.length || 0
      }))
    );
    
    return res;
  }, []);

  // Trasforma tutti i dati di un preventivo in una volta
  const transformPreventivoCompleto = useCallback(async (data: {
    serviziATerra?: any[];
    serviziAggiuntivi?: any[];
    voli?: any[];
    assicurazioni?: any[];
    preventivoAlCliente?: PreventivoAlCliente;
    partecipanti?: any[];
  }) => {
    const [
      serviziATerraInputGroup,
      serviziAggiuntiviInputGroup,
      voliInputGroup,
      assicurazioniInputGroup,
      preventivoAlClienteInputGroup,
      partecipantiInputGroup
    ] = await Promise.all([
      data.serviziATerra ? transformServiziATerra(data.serviziATerra) : Promise.resolve([]),
      data.serviziAggiuntivi ? transformServiziATerra(data.serviziAggiuntivi) : Promise.resolve([]),
      data.voli ? transformVoli(data.voli) : Promise.resolve([]),
      data.assicurazioni ? transformAssicurazioni(data.assicurazioni) : Promise.resolve([]),
      data.preventivoAlCliente ? transformPreventivoAlCliente(data.preventivoAlCliente) : Promise.resolve(new PreventivoAlClienteInputGroup()),
      data.partecipanti ? transformPartecipanti(data.partecipanti) : Promise.resolve([])
    ]);

    return {
      serviziATerra: serviziATerraInputGroup,
      serviziAggiuntivi: serviziAggiuntiviInputGroup,
      voli: voliInputGroup,
      assicurazioni: assicurazioniInputGroup,
      preventivoAlCliente: preventivoAlClienteInputGroup,
      partecipanti: partecipantiInputGroup
    };
  }, [transformServiziATerra, transformVoli, transformAssicurazioni, transformPreventivoAlCliente, transformPartecipanti]);

  return {
    transformServiziATerra,
    transformVoli,
    transformAssicurazioni,
    transformPreventivoAlCliente,
    transformPartecipanti,
    transformPreventivoCompleto
  };
}
