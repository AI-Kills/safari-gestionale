import { PrismaClient } from '@prisma/client';
import * as actions from '../app/lib/actions';

// Mock del client Prisma per i test
let testClient: PrismaClient;

export class TestActionsHelper {
  private originalPrisma: any;

  constructor(client: PrismaClient) {
    testClient = client;
  }

  // Mock del modulo prisma per usare il client di test
  setupMocks() {
    // Salva il riferimento originale
    const helpersModule = require('../app/lib/actions/utils/helpers');
    this.originalPrisma = helpersModule.prisma;
    
    // Sostituisci con il client di test
    helpersModule.prisma = testClient;
  }

  // Ripristina il client originale
  restoreMocks() {
    if (this.originalPrisma) {
      const helpersModule = require('../app/lib/actions/utils/helpers');
      helpersModule.prisma = this.originalPrisma;
    }
  }

  // Wrapper per le actions che usano il client di test
  async createUser(data: any) {
    this.setupMocks();
    try {
      return await actions.createUser(data);
    } finally {
      this.restoreMocks();
    }
  }

  async updateUser(data: any) {
    this.setupMocks();
    try {
      return await actions.updateUser(data);
    } finally {
      this.restoreMocks();
    }
  }

  async deleteUser(id: string) {
    this.setupMocks();
    try {
      return await actions.deleteUser(id);
    } finally {
      this.restoreMocks();
    }
  }

  async createCliente(data: any) {
    this.setupMocks();
    try {
      return await actions.createCliente(data);
    } finally {
      this.restoreMocks();
    }
  }

  async updateCliente(data: any) {
    this.setupMocks();
    try {
      return await actions.updateCliente(data);
    } finally {
      this.restoreMocks();
    }
  }

  async deleteCliente(id: string) {
    this.setupMocks();
    try {
      return await actions.deleteCliente(id);
    } finally {
      this.restoreMocks();
    }
  }

  async searchClienti(data: any) {
    this.setupMocks();
    try {
      return await actions.searchClienti(data);
    } finally {
      this.restoreMocks();
    }
  }

  async createPreventivo(data: any) {
    this.setupMocks();
    try {
      return await actions.createPreventivo(data);
    } finally {
      this.restoreMocks();
    }
  }

  async updatePreventivo(data: any) {
    this.setupMocks();
    try {
      return await actions.updatePreventivo(data);
    } finally {
      this.restoreMocks();
    }
  }

  async deletePreventivo(id: string) {
    this.setupMocks();
    try {
      return await actions.deletePreventivo(id);
    } finally {
      this.restoreMocks();
    }
  }

  async fetchPreventiviByIdCliente(clienteId: string) {
    this.setupMocks();
    try {
      return await actions.fetchPreventiviByIdCliente(clienteId);
    } finally {
      this.restoreMocks();
    }
  }

  async getNumberOfPreventivi() {
    this.setupMocks();
    try {
      return await actions.getNumberOfPreventivi();
    } finally {
      this.restoreMocks();
    }
  }

  async submitCreatePreventivoGI(data: any) {
    this.setupMocks();
    try {
      return await actions.submitCreatePreventivoGI(data);
    } finally {
      this.restoreMocks();
    }
  }

  async createDestinazione(data: any) {
    this.setupMocks();
    try {
      return await actions.createDestinazione(data);
    } finally {
      this.restoreMocks();
    }
  }

  async updateDestinazione(data: any) {
    this.setupMocks();
    try {
      return await actions.updateDestinazione(data);
    } finally {
      this.restoreMocks();
    }
  }

  async deleteDestinazione(id: string) {
    this.setupMocks();
    try {
      return await actions.deleteDestinazione(id);
    } finally {
      this.restoreMocks();
    }
  }

  async getDestinazioneById(id: string) {
    this.setupMocks();
    try {
      return await actions.getDestinazioneById(id);
    } finally {
      this.restoreMocks();
    }
  }

  async createFornitore(data: any) {
    this.setupMocks();
    try {
      return await actions.createFornitore(data);
    } finally {
      this.restoreMocks();
    }
  }

  async updateFornitore(data: any) {
    this.setupMocks();
    try {
      return await actions.updateFornitore(data);
    } finally {
      this.restoreMocks();
    }
  }

  async deleteFornitore(id: string) {
    this.setupMocks();
    try {
      return await actions.deleteFornitore(id);
    } finally {
      this.restoreMocks();
    }
  }

  async getFornitoreById(id: string) {
    this.setupMocks();
    try {
      return await actions.getFornitoreById(id);
    } finally {
      this.restoreMocks();
    }
  }

  async createServizioATerra(data: any, preventivoId: string, isServizioAggiuntivo: boolean) {
    this.setupMocks();
    try {
      return await actions.createServizioATerra(data, preventivoId, isServizioAggiuntivo);
    } finally {
      this.restoreMocks();
    }
  }

  async updateServizioATerra(data: any) {
    this.setupMocks();
    try {
      return await actions.updateServizioATerra(data);
    } finally {
      this.restoreMocks();
    }
  }

