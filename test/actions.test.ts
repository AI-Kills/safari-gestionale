import { describe, test, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
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
    await testDb.close();
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
  // ASSICURAZIONE TESTS
  // ============================================================================

  describe('Assicurazione CRUD Operations', () => {
    let testClienteId: string;
    let testPreventivoId: string;
    let testFornitoreId: string;

    beforeEach(async () => {
      // Create test cliente
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Cliente',
        email: 'test.cliente.assicurazione@example.com'
      });
      testClienteId = clienteResult.data.id;

      // Create test preventivo
      const preventivoResult = await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: 'ASS001'
      });
      testPreventivoId = preventivoResult.data.id;

      // Create test fornitore
      const fornitoreResult = await testActions.createFornitore({
        nome: 'Assicurazione Test',
        valuta: 'EUR'
      });
      testFornitoreId = fornitoreResult.data.id;
    });

    test('should create a new assicurazione successfully', async () => {
      const assicurazioneData = {
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tipo: 'Medico',
        costo: 50.00
      };

      const result = await testActions.createAssicurazione(assicurazioneData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.assicurazione).toBe('Medico');
      expect(result.data.id).toBeDefined();
    });

    test('should fetch assicurazioni by preventivo id', async () => {
      // Create test assicurazioni
      await testActions.createAssicurazione({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tipo: 'Medico'
      });
      await testActions.createAssicurazione({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tipo: 'Annullamento'
      });

      const result = await testActions.fetchAssicurazioniByPreventivoId(testPreventivoId);

      expect(result.success).toBe(true);
      expect(result.values).toHaveLength(2);
    });

    test('should update assicurazione successfully', async () => {
      const createResult = await testActions.createAssicurazione({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tipo: 'Medico',
        costo: 50.00
      });

      const updateResult = await testActions.updateAssicurazione({
        id: createResult.data.id,
        tipo: 'Annullamento',
        costo: 75.00
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.assicurazione).toBe('Annullamento');
      expect(updateResult.data.netto).toBe(75.00);
    });

    test('should delete assicurazione successfully', async () => {
      const createResult = await testActions.createAssicurazione({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tipo: 'Medico'
      });

      const deleteResult = await testActions.deleteAssicurazioneById(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const assicurazioni = await testActions.getAllAssicurazioni();
      expect(assicurazioni).toHaveLength(0);
    });
  });

  // ============================================================================
  // PARTECIPANTE TESTS
  // ============================================================================

  describe('Partecipante CRUD Operations', () => {
    let testClienteId: string;
    let testPreventivoId: string;

    beforeEach(async () => {
      // Create test cliente
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Cliente',
        email: 'test.cliente.partecipante@example.com'
      });
      testClienteId = clienteResult.data.id;

      // Create test preventivo
      const preventivoResult = await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: 'PART001'
      });
      testPreventivoId = preventivoResult.data.id;
    });

    test('should create a new partecipante successfully', async () => {
      const partecipanteData = {
        id_preventivo: testPreventivoId,
        nome: 'Mario',
        cognome: 'Rossi',
        tot_quota: 1500.00
      };

      const result = await testActions.createPartecipante(partecipanteData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.nome).toBe('Mario');
      expect(result.data.cognome).toBe('Rossi');
      expect(Number(result.data.tot_quota)).toBe(1500.00);
      expect(result.data.id).toBeDefined();
    });

    test('should fetch partecipanti by preventivo id', async () => {
      // Create test partecipanti
      await testActions.createPartecipante({
        id_preventivo: testPreventivoId,
        nome: 'Mario',
        cognome: 'Rossi',
        tot_quota: 1500.00
      });
      await testActions.createPartecipante({
        id_preventivo: testPreventivoId,
        nome: 'Giulia',
        cognome: 'Bianchi',
        tot_quota: 1200.00
      });

      const result = await testActions.fetchPartecipantiByPreventivoId(testPreventivoId);

      expect(result.success).toBe(true);
      expect(result.values).toHaveLength(2);
      expect(result.values[0].cognome).toBe('Bianchi'); // Ordinati per cognome
      expect(result.values[1].cognome).toBe('Rossi');
    });

    test('should update partecipante successfully', async () => {
      const createResult = await testActions.createPartecipante({
        id_preventivo: testPreventivoId,
        nome: 'Mario',
        cognome: 'Rossi',
        tot_quota: 1500.00
      });

      const updateResult = await testActions.updatePartecipante({
        id: createResult.data.id,
        nome: 'Marco',
        tot_quota: 1800.00
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.nome).toBe('Marco');
      expect(Number(updateResult.data.tot_quota)).toBe(1800.00);
    });

    test('should delete partecipante successfully', async () => {
      const createResult = await testActions.createPartecipante({
        id_preventivo: testPreventivoId,
        nome: 'Mario',
        cognome: 'Rossi',
        tot_quota: 1500.00
      });

      const deleteResult = await testActions.deletePartecipante(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const partecipanti = await testActions.getAllPartecipanti();
      expect(partecipanti).toHaveLength(0);
    });

    test('should handle validation errors for partecipante creation', async () => {
      const partecipanteData = {
        // Missing required id_preventivo
        nome: 'Mario',
        cognome: 'Rossi'
      };

      const result = await testActions.createPartecipante(partecipanteData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    test('should handle negative tot_quota validation', async () => {
      const partecipanteData = {
        id_preventivo: testPreventivoId,
        nome: 'Mario',
        cognome: 'Rossi',
        tot_quota: -100.00 // Invalid negative value
      };

      const result = await testActions.createPartecipante(partecipanteData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });
  });

  // ============================================================================
  // INCASSO PARTECIPANTE TESTS
  // ============================================================================

  describe('Incasso Partecipante CRUD Operations', () => {
    let testClienteId: string;
    let testPreventivoId: string;
    let testPartecipanteId: string;
    let testBancaId: string;

    beforeEach(async () => {
      // Create test cliente
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Incasso',
        email: 'test.incasso@example.com'
      });
      testClienteId = clienteResult.data.id;

      // Create test preventivo
      const preventivoResult = await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: 'INC001'
      });
      testPreventivoId = preventivoResult.data.id;

      // Create test partecipante
      const partecipanteResult = await testActions.createPartecipante({
        id_preventivo: testPreventivoId,
        nome: 'Mario',
        cognome: 'Rossi',
        tot_quota: 1500.00
      });
      testPartecipanteId = partecipanteResult.data.id;

      // Create test banca
      const bancaResult = await testActions.createBanca({
        nome: 'Banca Test Incassi'
      });
      testBancaId = bancaResult.data.id;
    });

    test('should create a new incasso partecipante successfully', async () => {
      const incassoData = {
        id_partecipante: testPartecipanteId,
        id_banca: testBancaId,
        importo: 500.00,
        data_scadenza: new Date('2024-12-31'),
        data_incasso: new Date('2024-12-25')
      };

      const result = await testActions.createIncassoPartecipante(incassoData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Number(result.data.importo)).toBe(500.00);
      expect(result.data.id).toBeDefined();
    });

    test('should fetch incassi by partecipante id', async () => {
      // Create test incassi
      await testActions.createIncassoPartecipante({
        id_partecipante: testPartecipanteId,
        id_banca: testBancaId,
        importo: 500.00,
        data_scadenza: new Date('2024-12-31')
      });
      await testActions.createIncassoPartecipante({
        id_partecipante: testPartecipanteId,
        id_banca: testBancaId,
        importo: 300.00,
        data_scadenza: new Date('2024-11-30')
      });

      const result = await testActions.fetchIncassiPartecipantiByPartecipanteId(testPartecipanteId);

      expect(result.success).toBe(true);
      expect(result.values).toHaveLength(2);
      // Ordinati per data_scadenza
      expect(Number(result.values[0].importo)).toBe(300.00);
      expect(Number(result.values[1].importo)).toBe(500.00);
    });

    test('should update incasso partecipante successfully', async () => {
      const createResult = await testActions.createIncassoPartecipante({
        id_partecipante: testPartecipanteId,
        id_banca: testBancaId,
        importo: 500.00
      });

      const updateResult = await testActions.updateIncassoPartecipante({
        id: createResult.data.id,
        importo: 750.00,
        data_incasso: new Date('2024-12-20')
      });

      expect(updateResult.success).toBe(true);
      expect(Number(updateResult.data.importo)).toBe(750.00);
    });

    test('should delete incasso partecipante successfully', async () => {
      const createResult = await testActions.createIncassoPartecipante({
        id_partecipante: testPartecipanteId,
        id_banca: testBancaId,
        importo: 500.00
      });

      const deleteResult = await testActions.deleteIncassoPartecipante(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const incassi = await testActions.getAllIncassiPartecipanti();
      expect(incassi).toHaveLength(0);
    });

    test('should handle validation errors for incasso creation', async () => {
      const incassoData = {
        // Missing required id_partecipante
        importo: 500.00
      };

      const result = await testActions.createIncassoPartecipante(incassoData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    test('should handle negative importo validation', async () => {
      const incassoData = {
        id_partecipante: testPartecipanteId,
        importo: -100.00 // Invalid negative value
      };

      const result = await testActions.createIncassoPartecipante(incassoData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });
  });

  // ============================================================================
  // VOLO TESTS
  // ============================================================================

  describe('Volo CRUD Operations', () => {
    let testClienteId: string;
    let testPreventivoId: string;
    let testFornitoreId: string;

    beforeEach(async () => {
      // Create test cliente
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Cliente',
        email: 'test.cliente.volo@example.com'
      });
      testClienteId = clienteResult.data.id;

      // Create test preventivo
      const preventivoResult = await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: 'VOL001'
      });
      testPreventivoId = preventivoResult.data.id;

      // Create test fornitore
      const fornitoreResult = await testActions.createFornitore({
        nome: 'Compagnia Aerea Test',
        valuta: 'EUR'
      });
      testFornitoreId = fornitoreResult.data.id;
    });

    test('should create a new volo successfully', async () => {
      const voloData = {
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tratta: 'Roma-Milano',
        costo: 150.00
      };

      const result = await testActions.createVolo(voloData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.compagnia_aerea).toBe('Roma-Milano');
      expect(result.data.id).toBeDefined();
    });

    test('should fetch voli by preventivo id', async () => {
      // Create test voli
      await testActions.createVolo({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tratta: 'Roma-Milano'
      });
      await testActions.createVolo({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tratta: 'Milano-Roma'
      });

      const result = await testActions.fetchVoliByPreventivoId(testPreventivoId);

      expect(result.success).toBe(true);
      expect(result.values).toHaveLength(2);
    });

    test('should update volo successfully', async () => {
      const createResult = await testActions.createVolo({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tratta: 'Roma-Milano',
        costo: 150.00
      });

      const updateResult = await testActions.updateVolo({
        id: createResult.data.id,
        tratta: 'Roma-Napoli',
        costo: 180.00
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.compagnia_aerea).toBe('Roma-Napoli');
      expect(updateResult.data.totale).toBe(180.00);
    });

    test('should delete volo successfully', async () => {
      const createResult = await testActions.createVolo({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tratta: 'Roma-Milano'
      });

      const deleteResult = await testActions.deleteVoloById(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const voli = await testActions.getAllVoli();
      expect(voli).toHaveLength(0);
    });
  });

  // ============================================================================
  // SERVIZI A TERRA TESTS
  // ============================================================================

  describe('Servizi a Terra CRUD Operations', () => {
    let testClienteId: string;
    let testPreventivoId: string;
    let testFornitoreId: string;
    let testDestinazioneId: string;

    beforeEach(async () => {
      // Create test cliente
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Cliente',
        email: 'test.cliente.servizi@example.com'
      });
      testClienteId = clienteResult.data.id;

      // Create test preventivo
      const preventivoResult = await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: 'SER001'
      });
      testPreventivoId = preventivoResult.data.id;

      // Create test fornitore
      const fornitoreResult = await testActions.createFornitore({
        nome: 'Hotel Test',
        valuta: 'EUR'
      });
      testFornitoreId = fornitoreResult.data.id;

      // Create test destinazione
      const destinazioneResult = await testActions.createDestinazione({
        nome: 'Roma Test'
      });
      testDestinazioneId = destinazioneResult.data.id;
    });

    test('should create a new servizio a terra successfully', async () => {
      const servizioData = {
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        id_destinazione: testDestinazioneId,
        tipo: 'Hotel',
        costo: 200.00
      };

      const result = await testActions.createServizioATerra(servizioData, testPreventivoId, false);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.descrizione).toBe('Hotel');
      expect(result.data.id).toBeDefined();
    });

    test('should fetch servizi a terra by preventivo id', async () => {
      // Create test servizi
      await testActions.createServizioATerra({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        id_destinazione: testDestinazioneId,
        tipo: 'Hotel'
      }, testPreventivoId, false);
      
      await testActions.createServizioATerra({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        id_destinazione: testDestinazioneId,
        tipo: 'Transfer'
      }, testPreventivoId, false);

      const result = await testActions.fetchServiziATerraByPreventivoId(testPreventivoId);

      expect(result.success).toBe(true);
      expect(result.values).toHaveLength(2);
    });

    test('should delete servizio a terra successfully', async () => {
      const createResult = await testActions.createServizioATerra({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        id_destinazione: testDestinazioneId,
        tipo: 'Hotel'
      }, testPreventivoId, false);

      const deleteResult = await testActions.deleteServizioATerraById(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const servizi = await testActions.getAllServiziATerra();
      expect(servizi).toHaveLength(0);
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

  // ============================================================================
  // PAGAMENTI TESTS
  // ============================================================================

  describe('Pagamenti Assicurazioni CRUD Operations', () => {
    let testClienteId: string;
    let testPreventivoId: string;
    let testFornitoreId: string;
    let testAssicurazioneId: string;
    let testBancaId: string;

    beforeEach(async () => {
      // Create test cliente
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Cliente',
        email: 'test.cliente.pagamenti.assicurazione@example.com'
      });
      testClienteId = clienteResult.data.id;

      // Create test preventivo
      const preventivoResult = await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: 'PAG_ASS001'
      });
      testPreventivoId = preventivoResult.data.id;

      // Create test fornitore
      const fornitoreResult = await testActions.createFornitore({
        nome: 'Assicurazione Pagamenti Test',
        valuta: 'EUR'
      });
      testFornitoreId = fornitoreResult.data.id;

      // Create test assicurazione
      const assicurazioneResult = await testActions.createAssicurazione({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tipo: 'Medico'
      });
      testAssicurazioneId = assicurazioneResult.data.id;

      // Create test banca
      const bancaResult = await testActions.createBanca({
        nome: 'Banca Test Pagamenti'
      });
      testBancaId = bancaResult.data.id;
    });

    test('should create a new pagamento assicurazione successfully', async () => {
      const pagamentoData = {
        id_assicurazione: testAssicurazioneId,
        id_banca: testBancaId,
        importo: 150.00,
        data_scadenza: new Date('2024-12-31'),
        data_incasso: new Date('2024-12-15')
      };

      const result = await testActions.createPagamentoAssicurazione(pagamentoData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.importo).toBe(150.00);
      expect(result.data.id_assicurazione).toBe(testAssicurazioneId);
      expect(result.data.id).toBeDefined();
    });

    test('should update pagamento assicurazione successfully', async () => {
      const createResult = await testActions.createPagamentoAssicurazione({
        id_assicurazione: testAssicurazioneId,
        id_banca: testBancaId,
        importo: 100.00
      });

      const updateResult = await testActions.updatePagamentoAssicurazione({
        id: createResult.data.id,
        importo: 200.00,
        data_incasso: new Date('2024-12-20')
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.importo).toBe(200.00);
    });

    test('should delete pagamento assicurazione successfully', async () => {
      const createResult = await testActions.createPagamentoAssicurazione({
        id_assicurazione: testAssicurazioneId,
        id_banca: testBancaId,
        importo: 100.00
      });

      const deleteResult = await testActions.deletePagamentoAssicurazione(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const pagamenti = await testActions.getAllPagamentiAssicurazioni();
      expect(pagamenti).toHaveLength(0);
    });

    test('should fetch pagamenti by assicurazione id', async () => {
      await testActions.createPagamentoAssicurazione({
        id_assicurazione: testAssicurazioneId,
        id_banca: testBancaId,
        importo: 100.00
      });
      await testActions.createPagamentoAssicurazione({
        id_assicurazione: testAssicurazioneId,
        id_banca: testBancaId,
        importo: 150.00
      });

      const result = await testActions.fetchPagamentiAssicurazioniByAssicurazioneId(testAssicurazioneId);

      expect(result.success).toBe(true);
      expect(result.values).toHaveLength(2);
    });
  });

  describe('Pagamenti Servizi a Terra CRUD Operations', () => {
    let testClienteId: string;
    let testPreventivoId: string;
    let testFornitoreId: string;
    let testDestinazioneId: string;
    let testServizioATerraId: string;
    let testBancaId: string;

    beforeEach(async () => {
      // Create test cliente
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Cliente',
        email: 'test.cliente.pagamenti.servizi@example.com'
      });
      testClienteId = clienteResult.data.id;

      // Create test preventivo
      const preventivoResult = await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: 'PAG_SER001'
      });
      testPreventivoId = preventivoResult.data.id;

      // Create test fornitore
      const fornitoreResult = await testActions.createFornitore({
        nome: 'Hotel Pagamenti Test',
        valuta: 'EUR'
      });
      testFornitoreId = fornitoreResult.data.id;

      // Create test destinazione
      const destinazioneResult = await testActions.createDestinazione({
        nome: 'Roma Pagamenti Test'
      });
      testDestinazioneId = destinazioneResult.data.id;

      // Create test servizio a terra
      const servizioResult = await testActions.createServizioATerra({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        id_destinazione: testDestinazioneId,
        tipo: 'Hotel'
      }, testPreventivoId, false);
      testServizioATerraId = servizioResult.data.id;

      // Create test banca
      const bancaResult = await testActions.createBanca({
        nome: 'Banca Test Servizi'
      });
      testBancaId = bancaResult.data.id;
    });

    test('should create a new pagamento servizio a terra successfully', async () => {
      const pagamentoData = {
        id_servizio_a_terra: testServizioATerraId,
        id_banca: testBancaId,
        importo: 300.00,
        data_scadenza: new Date('2024-12-31'),
        data_incasso: new Date('2024-12-15')
      };

      const result = await testActions.createPagamentoServizioATerra(pagamentoData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.importo).toBe(300.00);
      expect(result.data.id_servizio_a_terra).toBe(testServizioATerraId);
      expect(result.data.id).toBeDefined();
    });

    test('should update pagamento servizio a terra successfully', async () => {
      const createResult = await testActions.createPagamentoServizioATerra({
        id_servizio_a_terra: testServizioATerraId,
        id_banca: testBancaId,
        importo: 250.00
      });

      const updateResult = await testActions.updatePagamentoServizioATerra({
        id: createResult.data.id,
        importo: 350.00,
        data_incasso: new Date('2024-12-20')
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.importo).toBe(350.00);
    });

    test('should delete pagamento servizio a terra successfully', async () => {
      const createResult = await testActions.createPagamentoServizioATerra({
        id_servizio_a_terra: testServizioATerraId,
        id_banca: testBancaId,
        importo: 250.00
      });

      const deleteResult = await testActions.deletePagamentoServizioATerra(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const pagamenti = await testActions.getAllPagamentiServiziATerra();
      expect(pagamenti).toHaveLength(0);
    });

    test('should fetch pagamenti by servizio a terra id', async () => {
      await testActions.createPagamentoServizioATerra({
        id_servizio_a_terra: testServizioATerraId,
        id_banca: testBancaId,
        importo: 200.00
      });
      await testActions.createPagamentoServizioATerra({
        id_servizio_a_terra: testServizioATerraId,
        id_banca: testBancaId,
        importo: 300.00
      });

      const result = await testActions.fetchPagamentiServiziATerraByServizioId(testServizioATerraId);

      expect(result.success).toBe(true);
      expect(result.values).toHaveLength(2);
    });
  });

  describe('Pagamenti Voli CRUD Operations', () => {
    let testClienteId: string;
    let testPreventivoId: string;
    let testFornitoreId: string;
    let testVoloId: string;
    let testBancaId: string;

    beforeEach(async () => {
      // Create test cliente
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Cliente',
        email: 'test.cliente.pagamenti.voli@example.com'
      });
      testClienteId = clienteResult.data.id;

      // Create test preventivo
      const preventivoResult = await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: 'PAG_VOL001'
      });
      testPreventivoId = preventivoResult.data.id;

      // Create test fornitore
      const fornitoreResult = await testActions.createFornitore({
        nome: 'Compagnia Aerea Pagamenti Test',
        valuta: 'EUR'
      });
      testFornitoreId = fornitoreResult.data.id;

      // Create test volo
      const voloResult = await testActions.createVolo({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tratta: 'Roma-Milano'
      });
      testVoloId = voloResult.data.id;

      // Create test banca
      const bancaResult = await testActions.createBanca({
        nome: 'Banca Test Voli'
      });
      testBancaId = bancaResult.data.id;
    });

    test('should create a new pagamento volo successfully', async () => {
      const pagamentoData = {
        id_volo: testVoloId,
        id_banca: testBancaId,
        importo: 450.00,
        data_scadenza: new Date('2024-12-31'),
        data_incasso: new Date('2024-12-15')
      };

      const result = await testActions.createPagamentoVolo(pagamentoData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.importo).toBe(450.00);
      expect(result.data.id_volo).toBe(testVoloId);
      expect(result.data.id).toBeDefined();
    });

    test('should update pagamento volo successfully', async () => {
      const createResult = await testActions.createPagamentoVolo({
        id_volo: testVoloId,
        id_banca: testBancaId,
        importo: 400.00
      });

      const updateResult = await testActions.updatePagamentoVolo({
        id: createResult.data.id,
        importo: 500.00,
        data_incasso: new Date('2024-12-20')
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.importo).toBe(500.00);
    });

    test('should delete pagamento volo successfully', async () => {
      const createResult = await testActions.createPagamentoVolo({
        id_volo: testVoloId,
        id_banca: testBancaId,
        importo: 400.00
      });

      const deleteResult = await testActions.deletePagamentoVolo(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const pagamenti = await testActions.getAllPagamentiVoli();
      expect(pagamenti).toHaveLength(0);
    });

    test('should fetch pagamenti by volo id', async () => {
      await testActions.createPagamentoVolo({
        id_volo: testVoloId,
        id_banca: testBancaId,
        importo: 350.00
      });
      await testActions.createPagamentoVolo({
        id_volo: testVoloId,
        id_banca: testBancaId,
        importo: 450.00
      });

      const result = await testActions.fetchPagamentiVoliByVoloId(testVoloId);

      expect(result.success).toBe(true);
      expect(result.values).toHaveLength(2);
    });
  });

  describe('Pagamenti Business Logic Tests', () => {
    let testClienteId: string;
    let testPreventivoId: string;
    let testFornitoreId: string;
    let testBancaId: string;

    beforeEach(async () => {
      // Create test data
      const clienteResult = await testActions.createCliente({
        nome: 'Test',
        cognome: 'Cliente Business Logic',
        email: 'test.business.logic@example.com'
      });
      testClienteId = clienteResult.data.id;

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: testClienteId,
        numero_preventivo: 'BL001'
      });
      testPreventivoId = preventivoResult.data.id;

      const fornitoreResult = await testActions.createFornitore({
        nome: 'Fornitore Business Logic',
        valuta: 'EUR'
      });
      testFornitoreId = fornitoreResult.data.id;

      const bancaResult = await testActions.createBanca({
        nome: 'Banca Business Logic'
      });
      testBancaId = bancaResult.data.id;
    });

    test('should handle multiple pagamenti for same entity', async () => {
      // Create assicurazione
      const assicurazioneResult = await testActions.createAssicurazione({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tipo: 'Medico'
      });

      // Create multiple pagamenti for the same assicurazione
      await testActions.createPagamentoAssicurazione({
        id_assicurazione: assicurazioneResult.data.id,
        id_banca: testBancaId,
        importo: 100.00,
        data_scadenza: new Date('2024-11-30')
      });

      await testActions.createPagamentoAssicurazione({
        id_assicurazione: assicurazioneResult.data.id,
        id_banca: testBancaId,
        importo: 150.00,
        data_scadenza: new Date('2024-12-31')
      });

      const pagamenti = await testActions.fetchPagamentiAssicurazioniByAssicurazioneId(assicurazioneResult.data.id);

      expect(pagamenti.success).toBe(true);
      expect(pagamenti.values).toHaveLength(2);
      
      // Verify total amount
      const totalImporto = pagamenti.values.reduce((sum: number, p: any) => sum + (p.importo || 0), 0);
      expect(totalImporto).toBe(250.00);
    });

    test('should handle pagamenti without banca', async () => {
      const assicurazioneResult = await testActions.createAssicurazione({
        id_preventivo: testPreventivoId,
        id_fornitore: testFornitoreId,
        tipo: 'Annullamento'
      });

      const result = await testActions.createPagamentoAssicurazione({
        id_assicurazione: assicurazioneResult.data.id,
        importo: 75.00,
        data_scadenza: new Date('2024-12-31')
      });

      expect(result.success).toBe(true);
      expect(result.data.id_banca).toBeNull();
      expect(result.data.importo).toBe(75.00);
    });

    test('should validate required fields', async () => {
      const result = await testActions.createPagamentoAssicurazione({
        // Missing id_assicurazione
        id_banca: testBancaId,
        importo: 100.00
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
}); 