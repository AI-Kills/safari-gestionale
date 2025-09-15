import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock delle dipendenze
vi.mock('@/app/lib/actions', () => ({
  createCliente: vi.fn(),
  updateCliente: vi.fn(),
  createPreventivo: vi.fn(),
  updatePreventivo: vi.fn(),
  getAllFornitore: vi.fn().mockResolvedValue([]),
  getAllBanche: vi.fn().mockResolvedValue([]),
  createServizioATerra: vi.fn(),
  updateServizioATerra: vi.fn(),
  deleteServizioATerra: vi.fn(),
  createVolo: vi.fn(),
  updateVolo: vi.fn(),
  deleteVolo: vi.fn(),
  createAssicurazione: vi.fn(),
  updateAssicurazione: vi.fn(),
  deleteAssicurazione: vi.fn()
}));

// Import degli hooks da testare
import { useDynamicList } from '../app/dashboard/(overview)/general-interface/hooks/useDynamicList';
import { useFormState } from '../app/dashboard/(overview)/general-interface/hooks/useFormState';
import { useServiceListManagement } from '../app/dashboard/(overview)/general-interface/hooks/useServiceListManagement';
import { usePartecipantiManagement } from '../app/dashboard/(overview)/general-interface/hooks/usePartecipantiManagement';
import { usePreventivoAlClienteManagement } from '../app/dashboard/(overview)/general-interface/hooks/usePreventivoAlClienteManagement';
import { usePagamentiManagement } from '../app/dashboard/(overview)/general-interface/hooks/usePagamentiManagement';
import { useEntityTransformation } from '../app/dashboard/(overview)/general-interface/hooks/useEntityTransformation';

