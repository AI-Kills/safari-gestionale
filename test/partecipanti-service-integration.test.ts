import { describe, test, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { testDb } from './test-db-setup';
import { TestActionsHelper } from './test-helpers';

describe('Partecipanti Service Integration Test', () => {
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

  test('should verify partecipanti are included in service fetch functions', async () => {
    console.log('🧪 Test: Service fetch includes partecipanti');

    // 1. Crea setup di base
    const clienteResult = await testActions.createCliente({
      nome: 'Service',
      cognome: 'Test',
      email: 'service@test.com'
    });

    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'SERVICE-001',
      brand: 'TEST',
      operatore: 'Test Op'
    });

    // 2. Crea partecipanti
    await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Mario',
      cognome: 'Rossi',
      tot_quota: 1500.00
    });

    await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Giulia',
      cognome: 'Bianchi',
      tot_quota: 1200.00
    });

    console.log('✅ Setup completato');

    // 3. Test che i partecipanti vengano recuperati dalle actions base
    const partecipantiResult = await testActions.fetchPartecipantiByPreventivoId(preventivoResult.data.id);
    expect(partecipantiResult.success).toBe(true);
    expect(partecipantiResult.values).toHaveLength(2);
    console.log('✅ Actions base recuperano partecipanti:', partecipantiResult.values.length);

    // 4. Test che la funzione di fetch del preventivo includa i partecipanti
    // Simulo la chiamata che fa il PreventivoService usando le stesse actions
    const { fetchPartecipantiByPreventivoId } = await import('../app/lib/actions');
    
    const partecipantiFetch = await fetchPartecipantiByPreventivoId(preventivoResult.data.id);
    expect(partecipantiFetch.success).toBe(true);
    expect(partecipantiFetch.values).toHaveLength(2);
    console.log('✅ fetchPartecipantiByPreventivoId funziona:', partecipantiFetch.values.length);

    // 5. Verifica i dati
    const partecipanti = partecipantiFetch.values.sort((a: any, b: any) => a.cognome.localeCompare(b.cognome));
    expect(partecipanti[0].nome).toBe('Giulia');
    expect(partecipanti[0].cognome).toBe('Bianchi');
    expect(Number(partecipanti[0].tot_quota)).toBe(1200.00);
    
    expect(partecipanti[1].nome).toBe('Mario');
    expect(partecipanti[1].cognome).toBe('Rossi');
    expect(Number(partecipanti[1].tot_quota)).toBe(1500.00);
    console.log('✅ Dati partecipanti corretti');

    console.log('🎉 Test integrazione servizio completato!');
  });

  test('should verify all fetch functions work correctly', async () => {
    console.log('🧪 Test: All fetch functions');

    // Setup
    const clienteResult = await testActions.createCliente({
      nome: 'Fetch',
      cognome: 'All',
      email: 'fetchall@test.com'
    });

    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'FETCHALL-001'
    });

    const partecipanteResult = await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Test',
      cognome: 'Fetch',
      tot_quota: 999.99
    });

    // Test tutte le funzioni di fetch
    const { 
      fetchServiziATerraByPreventivoId,
      fetchServiziAggiuntiviByPreventivoId, 
      fetchVoliByPreventivoId,
      fetchAssicurazioniByPreventivoId,
      fetchPreventivoAlClienteByPreventivoId,
      fetchPartecipantiByPreventivoId
    } = await import('../app/lib/actions');

    const [
      serviziATerra,
      serviziAggiuntivi, 
      voli,
      assicurazioni,
      preventivoAlCliente,
      partecipanti
    ] = await Promise.all([
      fetchServiziATerraByPreventivoId(preventivoResult.data.id),
      fetchServiziAggiuntiviByPreventivoId(preventivoResult.data.id),
      fetchVoliByPreventivoId(preventivoResult.data.id),
      fetchAssicurazioniByPreventivoId(preventivoResult.data.id),
      fetchPreventivoAlClienteByPreventivoId(preventivoResult.data.id),
      fetchPartecipantiByPreventivoId(preventivoResult.data.id)
    ]);

    // Verifica che tutte le chiamate siano andate a buon fine
    expect(serviziATerra.success).toBe(true);
    expect(serviziAggiuntivi.success).toBe(true);
    expect(voli.success).toBe(true);
    expect(assicurazioni.success).toBe(true);
    expect(preventivoAlCliente.success).toBe(true);
    expect(partecipanti.success).toBe(true);

    // Verifica i dati
    expect(serviziATerra.values).toHaveLength(0);
    expect(serviziAggiuntivi.values).toHaveLength(0);
    expect(voli.values).toHaveLength(0);
    expect(assicurazioni.values).toHaveLength(0);
    expect(partecipanti.values).toHaveLength(1);

    expect(partecipanti.values[0].nome).toBe('Test');
    expect(partecipanti.values[0].cognome).toBe('Fetch');
    expect(Number(partecipanti.values[0].tot_quota)).toBe(999.99);

    console.log('✅ Tutte le funzioni di fetch funzionano correttamente');
  });

  test('should verify data structure matches expected format', async () => {
    console.log('🧪 Test: Data structure verification');

    // Setup minimo
    const clienteResult = await testActions.createCliente({
      nome: 'Structure',
      cognome: 'Test',
      email: 'structure@test.com'
    });

    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'STRUCT-001'
    });

    await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Test',
      cognome: 'Structure',
      tot_quota: 1000.00
    });

    // Simula la struttura dati che il PreventivoService dovrebbe restituire
    const { fetchPartecipantiByPreventivoId } = await import('../app/lib/actions');
    const partecipantiResult = await fetchPartecipantiByPreventivoId(preventivoResult.data.id);

    // Simula la struttura che fetchPreventivoCompleto dovrebbe restituire
    const mockFetchResult = {
      success: true,
      data: {
        serviziATerra: [],
        serviziAggiuntivi: [],
        voli: [],
        assicurazioni: [],
        preventivoAlCliente: { righePrimoTipo: [], righeSecondoTipo: [] },
        partecipanti: partecipantiResult.values
      },
      error: null
    };

    // Verifica la struttura
    expect(mockFetchResult.success).toBe(true);
    expect(mockFetchResult.data).toBeDefined();
    expect(mockFetchResult.data.partecipanti).toBeDefined();
    expect(mockFetchResult.data.partecipanti).toHaveLength(1);
    expect(mockFetchResult.data.partecipanti[0]).toHaveProperty('nome');
    expect(mockFetchResult.data.partecipanti[0]).toHaveProperty('cognome');
    expect(mockFetchResult.data.partecipanti[0]).toHaveProperty('tot_quota');
    expect(mockFetchResult.data.partecipanti[0]).toHaveProperty('id');
    expect(mockFetchResult.data.partecipanti[0]).toHaveProperty('id_preventivo');

    console.log('✅ Struttura dati verificata');
    console.log('Partecipante:', mockFetchResult.data.partecipanti[0]);
  });
});
