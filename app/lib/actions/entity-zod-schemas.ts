import { z } from "zod";

// User schemas
export const userSchema = z.object({
  id: z.string().min(1, { message: "L'ID è obbligatorio" }),
  name: z.string().max(255, { message: "Nome troppo lungo" }).optional().nullable(),
  email: z.string().email({ message: "Email non valida" }).max(255, { message: "Email troppo lunga" }),
  password: z.string().min(6, { message: "Password deve essere di almeno 6 caratteri" }).max(255, { message: "Password troppo lunga" })
});

export const createUserSchema = userSchema.omit({ id: true }).extend({
  email: z.string().email({ message: "Email non valida" }).max(255, { message: "Email troppo lunga" }),
  password: z.string().min(6, { message: "Password deve essere di almeno 6 caratteri" }).max(255, { message: "Password troppo lunga" })
});
export const updateUserSchema = userSchema.partial().extend({
  id: z.string().min(1, { message: "L'ID è obbligatorio" })
});

// Destinazione schemas
export const destinazioneSchema = z.object({
  id: z.string().min(1, { message: "L'ID è obbligatorio" }),
  nome: z.string().min(1, { message: "Il nome è obbligatorio" }).max(255, { message: "Nome troppo lungo" })
});

export const createDestinazioneSchema = destinazioneSchema.omit({ id: true });
export const updateDestinazioneSchema = destinazioneSchema.partial().extend({
  id: z.string().min(1, { message: "L'ID è obbligatorio" })
});

// Banca schemas
export const bancaSchema = z.object({
  id: z.string().min(1, { message: "L'ID è obbligatorio" }),
  nome: z.string().min(1, { message: "Il nome è obbligatorio" }).max(255, { message: "Nome troppo lungo" })
});

export const createBancaSchema = bancaSchema.omit({ id: true });
export const updateBancaSchema = bancaSchema.partial().extend({
  id: z.string().min(1, { message: "L'ID è obbligatorio" })
});

// Cliente schemas
export const clienteSchema = z.object({
  id: z.string().min(1, { message: "L'ID è obbligatorio" }),
  nome: z.string().max(255, { message: "Nome troppo lungo" }).optional().nullable(),
  cognome: z.string().max(255, { message: "Cognome troppo lungo" }).optional().nullable(),
  tel: z.string().max(20, { message: "Telefono troppo lungo" }).optional().nullable(),
  indirizzo: z.string().max(255, { message: "Indirizzo troppo lungo" }).optional().nullable(),
  cap: z.string().max(10, { message: "CAP troppo lungo" }).optional().nullable(),
  citta: z.string().max(255, { message: "Città troppo lunga" }).optional().nullable(),
  cf: z.string().max(16, { message: "Codice fiscale troppo lungo" }).optional().nullable(),
  email: z.string().email({ message: "Email non valida" }).max(255, { message: "Email troppo lunga" }),
  tipo: z.string().max(20, { message: "Tipo troppo lungo" }).optional().nullable(),
  provenienza: z.string().max(20, { message: "Provenienza troppo lunga" }).optional().nullable(),
  collegato: z.string().max(255, { message: "Collegato troppo lungo" }).optional().nullable(),
  note: z.string().optional().nullable(),
  data_di_nascita: z.date({ message: "Data di nascita non valida" }).optional().nullable(),
  luogo_nascita: z.string().max(255, { message: "Luogo di nascita troppo lungo" }).optional().nullable(),
  provincia_nascita: z.string().max(2, { message: "Provincia di nascita deve essere 2 caratteri" }).optional().nullable(),
  numero_passaporto: z.string().max(50, { message: "Numero passaporto troppo lungo" }).optional().nullable(),
  data_scadenza_passaporto: z.date({ message: "Data scadenza passaporto non valida" }).optional().nullable(),
  nazionalita: z.string().max(100, { message: "Nazionalità troppo lunga" }).optional().nullable(),
  provincia: z.string().max(2, { message: "Provincia deve essere 2 caratteri" }).optional().nullable(),
  sesso: z.string().max(1, { message: "Sesso deve essere 1 carattere" }).optional().nullable()
});

export const createClienteSchema = clienteSchema.omit({ id: true });
export const updateClienteSchema = clienteSchema.partial().extend({
  id: z.string().min(1, { message: "L'ID è obbligatorio" })
});

