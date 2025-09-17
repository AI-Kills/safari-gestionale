import { describe, test, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { testDb } from './test-db-setup';
import { TestActionsHelper } from './test-helpers';

describe('Partecipanti Complete Flow Test', () => {
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

  test('should handle complete partecipanti flow: create -> fetch -> update', async () => {
    console.log('🧪 Test: Complete partecipanti flow');

    // 1. Crea cliente
    const clienteResult = await testActions.createCliente({
      nome: 'Mario',
      cognome: 'Rossi',
      email: 'mario.complete@test.com'
    });
    expect(clienteResult.success).toBe(true);
    console.log('✅ Cliente creato:', clienteResult.data.id);

    // 2. Crea preventivo
    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'COMPLETE-001',
      brand: 'TEST',
      operatore: 'Test Operator',
      adulti: 3,
      bambini: 1,
      stato: 'da fare'
    });
    expect(preventivoResult.success).toBe(true);
    console.log('✅ Preventivo creato:', preventivoResult.data.id);

    // 3. Crea partecipanti iniziali
    const partecipante1Result = await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Mario',
      cognome: 'Rossi',
      tot_quota: 1500.00
    });
    expect(partecipante1Result.success).toBe(true);
    console.log('✅ Partecipante 1 creato:', partecipante1Result.data.id);

    const partecipante2Result = await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Giulia',
      cognome: 'Bianchi',
      tot_quota: 1200.00
    });
    expect(partecipante2Result.success).toBe(true);
    console.log('✅ Partecipante 2 creato:', partecipante2Result.data.id);

    // 4. Verifica recupero partecipanti
    const partecipantiResult = await testActions.fetchPartecipantiByPreventivoId(preventivoResult.data.id);
    expect(partecipantiResult.success).toBe(true);
    expect(partecipantiResult.values).toHaveLength(2);
    console.log('✅ Partecipanti recuperati:', partecipantiResult.values.length);

    // 5. Simula aggiornamento preventivo con nuovi partecipanti
    // Prima elimina i partecipanti esistenti (come fa updatePartecipantiCompleto)
    await testActions.deletePartecipante(partecipante1Result.data.id);
    await testActions.deletePartecipante(partecipante2Result.data.id);

    // 6. Crea nuovi partecipanti (simula l'aggiornamento)
    const nuoviPartecipanti = [
      {
        nome: 'Marco',
        cognome: 'Rossi',
        tot_quota: 1800.00
      },
      {
        nome: 'Giulia',
        cognome: 'Bianchi',
        tot_quota: 1300.00
      },
      {
        nome: 'Luca',
        cognome: 'Verdi',
        tot_quota: 900.00
      }
    ];

    const nuoviPartecipantiIds = [];
    for (const partecipante of nuoviPartecipanti) {
      const result = await testActions.createPartecipante({
        id_preventivo: preventivoResult.data.id,
        ...partecipante
      });
      expect(result.success).toBe(true);
      nuoviPartecipantiIds.push(result.data.id);
    }
    console.log('✅ Nuovi partecipanti creati:', nuoviPartecipantiIds.length);

    // 7. Verifica che l'aggiornamento sia avvenuto correttamente
    const partecipantiAggiornatiResult = await testActions.fetchPartecipantiByPreventivoId(preventivoResult.data.id);
    expect(partecipantiAggiornatiResult.success).toBe(true);
    expect(partecipantiAggiornatiResult.values).toHaveLength(3);

    // 8. Verifica i dati dei nuovi partecipanti
    const partecipanti = partecipantiAggiornatiResult.values.sort((a: any, b: any) => a.cognome.localeCompare(b.cognome));
    
    expect(partecipanti[0].cognome).toBe('Bianchi');
    expect(partecipanti[0].nome).toBe('Giulia');
    expect(Number(partecipanti[0].tot_quota)).toBe(1300.00);
    
    expect(partecipanti[1].cognome).toBe('Rossi');
    expect(partecipanti[1].nome).toBe('Marco');
    expect(Number(partecipanti[1].tot_quota)).toBe(1800.00);
    
    expect(partecipanti[2].cognome).toBe('Verdi');
    expect(partecipanti[2].nome).toBe('Luca');
    expect(Number(partecipanti[2].tot_quota)).toBe(900.00);

    console.log('✅ Verifica dati partecipanti completata');

    // 9. Verifica calcoli totali
    const totaleQuote = partecipanti.reduce((sum: number, p: any) => sum + Number(p.tot_quota), 0);
    expect(totaleQuote).toBe(4000.00);
    console.log('✅ Totale quote verificato:', totaleQuote);

    // 10. Verifica che tutti i partecipanti siano collegati al preventivo corretto
    partecipanti.forEach((p: any) => {
      expect(p.id_preventivo).toBe(preventivoResult.data.id);
    });
    console.log('✅ Relazioni preventivo-partecipanti verificate');

    console.log('🎉 Test completato con successo!');
  });

  test('should handle empty partecipanti correctly', async () => {
    console.log('🧪 Test: Empty partecipanti handling');

    // 1. Crea cliente e preventivo
    const clienteResult = await testActions.createCliente({
      nome: 'Empty',
      cognome: 'Test',
      email: 'empty@test.com'
    });
    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'EMPTY-001'
    });

    // 2. Verifica che il recupero di partecipanti vuoti funzioni
    const partecipantiResult = await testActions.fetchPartecipantiByPreventivoId(preventivoResult.data.id);
    expect(partecipantiResult.success).toBe(true);
    expect(partecipantiResult.values).toHaveLength(0);
    console.log('✅ Gestione partecipanti vuoti verificata');
  });

  test('should handle partecipanti with different tot_quota values', async () => {
    console.log('🧪 Test: Different tot_quota values');

    // Setup
    const clienteResult = await testActions.createCliente({
      nome: 'Quota',
      cognome: 'Test',
      email: 'quota@test.com'
    });
    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'QUOTA-001'
    });

    // Test con valori diversi
    const testValues = [0, 100.50, 1500.99, 2000.00];
    
    for (let i = 0; i < testValues.length; i++) {
      const result = await testActions.createPartecipante({
        id_preventivo: preventivoResult.data.id,
        nome: `Test${i}`,
        cognome: `Partecipante${i}`,
        tot_quota: testValues[i]
      });
      expect(result.success).toBe(true);
      expect(Number(result.data.tot_quota)).toBe(testValues[i]);
    }

    // Verifica tutti i valori
    const partecipantiResult = await testActions.fetchPartecipantiByPreventivoId(preventivoResult.data.id);
    expect(partecipantiResult.success).toBe(true);
    expect(partecipantiResult.values).toHaveLength(testValues.length);

    const totaleAtteso = testValues.reduce((sum, val) => sum + val, 0);
    const totaleEffettivo = partecipantiResult.values.reduce((sum: number, p: any) => sum + Number(p.tot_quota), 0);
    expect(totaleEffettivo).toBe(totaleAtteso);
    
    console.log('✅ Gestione valori tot_quota diversi verificata');
  });
});
