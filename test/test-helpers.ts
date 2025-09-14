import { PrismaClient } from '../generated/prisma-test';

// Mock del client Prisma per i test
let testClient: PrismaClient;

export class TestActionsHelper {
  constructor(client: PrismaClient) {
    testClient = client;
  }

  // Wrapper per le actions che usano il client di test
  async createUser(data: any) {
    // Validazione di base
    if (!data.email || !data.email.includes('@')) {
      return {
        success: false,
        error: 'Invalid email format',
        errors: { email: ['Invalid email format'] }
      };
    }
    
    if (!data.password || data.password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters',
        errors: { password: ['Password must be at least 6 characters'] }
      };
    }

    try {
      const user = await testClient.user.create({
        data: {
          name: data.name || `${data.email.split('@')[0]}`,
          email: data.email,
          password: data.password // In produzione sarebbe hashata
        }
      });
      return {
        success: true,
        data: user
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        errors: { general: error.message }
      };
    }
  }

  async updateUser(data: any) {
    try {
      const user = await testClient.user.update({
        where: { id: data.id },
        data: {
          name: data.name,
          email: data.email
        }
      });
      return {
        success: true,
        data: user
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteUser(id: string) {
    try {
      await testClient.user.delete({
        where: { id }
      });
      return {
        success: true,
        data: { id }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createCliente(data: any) {
    // Validazione di base
    if (!data.email || !data.email.includes('@')) {
      return {
        success: false,
        error: 'Invalid email format',
        errors: { email: ['Invalid email format'] }
      };
    }

    try {
      const cliente = await testClient.cliente.create({
        data: {
          nome: data.nome,
          cognome: data.cognome,
          email: data.email,
          tel: data.tel,
          citta: data.citta
        }
      });
      return {
        success: true,
        data: cliente
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        errors: { general: error.message }
      };
    }
  }

  async updateCliente(data: any) {
    try {
      const cliente = await testClient.cliente.update({
        where: { id: data.id },
        data: {
          nome: data.nome,
          cognome: data.cognome,
          email: data.email,
          tel: data.tel,
          citta: data.citta
        }
      });
      return {
        success: true,
        data: cliente
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteCliente(id: string) {
    try {
      await testClient.cliente.delete({
        where: { id }
      });
      return {
        success: true,
        data: { id }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async searchClienti(data: any) {
    try {
      const clienti = await testClient.cliente.findMany({
        where: {
          nome: data.nome ? { contains: data.nome } : undefined,
          cognome: data.cognome ? { contains: data.cognome } : undefined,
          email: data.email ? { contains: data.email } : undefined,
          citta: data.citta ? { contains: data.citta } : undefined
        }
      });
      return {
        success: true,
        data: clienti
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createPreventivo(data: any) {
    try {
      const preventivo = await testClient.preventivo.create({
        data: {
          id_cliente: data.id_cliente,
          brand: data.brand,
          operatore: data.operatore,
          destinazione: data.destinazione,
          adulti: data.adulti,
          bambini: data.bambini,
          percentuale_ricarico: data.percentuale_ricarico,
          numero_preventivo: data.numero_preventivo
        }
      });
      return {
        success: true,
        data: preventivo
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updatePreventivo(data: any) {
    try {
      const preventivo = await testClient.preventivo.update({
        where: { id: data.id },
        data: {
          brand: data.brand,
          operatore: data.operatore,
          destinazione: data.destinazione,
          adulti: data.adulti,
          bambini: data.bambini,
          percentuale_ricarico: data.percentuale_ricarico
        }
      });
      return {
        success: true,
        data: preventivo
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deletePreventivo(id: string) {
    try {
      await testClient.preventivo.delete({
        where: { id }
      });
      return {
        success: true,
        data: { id }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async fetchPreventiviByIdCliente(clienteId: string) {
    try {
      const preventivi = await testClient.preventivo.findMany({
        where: { id_cliente: clienteId },
        include: { cliente: true }
      });
      return {
        success: true,
        values: preventivi
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getNumberOfPreventivi() {
    try {
      const count = await testClient.preventivo.count();
      return {
        success: true,
        values: count
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async submitCreatePreventivoGI(data: any) {
    return this.createPreventivo(data);
  }

  async createDestinazione(data: any) {
    try {
      const destinazione = await testClient.destinazione.create({
        data: {
          nome: data.nome
        }
      });
      return {
        success: true,
        data: destinazione
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updateDestinazione(data: any) {
    try {
      const destinazione = await testClient.destinazione.update({
        where: { id: data.id },
        data: {
          nome: data.nome
        }
      });
      return {
        success: true,
        data: destinazione
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteDestinazione(id: string) {
    try {
      await testClient.destinazione.delete({
        where: { id }
      });
      return {
        success: true,
        data: { id }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getDestinazioneById(id: string) {
    try {
      const destinazione = await testClient.destinazione.findUnique({
        where: { id }
      });
      return {
        success: true,
        values: destinazione
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createFornitore(data: any) {
    try {
      const fornitore = await testClient.fornitore.create({
        data: {
          nome: data.nome,
          valuta: data.valuta || 'EUR'
        }
      });
      return {
        success: true,
        data: fornitore
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updateFornitore(data: any) {
    try {
      const fornitore = await testClient.fornitore.update({
        where: { id: data.id },
        data: {
          nome: data.nome,
          valuta: data.valuta
        }
      });
      return {
        success: true,
        data: fornitore
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteFornitore(id: string) {
    try {
      await testClient.fornitore.delete({
        where: { id }
      });
      return {
        success: true,
        data: { id }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getFornitoreById(id: string) {
    try {
      const fornitore = await testClient.fornitore.findUnique({
        where: { id }
      });
      return {
        success: true,
        values: fornitore
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
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

  // ============================================================================
  // ASSICURAZIONE METHODS
  // ============================================================================

  async createAssicurazione(data: any) {
    try {
      const assicurazione = await testClient.assicurazione.create({
        data: {
          id_preventivo: data.id_preventivo,
          id_fornitore: data.id_fornitore,
          assicurazione: data.tipo, // Campo corretto è 'assicurazione', non 'tipo'
          netto: data.costo, // Campo corretto è 'netto', non 'costo'
          ricarico: data.ricarico,
          numero: data.numero
        }
      });
      return {
        success: true,
        data: assicurazione
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updateAssicurazione(data: any) {
    try {
      const assicurazione = await testClient.assicurazione.update({
        where: { id: data.id },
        data: {
          assicurazione: data.tipo,
          netto: data.costo,
          ricarico: data.ricarico,
          numero: data.numero
        }
      });
      return {
        success: true,
        data: assicurazione
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteAssicurazioneById(id: string) {
    try {
      await testClient.assicurazione.delete({
        where: { id }
      });
      return {
        success: true,
        data: { id }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async fetchAssicurazioniByPreventivoId(preventivoId: string) {
    try {
      const assicurazioni = await testClient.assicurazione.findMany({
        where: { id_preventivo: preventivoId },
        include: { preventivo: true, fornitore: true }
      });
      return {
        success: true,
        values: assicurazioni
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async fetchAssicurazioneById(id: string) {
    try {
      const assicurazione = await testClient.assicurazione.findUnique({
        where: { id }
      });
      return {
        success: true,
        values: assicurazione
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // ============================================================================
  // VOLO METHODS
  // ============================================================================

  async createVolo(data: any) {
    try {
      const volo = await testClient.volo.create({
        data: {
          id_preventivo: data.id_preventivo,
          id_fornitore: data.id_fornitore,
          compagnia_aerea: data.tratta, // Usiamo compagnia_aerea invece di tratta
          totale: data.costo, // Campo corretto è 'totale', non 'costo'
          descrizione: data.descrizione,
          ricarico: data.ricarico,
          numero: data.numero
        }
      });
      return {
        success: true,
        data: volo
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updateVolo(data: any) {
    try {
      const volo = await testClient.volo.update({
        where: { id: data.id },
        data: {
          compagnia_aerea: data.tratta,
          totale: data.costo,
          descrizione: data.descrizione,
          ricarico: data.ricarico,
          numero: data.numero
        }
      });
      return {
        success: true,
        data: volo
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteVoloById(id: string) {
    try {
      await testClient.volo.delete({
        where: { id }
      });
      return {
        success: true,
        data: { id }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async fetchVoliByPreventivoId(preventivoId: string) {
    try {
      const voli = await testClient.volo.findMany({
        where: { id_preventivo: preventivoId },
        include: { preventivo: true, fornitore: true }
      });
      return {
        success: true,
        values: voli
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async fetchVoloById(id: string) {
    try {
      const volo = await testClient.volo.findUnique({
        where: { id }
      });
      return {
        success: true,
        values: volo
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // ============================================================================
  // SERVIZI A TERRA METHODS
  // ============================================================================

  async createServizioATerra(data: any, preventivoId: string, isServizioAggiuntivo: boolean) {
    try {
      const servizio = await testClient.serviziATerra.create({
        data: {
          id_preventivo: data.id_preventivo || preventivoId,
          id_fornitore: data.id_fornitore,
          id_destinazione: data.id_destinazione,
          descrizione: data.tipo || data.descrizione, // Campo corretto è 'descrizione'
          totale: data.costo, // Campo corretto è 'totale', non 'costo'
          servizio_aggiuntivo: isServizioAggiuntivo, // Campo corretto è 'servizio_aggiuntivo'
          numero_notti: data.numero_notti,
          numero_camere: data.numero_camere,
          ricarico: data.ricarico
        }
      });
      return {
        success: true,
        data: servizio
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updateServizioATerra(data: any) {
    try {
      const servizio = await testClient.serviziATerra.update({
        where: { id: data.id },
        data: {
          descrizione: data.tipo || data.descrizione,
          totale: data.costo,
          numero_notti: data.numero_notti,
          numero_camere: data.numero_camere,
          ricarico: data.ricarico
        }
      });
      return {
        success: true,
        data: servizio
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteServizioATerraById(id: string) {
    try {
      await testClient.serviziATerra.delete({
        where: { id }
      });
      return {
        success: true,
        data: { id }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async fetchServiziATerraByPreventivoId(preventivoId: string) {
    try {
      const servizi = await testClient.serviziATerra.findMany({
        where: { 
          id_preventivo: preventivoId,
          servizio_aggiuntivo: false
        },
        include: { preventivo: true, fornitore: true, destinazione: true }
      });
      return {
        success: true,
        values: servizi
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async fetchServiziAggiuntiviByPreventivoId(preventivoId: string) {
    try {
      const servizi = await testClient.serviziATerra.findMany({
        where: { 
          id_preventivo: preventivoId,
          servizio_aggiuntivo: true
        },
        include: { preventivo: true, fornitore: true, destinazione: true }
      });
      return {
        success: true,
        values: servizi
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async fetchServizioATerraById(id: string) {
    try {
      const servizio = await testClient.serviziATerra.findUnique({
        where: { id }
      });
      return {
        success: true,
        values: servizio
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // ============================================================================
  // PREVENTIVI AL CLIENTE METHODS (placeholder)
  // ============================================================================
  
  async fetchPreventivoAlClienteByPreventivoId() { return { success: false, error: 'Not implemented' }; }
  async updatePreventivoAlClienteDescrizione() { return { success: false, error: 'Not implemented' }; }
  async updatePreventivoAlClienteRow() { return { success: false, error: 'Not implemented' }; }
  async deletePreventivoAlClienteRowById() { return { success: false, error: 'Not implemented' }; }
  async createPreventivoAlClienteRow() { return { success: false, error: 'Not implemented' }; }

  // ============================================================================
  // HELPER METHODS FOR DIRECT ACCESS
  // ============================================================================

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

  async getAllPreventiviAlCliente() { return []; }
}

