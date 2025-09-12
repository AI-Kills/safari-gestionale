import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import type { ApiResponse } from './actions';

const prisma = new PrismaClient();

// Generic CRUD operations
export class CrudService<T, CreateT, UpdateT> {
  constructor(
    private model: any,
    private revalidatePaths: string[] = []
  ) {}

  async create(data: CreateT): Promise<ApiResponse<T>> {
    try {
      const result = await this.model.create({ data });
      this.revalidatePaths.forEach(path => revalidatePath(path));
      return { success: true, data: result };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAll(orderBy?: any): Promise<T[]> {
    try {
      return await this.model.findMany({ orderBy });
    } catch (error) {
      console.error('Error fetching records:', error);
      return [];
    }
  }

  async getById(id: string, include?: any): Promise<T | null> {
    try {
      return await this.model.findUnique({ where: { id }, include });
    } catch (error) {
      console.error('Error fetching record:', error);
      return null;
    }
  }

  async update(id: string, data: Partial<UpdateT>): Promise<ApiResponse<T>> {
    try {
      const result = await this.model.update({ where: { id }, data });
      this.revalidatePaths.forEach(path => revalidatePath(path));
      return { success: true, data: result };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(id: string): Promise<ApiResponse> {
    try {
      await this.model.delete({ where: { id } });
      this.revalidatePaths.forEach(path => revalidatePath(path));
      return { success: true };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiResponse {
    console.error('Database error:', error);
    
    if (error.code === 'P2002') {
      return { success: false, error: 'Record già esistente con questi dati unici' };
    }
    if (error.code === 'P2025') {
      return { success: false, error: 'Record non trovato' };
    }
    return { success: false, error: 'Errore del database' };
  }
}

// Servizi specifici per entità
export const clienteService = new CrudService(
  prisma.cliente, 
  ['/dashboard/clienti-table']
);

export const preventivoService = new CrudService(
  prisma.preventivo, 
  ['/dashboard/preventivi-table']
);

export const fornitoreService = new CrudService(
  prisma.fornitore, 
  ['/dashboard']
);

export const destinazioneService = new CrudService(
  prisma.destinazione, 
  ['/dashboard']
);

export const bancaService = new CrudService(
  prisma.banca, 
  ['/dashboard']
);
