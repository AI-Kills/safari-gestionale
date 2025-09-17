import { describe, test, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PreventivoService } from '@/app/dashboard/(overview)/general-interface/services/preventivoService';
import { 
  Data, 
  PartecipanteInputGroup, 
  PreventivoInputGroup, 
  ClienteInputGroup,
  Pagamento 
} from '@/app/dashboard/(overview)/general-interface/general-interface.defs';

const prisma = new PrismaClient();

describe('Simple Duplicate Test', () => {
  let testClienteId: string;

  beforeAll(async () => {
    const testCliente = await prisma.cliente.create({
      data: {
        nome: 'Test',
        cognome: 'User',
        email: 'simple.test@example.com',
        tel: '1234567890'
      }
    });
    testClienteId = testCliente.id;
  });

  afterAll(async () => {
    await prisma.preventivo.deleteMany({});
    if (testClienteId) {
      await prisma.cliente.delete({ where: { id: testClienteId } });
    }
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.preventivo.deleteMany({});
  });

  test('should reproduce partecipanti duplication issue', async () => {
    // Create simple test data
    const partecipante = new PartecipanteInputGroup(
      1,
      'Mario',
      'Rossi',
      1500,
      undefined,
      [new Pagamento(undefined, 'Test Bank', new Date(), new Date(), 1000, 950)]
    );

    const data: Data = {
      cliente: new ClienteInputGroup(
        'Test', 'User', undefined, undefined, undefined, undefined, undefined, undefined,
        'simple.test@example.com', undefined, undefined, undefined, undefined, undefined, 
        undefined, undefined, undefined, undefined, undefined, undefined, testClienteId
      ),
      preventivo: new PreventivoInputGroup(
        '0001', 10, 'Test', 'Test', 'Test', 'Test', 'Test',
        2, 0, new Date(), new Date(), 'da fare', 'Test', 'altro', undefined
      ),
      partecipanti: [partecipante],
      serviziATerra: [],
      serviziAggiuntivi: [],
      voli: [],
      assicurazioni: [],
      preventivoAlCliente: undefined
    };

    console.log('🧪 TEST: Creating original preventivo...');
    const createResult = await PreventivoService.createPreventivo(data);
    expect(createResult.success).toBe(true);

    console.log('🧪 TEST: Loading preventivo for duplication...');
    const loadResult = await PreventivoService.fetchPreventivoCompletoByNumero('0001');
    expect(loadResult.success).toBe(true);
    expect(loadResult.data.partecipanti).toHaveLength(1);

    // Update data with actual IDs from DB
    data.preventivo!.id = loadResult.data.preventivo.id;
    data.partecipanti![0].id = loadResult.data.partecipanti[0].id;

    console.log('🧪 TEST: Duplicating preventivo...');
    const duplicateResult = await PreventivoService.duplicatePreventivo(data);
    console.log('🧪 TEST: Duplication result:', duplicateResult);
    
    expect(duplicateResult.success).toBe(true);

    console.log('🧪 TEST: Checking duplicate partecipanti...');
    const duplicateLoadResult = await PreventivoService.fetchPreventivoCompletoByNumero('0002');
    console.log('🧪 TEST: Duplicate load result:', {
      success: duplicateLoadResult.success,
      partecipantiCount: duplicateLoadResult.data?.partecipanti?.length || 0
    });
    
    expect(duplicateLoadResult.success).toBe(true);
    expect(duplicateLoadResult.data.partecipanti).toHaveLength(1);
  });
});
