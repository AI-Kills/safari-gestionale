import { PreventivoService } from '../app/dashboard/(overview)/general-interface/services/preventivoService';
import { ClienteService } from '../app/dashboard/(overview)/general-interface/services/clienteService';

describe('Date Conversion', () => {
  test('should convert Date objects to ISO strings', () => {
    const testData = {
      nome: 'Test',
      data_nascita: new Date('2023-01-15'),
      data_partenza: new Date('2024-06-20'),
      nested: {
        data_scadenza: new Date('2025-12-31')
      },
      array: [
        { data: new Date('2023-05-10') },
        { data: new Date('2023-05-11') }
      ]
    };

    // Test ClienteService conversion
    const clienteConverted = (ClienteService as any).convertToPlainObject(testData);
    
    expect(clienteConverted.data_nascita).toBe('2023-01-15T00:00:00.000Z');
    expect(clienteConverted.data_partenza).toBe('2024-06-20T00:00:00.000Z');
    expect(clienteConverted.nested.data_scadenza).toBe('2025-12-31T00:00:00.000Z');
    expect(clienteConverted.array[0].data).toBe('2023-05-10T00:00:00.000Z');
    expect(clienteConverted.array[1].data).toBe('2023-05-11T00:00:00.000Z');

    // Test PreventivoService conversion
    const preventivoConverted = (PreventivoService as any).convertToPlainObject(testData);
    
    expect(preventivoConverted.data_nascita).toBe('2023-01-15T00:00:00.000Z');
    expect(preventivoConverted.data_partenza).toBe('2024-06-20T00:00:00.000Z');
    expect(preventivoConverted.nested.data_scadenza).toBe('2025-12-31T00:00:00.000Z');
  });

  test('should handle null and undefined dates', () => {
    const testData = {
      nome: 'Test',
      data_nascita: null,
      data_partenza: undefined,
      data_scadenza: ''
    };

    const converted = (PreventivoService as any).convertToPlainObject(testData);
    
    expect(converted.data_nascita).toBeNull();
    expect(converted.data_partenza).toBeUndefined();
    expect(converted.data_scadenza).toBe('');
  });

  test('should preserve non-date values', () => {
    const testData = {
      nome: 'Test Cliente',
      eta: 30,
      attivo: true,
      tags: ['tag1', 'tag2']
    };

    const converted = (ClienteService as any).convertToPlainObject(testData);
    
    expect(converted.nome).toBe('Test Cliente');
    expect(converted.eta).toBe(30);
    expect(converted.attivo).toBe(true);
    expect(converted.tags).toEqual(['tag1', 'tag2']);
  });
});
