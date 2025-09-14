import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { testDb } from './test-db-setup';
import { TestActionsHelper } from './test-helpers';

describe('CRUD Operations with Test Database', () => {
  let testActions: TestActionsHelper;

  beforeAll(async () => {
    await testDb.initialize();
    testActions = new TestActionsHelper(testDb.getClient());
  });

  afterEach(async () => {
    await testDb.cleanup();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  // ============================================================================
  // USER TESTS
  // ============================================================================
  
  describe('User CRUD Operations', () => {
    test('should create a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const result = await testActions.createUser(userData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.email).toBe('test@example.com');
      expect(result.data.id).toBeDefined();
    });

    test('should fail user creation with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123'
      };

      const result = await testActions.createUser(userData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    test('should fail user creation with short password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123'
      };

      const result = await testActions.createUser(userData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    test('should get all users', async () => {
      // Create test users
      await testActions.createUser({ email: 'user1@test.com', password: 'password123' });
      await testActions.createUser({ email: 'user2@test.com', password: 'password123' });

      const users = await testActions.getAllUsers();

      expect(users).toHaveLength(2);
      expect(users[0].email).toBe('user1@test.com');
      expect(users[1].email).toBe('user2@test.com');
    });

    test('should update user successfully', async () => {
      const createResult = await testActions.createUser({ 
        email: 'original@test.com', 
        password: 'password123' 
      });

      const updateResult = await testActions.updateUser({
        id: createResult.data.id,
        email: 'updated@test.com'
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.email).toBe('updated@test.com');
    });

    test('should delete user successfully', async () => {
      const createResult = await testActions.createUser({ 
        email: 'delete@test.com', 
        password: 'password123' 
      });

      const deleteResult = await testActions.deleteUser(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const users = await testActions.getAllUsers();
      expect(users).toHaveLength(0);
    });
  });

  // ============================================================================
  // CLIENTE TESTS
  // ============================================================================

  describe('Cliente CRUD Operations', () => {
    test('should create a new cliente successfully', async () => {
      const clienteData = {
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mario.rossi@test.com',
        tel: '+39123456789'
      };

      const result = await testActions.createCliente(clienteData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.nome).toBe('Mario');
      expect(result.data.cognome).toBe('Rossi');
      expect(result.data.email).toBe('mario.rossi@test.com');
      expect(result.data.id).toBeDefined();
    });

    test('should fail cliente creation with invalid email', async () => {
      const clienteData = {
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'invalid-email',
        tel: '+39123456789'
      };

      const result = await testActions.createCliente(clienteData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    test('should fail cliente creation with duplicate email', async () => {
      const clienteData = {
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'duplicate@test.com'
      };

      // Create first cliente
      await testActions.createCliente(clienteData);

      // Try to create duplicate
      const result = await testActions.createCliente(clienteData);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    test('should update cliente successfully', async () => {
      const createResult = await testActions.createCliente({
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mario@test.com'
      });

      const updateResult = await testActions.updateCliente({
        id: createResult.data.id,
        nome: 'Giuseppe',
        email: 'giuseppe@test.com'
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.nome).toBe('Giuseppe');
      expect(updateResult.data.email).toBe('giuseppe@test.com');
    });

    test('should delete cliente successfully', async () => {
      const createResult = await testActions.createCliente({
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'delete@test.com'
      });

      const deleteResult = await testActions.deleteCliente(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const clienti = await testActions.getAllClienti();
      expect(clienti).toHaveLength(0);
    });

    test('should search clienti successfully', async () => {
      // Create test clienti
      await testActions.createCliente({
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mario.rossi@test.com',
        citta: 'Roma'
      });
      await testActions.createCliente({
        nome: 'Giuseppe',
        cognome: 'Verdi',
        email: 'giuseppe.verdi@test.com',
        citta: 'Milano'
      });

      // Search by nome
      const searchResult = await testActions.searchClienti({ nome: 'Mario' });

      expect(searchResult.success).toBe(true);
      expect(searchResult.data).toHaveLength(1);
      expect(searchResult.data[0].nome).toBe('Mario');
    });
  });

  // ============================================================================
  // PREVENTIVO TESTS
  // ============================================================================

  describe('Preventivo CRUD Operations', () => {
    let testClienteId: string;

    beforeEach(async () => {
      // Create test cliente for preventivi
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Cliente',
        email: 'test.cliente@example.com'
      });
      testClienteId = clienteResult.data.id;
    });

    test('should create a new preventivo successfully', async () => {
      const preventivoData = {
        id_cliente: testClienteId,
        brand: 'Test Brand',
        operatore: 'Test Operator',
        destinazione: 'Roma',
        adulti: 2,
        bambini: 1,
        percentuale_ricarico: 10.5,
        numero_preventivo: '0001'
      };

      const result = await testActions.createPreventivo(preventivoData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.brand).toBe('Test Brand');
      expect(result.data.id_cliente).toBe(testClienteId);
      expect(result.data.id).toBeDefined();
    });

    test('should get number of preventivi', async () => {
      // Create some preventivi
      await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: '0001'
      });
      await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: '0002'
      });

      const result = await testActions.getNumberOfPreventivi();

      expect(result.success).toBe(true);
      expect(result.values).toBe(2);
    });

    test('should fetch preventivi by cliente id', async () => {
      // Create preventivi for the test cliente
      await testActions.createPreventivo({
        id_cliente: testClienteId,
        brand: 'Brand 1',
        numero_preventivo: '0001'
      });
      await testActions.createPreventivo({
        id_cliente: testClienteId,
        brand: 'Brand 2',
        numero_preventivo: '0002'
      });

      const result = await testActions.fetchPreventiviByIdCliente(testClienteId);

      expect(result.success).toBe(true);
      expect(result.values).toHaveLength(2);
    });

    test('should update preventivo successfully', async () => {
      const createResult = await testActions.createPreventivo({
        id_cliente: testClienteId,
        brand: 'Original Brand',
        numero_preventivo: '0001'
      });

      const updateResult = await testActions.updatePreventivo({
        id: createResult.data.id,
        brand: 'Updated Brand',
        operatore: 'New Operator'
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.brand).toBe('Updated Brand');
      expect(updateResult.data.operatore).toBe('New Operator');
    });

    test('should delete preventivo successfully', async () => {
      const createResult = await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: '0001'
      });

      const deleteResult = await testActions.deletePreventivo(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const preventivi = await testActions.getAllPreventivi();
      expect(preventivi).toHaveLength(0);
    });
  });

  // ============================================================================
  // DESTINAZIONE TESTS
  // ============================================================================

  describe('Destinazione CRUD Operations', () => {
    test('should create a new destinazione successfully', async () => {
      const destinazioneData = {
        nome: 'Roma'
      };

      const result = await testActions.createDestinazione(destinazioneData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.nome).toBe('Roma');
      expect(result.data.id).toBeDefined();
    });

    test('should fail destinazione creation with duplicate name', async () => {
      const destinazioneData = { nome: 'Milano' };

      // Create first destinazione
      await testActions.createDestinazione(destinazioneData);

      // Try to create duplicate
      const result = await testActions.createDestinazione(destinazioneData);

      expect(result.success).toBe(false);
    });

    test('should get destinazione by id', async () => {
      const createResult = await testActions.createDestinazione({ nome: 'Napoli' });
      
      const result = await testActions.getDestinazioneById(createResult.data.id);

      expect(result.success).toBe(true);
      expect(result.values.nome).toBe('Napoli');
    });

    test('should update destinazione successfully', async () => {
      const createResult = await testActions.createDestinazione({ nome: 'Firenze' });

      const updateResult = await testActions.updateDestinazione({
        id: createResult.data.id,
        nome: 'Firenze Centro'
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.nome).toBe('Firenze Centro');
    });

    test('should delete destinazione successfully', async () => {
      const createResult = await testActions.createDestinazione({ nome: 'Torino' });

      const deleteResult = await testActions.deleteDestinazione(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const destinazioni = await testActions.getAllDestinazioni();
      expect(destinazioni).toHaveLength(0);
    });
  });

  // ============================================================================
  // FORNITORE TESTS
  // ============================================================================

  describe('Fornitore CRUD Operations', () => {
    test('should create a new fornitore successfully', async () => {
      const fornitoreData = {
        nome: 'Hotel Roma',
        valuta: 'EUR'
      };

      const result = await testActions.createFornitore(fornitoreData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.nome).toBe('Hotel Roma');
      expect(result.data.valuta).toBe('EUR');
      expect(result.data.id).toBeDefined();
    });

    test('should fail fornitore creation with duplicate name', async () => {
      const fornitoreData = { nome: 'Hotel Milano' };

      // Create first fornitore
      await testActions.createFornitore(fornitoreData);

      // Try to create duplicate
      const result = await testActions.createFornitore(fornitoreData);

      expect(result.success).toBe(false);
    });

    test('should get fornitore by id', async () => {
      const createResult = await testActions.createFornitore({ 
        nome: 'Hotel Napoli',
        valuta: 'EUR'
      });
      
      const result = await testActions.getFornitoreById(createResult.data.id);

      expect(result.success).toBe(true);
      expect(result.values.nome).toBe('Hotel Napoli');
    });

    test('should update fornitore successfully', async () => {
      const createResult = await testActions.createFornitore({ 
        nome: 'Hotel Firenze',
        valuta: 'EUR'
      });

      const updateResult = await testActions.updateFornitore({
        id: createResult.data.id,
        nome: 'Grand Hotel Firenze',
        valuta: 'USD'
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.nome).toBe('Grand Hotel Firenze');
      expect(updateResult.data.valuta).toBe('USD');
    });

    test('should delete fornitore successfully', async () => {
      const createResult = await testActions.createFornitore({ nome: 'Hotel Torino' });

      const deleteResult = await testActions.deleteFornitore(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const fornitori = await testActions.getAllFornitori();
      expect(fornitori).toHaveLength(0);
    });
  });
}); 