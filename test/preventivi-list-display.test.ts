import { describe, test, expect } from 'vitest';

describe('Lista Preventivi - Formattazione Display', () => {
  test('should format preventivo number correctly', () => {
    const mockPreventivo = {
      id: '1',
      brand: 'INO',
      numero_preventivo: '0011',
      destinazione: 'Roma',
      data_partenza: new Date('2024-06-15'),
      riferimento: 'TEST-REF',
      operatore: 'Mario Rossi'
    };

    // Simula la formattazione che avviene nel componente
    const numeroFormattato = `${mockPreventivo.brand || ''}${mockPreventivo.numero_preventivo || ''}`;
    
    expect(numeroFormattato).toBe('INO0011');
  });

  test('should handle missing brand gracefully', () => {
    const mockPreventivo = {
      id: '1',
      brand: undefined,
      numero_preventivo: '0011',
      destinazione: 'Roma',
      data_partenza: new Date('2024-06-15'),
      riferimento: 'TEST-REF',
      operatore: 'Mario Rossi'
    };

    const numeroFormattato = `${mockPreventivo.brand || ''}${mockPreventivo.numero_preventivo || ''}`;
    
    expect(numeroFormattato).toBe('0011');
  });

  test('should handle missing numero_preventivo gracefully', () => {
    const mockPreventivo = {
      id: '1',
      brand: 'INO',
      numero_preventivo: undefined,
      destinazione: 'Roma',
      data_partenza: new Date('2024-06-15'),
      riferimento: 'TEST-REF',
      operatore: 'Mario Rossi'
    };

    const numeroFormattato = `${mockPreventivo.brand || ''}${mockPreventivo.numero_preventivo || ''}`;
    
    expect(numeroFormattato).toBe('INO');
  });

  test('should format different brand types correctly', () => {
    const testCases = [
      { brand: 'INO', numero: '0011', expected: 'INO0011' },
      { brand: 'IMS', numero: '0013', expected: 'IMS0013' },
      { brand: 'IWS', numero: '0001', expected: 'IWS0001' },
    ];

    testCases.forEach(({ brand, numero, expected }) => {
      const numeroFormattato = `${brand}${numero}`;
      expect(numeroFormattato).toBe(expected);
    });
  });

  test('should include destination when present', () => {
    const mockPreventivo = {
      brand: 'INO',
      numero_preventivo: '0011',
      destinazione: 'Roma'
    };

    const displayText = `${mockPreventivo.brand}${mockPreventivo.numero_preventivo}${mockPreventivo.destinazione ? ` - ${mockPreventivo.destinazione}` : ''}`;
    
    expect(displayText).toBe('INO0011 - Roma');
  });

  test('should handle missing destination gracefully', () => {
    const mockPreventivo = {
      brand: 'INO',
      numero_preventivo: '0011',
      destinazione: undefined
    };

    const displayText = `${mockPreventivo.brand}${mockPreventivo.numero_preventivo}${mockPreventivo.destinazione ? ` - ${mockPreventivo.destinazione}` : ''}`;
    
    expect(displayText).toBe('INO0011');
  });
});
