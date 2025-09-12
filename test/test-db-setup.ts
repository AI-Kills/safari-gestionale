import { PrismaClient } from '../generated/prisma-test';
import { execSync } from 'child_process';

export class TestDatabaseManager {
  private static instance: TestDatabaseManager;
  private client: PrismaClient;
  private initialized = false;

  private constructor() {
    this.client = new PrismaClient();
  }

  static getInstance(): TestDatabaseManager {
    if (!TestDatabaseManager.instance) {
      TestDatabaseManager.instance = new TestDatabaseManager();
    }
    return TestDatabaseManager.instance;
  }

  private async syncSchema() {
    try {
      execSync('pnpm prisma db push --schema=prisma/schema.test.prisma --force-reset --accept-data-loss', {
        stdio: 'pipe'
      });
    } catch (error) {
      console.error('Error syncing test schema:', error);
      throw error;
    }
  }

  async initialize() {
    if (this.initialized) return this.client;

    try {
      // Generate test client
      execSync('pnpm prisma generate --schema=prisma/schema.test.prisma', {
        stdio: 'pipe'
      });

      // Initialize SQLite database
      await this.syncSchema();
      this.initialized = true;
      return this.client;
    } catch (error) {
      console.error('Error initializing test database:', error);
      throw error;
    }
  }

  getClient(): PrismaClient {
    if (!this.initialized) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.client;
  }

  async cleanup() {
    try {
      await this.client.$transaction(async (tx) => {
        // Delete in dependency order to respect foreign keys
        await tx.preventivoAlClienteRow.deleteMany();
        await tx.preventivoAlCliente.deleteMany();
        await tx.assicurazione.deleteMany();
        await tx.volo.deleteMany();
        await tx.serviziATerra.deleteMany();
        await tx.preventivo.deleteMany();
        await tx.cliente.deleteMany();
        await tx.fornitore.deleteMany();
        await tx.destinazione.deleteMany();
        await tx.banca.deleteMany();
        await tx.user.deleteMany();
      });
    } catch (error) {
      console.error('Error during cleanup:', error);
      throw error;
    }
  }

  async seedTestData() {
    try {
      // Create test destinazione
      const testDestinazione = await this.client.destinazione.upsert({
        where: { nome: 'Test Destinazione' },
        update: {},
        create: {
          nome: 'Test Destinazione'
        }
      });

      // Create test fornitore
      const testFornitore = await this.client.fornitore.upsert({
        where: { nome: 'Test Fornitore' },
        update: {},
        create: {
          nome: 'Test Fornitore',
          valuta: 'EUR'
        }
      });

      // Create test cliente
      const testCliente = await this.client.cliente.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
          nome: 'Test',
          cognome: 'Cliente',
          email: 'test@example.com',
          tel: '+39 123 456 7890',
          citta: 'Roma'
        }
      });

      // Create test user
      const testUser = await this.client.user.upsert({
        where: { email: 'testuser@example.com' },
        update: {},
        create: {
          email: 'testuser@example.com',
          password: 'hashedpassword'
        }
      });

      return { 
        testDestinazione, 
        testFornitore, 
        testCliente, 
        testUser 
      };
    } catch (error) {
      console.error('Error seeding test data:', error);
      throw error;
    }
  }

  async reset() {
    try {
      execSync('pnpm prisma db push --schema=prisma/schema.test.prisma --force-reset --accept-data-loss', {
        stdio: 'pipe'
      });
    } catch (error) {
      console.error('Error resetting test database:', error);
      throw error;
    }
  }

  async disconnect() {
    await this.client.$disconnect();
  }
}

export const testDb = TestDatabaseManager.getInstance(); 