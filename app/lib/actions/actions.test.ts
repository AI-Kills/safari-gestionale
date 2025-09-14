import { PrismaClient } from '../../../generated/prisma-test';
import { 
  createClienteSchema, 
  updateClienteSchema,
  createPreventivoSchema,
  updatePreventivoSchema,
  createDestinazioneSchema,
  updateDestinazioneSchema,
  createFornitoreSchema,
  updateFornitoreSchema,
  createBancaSchema,
  updateBancaSchema,
  createUserSchema,
  updateUserSchema
} from './entity-zod-schemas';

export class TestActions {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  // ==================== USER OPERATIONS ====================
  async createUser(data: any) {
    const validatedData = createUserSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const user = await this.prisma.user.create({
      data: validatedData.data
    });

    return { success: true, data: user };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: [{ name: 'asc' }]
    });

    return users;
  }

  async updateUser(data: any) {
    const validatedData = updateUserSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const user = await this.prisma.user.update({
      where: { id: data.id },
      data: validatedData.data
    });

    return { success: true, data: user };
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: { id }
    });
    return { success: true };
  }

  // ==================== CLIENTE OPERATIONS ====================
  async createCliente(data: any) {
    const validatedData = createClienteSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const cliente = await this.prisma.cliente.create({
      data: validatedData.data
    });

    return { success: true, data: cliente };
  }

  async getAllClienti() {
    const clienti = await this.prisma.cliente.findMany({
      orderBy: [{ cognome: 'asc' }, { nome: 'asc' }]
    });

    return clienti;
  }

  async updateCliente(data: any) {
    const validatedData = updateClienteSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const cliente = await this.prisma.cliente.update({
      where: { id: data.id },
      data: validatedData.data
    });

    return { success: true, data: cliente };
  }

  async deleteCliente(id: string) {
    await this.prisma.cliente.delete({
      where: { id }
    });
    return { success: true };
  }

  // ==================== PREVENTIVO OPERATIONS ====================
  async createPreventivo(data: any) {
    const validatedData = createPreventivoSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const preventivo = await this.prisma.preventivo.create({
      data: validatedData.data
    });

    return { success: true, data: preventivo };
  }

  async getAllPreventivi() {
    const preventivi = await this.prisma.preventivo.findMany({
      include: {
        cliente: true
      },
      orderBy: { data: 'desc' }
    });

    return preventivi;
  }

  async updatePreventivo(data: any) {
    const validatedData = updatePreventivoSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const preventivo = await this.prisma.preventivo.update({
      where: { id: data.id },
      data: validatedData.data
    });

    return { success: true, data: preventivo };
  }

  async deletePreventivo(id: string) {
    await this.prisma.preventivo.delete({
      where: { id }
    });
    return { success: true };
  }

  // ==================== DESTINAZIONE OPERATIONS ====================
  async createDestinazione(data: any) {
    const validatedData = createDestinazioneSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const destinazione = await this.prisma.destinazione.create({
      data: validatedData.data
    });

    return { success: true, data: destinazione };
  }

  async getAllDestinazioni() {
    const destinazioni = await this.prisma.destinazione.findMany({
      orderBy: { nome: 'asc' }
    });

    return destinazioni;
  }

  async updateDestinazione(data: any) {
    const validatedData = updateDestinazioneSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const destinazione = await this.prisma.destinazione.update({
      where: { id: data.id },
      data: validatedData.data
    });

    return { success: true, data: destinazione };
  }

  async deleteDestinazione(id: string) {
    await this.prisma.destinazione.delete({
      where: { id }
    });
    return { success: true };
  }

  // ==================== FORNITORE OPERATIONS ====================
  async createFornitore(data: any) {
    const validatedData = createFornitoreSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const fornitore = await this.prisma.fornitore.create({
      data: validatedData.data
    });

    return { success: true, data: fornitore };
  }

  async getAllFornitori() {
    const fornitori = await this.prisma.fornitore.findMany({
      orderBy: { nome: 'asc' }
    });

    return fornitori;
  }

  async updateFornitore(data: any) {
    const validatedData = updateFornitoreSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const fornitore = await this.prisma.fornitore.update({
      where: { id: data.id },
      data: validatedData.data
    });

    return { success: true, data: fornitore };
  }

  async deleteFornitore(id: string) {
    await this.prisma.fornitore.delete({
      where: { id }
    });
    return { success: true };
  }

  // ==================== BANCA OPERATIONS ====================
  async createBanca(data: any) {
    const validatedData = createBancaSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const banca = await this.prisma.banca.create({
      data: validatedData.data
    });

    return { success: true, data: banca };
  }

  async getAllBanche() {
    const banche = await this.prisma.banca.findMany({
      orderBy: { nome: 'asc' }
    });

    return banche;
  }

  async updateBanca(data: any) {
    const validatedData = updateBancaSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.issues };
    }

    const banca = await this.prisma.banca.update({
      where: { id: data.id },
      data: validatedData.data
    });

    return { success: true, data: banca };
  }

  async deleteBanca(id: string) {
    await this.prisma.banca.delete({
      where: { id }
    });
    return { success: true };
  }

  // ==================== COMPLEX BUSINESS LOGIC ====================
  async createPreventivoWithDetails(data: {
    cliente: any;
    preventivo: any;
    servizi?: any[];
    voli?: any[];
    assicurazioni?: any[];
  }) {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Crea o trova cliente
      let cliente;
      if (data.cliente.id) {
        cliente = await tx.cliente.findUnique({ where: { id: data.cliente.id } });
      } else {
        cliente = await tx.cliente.create({ data: data.cliente });
      }

      // 2. Crea preventivo
      const preventivo = await tx.preventivo.create({
        data: {
          ...data.preventivo,
          id_cliente: cliente!.id
        }
      });

      // 3. Crea servizi collegati se presenti
      if (data.servizi && data.servizi.length > 0) {
        for (const servizio of data.servizi) {
          await tx.serviziATerra.create({
            data: {
              ...servizio,
              id_preventivo: preventivo.id
            }
          });
        }
      }

      // 4. Crea voli collegati se presenti
      if (data.voli && data.voli.length > 0) {
        for (const volo of data.voli) {
          await tx.volo.create({
            data: {
              ...volo,
              id_preventivo: preventivo.id
            }
          });
        }
      }

      // 5. Crea assicurazioni collegate se presenti
      if (data.assicurazioni && data.assicurazioni.length > 0) {
        for (const assicurazione of data.assicurazioni) {
          await tx.assicurazione.create({
            data: {
              ...assicurazione,
              id_preventivo: preventivo.id
            }
          });
        }
      }

      return { success: true, data: { preventivo, cliente } };
    });
  }

  async getPreventivoCompleto(id: string) {
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
        partecipanti: true,
        pratiche: true
      }
    });

    return preventivo;
  }
}
