import { PrismaClient } from '@prisma/client';

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

  // ============================================================================
  // PARTECIPANTE METHODS
  // ============================================================================

  async createPartecipante(data: any) {
    // Validazione di base
    if (!data.id_preventivo) {
      return {
        success: false,
        error: 'ID preventivo is required',
        errors: [{ message: 'ID preventivo è obbligatorio' }]
      };
    }

    if (data.tot_quota !== undefined && data.tot_quota < 0) {
      return {
        success: false,
        error: 'Tot quota must be positive',
        errors: [{ message: 'Totale quota deve essere positivo' }]
      };
    }

    try {
      const partecipante = await testClient.partecipanti.create({
        data: {
          id_preventivo: data.id_preventivo,
          nome: data.nome || null,
          cognome: data.cognome || null,
          tot_quota: data.tot_quota || null
        }
      });
      return {
        success: true,
        data: partecipante
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        errors: [{ message: error.message }]
      };
    }
  }

  async updatePartecipante(data: any) {
    if (!data.id) {
      return {
        success: false,
        error: 'ID is required for update',
        errors: [{ message: "L'ID è obbligatorio" }]
      };
    }

    try {
      const partecipante = await testClient.partecipanti.update({
        where: { id: data.id },
        data: {
          nome: data.nome,
          cognome: data.cognome,
          tot_quota: data.tot_quota
        }
      });
      return {
        success: true,
        data: partecipante
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        errors: [{ message: error.message }]
      };
    }
  }

  async deletePartecipante(id: string) {
    try {
      // Prima elimina gli incassi collegati
      await testClient.incassi_partecipanti.deleteMany({
        where: { id_partecipante: id }
      });

      // Poi elimina il partecipante
      await testClient.partecipanti.delete({
        where: { id }
      });
      return {
        success: true
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        errors: [{ message: error.message }]
      };
    }
  }

  async fetchPartecipantiByPreventivoId(preventivoId: string) {
    try {
      const partecipanti = await testClient.partecipanti.findMany({
        where: { id_preventivo: preventivoId },
        orderBy: [{ cognome: 'asc' }, { nome: 'asc' }]
      });
      return {
        success: true,
        values: partecipanti
      };
    } catch (error: any) {
      return {
        success: false,
        errorsMessage: error.message
      };
    }
  }

  async getAllPartecipanti() {
    return await testClient.partecipanti.findMany({
      orderBy: [{ cognome: 'asc' }, { nome: 'asc' }]
    });
  }

  // ============================================================================
  // INCASSO PARTECIPANTE METHODS
  // ============================================================================

  async createIncassoPartecipante(data: any) {
    // Validazione di base
    if (!data.id_partecipante) {
      return {
        success: false,
        error: 'ID partecipante is required',
        errors: [{ message: 'ID partecipante è obbligatorio' }]
      };
    }

    if (data.importo !== undefined && data.importo < 0) {
      return {
        success: false,
        error: 'Importo must be positive',
        errors: [{ message: 'Importo deve essere positivo' }]
      };
    }

    try {
      const incasso = await testClient.incassi_partecipanti.create({
        data: {
          id_partecipante: data.id_partecipante,
          id_banca: data.id_banca || undefined,
          importo: data.importo || undefined,
          importo_in_valuta: data.importo_in_valuta || undefined,
          data_scadenza: data.data_scadenza || undefined,
          data_incasso: data.data_incasso || undefined
        }
      });
      return {
        success: true,
        data: incasso
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        errors: [{ message: error.message }]
      };
    }
  }

  async updateIncassoPartecipante(data: any) {
    if (!data.id) {
      return {
        success: false,
        error: 'ID is required for update',
        errors: [{ message: "L'ID è obbligatorio" }]
      };
    }

    try {
      const incasso = await testClient.incassi_partecipanti.update({
        where: { id: data.id },
        data: {
          id_banca: data.id_banca,
          importo: data.importo,
          importo_in_valuta: data.importo_in_valuta,
          data_scadenza: data.data_scadenza,
          data_incasso: data.data_incasso
        }
      });
      return {
        success: true,
        data: incasso
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        errors: [{ message: error.message }]
      };
    }
  }

  async deleteIncassoPartecipante(id: string) {
    try {
      await testClient.incassi_partecipanti.delete({
        where: { id }
      });
      return {
        success: true
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        errors: [{ message: error.message }]
      };
    }
  }

  async fetchIncassiPartecipantiByPartecipanteId(partecipanteId: string) {
    try {
      const incassi = await testClient.incassi_partecipanti.findMany({
        where: { id_partecipante: partecipanteId },
        orderBy: { data_scadenza: 'asc' }
      });
      return {
        success: true,
        values: incassi
      };
    } catch (error: any) {
      return {
        success: false,
        errorsMessage: error.message
      };
    }
  }

  async getAllIncassiPartecipanti() {
    return await testClient.incassi_partecipanti.findMany({
      include: {
        partecipanti: true,
        banche: true
      }
    });
  }

  // ============================================================================
  // BANCA METHODS
  // ============================================================================

  async createBanca(data: any) {
    try {
      const banca = await testClient.banca.create({
        data: {
          nome: data.nome
        }
      });
      return {
        success: true,
        data: banca
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updateBanca(data: any) {
    try {
      const banca = await testClient.banca.update({
        where: { id: data.id },
        data: {
          nome: data.nome
        }
      });
      return {
        success: true,
        data: banca
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteBanca(id: string) {
    try {
      await testClient.banca.delete({
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

  async getAllBanche() {
    return await testClient.banca.findMany();
  }

  // ============================================================================
  // PAGAMENTI METHODS
  // ============================================================================

  // PAGAMENTI ASSICURAZIONI
  async createPagamentoAssicurazione(data: any) {
    try {
      const pagamento = await testClient.pagamenti_assicurazioni.create({
        data: {
          id_assicurazione: data.id_assicurazione,
          id_banca: data.id_banca || null,
          importo: data.importo || null,
          data_scadenza: data.data_scadenza || null,
          data_incasso: data.data_incasso || null
        }
      });
      return {
        success: true,
        data: pagamento
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updatePagamentoAssicurazione(data: any) {
    try {
      const pagamento = await testClient.pagamenti_assicurazioni.update({
        where: { id: data.id },
        data: {
          id_banca: data.id_banca,
          importo: data.importo,
          data_scadenza: data.data_scadenza,
          data_incasso: data.data_incasso
        }
      });
      return {
        success: true,
        data: pagamento
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deletePagamentoAssicurazione(id: string) {
    try {
      await testClient.pagamenti_assicurazioni.delete({
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

  async fetchPagamentiAssicurazioniByAssicurazioneId(id_assicurazione: string) {
    try {
      const pagamenti = await testClient.pagamenti_assicurazioni.findMany({
        where: { id_assicurazione },
        include: { banche: true }
      });
      return {
        success: true,
        values: pagamenti
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // PAGAMENTI SERVIZI A TERRA
  async createPagamentoServizioATerra(data: any) {
    try {
      const pagamento = await testClient.pagamenti_servizi_a_terra.create({
        data: {
          id_servizio_a_terra: data.id_servizio_a_terra,
          id_banca: data.id_banca || null,
          importo: data.importo || null,
          data_scadenza: data.data_scadenza || null,
          data_incasso: data.data_incasso || null
        }
      });
      return {
        success: true,
        data: pagamento
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updatePagamentoServizioATerra(data: any) {
    try {
      const pagamento = await testClient.pagamenti_servizi_a_terra.update({
        where: { id: data.id },
        data: {
          id_banca: data.id_banca,
          importo: data.importo,
          data_scadenza: data.data_scadenza,
          data_incasso: data.data_incasso
        }
      });
      return {
        success: true,
        data: pagamento
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deletePagamentoServizioATerra(id: string) {
    try {
      await testClient.pagamenti_servizi_a_terra.delete({
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

  async fetchPagamentiServiziATerraByServizioId(id_servizio_a_terra: string) {
    try {
      const pagamenti = await testClient.pagamenti_servizi_a_terra.findMany({
        where: { id_servizio_a_terra },
        include: { banche: true }
      });
      return {
        success: true,
        values: pagamenti
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // PAGAMENTI VOLI
  async createPagamentoVolo(data: any) {
    try {
      const pagamento = await testClient.pagamenti_voli.create({
        data: {
          id_volo: data.id_volo,
          id_banca: data.id_banca || null,
          importo: data.importo || null,
          data_scadenza: data.data_scadenza || null,
          data_incasso: data.data_incasso || null
        }
      });
      return {
        success: true,
        data: pagamento
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updatePagamentoVolo(data: any) {
    try {
      const pagamento = await testClient.pagamenti_voli.update({
        where: { id: data.id },
        data: {
          id_banca: data.id_banca,
          importo: data.importo,
          data_scadenza: data.data_scadenza,
          data_incasso: data.data_incasso
        }
      });
      return {
        success: true,
        data: pagamento
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deletePagamentoVolo(id: string) {
    try {
      await testClient.pagamenti_voli.delete({
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

  async fetchPagamentiVoliByVoloId(id_volo: string) {
    try {
      const pagamenti = await testClient.pagamenti_voli.findMany({
        where: { id_volo },
        include: { banche: true }
      });
      return {
        success: true,
        values: pagamenti
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // HELPER METHODS FOR PAGAMENTI
  async getAllPagamentiAssicurazioni() {
    return await testClient.pagamenti_assicurazioni.findMany({
      include: {
        assicurazioni: true,
        banche: true
      }
    });
  }

  async getAllPagamentiServiziATerra() {
    return await testClient.pagamenti_servizi_a_terra.findMany({
      include: {
        servizi_a_terra: true,
        banche: true
      }
    });
  }

  async getAllPagamentiVoli() {
    return await testClient.pagamenti_voli.findMany({
      include: {
        voli: true,
        banche: true
      }
    });
  }
}

