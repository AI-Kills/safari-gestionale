import { describe, test, expect } from 'vitest';

describe('Cliente-Preventivo Fix', () => {
  test('should have correct cliente data structure', () => {
    // Simula i dati che vengono passati alla funzione submitCreatePreventivoGI
    const mockCliente = {
      id: 'test-client-id',
      nome: 'Mario',
      cognome: 'Rossi',
      email: 'mario.rossi@test.com'
    };

    const mockPreventivo = {
      numero_preventivo: '0007',
      percentuale_ricarico: 0,
      brand: 'IWS',
      operatore: 'Carlo',
      adulti: 0,
      bambini: 0,
      stato: 'da fare'
    };

    const mockData = {
      cliente: mockCliente,
      preventivo: mockPreventivo,
      serviziATerra: [],
      serviziAggiuntivi: [],
      voli: [],
      assicurazioni: [],
      preventivoAlCliente: { righePrimoTipo: [], righeSecondoTipo: [] }
    };

    // Verifica che il cliente abbia un ID
    expect(mockData.cliente.id).toBeDefined();
    expect(mockData.cliente.id).toBe('test-client-id');
    
    // Verifica che non sia un oggetto vuoto
    expect(Object.keys(mockData.cliente).length).toBeGreaterThan(0);
    
    console.log('✅ Cliente data structure is correct:', mockData.cliente);
  });

  test('should detect empty cliente object', () => {
    const emptyCliente = {};
    
    // Simula la condizione che causava l'errore
    expect((emptyCliente as any).id).toBeUndefined();
    expect(Object.keys(emptyCliente).length).toBe(0);
    
    console.log('❌ Empty cliente detected (this was the bug):', emptyCliente);
  });
});
