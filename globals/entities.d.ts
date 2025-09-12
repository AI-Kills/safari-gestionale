declare global {
  // Database Entity Types (from Prisma)
  type UserType = {
    id: string
    email: string
    password: string
  }

  type DestinazioneType = {
    id: string
    nome: string
  }

  type BancaType = {
    id: string
    nome: string
  }

  type ClienteType = {
    id: string
    nome?: string | null
    cognome?: string | null
    tel?: string | null
    indirizzo?: string | null
    CAP?: string | null
    citta?: string | null
    CF?: string | null
    email: string
    tipo?: string | null
    provenienza?: string | null
    collegato?: string | null
    note?: string | null
    data_di_nascita?: Date | null
    luogo_nascita?: string | null
    provincia_nascita?: string | null
    numero_passaporto?: string | null
    data_scadenza_passaporto?: Date | null
    nazionalita?: string | null
    provincia?: string | null
    sesso?: string | null
  }

  type FornitoreType = {
    id: string
    nome: string
    valuta?: string | null
  }

  type PreventivoType = {
    id: string
    id_cliente: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data: Date
    numero_preventivo?: string | null
  }

  type ServiziATerraType = {
    id: string
    id_preventivo: string
    id_fornitore?: string | null
    id_destinazione?: string | null
    descrizione?: string | null
    data?: Date | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
  }

  type VoloType = {
    id: string
    id_preventivo: string
    id_fornitore?: string | null
    compagnia_aerea?: string | null
    descrizione?: string | null
    data_partenza?: Date | null
    data_arrivo?: Date | null
    totale?: number | null
    ricarico?: number | null
    numero?: number | null
    valuta?: string | null
    cambio?: number | null
  }

  type AssicurazioneType = {
    id: string
    id_preventivo: string
    id_fornitore?: string | null
    assicurazione?: string | null
    netto?: number | null
    ricarico?: number | null
    numero?: number | null
  }

  type PreventivoAlClienteType = {
    id: string
    id_preventivo?: string | null
    descrizione_viaggio?: string | null
  }

  type PreventivoAlClienteRowType = {
    id: string
    id_preventivo_al_cliente: string
    senza_assicurazione?: boolean | null
    destinazione?: string | null
    descrizione?: string | null
    individuale?: number | null
    numero?: number | null
  }

  // Combined types for relational data
  type ClienteWithPreventivi = ClienteType & {
    preventivi: PreventivoType[]
  }

  type PreventivoCompleto = PreventivoType & {
    cliente: ClienteType
    serviziATerra: ServiziATerraType[]
    voli: VoloType[]
    assicurazioni: AssicurazioneType[]
    preventiviAlCliente: PreventivoAlClienteType[]
  }

  // Form data types for creation/update
  type CreateClienteData = Omit<ClienteType, 'id'>
  type UpdateClienteData = Partial<CreateClienteData> & { id: string }

  type CreatePreventivoData = Omit<PreventivoType, 'id' | 'data'>
  type UpdatePreventivoData = Partial<CreatePreventivoData> & { id: string }

  type CreateFornitoreData = Omit<FornitoreType, 'id'>
  type UpdateFornitoreData = Partial<CreateFornitoreData> & { id: string }

  type CreateDestinazioneData = Omit<DestinazioneType, 'id'>
  type UpdateDestinazioneData = Partial<CreateDestinazioneData> & { id: string }

  type CreateBancaData = Omit<BancaType, 'id'>
  type UpdateBancaData = Partial<CreateBancaData> & { id: string }
} 