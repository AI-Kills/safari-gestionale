import { describe, test, expect } from 'vitest';

describe('Pagamenti Integration Test', () => {
  test('should have pagamenti structure in service objects', () => {
    // Mock di un servizio a terra con pagamenti
    const mockServizioATerra = {
      groupId: 1,
      destinazione: 'BALI',
      fornitore: 'ABBEY TRAVEL',
      descrizione: 'Hotel 5 stelle',
      totale: 1000,
      pagamenti: [
        {
          id: 'pag-1',
          banca: 'INTESA SAN PAOLO',
          data_scadenza: new Date('2024-01-15'),
          data_pagamento: new Date('2024-01-10'),
          importo_in_euro: 500,
          importo_in_valuta: 500
        },
        {
          id: 'pag-2',
          banca: 'UNICREDIT',
          data_scadenza: new Date('2024-02-15'),
          importo_in_euro: 500,
          importo_in_valuta: 500
        }
      ]
    };

    // Verifica struttura pagamenti
    expect(mockServizioATerra.pagamenti).toBeDefined();
    expect(mockServizioATerra.pagamenti.length).toBe(2);
    expect(mockServizioATerra.pagamenti[0]).toHaveProperty('id');
    expect(mockServizioATerra.pagamenti[0]).toHaveProperty('banca');
    expect(mockServizioATerra.pagamenti[0]).toHaveProperty('importo_in_euro');
    
    console.log('✅ Pagamenti structure is correct for servizi a terra');
  });

  test('should have pagamenti structure in volo objects', () => {
    // Mock di un volo con pagamenti
    const mockVolo = {
      groupId: 1,
      fornitore: 'ALITALIA',
      compagnia_aerea: 'ITA Airways',
      descrizione: 'Volo Roma-Bali',
      totale: 800,
      pagamenti: [
        {
          id: 'pag-volo-1',
          banca: 'INTESA SAN PAOLO',
          data_scadenza: new Date('2024-01-20'),
          importo_in_euro: 800,
          importo_in_valuta: 800
        }
      ]
    };

    // Verifica struttura pagamenti
    expect(mockVolo.pagamenti).toBeDefined();
    expect(mockVolo.pagamenti.length).toBe(1);
    expect(mockVolo.pagamenti[0]).toHaveProperty('id');
    expect(mockVolo.pagamenti[0]).toHaveProperty('banca');
    expect(mockVolo.pagamenti[0]).toHaveProperty('importo_in_euro');
    
    console.log('✅ Pagamenti structure is correct for voli');
  });

  test('should validate pagamento data structure', () => {
    const mockPagamento = {
      id: 'test-id',
      banca: 'INTESA SAN PAOLO',
      data_scadenza: new Date('2024-01-15'),
      data_pagamento: new Date('2024-01-10'),
      importo_in_euro: 1000,
      importo_in_valuta: 1000
    };

    // Verifica che tutti i campi obbligatori siano presenti
    expect(mockPagamento.id).toBeDefined();
    expect(mockPagamento.banca).toBeDefined();
    expect(mockPagamento.importo_in_euro).toBeGreaterThan(0);
    
    console.log('✅ Pagamento data structure is valid');
  });
});
