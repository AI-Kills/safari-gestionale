import { useDynamicList, DynamicListItem } from './useDynamicList';
import { 
  ServizioATerraInputGroup, 
  VoloInputGroup, 
  AssicurazioneInputGroup 
} from '../general-interface.defs';

// Field type mappings per la conversione automatica
export const SERVIZIO_FIELD_TYPES = {
  numero_notti: 'number' as const,
  numero_camere: 'number' as const,
  totale: 'float' as const,
  cambio: 'float' as const,
  data: 'date' as const
};

export const VOLO_FIELD_TYPES = {
  totale: 'float' as const,
  ricarico: 'float' as const,
  cambio: 'float' as const,
  numero: 'number' as const,
  data_partenza: 'date' as const,
  data_arrivo: 'date' as const
};

export const ASSICURAZIONE_FIELD_TYPES = {
  netto: 'float' as const,
  ricarico: 'float' as const,
  numero: 'number' as const
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

// Hook per gestione servizi a terra
export function useServiziATerraManagement(initialItems: ServizioATerraInputGroup[] = []) {
  const createNewServizio = (groupId: number) => new ServizioATerraInputGroup(groupId);
  
  const updateServizioField = (item: ServizioATerraInputGroup, field: string, value: any) => {
    const updatedItem = { ...item } as any;
    const fieldType = SERVIZIO_FIELD_TYPES[field as keyof typeof SERVIZIO_FIELD_TYPES];
    updatedItem[field] = convertFieldValue(value, fieldType);
    return updatedItem;
  };

  const dynamicList = useDynamicList({
    initialItems,
    createNewItem: createNewServizio,
    updateItemField: updateServizioField
  });

  // Funzioni specifiche per pagamenti
  const addPagamentoToItem = (groupId: number, pagamento: any) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        return {
          ...item,
          pagamenti: [...(item.pagamenti || []), pagamento]
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  const updatePagamentoInItem = (groupId: number, pagamentoIndex: number, updatedPagamento: any) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        const newPagamenti = [...(item.pagamenti || [])];
        newPagamenti[pagamentoIndex] = updatedPagamento;
        return {
          ...item,
          pagamenti: newPagamenti
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  const removePagamentoFromItem = (groupId: number, pagamentoIndex: number) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        const newPagamenti = [...(item.pagamenti || [])];
        newPagamenti.splice(pagamentoIndex, 1);
        return {
          ...item,
          pagamenti: newPagamenti
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  return {
    ...dynamicList,
    addPagamentoToItem,
    updatePagamentoInItem,
    removePagamentoFromItem
  };
}

// Hook per gestione voli
export function useVoliManagement(initialItems: VoloInputGroup[] = []) {
  const createNewVolo = (groupId: number) => new VoloInputGroup(groupId);
  
  const updateVoloField = (item: VoloInputGroup, field: string, value: any) => {
    const updatedItem = { ...item } as any;
    const fieldType = VOLO_FIELD_TYPES[field as keyof typeof VOLO_FIELD_TYPES];
    updatedItem[field] = convertFieldValue(value, fieldType);
    return updatedItem;
  };

  const dynamicList = useDynamicList({
    initialItems,
    createNewItem: createNewVolo,
    updateItemField: updateVoloField
  });

  // Funzioni specifiche per pagamenti
  const addPagamentoToItem = (groupId: number, pagamento: any) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        return {
          ...item,
          pagamenti: [...(item.pagamenti || []), pagamento]
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  const updatePagamentoInItem = (groupId: number, pagamentoIndex: number, updatedPagamento: any) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        const newPagamenti = [...(item.pagamenti || [])];
        newPagamenti[pagamentoIndex] = updatedPagamento;
        return {
          ...item,
          pagamenti: newPagamenti
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  const removePagamentoFromItem = (groupId: number, pagamentoIndex: number) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        const newPagamenti = [...(item.pagamenti || [])];
        newPagamenti.splice(pagamentoIndex, 1);
        return {
          ...item,
          pagamenti: newPagamenti
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  return {
    ...dynamicList,
    addPagamentoToItem,
    updatePagamentoInItem,
    removePagamentoFromItem
  };
}

// Hook per gestione assicurazioni
export function useAssicurazioniManagement(initialItems: AssicurazioneInputGroup[] = []) {
  const createNewAssicurazione = (groupId: number) => new AssicurazioneInputGroup(groupId);
  
  const updateAssicurazioneField = (item: AssicurazioneInputGroup, field: string, value: any) => {
    const updatedItem = { ...item } as any;
    const fieldType = ASSICURAZIONE_FIELD_TYPES[field as keyof typeof ASSICURAZIONE_FIELD_TYPES];
    updatedItem[field] = convertFieldValue(value, fieldType);
    return updatedItem;
  };

  return useDynamicList({
    initialItems,
    createNewItem: createNewAssicurazione,
    updateItemField: updateAssicurazioneField
  });
}

// Hook per gestione servizi aggiuntivi (riusa la logica dei servizi a terra)
export function useServiziAggiuntiviManagement(initialItems: ServizioATerraInputGroup[] = []) {
  const createNewServizioAggiuntivo = (groupId: number) => 
    new ServizioATerraInputGroup(groupId, undefined, undefined, undefined, undefined, 0, 0, undefined, 0, 0, true);
  
  const updateServizioAggiuntivoField = (item: ServizioATerraInputGroup, field: string, value: any) => {
    const updatedItem = { ...item } as any;
    const fieldType = SERVIZIO_FIELD_TYPES[field as keyof typeof SERVIZIO_FIELD_TYPES];
    updatedItem[field] = convertFieldValue(value, fieldType);
    return updatedItem;
  };

  const dynamicList = useDynamicList({
    initialItems,
    createNewItem: createNewServizioAggiuntivo,
    updateItemField: updateServizioAggiuntivoField
  });

  // Funzioni specifiche per pagamenti
  const addPagamentoToItem = (groupId: number, pagamento: any) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        return {
          ...item,
          pagamenti: [...(item.pagamenti || []), pagamento]
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  const updatePagamentoInItem = (groupId: number, pagamentoIndex: number, updatedPagamento: any) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        const newPagamenti = [...(item.pagamenti || [])];
        newPagamenti[pagamentoIndex] = updatedPagamento;
        return {
          ...item,
          pagamenti: newPagamenti
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  const removePagamentoFromItem = (groupId: number, pagamentoIndex: number) => {
    const updatedItems = dynamicList.items.map(item => {
      if (item.groupId === groupId) {
        const newPagamenti = [...(item.pagamenti || [])];
        newPagamenti.splice(pagamentoIndex, 1);
        return {
          ...item,
          pagamenti: newPagamenti
        };
      }
      return item;
    });
    dynamicList.setAllItems(updatedItems);
  };

  return {
    ...dynamicList,
    addPagamentoToItem,
    updatePagamentoInItem,
    removePagamentoFromItem
  };
}
