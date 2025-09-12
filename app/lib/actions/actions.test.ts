import { PrismaClient } from '../../../generated/prisma-test';
import {
  userSchema,
  createUserSchema,
  updateUserSchema,
  clienteSchema,
  createClienteSchema,
  updateClienteSchema,
  fornitoreSchema,
  createFornitoreSchema,
  updateFornitoreSchema,
  destinazioneSchema,
  createDestinazioneSchema,
  updateDestinazioneSchema,
  bancaSchema,
  createBancaSchema,
  updateBancaSchema,
  preventivoSchema,
  createPreventivoSchema,
  updatePreventivoSchema,
  serviziATerraSchema,
  createServiziATerraSchema,
  updateServiziATerraSchema,
  voloSchema,
  createVoloSchema,
  updateVoloSchema,
  assicurazioneSchema,
  createAssicurazioneSchema,
  updateAssicurazioneSchema,
  preventivoAlClienteSchema,
  createPreventivoAlClienteSchema,
  updatePreventivoAlClienteSchema,
  preventivoAlClienteRowSchema,
  createPreventivoAlClienteRowSchema,
  updatePreventivoAlClienteRowSchema
} from './entity-zod-schemas';

export type TestApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  errors?: Array<{
    code: string
    message: string
    path?: string[]
  }>
}

