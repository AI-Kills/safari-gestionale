import { describe, test, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { testDb } from './test-db-setup';
import { TestActionsHelper } from './test-helpers';
import { PreventivoService } from '../app/dashboard/(overview)/general-interface/services/preventivoService';
import { useEntityTransformation } from '../app/dashboard/(overview)/general-interface/hooks/useEntityTransformation';
import { 
  ClienteInputGroup,
  PreventivoInputGroup,
  PartecipanteInputGroup
} from '../app/dashboard/(overview)/general-interface/general-interface.defs';

describe('Partecipanti Real Application Flow Test', () => {
  let testActions: TestActionsHelper;

  beforeAll(async () => {
    await testDb.initialize();
    testActions = new TestActionsHelper(testDb.getClient());
  });

  afterEach(async () => {
    await testDb.cleanup();
  });

  afterAll(async () => {
    await testDb.close();
  });

  test('should handle complete real application flow with partecipanti', async () => {
    console.log('🧪 Test: Real application flow with partecipanti');

    // 1. Crea un cliente (simula la creazione dall'UI)
    const clienteResult = await testActions.createCliente({
      nome: 'Mario',
      cognome: 'Rossi',
      email: 'mario.real@test.com'
    });
    expect(clienteResult.success).toBe(true);
    console.log('✅ Cliente creato:', clienteResult.data.id);

    // 2. Simula la creazione di un preventivo completo tramite PreventivoService
    const clienteInputGroup = new ClienteInputGroup(
      clienteResult.data.nome,
      clienteResult.data.cognome,
      undefined, // note
      undefined, // citta
      undefined, // collegato
      undefined, // tipo
      undefined, // data_di_nascita
      clienteResult.data.tel,
      clienteResult.data.email,
      undefined, // provenienza
      undefined, // indirizzo
      undefined, // cap
      undefined, // cf
      undefined, // luogo_nascita
      undefined, // provincia_nascita
      undefined, // numero_passaporto
      undefined, // data_scadenza_passaporto
      undefined, // nazionalita
      undefined, // provincia
      undefined, // sesso
      clienteResult.data.id
    );

    const preventivoInputGroup = new PreventivoInputGroup(
      'REAL-001',
      0,
      'TEST',
      undefined,
      'Test Operator',
      undefined,
      undefined,
      2,
      1,
      undefined,
      new Date(),
      'da fare'
    );

    // 3. Crea partecipanti come InputGroup (simula l'input dell'utente)
    const partecipantiInputGroup = [
      new PartecipanteInputGroup(0, 'Mario', 'Rossi', 1500.00),
      new PartecipanteInputGroup(1, 'Giulia', 'Bianchi', 1200.00),
      new PartecipanteInputGroup(2, 'Luca', 'Verdi', 800.00)
    ];

    // 4. Simula la creazione tramite PreventivoService (come fa l'applicazione reale)
    const createData = {
      cliente: clienteInputGroup,
      preventivo: preventivoInputGroup,
      serviziATerra: [],
      serviziAggiuntivi: [],
      voli: [],
      assicurazioni: [],
      partecipanti: partecipantiInputGroup,
      preventivoAlCliente: undefined
    };

    const createResult = await PreventivoService.createPreventivo(createData);
    console.log('Create result:', createResult);
    expect(createResult.success).toBe(true);
    console.log('✅ Preventivo creato tramite PreventivoService');

    // 5. Ora simula il recupero del preventivo (come fa l'applicazione quando carica un preventivo)
    const fetchResult = await PreventivoService.fetchPreventivoCompletoByNumero('REAL-001');
    console.log('Fetch result success:', fetchResult.success);
    console.log('Fetch result data keys:', fetchResult.data ? Object.keys(fetchResult.data) : 'no data');
    
    expect(fetchResult.success).toBe(true);
    expect(fetchResult.data).toBeDefined();
    expect(fetchResult.data.partecipanti).toBeDefined();
    expect(fetchResult.data.partecipanti).toHaveLength(3);
    console.log('✅ Preventivo recuperato con partecipanti:', fetchResult.data.partecipanti.length);

    // 6. Verifica i dati dei partecipanti recuperati
    const partecipantiRecuperati = fetchResult.data.partecipanti.sort((a: any, b: any) => a.cognome.localeCompare(b.cognome));
    
    expect(partecipantiRecuperati[0].nome).toBe('Giulia');
    expect(partecipantiRecuperati[0].cognome).toBe('Bianchi');
    expect(Number(partecipantiRecuperati[0].tot_quota)).toBe(1200.00);
    
    expect(partecipantiRecuperati[1].nome).toBe('Mario');
    expect(partecipantiRecuperati[1].cognome).toBe('Rossi');
    expect(Number(partecipantiRecuperati[1].tot_quota)).toBe(1500.00);
    
    expect(partecipantiRecuperati[2].nome).toBe('Luca');
    expect(partecipantiRecuperati[2].cognome).toBe('Verdi');
    expect(Number(partecipantiRecuperati[2].tot_quota)).toBe(800.00);
    console.log('✅ Dati partecipanti verificati');

    // 7. Simula l'aggiornamento del preventivo con nuovi partecipanti
    const nuoviPartecipantiInputGroup = [
      new PartecipanteInputGroup(0, 'Marco', 'Rossi', 1800.00), // Aggiornato
      new PartecipanteInputGroup(1, 'Anna', 'Verdi', 1100.00),  // Nuovo
    ];

    const updateData = {
      cliente: clienteInputGroup,
      preventivo: {
        ...preventivoInputGroup,
        id: fetchResult.data.preventivo.id,
        adulti: 2,
        bambini: 0,
        stato: 'in corso'
      },
      serviziATerra: [],
      serviziAggiuntivi: [],
      voli: [],
      assicurazioni: [],
      partecipanti: nuoviPartecipantiInputGroup,
      preventivoAlCliente: undefined
    };

    const updateResult = await PreventivoService.updatePreventivo(updateData);
    console.log('Update result:', updateResult);
    expect(updateResult.success).toBe(true);
    console.log('✅ Preventivo aggiornato tramite PreventivoService');

    // 8. Verifica che l'aggiornamento abbia funzionato
    const fetchUpdatedResult = await PreventivoService.fetchPreventivoCompletoByNumero('REAL-001');
    expect(fetchUpdatedResult.success).toBe(true);
    expect(fetchUpdatedResult.data.partecipanti).toHaveLength(2);
    console.log('✅ Preventivo aggiornato recuperato con partecipanti:', fetchUpdatedResult.data.partecipanti.length);

    // 9. Verifica i nuovi dati
    const partecipantiAggiornati = fetchUpdatedResult.data.partecipanti.sort((a: any, b: any) => a.cognome.localeCompare(b.cognome));
    
    expect(partecipantiAggiornati[0].nome).toBe('Marco');
    expect(partecipantiAggiornati[0].cognome).toBe('Rossi');
    expect(Number(partecipantiAggiornati[0].tot_quota)).toBe(1800.00);
    
    expect(partecipantiAggiornati[1].nome).toBe('Anna');
    expect(partecipantiAggiornati[1].cognome).toBe('Verdi');
    expect(Number(partecipantiAggiornati[1].tot_quota)).toBe(1100.00);
    console.log('✅ Dati partecipanti aggiornati verificati');

    // 10. Calcola totali
    const totaleQuote = partecipantiAggiornati.reduce((sum: number, p: any) => sum + Number(p.tot_quota), 0);
    expect(totaleQuote).toBe(2900.00);
    console.log('✅ Totale quote verificato:', totaleQuote);

    console.log('🎉 Test flusso reale applicazione completato con successo!');
  });

  test('should handle transformation correctly', async () => {
    console.log('🧪 Test: Transformation flow');

    // Crea alcuni dati di test nel database
    const clienteResult = await testActions.createCliente({
      nome: 'Test',
      cognome: 'Transform',
      email: 'transform@test.com'
    });

    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'TRANSFORM-001'
    });

    await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Test',
      cognome: 'Partecipante',
      tot_quota: 1000.00
    });

    // Usa il servizio per recuperare i dati
    const fetchResult = await PreventivoService.fetchPreventivoCompletoByNumero('TRANSFORM-001');
    expect(fetchResult.success).toBe(true);
    expect(fetchResult.data.partecipanti).toHaveLength(1);

    // Verifica che la trasformazione funzioni
    const { transformPreventivoCompleto } = useEntityTransformation();
    const transformedData = await transformPreventivoCompleto(fetchResult.data);
    
    expect(transformedData.partecipanti).toBeDefined();
    expect(transformedData.partecipanti).toHaveLength(1);
    expect(transformedData.partecipanti[0]).toBeInstanceOf(PartecipanteInputGroup);
    expect(transformedData.partecipanti[0].nome).toBe('Test');
    expect(transformedData.partecipanti[0].cognome).toBe('Partecipante');
    expect(transformedData.partecipanti[0].tot_quota).toBe(1000.00);

    console.log('✅ Trasformazione partecipanti verificata');
  });
});
