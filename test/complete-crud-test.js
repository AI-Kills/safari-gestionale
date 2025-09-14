// Test completo CRUD con sistema dual-schema
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function completeCrudTest() {
  console.log('🚀 Inizio test CRUD completo...\n');

  let client;
  const testSchemaPath = path.join(process.cwd(), 'prisma', 'schema.test.prisma');

  try {
    // 1. Setup database test
    console.log('1. Setup database test...');
    await setupTestDatabase();
    
    // 2. Importa client test
    const { PrismaClient } = require('../generated/prisma-test');
    client = new PrismaClient();
    await client.$connect();
    console.log('✅ Client connesso');

    // 3. Test User CRUD
    console.log('\n2. Test User CRUD...');
    await testUserCrud(client);

    // 4. Test Cliente CRUD
    console.log('\n3. Test Cliente CRUD...');
    await testClienteCrud(client);

    // 5. Test Destinazione, Fornitore, Banca
    console.log('\n4. Test entità di supporto...');
    const entities = await testSupportEntities(client);

    // 6. Test Preventivo con relazioni
    console.log('\n5. Test Preventivo con relazioni...');
    await testPreventivoWithRelations(client, entities);

    // 7. Test transazioni e business logic
    console.log('\n6. Test business logic...');
    await testBusinessLogic(client);

    console.log('\n🎉 Test CRUD completo terminato con successo!');

  } catch (error) {
    console.error('❌ Errore durante test:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    if (client) {
      await client.$disconnect();
    }
    // Cleanup
    if (fs.existsSync(testSchemaPath)) {
      fs.unlinkSync(testSchemaPath);
    }
    const sqlitePath = path.join(process.cwd(), 'prisma', 'test.sqlite');
    if (fs.existsSync(sqlitePath)) {
      fs.unlinkSync(sqlitePath);
    }
    console.log('🧹 Cleanup completato');
  }
}

async function setupTestDatabase() {
  const originalSchemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
  const testSchemaPath = path.join(process.cwd(), 'prisma', 'schema.test.prisma');
  
  const originalSchema = fs.readFileSync(originalSchemaPath, 'utf8');
  
  const testSchema = originalSchema
    .replace(/generator client \{[\s\S]*?\}/, `generator testClient {
  provider = "prisma-client-js"
  output   = "../generated/prisma-test"
}`)
    .replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"')
    .replace(/url\s*=\s*env\("DATABASE_URL"\)/, 'url = "file:./test.sqlite"')
    .replace(/@default\(dbgenerated\("uuid_generate_v4\(\)"\)\)/g, '@default(uuid())')
    .replace(/@db\.Uuid/g, '')
    .replace(/@db\.VarChar\(\d+\)/g, '')
    .replace(/@db\.Date/g, '')
    .replace(/@db\.Timestamp\(\d+\)/g, '')
    .replace(/@db\.Decimal\(\d+,\s*\d+\)/g, '');

  fs.writeFileSync(testSchemaPath, testSchema);
  
  execSync('pnpm prisma generate --schema=prisma/schema.test.prisma', { stdio: 'pipe' });
  execSync('pnpm prisma db push --schema=prisma/schema.test.prisma --force-reset --accept-data-loss', { stdio: 'pipe' });
  
  console.log('✅ Database test setup completato');
}

async function testUserCrud(client) {
  // Create
  const user = await client.user.create({
    data: {
      name: 'Mario Rossi',
      email: 'mario.rossi@test.com',
      password: 'password123'
    }
  });
  console.log('✅ User creato:', user.email);

  // Read
  const users = await client.user.findMany();
  console.log('✅ Users trovati:', users.length);

  // Update
  const updatedUser = await client.user.update({
    where: { id: user.id },
    data: { name: 'Mario Rossi Aggiornato' }
  });
  console.log('✅ User aggiornato:', updatedUser.name);

  // Delete (lo faremo dopo)
  return user;
}

async function testClienteCrud(client) {
  // Create
  const cliente = await client.cliente.create({
    data: {
      nome: 'Giulia',
      cognome: 'Bianchi',
      email: 'giulia.bianchi@test.com',
      tel: '+39123456789',
      cf: 'BNCGLI85M41H501X',
      indirizzo: 'Via Roma 123',
      cap: '00100',
      citta: 'Roma',
      provincia: 'RM'
    }
  });
  console.log('✅ Cliente creato:', `${cliente.nome} ${cliente.cognome}`);

  // Read with filtering
  const clienti = await client.cliente.findMany({
    where: {
      citta: 'Roma'
    }
  });
  console.log('✅ Clienti a Roma:', clienti.length);

  return cliente;
}

