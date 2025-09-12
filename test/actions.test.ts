import { describe, test, expect, beforeAll, afterEach } from 'vitest';
import { testDb } from './test-db-setup';
import { TestActions } from '../app/lib/actions/actions.test';

describe('CRUD Operations with Test Database', () => {
  let testActions: TestActions;

  beforeAll(async () => {
    await testDb.initialize();
    testActions = new TestActions(testDb.getClient());
  });

  afterEach(async () => {
    await testDb.cleanup();
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
      expect(result.errors?.[0].message).toContain('Email non valida');
    });

    test('should fail user creation with short password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123'
      };

      const result = await testActions.createUser(userData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.[0].message).toContain('almeno 6 caratteri');
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
        email: 'mario.rossi@example.com',
        tel: '+39 123 456 7890',
        citta: 'Roma'
      };

      const result = await testActions.createCliente(clienteData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.nome).toBe('Mario');
      expect(result.data.cognome).toBe('Rossi');
      expect(result.data.email).toBe('mario.rossi@example.com');
    });

    test('should fail cliente creation with invalid email', async () => {
      const clienteData = {
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'invalid-email',
        tel: '+39 123 456 7890',
        citta: 'Roma'
      };

      const result = await testActions.createCliente(clienteData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.[0].message).toContain('Email non valida');
    });

    test('should get all clienti ordered by cognome, nome', async () => {
      await testActions.createCliente({
        nome: 'Mario', cognome: 'Rossi', email: 'mario@test.com'
      });
      await testActions.createCliente({
        nome: 'Luigi', cognome: 'Bianchi', email: 'luigi@test.com'
      });

      const clienti = await testActions.getAllClienti();

      expect(clienti).toHaveLength(2);
      expect(clienti[0].cognome).toBe('Bianchi'); // Bianchi comes before Rossi
      expect(clienti[1].cognome).toBe('Rossi');
    });

    test('should get cliente by id', async () => {
      const createResult = await testActions.createCliente({
        nome: 'Mario', cognome: 'Rossi', email: 'mario@test.com'
      });

      const cliente = await testActions.getCliente(createResult.data.id);

      expect(cliente).toBeDefined();
      expect(cliente.nome).toBe('Mario');
      expect(cliente.email).toBe('mario@test.com');
    });

    test('should get cliente by email', async () => {
      await testActions.createCliente({
        nome: 'Mario', cognome: 'Rossi', email: 'mario@test.com'
      });

      const cliente = await testActions.getClienteByEmail('mario@test.com');

      expect(cliente).toBeDefined();
      expect(cliente.nome).toBe('Mario');
      expect(cliente.email).toBe('mario@test.com');
    });

    test('should update cliente successfully', async () => {
      const createResult = await testActions.createCliente({
        nome: 'Mario', cognome: 'Rossi', email: 'mario@test.com'
      });

      const updateResult = await testActions.updateCliente({
        id: createResult.data.id,
        nome: 'Mario Updated',
        tel: '+39 999 888 7777'
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.nome).toBe('Mario Updated');
      expect(updateResult.data.tel).toBe('+39 999 888 7777');
      expect(updateResult.data.email).toBe('mario@test.com'); // unchanged
    });

    test('should delete cliente successfully', async () => {
      const createResult = await testActions.createCliente({
        nome: 'Mario', cognome: 'Rossi', email: 'mario@test.com'
      });

      const deleteResult = await testActions.deleteCliente(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const cliente = await testActions.getCliente(createResult.data.id);
      expect(cliente).toBeNull();
    });

    test('should validate cliente email uniqueness', async () => {
      await testActions.createCliente({
        nome: 'Mario', cognome: 'Rossi', email: 'mario@test.com'
      });

      const isUnique = await testActions.validateClienteUniqueness('mario@test.com');
      expect(isUnique).toBe(false);

      const isUniqueNew = await testActions.validateClienteUniqueness('new@test.com');
      expect(isUniqueNew).toBe(true);
    });
  });

  // ============================================================================
  // FORNITORE TESTS
  // ============================================================================

  describe('Fornitore CRUD Operations', () => {
    test('should create a new fornitore successfully', async () => {
      const fornitoreData = {
        nome: 'Hotel Paradise',
        valuta: 'EUR'
      };

      const result = await testActions.createFornitore(fornitoreData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.nome).toBe('Hotel Paradise');
      expect(result.data.valuta).toBe('EUR');
    });

    test('should fail fornitore creation without nome', async () => {
      const fornitoreData = {
        valuta: 'EUR'
      };

      const result = await testActions.createFornitore(fornitoreData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.[0].message).toContain('obbligatorio');
    });

    test('should get all fornitori ordered by nome', async () => {
      await testActions.createFornitore({ nome: 'Zebra Hotel', valuta: 'EUR' });
      await testActions.createFornitore({ nome: 'Alpha Resort', valuta: 'USD' });

      const fornitori = await testActions.getAllFornitori();

      expect(fornitori).toHaveLength(2);
      expect(fornitori[0].nome).toBe('Alpha Resort');
      expect(fornitori[1].nome).toBe('Zebra Hotel');
    });

    test('should get fornitore by nome', async () => {
      await testActions.createFornitore({ nome: 'Test Hotel', valuta: 'EUR' });

      const fornitore = await testActions.getFornitoreByNome('Test Hotel');

      expect(fornitore).toBeDefined();
      expect(fornitore.nome).toBe('Test Hotel');
      expect(fornitore.valuta).toBe('EUR');
    });

    test('should update fornitore successfully', async () => {
      const createResult = await testActions.createFornitore({
        nome: 'Original Hotel', valuta: 'EUR'
      });

      const updateResult = await testActions.updateFornitore({
        id: createResult.data.id,
        nome: 'Updated Hotel',
        valuta: 'USD'
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.nome).toBe('Updated Hotel');
      expect(updateResult.data.valuta).toBe('USD');
    });

    test('should delete fornitore successfully', async () => {
      const createResult = await testActions.createFornitore({
        nome: 'Delete Me Hotel', valuta: 'EUR'
      });

      const deleteResult = await testActions.deleteFornitore(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const fornitore = await testActions.getFornitoreByNome('Delete Me Hotel');
      expect(fornitore).toBeNull();
    });

    test('should validate fornitore nome uniqueness', async () => {
      await testActions.createFornitore({ nome: 'Unique Hotel', valuta: 'EUR' });

      const isUnique = await testActions.validateFornitoreUniqueness('Unique Hotel');
      expect(isUnique).toBe(false);

      const isUniqueNew = await testActions.validateFornitoreUniqueness('New Hotel');
      expect(isUniqueNew).toBe(true);
    });
  });

  // ============================================================================
  // DESTINAZIONE TESTS
  // ============================================================================

  describe('Destinazione CRUD Operations', () => {
    test('should create a new destinazione successfully', async () => {
      const destinazioneData = {
        nome: 'Maldive'
      };

      const result = await testActions.createDestinazione(destinazioneData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.nome).toBe('Maldive');
    });

    test('should fail destinazione creation without nome', async () => {
      const destinazioneData = {};

      const result = await testActions.createDestinazione(destinazioneData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.[0].message).toContain('obbligatorio');
    });

    test('should get all destinazioni ordered by nome', async () => {
      await testActions.createDestinazione({ nome: 'Zanzibar' });
      await testActions.createDestinazione({ nome: 'Bali' });

      const destinazioni = await testActions.getAllDestinazioni();

      expect(destinazioni).toHaveLength(2);
      expect(destinazioni[0].nome).toBe('Bali');
      expect(destinazioni[1].nome).toBe('Zanzibar');
    });

    test('should get destinazione by nome', async () => {
      await testActions.createDestinazione({ nome: 'Test Destination' });

      const destinazione = await testActions.getDestinazioneByNome('Test Destination');

      expect(destinazione).toBeDefined();
      expect(destinazione.nome).toBe('Test Destination');
    });

    test('should update destinazione successfully', async () => {
      const createResult = await testActions.createDestinazione({
        nome: 'Original Destination'
      });

      const updateResult = await testActions.updateDestinazione({
        id: createResult.data.id,
        nome: 'Updated Destination'
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.nome).toBe('Updated Destination');
    });

    test('should delete destinazione successfully', async () => {
      const createResult = await testActions.createDestinazione({
        nome: 'Delete Me Destination'
      });

      const deleteResult = await testActions.deleteDestinazione(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const destinazione = await testActions.getDestinazioneByNome('Delete Me Destination');
      expect(destinazione).toBeNull();
    });

    test('should validate destinazione nome uniqueness', async () => {
      await testActions.createDestinazione({ nome: 'Unique Destination' });

      const isUnique = await testActions.validateDestinazioneUniqueness('Unique Destination');
      expect(isUnique).toBe(false);

      const isUniqueNew = await testActions.validateDestinazioneUniqueness('New Destination');
      expect(isUniqueNew).toBe(true);
    });
  });

  // ============================================================================
  // BANCA TESTS
  // ============================================================================

  describe('Banca CRUD Operations', () => {
    test('should create a new banca successfully', async () => {
      const bancaData = {
        nome: 'Banca Intesa'
      };

      const result = await testActions.createBanca(bancaData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.nome).toBe('Banca Intesa');
    });

    test('should fail banca creation without nome', async () => {
      const bancaData = {};

      const result = await testActions.createBanca(bancaData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.[0].message).toContain('obbligatorio');
    });

    test('should get all banche ordered by nome', async () => {
      await testActions.createBanca({ nome: 'Zebra Bank' });
      await testActions.createBanca({ nome: 'Alpha Bank' });

      const banche = await testActions.getAllBanche();

      expect(banche).toHaveLength(2);
      expect(banche[0].nome).toBe('Alpha Bank');
      expect(banche[1].nome).toBe('Zebra Bank');
    });

    test('should update banca successfully', async () => {
      const createResult = await testActions.createBanca({
        nome: 'Original Bank'
      });

      const updateResult = await testActions.updateBanca({
        id: createResult.data.id,
        nome: 'Updated Bank'
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.nome).toBe('Updated Bank');
    });

    test('should delete banca successfully', async () => {
      const createResult = await testActions.createBanca({
        nome: 'Delete Me Bank'
      });

      const deleteResult = await testActions.deleteBanca(createResult.data.id);

      expect(deleteResult.success).toBe(true);

      const banche = await testActions.getAllBanche();
      expect(banche.find(b => b.id === createResult.data.id)).toBeUndefined();
    });
  });

  // ============================================================================
  // PREVENTIVO TESTS
  // ============================================================================

  describe('Preventivo CRUD Operations', () => {
    test('should create a complete preventivo workflow', async () => {
      const clienteData = {
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mario.workflow@test.com'
      };

      const preventivoData = {
        brand: 'Premium Travel',
        adulti: 2,
        bambini: 0,
        destinazione: 'Maldive',
        tipo_viaggio: 'leisure',
        stato: 'draft',
        numero_preventivo: 'PREV-001-2024'
      };

      const result = await testActions.complexPreventivoWorkflow(clienteData, preventivoData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.cliente).toBeDefined();
      expect(result.data.preventivo).toBeDefined();
      expect(result.data.preventivo.id_cliente).toBe(result.data.cliente.id);
      expect(result.data.preventivo.brand).toBe('Premium Travel');
      expect(result.data.preventivo.adulti).toBe(2);
    });

    test('should create preventivo with existing cliente', async () => {
      // Create cliente first
      const clienteResult = await testActions.createCliente({
        nome: 'Luigi',
        cognome: 'Bianchi',
        email: 'luigi.preventivo@test.com'
      });

      const preventivoData = {
        id_cliente: clienteResult.data.id,
        brand: 'Budget Travel',
        adulti: 1,
        bambini: 1,
        destinazione: 'Sardegna',
        tipo_viaggio: 'family',
        stato: 'in trattativa',
        numero_preventivo: 'PREV-002-2024'
      };

      const result = await testActions.createPreventivo(preventivoData);

      expect(result.success).toBe(true);
      expect(result.data.id_cliente).toBe(clienteResult.data.id);
      expect(result.data.brand).toBe('Budget Travel');
    });

    test('should fail preventivo creation without cliente', async () => {
      const preventivoData = {
        brand: 'No Cliente Travel',
        adulti: 2,
        destinazione: 'Nowhere'
      };

      const result = await testActions.createPreventivo(preventivoData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.[0].message).toContain('cliente');
    });

    test('should get all preventivi with cliente info', async () => {
      // Create cliente and preventivo
      const clienteResult = await testActions.createCliente({
        nome: 'Test', cognome: 'Cliente', email: 'test.preventivi@test.com'
      });

      await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        brand: 'Test Travel',
        numero_preventivo: 'TEST-001'
      });

      const preventivi = await testActions.getAllPreventivi();

      expect(preventivi).toHaveLength(1);
      expect(preventivi[0].cliente).toBeDefined();
      expect(preventivi[0].cliente.email).toBe('test.preventivi@test.com');
    });

    test('should get preventivo with complete relations', async () => {
      // Setup complete preventivo with relations
      const clienteResult = await testActions.createCliente({
        nome: 'Complete', cognome: 'Test', email: 'complete@test.com'
      });

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        brand: 'Complete Travel',
        numero_preventivo: 'COMPLETE-001'
      });

      const preventivo = await testActions.getPreventivo(preventivoResult.data.id);

      expect(preventivo).toBeDefined();
      expect(preventivo.cliente).toBeDefined();
      expect(preventivo.cliente.email).toBe('complete@test.com');
      expect(preventivo.serviziATerra).toBeDefined();
      expect(preventivo.voli).toBeDefined();
      expect(preventivo.assicurazioni).toBeDefined();
    });

    test('should get preventivi by cliente', async () => {
      const clienteResult = await testActions.createCliente({
        nome: 'Multi', cognome: 'Preventivo', email: 'multi@test.com'
      });

      // Create multiple preventivi for same cliente
      await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: 'MULTI-001'
      });
      await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: 'MULTI-002'
      });

      const preventivi = await testActions.getPreventiviByCliente(clienteResult.data.id);

      expect(preventivi).toHaveLength(2);
      expect(preventivi[0].numero_preventivo).toBe('MULTI-002'); // most recent first
      expect(preventivi[1].numero_preventivo).toBe('MULTI-001');
    });

    test('should update preventivo successfully', async () => {
      const clienteResult = await testActions.createCliente({
        nome: 'Update', cognome: 'Test', email: 'update@test.com'
      });

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        brand: 'Original',
        stato: 'draft'
      });

      const updateResult = await testActions.updatePreventivo({
        id: preventivoResult.data.id,
        brand: 'Updated',
        stato: 'confermato',
        adulti: 3
      });

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.brand).toBe('Updated');
      expect(updateResult.data.stato).toBe('confermato');
      expect(updateResult.data.adulti).toBe(3);
    });

    test('should delete preventivo with cascade', async () => {
      const clienteResult = await testActions.createCliente({
        nome: 'Delete', cognome: 'Test', email: 'delete@test.com'
      });

      const preventivoResult = await testActions.createPreventivo({
        id_cliente: clienteResult.data.id,
        numero_preventivo: 'DELETE-001'
      });

      const deleteResult = await testActions.deletePreventivo(preventivoResult.data.id);

      expect(deleteResult.success).toBe(true);

      const preventivo = await testActions.getPreventivo(preventivoResult.data.id);
      expect(preventivo).toBeNull();
    });
  });

  // ============================================================================
  // VALIDATION TESTS
  // ============================================================================

  describe('Validation Tests', () => {
    test('should handle zod validation errors correctly', async () => {
      const invalidCliente = {
        nome: 'a'.repeat(300), // Too long
        email: 'not-an-email',
        tel: 'x'.repeat(25) // Too long
      };

      const result = await testActions.createCliente(invalidCliente);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toHaveLength(3); // nome, email, tel errors
    });

    test('should handle database constraint violations', async () => {
      // Create first cliente
      await testActions.createCliente({
        nome: 'Unique', cognome: 'Test', email: 'unique@test.com'
      });

      // Try to create duplicate
      const result = await testActions.createCliente({
        nome: 'Another', cognome: 'Test', email: 'unique@test.com'
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('già esistente');
    });

    test('should handle missing required fields', async () => {
      const incompleteData = {
        nome: 'Test'
        // Missing email (required)
      };

      const result = await testActions.createCliente(incompleteData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });
  });

  // ============================================================================
  // EDGE CASES
  // ============================================================================

  describe('Edge Cases', () => {
    test('should handle empty strings correctly', async () => {
      const clienteData = {
        nome: '',
        cognome: '',
        email: 'empty@test.com'
      };

      const result = await testActions.createCliente(clienteData);
      
      expect(result.success).toBe(true);
      expect(result.data.nome).toBe('');
      expect(result.data.cognome).toBe('');
    });

    test('should handle null values correctly', async () => {
      const clienteData = {
        nome: null,
        cognome: null,
        email: 'null@test.com',
        tel: null,
        note: null
      };

      const result = await testActions.createCliente(clienteData);
      
      expect(result.success).toBe(true);
      expect(result.data.nome).toBeNull();
      expect(result.data.tel).toBeNull();
    });

    test('should handle special characters in data', async () => {
      const clienteData = {
        nome: "Mario D'Angelo",
        cognome: 'Rossi-Bianchi',
        email: 'mario.special@test.com',
        note: 'Note with special chars: àèéìòù €£$'
      };

      const result = await testActions.createCliente(clienteData);
      
      expect(result.success).toBe(true);
      expect(result.data.nome).toBe("Mario D'Angelo");
      expect(result.data.cognome).toBe('Rossi-Bianchi');
      expect(result.data.note).toBe('Note with special chars: àèéìòù €£$');
    });

    test('should handle very long text fields', async () => {
      const longNote = 'x'.repeat(1000);
      
      const clienteData = {
        nome: 'Long Note',
        cognome: 'Test',
        email: 'longnote@test.com',
        note: longNote
      };

      const result = await testActions.createCliente(clienteData);
      
      expect(result.success).toBe(true);
      expect(result.data.note).toBe(longNote);
    });

    test('should handle date edge cases', async () => {
      const futureDate = new Date('2050-12-31');
      const pastDate = new Date('1900-01-01');
      
      const clienteData = {
        nome: 'Date Test',
        cognome: 'Test',
        email: 'datetest@test.com',
        data_di_nascita: pastDate,
        data_scadenza_passaporto: futureDate
      };

      const result = await testActions.createCliente(clienteData);
      
      expect(result.success).toBe(true);
      expect(new Date(result.data.data_di_nascita)).toEqual(pastDate);
      expect(new Date(result.data.data_scadenza_passaporto)).toEqual(futureDate);
    });
  });
}); 