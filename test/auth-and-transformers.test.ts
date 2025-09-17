import { describe, test, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { testDb } from './test-db-setup';
import { TestActionsHelper } from './test-helpers';

// Import delle funzioni da testare
import { 
  transformPreventivoToCompleto,
  transformPreventivoCompletoToInputs,
  transformClienteToInputGroup,
  transformServizioToInputGroup,
  transformVoloToInputGroup,
  transformAssicurazioneToInputGroup
} from '../app/lib/actions/data-transformers';

describe('Auth and Data Transformers', () => {
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
  // AUTH TESTS
  // ============================================================================
  
  describe('Auth Functions', () => {
    test('should create user with valid credentials', async () => {
      const userData = {
        email: 'auth.test@example.com',
        password: 'securePassword123!'
      };

      const result = await testActions.createUser(userData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.email).toBe('auth.test@example.com');
      expect(result.data.id).toBeDefined();
      // Password should be hashed
      expect(result.data.password).not.toBe('securePassword123!');
    });

    test('should reject user creation with invalid email', async () => {
      const userData = {
        email: 'invalid-email-format',
        password: 'validPassword123!'
      };

      const result = await testActions.createUser(userData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    test('should reject user creation with weak password', async () => {
      const userData = {
        email: 'valid@example.com',
        password: '123' // Too short
      };

      const result = await testActions.createUser(userData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    test('should prevent duplicate email registration', async () => {
      const userData = {
        email: 'duplicate@example.com',
        password: 'password123!'
      };

      // First creation should succeed
      const firstResult = await testActions.createUser(userData);
      expect(firstResult.success).toBe(true);

      // Second creation with same email should fail
      const secondResult = await testActions.createUser(userData);
      expect(secondResult.success).toBe(false);
    });

    test('should get user by email', async () => {
      const userData = {
        email: 'getuser@example.com',
        password: 'password123!'
      };

      await testActions.createUser(userData);
      const user = await testActions.getUserByEmail('getuser@example.com');

      expect(user).toBeDefined();
      expect(user.email).toBe('getuser@example.com');
      expect(user.id).toBeDefined();
    });

    test('should return null for non-existent email', async () => {
      const user = await testActions.getUserByEmail('nonexistent@example.com');
      expect(user).toBeNull();
    });

    test('should update user successfully', async () => {
      const createResult = await testActions.createUser({
        email: 'update@example.com',
        password: 'password123!'
      });

      const updateResult = await testActions.updateUser({
        id: createResult.data.id,
        email: 'updated@example.com'
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.email).toBe('updated@example.com');
    });

    test('should delete user successfully', async () => {
      const createResult = await testActions.createUser({
        email: 'delete@example.com',
        password: 'password123!'
      });

      const deleteResult = await testActions.deleteUser(createResult.data.id);
      expect(deleteResult.success).toBe(true);

      // Verify user is deleted
      const user = await testActions.getUserByEmail('delete@example.com');
      expect(user).toBeNull();
    });
  });

  // ============================================================================
  // DATA TRANSFORMERS TESTS
  // ============================================================================
  
  describe('Data Transformers', () => {
    describe('transformPreventivoToCompleto', () => {
      test('should transform preventivo with all related data', async () => {
        // Create test data
        const clienteResult = await testActions.createCliente({
          nome: 'Transform',
          cognome: 'Test',
          email: 'transform@test.com'
        });

        const fornitoreResult = await testActions.createFornitore({
          nome: 'Test Fornitore',
          valuta: 'EUR'
        });

        const preventivoResult = await testActions.createPreventivo({
          id_cliente: clienteResult.data.id,
          numero_preventivo: 'TRANS001',
          destinazione: 'Roma',
          operatore: 'TestOp',
          adulti: 2,
          bambini: 1
        });

        // Add related services
        const servizioResult = await testActions.createServizioATerra({
          id_preventivo: preventivoResult.data.id,
          id_fornitore: fornitoreResult.data.id,
          descrizione: 'Test Service',
          totEuro: 150
        });

        const voloResult = await testActions.createVolo({
          id_preventivo: preventivoResult.data.id,
          id_fornitore: fornitoreResult.data.id,
          descrizione: 'Test Flight',
          totEuro: 500
        });

        // Get preventivo with relations
        const preventivoCompleto = await testActions.getPreventivoCompleto(preventivoResult.data.id);

        // Transform
        const transformed = transformPreventivoToCompleto(preventivoCompleto);

        expect(transformed).toBeDefined();
        expect(transformed.cliente).toBeDefined();
        expect(transformed.cliente.nome).toBe('Transform');
        expect(transformed.preventivo).toBeDefined();
        expect(transformed.preventivo.numero_preventivo).toBe('TRANS001');
        expect(transformed.serviziATerra).toHaveLength(1);
        expect(transformed.voli).toHaveLength(1);
      });

      test('should handle preventivo without services', async () => {
        const clienteResult = await testActions.createCliente({
          nome: 'Empty',
          cognome: 'Services',
          email: 'empty.services@test.com'
        });

        const preventivoResult = await testActions.createPreventivo({
          id_cliente: clienteResult.data.id,
          numero_preventivo: 'EMPTY001'
        });

        const preventivoCompleto = await testActions.getPreventivoCompleto(preventivoResult.data.id);
        const transformed = transformPreventivoToCompleto(preventivoCompleto);

        expect(transformed).toBeDefined();
        expect(transformed.serviziATerra).toEqual([]);
        expect(transformed.voli).toEqual([]);
        expect(transformed.assicurazioni).toEqual([]);
      });
    });

    describe('transformPreventivoCompletoToInputs', () => {
      test('should transform complete preventivo back to input groups', async () => {
        // Create test data
        const clienteResult = await testActions.createCliente({
          nome: 'Reverse',
          cognome: 'Transform',
          email: 'reverse@test.com',
          tel: '1234567890'
        });

        const preventivoResult = await testActions.createPreventivo({
          id_cliente: clienteResult.data.id,
          numero_preventivo: 'REV001',
          destinazione: 'Milano',
          adulti: 3,
          bambini: 2,
          data_partenza: new Date('2024-07-01')
        });

        const preventivoCompleto = await testActions.getPreventivoCompleto(preventivoResult.data.id);
        const transformed = transformPreventivoCompletoToInputs(preventivoCompleto);

        expect(transformed).toBeDefined();
        expect(transformed.cliente).toBeDefined();
        expect(transformed.cliente.nome).toBe('Reverse');
        expect(transformed.cliente.cognome).toBe('Transform');
        expect(transformed.cliente.tel).toBe('1234567890');
        
        expect(transformed.preventivo).toBeDefined();
        expect(transformed.preventivo.numero_preventivo).toBe('REV001');
        expect(transformed.preventivo.destinazione).toBe('Milano');
        expect(transformed.preventivo.adulti).toBe(3);
        expect(transformed.preventivo.bambini).toBe(2);
      });

      test('should handle null/undefined values gracefully', () => {
        const emptyData = {
          cliente: null,
          preventivo: null,
          serviziATerra: [],
          voli: [],
          assicurazioni: []
        };

        const transformed = transformPreventivoCompletoToInputs(emptyData);

        expect(transformed).toBeDefined();
        expect(transformed.cliente).toBeDefined();
        expect(transformed.preventivo).toBeDefined();
        expect(transformed.serviziATerra).toEqual([]);
        expect(transformed.voli).toEqual([]);
        expect(transformed.assicurazioni).toEqual([]);
      });
    });

    describe('transformClienteToInputGroup', () => {
      test('should transform cliente entity to input group', async () => {
        const clienteResult = await testActions.createCliente({
          nome: 'Cliente',
          cognome: 'Transform',
          email: 'cliente.transform@test.com',
          tel: '9876543210',
          tipo: 'PRIVATO',
          sesso: 'M',
          data_di_nascita: new Date('1985-05-15'),
          cf: 'CLNTRN85E15H501Z'
        });

        const transformed = transformClienteToInputGroup(clienteResult.data);

        expect(transformed).toBeDefined();
        expect(transformed.nome).toBe('Cliente');
        expect(transformed.cognome).toBe('Transform');
        expect(transformed.email).toBe('cliente.transform@test.com');
        expect(transformed.tel).toBe('9876543210');
        expect(transformed.tipo).toBe('PRIVATO');
        expect(transformed.sesso).toBe('M');
        expect(transformed.cf).toBe('CLNTRN85E15H501Z');
        expect(transformed.data_di_nascita).toBeInstanceOf(Date);
      });

      test('should handle cliente with null optional fields', () => {
        const cliente = {
          id: 'test-id',
          nome: 'Test',
          cognome: 'Cliente',
          email: 'test@test.com',
          tel: null,
          tipo: null,
          sesso: null,
          data_di_nascita: null,
          cf: null
        };

        const transformed = transformClienteToInputGroup(cliente);

        expect(transformed.nome).toBe('Test');
        expect(transformed.cognome).toBe('Cliente');
        expect(transformed.email).toBe('test@test.com');
        expect(transformed.tel).toBe('');
        expect(transformed.tipo).toBe('');
        expect(transformed.sesso).toBe('');
        expect(transformed.cf).toBe('');
        expect(transformed.data_di_nascita).toBeNull();
      });
    });

    describe('transformServizioToInputGroup', () => {
      test('should transform servizio entity to input group', async () => {
        const clienteResult = await testActions.createCliente({
          nome: 'Servizio',
          cognome: 'Test',
          email: 'servizio@test.com'
        });

        const fornitoreResult = await testActions.createFornitore({
          nome: 'Fornitore Servizio',
          valuta: 'EUR'
        });

        const preventivoResult = await testActions.createPreventivo({
          id_cliente: clienteResult.data.id,
          numero_preventivo: 'SERV001'
        });

        const servizioResult = await testActions.createServizioATerra({
          id_preventivo: preventivoResult.data.id,
          id_fornitore: fornitoreResult.data.id,
          descrizione: 'Hotel 5 stelle',
          totEuro: 800,
          data_inizio: new Date('2024-06-01'),
          data_fine: new Date('2024-06-07')
        });

        const transformed = transformServizioToInputGroup(servizioResult.data);

        expect(transformed).toBeDefined();
        expect(transformed.descrizione).toBe('Hotel 5 stelle');
        expect(transformed.totEuro).toBe(800);
        expect(transformed.data_inizio).toBeInstanceOf(Date);
        expect(transformed.data_fine).toBeInstanceOf(Date);
      });
    });

    describe('transformVoloToInputGroup', () => {
      test('should transform volo entity to input group', async () => {
        const clienteResult = await testActions.createCliente({
          nome: 'Volo',
          cognome: 'Test',
          email: 'volo@test.com'
        });

        const fornitoreResult = await testActions.createFornitore({
          nome: 'Compagnia Aerea',
          valuta: 'EUR'
        });

        const preventivoResult = await testActions.createPreventivo({
          id_cliente: clienteResult.data.id,
          numero_preventivo: 'VOLO001'
        });

        const voloResult = await testActions.createVolo({
          id_preventivo: preventivoResult.data.id,
          id_fornitore: fornitoreResult.data.id,
          descrizione: 'Roma-Milano A/R',
          totEuro: 350,
          data_partenza: new Date('2024-06-01T08:00:00Z'),
          data_ritorno: new Date('2024-06-07T20:00:00Z')
        });

        const transformed = transformVoloToInputGroup(voloResult.data);

        expect(transformed).toBeDefined();
        expect(transformed.descrizione).toBe('Roma-Milano A/R');
        expect(transformed.totEuro).toBe(350);
        expect(transformed.data_partenza).toBeInstanceOf(Date);
        expect(transformed.data_ritorno).toBeInstanceOf(Date);
      });
    });

    describe('transformAssicurazioneToInputGroup', () => {
      test('should transform assicurazione entity to input group', async () => {
        const clienteResult = await testActions.createCliente({
          nome: 'Assicurazione',
          cognome: 'Test',
          email: 'assicurazione@test.com'
        });

        const fornitoreResult = await testActions.createFornitore({
          nome: 'Compagnia Assicurativa',
          valuta: 'EUR'
        });

        const preventivoResult = await testActions.createPreventivo({
          id_cliente: clienteResult.data.id,
          numero_preventivo: 'ASS001'
        });

        const assicurazioneResult = await testActions.createAssicurazione({
          id_preventivo: preventivoResult.data.id,
          id_fornitore: fornitoreResult.data.id,
          tipo: 'Medico',
          totEuro: 120
        });

        const transformed = transformAssicurazioneToInputGroup(assicurazioneResult.data);

        expect(transformed).toBeDefined();
        expect(transformed.tipo).toBe('Medico');
        expect(transformed.totEuro).toBe(120);
      });
    });
  });

  // ============================================================================
  // INTEGRATION TESTS FOR TRANSFORMERS
  // ============================================================================
  
  describe('Transformers Integration Tests', () => {
    test('should perform round-trip transformation without data loss', async () => {
      // Create complete test data
      const clienteResult = await testActions.createCliente({
        nome: 'RoundTrip',
        cognome: 'Test',
        email: 'roundtrip@test.com',
        tel: '1122334455',
        tipo: 'PRIVATO'
      });

      const fornitoreResult = await testActions.createFornitore({
        nome: 'Test Fornitore Round',
        valuta: 'EUR'
      });

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: 'ROUND001',
        destinazione: 'Parigi',
        adulti: 2,
        bambini: 1,
        data_partenza: new Date('2024-08-01')
      });

      // Add services
      await testActions.createServizioATerra({
        id_preventivo: preventivoResult.data.id,
        id_fornitore: fornitoreResult.data.id,
        descrizione: 'Hotel Parigi',
        totEuro: 600
      });

      await testActions.createVolo({
        id_preventivo: preventivoResult.data.id,
        id_fornitore: fornitoreResult.data.id,
        descrizione: 'Roma-Parigi A/R',
        totEuro: 400
      });

      // Get original data
      const originalData = await testActions.getPreventivoCompleto(preventivoResult.data.id);

      // Transform to completo format
      const completoFormat = transformPreventivoToCompleto(originalData);

      // Transform back to inputs
      const inputsFormat = transformPreventivoCompletoToInputs(completoFormat);

      // Verify data integrity
      expect(inputsFormat.cliente.nome).toBe('RoundTrip');
      expect(inputsFormat.cliente.cognome).toBe('Test');
      expect(inputsFormat.cliente.email).toBe('roundtrip@test.com');
      expect(inputsFormat.cliente.tel).toBe('1122334455');

      expect(inputsFormat.preventivo.numero_preventivo).toBe('ROUND001');
      expect(inputsFormat.preventivo.destinazione).toBe('Parigi');
      expect(inputsFormat.preventivo.adulti).toBe(2);
      expect(inputsFormat.preventivo.bambini).toBe(1);

      expect(inputsFormat.serviziATerra).toHaveLength(1);
      expect(inputsFormat.serviziATerra[0].descrizione).toBe('Hotel Parigi');
      expect(inputsFormat.serviziATerra[0].totEuro).toBe(600);

      expect(inputsFormat.voli).toHaveLength(1);
      expect(inputsFormat.voli[0].descrizione).toBe('Roma-Parigi A/R');
      expect(inputsFormat.voli[0].totEuro).toBe(400);
    });

    test('should handle complex nested data structures', async () => {
      // Create complex test scenario
      const clienteResult = await testActions.createCliente({
        nome: 'Complex',
        cognome: 'Data',
        email: 'complex@test.com',
        data_di_nascita: new Date('1980-12-25'),
        cf: 'CMPXDT80T25H501X'
      });

      const fornitoreResult = await testActions.createFornitore({
        nome: 'Complex Fornitore',
        valuta: 'USD'
      });

      const bancaResult = await testActions.createBanca({
        nome: 'Test Bank'
      });

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: 'COMPLEX001',
        data_partenza: new Date('2024-09-15'),
        data_ritorno: new Date('2024-09-22')
      });

      // Add service with pagamenti
      const servizioResult = await testActions.createServizioATerra({
        id_preventivo: preventivoResult.data.id,
        id_fornitore: fornitoreResult.data.id,
        descrizione: 'Complex Service',
        totEuro: 1000
      });

      await testActions.createPagamentoServizioATerra({
        id_servizio_a_terra: servizioResult.data.id,
        id_banca: bancaResult.data.id,
        importo: 500,
        data_scadenza: new Date('2024-08-01')
      });

      // Get and transform data
      const originalData = await testActions.getPreventivoCompleto(preventivoResult.data.id);
      const transformed = transformPreventivoToCompleto(originalData);

      expect(transformed.cliente.data_di_nascita).toBeInstanceOf(Date);
      expect(transformed.preventivo.data_partenza).toBeInstanceOf(Date);
      expect(transformed.preventivo.data_ritorno).toBeInstanceOf(Date);
      expect(transformed.serviziATerra[0].pagamenti).toHaveLength(1);
      expect(transformed.serviziATerra[0].pagamenti[0].importo).toBe(500);
    });
  });
});