export class TestActions {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  // Helper function for error handling
  private handleError(error: any): TestApiResponse {
    console.error('Test database error:', error);
    
    if (error.code === 'P2002') {
      return {
        success: false,
        error: 'Record già esistente con questi dati unici'
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
      error: 'Errore del database di test'
    };
  }

  // ============================================================================
  // USER ACTIONS
  // ============================================================================

  async createUser(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = createUserSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const user = await this.prisma.user.create({
        data: validatedData.data
      });

      return { success: true, data: user };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllUsers(): Promise<any[]> {
    try {
      const users = await this.prisma.user.findMany({
        orderBy: { email: 'asc' }
      });
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async updateUser(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = updateUserSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const updateData: any = { ...validatedData.data };
      delete updateData.id;

      const user = await this.prisma.user.update({
        where: { id: validatedData.data.id },
        data: updateData
      });

      return { success: true, data: user };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteUser(id: string): Promise<TestApiResponse> {
    try {
      await this.prisma.user.delete({
        where: { id }
      });

      return { success: true };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // CLIENT ACTIONS
  // ============================================================================

  async createCliente(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = createClienteSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const cliente = await this.prisma.cliente.create({
        data: validatedData.data
      });

      return { success: true, data: cliente };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllClienti(): Promise<any[]> {
    try {
      const clienti = await this.prisma.cliente.findMany({
        orderBy: [
          { cognome: 'asc' },
          { nome: 'asc' }
        ]
      });
      return clienti;
    } catch (error) {
      console.error('Error fetching clienti:', error);
      return [];
    }
  }

  async getCliente(id: string): Promise<any | null> {
    try {
      const cliente = await this.prisma.cliente.findUnique({
        where: { id }
      });
      return cliente;
    } catch (error) {
      console.error('Error fetching cliente:', error);
      return null;
    }
  }

  async updateCliente(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = updateClienteSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const updateData: any = { ...validatedData.data };
      delete updateData.id;

      const cliente = await this.prisma.cliente.update({
        where: { id: validatedData.data.id },
        data: updateData
      });

      return { success: true, data: cliente };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteCliente(id: string): Promise<TestApiResponse> {
    try {
      await this.prisma.cliente.delete({
        where: { id }
      });

      return { success: true };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // FORNITORE ACTIONS
  // ============================================================================

  async createFornitore(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = createFornitoreSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const fornitore = await this.prisma.fornitore.create({
        data: validatedData.data
      });

      return { success: true, data: fornitore };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllFornitori(): Promise<any[]> {
    try {
      const fornitori = await this.prisma.fornitore.findMany({
        orderBy: { nome: 'asc' }
      });
      return fornitori;
    } catch (error) {
      console.error('Error fetching fornitori:', error);
      return [];
    }
  }

  async updateFornitore(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = updateFornitoreSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const updateData: any = { ...validatedData.data };
      delete updateData.id;

      const fornitore = await this.prisma.fornitore.update({
        where: { id: validatedData.data.id },
        data: updateData
      });

      return { success: true, data: fornitore };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteFornitore(id: string): Promise<TestApiResponse> {
    try {
      await this.prisma.fornitore.delete({
        where: { id }
      });

      return { success: true };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // DESTINAZIONE ACTIONS
  // ============================================================================

  async createDestinazione(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = createDestinazioneSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const destinazione = await this.prisma.destinazione.create({
        data: validatedData.data
      });

      return { success: true, data: destinazione };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllDestinazioni(): Promise<any[]> {
    try {
      const destinazioni = await this.prisma.destinazione.findMany({
        orderBy: { nome: 'asc' }
      });
      return destinazioni;
    } catch (error) {
      console.error('Error fetching destinazioni:', error);
      return [];
    }
  }

  async updateDestinazione(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = updateDestinazioneSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const updateData: any = { ...validatedData.data };
      delete updateData.id;

      const destinazione = await this.prisma.destinazione.update({
        where: { id: validatedData.data.id },
        data: updateData
      });

      return { success: true, data: destinazione };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteDestinazione(id: string): Promise<TestApiResponse> {
    try {
      await this.prisma.destinazione.delete({
        where: { id }
      });

      return { success: true };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // BANCA ACTIONS
  // ============================================================================

  async createBanca(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = createBancaSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const banca = await this.prisma.banca.create({
        data: validatedData.data
      });

      return { success: true, data: banca };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllBanche(): Promise<any[]> {
    try {
      const banche = await this.prisma.banca.findMany({
        orderBy: { nome: 'asc' }
      });
      return banche;
    } catch (error) {
      console.error('Error fetching banche:', error);
      return [];
    }
  }

  async updateBanca(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = updateBancaSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const updateData: any = { ...validatedData.data };
      delete updateData.id;

      const banca = await this.prisma.banca.update({
        where: { id: validatedData.data.id },
        data: updateData
      });

      return { success: true, data: banca };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteBanca(id: string): Promise<TestApiResponse> {
    try {
      await this.prisma.banca.delete({
        where: { id }
      });

      return { success: true };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // PREVENTIVO ACTIONS
  // ============================================================================

  async createPreventivo(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = createPreventivoSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const preventivo = await this.prisma.preventivo.create({
        data: validatedData.data
      });

      return { success: true, data: preventivo };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllPreventivi(): Promise<any[]> {
    try {
      const preventivi = await this.prisma.preventivo.findMany({
        orderBy: { data: 'desc' },
        include: {
          cliente: true
        }
      });
      return preventivi;
    } catch (error) {
      console.error('Error fetching preventivi:', error);
      return [];
    }
  }

  async getPreventivo(id: string): Promise<any | null> {
    try {
      const preventivo = await this.prisma.preventivo.findUnique({
        where: { id },
        include: {
          cliente: true,
          serviziATerra: {
            include: {
              fornitore: true,
              destinazione: true
            }
          },
          voli: {
            include: {
              fornitore: true
            }
          },
          assicurazioni: {
            include: {
              fornitore: true
            }
          },
          preventiviAlCliente: {
            include: {
              rows: true
            }
          }
        }
      });
      return preventivo;
    } catch (error) {
      console.error('Error fetching preventivo completo:', error);
      return null;
    }
  }

  async updatePreventivo(data: any): Promise<TestApiResponse> {
    try {
      const validatedData = updatePreventivoSchema.safeParse(data);
      if (!validatedData.success) {
        return {
          success: false,
          errors: validatedData.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path.map(String)
          }))
        };
      }

      const updateData: any = { ...validatedData.data };
      delete updateData.id;

      const preventivo = await this.prisma.preventivo.update({
        where: { id: validatedData.data.id },
        data: updateData
      });

      return { success: true, data: preventivo };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deletePreventivo(id: string): Promise<TestApiResponse> {
    try {
      // Delete related records first due to foreign key constraints
      await this.prisma.$transaction(async (tx) => {
        await tx.preventivoAlClienteRow.deleteMany({
          where: {
            preventivoAlCliente: {
              id_preventivo: id
            }
          }
        });
        
        await tx.preventivoAlCliente.deleteMany({
          where: { id_preventivo: id }
        });
        
        await tx.assicurazione.deleteMany({
          where: { id_preventivo: id }
        });
        
        await tx.volo.deleteMany({
          where: { id_preventivo: id }
        });
        
        await tx.serviziATerra.deleteMany({
          where: { id_preventivo: id }
        });
        
        await tx.preventivo.delete({
          where: { id }
        });
      });

      return { success: true };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ============================================================================
  // UTILITY FUNCTIONS FOR TESTING
  // ============================================================================

  async getClienteByEmail(email: string): Promise<any | null> {
    try {
      const cliente = await this.prisma.cliente.findUnique({
        where: { email }
      });
      return cliente;
    } catch (error) {
      console.error('Error fetching cliente by email:', error);
      return null;
    }
  }

  async getPreventiviByCliente(clienteId: string): Promise<any[]> {
    try {
      const preventivi = await this.prisma.preventivo.findMany({
        where: { id_cliente: clienteId },
        orderBy: { data: 'desc' }
      });
      return preventivi;
    } catch (error) {
      console.error('Error fetching preventivi by cliente:', error);
      return [];
    }
  }

  async getFornitoreByNome(nome: string): Promise<any | null> {
    try {
      const fornitore = await this.prisma.fornitore.findUnique({
        where: { nome }
      });
      return fornitore;
    } catch (error) {
      console.error('Error fetching fornitore by nome:', error);
      return null;
    }
  }

  async getDestinazioneByNome(nome: string): Promise<any | null> {
    try {
      const destinazione = await this.prisma.destinazione.findUnique({
        where: { nome }
      });
      return destinazione;
    } catch (error) {
      console.error('Error fetching destinazione by nome:', error);
      return null;
    }
  }

  // Complex business logic testing methods
  async complexPreventivoWorkflow(clienteData: any, preventivoData: any): Promise<TestApiResponse> {
    try {
      // Create cliente first
      const clienteResult = await this.createCliente(clienteData);
      if (!clienteResult.success) {
        return clienteResult;
      }

      // Create preventivo with cliente ID
      const preventivoWithCliente = {
        ...preventivoData,
        id_cliente: clienteResult.data.id
      };

      const preventivoResult = await this.createPreventivo(preventivoWithCliente);
      if (!preventivoResult.success) {
        return preventivoResult;
      }

      // Return both created records
      return {
        success: true,
        data: {
          cliente: clienteResult.data,
          preventivo: preventivoResult.data
        }
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Test data validation methods
  async validateClienteUniqueness(email: string): Promise<boolean> {
    try {
      const existingCliente = await this.getClienteByEmail(email);
      return existingCliente === null;
    } catch (error) {
      console.error('Error validating cliente uniqueness:', error);
      return false;
    }
  }

  async validateFornitoreUniqueness(nome: string): Promise<boolean> {
    try {
      const existingFornitore = await this.getFornitoreByNome(nome);
      return existingFornitore === null;
    } catch (error) {
      console.error('Error validating fornitore uniqueness:', error);
      return false;
    }
  }

  async validateDestinazioneUniqueness(nome: string): Promise<boolean> {
    try {
      const existingDestinazione = await this.getDestinazioneByNome(nome);
      return existingDestinazione === null;
    } catch (error) {
      console.error('Error validating destinazione uniqueness:', error);
      return false;
    }
  }
} 