// Fornitore schemas
export const fornitoreSchema = z.object({
  id: z.string().min(1, { message: "L'ID è obbligatorio" }),
  nome: z.string().min(1, { message: "Il nome è obbligatorio" }).max(255, { message: "Nome troppo lungo" }),
  valuta: z.string().max(10, { message: "Valuta troppo lunga" }).optional().nullable()
});

export const createFornitoreSchema = fornitoreSchema.omit({ id: true });
export const updateFornitoreSchema = fornitoreSchema.partial().extend({
  id: z.string().min(1, { message: "L'ID è obbligatorio" })
});

// Preventivo schemas
export const preventivoSchema = z.object({
  id: z.string().min(1, { message: "L'ID è obbligatorio" }),
  id_cliente: z.string().min(1, { message: "ID cliente è obbligatorio" }),
  percentuale_ricarico: z.number().min(0, { message: "Percentuale ricarico deve essere positiva" }).optional().nullable(),
  note: z.string().optional().nullable(),
  brand: z.string().max(255, { message: "Brand troppo lungo" }).optional().nullable(),
  adulti: z.number().int().min(0, { message: "Numero adulti deve essere positivo" }).optional().nullable(),
  bambini: z.number().int().min(0, { message: "Numero bambini deve essere positivo" }).optional().nullable(),
  destinazione: z.string().max(255, { message: "Destinazione troppo lunga" }).optional().nullable(),
  tipo_viaggio: z.string().max(50, { message: "Tipo viaggio troppo lungo" }).optional().nullable(),
  note_operative: z.string().optional().nullable(),
  riferimento: z.string().max(255, { message: "Riferimento troppo lungo" }).optional().nullable(),
  data_partenza: z.date({ message: "Data partenza non valida" }).optional().nullable(),
  operatore: z.string().max(255, { message: "Operatore troppo lungo" }).optional().nullable(),
  feedback: z.string().optional().nullable(),
  stato: z.string().max(20, { message: "Stato troppo lungo" }).optional().nullable(),
  data: z.date({ message: "Data non valida" }),
  numero_preventivo: z.string().max(255, { message: "Numero preventivo troppo lungo" }).optional().nullable()
});

export const createPreventivoSchema = preventivoSchema.omit({ id: true, data: true }).extend({
  id_cliente: z.string().min(1, { message: "ID cliente è obbligatorio" })
});
export const updatePreventivoSchema = preventivoSchema.partial().extend({
  id: z.string().min(1, { message: "L'ID è obbligatorio" })
});

// ServiziATerra schemas
export const serviziATerraSchema = z.object({
  id: z.string().min(1, { message: "L'ID è obbligatorio" }),
  id_preventivo: z.string().min(1, { message: "ID preventivo è obbligatorio" }),
  id_fornitore: z.string().optional().nullable(),
  id_destinazione: z.string().optional().nullable(),
  descrizione: z.string().optional().nullable(),
  data: z.date({ message: "Data non valida" }).optional().nullable(),
  numero_notti: z.number().int().min(0, { message: "Numero notti deve essere positivo" }).optional().nullable(),
  numero_camere: z.number().int().min(0, { message: "Numero camere deve essere positivo" }).optional().nullable(),
  totale: z.number().min(0, { message: "Totale deve essere positivo" }).optional().nullable(),
  valuta: z.string().max(10, { message: "Valuta troppo lunga" }).optional().nullable(),
  cambio: z.number().min(0, { message: "Cambio deve essere positivo" }).optional().nullable(),
  ricarico: z.number().min(0, { message: "Ricarico deve essere positivo" }).optional().nullable(),
  servizio_aggiuntivo: z.boolean().optional().nullable()
});

export const createServiziATerraSchema = serviziATerraSchema.omit({ id: true }).extend({
  id_preventivo: z.string().min(1, { message: "ID preventivo è obbligatorio" })
});
export const updateServiziATerraSchema = serviziATerraSchema.partial().extend({
  id: z.string().min(1, { message: "L'ID è obbligatorio" })
});

