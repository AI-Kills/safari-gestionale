import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { vi } from 'vitest';
import { testDb } from './test-db-setup';
import { TestActionsHelper } from './test-helpers';

// Mock Next.js functions
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}));

import { 
  PartecipanteInputGroup,
  Pagamento
} from '../app/dashboard/(overview)/general-interface/general-interface.defs';

describe('Partecipanti Pagamenti General Interface', () => {
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

  test('should fetch partecipanti with incassi using correct function', async () => {
    console.log('🧪 Test: Fetch partecipanti with incassi');

    // Setup
    const clienteResult = await testActions.createCliente({
      nome: 'Test',
      cognome: 'Partecipante',
      email: `test.part.${Date.now()}@test.com`
    });

    const preventivoResult = await testActions.createPreventivo({
      id_cliente: clienteResult.data.id,
      numero_preventivo: `TEST${Date.now().toString().slice(-6)}`
    });

    const partecipanteResult = await testActions.createPartecipante({
      id_preventivo: preventivoResult.data.id,
      nome: 'Mario',
      cognome: 'Test',
      tot_quota: 1000.00
    });

    const bancaResult = await testActions.createBanca({
      nome: `TEST BANK ${Date.now()}`
    });

    const incassoResult = await testActions.createIncassoPartecipante({
      id_partecipante: partecipanteResult.data.id,
      id_banca: bancaResult.data.id,
      importo: 300.00,
      importo_in_valuta: 330.00
    });

    // Test getPartecipantiByPreventivo (DEVE includere incassi)
    const withIncassiResult = await testActions.getPartecipantiByPreventivo(preventivoResult.data.id);
    expect(withIncassiResult.success).toBe(true);
    expect(withIncassiResult.values).toHaveLength(1);
    expect(withIncassiResult.values[0].incassi_partecipanti).toHaveLength(1);
    expect(withIncassiResult.values[0].incassi_partecipanti[0].importo).toBe(300.00);

    // Test fetchPartecipantiByPreventivoId (NON include incassi)
    const withoutIncassiResult = await testActions.fetchPartecipantiByPreventivoId(preventivoResult.data.id);
    expect(withoutIncassiResult.success).toBe(true);
    expect(withoutIncassiResult.values[0].incassi_partecipanti).toBeUndefined();

    console.log('✅ Verifica funzioni fetch completata');
  });

  test('should verify partecipante calculations work correctly', () => {
    console.log('🧪 Test: Partecipante calculations');

    // Test calcoli differenza
    const partecipante = new PartecipanteInputGroup(1, 'Test', 'Calc', 1000.00);
    
    // Senza incassi
    expect(partecipante.differenza).toBe(1000.00);

    // Con incassi
    partecipante.incassi = [
      new Pagamento('1', '', undefined, undefined, undefined, 300.00),
      new Pagamento('2', '', undefined, undefined, undefined, 250.00)
    ];
    expect(partecipante.differenza).toBe(450.00); // 1000 - (300 + 250)

    // Con incassi che superano la quota
    partecipante.incassi.push(new Pagamento('3', '', undefined, undefined, undefined, 500.00));
    expect(partecipante.differenza).toBe(-50.00); // 1000 - (300 + 250 + 500)

    console.log('✅ Calcoli partecipanti verificati');
  });
});
