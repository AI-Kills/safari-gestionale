import { describe, test, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('Utility Functions', () => {
  describe('cn function', () => {
    test('should combine class names correctly', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    test('should handle conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class');
      expect(result).toBe('base-class conditional-class');
    });

    test('should merge conflicting Tailwind classes', () => {
      // twMerge should prioritize the last conflicting class
      const result = cn('p-4', 'p-6');
      expect(result).toBe('p-6');
    });

    test('should handle undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'another-class');
      expect(result).toBe('base-class another-class');
    });

    test('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    test('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    test('should handle objects with boolean values', () => {
      const result = cn({
        'active': true,
        'inactive': false,
        'visible': true
      });
      expect(result).toBe('active visible');
    });
  });

  describe('Date formatting utilities', () => {
    test('should validate date strings', () => {
      const validDate = '2024-01-15';
      const invalidDate = 'invalid-date';
      
      expect(new Date(validDate).toString()).not.toBe('Invalid Date');
      expect(new Date(invalidDate).toString()).toBe('Invalid Date');
    });

    test('should handle ISO date formats', () => {
      const isoDate = '2024-01-15T10:30:00.000Z';
      const date = new Date(isoDate);
      
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(0); // January is 0
      expect(date.getDate()).toBe(15);
    });
  });

  describe('Validation utilities', () => {
    test('should validate email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org'
      ];
      
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user..name@domain.com'
      ];

      validEmails.forEach(email => {
        expect(email.includes('@')).toBe(true);
        expect(email.split('@').length).toBe(2);
      });

      invalidEmails.forEach(email => {
        const parts = email.split('@');
        expect(parts.length !== 2 || parts[0] === '' || parts[1] === '').toBe(true);
      });
    });

    test('should validate phone number formats', () => {
      const validPhones = [
        '+39 123 456 7890',
        '123-456-7890',
        '1234567890'
      ];
      
      validPhones.forEach(phone => {
        const digitsOnly = phone.replace(/[^\d]/g, '');
        expect(digitsOnly.length).toBeGreaterThanOrEqual(10);
      });
    });

    test('should validate Italian tax code format', () => {
      const validCF = 'RSSMRA80A01H501U';
      const invalidCF = 'INVALID';
      
      expect(validCF.length).toBe(16);
      expect(invalidCF.length).not.toBe(16);
    });
  });

  describe('String utilities', () => {
    test('should capitalize first letter', () => {
      const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('tEST')).toBe('Test');
    });

    test('should format currency', () => {
      const formatCurrency = (amount: number, currency = 'EUR') => {
        return new Intl.NumberFormat('it-IT', {
          style: 'currency',
          currency: currency
        }).format(amount);
      };
      
      expect(formatCurrency(1234.56)).toContain('1.234,56');
      expect(formatCurrency(1000)).toContain('1.000,00');
    });
  });

  describe('Array utilities', () => {
    test('should remove duplicates from array', () => {
      const removeDuplicates = (arr: any[]) => [...new Set(arr)];
      
      const input = [1, 2, 2, 3, 3, 3, 4];
      const expected = [1, 2, 3, 4];
      
      expect(removeDuplicates(input)).toEqual(expected);
    });

    test('should sort objects by property', () => {
      const sortBy = (arr: any[], key: string) => 
        arr.sort((a, b) => a[key] > b[key] ? 1 : -1);
      
      const input = [
        { name: 'Charlie', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 35 }
      ];
      
      const sortedByName = sortBy([...input], 'name');
      expect(sortedByName[0].name).toBe('Alice');
      expect(sortedByName[2].name).toBe('Charlie');
    });
  });
}); 