// Volo schemas
export const voloSchema = z.object({
  id: z.string().min(1, { message: "L'ID è obbligatorio" }),
  id_preventivo: z.string().min(1, { message: "ID preventivo è obbligatorio" }),
  id_fornitore: z.string().optional().nullable(),
  compagnia_aerea: z.string().max(255, { message: "Compagnia aerea troppo lunga" }).optional().nullable(),
  descrizione: z.string().optional().nullable(),
  data_partenza: z.date({ message: "Data partenza non valida" }).optional().nullable(),
  data_arrivo: z.date({ message: "Data arrivo non valida" }).optional().nullable(),
  totale: z.number().min(0, { message: "Totale deve essere positivo" }).optional().nullable(),
  ricarico: z.number().min(0, { message: "Ricarico deve essere positivo" }).optional().nullable(),
  numero: z.number().int().min(0, { message: "Numero deve essere positivo" }).optional().nullable(),
  valuta: z.string().max(10, { message: "Valuta troppo lunga" }).optional().nullable(),
  cambio: z.number().min(0, { message: "Cambio deve essere positivo" }).optional().nullable()
});

export const createVoloSchema = voloSchema.omit({ id: true }).extend({
  id_preventivo: z.string().min(1, { message: "ID preventivo è obbligatorio" })
});
export const updateVoloSchema = voloSchema.partial().extend({
  id: z.string().min(1, { message: "L'ID è obbligatorio" })
});

// Assicurazione schemas
export const assicurazioneSchema = z.object({
  id: z.string().min(1, { message: "L'ID è obbligatorio" }),
  id_preventivo: z.string().min(1, { message: "ID preventivo è obbligatorio" }),
  id_fornitore: z.string().optional().nullable(),
  assicurazione: z.string().max(255, { message: "Assicurazione troppo lunga" }).optional().nullable(),
  netto: z.number().min(0, { message: "Netto deve essere positivo" }).optional().nullable(),
  ricarico: z.number().min(0, { message: "Ricarico deve essere positivo" }).optional().nullable(),
  numero: z.number().int().min(0, { message: "Numero deve essere positivo" }).optional().nullable()
});

export const createAssicurazioneSchema = assicurazioneSchema.omit({ id: true }).extend({
  id_preventivo: z.string().min(1, { message: "ID preventivo è obbligatorio" })
});
export const updateAssicurazioneSchema = assicurazioneSchema.partial().extend({
  id: z.string().min(1, { message: "L'ID è obbligatorio" })
});

// PreventivoAlCliente schemas
export const preventivoAlClienteSchema = z.object({
  id: z.string().min(1, { message: "L'ID è obbligatorio" }),
  id_preventivo: z.string().optional().nullable(),
  descrizione_viaggio: z.string().optional().nullable()
});

export const createPreventivoAlClienteSchema = preventivoAlClienteSchema.omit({ id: true });
export const updatePreventivoAlClienteSchema = preventivoAlClienteSchema.partial().extend({
  id: z.string().min(1, { message: "L'ID è obbligatorio" })
});

// PreventivoAlClienteRow schemas
export const preventivoAlClienteRowSchema = z.object({
  id: z.string().min(1, { message: "L'ID è obbligatorio" }),
  id_preventivo_al_cliente: z.string().min(1, { message: "ID preventivo al cliente è obbligatorio" }),
  senza_assicurazione: z.boolean().optional().nullable(),
  destinazione: z.string().max(255, { message: "Destinazione troppo lunga" }).optional().nullable(),
  descrizione: z.string().optional().nullable(),
  individuale: z.number().min(0, { message: "Individuale deve essere positivo" }).optional().nullable(),
  numero: z.number().int().min(0, { message: "Numero deve essere positivo" }).optional().nullable(),
  is_primo_tipo: z.boolean().optional().nullable()
});

export const createPreventivoAlClienteRowSchema = preventivoAlClienteRowSchema.omit({ id: true }).extend({
  id_preventivo_al_cliente: z.string().min(1, { message: "ID preventivo al cliente è obbligatorio" })
});
export const updatePreventivoAlClienteRowSchema = preventivoAlClienteRowSchema.partial().extend({
  id: z.string().min(1, { message: "L'ID è obbligatorio" })
});

// Combined schemas for complex operations
export const preventivoCompletoSchema = preventivoSchema.extend({
  cliente: clienteSchema,
  serviziATerra: z.array(serviziATerraSchema),
  voli: z.array(voloSchema),
  assicurazioni: z.array(assicurazioneSchema),
  preventiviAlCliente: z.array(preventivoAlClienteSchema)
});
