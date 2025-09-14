import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import type { ApiResponse, DBResult } from './types';

// Singleton PrismaClient for better performance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Helper function for consistent validation errors
export function handleValidationErrors(zodError: any): ApiResponse {
  const errorMap: Record<string, string[]> = {};
  zodError.issues.forEach((issue: any) => {
    const key = issue.path.join('.');
    if (!errorMap[key]) {
      errorMap[key] = [];
    }
    errorMap[key].push(issue.message);
  });
  
  return {
    success: false,
    errors: errorMap
  };
}

// Helper function for Prisma errors
export function handlePrismaError(error: any): ApiResponse {
  console.error('Prisma error:', error);
  
  if (error.code === 'P2002') {
    return {
      success: false,
      error: 'Un record con questi dati esiste già'
    };
  }
  
  if (error.code === 'P2025') {
    return {
      success: false,
      error: 'Record non trovato'
    };
  }
  
  return {
    success: false,
    error: error.message || 'Errore del database'
  };
}

// Helper function to parse form dates
export function parseFormDates(data: any): any {
  const result = { ...data };
  
  // List of date fields that might be in string format
  const dateFields = [
    'data', 'data_partenza', 'data_arrivo', 'data_di_nascita', 
    'data_scadenza_passaporto', 'data_scadenza', 'data_pagamento'
  ];
  
  dateFields.forEach(field => {
    if (result[field] && typeof result[field] === 'string') {
      const date = new Date(result[field]);
      if (!isNaN(date.getTime())) {
        result[field] = date;
      }
    }
  });
  
  return result;
}

// Helper function to revalidate common paths
export function revalidateCommonPaths() {
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/clienti-table');
  revalidatePath('/dashboard/preventivi-table');
  revalidatePath('/dashboard/general-interface');
}

/**
 * Converte ApiResponse in DBResult per compatibilità con il componente Feedback
 */
export function apiResponseToDBResult<T>(apiResponse: ApiResponse<T>): DBResult<T> {
  if (apiResponse.success) {
    return {
      success: true,
      values: apiResponse.data
    };
  } else {
    const errors: Record<string, string> = {};
    let errorsMessage = apiResponse.error || 'Operazione fallita';
    
    if (apiResponse.errors) {
      if (Array.isArray(apiResponse.errors)) {
        // Handle array format
        apiResponse.errors.forEach((err, index) => {
          errors[`error_${index}`] = err.message;
        });
      } else {
        // Handle record format
        Object.entries(apiResponse.errors).forEach(([key, value]) => {
          errors[key] = Array.isArray(value) ? value.join(', ') : value;
        });
      }
    }
    
    return {
      success: false,
      errors,
      errorsMessage
    };
  }
}
