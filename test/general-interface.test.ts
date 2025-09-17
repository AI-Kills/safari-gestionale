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

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}));

vi.mock('@/app/context/spinner-context', () => ({
  useSpinnerContext: () => ({
    setIsActiveSpinner: vi.fn()
  })
}));

// Import delle funzioni da testare
import { ClienteService } from '../app/dashboard/(overview)/general-interface/services/clienteService';
import { PreventivoService } from '../app/dashboard/(overview)/general-interface/services/preventivoService';
import { 
  getSommaTuttiTotEuro, 
  formatNumberItalian, 
  isValidTel, 
  validationErrorsToString, 
  errorTranslations 
} from '../app/dashboard/(overview)/general-interface/helpers';
import { 
  ClienteInputGroup, 
  PreventivoInputGroup, 
  Data,
  ServizioATerraInputGroup,
  VoloInputGroup,
  AssicurazioneInputGroup
} from '../app/dashboard/(overview)/general-interface/general-interface.defs';

describe('General Interface Components', () => {
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
  // CLIENTE SERVICE TESTS
  // ============================================================================
  
  describe('ClienteService', () => {
    test('should search clienti successfully', async () => {
      // Create test cliente
      await testActions.createCliente({
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mario.rossi@test.com',
        tel: '1234567890'
      });

      const searchData = new ClienteInputGroup('Mario', 'Rossi');
      searchData.email = 'mario.rossi@test.com';

      const result = await ClienteService.searchClienti(searchData);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].nome).toBe('Mario');
      expect(result.data[0].cognome).toBe('Rossi');
      expect(result.error).toBeNull();
    });

    test('should handle search clienti with no results', async () => {
      const searchData = new ClienteInputGroup('NonExistent', 'Cliente');
      searchData.email = 'nonexistent@test.com';

      const result = await ClienteService.searchClienti(searchData);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(0);
      expect(result.error).toBeNull();
    });

    test('should create cliente successfully', async () => {
      const uniqueEmail = `giovanni.verdi.${Date.now()}@test.com`;
      const clienteData = new ClienteInputGroup('Giovanni', 'Verdi');
      clienteData.email = uniqueEmail;
      clienteData.tel = '+390987654321';

      const result = await ClienteService.createCliente(clienteData);

      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
    });

    test('should handle create cliente validation errors', async () => {
      const clienteData = new ClienteInputGroup('', ''); // Empty required fields
      clienteData.email = 'invalid-email'; // Invalid email

      const result = await ClienteService.createCliente(clienteData);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.data).toBeUndefined();
    });

    test('should update cliente successfully', async () => {
      // Create test cliente with unique email
      const uniqueEmail = `original.${Date.now()}@test.com`;
      const createResult = await testActions.createCliente({
        nome: 'Original',
        cognome: 'Name',
        email: uniqueEmail
      });

      expect(createResult.success).toBe(true);

      const updatedUniqueEmail = `updated.${Date.now()}@test.com`;
      const updateData = new ClienteInputGroup('Updated', 'Name');
      updateData.id = createResult.data.id;
      updateData.email = updatedUniqueEmail;

      const result = await ClienteService.updateCliente(updateData);

      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
    });

    test('should fetch preventivi by cliente id', async () => {
      // Create test cliente and preventivo
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Cliente',
        email: `test.cliente.${Date.now()}@test.com`
      });

      await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: 'TEST001'
      });

      const result = await ClienteService.fetchPreventiviByCliente(clienteResult.data.id);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].numero_preventivo).toBe('TEST001');
      expect(result.error).toBeNull();
    });

    test('should convert Date objects to plain objects', () => {
      const testData = {
        nome: 'Test',
        data_nascita: new Date('2023-01-15'),
        nested: {
          data_scadenza: new Date('2025-12-31')
        },
        array: [
          { data: new Date('2023-05-10') }
        ]
      };

      const converted = (ClienteService as any).convertToPlainObject(testData);

      expect(converted.data_nascita).toBe('2023-01-15T00:00:00.000Z');
      expect(converted.nested.data_scadenza).toBe('2025-12-31T00:00:00.000Z');
      expect(converted.array[0].data).toBe('2023-05-10T00:00:00.000Z');
    });
  });

  // ============================================================================
  // PREVENTIVO SERVICE TESTS
  // ============================================================================
  
  describe('PreventivoService', () => {
    test('should create preventivo successfully', async () => {
      // Create test cliente
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Cliente',
        email: `test.preventivo.${Date.now()}@test.com`
      });

      const mockData: Data = {
        cliente: new ClienteInputGroup('Test', 'Cliente'),
        preventivo: new PreventivoInputGroup('TEST002', 10, 'INO', 'TEST-REF'),
        serviziATerra: [],
        serviziAggiuntivi: [],
        voli: [],
        assicurazioni: [],
        partecipanti: [],
        preventivoAlCliente: undefined
      };

      mockData.cliente.id = clienteResult.data.id;
      mockData.cliente.email = clienteResult.data.email;
      mockData.preventivo.operatore = 'Test Op';
      mockData.preventivo.stato = 'da fare';

      const result = await PreventivoService.createPreventivo(mockData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.error).toBeNull();
    });

    test('should load preventivo by numero successfully', async () => {
      // Create test data
      const clienteResult = await testActions.createCliente({
        nome: 'Load',
        cognome: 'Test',
        email: `load.test.${Date.now()}@test.com`
      });

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: 'LOAD001',
        destinazione: 'Roma',
        operatore: 'TestOp'
      });

      const result = await PreventivoService.fetchPreventivoCompletoByNumero('LOAD001');

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.preventivo.numero_preventivo).toBe('LOAD001');
      expect(result.data.preventivo.destinazione).toBe('Roma');
      expect(result.error).toBeNull();
    });

    test('should handle load preventivo not found', async () => {
      const result = await PreventivoService.fetchPreventivoCompletoByNumero('NONEXISTENT');

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.data).toBeNull();
    });
  });

  // ============================================================================
  // HELPERS TESTS
  // ============================================================================
  
  describe('Helpers', () => {
    describe('getSommaTuttiTotEuro', () => {
      test('should calculate total sum correctly', () => {
        const percentualeRicarico = 10;
        const serviziATerra = [
          new ServizioATerraInputGroup(1, 'Roma', 'Hotel Test', 'Hotel 5 stelle', new Date(), new Date(), 100, 1.0, 1, 2),
          new ServizioATerraInputGroup(2, 'Roma', 'Restaurant Test', 'Cena romantica', new Date(), new Date(), 200, 1.0, 1, 2)
        ];
        const serviziAggiuntivi = [
          new ServizioATerraInputGroup(3, 'Roma', 'Transfer', 'Transfer aeroporto', new Date(), new Date(), 50, 1.0, 1, 1)
        ];
        const voli: VoloInputGroup[] = [];
        const assicurazioni: AssicurazioneInputGroup[] = [];

        const total = getSommaTuttiTotEuro(percentualeRicarico, serviziATerra, serviziAggiuntivi, voli, assicurazioni);
        expect(typeof total).toBe('number');
        expect(total).toBeGreaterThan(0);
      });

      test('should handle empty arrays', () => {
        const percentualeRicarico = 10;
        const serviziATerra: ServizioATerraInputGroup[] = [];
        const serviziAggiuntivi: ServizioATerraInputGroup[] = [];
        const voli: VoloInputGroup[] = [];
        const assicurazioni: AssicurazioneInputGroup[] = [];

        const total = getSommaTuttiTotEuro(percentualeRicarico, serviziATerra, serviziAggiuntivi, voli, assicurazioni);
        expect(total).toBe(0);
      });
    });

    describe('formatNumberItalian', () => {
      test('should format numbers with Italian locale', () => {
        expect(formatNumberItalian(1234.56)).toBe('1.234,56');
        expect(formatNumberItalian(1000)).toBe('1.000,00');
        expect(formatNumberItalian(0.99)).toBe('0,99');
      });

      test('should handle zero and negative numbers', () => {
        expect(formatNumberItalian(0)).toBe('0,00');
        expect(formatNumberItalian(-1234.56)).toBe('-1.234,56');
      });

      test('should handle invalid numbers', () => {
        expect(formatNumberItalian(NaN)).toBe('0,00');
        expect(formatNumberItalian(null as any)).toBe('0,00');
        expect(formatNumberItalian(undefined as any)).toBe('0,00');
      });
    });

    describe('isValidTel', () => {
      test('should validate correct phone numbers', () => {
        expect(isValidTel('+391234567890')).toBe(true);
        expect(isValidTel('+39123456789')).toBe(true);
        expect(isValidTel('+1234567890123')).toBe(true);
      });

      test('should reject invalid phone numbers', () => {
        expect(isValidTel('')).toBe(false);
        expect(isValidTel('123')).toBe(false);
        expect(isValidTel('abc')).toBe(false);
        expect(isValidTel('1234567890')).toBe(false); // Missing +
        expect(isValidTel('+0123456789')).toBe(false); // Starts with 0
      });

      test('should handle null and undefined', () => {
        expect(isValidTel(null as any)).toBe(false);
        expect(isValidTel(undefined as any)).toBe(false);
      });
    });

    describe('validationErrorsToString', () => {
      test('should convert validation errors to string', () => {
        const errors = {
          nome: 'Nome è richiesto',
          email: 'Email non valida'
        };

        const result = validationErrorsToString(errors);
        expect(result).toContain('Nome è richiesto');
        expect(result).toContain('Email non valida');
      });

      test('should handle empty errors object', () => {
        const result = validationErrorsToString({});
        expect(result).toBe('');
      });

      test('should handle null/undefined errors', () => {
        expect(validationErrorsToString(null)).toBe('');
        expect(validationErrorsToString(undefined)).toBe('');
      });

      test('should handle string errors', () => {
        const result = validationErrorsToString('Simple error message');
        expect(result).toBe('Simple error message');
      });
    });

    describe('errorTranslations', () => {
      test('should be a function', () => {
        expect(typeof errorTranslations).toBe('function');
      });

      test('should translate known errors', () => {
        const duplicateEmailError = 'Database Error in createCliente: error: duplicate key value violates unique constraint "clienti_email_key"';
        const result = errorTranslations(duplicateEmailError);
        expect(result).toBe('L\'email inserita è già registrata nel sistema.');
      });

      test('should return original error for unknown errors', () => {
        const unknownError = 'Some unknown error';
        const result = errorTranslations(unknownError);
        expect(result).toBe(unknownError);
      });
    });
  });

  // ============================================================================
  // INPUT GROUP CLASSES TESTS
  // ============================================================================
  
  describe('Input Group Classes', () => {
    describe('ClienteInputGroup', () => {
      test('should create instance with required fields', () => {
        const cliente = new ClienteInputGroup('Mario', 'Rossi');
        
        expect(cliente.nome).toBe('Mario');
        expect(cliente.cognome).toBe('Rossi');
        expect(cliente.email).toBeUndefined();
        expect(cliente.tel).toBeUndefined();
      });

      test('should allow setting optional fields', () => {
        const cliente = new ClienteInputGroup('Mario', 'Rossi');
        cliente.email = 'mario.rossi@test.com';
        cliente.tel = '1234567890';
        cliente.tipo = 'PRIVATO';

        expect(cliente.email).toBe('mario.rossi@test.com');
        expect(cliente.tel).toBe('1234567890');
        expect(cliente.tipo).toBe('PRIVATO');
      });
    });

    describe('PreventivoInputGroup', () => {
      test('should create instance with required fields', () => {
        const preventivo = new PreventivoInputGroup('TEST001', 10, 'INO', 'REF');
        
        expect(preventivo.numero_preventivo).toBe('TEST001');
        expect(preventivo.percentuale_ricarico).toBe(10);
        expect(preventivo.brand).toBe('INO');
        expect(preventivo.riferimento).toBe('REF');
      });

      test('should allow setting optional fields', () => {
        const preventivo = new PreventivoInputGroup('TEST001', 10, 'INO', 'REF');
        preventivo.destinazione = 'Roma';
        preventivo.bambini = 2;
        preventivo.data_partenza = new Date('2024-06-01');

        expect(preventivo.destinazione).toBe('Roma');
        expect(preventivo.bambini).toBe(2);
        expect(preventivo.data_partenza).toBeInstanceOf(Date);
      });

      test('should create from Preventivo object', () => {
        const preventivoObj = {
          id: 'test-id',
          numero_preventivo: 'OBJ001',
          percentuale_ricarico: 15,
          brand: 'TestBrand',
          riferimento: 'TestRef',
          operatore: 'TestOp',
          adulti: 2,
          bambini: 1,
          destinazione: 'Milano'
        };

        const preventivo = new PreventivoInputGroup(preventivoObj as any);
        
        expect(preventivo.numero_preventivo).toBe('OBJ001');
        expect(preventivo.percentuale_ricarico).toBe(15);
        expect(preventivo.brand).toBe('TestBrand');
        expect(preventivo.adulti).toBe(2);
        expect(preventivo.destinazione).toBe('Milano');
      });
    });
  });

  // ============================================================================
  // INTEGRATION TESTS
  // ============================================================================
  
  describe('Integration Tests', () => {
    test('should create complete preventivo with cliente', async () => {
      const uniqueEmail = `integration.${Date.now()}@test.com`;
      const clienteData = new ClienteInputGroup('Integration', 'Test');
      clienteData.email = uniqueEmail;

      // Create cliente
      const clienteResult = await ClienteService.createCliente(clienteData);
      expect(clienteResult.success).toBe(true);

      // Create preventivo data
      const uniqueNumero = `INT${Date.now().toString().slice(-6)}`;
      const mockData: Data = {
        cliente: clienteData,
        preventivo: new PreventivoInputGroup(uniqueNumero, 2, 'TEST', 'INT-REF'),
        serviziATerra: [],
        serviziAggiuntivi: [],
        voli: [],
        assicurazioni: [],
        partecipanti: [],
        preventivoAlCliente: undefined
      };

      mockData.cliente.id = clienteResult.data.id;
      mockData.preventivo.destinazione = 'Milano';
      mockData.preventivo.operatore = 'Test Op';
      mockData.preventivo.stato = 'da fare';

      // Create preventivo
      const preventivoResult = await PreventivoService.createPreventivo(mockData);
      expect(preventivoResult.success).toBe(true);

      // Load preventivo
      const loadResult = await PreventivoService.fetchPreventivoCompletoByNumero(uniqueNumero);
      expect(loadResult.success).toBe(true);
      expect(loadResult.data.preventivo.destinazione).toBe('Milano');
    });

    test('should handle preventivo with services', async () => {
      // Create test data
      const clienteResult = await testActions.createCliente({
        nome: 'Services',
        cognome: 'Test',
        email: `services.${Date.now()}@test.com`
      });

      const fornitoreResult = await testActions.createFornitore({
        nome: 'Test Fornitore',
        valuta: 'EUR'
      });

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: `SERV${Date.now().toString().slice(-6)}`
      });

      // Add servizio a terra
      await testActions.createServizioATerra({
        id_preventivo: preventivoResult.data.id,
        id_fornitore: fornitoreResult.data.id,
        descrizione: 'Test Service',
        totEuro: 100
      });

      // Load and verify
      const numeroPreventivo = preventivoResult.data.numero_preventivo;
      const loadResult = await PreventivoService.fetchPreventivoCompletoByNumero(numeroPreventivo);
      expect(loadResult.success).toBe(true);
      expect(loadResult.data.serviziATerra).toHaveLength(1);
      expect(loadResult.data.serviziATerra[0].descrizione).toBe('Test Service');
    });
  });
});