describe('General Interface Hooks', () => {
  
  // ============================================================================
  // useDynamicList TESTS
  // ============================================================================
  
  describe('useDynamicList', () => {
    test('should initialize with empty list', () => {
      const { result } = renderHook(() => useDynamicList([]));

      expect(result.current.items).toEqual([]);
      expect(result.current.items).toHaveLength(0);
    });

    test('should initialize with provided items', () => {
      const initialItems = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ];

      const { result } = renderHook(() => useDynamicList(initialItems));

      expect(result.current.items).toEqual(initialItems);
      expect(result.current.items).toHaveLength(2);
    });

    test('should add new item', () => {
      const { result } = renderHook(() => useDynamicList([]));

      act(() => {
        result.current.add({ id: 1, name: 'New Item' });
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual({ id: 1, name: 'New Item' });
    });

    test('should remove item by index', () => {
      const initialItems = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ];

      const { result } = renderHook(() => useDynamicList(initialItems));

      act(() => {
        result.current.remove(1); // Remove middle item
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0]).toEqual({ id: 1, name: 'Item 1' });
      expect(result.current.items[1]).toEqual({ id: 3, name: 'Item 3' });
    });

    test('should update item at index', () => {
      const initialItems = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ];

      const { result } = renderHook(() => useDynamicList(initialItems));

      act(() => {
        result.current.update(0, { id: 1, name: 'Updated Item 1' });
      });

      expect(result.current.items[0]).toEqual({ id: 1, name: 'Updated Item 1' });
      expect(result.current.items[1]).toEqual({ id: 2, name: 'Item 2' });
    });

    test('should clear all items', () => {
      const initialItems = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ];

      const { result } = renderHook(() => useDynamicList(initialItems));

      act(() => {
        result.current.clear();
      });

      expect(result.current.items).toEqual([]);
      expect(result.current.items).toHaveLength(0);
    });

    test('should replace all items', () => {
      const initialItems = [{ id: 1, name: 'Item 1' }];
      const newItems = [
        { id: 2, name: 'New Item 2' },
        { id: 3, name: 'New Item 3' }
      ];

      const { result } = renderHook(() => useDynamicList(initialItems));

      act(() => {
        result.current.replace(newItems);
      });

      expect(result.current.items).toEqual(newItems);
      expect(result.current.items).toHaveLength(2);
    });
  });

  // ============================================================================
  // useFormState TESTS
  // ============================================================================
  
  describe('useFormState', () => {
    test('should initialize with default values', () => {
      const initialState = {
        name: 'Test',
        email: '',
        age: 0
      };

      const { result } = renderHook(() => useFormState(initialState));

      expect(result.current.values).toEqual(initialState);
      expect(result.current.errors).toEqual({});
      expect(result.current.touched).toEqual({});
      expect(result.current.isDirty).toBe(false);
      expect(result.current.isValid).toBe(true);
    });

    test('should update field value', () => {
      const initialState = { name: '', email: '' };
      const { result } = renderHook(() => useFormState(initialState));

      act(() => {
        result.current.setValue('name', 'John Doe');
      });

      expect(result.current.values.name).toBe('John Doe');
      expect(result.current.isDirty).toBe(true);
      expect(result.current.touched.name).toBe(true);
    });

    test('should set field error', () => {
      const initialState = { email: '' };
      const { result } = renderHook(() => useFormState(initialState));

      act(() => {
        result.current.setError('email', 'Email is required');
      });

      expect(result.current.errors.email).toBe('Email is required');
      expect(result.current.isValid).toBe(false);
    });

    test('should clear field error', () => {
      const initialState = { email: '' };
      const { result } = renderHook(() => useFormState(initialState));

      act(() => {
        result.current.setError('email', 'Email is required');
      });

      expect(result.current.errors.email).toBe('Email is required');

      act(() => {
        result.current.clearError('email');
      });

      expect(result.current.errors.email).toBeUndefined();
      expect(result.current.isValid).toBe(true);
    });

    test('should reset form to initial state', () => {
      const initialState = { name: 'Initial', email: '' };
      const { result } = renderHook(() => useFormState(initialState));

      // Make changes
      act(() => {
        result.current.setValue('name', 'Changed');
        result.current.setValue('email', 'test@example.com');
        result.current.setError('name', 'Some error');
      });

      expect(result.current.isDirty).toBe(true);

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.values).toEqual(initialState);
      expect(result.current.errors).toEqual({});
      expect(result.current.touched).toEqual({});
      expect(result.current.isDirty).toBe(false);
    });

    test('should validate all fields', () => {
      const initialState = { name: '', email: '', age: 0 };
      const validator = (values: any) => {
        const errors: any = {};
        if (!values.name) errors.name = 'Name is required';
        if (!values.email) errors.email = 'Email is required';
        if (values.age < 18) errors.age = 'Must be 18 or older';
        return errors;
      };

      const { result } = renderHook(() => useFormState(initialState, { validator }));

      act(() => {
        result.current.validate();
      });

      expect(result.current.errors.name).toBe('Name is required');
      expect(result.current.errors.email).toBe('Email is required');
      expect(result.current.errors.age).toBe('Must be 18 or older');
      expect(result.current.isValid).toBe(false);
    });
  });

  // ============================================================================
  // useServiceListManagement TESTS
  // ============================================================================
  
  describe('useServiceListManagement', () => {
    const mockConfig = {
      entityType: 'serviziATerra' as const,
      createAction: vi.fn(),
      updateAction: vi.fn(),
      deleteAction: vi.fn(),
      defaultItem: () => ({ descrizione: '', totEuro: 0 })
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    test('should initialize with empty services list', () => {
      const { result } = renderHook(() => useServiceListManagement(mockConfig));

      expect(result.current.services).toEqual([]);
      expect(result.current.services).toHaveLength(0);
    });

    test('should add new service', () => {
      const { result } = renderHook(() => useServiceListManagement(mockConfig));

      act(() => {
        result.current.addService();
      });

      expect(result.current.services).toHaveLength(1);
      expect(result.current.services[0]).toEqual({ descrizione: '', totEuro: 0 });
    });

    test('should remove service by index', () => {
      const { result } = renderHook(() => useServiceListManagement(mockConfig));

      // Add two services
      act(() => {
        result.current.addService();
        result.current.addService();
      });

      expect(result.current.services).toHaveLength(2);

      // Remove first service
      act(() => {
        result.current.removeService(0);
      });

      expect(result.current.services).toHaveLength(1);
    });

    test('should update service field', () => {
      const { result } = renderHook(() => useServiceListManagement(mockConfig));

      act(() => {
        result.current.addService();
      });

      act(() => {
        result.current.updateServiceField(0, 'descrizione', 'Hotel Rome');
      });

      expect(result.current.services[0].descrizione).toBe('Hotel Rome');
    });

    test('should clear all services', () => {
      const { result } = renderHook(() => useServiceListManagement(mockConfig));

      // Add services
      act(() => {
        result.current.addService();
        result.current.addService();
      });

      expect(result.current.services).toHaveLength(2);

      // Clear all
      act(() => {
        result.current.clearServices();
      });

      expect(result.current.services).toEqual([]);
    });

    test('should load services from external data', () => {
      const externalServices = [
        { descrizione: 'Service 1', totEuro: 100 },
        { descrizione: 'Service 2', totEuro: 200 }
      ];

      const { result } = renderHook(() => useServiceListManagement(mockConfig));

      act(() => {
        result.current.loadServices(externalServices);
      });

      expect(result.current.services).toEqual(externalServices);
      expect(result.current.services).toHaveLength(2);
    });
  });

  // ============================================================================
  // usePartecipantiManagement TESTS
  // ============================================================================
  
  describe('usePartecipantiManagement', () => {
    test('should initialize with empty participants list', () => {
      const { result } = renderHook(() => usePartecipantiManagement());

      expect(result.current.partecipanti).toEqual([]);
    });

    test('should add new participant', () => {
      const { result } = renderHook(() => usePartecipantiManagement());

      act(() => {
        result.current.addPartecipante();
      });

      expect(result.current.partecipanti).toHaveLength(1);
      expect(result.current.partecipanti[0]).toHaveProperty('nome');
      expect(result.current.partecipanti[0]).toHaveProperty('cognome');
    });

    test('should remove participant by index', () => {
      const { result } = renderHook(() => usePartecipantiManagement());

      // Add two participants
      act(() => {
        result.current.addPartecipante();
        result.current.addPartecipante();
      });

      expect(result.current.partecipanti).toHaveLength(2);

      // Remove first participant
      act(() => {
        result.current.removePartecipante(0);
      });

      expect(result.current.partecipanti).toHaveLength(1);
    });

    test('should update participant field', () => {
      const { result } = renderHook(() => usePartecipantiManagement());

      act(() => {
        result.current.addPartecipante();
      });

      act(() => {
        result.current.updatePartecipanteField(0, 'nome', 'Mario');
      });

      expect(result.current.partecipanti[0].nome).toBe('Mario');
    });

    test('should load participants from external data', () => {
      const externalParticipants = [
        { nome: 'Mario', cognome: 'Rossi' },
        { nome: 'Luigi', cognome: 'Verdi' }
      ];

      const { result } = renderHook(() => usePartecipantiManagement());

      act(() => {
        result.current.loadPartecipanti(externalParticipants);
      });

      expect(result.current.partecipanti).toEqual(externalParticipants);
      expect(result.current.partecipanti).toHaveLength(2);
    });
  });

  // ============================================================================
  // usePreventivoAlClienteManagement TESTS
  // ============================================================================
  
  describe('usePreventivoAlClienteManagement', () => {
    test('should initialize with empty preventivo al cliente', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      expect(result.current.preventivoAlCliente).toBeDefined();
      expect(result.current.preventivoAlCliente.descrizioneViaggio).toBe('');
      expect(result.current.preventivoAlCliente.righe).toEqual([]);
    });

    test('should update descrizione viaggio', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      act(() => {
        result.current.updateDescrizioneViaggio('Viaggio in Italia');
      });

      expect(result.current.preventivoAlCliente.descrizioneViaggio).toBe('Viaggio in Italia');
    });

    test('should add new row', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      act(() => {
        result.current.addRow();
      });

      expect(result.current.preventivoAlCliente.righe).toHaveLength(1);
      expect(result.current.preventivoAlCliente.righe[0]).toHaveProperty('descrizione');
      expect(result.current.preventivoAlCliente.righe[0]).toHaveProperty('importo');
    });

    test('should remove row by index', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      // Add two rows
      act(() => {
        result.current.addRow();
        result.current.addRow();
      });

      expect(result.current.preventivoAlCliente.righe).toHaveLength(2);

      // Remove first row
      act(() => {
        result.current.removeRow(0);
      });

      expect(result.current.preventivoAlCliente.righe).toHaveLength(1);
    });

    test('should update row field', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      act(() => {
        result.current.addRow();
      });

      act(() => {
        result.current.updateRow(0, 'descrizione', 'Hotel');
        result.current.updateRow(0, 'importo', 500);
      });

      expect(result.current.preventivoAlCliente.righe[0].descrizione).toBe('Hotel');
      expect(result.current.preventivoAlCliente.righe[0].importo).toBe(500);
    });
  });

  // ============================================================================
  // usePagamentiManagement TESTS
  // ============================================================================
  
  describe('usePagamentiManagement', () => {
    test('should initialize with empty pagamenti', () => {
      const { result } = renderHook(() => usePagamentiManagement());

      expect(result.current.pagamenti).toEqual([]);
    });

    test('should add new pagamento', () => {
      const { result } = renderHook(() => usePagamentiManagement());

      const newPagamento = {
        importo: 100,
        data_scadenza: new Date('2024-12-31'),
        id_banca: 'banca-1'
      };

      act(() => {
        result.current.addPagamento(newPagamento);
      });

      expect(result.current.pagamenti).toHaveLength(1);
      expect(result.current.pagamenti[0]).toEqual(newPagamento);
    });

    test('should remove pagamento by index', () => {
      const { result } = renderHook(() => usePagamentiManagement());

      const pagamento1 = { importo: 100, data_scadenza: new Date(), id_banca: 'banca-1' };
      const pagamento2 = { importo: 200, data_scadenza: new Date(), id_banca: 'banca-2' };

      act(() => {
        result.current.addPagamento(pagamento1);
        result.current.addPagamento(pagamento2);
      });

      expect(result.current.pagamenti).toHaveLength(2);

      act(() => {
        result.current.removePagamento(0);
      });

      expect(result.current.pagamenti).toHaveLength(1);
      expect(result.current.pagamenti[0]).toEqual(pagamento2);
    });

    test('should update pagamento', () => {
      const { result } = renderHook(() => usePagamentiManagement());

      const originalPagamento = { importo: 100, data_scadenza: new Date(), id_banca: 'banca-1' };

      act(() => {
        result.current.addPagamento(originalPagamento);
      });

      const updatedPagamento = { importo: 150, data_scadenza: new Date(), id_banca: 'banca-2' };

      act(() => {
        result.current.updatePagamento(0, updatedPagamento);
      });

      expect(result.current.pagamenti[0]).toEqual(updatedPagamento);
    });
  });

  // ============================================================================
  // useEntityTransformation TESTS
  // ============================================================================
  
  describe('useEntityTransformation', () => {
    test('should provide transformation functions', () => {
      const { result } = renderHook(() => useEntityTransformation());

      expect(result.current.transformPreventivoCompleto).toBeInstanceOf(Function);
      expect(result.current.transformClienteToInputGroup).toBeInstanceOf(Function);
      expect(result.current.transformServizioToInputGroup).toBeInstanceOf(Function);
      expect(result.current.transformVoloToInputGroup).toBeInstanceOf(Function);
      expect(result.current.transformAssicurazioneToInputGroup).toBeInstanceOf(Function);
    });

    test('should transform preventivo completo correctly', () => {
      const { result } = renderHook(() => useEntityTransformation());

      const mockPreventivoCompleto = {
        cliente: {
          id: 'cliente-1',
          nome: 'Mario',
          cognome: 'Rossi',
          email: 'mario@test.com'
        },
        preventivo: {
          id: 'preventivo-1',
          numero_preventivo: 'TEST001',
          destinazione: 'Roma'
        },
        serviziATerra: [],
        voli: [],
        assicurazioni: []
      };

      const transformed = result.current.transformPreventivoCompleto(mockPreventivoCompleto);

      expect(transformed).toBeDefined();
      expect(transformed.cliente).toBeDefined();
      expect(transformed.preventivo).toBeDefined();
      expect(transformed.serviziATerra).toEqual([]);
      expect(transformed.voli).toEqual([]);
      expect(transformed.assicurazioni).toEqual([]);
    });

    test('should handle null/undefined input gracefully', () => {
      const { result } = renderHook(() => useEntityTransformation());

      const transformed = result.current.transformPreventivoCompleto(null);

      expect(transformed).toBeDefined();
      expect(transformed.cliente).toBeDefined();
      expect(transformed.preventivo).toBeDefined();
    });
  });
});
