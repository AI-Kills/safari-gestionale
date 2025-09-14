import { useState, useCallback } from 'react';

export interface UseFormStateOptions<T> {
  initialState: T;
  onFieldChange?: (field: keyof T, value: any, fullState: T) => void;
  validation?: Partial<Record<keyof T, (value: any) => boolean>>;
}

export interface FormFieldConfig {
  type: 'string' | 'number' | 'float' | 'date' | 'boolean';
  required?: boolean;
}

export function useFormState<T extends Record<string, any>>({
  initialState,
  onFieldChange,
  validation = {}
}: UseFormStateOptions<T>) {
  const [formState, setFormState] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  // Converte valore in base al tipo
  const convertValue = useCallback((value: any, fieldType?: FormFieldConfig['type']): any => {
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
      case 'boolean':
        return Boolean(value);
      case 'string':
      default:
        return value;
    }
  }, []);

  // Valida un campo specifico
  const validateField = useCallback((field: keyof T, value: any): string | null => {
    const validator = validation[field];
    if (validator && !validator(value)) {
      return `Il campo ${String(field)} non è valido`;
    }
    return null;
  }, [validation]);

  // Aggiorna un singolo campo
  const updateField = useCallback((
    field: keyof T, 
    value: any, 
    fieldType?: FormFieldConfig['type']
  ) => {
    const convertedValue = convertValue(value, fieldType);
    const error = validateField(field, convertedValue);
    
    setFormState(prevState => {
      const newState = { ...prevState, [field]: convertedValue };
      onFieldChange?.(field, convertedValue, newState);
      return newState;
    });

    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: error || undefined }));
  }, [convertValue, validateField, onFieldChange]);

  // Aggiorna multipli campi
  const updateFields = useCallback((updates: Partial<T>) => {
    setFormState(prevState => {
      const newState = { ...prevState, ...updates };
      Object.keys(updates).forEach(key => {
        onFieldChange?.(key as keyof T, updates[key as keyof T], newState);
      });
      return newState;
    });
  }, [onFieldChange]);

  // Reset form allo stato iniziale
  const resetForm = useCallback(() => {
    setFormState(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  // Imposta nuovo stato completo
  const setFullState = useCallback((newState: T) => {
    setFormState(newState);
    setErrors({});
    setTouched({});
  }, []);

  // Crea handler per onChange degli input
  const createFieldHandler = useCallback((
    field: keyof T, 
    fieldType?: FormFieldConfig['type']
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      updateField(field, e.target.value, fieldType);
    };
  }, [updateField]);

  // Verifica se il form ha errori
  const hasErrors = Object.values(errors).some(error => error !== undefined);
  
  // Verifica se il form è stato modificato
  const isDirty = JSON.stringify(formState) !== JSON.stringify(initialState);

  return {
    formState,
    errors,
    touched,
    hasErrors,
    isDirty,
    updateField,
    updateFields,
    resetForm,
    setFullState,
    createFieldHandler
  };
}
