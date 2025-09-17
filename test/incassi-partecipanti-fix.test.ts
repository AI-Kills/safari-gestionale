import { describe, test, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { testDb } from './test-db-setup';
import { TestActionsHelper } from './test-helpers';

describe('Incassi Partecipanti Fix Test', () => {
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

  test('should create incasso partecipante with correct data mapping', async () => {
    console.log('🧪 Test: Incasso partecipante data mapping');

    // 1. Setup
    const clienteResult = await testActions.createCliente({
      nome: 'Incasso',
      cognome: 'Test',
      email: 'incasso.test@example.com'
    });

    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'INCASSO-001'
    });

    const partecipanteResult = await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Mario',
      cognome: 'Rossi',
      tot_quota: 1500.00
    });

    const bancaResult = await testActions.createBanca({
      nome: 'VISA CREDIT 9029'
    });

    console.log('✅ Setup completato');

    // 2. Test creazione incasso con mappatura corretta
    const incassoData = {
      id_partecipante: partecipanteResult.data.id,
      id_banca: bancaResult.data.id,
      importo: 500.00,
      importo_in_valuta: 600.00,
      data_scadenza: new Date('2024-12-31'),
      data_incasso: new Date('2024-12-25')
    };

    const incassoResult = await testActions.createIncassoPartecipante(incassoData);

    expect(incassoResult.success).toBe(true);
    expect(incassoResult.data).toBeDefined();
    expect(Number(incassoResult.data.importo)).toBe(500.00);
    expect(Number(incassoResult.data.importo_in_valuta)).toBe(600.00);
    console.log('✅ Incasso creato correttamente');

    // 3. Verifica recupero
    const incassiResult = await testActions.fetchIncassiPartecipantiByPartecipanteId(partecipanteResult.data.id);
    expect(incassiResult.success).toBe(true);
    expect(incassiResult.values).toHaveLength(1);
    expect(Number(incassiResult.values[0].importo)).toBe(500.00);
    console.log('✅ Incasso recuperato correttamente');

    console.log('🎉 Test mappatura dati completato!');
  });

  test('should handle incasso without banca correctly', async () => {
    console.log('🧪 Test: Incasso senza banca');

    // Setup
    const clienteResult = await testActions.createCliente({
      nome: 'No',
      cognome: 'Banca',
      email: 'nobanca@test.com'
    });

    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'NOBANCA-001'
    });

    const partecipanteResult = await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Test',
      cognome: 'NoBanca',
      tot_quota: 1000.00
    });

    // Test incasso senza banca
    const incassoData = {
      id_partecipante: partecipanteResult.data.id,
      id_banca: null, // Nessuna banca
      importo: 300.00,
      data_scadenza: new Date('2024-11-30')
    };

    const incassoResult = await testActions.createIncassoPartecipante(incassoData);

    expect(incassoResult.success).toBe(true);
    expect(incassoResult.data).toBeDefined();
    expect(Number(incassoResult.data.importo)).toBe(300.00);
    expect(incassoResult.data.id_banca).toBeNull();

    console.log('✅ Incasso senza banca gestito correttamente');
  });

  test('should validate date conversion correctly', async () => {
    console.log('🧪 Test: Conversione date');

    // Setup
    const clienteResult = await testActions.createCliente({
      nome: 'Date',
      cognome: 'Test',
      email: 'date@test.com'
    });

    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: 'DATE-001'
    });

    const partecipanteResult = await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Date',
      cognome: 'Test',
      tot_quota: 1000.00
    });

    // Test con date in formato ISO string (come arrivano dall'UI)
    const incassoData = {
      id_partecipante: partecipanteResult.data.id,
      importo: 400.00,
      data_scadenza: '2024-12-31T00:00:00.000Z', // ISO string
      data_incasso: '2024-12-25T00:00:00.000Z'   // ISO string
    };

    // Simula la conversione che fa il codice reale
    const convertedData = {
      ...incassoData,
      data_scadenza: incassoData.data_scadenza ? new Date(incassoData.data_scadenza) : undefined,
      data_incasso: incassoData.data_incasso ? new Date(incassoData.data_incasso) : undefined
    };

    const incassoResult = await testActions.createIncassoPartecipante(convertedData);

    expect(incassoResult.success).toBe(true);
    expect(incassoResult.data).toBeDefined();
    expect(incassoResult.data.data_scadenza).toBeInstanceOf(Date);
    expect(incassoResult.data.data_incasso).toBeInstanceOf(Date);

    console.log('✅ Conversione date verificata');
  });
});
