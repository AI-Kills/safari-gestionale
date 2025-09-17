import { describe, test, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { testDb } from './test-db-setup';
import { TestActionsHelper } from './test-helpers';

describe('Partecipanti Flow Test', () => {
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

  test('should handle complete partecipanti flow', async () => {
    // 1. Crea cliente
    const clienteResult = await testActions.createCliente({
      nome: 'Mario',
      cognome: 'Rossi',
      email: 'mario.rossi@flow.test'
    });
    expect(clienteResult.success).toBe(true);

    // 2. Crea preventivo
    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'FLOW-001',
      brand: 'TEST',
      operatore: 'Test Operator',
      adulti: 2,
      bambini: 0,
      stato: 'da fare'
    });
    expect(preventivoResult.success).toBe(true);

    // 3. Crea partecipanti
    const partecipante1Result = await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Mario',
      cognome: 'Rossi',
      tot_quota: 1500.00
    });
    expect(partecipante1Result.success).toBe(true);

    const partecipante2Result = await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Giulia',
      cognome: 'Bianchi',
      tot_quota: 1200.00
    });
    expect(partecipante2Result.success).toBe(true);

    // 4. Verifica che i partecipanti siano stati creati
    const partecipantiResult = await testActions.fetchPartecipantiByPreventivoId(preventivoResult.data.id);
    expect(partecipantiResult.success).toBe(true);
    expect(partecipantiResult.values).toHaveLength(2);

    // 5. Verifica i dati dei partecipanti
    const partecipanti = partecipantiResult.values.sort((a: any, b: any) => a.cognome.localeCompare(b.cognome));
    
    expect(partecipanti[0].nome).toBe('Giulia');
    expect(partecipanti[0].cognome).toBe('Bianchi');
    expect(Number(partecipanti[0].tot_quota)).toBe(1200.00);
    
    expect(partecipanti[1].nome).toBe('Mario');
    expect(partecipanti[1].cognome).toBe('Rossi');
    expect(Number(partecipanti[1].tot_quota)).toBe(1500.00);

    // 6. Aggiorna un partecipante
    const updateResult = await testActions.updatePartecipante({
      id: partecipanti[1].id,
      nome: 'Marco',
      tot_quota: 1800.00
    });
    expect(updateResult.success).toBe(true);
    expect(updateResult.data.nome).toBe('Marco');
    expect(Number(updateResult.data.tot_quota)).toBe(1800.00);

    // 7. Verifica l'aggiornamento
    const updatedPartecipantiResult = await testActions.fetchPartecipantiByPreventivoId(preventivoResult.data.id);
    expect(updatedPartecipantiResult.success).toBe(true);
    const updatedPartecipanti = updatedPartecipantiResult.values.find((p: any) => p.id === partecipanti[1].id);
    expect(updatedPartecipanti.nome).toBe('Marco');
    expect(Number(updatedPartecipanti.tot_quota)).toBe(1800.00);

    // 8. Elimina un partecipante
    const deleteResult = await testActions.deletePartecipante(partecipanti[0].id);
    expect(deleteResult.success).toBe(true);

    // 9. Verifica che sia rimasto solo un partecipante
    const finalPartecipantiResult = await testActions.fetchPartecipantiByPreventivoId(preventivoResult.data.id);
    expect(finalPartecipantiResult.success).toBe(true);
    expect(finalPartecipantiResult.values).toHaveLength(1);
    expect(finalPartecipantiResult.values[0].nome).toBe('Marco');
  });

  test('should handle partecipanti validation correctly', async () => {
    // 1. Crea cliente e preventivo
    const clienteResult = await testActions.createCliente({
      nome: 'Test',
      cognome: 'Validation',
      email: 'validation@test.com'
    });
    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'VAL-001'
    });

    // 2. Test validazione: manca id_preventivo
    const invalidResult1 = await testActions.createPartecipante({
      nome: 'Mario',
      cognome: 'Rossi',
      tot_quota: 1500.00
      // Missing id_preventivo
    });
    expect(invalidResult1.success).toBe(false);

    // 3. Test validazione: tot_quota negativa
    const invalidResult2 = await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Mario',
      cognome: 'Rossi',
      tot_quota: -100.00
    });
    expect(invalidResult2.success).toBe(false);

    // 4. Test validazione: dati validi
    const validResult = await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Mario',
      cognome: 'Rossi',
      tot_quota: 1500.00
    });
    expect(validResult.success).toBe(true);
  });

  test('should calculate totals correctly', async () => {
    // 1. Setup
    const clienteResult = await testActions.createCliente({
      nome: 'Total',
      cognome: 'Test',
      email: 'total@test.com'
    });
    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'TOT-001'
    });

    // 2. Crea più partecipanti con quote diverse
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

    await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Luca',
      cognome: 'Verdi',
      tot_quota: 800.00
    });

    // 3. Verifica i totali
    const partecipantiResult = await testActions.fetchPartecipantiByPreventivoId(preventivoResult.data.id);
    expect(partecipantiResult.success).toBe(true);
    expect(partecipantiResult.values).toHaveLength(3);

    // Calcola il totale delle quote
    const totaleQuote = partecipantiResult.values.reduce((sum: number, p: any) => sum + Number(p.tot_quota), 0);
    expect(totaleQuote).toBe(3500.00);

    // Verifica che tutti i partecipanti siano collegati al preventivo corretto
    partecipantiResult.values.forEach((p: any) => {
      expect(p.id_preventivo).toBe(preventivoResult.data.id);
    });
  });
});
