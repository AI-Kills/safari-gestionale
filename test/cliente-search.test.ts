import { describe, test, expect, beforeEach } from 'vitest';
import { ClienteService } from '@/app/dashboard/(overview)/general-interface/services/clienteService';
import { ClienteInputGroup } from '@/app/dashboard/(overview)/general-interface/general-interface.defs';

describe('Cliente Search Integration', () => {
  test('should search clients with empty criteria', async () => {
    const emptyCliente = new ClienteInputGroup();
    const result = await ClienteService.searchClienti(emptyCliente);
    
    // Dovrebbe restituire sempre un risultato, anche se vuoto
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('error');
    expect(Array.isArray(result.data)).toBe(true);
  });

  test('should search clients with partial name', async () => {
    const clienteConNome = new ClienteInputGroup('Mario');
    const result = await ClienteService.searchClienti(clienteConNome);
    
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.data)).toBe(true);
  });

  test('should search clients with email', async () => {
    const clienteConEmail = new ClienteInputGroup();
    clienteConEmail.email = 'test@example.com';
    const result = await ClienteService.searchClienti(clienteConEmail);
    
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.data)).toBe(true);
  });

  test('should handle search errors gracefully', async () => {
    // Test con dati che potrebbero causare errori
    const clienteProblematico = new ClienteInputGroup();
    // Impostiamo una data invalida per testare la gestione errori
    (clienteProblematico as any).data_di_nascita = 'invalid-date';
    
    const result = await ClienteService.searchClienti(clienteProblematico);
    
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('error');
    expect(Array.isArray(result.data)).toBe(true);
  });
});
