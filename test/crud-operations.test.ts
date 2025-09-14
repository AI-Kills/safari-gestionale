import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { testDb } from './test-db-setup';
import { TestActions } from '../app/lib/actions/actions.test';

describe('CRUD Operations with Test Database', () => {
  let testActions: TestActions;

  beforeAll(async () => {
    // Setup una sola volta per suite
    const client = await testDb.initialize();
    testActions = new TestActions(client);
  });

  beforeEach(async () => {
    // Cleanup automatico gestito da setup.ts
    // Opzionale: seeding specifico per suite
    await testDb.seedTestData();
  });

  describe('User CRUD Operations', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'newuser@example.com',
        password: 'password123'
      };

      const result = await testActions.createUser(userData);

      expect(result.success).toBe(true);
      expect(result.errors).toBeUndefined();
      expect(result.data.email).toBe('newuser@example.com');

      const users = await testActions.getAllUsers();
      expect(users.length).toBeGreaterThan(0);
      expect(users.some(u => u.email === 'newuser@example.com')).toBe(true);
    });

    it('should validate user creation data', async () => {
      const invalidData = {
        name: 'Test User',
        email: 'invalid-email', // Invalid email
        password: '123' // Too short
      };

      const result = await testActions.createUser(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should update an existing user', async () => {
      // Prima crea un user
      const userData = {
        name: 'Original Name',
        email: 'update@example.com',
        password: 'password123'
      };
      const createResult = await testActions.createUser(userData);
      
      // Poi aggiornalo
      const updateData = {
        id: createResult.data.id,
        name: 'Updated Name',
        email: 'update@example.com'
      };
      const updateResult = await testActions.updateUser(updateData);

      expect(updateResult.success).toBe(true);
      expect(updateResult.data.name).toBe('Updated Name');
    });

    it('should delete a user', async () => {
      // Prima crea un user
      const userData = {
        name: 'To Delete',
        email: 'delete@example.com',
        password: 'password123'
      };
      const createResult = await testActions.createUser(userData);
      
      // Poi eliminalo
      const deleteResult = await testActions.deleteUser(createResult.data.id);
      expect(deleteResult.success).toBe(true);

      // Verifica che sia stato eliminato
      const users = await testActions.getAllUsers();
      expect(users.some(u => u.id === createResult.data.id)).toBe(false);
    });
  });

  describe('Cliente CRUD Operations', () => {
    it('should create a new cliente', async () => {
      const clienteData = {
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mario.rossi@example.com',
        tel: '+39123456789',
        cf: 'RSSMRA80A01H501X'
      };

      const result = await testActions.createCliente(clienteData);

      expect(result.success).toBe(true);
      expect(result.data.nome).toBe('Mario');
      expect(result.data.cognome).toBe('Rossi');

      const clienti = await testActions.getAllClienti();
      expect(clienti.some(c => c.email === 'mario.rossi@example.com')).toBe(true);
    });

    it('should validate cliente email uniqueness', async () => {
      const clienteData = {
        nome: 'Test',
        cognome: 'Cliente',
        email: 'test@example.com', // Email già usata nel seeding
        tel: '+39123456789'
      };

      // Dovrebbe fallire perché email già esiste
      await expect(testActions.createCliente(clienteData)).rejects.toThrow();
    });
  });

  describe('Preventivo CRUD Operations', () => {
    it('should create a preventivo linked to cliente', async () => {
      // Ottieni un cliente dal seeding
      const clienti = await testActions.getAllClienti();
      const cliente = clienti[0];

      const preventivoData = {
        id_cliente: cliente.id,
        destinazione: 'Roma',
        adulti: 2,
        bambini: 0,
        data_partenza: new Date('2024-06-15'),
        stato: 'bozza',
        numero_preventivo: 'PREV-2024-001'
      };

      const result = await testActions.createPreventivo(preventivoData);

      expect(result.success).toBe(true);
      expect(result.data.destinazione).toBe('Roma');
      expect(result.data.id_cliente).toBe(cliente.id);

      const preventivi = await testActions.getAllPreventivi();
      expect(preventivi.some(p => p.numero_preventivo === 'PREV-2024-001')).toBe(true);
    });
  });

  describe('Business Logic Tests', () => {
    it('should create preventivo with complete details', async () => {
      const complexData = {
        cliente: {
          nome: 'Giulia',
          cognome: 'Bianchi',
          email: 'giulia.bianchi@example.com',
          tel: '+39987654321'
        },
        preventivo: {
          destinazione: 'Parigi',
          adulti: 2,
          bambini: 1,
          data_partenza: new Date('2024-07-20'),
          stato: 'confermato',
          numero_preventivo: 'PREV-2024-002'
        },
        servizi: [
          {
            descrizione: 'Hotel 4 stelle centro città',
            numero_notti: 3,
            totale: 450.00,
            valuta: 'EUR'
          }
        ],
        voli: [
          {
            compagnia_aerea: 'Alitalia',
            descrizione: 'Roma-Parigi andata/ritorno',
            totale: 280.00,
            valuta: 'EUR'
          }
        ]
      };

      const result = await testActions.createPreventivoWithDetails(complexData);

      expect(result.success).toBe(true);
      expect(result.data.preventivo.destinazione).toBe('Parigi');
      expect(result.data.cliente.email).toBe('giulia.bianchi@example.com');

      // Verifica che i dettagli siano stati creati
      const preventivoCompleto = await testActions.getPreventivoCompleto(
        result.data.preventivo.id
      );

      expect(preventivoCompleto).toBeDefined();
      expect(preventivoCompleto!.serviziATerra.length).toBe(1);
      expect(preventivoCompleto!.voli.length).toBe(1);
      expect(preventivoCompleto!.cliente.email).toBe('giulia.bianchi@example.com');
    });

    it('should handle transaction rollback on error', async () => {
      const invalidData = {
        cliente: {
          nome: 'Test',
          cognome: 'Error',
          email: 'test-error@example.com',
          tel: '+39123456789'
        },
        preventivo: {
          id_cliente: 'invalid-id', // Questo causerà un errore
          destinazione: 'Test',
          adulti: 1
        }
      };

      await expect(
        testActions.createPreventivoWithDetails(invalidData)
      ).rejects.toThrow();

      // Verifica che il rollback abbia funzionato
      const clienti = await testActions.getAllClienti();
      expect(clienti.some(c => c.email === 'test-error@example.com')).toBe(false);
    });
  });

  describe('Destinazione, Fornitore, Banca Operations', () => {
    it('should create and manage destinazioni', async () => {
      const destinazioneData = { nome: 'Milano' };
      const result = await testActions.createDestinazione(destinazioneData);
      
      expect(result.success).toBe(true);
      expect(result.data.nome).toBe('Milano');

      const destinazioni = await testActions.getAllDestinazioni();
      expect(destinazioni.some(d => d.nome === 'Milano')).toBe(true);
    });

    it('should create and manage fornitori', async () => {
      const fornitoreData = { 
        nome: 'Hotel Partner SRL',
        valuta: 'EUR'
      };
      const result = await testActions.createFornitore(fornitoreData);
      
      expect(result.success).toBe(true);
      expect(result.data.nome).toBe('Hotel Partner SRL');

      const fornitori = await testActions.getAllFornitori();
      expect(fornitori.some(f => f.nome === 'Hotel Partner SRL')).toBe(true);
    });

    it('should create and manage banche', async () => {
      const bancaData = { nome: 'Banca Esempio' };
      const result = await testActions.createBanca(bancaData);
      
      expect(result.success).toBe(true);
      expect(result.data.nome).toBe('Banca Esempio');

      const banche = await testActions.getAllBanche();
      expect(banche.some(b => b.nome === 'Banca Esempio')).toBe(true);
    });
  });

  describe('Data Integrity Tests', () => {
    it('should maintain referential integrity', async () => {
      // Crea cliente e preventivo
      const clienteData = {
        nome: 'Test',
        cognome: 'Integrity',
        email: 'integrity@example.com',
        tel: '+39123456789'
      };
      const clienteResult = await testActions.createCliente(clienteData);

      const preventivoData = {
        id_cliente: clienteResult.data.id,
        destinazione: 'Test Destination',
        adulti: 1,
        numero_preventivo: 'INTEGRITY-001'
      };
      const preventivoResult = await testActions.createPreventivo(preventivoData);

      // Tentativo di eliminare cliente con preventivo collegato dovrebbe fallire
      await expect(
        testActions.deleteCliente(clienteResult.data.id)
      ).rejects.toThrow();

      // Elimina prima il preventivo
      await testActions.deletePreventivo(preventivoResult.data.id);
      
      // Ora dovrebbe funzionare
      const deleteResult = await testActions.deleteCliente(clienteResult.data.id);
      expect(deleteResult.success).toBe(true);
    });
  });
});
