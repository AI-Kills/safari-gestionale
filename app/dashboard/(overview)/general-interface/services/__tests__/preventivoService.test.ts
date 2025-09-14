import { PreventivoService } from '../preventivoService';
import { Data, PreventivoInputGroup, ClienteInputGroup } from '../../general-interface.defs';

// Mock delle azioni
jest.mock('@/app/lib/actions', () => ({
  getNumberOfPreventivi: jest.fn(),
  submitCreatePreventivoGI: jest.fn()
}));

describe('PreventivoService.duplicatePreventivo', () => {
  const mockData: Data = {
    cliente: new ClienteInputGroup('Mario', 'Rossi'),
    preventivo: new PreventivoInputGroup('0004', 10, 'INO', 'TEST-REF'),
    serviziATerra: [],
    serviziAggiuntivi: [],
    voli: [],
    assicurazioni: [],
    preventivoAlCliente: undefined
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should duplicate preventivo with incremented number', async () => {
    // Mock getNumberOfPreventivi to return current count
    const { getNumberOfPreventivi, submitCreatePreventivoGI } = require('@/app/lib/actions');
    getNumberOfPreventivi.mockResolvedValue({
      success: true,
      values: 4 // Current count
    });

    submitCreatePreventivoGI.mockResolvedValue({
      success: true
    });

    const result = await PreventivoService.duplicatePreventivo(mockData);

    expect(result.success).toBe(true);
    expect(getNumberOfPreventivi).toHaveBeenCalled();
    expect(submitCreatePreventivoGI).toHaveBeenCalledWith(
      expect.objectContaining({
        preventivo: expect.objectContaining({
          numero_preventivo: '0005', // Should be incremented
          id: undefined // Should be undefined for new preventivo
        })
      })
    );
  });

  test('should handle error when getting next preventivo number', async () => {
    const { getNumberOfPreventivi } = require('@/app/lib/actions');
    getNumberOfPreventivi.mockResolvedValue({
      success: false,
      errorsMessage: 'Database error'
    });

    const result = await PreventivoService.duplicatePreventivo(mockData);

    expect(result.success).toBe(false);
    expect(result.error).toContain('Database error');
  });

  test('should remove all IDs from duplicated data', async () => {
    const { getNumberOfPreventivi, submitCreatePreventivoGI } = require('@/app/lib/actions');
    
    const dataWithIds: Data = {
      ...mockData,
      preventivo: {
        ...mockData.preventivo!,
        id: 'existing-preventivo-id'
      },
      serviziATerra: [{
        groupId: 1,
        id: 'servizio-id-1',
        destinazione: 'Roma'
      }],
      voli: [{
        groupId: 1,
        id: 'volo-id-1',
        fornitore: 'Alitalia'
      }]
    };

    getNumberOfPreventivi.mockResolvedValue({
      success: true,
      values: 5
    });

    submitCreatePreventivoGI.mockResolvedValue({
      success: true
    });

    await PreventivoService.duplicatePreventivo(dataWithIds);

    const createCall = submitCreatePreventivoGI.mock.calls[0][0];
    
    // Verifica che tutti gli ID siano stati rimossi
    expect(createCall.preventivo.id).toBeUndefined();
    expect(createCall.serviziATerra[0].id).toBeUndefined();
    expect(createCall.voli[0].id).toBeUndefined();
    
    // Verifica che il numero preventivo sia stato aggiornato
    expect(createCall.preventivo.numero_preventivo).toBe('0006');
  });
});
