"use server";

import { prisma, handlePrismaError } from './helpers';
import type { ApiResponse } from './types';

export async function addFundamentalEntity(entityType: string, value: string): Promise<ApiResponse> {
  try {
    // Gestisce l'aggiunta di entità fondamentali (destinazioni, fornitori, banche)
    // Trasforma il valore stringa in un oggetto con la proprietà 'nome'
    const entityData = { nome: value };

    let result;
    switch (entityType.toLowerCase()) {
      case 'fornitore':
      case 'fornitori':
        result = await prisma.fornitore.create({ data: entityData });
        break;
      case 'destinazione':
      case 'destinazioni':
        result = await prisma.destinazione.create({ data: entityData });
        break;
      case 'banca':
      case 'banche':
        result = await prisma.banca.create({ data: entityData });
        break;
      default:
        return {
          success: false,
          error: `Tipo di entità non supportato: ${entityType}`
        };
    }

    return { success: true, data: result };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function setOptionsJson(entityType: string, options: string[]): Promise<ApiResponse> {
  try {
    // Questa funzione gestisce l'impostazione delle opzioni per entità dinamiche
    // Per ora restituiamo un placeholder che indica che la funzione è da implementare
    console.log(`setOptionsJson called for ${entityType} with options:`, options);
    
    return {
      success: true,
      data: { entityType, options, message: 'Funzione setOptionsJson da implementare completamente' }
    };
  } catch (error) {
    return {
      success: false,
      error: `Errore in setOptionsJson: ${error.toString()}`
    };
  }
}
