import { 
  getTotServizio, 
  getRicaricoServizio, 
  getTotVolo, 
  getTotAssicurazione,
  roundToCurrency,
  preciseDivision,
  preciseMultiplication,
  formatCurrencyItalian,
  formatPrecisionNumber
} from '@/app/dashboard/(overview)/general-interface/helpers';

describe('Currency Precision Tests - 4 decimal places accuracy', () => {

  describe('Utility Functions', () => {
    
    test('roundToCurrency should round to 4 decimal places correctly', () => {
      expect(roundToCurrency(1.123456789)).toBe(1.1235);
      expect(roundToCurrency(1.999999999)).toBe(2.0000);
      expect(roundToCurrency(0.0001)).toBe(0.0001);
      expect(roundToCurrency(0.00005)).toBe(0.0001);
      expect(roundToCurrency(0.00004)).toBe(0.0000);
    });

    test('preciseDivision should handle exchange rates accurately', () => {
      // Test casi reali di cambio valuta
      expect(preciseDivision(1000, 1.0854)).toBe(921.3445); // EUR/USD typical
      expect(preciseDivision(1000, 149.50)).toBe(6.6890); // EUR/JPY typical
      expect(preciseDivision(1000, 0.8734)).toBe(1144.9851); // EUR/GBP typical
      
      // Edge cases
      expect(preciseDivision(1, 3)).toBe(0.3333);
      expect(preciseDivision(100, 7)).toBe(14.2857);
    });

    test('preciseMultiplication should handle multiple factors', () => {
      expect(preciseMultiplication(10.5, 2.3, 1.25)).toBe(30.1875);
      expect(preciseMultiplication(100, 0.15, 7, 3)).toBe(315.0000);
      expect(preciseMultiplication(1.1111, 1.1111)).toBe(1.2346);
    });

  });

  describe('Servizi a Terra & Servizi Aggiuntivi', () => {

    test('getTotServizio should calculate precise amounts with exchange rates', () => {
      // Scenario: Hotel in USD, cambio 1.0854, 3 notti, 2 camere, 15% ricarico
      const totale = 150; // $150 per notte per camera
      const cambio = 1.0854;
      const percentualeRicarico = 0.15;
      const numeroNotti = 3;
      const numeroCamere = 2;
      
      const result = getTotServizio(totale, cambio, percentualeRicarico, numeroNotti, numeroCamere);
      
      // Calcolo manuale per verifica:
      // Base: 150 * 3 * 2 = 900 USD
      // In Euro: 900 / 1.0854 = 829.1006
      // Ricarico: (150 / 1.0854) * 0.15 * 3 * 2 = 124.3651
      // Totale: 829.1006 + 124.3651 = 953.4657
      
      expect(result).toBe(953.4657);
      expect(result.toString().split('.')[1]?.length).toBeLessThanOrEqual(4);
    });

    test('getRicaricoServizio should calculate markup precisely', () => {
      const totale = 200;
      const cambio = 1.2150;
      const percentualeRicarico = 0.12;
      const numeroNotti = 5;
      const numeroCamere = 1;
      
      const result = getRicaricoServizio(totale, cambio, percentualeRicarico, numeroNotti, numeroCamere);
      
      // Calcolo manuale: (200 / 1.2150) * 0.12 * 5 * 1 = 98.7654
      expect(result).toBe(98.7654);
    });

    test('should handle edge cases with small amounts', () => {
      const result = getTotServizio(0.01, 1.5, 0.1, 1, 1);
      expect(result).toBeGreaterThan(0);
      expect(result.toString().split('.')[1]?.length).toBeLessThanOrEqual(4);
    });

  });

  describe('Voli Calculations', () => {

    test('getTotVolo should calculate flight costs precisely', () => {
      // Scenario: Volo in JPY, cambio 149.50, ricarico €50, 2 passeggeri
      const totale = 45000; // ¥45,000 per persona
      const cambio = 149.50;
      const ricarico = 50; // €50 ricarico per persona
      const numero = 2;
      
      const result = getTotVolo(totale, cambio, ricarico, numero);
      
      // Calcolo manuale:
      // Per persona: 45000 / 149.50 + 50 = 300.9716 + 50 = 350.9716
      // Per 2 persone: 350.9716 * 2 = 701.9432
      
      expect(result).toBe(701.9432);
    });

    test('should handle high precision exchange rates', () => {
      const totale = 1000;
      const cambio = 1.085412; // Tasso di cambio preciso
      const ricarico = 25.5;
      const numero = 1;
      
      const result = getTotVolo(totale, cambio, ricarico, numero);
      expect(result).toBe(946.8378);
      expect(result.toString().split('.')[1]?.length).toBeLessThanOrEqual(4);
    });

  });

  describe('Complex Real-World Scenarios', () => {

    test('should maintain precision in multi-step calculations', () => {
      // Hotel in USD con calcoli complessi
      const servizio1 = getTotServizio(125.75, 1.0847, 0.18, 4, 2);
      const servizio2 = getTotServizio(89.50, 1.0847, 0.18, 4, 1);
      
      // Volo in GBP
      const volo = getTotVolo(425.30, 0.8756, 35, 2);
      
      const totale = servizio1 + servizio2 + volo;
      
      expect(servizio1).toBe(1076.3118);
      expect(servizio2).toBe(377.9091);
      expect(volo).toBe(1042.1190);
      expect(totale).toBe(2496.3399);
    });

    test('should handle precision in accumulated totals', () => {
      // Test che simula il calcolo di getSommaTuttiTotEuro ma specifico
      const results: number[] = [];
      
      for (let i = 0; i < 10; i++) {
        const amount = getTotServizio(100 + i * 0.1, 1.0854 + i * 0.001, 0.15, 2, 1);
        results.push(amount);
      }
      
      const total = results.reduce((acc, val) => roundToCurrency(acc + val), 0);
      
      // Verifica che ogni risultato abbia al massimo 4 decimali
      results.forEach(result => {
        const decimals = result.toString().split('.')[1]?.length || 0;
        expect(decimals).toBeLessThanOrEqual(4);
      });
      
      // Verifica che il totale mantenga la precisione
      const totalDecimals = total.toString().split('.')[1]?.length || 0;
      expect(totalDecimals).toBeLessThanOrEqual(4);
    });

  });

  describe('Formatting Functions', () => {

    test('formatCurrencyItalian should format with correct decimal places', () => {
      expect(formatCurrencyItalian(1234.5678, 4)).toBe('1.234,5678');
      expect(formatCurrencyItalian(1234.5678, 2)).toBe('1.234,57');
      expect(formatCurrencyItalian(1234.5600, 4, false)).toBe('1.234,56');
    });

    test('formatPrecisionNumber should show significant decimals only', () => {
      expect(formatPrecisionNumber(1234.5678)).toBe('1.234,5678');
      expect(formatPrecisionNumber(1234.5600)).toBe('1.234,56');
      expect(formatPrecisionNumber(1234.0000)).toBe('1.234');
    });

  });

  describe('Regression Tests', () => {

    test('should not lose precision in repeated calculations', () => {
      let value = 100.1234;
      
      // Esegui 100 operazioni per testare la deriva numerica
      for (let i = 0; i < 100; i++) {
        value = getTotServizio(value, 1.0854, 0.15, 1, 1);
      }
      
      // Il valore finale deve ancora avere al massimo 4 decimali
      const decimals = value.toString().split('.')[1]?.length || 0;
      expect(decimals).toBeLessThanOrEqual(4);
      expect(value).toBeGreaterThan(0);
    });

    test('should handle zero and negative edge cases', () => {
      expect(getTotServizio(0, 1.5, 0.1, 1, 1)).toBe(0);
      expect(getTotVolo(0, 1.5, 10, 2)).toBe(20.0000);
      
      // Division by zero protection
      expect(getTotServizio(100, 0, 0.1, 1, 1)).toBe(0);
      expect(getTotVolo(100, 0, 10, 1)).toBe(0);
    });

  });

});
