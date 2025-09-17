import { describe, test, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { testDb } from './test-db-setup';
import { 
  submitCreatePreventivoGI, 
  updatePreventivoCompleto, 
  getPreventivo,
  createCliente
} from '../app/lib/actions';

describe('Partecipanti Integration Tests', () => {
  beforeAll(async () => {
    await testDb.initialize();
  });

  afterEach(async () => {
    await testDb.cleanup();
  });

  afterAll(async () => {
    await testDb.close();
  });

  test('should create preventivo with partecipanti successfully', async () => {
    // 1. Crea un cliente di test
    const clienteResult = await createCliente({
      nome: 'Mario',
      cognome: 'Rossi',
      email: 'mario.rossi@test.com'
    });

    expect(clienteResult.success).toBe(true);
    const cliente = clienteResult.data;

    // 2. Crea un preventivo completo con partecipanti
    const preventivoData = {
      cliente: cliente,
      preventivo: {
        numero_preventivo: 'PART-TEST-001',
        brand: 'TEST',
        operatore: 'Test Operator',
        adulti: 2,
        bambini: 0,
        stato: 'da fare'
      },
      partecipanti: [
        {
          nome: 'Mario',
          cognome: 'Rossi',
          tot_quota: 1500.00
        },
        {
          nome: 'Giulia',
          cognome: 'Bianchi',
          tot_quota: 1200.00
        }
      ],
      serviziATerra: [],
      serviziAggiuntivi: [],
      voli: [],
      assicurazioni: [],
      preventivoAlCliente: null
    };

    const createResult = await submitCreatePreventivoGI(preventivoData);
    console.log('Create result:', createResult);

    expect(createResult.success).toBe(true);
    expect(createResult.data).toBeDefined();

    // 3. Recupera il preventivo e verifica che i partecipanti siano stati salvati
    const preventivoId = createResult.data.id;
    const retrievedPreventivo = await getPreventivo(preventivoId);

    expect(retrievedPreventivo).toBeDefined();
    expect(retrievedPreventivo.partecipanti).toBeDefined();
    expect(retrievedPreventivo.partecipanti).toHaveLength(2);
    
    // Verifica i dati dei partecipanti (ordinati per cognome)
    const partecipanti = retrievedPreventivo.partecipanti.sort((a: any, b: any) => a.cognome.localeCompare(b.cognome));
    expect(partecipanti[0].nome).toBe('Giulia');
    expect(partecipanti[0].cognome).toBe('Bianchi');
    expect(Number(partecipanti[0].tot_quota)).toBe(1200.00);
    
    expect(partecipanti[1].nome).toBe('Mario');
    expect(partecipanti[1].cognome).toBe('Rossi');
    expect(Number(partecipanti[1].tot_quota)).toBe(1500.00);
  });

  test('should update preventivo partecipanti successfully', async () => {
    // 1. Crea un cliente di test
    const clienteResult = await createCliente({
      nome: 'Test',
      cognome: 'Cliente',
      email: 'test.update@test.com'
    });

    const cliente = clienteResult.data;

    // 2. Crea un preventivo iniziale con un partecipante
    const initialData = {
      cliente: cliente,
      preventivo: {
        numero_preventivo: 'PART-UPDATE-001',
        brand: 'TEST',
        operatore: 'Test Operator',
        adulti: 1,
        bambini: 0,
        stato: 'da fare'
      },
      partecipanti: [
        {
          nome: 'Mario',
          cognome: 'Rossi',
          tot_quota: 1000.00
        }
      ],
      serviziATerra: [],
      serviziAggiuntivi: [],
      voli: [],
      assicurazioni: [],
      preventivoAlCliente: null
    };

    const createResult = await submitCreatePreventivoGI(initialData);
    expect(createResult.success).toBe(true);

    // 3. Aggiorna il preventivo con nuovi partecipanti
    const updateData = {
      preventivo: {
        id: createResult.data.id,
        numero_preventivo: 'PART-UPDATE-001',
        brand: 'TEST-UPDATED',
        operatore: 'Updated Operator',
        adulti: 3,
        bambini: 1,
        stato: 'in corso'
      },
      partecipanti: [
        {
          nome: 'Mario',
          cognome: 'Rossi',
          tot_quota: 1200.00 // Quota aggiornata
        },
        {
          nome: 'Giulia',
          cognome: 'Bianchi',
          tot_quota: 1100.00 // Nuovo partecipante
        },
        {
          nome: 'Luca',
          cognome: 'Verdi',
          tot_quota: 800.00 // Altro nuovo partecipante
        }
      ],
      serviziATerra: [],
      serviziAggiuntivi: [],
      voli: [],
      assicurazioni: [],
      preventivoAlCliente: null
    };

    const updateResult = await updatePreventivoCompleto(updateData);
    console.log('Update result:', updateResult);

    expect(updateResult.success).toBe(true);

    // 4. Verifica che i partecipanti siano stati aggiornati correttamente
    const updatedPreventivo = await getPreventivo(createResult.data.id);

    expect(updatedPreventivo).toBeDefined();
    expect(updatedPreventivo.partecipanti).toBeDefined();
    expect(updatedPreventivo.partecipanti).toHaveLength(3);

    // Verifica i nuovi dati dei partecipanti
    const partecipanti = updatedPreventivo.partecipanti.sort((a: any, b: any) => a.cognome.localeCompare(b.cognome));
    
    expect(partecipanti[0].cognome).toBe('Bianchi');
    expect(Number(partecipanti[0].tot_quota)).toBe(1100.00);
    
    expect(partecipanti[1].cognome).toBe('Rossi');
    expect(Number(partecipanti[1].tot_quota)).toBe(1200.00); // Quota aggiornata
    
    expect(partecipanti[2].cognome).toBe('Verdi');
    expect(Number(partecipanti[2].tot_quota)).toBe(800.00);
  });
});
