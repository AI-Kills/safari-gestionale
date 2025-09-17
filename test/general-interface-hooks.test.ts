import { describe, test, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Import degli hooks da testare
import { useDynamicList } from '../app/dashboard/(overview)/general-interface/hooks/useDynamicList';
import { useFormState } from '../app/dashboard/(overview)/general-interface/hooks/useFormState';
import { usePartecipantiManagement } from '../app/dashboard/(overview)/general-interface/hooks/usePartecipantiManagement';
import { usePreventivoAlClienteManagement } from '../app/dashboard/(overview)/general-interface/hooks/usePreventivoAlClienteManagement';

// Import delle definizioni
import { 
  PartecipanteInputGroup, 
  ClienteInputGroup, 
  Pagamento,
  PreventivoAlClienteInputGroup,
  PreventivoAlClienteRow
} from '../app/dashboard/(overview)/general-interface/general-interface.defs';

describe('General Interface Hooks', () => {
  
  // ============================================================================
  // DYNAMIC LIST HOOK TESTS
  // ============================================================================

  describe('useDynamicList', () => {
    interface TestItem {
      groupId: number;
      id?: string;
      name: string;
      value: number;
    }

    const createTestItem = (groupId: number): TestItem => ({
      groupId,
      name: `Item ${groupId}`,
      value: groupId * 10
    });

    const updateTestItemField = (item: TestItem, field: string, value: any): TestItem => ({
      ...item,
      [field]: value
    });

    test('should initialize with empty list', () => {
      const { result } = renderHook(() =>
        useDynamicList<TestItem>({
          createNewItem: createTestItem,
          updateItemField: updateTestItemField
        })
      );

      expect(result.current.items).toHaveLength(0);
      expect(result.current.itemsCount).toBe(0);
    });

    test('should add items correctly', () => {
      const { result } = renderHook(() =>
        useDynamicList<TestItem>({
          createNewItem: createTestItem,
          updateItemField: updateTestItemField
        })
      );

      act(() => {
        result.current.addItem();
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].groupId).toBe(5); // First ID should be 5
      expect(result.current.items[0].name).toBe('Item 5');

      act(() => {
        result.current.addItem();
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[1].groupId).toBe(10);
    });

    test('should remove items correctly', () => {
      const { result } = renderHook(() =>
        useDynamicList<TestItem>({
          createNewItem: createTestItem,
          updateItemField: updateTestItemField
        })
      );

      act(() => {
        result.current.addItem();
        result.current.addItem();
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.removeItem(5); // Remove first item
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].groupId).toBe(10);
    });

    test('should update items correctly', () => {
      const { result } = renderHook(() =>
        useDynamicList<TestItem>({
          createNewItem: createTestItem,
          updateItemField: updateTestItemField
        })
      );

      act(() => {
        result.current.addItem();
      });

      act(() => {
        result.current.updateItem(5, 'name', 'Updated Name');
      });

      expect(result.current.items[0].name).toBe('Updated Name');
    });

    test('should clear all items', () => {
      const { result } = renderHook(() =>
        useDynamicList<TestItem>({
          createNewItem: createTestItem,
          updateItemField: updateTestItemField
        })
      );

      act(() => {
        result.current.addItem();
        result.current.addItem();
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearItems();
      });

      expect(result.current.items).toHaveLength(0);
    });

    test('should set all items at once', () => {
      const { result } = renderHook(() =>
        useDynamicList<TestItem>({
          createNewItem: createTestItem,
          updateItemField: updateTestItemField
        })
      );

      const testItems: TestItem[] = [
        { groupId: 1, name: 'Test 1', value: 100 },
        { groupId: 2, name: 'Test 2', value: 200 }
      ];

      act(() => {
        result.current.setAllItems(testItems);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].name).toBe('Test 1');
      expect(result.current.items[1].name).toBe('Test 2');
    });
  });

  // ============================================================================
  // FORM STATE HOOK TESTS
  // ============================================================================

  describe('useFormState', () => {
    test('should initialize with initial state', () => {
      const initialCliente = new ClienteInputGroup('Mario', 'Rossi');
      const { result } = renderHook(() =>
        useFormState({
          initialState: initialCliente
        })
      );

      expect(result.current.formState.nome).toBe('Mario');
      expect(result.current.formState.cognome).toBe('Rossi');
      expect(result.current.hasErrors).toBe(false);
      expect(result.current.isDirty).toBe(false);
    });

    test('should update single field correctly', () => {
      const initialCliente = new ClienteInputGroup();
      const { result } = renderHook(() =>
        useFormState({
          initialState: initialCliente
        })
      );

      act(() => {
        result.current.updateField('nome', 'Giovanni', 'string');
      });

      expect(result.current.formState.nome).toBe('Giovanni');
      expect(result.current.isDirty).toBe(true);
    });

    test('should convert field types correctly', () => {
      const initialCliente = new ClienteInputGroup();
      const { result } = renderHook(() =>
        useFormState({
          initialState: initialCliente
        })
      );

      act(() => {
        result.current.updateField('data_di_nascita', '1990-05-15', 'date');
      });

      expect(result.current.formState.data_di_nascita).toBeInstanceOf(Date);
      expect(result.current.formState.data_di_nascita?.getFullYear()).toBe(1990);
    });

    test('should update multiple fields at once', () => {
      const initialCliente = new ClienteInputGroup();
      const { result } = renderHook(() =>
        useFormState({
          initialState: initialCliente
        })
      );

      act(() => {
        result.current.updateFields({
          nome: 'Paolo',
          cognome: 'Verdi',
          email: 'paolo@test.com'
        });
      });

      expect(result.current.formState.nome).toBe('Paolo');
      expect(result.current.formState.cognome).toBe('Verdi');
      expect(result.current.formState.email).toBe('paolo@test.com');
    });

    test('should reset form to initial state', () => {
      const initialCliente = new ClienteInputGroup('Initial', 'State');
      const { result } = renderHook(() =>
        useFormState({
          initialState: initialCliente
        })
      );

      act(() => {
        result.current.updateField('nome', 'Changed');
      });

      expect(result.current.formState.nome).toBe('Changed');
      expect(result.current.isDirty).toBe(true);

      act(() => {
        result.current.resetForm();
      });

      expect(result.current.formState.nome).toBe('Initial');
      expect(result.current.isDirty).toBe(false);
    });

    test('should validate fields when validator provided', () => {
      const initialCliente = new ClienteInputGroup();
      const { result } = renderHook(() =>
        useFormState({
          initialState: initialCliente,
          validation: {
            email: (value) => !!value && value.includes('@')
          }
        })
      );

      act(() => {
        result.current.updateField('email', 'invalid-email');
      });

      expect(result.current.hasErrors).toBe(true);
      expect(result.current.errors.email).toBeDefined();

      act(() => {
        result.current.updateField('email', 'valid@email.com');
      });

      expect(result.current.hasErrors).toBe(false);
      expect(result.current.errors.email).toBeUndefined();
    });
  });

  // ============================================================================
  // PARTECIPANTI MANAGEMENT HOOK TESTS  
  // ============================================================================

  describe('usePartecipantiManagement', () => {
    test('should initialize with empty list', () => {
      const { result } = renderHook(() => usePartecipantiManagement());

      expect(result.current.items).toHaveLength(0);
      expect(result.current.getTotaleQuote()).toBe(0);
      expect(result.current.getTotaleDifferenze()).toBe(0);
    });

    test('should add partecipante correctly', () => {
      const { result } = renderHook(() => usePartecipantiManagement());

      act(() => {
        result.current.addItem();
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toBeInstanceOf(PartecipanteInputGroup);
    });

    test('should update partecipante fields correctly', () => {
      const { result } = renderHook(() => usePartecipantiManagement());

      act(() => {
        result.current.addItem();
      });

      const groupId = result.current.items[0].groupId;

      act(() => {
        result.current.updateItem(groupId, 'nome', 'Mario');
        result.current.updateItem(groupId, 'cognome', 'Rossi');
        result.current.updateItem(groupId, 'tot_quota', '1500.50');
      });

      expect(result.current.items[0].nome).toBe('Mario');
      expect(result.current.items[0].cognome).toBe('Rossi');
      expect(result.current.items[0].tot_quota).toBe(1500.50);
    });

    test('should manage incassi correctly', () => {
      const { result } = renderHook(() => usePartecipantiManagement());

      act(() => {
        result.current.addItem();
      });

      const groupId = result.current.items[0].groupId;
      const testIncasso = new Pagamento('test-1', 'TEST BANK', new Date(), new Date(), 100, 500);

      // Add incasso
      act(() => {
        result.current.addIncassoToItem(groupId, testIncasso);
      });

      expect(result.current.items[0].incassi).toHaveLength(1);
      expect(result.current.items[0].incassi![0].banca).toBe('TEST BANK');

      // Update incasso
      const updatedIncasso = { ...testIncasso, importo_in_euro: 600 };
      act(() => {
        result.current.updateIncassoInItem(groupId, 0, updatedIncasso);
      });

      expect(result.current.items[0].incassi![0].importo_in_euro).toBe(600);

      // Remove incasso
      act(() => {
        result.current.removeIncassoFromItem(groupId, 0);
      });

      expect(result.current.items[0].incassi).toHaveLength(0);
    });

    test('should calculate totals correctly', () => {
      const { result } = renderHook(() => usePartecipantiManagement());

      // Add partecipanti with different quote and incassi
      act(() => {
        result.current.addItem(); // Partecipante 1
        result.current.addItem(); // Partecipante 2
      });

      const groupId1 = result.current.items[0].groupId;
      const groupId2 = result.current.items[1].groupId;

      act(() => {
        // Partecipante 1: quota 1000, incasso 300
        result.current.updateItem(groupId1, 'tot_quota', '1000');
        result.current.addIncassoToItem(groupId1, new Pagamento('1', '', undefined, undefined, undefined, 300));

        // Partecipante 2: quota 1500, incassi 500 + 400 = 900
        result.current.updateItem(groupId2, 'tot_quota', '1500');
        result.current.addIncassoToItem(groupId2, new Pagamento('2', '', undefined, undefined, undefined, 500));
        result.current.addIncassoToItem(groupId2, new Pagamento('3', '', undefined, undefined, undefined, 400));
      });

      // Totale quote: 1000 + 1500 = 2500
      expect(result.current.getTotaleQuote()).toBe(2500);

      // Totale differenze: (1000-300) + (1500-900) = 700 + 600 = 1300
      expect(result.current.getTotaleDifferenze()).toBe(1300);
    });

    test('should handle differenza property correctly', () => {
      const partecipante = new PartecipanteInputGroup(1, 'Test', 'User', 1000);
      
      // Senza incassi
      expect(partecipante.differenza).toBe(1000);

      // Con incassi
      partecipante.incassi = [
        new Pagamento('1', '', undefined, undefined, undefined, 300),
        new Pagamento('2', '', undefined, undefined, undefined, 200)
      ];

      expect(partecipante.differenza).toBe(500); // 1000 - (300 + 200)
    });
  });

  // ============================================================================
  // PREVENTIVO AL CLIENTE MANAGEMENT HOOK TESTS
  // ============================================================================

  describe('usePreventivoAlClienteManagement', () => {
    test('should initialize with empty state', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      expect(result.current.preventivoAlCliente.descrizione_viaggio).toBeUndefined();
      expect(result.current.preventivoAlCliente.righePrimoTipo).toHaveLength(0);
      expect(result.current.preventivoAlCliente.righeSecondoTipo).toHaveLength(0);
      expect(result.current.getTotaleGenerale()).toBe(0);
    });

    test('should update descrizione viaggio', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      act(() => {
        result.current.updateDescrizioneViaggio('Viaggio di nozze a Parigi');
      });

      expect(result.current.preventivoAlCliente.descrizione_viaggio).toBe('Viaggio di nozze a Parigi');
    });

    test('should add and remove rows correctly', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      // Add primo tipo row
      act(() => {
        result.current.addRow('righePrimoTipo');
      });

      expect(result.current.preventivoAlCliente.righePrimoTipo).toHaveLength(1);
      const firstRowId = result.current.preventivoAlCliente.righePrimoTipo[0].groupId;

      // Add secondo tipo row
      act(() => {
        result.current.addRow('righeSecondoTipo');
      });

      expect(result.current.preventivoAlCliente.righeSecondoTipo).toHaveLength(1);

      // Remove primo tipo row
      act(() => {
        result.current.removeRow('righePrimoTipo', firstRowId);
      });

      expect(result.current.preventivoAlCliente.righePrimoTipo).toHaveLength(0);
    });

    test('should update row fields correctly', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      act(() => {
        result.current.addRow('righePrimoTipo');
      });

      const rowId = result.current.preventivoAlCliente.righePrimoTipo[0].groupId;

      act(() => {
        result.current.updateRow('righePrimoTipo', rowId, 'destinazione', 'Roma');
        result.current.updateRow('righePrimoTipo', rowId, 'descrizione', 'Hotel 5 stelle');
        result.current.updateRow('righePrimoTipo', rowId, 'individuale', '150');
        result.current.updateRow('righePrimoTipo', rowId, 'numero', '2');
      });

      const row = result.current.preventivoAlCliente.righePrimoTipo[0];
      expect(row.destinazione).toBe('Roma');
      expect(row.descrizione).toBe('Hotel 5 stelle');
      expect(row.individuale).toBe(150);
      expect(row.numero).toBe(2);
    });

    test('should calculate totals correctly', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      // Add rows to both types
      act(() => {
        result.current.addRow('righePrimoTipo');
        result.current.addRow('righePrimoTipo');
        result.current.addRow('righeSecondoTipo');
      });

      const primoTipoId1 = result.current.preventivoAlCliente.righePrimoTipo[0].groupId;
      const primoTipoId2 = result.current.preventivoAlCliente.righePrimoTipo[1].groupId;
      const secondoTipoId = result.current.preventivoAlCliente.righeSecondoTipo[0].groupId;

      act(() => {
        // Primo tipo: 100*2 + 150*3 = 200 + 450 = 650
        result.current.updateRow('righePrimoTipo', primoTipoId1, 'individuale', '100');
        result.current.updateRow('righePrimoTipo', primoTipoId1, 'numero', '2');
        
        result.current.updateRow('righePrimoTipo', primoTipoId2, 'individuale', '150');
        result.current.updateRow('righePrimoTipo', primoTipoId2, 'numero', '3');

        // Secondo tipo: 200*1 = 200
        result.current.updateRow('righeSecondoTipo', secondoTipoId, 'individuale', '200');
        result.current.updateRow('righeSecondoTipo', secondoTipoId, 'numero', '1');
      });

      expect(result.current.getTotaleRighePrimoTipo()).toBe(650);
      expect(result.current.getTotaleRigheSecondoTipo()).toBe(200);
      expect(result.current.getTotaleGenerale()).toBe(850);
    });

    test('should reset to initial state', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      // Add some data
      act(() => {
        result.current.updateDescrizioneViaggio('Test description');
        result.current.addRow('righePrimoTipo');
      });

      expect(result.current.preventivoAlCliente.descrizione_viaggio).toBe('Test description');
      expect(result.current.preventivoAlCliente.righePrimoTipo).toHaveLength(1);

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.preventivoAlCliente.descrizione_viaggio).toBeUndefined();
      expect(result.current.preventivoAlCliente.righePrimoTipo).toHaveLength(0);
    });

    test('should set full state correctly', () => {
      const { result } = renderHook(() => usePreventivoAlClienteManagement());

      const newState = new PreventivoAlClienteInputGroup(
        'Test viaggio',
        [new PreventivoAlClienteRow(1, 'Milano', 'Hotel', 100, 2)],
        [new PreventivoAlClienteRow(2, 'Roma', 'Volo', 200, 1)]
      );

      act(() => {
        result.current.setFullState(newState);
      });

      expect(result.current.preventivoAlCliente.descrizione_viaggio).toBe('Test viaggio');
      expect(result.current.preventivoAlCliente.righePrimoTipo).toHaveLength(1);
      expect(result.current.preventivoAlCliente.righeSecondoTipo).toHaveLength(1);
      expect(result.current.getTotaleGenerale()).toBe(400); // (100*2) + (200*1) = 400
    });
  });
});
