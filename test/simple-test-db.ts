import { PrismaClient } from '@prisma/client';

let testClient: PrismaClient;

export async function setupTestDatabase() {
  // Set environment variable for SQLite database
  const testDbPath = `file:./test-${Date.now()}.db`;
  process.env.DATABASE_URL = testDbPath;
  
  testClient = new PrismaClient();
  
  try {
    await testClient.$connect();
    console.log('Test database connected successfully');
    return testClient;
  } catch (error) {
    console.error('Failed to connect to test database:', error);
    throw error;
  }
}

export async function cleanupTestDatabase() {
  if (testClient) {
    try {
      // Clean all tables in dependency order
      await testClient.preventivoAlClienteRow.deleteMany();
      await testClient.preventivoAlCliente.deleteMany();
      await testClient.pagamenti_assicurazioni.deleteMany();
      await testClient.pagamenti_voli.deleteMany();
      await testClient.pagamenti_servizi_a_terra.deleteMany();
      await testClient.incassi_partecipanti.deleteMany();
      await testClient.assicurazione.deleteMany();
      await testClient.volo.deleteMany();
      await testClient.serviziATerra.deleteMany();
      await testClient.partecipanti.deleteMany();
      await testClient.pratiche.deleteMany();
      await testClient.preventivo.deleteMany();
      await testClient.cliente.deleteMany();
      await testClient.fornitore.deleteMany();
      await testClient.destinazione.deleteMany();
      await testClient.banca.deleteMany();
      await testClient.user.deleteMany();
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }
}

export async function disconnectTestDatabase() {
  if (testClient) {
    await testClient.$disconnect();
  }
}

export function getTestClient() {
  return testClient;
}

export async function seedTestData() {
  if (!testClient) throw new Error('Test client not initialized');

  try {
    // Create test destinazione
    const testDestinazione = await testClient.destinazione.upsert({
      where: { nome: 'Test Destinazione' },
      update: {},
      create: {
        nome: 'Test Destinazione'
      }
    });

    // Create test fornitore
    const testFornitore = await testClient.fornitore.upsert({
      where: { nome: 'Test Fornitore' },
      update: {},
      create: {
        nome: 'Test Fornitore',
        valuta: 'EUR'
      }
    });

    // Create test banca
    const testBanca = await testClient.banca.upsert({
      where: { nome: 'Test Banca' },
      update: {},
      create: {
        nome: 'Test Banca'
      }
    });

    // Create test cliente
    const testCliente = await testClient.cliente.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        nome: 'Test',
        cognome: 'Cliente',
        email: 'test@example.com',
        tel: '+39123456789'
      }
    });

    // Create test user
    const testUser = await testClient.user.upsert({
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
  } catch (error) {
    console.error('Error seeding test data:', error);
    throw error;
  }
}
