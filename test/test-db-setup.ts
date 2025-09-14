import { PrismaClient } from '../generated/prisma-test';
import { execSync } from 'child_process';
import { join } from 'path';
import fs from 'fs';

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

  private createTestSchema() {
    const testSchemaPath = join(process.cwd(), 'prisma', 'schema.test.prisma');
    const originalSchemaPath = join(process.cwd(), 'prisma', 'schema.prisma');
    
    try {
      // Leggi lo schema originale
      const originalSchema = fs.readFileSync(originalSchemaPath, 'utf8');
      
      // Sostituisci PostgreSQL con SQLite e rimuovi funzioni specifiche di PostgreSQL
      const testSchema = originalSchema
        // Cambia generator per output separato
        .replace(/generator client \{[\s\S]*?\}/, `generator testClient {
  provider = "prisma-client-js"
  output   = "../generated/prisma-test"
}`)
        // Cambia provider
        .replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"')
        // Cambia URL
        .replace(/url\s*=\s*env\("DATABASE_URL"\)/, 'url = "file:./test.sqlite"')
        // Rimuovi dbgenerated per UUID (SQLite non supporta uuid_generate_v4)
        .replace(/@default\(dbgenerated\("uuid_generate_v4\(\)"\)\)/g, '@default(uuid())')
        // Rimuovi @db.Uuid
        .replace(/@db\.Uuid/g, '')
        // Rimuovi altri tipi specifici di PostgreSQL
        .replace(/@db\.VarChar\(\d+\)/g, '')
        .replace(/@db\.Date/g, '')
        .replace(/@db\.Timestamp\(\d+\)/g, '')
        .replace(/@db\.Decimal\(\d+,\s*\d+\)/g, '');

      // Scrivi lo schema di test
      fs.writeFileSync(testSchemaPath, testSchema);
      console.log('✅ Test schema created');
    } catch (error) {
      console.error('Error creating test schema:', error);
      throw error;
    }
  }

  private async syncSchema() {
    try {
      // Sincronizza schema con database SQLite
      execSync('pnpm prisma db push --schema=prisma/schema.test.prisma --force-reset --accept-data-loss', {
        stdio: 'pipe' // Riduce output rumoroso
      });
      console.log('✅ Schema sincronizzato con database SQLite');
    } catch (error) {
      console.error('Errore sincronizzazione schema:', error);
      throw error;
    }
  }

  async initialize() {
    if (this.initialized) {
      return this.client;
    }

    try {
      // 1. Crea schema test
      this.createTestSchema();

      // 2. Genera client test se necessario
      execSync('pnpm prisma generate --schema=prisma/schema.test.prisma', {
        stdio: 'pipe'
      });

      // 3. Inizializza database SQLite
      await this.syncSchema();
      
      this.initialized = true;
      return this.client;
    } catch (error) {
      console.error('Errore inizializzazione database test:', error);
      throw error;
    }
  }

  getClient(): PrismaClient {
    if (!this.initialized) {
      throw new Error('Database non inizializzato. Chiama initialize() prima.');
    }
    return this.client;
  }

  // Pulisce SOLO i dati, mantiene schema
  async cleanup() {
    try {
      await this.client.$transaction(async (tx) => {
        // Elimina in ordine per rispettare foreign key
        await tx.preventivoAlClienteRow.deleteMany();
        await tx.preventivoAlCliente.deleteMany();
        await tx.pagamenti_assicurazioni.deleteMany();
        await tx.pagamenti_voli.deleteMany();
        await tx.pagamenti_servizi_a_terra.deleteMany();
        await tx.incassi_partecipanti.deleteMany();
        await tx.assicurazione.deleteMany();
        await tx.volo.deleteMany();
        await tx.serviziATerra.deleteMany();
        await tx.partecipanti.deleteMany();
        await tx.pratiche.deleteMany();
        await tx.preventivo.deleteMany();
        await tx.cliente.deleteMany();
        await tx.fornitore.deleteMany();
        await tx.destinazione.deleteMany();
        await tx.banca.deleteMany();
        await tx.user.deleteMany();
      });
      console.log('✅ Database pulito (solo dati)');
    } catch (error) {
      // Fallback: reset completo se cleanup fallisce
      console.warn('Cleanup fallito, eseguo reset completo:', error);
      await this.reset();
    }
  }

  // Reset completo: schema + dati
  async reset() {
    try {
      execSync('pnpm prisma db push --schema=prisma/schema.test.prisma --force-reset --accept-data-loss', {
        stdio: 'pipe'
      });
      console.log('✅ Database resettato completamente');
    } catch (error) {
      console.error('Errore reset database:', error);
      throw error;
    }
  }

  // Seeding dati test
  async seedTestData() {
    // Usa upsert per evitare violazioni unique constraint
    const testDestinazione = await this.client.destinazione.upsert({
      where: { nome: 'Test Destinazione' },
      update: {},
      create: {
        nome: 'Test Destinazione'
      }
    });

    const testFornitore = await this.client.fornitore.upsert({
      where: { nome: 'Test Fornitore' },
      update: {},
      create: {
        nome: 'Test Fornitore',
        valuta: 'EUR'
      }
    });

    const testBanca = await this.client.banca.upsert({
      where: { nome: 'Test Banca' },
      update: {},
      create: {
        nome: 'Test Banca'
      }
    });

    const testCliente = await this.client.cliente.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        nome: 'Test',
        cognome: 'Cliente',
        email: 'test@example.com',
        tel: '+39123456789'
      }
    });

    const testUser = await this.client.user.upsert({
      where: { email: 'testuser@example.com' },
      update: {},
      create: {
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
  }

  async close() {
    await this.client.$disconnect();
    this.initialized = false;
  }
}

export const testDb = TestDatabaseManager.getInstance(); 