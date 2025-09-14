import { useState, useCallback } from 'react';

export interface DynamicListItem {
  groupId: number;
  id?: string;
}

export interface UseDynamicListOptions<T extends DynamicListItem> {
  initialItems?: T[];
  createNewItem: (groupId: number) => T;
  updateItemField: (item: T, field: string, value: any) => T;
  onItemsChange?: (items: T[]) => void;
}

export function useDynamicList<T extends DynamicListItem>({
  initialItems = [],
  createNewItem,
  updateItemField,
  onItemsChange
}: UseDynamicListOptions<T>) {
  const [items, setItems] = useState<T[]>(initialItems);

  // Genera nuovo ID per item
  const generateNewId = useCallback((existingItems: T[]): number => {
    const maxId = Math.max(...existingItems.map(item => Math.max(item.groupId, 0)));
    const baseId = maxId > 0 ? maxId : 0;
    return baseId + 5;
  }, []);

  // Aggiunge nuovo item
  const addItem = useCallback(() => {
    const newId = generateNewId(items);
    const newItem = createNewItem(newId);
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    onItemsChange?.(updatedItems);
  }, [items, createNewItem, generateNewId, onItemsChange]);

  // Rimuove item per groupId
  const removeItem = useCallback((groupId: number) => {
    const updatedItems = items.filter(item => item.groupId !== groupId);
    setItems(updatedItems);
    onItemsChange?.(updatedItems);
  }, [items, onItemsChange]);

  // Aggiorna campo di un item specifico
  const updateItem = useCallback((groupId: number, field: string, value: any) => {
    const updatedItems = items.map(item => {
      if (item.groupId === groupId) {
        return updateItemField(item, field, value);
      }
      return item;
    });
    setItems(updatedItems);
    onItemsChange?.(updatedItems);
  }, [items, updateItemField, onItemsChange]);

  // Sostituisce tutti gli items (utile per load iniziale)
  const setAllItems = useCallback((newItems: T[]) => {
    setItems(newItems);
    onItemsChange?.(newItems);
  }, [onItemsChange]);

  // Pulisce tutti gli items
  const clearItems = useCallback(() => {
    setItems([]);
    onItemsChange?.([]);
  }, [onItemsChange]);

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    setAllItems,
    clearItems,
    itemsCount: items.length
  };
}
