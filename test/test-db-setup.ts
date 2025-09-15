import { PrismaClient } from '../generated/prisma-test';
import { execSync } from 'child_process';
import fs from 'fs';

export class TestDatabaseManager {
  private static instance: TestDatabaseManager;
  private client: PrismaClient | null = null;
  private initialized = false;

  private constructor() {}

  static getInstance(): TestDatabaseManager {
    if (!TestDatabaseManager.instance) {
      TestDatabaseManager.instance = new TestDatabaseManager();
    }
    return TestDatabaseManager.instance;
  }

  async initialize() {
    if (this.initialized && this.client) {
      return this.client;
    }

    try {
      // 1. Genera client test
      console.log('🔄 Generando client Prisma test...');
      execSync('pnpm prisma generate --schema=prisma/schema.test.prisma', {
        stdio: 'pipe'
      });

      // 2. Inizializza database SQLite
      console.log('🔄 Sincronizzando schema...');
      execSync('pnpm prisma db push --schema=prisma/schema.test.prisma --force-reset --accept-data-loss', {
        stdio: 'pipe'
      });

      // 3. Crea client
      this.client = new PrismaClient();
      
      console.log('✅ Database test inizializzato');
      this.initialized = true;
      return this.client;
    } catch (error) {
      console.error('❌ Errore inizializzazione database test:', error);
      throw error;
    }
  }

  getClient(): PrismaClient {
    if (!this.initialized || !this.client) {
      throw new Error('Database non inizializzato. Chiama initialize() prima.');
    }
    return this.client;
  }

  // Pulisce SOLO i dati, mantiene schema
  async cleanup() {
    if (!this.client) return;

    try {
      // Elimina in ordine per rispettare foreign key (SQLite supporta CASCADE)
      await this.client.preventivoAlClienteRow.deleteMany();
      await this.client.preventivoAlCliente.deleteMany();
      await this.client.pagamenti_assicurazioni.deleteMany();
      await this.client.pagamenti_voli.deleteMany();
      await this.client.pagamenti_servizi_a_terra.deleteMany();
      await this.client.incassi_partecipanti.deleteMany();
      await this.client.assicurazione.deleteMany();
      await this.client.volo.deleteMany();
      await this.client.serviziATerra.deleteMany();
      await this.client.partecipanti.deleteMany();
      await this.client.pratiche.deleteMany();
      await this.client.preventivo.deleteMany();
      await this.client.cliente.deleteMany();
      await this.client.fornitore.deleteMany();
      await this.client.destinazione.deleteMany();
      await this.client.banca.deleteMany();
      await this.client.user.deleteMany();
      
      console.log('✅ Database pulito (solo dati)');
    } catch (error) {
      console.warn('⚠️ Cleanup fallito, resetto database:', error);
      // Reset completo se cleanup fallisce
      await this.reset();
    }
  }

  // Reset completo: schema + dati
  async reset() {
    try {
      if (this.client) {
        await this.client.$disconnect();
        this.client = null;
      }
      
      // Reset database
      execSync('pnpm prisma db push --schema=prisma/schema.test.prisma --force-reset --accept-data-loss', {
        stdio: 'pipe'
      });
      
      // Ricrea client
      this.client = new PrismaClient();
      console.log('✅ Database resettato completamente');
    } catch (error) {
      console.error('❌ Errore reset database:', error);
      throw error;
    }
  }

  // Seeding dati test
  async seedTestData() {
    if (!this.client) throw new Error('Client non inizializzato');

    try {
      const testDestinazione = await this.client.destinazione.create({
        data: { nome: 'Test Destinazione' }
      });

      const testFornitore = await this.client.fornitore.create({
        data: { 
          nome: 'Test Fornitore',
          valuta: 'EUR'
        }
      });

      const testBanca = await this.client.banca.create({
        data: { nome: 'Test Banca' }
      });

      const testCliente = await this.client.cliente.create({
        data: {
          nome: 'Test',
          cognome: 'Cliente',
          email: 'test@example.com',
          tel: '+39123456789'
        }
      });

      const testUser = await this.client.user.create({
        data: {
          name: 'Test User',
          email: 'testuser@example.com',
          password: 'hashedpassword123'
        }
      });

      return {
        destinazione: testDestinazione,
        fornitore: testFornitore,
        banca: testBanca,
        cliente: testCliente,
        user: testUser
      };
    } catch (error) {
      console.error('❌ Errore seeding:', error);
      throw error;
    }
  }

  async close() {
    if (this.client) {
      await this.client.$disconnect();
      this.client = null;
    }
    this.initialized = false;
    
    // Cleanup file
    try {
      if (fs.existsSync('prisma/test.sqlite')) {
        fs.unlinkSync('prisma/test.sqlite');
      }
    } catch (e) {
      // Ignora errori
    }
  }
}

export const testDb = TestDatabaseManager.getInstance(); 