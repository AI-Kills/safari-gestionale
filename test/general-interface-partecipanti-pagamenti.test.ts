import { describe, test, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { vi } from 'vitest';
import { testDb } from './test-db-setup';
import { TestActionsHelper } from './test-helpers';

// Mock delle dipendenze esterne
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn()
  }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn()
  })
}));

vi.mock('@/app/context/spinner-context', () => ({
  useSpinnerContext: () => ({
    setIsActiveSpinner: vi.fn()
  })
}));

// Import delle funzioni da testare
import { PreventivoService } from '../app/dashboard/(overview)/general-interface/services/preventivoService';
import { useEntityTransformation } from '../app/dashboard/(overview)/general-interface/hooks/useEntityTransformation';
import { 
  ClienteInputGroup, 
  PreventivoInputGroup, 
  PartecipanteInputGroup,
  Pagamento,
  Data
} from '../app/dashboard/(overview)/general-interface/general-interface.defs';

describe('General Interface - Partecipanti Pagamenti', () => {
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

  // ============================================================================
  // TRASFORMAZIONE INCASSI PARTECIPANTI TESTS
  // ============================================================================
  
  describe('Entity Transformation for Partecipanti', () => {
    test('should transform partecipanti with incassi correctly', async () => {
      console.log('🧪 Test: Transform partecipanti with incassi');

      // Crea dati di test nel database
      const clienteResult = await testActions.createCliente({
        nome: 'Transform',
        cognome: 'Test',
        email: 'transform@test.com'
      });

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: 'TRANSFORM001'
      });

      const partecipanteResult = await testActions.createPartecipante({
        id_preventivo: preventivoResult.data.id,
        nome: 'Mario',
        cognome: 'Rossi',
        tot_quota: 1500.00
      });

      const bancaResult = await testActions.createBanca({
        nome: 'BANK TEST'
      });

      // Crea incassi per il partecipante
      const incasso1Result = await testActions.createIncassoPartecipante({
        id_partecipante: partecipanteResult.data.id,
        id_banca: bancaResult.data.id,
        importo: 500.00,
        importo_in_valuta: 550.00,
        data_scadenza: new Date('2024-12-31'),
        data_incasso: new Date('2024-12-25')
      });

      const incasso2Result = await testActions.createIncassoPartecipante({
        id_partecipante: partecipanteResult.data.id,
        importo: 300.00,
        data_scadenza: new Date('2024-11-30')
      });

      expect(incasso1Result.success).toBe(true);
      expect(incasso2Result.success).toBe(true);

      // Fetch partecipanti con incassi dal database (simula getPartecipantiByPreventivo)
      const partecipantiFromDb = await testActions.getPartecipantiByPreventivo(preventivoResult.data.id);
      expect(partecipantiFromDb.success).toBe(true);
      expect(partecipantiFromDb.values).toHaveLength(1);
      expect(partecipantiFromDb.values[0].incassi_partecipanti).toHaveLength(2);

      // Test trasformazione
      const { transformPartecipanti } = useEntityTransformation();
      const transformedPartecipanti = await transformPartecipanti(partecipantiFromDb.values);

      expect(transformedPartecipanti).toHaveLength(1);
      
      const partecipante = transformedPartecipanti[0];
      expect(partecipante.nome).toBe('Mario');
      expect(partecipante.cognome).toBe('Rossi');
      expect(partecipante.tot_quota).toBe(1500.00);
      expect(partecipante.incassi).toHaveLength(2);

      // Verifica primo incasso (con banca)
      const incasso1 = partecipante.incassi[0];
      expect(incasso1.importo_in_euro).toBe(500.00);
      expect(incasso1.importo_in_valuta).toBe(550.00);
      expect(incasso1.banca).toBe('BANK TEST');
      expect(incasso1.data_scadenza).toBeInstanceOf(Date);
      expect(incasso1.data_pagamento).toBeInstanceOf(Date);

      // Verifica secondo incasso (senza banca)
      const incasso2 = partecipante.incassi[1];
      expect(incasso2.importo_in_euro).toBe(300.00);
      expect(incasso2.banca).toBe('');
      expect(incasso2.data_scadenza).toBeInstanceOf(Date);

      console.log('✅ Trasformazione partecipanti con incassi completata');
    });

    test('should handle partecipanti without incassi', async () => {
      console.log('🧪 Test: Transform partecipanti without incassi');

      // Setup
      const clienteResult = await testActions.createCliente({
        nome: 'No',
        cognome: 'Incassi',
        email: 'noincassi@test.com'
      });

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: 'NOINCASSI001'
      });

      const partecipanteResult = await testActions.createPartecipante({
        id_preventivo: preventivoResult.data.id,
        nome: 'Senza',
        cognome: 'Incassi',
        tot_quota: 1000.00
      });

      // Fetch e trasforma
      const partecipantiFromDb = await testActions.getPartecipantiByPreventivo(preventivoResult.data.id);
      const { transformPartecipanti } = useEntityTransformation();
      const transformedPartecipanti = await transformPartecipanti(partecipantiFromDb.values);

      expect(transformedPartecipanti).toHaveLength(1);
      const partecipante = transformedPartecipanti[0];
      expect(partecipante.incassi).toHaveLength(0);

      console.log('✅ Gestione partecipanti senza incassi verificata');
    });
  });

  // ============================================================================
  // PREVENTIVO SERVICE CON PARTECIPANTI TESTS
  // ============================================================================

  describe('PreventivoService with Partecipanti', () => {
    test('should create preventivo with partecipanti and incassi', async () => {
      console.log('🧪 Test: Create preventivo with partecipanti + incassi');

      // Setup cliente
      const clienteResult = await testActions.createCliente({
        nome: 'Create',
        cognome: 'Test',
        email: 'create@test.com'
      });

      // Crea partecipanti InputGroup con incassi
      const partecipante1 = new PartecipanteInputGroup(1, 'Mario', 'Rossi', 1500.00);
      partecipante1.incassi = [
        new Pagamento('temp-1', 'INTESA SAN PAOLO', new Date('2024-12-31'), new Date('2024-12-25'), 550.00, 500.00),
        new Pagamento('temp-2', undefined, new Date('2024-11-30'), undefined, undefined, 300.00)
      ];

      const partecipante2 = new PartecipanteInputGroup(2, 'Giulia', 'Bianchi', 1200.00);
      partecipante2.incassi = [
        new Pagamento('temp-3', 'UNICREDIT', new Date('2024-10-15'), new Date('2024-10-10'), 120.00, 100.00)
      ];

      // Prepara data
      const mockData: Data = {
        cliente: new ClienteInputGroup('Create', 'Test'),
        preventivo: new PreventivoInputGroup('CREATE001', 10, 'TEST', 'CREATE-REF'),
        serviziATerra: [],
        serviziAggiuntivi: [],
        voli: [],
        assicurazioni: [],
        partecipanti: [partecipante1, partecipante2],
        preventivoAlCliente: undefined
      };

      mockData.cliente.id = clienteResult.data.id;
      mockData.cliente.email = 'create@test.com';
      mockData.preventivo.operatore = 'Test Operator';
      mockData.preventivo.stato = 'da fare';

      // Crea preventivo
      const result = await PreventivoService.createPreventivo(mockData);
      
      expect(result.success).toBe(true);
      expect(result.error).toBeNull();

      // Verifica che partecipanti e incassi siano stati salvati
      const savedPreventivoResult = await PreventivoService.fetchPreventivoCompletoByNumero('CREATE001');
      expect(savedPreventivoResult.success).toBe(true);
      expect(savedPreventivoResult.data.partecipanti).toHaveLength(2);
      
      // Verifica incassi del primo partecipante
      const savedPartecipante1 = savedPreventivoResult.data.partecipanti.find((p: any) => p.nome === 'Mario');
      expect(savedPartecipante1).toBeDefined();
      expect(savedPartecipante1.incassi_partecipanti).toHaveLength(2);

      console.log('✅ Preventivo con partecipanti e incassi creato correttamente');
    });

    test('should update preventivo preserving partecipanti incassi', async () => {
      console.log('🧪 Test: Update preventivo preserving incassi');

      // Prima crea un preventivo con partecipanti e incassi
      const clienteResult = await testActions.createCliente({
        nome: 'Update',
        cognome: 'Test',
        email: 'update@test.com'
      });

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: 'UPDATE001',
        operatore: 'Original Op'
      });

      const partecipanteResult = await testActions.createPartecipante({
        id_preventivo: preventivoResult.data.id,
        nome: 'Update',
        cognome: 'Test',
        tot_quota: 1000.00
      });

      const incassoResult = await testActions.createIncassoPartecipante({
        id_partecipante: partecipanteResult.data.id,
        importo: 400.00,
        importo_in_valuta: 450.00,
        data_scadenza: new Date('2024-12-15')
      });

      // Carica il preventivo per aggiornarlo
      const loadResult = await PreventivoService.fetchPreventivoCompletoByNumero('UPDATE001');
      expect(loadResult.success).toBe(true);
      
      // Transform data
      const { transformPreventivoCompleto } = useEntityTransformation();
      const transformedData = await transformPreventivoCompleto(loadResult.data);

      // Prepara data per aggiornamento
      const cliente = new ClienteInputGroup('Update', 'Test');
      cliente.id = clienteResult.data.id;
      cliente.email = 'update@test.com';

      const preventivo = new PreventivoInputGroup(loadResult.data.preventivo);
      preventivo.operatore = 'Updated Operator'; // Cambia qualcosa

      const mockData: Data = {
        cliente: cliente,
        preventivo: preventivo,
        serviziATerra: transformedData.serviziATerra,
        serviziAggiuntivi: transformedData.serviziAggiuntivi,
        voli: transformedData.voli,
        assicurazioni: transformedData.assicurazioni,
        partecipanti: transformedData.partecipanti, // Include partecipanti con incassi
        preventivoAlCliente: transformedData.preventivoAlCliente
      };

      // Aggiorna preventivo
      const updateResult = await PreventivoService.updatePreventivo(mockData);
      expect(updateResult.success).toBe(true);

      // Verifica che gli incassi siano stati preservati
      const updatedResult = await PreventivoService.fetchPreventivoCompletoByNumero('UPDATE001');
      expect(updatedResult.success).toBe(true);
      expect(updatedResult.data.preventivo.operatore).toBe('Updated Operator');
      expect(updatedResult.data.partecipanti).toHaveLength(1);
      expect(updatedResult.data.partecipanti[0].incassi_partecipanti).toHaveLength(1);
      expect(Number(updatedResult.data.partecipanti[0].incassi_partecipanti[0].importo)).toBe(400.00);

      console.log('✅ Aggiornamento preventivo con preservazione incassi completato');
    });

    test('should load preventivo with partecipanti incassi using correct function', async () => {
      console.log('🧪 Test: Load preventivo using getPartecipantiByPreventivo (with incassi)');

      // Setup
      const clienteResult = await testActions.createCliente({
        nome: 'Load',
        cognome: 'Test',
        email: 'load@test.com'
      });

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: 'LOAD001'
      });

      const partecipanteResult = await testActions.createPartecipante({
        id_preventivo: preventivoResult.data.id,
        nome: 'Load',
        cognome: 'Test',
        tot_quota: 800.00
      });

      const incassoResult = await testActions.createIncassoPartecipante({
        id_partecipante: partecipanteResult.data.id,
        importo: 200.00,
        data_scadenza: new Date('2024-09-30')
      });

      // Test load by numero
      const loadResult = await PreventivoService.fetchPreventivoCompletoByNumero('LOAD001');
      expect(loadResult.success).toBe(true);
      expect(loadResult.data.partecipanti).toHaveLength(1);
      expect(loadResult.data.partecipanti[0].incassi_partecipanti).toHaveLength(1);

      // Test load by preventivo object
      const preventivoInputGroup = new PreventivoInputGroup(loadResult.data.preventivo);
      const loadByObjectResult = await PreventivoService.fetchPreventivoCompleto(preventivoInputGroup);
      expect(loadByObjectResult.success).toBe(true);
      expect(loadByObjectResult.data.partecipanti).toHaveLength(1);
      expect(loadByObjectResult.data.partecipanti[0].incassi_partecipanti).toHaveLength(1);

      console.log('✅ Caricamento preventivo con funzione corretta verificato');
    });
  });

  // ============================================================================
  // INTEGRATION TESTS
  // ============================================================================

  describe('Complete Flow Integration', () => {
    test('should handle complete partecipanti + incassi workflow', async () => {
      console.log('🧪 Test: Complete partecipanti + incassi workflow');

      // 1. Setup iniziale
      const clienteResult = await testActions.createCliente({
        nome: 'Complete',
        cognome: 'Flow',
        email: 'complete@test.com'
      });

      // 2. Crea preventivo con partecipanti che hanno incassi
      const partecipante1 = new PartecipanteInputGroup(1, 'Mario', 'Rossi', 2000.00);
      partecipante1.incassi = [
        new Pagamento('temp-1', 'BANK ONE', new Date('2024-12-31'), new Date('2024-12-25'), 600.00, 550.00),
        new Pagamento('temp-2', 'BANK TWO', new Date('2024-11-30'), new Date('2024-11-25'), 400.00, 380.00)
      ];

      const partecipante2 = new PartecipanteInputGroup(2, 'Giulia', 'Bianchi', 1800.00);
      partecipante2.incassi = [
        new Pagamento('temp-3', 'BANK THREE', new Date('2024-10-15'), undefined, undefined, 900.00)
      ];

      const createData: Data = {
        cliente: new ClienteInputGroup('Complete', 'Flow'),
        preventivo: new PreventivoInputGroup('COMPLETE001', 15, 'FLOW', 'COMPLETE-REF'),
        serviziATerra: [],
        serviziAggiuntivi: [],
        voli: [],
        assicurazioni: [],
        partecipanti: [partecipante1, partecipante2],
        preventivoAlCliente: undefined
      };

      createData.cliente.id = clienteResult.data.id;
      createData.cliente.email = 'complete@test.com';
      createData.preventivo.operatore = 'Flow Operator';
      createData.preventivo.stato = 'in trattativa';

      // 3. Crea preventivo
      const createResult = await PreventivoService.createPreventivo(createData);
      expect(createResult.success).toBe(true);

      // 4. Carica preventivo (simula caricamento in UI)
      const loadResult = await PreventivoService.fetchPreventivoCompletoByNumero('COMPLETE001');
      expect(loadResult.success).toBe(true);

      // 5. Trasforma dati (simula trasformazione in UI)
      const { transformPreventivoCompleto } = useEntityTransformation();
      const transformedData = await transformPreventivoCompleto(loadResult.data);

      expect(transformedData.partecipanti).toHaveLength(2);

      // Verifica primo partecipante
      const p1 = transformedData.partecipanti.find(p => p.nome === 'Mario');
      expect(p1).toBeDefined();
      expect(p1.incassi).toHaveLength(2);
      expect(p1.tot_quota).toBe(2000.00);

      // Verifica secondo partecipante  
      const p2 = transformedData.partecipanti.find(p => p.nome === 'Giulia');
      expect(p2).toBeDefined();
      expect(p2.incassi).toHaveLength(1);
      expect(p2.tot_quota).toBe(1800.00);

      // 6. Modifica partecipanti (simula modifica in UI)
      // Aggiungi un nuovo incasso al primo partecipante
      p1.incassi.push(new Pagamento('temp-4', 'BANK FOUR', new Date('2024-09-30'), new Date('2024-09-28'), 200.00, 190.00));
      
      // Modifica tot_quota del secondo partecipante
      p2.tot_quota = 2000.00;

      // 7. Aggiorna preventivo
      const cliente = new ClienteInputGroup('Complete', 'Flow');
      cliente.id = clienteResult.data.id;
      cliente.email = 'complete@test.com';

      const preventivo = new PreventivoInputGroup(loadResult.data.preventivo);
      preventivo.stato = 'confermato'; // Cambia stato

      const updateData: Data = {
        cliente: cliente,
        preventivo: preventivo,
        serviziATerra: transformedData.serviziATerra,
        serviziAggiuntivi: transformedData.serviziAggiuntivi,
        voli: transformedData.voli,
        assicurazioni: transformedData.assicurazioni,
        partecipanti: transformedData.partecipanti, // Partecipanti modificati
        preventivoAlCliente: transformedData.preventivoAlCliente
      };

      const updateResult = await PreventivoService.updatePreventivo(updateData);
      expect(updateResult.success).toBe(true);

      // 8. Verifica finale
      const finalResult = await PreventivoService.fetchPreventivoCompletoByNumero('COMPLETE001');
      expect(finalResult.success).toBe(true);
      expect(finalResult.data.preventivo.stato).toBe('confermato');

      const finalPartecipanti = finalResult.data.partecipanti;
      expect(finalPartecipanti).toHaveLength(2);

      const finalP1 = finalPartecipanti.find((p: any) => p.nome === 'Mario');
      expect(finalP1.incassi_partecipanti).toHaveLength(3); // 2 originali + 1 nuovo

      const finalP2 = finalPartecipanti.find((p: any) => p.nome === 'Giulia');  
      expect(Number(finalP2.tot_quota)).toBe(2000.00); // Quota aggiornata

      console.log('✅ Workflow completo partecipanti + incassi completato con successo');
    });

    test('should calculate partecipanti totals correctly with incassi', async () => {
      console.log('🧪 Test: Calculate partecipanti totals with incassi');

      // Setup partecipanti con incassi di test
      const partecipante1 = new PartecipanteInputGroup(1, 'Test1', 'Calc', 1000.00);
      partecipante1.incassi = [
        new Pagamento('1', '', undefined, undefined, undefined, 300.00),
        new Pagamento('2', '', undefined, undefined, undefined, 200.00)
      ];

      const partecipante2 = new PartecipanteInputGroup(2, 'Test2', 'Calc', 1500.00);
      partecipante2.incassi = [
        new Pagamento('3', '', undefined, undefined, undefined, 1000.00)
      ];

      const partecipante3 = new PartecipanteInputGroup(3, 'Test3', 'Calc', 800.00);
      // Nessun incasso

      const partecipanti = [partecipante1, partecipante2, partecipante3];

      // Calcola totali
      const totaleQuote = partecipanti.reduce((sum, p) => sum + p.tot_quota, 0);
      expect(totaleQuote).toBe(3300.00);

      const totaleDifferenze = partecipanti.reduce((sum, p) => sum + p.differenza, 0);
      
      // Differenze attese:
      // P1: 1000 - (300 + 200) = 500
      // P2: 1500 - 1000 = 500  
      // P3: 800 - 0 = 800
      // Totale: 1800
      expect(totaleDifferenze).toBe(1800.00);

      // Test proprietà differenza
      expect(partecipante1.differenza).toBe(500.00);
      expect(partecipante2.differenza).toBe(500.00);
      expect(partecipante3.differenza).toBe(800.00);

      console.log('✅ Calcoli totali partecipanti verificati');
    });
  });

  // ============================================================================
  // ERROR HANDLING TESTS
  // ============================================================================

  describe('Error Handling', () => {
    test('should handle invalid partecipanti data gracefully', async () => {
      console.log('🧪 Test: Handle invalid partecipanti data');

      const clienteResult = await testActions.createCliente({
        nome: 'Error',
        cognome: 'Test',
        email: 'error@test.com'
      });

      // Test con partecipante con dati invalidi
      const invalidPartecipante = new PartecipanteInputGroup(1, '', '', 0); // Nome/cognome vuoti
      invalidPartecipante.incassi = [
        new Pagamento('invalid', 'NON_EXISTENT_BANK', undefined, undefined, -100, 0) // Importi negativi/zero
      ];

      const mockData: Data = {
        cliente: new ClienteInputGroup('Error', 'Test'),
        preventivo: new PreventivoInputGroup('ERROR001', 10, 'ERR', 'ERROR-REF'),
        serviziATerra: [],
        serviziAggiuntivi: [],
        voli: [],
        assicurazioni: [],
        partecipanti: [invalidPartecipante],
        preventivoAlCliente: undefined
      };

      mockData.cliente.id = clienteResult.data.id;
      mockData.cliente.email = 'error@test.com';
      mockData.preventivo.operatore = 'Error Test';
      mockData.preventivo.stato = 'da fare';

      // Il sistema dovrebbe gestire l'errore gracefully
      const result = await PreventivoService.createPreventivo(mockData);
      
      // Potrebbe fallire per validazione, ma non dovrebbe crashare
      if (!result.success) {
        expect(result.error).toBeDefined();
        console.log('⚠️ Errore gestito correttamente:', result.error);
      }

      console.log('✅ Gestione errori verificata');
    });
  });
});
