import { useState, useCallback } from 'react';
import { 
  PreventivoAlClienteInputGroup, 
  PreventivoAlClienteRow 
} from '../general-interface.defs';

export function usePreventivoAlClienteManagement(
  initialState: PreventivoAlClienteInputGroup = new PreventivoAlClienteInputGroup(undefined, [], [])
) {
  const [preventivoAlCliente, setPreventivoAlCliente] = useState<PreventivoAlClienteInputGroup>(initialState);

  // Genera nuovo ID per riga
  const generateNewId = useCallback((rows: PreventivoAlClienteRow[]): number => {
    const maxId = Math.max(...rows.map(row => Math.max(row.groupId, 0)));
    const baseId = maxId > 0 ? maxId : 0;
    return baseId + 5;
  }, []);

  // Aggiorna descrizione viaggio
  const updateDescrizioneViaggio = useCallback((descrizione: string) => {
    setPreventivoAlCliente(prev => ({
      ...prev,
      descrizione_viaggio: descrizione
    }));
  }, []);

  // Aggiunge nuova riga
  const addRow = useCallback((tipo: 'righePrimoTipo' | 'righeSecondoTipo') => {
    const newId = generateNewId(preventivoAlCliente[tipo]);
    const newRow = new PreventivoAlClienteRow(newId);
    
    setPreventivoAlCliente(prev => ({
      ...prev,
      [tipo]: [...prev[tipo], newRow]
    }));
  }, [preventivoAlCliente, generateNewId]);

  // Rimuove riga
  const removeRow = useCallback((tipo: 'righePrimoTipo' | 'righeSecondoTipo', groupId: number) => {
    setPreventivoAlCliente(prev => ({
      ...prev,
      [tipo]: prev[tipo].filter(row => row.groupId !== groupId)
    }));
  }, []);

  // Aggiorna campo di una riga
  const updateRow = useCallback((
    tipo: 'righePrimoTipo' | 'righeSecondoTipo', 
    groupId: number, 
    field: string, 
    value: any
  ) => {
    setPreventivoAlCliente(prev => ({
      ...prev,
      [tipo]: prev[tipo].map(row => {
        if (row.groupId === groupId) {
          const updatedRow = { ...row } as any;
          
          // Type conversion
          switch (field) {
            case 'individuale':
              updatedRow[field] = parseFloat(value) || 0;
              break;
            case 'numero':
              updatedRow[field] = parseInt(value) || 0;
              break;
            default:
              updatedRow[field] = value;
          }
          
          return updatedRow;
        }
        return row;
      })
    }));
  }, []);

  // Imposta nuovo stato completo
  const setFullState = useCallback((newState: PreventivoAlClienteInputGroup) => {
    setPreventivoAlCliente(newState);
  }, []);

  // Reset allo stato iniziale
  const reset = useCallback(() => {
    setPreventivoAlCliente(initialState);
  }, [initialState]);

  // Calcola totali
  const getTotaleRighePrimoTipo = useCallback(() => {
    return preventivoAlCliente?.righePrimoTipo?.reduce(
      (acc, row) => acc + ((row.individuale || 0) * (row.numero || 0)), 0
    ) || 0;
  }, [preventivoAlCliente]);

  const getTotaleRigheSecondoTipo = useCallback(() => {
    return preventivoAlCliente?.righeSecondoTipo?.reduce(
      (acc, row) => acc + ((row.individuale || 0) * (row.numero || 0)), 0
    ) || 0;
  }, [preventivoAlCliente]);

  const getTotaleGenerale = useCallback(() => {
    return getTotaleRighePrimoTipo() + getTotaleRigheSecondoTipo();
  }, [getTotaleRighePrimoTipo, getTotaleRigheSecondoTipo]);

  return {
    preventivoAlCliente,
    updateDescrizioneViaggio,
    addRow,
    removeRow,
    updateRow,
    setFullState,
    reset,
    getTotaleRighePrimoTipo,
    getTotaleRigheSecondoTipo,
    getTotaleGenerale
  };
}
