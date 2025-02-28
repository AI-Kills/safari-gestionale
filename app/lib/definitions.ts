// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// #### ENTITIES DEFINITIONS ####
export interface Entity {
  id: string;
}
export interface Destinazione extends Entity {
  id: string;
  nome: string;
}
export interface Banca extends Entity {
  nome: string;
}
export interface Cliente extends Entity {
  nome?: string;
  cognome?: string;
  tel?: string;
  indirizzo?: string;
  CAP?: string;
  citta?: string;
  CF?: string;
  email: string;
  tipo?: 'PRIVATO' | 'AGENZIA VIAGGI' | 'AZIENDA';
  provenienza?: 'Passaparola' | 'Sito IWS' | 'Sito INO' | 'Telefono' | 'Email Diretta' | 'Sito ISE';
  collegato?: string;
  note?: string;
  data_di_nascita?: Date;
  luogo_nascita?: string;
  provincia_nascita?: string;
  numero_passaporto?: string;
  data_scadenza_passaporto?: Date;
  nazionalita?: string;
  provincia?: string;
  sesso?: 'M' | 'F';
}
export interface Fornitore extends Entity {
  nome: string;
  valuta?: string;
}
export interface Preventivo extends Entity {
  id_cliente: string;
  percentuale_ricarico?: number;
  note?: string;
  brand?: string;
  adulti?: number;
  bambini?: number;
  destinazione?: string;
  tipo_viaggio?: 'viaggio di nozze' | 'viaggio di lavoro' | 'altro';
  note_operative?: string;
  riferimento?: string;
  data_partenza?: Date;
  operatore?: string;
  feedback?: string;
  stato?: 'da fare' | 'in trattativa' | 'confermato' | 'inviato';
  data?: Date;
  numero_preventivo?: string;
}
export interface ServizioATerra extends Entity{
  id_preventivo: string;
  id_fornitore: string;
  id_destinazione: string;
  descrizione?: string;
  data?: Date;
  numero_notti?: number;
  totale?: number;
  valuta?: string;
  cambio?: number;
  ricarico?: number;
  servizio_aggiuntivo?: boolean;
}
export interface Volo extends Entity{
  id_preventivo: string;
  id_fornitore: string;
  compagnia_aerea?: string;
  descrizione?: string;
  data_partenza?: Date;
  data_arrivo?: Date;
  totale?: number;
  valuta?: string;
  cambio?: number;
  ricarico?: number;
}
export interface Assicurazione extends Entity{
  id_preventivo: string;
  id_fornitore: string;
  assicurazione?: string;
  netto?: number;
  ricarico?: number;
}
export interface PreventivoAlClienteRow extends Entity{
  id_preventivo_al_cliente: string;
  destinazione?: string;
  senza_assicurazione?: boolean;
  descrizione?: string;
  individuale?: number;
  numero?: number;
}
export interface PreventivoAlCliente extends Entity{
  id_preventivo: string;
  descrizione_viaggio?: string;
  id: string;
  righePrimoTipo: PreventivoAlClienteRow[]; // senza assicurazione
  righeSecondoTipo: PreventivoAlClienteRow[]; // con assicurazione
}
export interface Partecipante extends Entity{
  id_preventivo: string;
  nome?: string;
  cognome?: string;
  tot_quota?: number;
}
export interface Transazione extends Entity{
  id_banca?: string;
  importo?: number;
  data_scadenza?: Date;
  data_incasso?: Date;
}
export interface IncassoPartecipante extends Transazione{
  id_partecipante: string;
}
export interface PagamentoServizioATerra extends Transazione{
  id_servizio_a_terra: string;
}
export interface PagamentoVolo extends Transazione{
  id_volo: string;
}
export interface PagamentoAssicurazione extends Transazione{
  id_assicurazione: string;
}
export interface Pratica extends Entity{
  id_preventivo: string;
  id_cliente: string;
  data_conferma?: Date;
  data_partenza?: Date;
  data_rientro?: Date;
  note?: string;
  numero_passeggeri?: number;
  totale?: number;
}