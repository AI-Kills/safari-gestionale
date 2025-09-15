import { testDb } from './test-db-setup';
import '@testing-library/jest-dom';

// Setup globale per tutti i test
beforeAll(async () => {
  // Inizializza database con schema e tabelle
  await testDb.initialize();
}, 30000); // Timeout più lungo per inizializzazione

beforeEach(async () => {
  // Pulisce dati prima di ogni test senza ricreare tabelle
  await testDb.cleanup();
}, 10000);

afterAll(async () => {
  // Chiude connessione e pulisce file
  await testDb.close();
}, 10000); 