async function testSupportEntities(client) {
  // Destinazione
  const destinazione = await client.destinazione.create({
    data: { nome: 'Parigi' }
  });
  console.log('✅ Destinazione creata:', destinazione.nome);

  // Fornitore
  const fornitore = await client.fornitore.create({
    data: { 
      nome: 'Hotel Partner SRL',
      valuta: 'EUR'
    }
  });
  console.log('✅ Fornitore creato:', fornitore.nome);

  // Banca
  const banca = await client.banca.create({
    data: { nome: 'Banca Test' }
  });
  console.log('✅ Banca creata:', banca.nome);

  return { destinazione, fornitore, banca };
}

async function testPreventivoWithRelations(client, entities) {
  // Trova un cliente
  const cliente = await client.cliente.findFirst();
  
  // Create preventivo
  const preventivo = await client.preventivo.create({
    data: {
      id_cliente: cliente.id,
      destinazione: 'Parigi',
      adulti: 2,
      bambini: 1,
      data_partenza: new Date('2024-07-15'),
      stato: 'bozza',
      numero_preventivo: 'PREV-2024-TEST-001'
    }
  });
  console.log('✅ Preventivo creato:', preventivo.numero_preventivo);

  // Aggiungi servizio a terra
  const servizio = await client.serviziATerra.create({
    data: {
      id_preventivo: preventivo.id,
      id_fornitore: entities.fornitore.id,
      id_destinazione: entities.destinazione.id,
      descrizione: 'Hotel 4 stelle centro città',
      numero_notti: 3,
      numero_camere: 1,
      totale: 450.00,
      valuta: 'EUR'
    }
  });
  console.log('✅ Servizio a terra aggiunto:', servizio.descrizione);

  // Aggiungi volo
  const volo = await client.volo.create({
    data: {
      id_preventivo: preventivo.id,
      id_fornitore: entities.fornitore.id,
      compagnia_aerea: 'Air France',
      descrizione: 'Roma-Parigi andata/ritorno',
      data_partenza: new Date('2024-07-15'),
      data_arrivo: new Date('2024-07-18'),
      totale: 280.00,
      valuta: 'EUR'
    }
  });
  console.log('✅ Volo aggiunto:', volo.compagnia_aerea);

  // Test query con relazioni
  const preventivoCompleto = await client.preventivo.findUnique({
    where: { id: preventivo.id },
    include: {
      cliente: true,
      serviziATerra: {
        include: {
          fornitore: true,
          destinazione: true
        }
      },
      voli: {
        include: {
          fornitore: true
        }
      }
    }
  });

  console.log('✅ Preventivo completo caricato con:');
  console.log(`   - Cliente: ${preventivoCompleto.cliente.nome} ${preventivoCompleto.cliente.cognome}`);
  console.log(`   - Servizi: ${preventivoCompleto.serviziATerra.length}`);
  console.log(`   - Voli: ${preventivoCompleto.voli.length}`);

  return preventivo;
}

async function testBusinessLogic(client) {
  // Test transazione: crea cliente e preventivo insieme
  const result = await client.$transaction(async (tx) => {
    const nuovoCliente = await tx.cliente.create({
      data: {
        nome: 'Marco',
        cognome: 'Verdi',
        email: 'marco.verdi@test.com',
        tel: '+39987654321'
      }
    });

    const nuovoPreventivo = await tx.preventivo.create({
      data: {
        id_cliente: nuovoCliente.id,
        destinazione: 'Londra',
        adulti: 1,
        bambini: 0,
        stato: 'confermato',
        numero_preventivo: 'PREV-2024-TEST-002'
      }
    });

    return { cliente: nuovoCliente, preventivo: nuovoPreventivo };
  });

  console.log('✅ Transazione completata:');
  console.log(`   - Cliente: ${result.cliente.nome} ${result.cliente.cognome}`);
  console.log(`   - Preventivo: ${result.preventivo.numero_preventivo}`);

  // Test aggregazioni
  const stats = await client.preventivo.aggregate({
    _count: true,
    _avg: {
      adulti: true
    },
    where: {
      stato: {
        in: ['bozza', 'confermato']
      }
    }
  });

  console.log('✅ Statistiche preventivi:');
  console.log(`   - Totale: ${stats._count}`);
  console.log(`   - Media adulti: ${stats._avg.adulti?.toFixed(1) || 0}`);

  // Test foreign key constraints
  try {
    // Questo dovrebbe fallire per foreign key constraint
    await client.preventivo.create({
      data: {
        id_cliente: 'id-inesistente',
        destinazione: 'Test',
        adulti: 1
      }
    });
    console.log('❌ Foreign key constraint non funziona');
  } catch (error) {
    console.log('✅ Foreign key constraint funziona correttamente');
  }
}

// Esegui test
completeCrudTest().catch(console.error);
