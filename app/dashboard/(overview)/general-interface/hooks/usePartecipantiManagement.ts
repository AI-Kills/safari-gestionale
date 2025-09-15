import { useDynamicList } from './useDynamicList';
import { PartecipanteInputGroup } from '../general-interface.defs';

// Field type mappings per la conversione automatica
export const PARTECIPANTE_FIELD_TYPES = {
  tot_quota: 'float' as const
};

// Utility per convertire valori in base al tipo
function convertFieldValue(value: any, fieldType: string) {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  switch (fieldType) {
    case 'number':
      return parseInt(value);
    case 'float':
      return parseFloat(value);
    case 'date':
      return new Date(value);
    default:
      return value;
  }
}

// Hook per gestione partecipanti
export function usePartecipantiManagement(initialItems: PartecipanteInputGroup[] = []) {
  const createNewPartecipante = (groupId: number) => new PartecipanteInputGroup(groupId);
  
  const updatePartecipanteField = (item: PartecipanteInputGroup, field: string, value: any) => {
    const updatedItem = { ...item } as any;
    const fieldType = PARTECIPANTE_FIELD_TYPES[field as keyof typeof PARTECIPANTE_FIELD_TYPES];
    updatedItem[field] = convertFieldValue(value, fieldType);
    return updatedItem;
  };

  const dynamicList = useDynamicList({
    initialItems,
    createNewItem: createNewPartecipante,
    updateItemField: updatePartecipanteField
  });

  // Funzioni specifiche per incassi (pagamenti dei partecipanti)
  const addIncassoToItem = (groupId: number, incasso: any) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        return {
          ...item,
          incassi: [...(item.incassi || []), incasso]
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  const updateIncassoInItem = (groupId: number, incassoIndex: number, updatedIncasso: any) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        const newIncassi = [...(item.incassi || [])];
        newIncassi[incassoIndex] = updatedIncasso;
        return {
          ...item,
          incassi: newIncassi
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  const removeIncassoFromItem = (groupId: number, incassoIndex: number) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        const newIncassi = [...(item.incassi || [])];
        newIncassi.splice(incassoIndex, 1);
        return {
          ...item,
          incassi: newIncassi
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  // Calcoli aggregati
  const getTotaleQuote = () => {
    return dynamicList.items.reduce((acc, partecipante) => acc + (partecipante.tot_quota || 0), 0);
  };

  const getTotaleDifferenze = () => {
    return dynamicList.items.reduce((acc, partecipante) => acc + partecipante.differenza, 0);
  };

  return {
    ...dynamicList,
    addIncassoToItem,
    updateIncassoInItem,
    removeIncassoFromItem,
    getTotaleQuote,
    getTotaleDifferenze
  };
}