  async deleteServizioATerraById(id: string) {
    this.setupMocks();
    try {
      return await actions.deleteServizioATerraById(id);
    } finally {
      this.restoreMocks();
    }
  }

  async fetchServiziATerraByPreventivoId(preventivoId: string) {
    this.setupMocks();
    try {
      return await actions.fetchServiziATerraByPreventivoId(preventivoId);
    } finally {
      this.restoreMocks();
    }
  }

  async fetchServiziAggiuntiviByPreventivoId(preventivoId: string) {
    this.setupMocks();
    try {
      return await actions.fetchServiziAggiuntiviByPreventivoId(preventivoId);
    } finally {
      this.restoreMocks();
    }
  }

  async fetchServizioATerraById(id: string) {
    this.setupMocks();
    try {
      return await actions.fetchServizioATerraById(id);
    } finally {
      this.restoreMocks();
    }
  }

  async createVolo(data: any) {
    this.setupMocks();
    try {
      return await actions.createVolo(data);
    } finally {
      this.restoreMocks();
    }
  }

  async updateVolo(data: any) {
    this.setupMocks();
    try {
      return await actions.updateVolo(data);
    } finally {
      this.restoreMocks();
    }
  }

  async deleteVoloById(id: string) {
    this.setupMocks();
    try {
      return await actions.deleteVoloById(id);
    } finally {
      this.restoreMocks();
    }
  }

  async fetchVoliByPreventivoId(preventivoId: string) {
    this.setupMocks();
    try {
      return await actions.fetchVoliByPreventivoId(preventivoId);
    } finally {
      this.restoreMocks();
    }
  }

  async fetchVoloById(id: string) {
    this.setupMocks();
    try {
      return await actions.fetchVoloById(id);
    } finally {
      this.restoreMocks();
    }
  }

  async createAssicurazione(data: any) {
    this.setupMocks();
    try {
      return await actions.createAssicurazione(data);
    } finally {
      this.restoreMocks();
    }
  }

  async updateAssicurazione(data: any) {
    this.setupMocks();
    try {
      return await actions.updateAssicurazione(data);
    } finally {
      this.restoreMocks();
    }
  }

  async deleteAssicurazioneById(id: string) {
    this.setupMocks();
    try {
      return await actions.deleteAssicurazioneById(id);
    } finally {
      this.restoreMocks();
    }
  }

  async fetchAssicurazioniByPreventivoId(preventivoId: string) {
    this.setupMocks();
    try {
      return await actions.fetchAssicurazioniByPreventivoId(preventivoId);
    } finally {
      this.restoreMocks();
    }
  }

  async fetchAssicurazioneById(id: string) {
    this.setupMocks();
    try {
      return await actions.fetchAssicurazioneById(id);
    } finally {
      this.restoreMocks();
    }
  }

  async fetchPreventivoAlClienteByPreventivoId(preventivoId: string) {
    this.setupMocks();
    try {
      return await actions.fetchPreventivoAlClienteByPreventivoId(preventivoId);
    } finally {
      this.restoreMocks();
    }
  }

  async updatePreventivoAlClienteDescrizione(data: any) {
    this.setupMocks();
    try {
      return await actions.updatePreventivoAlClienteDescrizione(data);
    } finally {
      this.restoreMocks();
    }
  }

  async updatePreventivoAlClienteRow(data: any) {
    this.setupMocks();
    try {
      return await actions.updatePreventivoAlClienteRow(data);
    } finally {
      this.restoreMocks();
    }
  }

  async deletePreventivoAlClienteRowById(id: string) {
    this.setupMocks();
    try {
      return await actions.deletePreventivoAlClienteRowById(id);
    } finally {
      this.restoreMocks();
    }
  }

  async createPreventivoAlClienteRow(data: any) {
    this.setupMocks();
    try {
      return await actions.createPreventivoAlClienteRow(data);
    } finally {
      this.restoreMocks();
    }
  }

  // Helper methods per accesso diretto al database di test
  async getTestClient() {
    return testClient;
  }

  async getAllUsers() {
    return await testClient.user.findMany();
  }

  async getAllClienti() {
    return await testClient.cliente.findMany();
  }

  async getAllPreventivi() {
    return await testClient.preventivo.findMany({
      include: {
        cliente: true
      }
    });
  }

  async getAllDestinazioni() {
    return await testClient.destinazione.findMany();
  }

  async getAllFornitori() {
    return await testClient.fornitore.findMany();
  }

  async getAllServiziATerra() {
    return await testClient.serviziATerra.findMany({
      include: {
        preventivo: true,
        destinazione: true,
        fornitore: true
      }
    });
  }

  async getAllVoli() {
    return await testClient.volo.findMany({
      include: {
        preventivo: true,
        fornitore: true
      }
    });
  }

  async getAllAssicurazioni() {
    return await testClient.assicurazione.findMany({
      include: {
        preventivo: true,
        fornitore: true
      }
    });
  }

  async getAllPreventiviAlCliente() {
    return await testClient.preventivoAlCliente.findMany({
      include: {
        preventivo: true,
        rows: true
      }
    });
  }
}
