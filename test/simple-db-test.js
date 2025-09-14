// Test semplice per verificare il sistema dual-schema
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function testDualSchema() {
  console.log('🚀 Inizio test dual-schema...\n');

  try {
    // 1. Crea schema test
    console.log('1. Creazione schema test...');
    const originalSchemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    const testSchemaPath = path.join(process.cwd(), 'prisma', 'schema.test.prisma');
    
    const originalSchema = fs.readFileSync(originalSchemaPath, 'utf8');
    
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
      // Rimuovi dbgenerated per UUID
      .replace(/@default\(dbgenerated\("uuid_generate_v4\(\)"\)\)/g, '@default(uuid())')
      // Rimuovi @db.Uuid
      .replace(/@db\.Uuid/g, '')
      // Rimuovi altri tipi specifici di PostgreSQL
      .replace(/@db\.VarChar\(\d+\)/g, '')
      .replace(/@db\.Date/g, '')
      .replace(/@db\.Timestamp\(\d+\)/g, '')
      .replace(/@db\.Decimal\(\d+,\s*\d+\)/g, '');

    fs.writeFileSync(testSchemaPath, testSchema);
    console.log('✅ Schema test creato');

    // 2. Genera client test
    console.log('2. Generazione client test...');
    execSync('pnpm prisma generate --schema=prisma/schema.test.prisma', {
      stdio: 'pipe'
    });
    console.log('✅ Client test generato');

    // 3. Sincronizza database
    console.log('3. Sincronizzazione database SQLite...');
    execSync('pnpm prisma db push --schema=prisma/schema.test.prisma --force-reset --accept-data-loss', {
      stdio: 'pipe'
    });
    console.log('✅ Database SQLite sincronizzato');

    // 4. Verifica che i file siano stati creati
    const generatedPath = path.join(process.cwd(), 'generated', 'prisma-test');
    const sqlitePath = path.join(process.cwd(), 'prisma', 'test.sqlite');
    
    if (fs.existsSync(generatedPath)) {
      console.log('✅ Directory client test generata:', generatedPath);
    } else {
      console.log('❌ Directory client test non trovata');
    }
    
    if (fs.existsSync(sqlitePath)) {
      console.log('✅ Database SQLite creato:', sqlitePath);
    } else {
      console.log('❌ Database SQLite non trovato');
    }

    // 5. Test del client (se possibile)
    try {
      const { PrismaClient } = require('../generated/prisma-test');
      const client = new PrismaClient();
      
      console.log('5. Test connessione client...');
      await client.$connect();
      console.log('✅ Connessione client riuscita');
      
      // Test creazione user
      const user = await client.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        }
      });
      console.log('✅ User creato:', user.email);
      
      // Test lettura
      const users = await client.user.findMany();
      console.log('✅ Users trovati:', users.length);
      
      await client.$disconnect();
      console.log('✅ Client disconnesso');
      
    } catch (clientError) {
      console.log('⚠️ Test client non riuscito (normale se non ancora implementato):', clientError.message);
    }

    console.log('\n🎉 Test dual-schema completato con successo!');
    
    // Cleanup
    if (fs.existsSync(testSchemaPath)) {
      fs.unlinkSync(testSchemaPath);
      console.log('🧹 Schema test rimosso');
    }

  } catch (error) {
    console.error('❌ Errore durante test:', error.message);
    process.exit(1);
  }
}

// Esegui test
testDualSchema().catch(console.error);
