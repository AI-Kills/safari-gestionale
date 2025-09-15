import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useDynamicList, DynamicListItem } from '../app/dashboard/(overview)/general-interface/hooks/useDynamicList';

interface TestItem extends DynamicListItem {
  name: string;
  value: number;
}

const createTestItem = (groupId: number): TestItem => ({
  groupId,
  name: `Item ${groupId}`,
  value: 0
});

const updateTestItemField = (item: TestItem, field: string, value: any): TestItem => {
  const updatedItem = { ...item };
  if (field === 'value') {
    updatedItem.value = parseInt(value) || 0;
  } else {
    updatedItem[field as keyof TestItem] = value;
  }
  return updatedItem;
};

describe('useDynamicList', () => {
  test('should initialize with empty list', () => {
    const { result } = renderHook(() =>
      useDynamicList({
        createNewItem: createTestItem,
        updateItemField: updateTestItemField
      })
    );

    expect(result.current.items).toEqual([]);
    expect(result.current.itemsCount).toBe(0);
  });

  test('should add new item', () => {
    const { result } = renderHook(() =>
      useDynamicList({
        createNewItem: createTestItem,
        updateItemField: updateTestItemField
      })
    );

    act(() => {
      result.current.addItem();
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].groupId).toBe(5);
    expect(result.current.items[0].name).toBe('Item 5');
  });

  test('should remove item by groupId', () => {
    const initialItems = [createTestItem(5), createTestItem(10)];
    
    const { result } = renderHook(() =>
      useDynamicList({
        initialItems,
        createNewItem: createTestItem,
        updateItemField: updateTestItemField
      })
    );

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.removeItem(5);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].groupId).toBe(10);
  });

  test('should update item field', () => {
    const initialItems = [createTestItem(5)];
    
    const { result } = renderHook(() =>
      useDynamicList({
        initialItems,
        createNewItem: createTestItem,
        updateItemField: updateTestItemField
      })
    );

    act(() => {
      result.current.updateItem(5, 'name', 'Updated Name');
    });

    expect(result.current.items[0].name).toBe('Updated Name');

    act(() => {
      result.current.updateItem(5, 'value', '42');
    });

    expect(result.current.items[0].value).toBe(42);
  });

  test('should clear all items', () => {
    const initialItems = [createTestItem(5), createTestItem(10)];
    
    const { result } = renderHook(() =>
      useDynamicList({
        initialItems,
        createNewItem: createTestItem,
        updateItemField: updateTestItemField
      })
    );

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.clearItems();
    });

    expect(result.current.items).toHaveLength(0);
  });

  test('should call onItemsChange callback', () => {
    const onItemsChange = vi.fn();
    
    const { result } = renderHook(() =>
      useDynamicList({
        createNewItem: createTestItem,
        updateItemField: updateTestItemField,
        onItemsChange
      })
    );

    act(() => {
      result.current.addItem();
    });

    expect(onItemsChange).toHaveBeenCalledWith([expect.objectContaining({ groupId: 5 })]);
  });

  test('should generate incremental IDs', () => {
    const { result } = renderHook(() =>
      useDynamicList({
        createNewItem: createTestItem,
        updateItemField: updateTestItemField
      })
    );

    act(() => {
      result.current.addItem();
      result.current.addItem();
      result.current.addItem();
    });

    expect(result.current.items).toHaveLength(3);
    expect(result.current.items[0].groupId).toBe(5);
    expect(result.current.items[1].groupId).toBe(10);
    expect(result.current.items[2].groupId).toBe(15);
  });
});
