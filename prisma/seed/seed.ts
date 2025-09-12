import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'node:fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function loadJSON<T>(filename: string): Promise<T> {
  const filePath = path.join(__dirname, '../../app/seed/', filename);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data) as T;
}

interface DestinazioniData {
  destinazioni: string[];
}

interface FornitoriData {
  fornitori: string[];
}

interface BancheData {
  banche: string[];
}

interface ClientiData {
  clienti: Array<{
    nome?: string;
    cognome?: string;
    tel?: string;
    email: string;
    tipo?: string;
    provenienza?: string;
    collegato?: string;
    citta?: string;
    note?: string;
    data_di_nascita?: string;
    indirizzo?: string;
    CAP?: string;
    CF?: string;
    luogo_nascita?: string;
    provincia_nascita?: string;
    numero_passaporto?: string;
    data_scadenza_passaporto?: string;
    nazionalita?: string;
    provincia?: string;
    sesso?: string;
  }>;
}

async function main() {
  console.log('🌱 Iniziando il seeding con Prisma...\n');

  try {
    // 1. Seed Users
    console.log('👥 Caricamento utenti...');
    const hashedPassword = await bcrypt.hash('2NkS$ncXs', 10);
    
    for (let i = 0; i < 10; i++) {
      await prisma.user.upsert({
        where: { email: `${i}@impronte.safari` },
        update: {},
        create: {
          name: `User ${i}`,
          email: `${i}@impronte.safari`,
          password: hashedPassword
        }
      });
    }
    console.log('✅ Utenti caricati');

    // 2. Seed Destinazioni
    console.log('🏝️ Caricamento destinazioni...');
    try {
      const destinazioniData = await loadJSON<DestinazioniData>('destinazioni.json');
      
      for (const nome of destinazioniData.destinazioni) {
        await prisma.destinazione.upsert({
          where: { nome },
          update: {},
          create: { nome }
        });
      }
      console.log(`✅ ${destinazioniData.destinazioni.length} destinazioni caricate`);
    } catch (error) {
      console.log('⚠️ File destinazioni.json non trovato, skip...');
    }

    // 3. Seed Fornitori
    console.log('🏢 Caricamento fornitori...');
    try {
      const fornitoriData = await loadJSON<FornitoriData>('fornitori.json');
      
      for (const nome of fornitoriData.fornitori) {
        await prisma.fornitore.upsert({
          where: { nome },
          update: {},
          create: { nome }
        });
      }
      console.log(`✅ ${fornitoriData.fornitori.length} fornitori caricati`);
    } catch (error) {
      console.log('⚠️ File fornitori.json non trovato, skip...');
    }

    // 4. Seed Banche
    console.log('🏦 Caricamento banche...');
    try {
      const bancheData = await loadJSON<BancheData>('banche.json');
      
      for (const nome of bancheData.banche) {
        await prisma.banca.upsert({
          where: { nome },
          update: {},
          create: { nome }
        });
      }
      console.log(`✅ ${bancheData.banche.length} banche caricate`);
    } catch (error) {
      console.log('⚠️ File banche.json non trovato, skip...');
    }

    // 5. Seed Clienti
    console.log('👤 Caricamento clienti...');
    try {
      const clientiData = await loadJSON<ClientiData>('clienti.json');
      
      for (const cliente of clientiData.clienti) {
        await prisma.cliente.upsert({
          where: { email: cliente.email },
          update: {},
          create: {
            nome: cliente.nome || null,
            cognome: cliente.cognome || null,
            tel: cliente.tel || null,
            indirizzo: cliente.indirizzo || null,
            cap: cliente.CAP || null,
            citta: cliente.citta || null,
            cf: cliente.CF || null,
            email: cliente.email,
            tipo: cliente.tipo || null,
            provenienza: cliente.provenienza || null,
            collegato: cliente.collegato || null,
            note: cliente.note || null,
            data_di_nascita: cliente.data_di_nascita ? new Date(cliente.data_di_nascita) : null,
            luogo_nascita: cliente.luogo_nascita || null,
            provincia_nascita: cliente.provincia_nascita || null,
            numero_passaporto: cliente.numero_passaporto || null,
            data_scadenza_passaporto: cliente.data_scadenza_passaporto ? new Date(cliente.data_scadenza_passaporto) : null,
            nazionalita: cliente.nazionalita || null,
            provincia: cliente.provincia || null,
            sesso: cliente.sesso || null
          }
        });
      }
      console.log(`✅ ${clientiData.clienti.length} clienti caricati`);
    } catch (error) {
      console.log('⚠️ File clienti.json non trovato, skip...');
    }

    // 6. Create sample preventivi (optional) - Skip for now due to constraints
    console.log('📋 Preventivi di esempio saltati (constraints del database)');
    console.log('✅ Preventivi skip');

    console.log('\n🎉 Seed completato con successo!');
  } catch (error) {
    console.error('❌ Errore durante il seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Errore fatale durante il seeding:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect()); 