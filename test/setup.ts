import { testDb } from './test-db-setup';
import fs from 'fs';
import '@testing-library/jest-dom';

// Setup globale per tutti i test
beforeAll(async () => {
  // Inizializza database con schema e tabelle
  await testDb.initialize();
});

beforeEach(async () => {
  // Pulisce dati prima di ogni test senza ricreare tabelle
  await testDb.cleanup();
});

afterAll(async () => {
  // Chiude connessione dopo tutti i test
  await testDb.close();
  
  // Rimuove file SQLite di test
  try {
    fs.unlinkSync('prisma/test.sqlite');
  } catch (e) {
    // Ignora se file non esiste
  }
  
  // Rimuove schema test
  try {
    fs.unlinkSync('prisma/schema.test.prisma');
  } catch (e) {
    // Ignora se file non esiste
  }
}); 