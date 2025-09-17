import { ServizioATerraInputGroup, VoloInputGroup, AssicurazioneInputGroup, Data } from "./general-interface.defs";

// ### servizi a terra e servizi aggiuntivi ###
export const getTotServizio = (totale: number, cambio: number, percentualeRicarico: number, numeroNotti?: number, numeroCamere?: number) => {
    if(isNaN(totale) || isNaN(cambio) || isNaN(percentualeRicarico) || isNaN(numeroNotti) || isNaN(numeroCamere) || cambio === 0) {
        return 0;
    }
    if(!numeroNotti) numeroNotti = 0;
    if(!numeroCamere) numeroCamere = 0;
    const result = (totale*numeroNotti*numeroCamere / cambio) + getRicaricoServizio(totale, cambio, percentualeRicarico, numeroNotti, numeroCamere);
    // Truncate the result to two decimal places
    return Math.trunc(result * 100) / 100;
}
export const getRicaricoServizio = (totale: number, cambio: number, percentualeRicarico: number, numeroNotti?: number, numeroCamere?: number) => {
    if(isNaN(totale) || isNaN(cambio) || isNaN(percentualeRicarico) || isNaN(numeroNotti) || isNaN(numeroCamere) || cambio === 0) {
        return 0;
    }
    if(!numeroNotti) numeroNotti = 0;
    if(!numeroCamere) numeroCamere = 0;
    const result = (totale / cambio) * percentualeRicarico*numeroNotti*numeroCamere;
    // Truncate the result to two decimal places
    return Math.trunc(result * 100) / 100;
}

// ### voli ###
export const getTotVolo = (totale: number, cambio: number, ricarico: number, numero: number) => {
    if (isNaN(totale) || isNaN(cambio) || isNaN(ricarico) || isNaN(numero) || cambio === 0) {
        return 0;
    }
    const result = numero * (totale / cambio + ricarico);
    // Truncate the result to two decimal places
    return Math.trunc(result * 100) / 100;
}

// ### assicurazioni ###
export const getTotAssicurazione = (netto: number, ricarico: number, numero: number) => {
    if(isNaN(netto) || isNaN(ricarico) || isNaN(numero)) {
        return 0;
    }
    const result = (netto + ricarico) * numero;
    // Truncate the result to two decimal places
    return Math.trunc(result * 100) / 100;
}

export const getSommaTuttiTotEuro = (percentualeRicarico: number, serviziATerra: ServizioATerraInputGroup[], serviziAggiuntivi: ServizioATerraInputGroup[], voli: VoloInputGroup[], assicurazioni: AssicurazioneInputGroup[]) => {
    let totServiziATerra = serviziATerra.reduce((acc, servizio) => acc + getTotServizio(servizio.totale, servizio.cambio, percentualeRicarico, servizio.numero_notti, servizio.numero_camere), 0);
    let totServiziAggiuntivi = serviziAggiuntivi.reduce((acc, servizio) => acc + getTotServizio(servizio.totale, servizio.cambio, percentualeRicarico, servizio.numero_notti, servizio.numero_camere), 0);
    let totVoli = voli.reduce((acc, volo) => acc + getTotVolo(volo.totale, volo.cambio, volo.ricarico, volo.numero), 0);
    let totAssicurazioni = assicurazioni.reduce((acc, assicurazione) => acc + getTotAssicurazione(assicurazione.netto, assicurazione.ricarico, assicurazione.numero), 0);
    // se il totale è NaN, settalo a 0
    switch(true) {
        case isNaN(totServiziATerra):
            totServiziATerra = 0;
        case isNaN(totServiziAggiuntivi):
            totServiziAggiuntivi = 0;
        case isNaN(totVoli):
            totVoli = 0;
        case isNaN(totAssicurazioni):
            totAssicurazioni = 0;
    }    
    return totServiziATerra + totServiziAggiuntivi + totVoli + totAssicurazioni;
}

export const formatDateToString = (date: Date): string => {
    if (date instanceof Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${month}${day}${year}`;
    }
    return null;
}

export const validationErrorsToString = (errors: any): string => {
    if(!errors) return '';
    
    // Se errors è un oggetto con struttura complessa (come quello di Zod)
    if (typeof errors === 'object' && !Array.isArray(errors)) {
        return Object.keys(errors).reduce((acc, key) => {
            const errorValue = errors[key];
            let errorString = '';
            
            if (Array.isArray(errorValue)) {
                errorString = errorValue.join(', ');
            } else if (typeof errorValue === 'object' && errorValue !== null) {
                // Se è un oggetto, prova a estrarre il messaggio
                if (errorValue.message) {
                    errorString = errorValue.message;
                } else {
                    errorString = JSON.stringify(errorValue);
                }
            } else {
                errorString = String(errorValue);
            }
            
            return acc + `${key}: ${errorString}\n`;
        }, '');
    }
    
    // Se errors è una stringa, restituiscila direttamente
    if (typeof errors === 'string') {
        return errors;
    }
    
    // Fallback per altri tipi
    return String(errors);
}

export const numberToExcelFormat = (numero: number): string => {
    return numero.toString().padStart(4, '0');
}

export const formatNumberItalian = (numero: number): string => {
    if (typeof numero !== 'number' || isNaN(numero)) {
        return '0,00';
    }
    return new Intl.NumberFormat('it-IT', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero);
}

export const isValidTel = (tel: string): boolean => {
    const telRegex = /^\+[1-9]\d{1,14}$/;
    return telRegex.test(tel);
}

/**
 * Controlla se tutti i campi obbligatori sono presenti nell'oggetto data del preventivo da inviare al server.
 * @param data 
 * @returns array di stringhe corrispondenti ai campi errati.
 */
export const dataErrors = (data: Data): string[] => {
    const errors = [];
    if (!data.preventivo.operatore) {
        errors.push('\'Operatore\' è un campo da inserire.\n');
    }
    if (!data.preventivo.brand) {
        errors.push('\'Brand\' è un campo da inserire.\n');
    }
    if (!data.preventivo.stato) {
        errors.push('\'Stato\' è un campo da inserire.\n');
    }
    return errors;
}

export function errorTranslations(error: string) {
  switch (true) {
    case error.includes('Database Error in createCliente: error: duplicate key value violates unique constraint "clienti_email_key"'):
      return 'L\'email inserita è già registrata nel sistema.';
    case error.includes('Database Error in createPreventivo'):
      return 'Si è verificato un errore durante la creazione del preventivo. Verifica che tutti i dati siano corretti.';
    case error.includes('Database Error in updatePreventivo'):
      return 'Si è verificato un errore durante l\'aggiornamento del preventivo. Riprova tra qualche minuto.';
    case error.includes('duplicate key value violates unique constraint'):
      return 'Alcuni dati inseriti sono già presenti nel sistema. Verifica i campi univoci.';
    case error.includes('validation failed'):
      return 'Alcuni campi non sono compilati correttamente. Controlla i dati inseriti.';
    case error.includes('Connection refused') || error.includes('ECONNREFUSED'):
      return 'Impossibile connettersi al server. Controlla la tua connessione internet e riprova.';
    case error.includes('timeout') || error.includes('ETIMEDOUT'):
      return 'La richiesta ha impiegato troppo tempo. Riprova tra qualche minuto.';
    case error.includes('NetworkError') || error.includes('fetch failed'):
      return 'Errore di rete. Verifica la tua connessione internet e riprova.';
    case error.includes('Permission denied') || error.includes('Forbidden'):
      return 'Non hai i permessi necessari per completare questa operazione.';
    case error.includes('Not found') || error.includes('404'):
      return 'Il dato richiesto non è stato trovato nel sistema.';
    case error.includes('Server Error') || error.includes('500'):
      return 'Si è verificato un errore interno del server. Riprova tra qualche minuto.';
    case error.includes('Bad Request') || error.includes('400'):
      return 'La richiesta non è valida. Verifica i dati inseriti e riprova.';
    default:
      return error;
  }
}

/**
 * Categorizza gli errori e fornisce messaggi user-friendly specifici per il contesto preventivi
 */
export function formatUserFriendlyError(error: any, context: 'cliente' | 'preventivo' | 'generale' = 'generale'): string {
  if (!error) return 'Si è verificato un errore sconosciuto.';
  
  let errorMessage = '';
  
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error.message) {
    errorMessage = error.message;
  } else if (error.error) {
    errorMessage = error.error;
  } else {
    errorMessage = error.toString();
  }

  // Prima applica le traduzioni generali
  const translatedError = errorTranslations(errorMessage);
  
  // Se l'errore è già stato tradotto, restituiscilo
  if (translatedError !== errorMessage) {
    return translatedError;
  }

  // Altrimenti applica traduzioni specifiche per contesto
  return formatContextSpecificError(errorMessage, context);
}

/**
 * Formatta errori specifici per contesto con messaggi user-friendly
 */
function formatContextSpecificError(error: string, context: 'cliente' | 'preventivo' | 'generale'): string {
  const lowerError = error.toLowerCase();

  // Errori comuni di validazione
  if (lowerError.includes('required') || lowerError.includes('obbligatorio')) {
    switch (context) {
      case 'cliente':
        return 'Alcuni campi obbligatori del cliente non sono stati compilati. Verifica nome, cognome ed email.';
      case 'preventivo':
        return 'Alcuni campi obbligatori del preventivo non sono stati compilati. Verifica operatore, brand e stato.';
      default:
        return 'Alcuni campi obbligatori non sono stati compilati. Controlla il form e riprova.';
    }
  }

  // Errori di formato email
  if (lowerError.includes('email') && (lowerError.includes('invalid') || lowerError.includes('format'))) {
    return 'L\'indirizzo email inserito non è valido. Inserisci un email nel formato corretto (es: mario.rossi@email.com).';
  }

  // Errori di formato telefono
  if (lowerError.includes('tel') || lowerError.includes('phone')) {
    return 'Il numero di telefono inserito non è valido. Usa il formato internazionale (es: +39 123 456 7890).';
  }

  // Errori di data
  if (lowerError.includes('date') || lowerError.includes('data')) {
    return 'Una o più date inserite non sono valide. Verifica il formato delle date e che siano logicamente corrette.';
  }

  // Errori di numero/importo
  if (lowerError.includes('number') || lowerError.includes('numeric') || lowerError.includes('importo')) {
    return 'Uno o più valori numerici inseriti non sono validi. Usa solo numeri e il punto per i decimali.';
  }

  // Errori di lunghezza campo
  if (lowerError.includes('too long') || lowerError.includes('troppo lungo')) {
    return 'Uno o più campi superano la lunghezza massima consentita. Riduci il testo inserito.';
  }

  // Errori specifici per preventivi
  if (context === 'preventivo') {
    if (lowerError.includes('operatore')) {
      return 'È necessario selezionare un operatore per il preventivo.';
    }
    if (lowerError.includes('brand')) {
      return 'È necessario selezionare un brand per il preventivo.';
    }
    if (lowerError.includes('stato')) {
      return 'È necessario selezionare uno stato per il preventivo.';
    }
    if (lowerError.includes('destinazione')) {
      return 'È necessario inserire almeno una destinazione per il preventivo.';
    }
    if (lowerError.includes('data_partenza')) {
      return 'È necessario inserire una data di partenza valida per il preventivo.';
    }
  }

  // Errori specifici per clienti
  if (context === 'cliente') {
    if (lowerError.includes('nome')) {
      return 'È necessario inserire un nome valido per il cliente.';
    }
    if (lowerError.includes('cognome')) {
      return 'È necessario inserire un cognome valido per il cliente.';
    }
  }

  // Errori di connessione/rete
  if (lowerError.includes('network') || lowerError.includes('connection')) {
    return 'Problema di connessione. Verifica la tua connessione internet e riprova.';
  }

  // Se nessuna traduzione è applicabile, restituisci un messaggio generico più user-friendly
  if (error.length > 100) {
    switch (context) {
      case 'cliente':
        return 'Si è verificato un errore durante l\'operazione sul cliente. Verifica i dati inseriti e riprova.';
      case 'preventivo':
        return 'Si è verificato un errore durante l\'operazione sul preventivo. Verifica i dati inseriti e riprova.';
      default:
        return 'Si è verificato un errore durante l\'operazione. Riprova tra qualche minuto.';
    }
  }

  return error;
}

/**
 * Migliora la funzione validationErrorsToString per essere più user-friendly
 */
export const formatValidationErrors = (errors: any, context: 'cliente' | 'preventivo' | 'generale' = 'generale'): string => {
    if (!errors) return '';
    
    // Se errors è una stringa, formattala direttamente
    if (typeof errors === 'string') {
        return formatUserFriendlyError(errors, context);
    }
    
    // Se errors è un array di stringhe
    if (Array.isArray(errors)) {
        return errors
            .map(error => formatUserFriendlyError(error, context))
            .join('\n');
    }
    
    // Se errors è un oggetto con struttura complessa (come quello di Zod)
    if (typeof errors === 'object' && errors !== null) {
        const formattedErrors = Object.keys(errors).map(key => {
            const errorValue = errors[key];
            let errorString = '';
            
            if (Array.isArray(errorValue)) {
                errorString = errorValue.join(', ');
            } else if (typeof errorValue === 'object' && errorValue !== null) {
                if (errorValue.message) {
                    errorString = errorValue.message;
                } else {
                    errorString = JSON.stringify(errorValue);
                }
            } else {
                errorString = String(errorValue);
            }
            
            // Formatta il messaggio di errore per essere più user-friendly
            const friendlyError = formatUserFriendlyError(errorString, context);
            
            // Se il campo ha un nome tecnico, traduci anche quello
            const friendlyFieldName = translateFieldName(key);
            
            return `${friendlyFieldName}: ${friendlyError}`;
        }).join('\n');
        
        return formattedErrors;
    }
    
    // Fallback
    return formatUserFriendlyError(String(errors), context);
}

/**
 * Traduce i nomi dei campi tecnici in nomi user-friendly
 */
function translateFieldName(fieldName: string): string {
    const translations: Record<string, string> = {
        'nome': 'Nome',
        'cognome': 'Cognome',
        'email': 'Email',
        'tel': 'Telefono',
        'data_di_nascita': 'Data di nascita',
        'data_partenza': 'Data di partenza',
        'numero_preventivo': 'Numero preventivo',
        'operatore': 'Operatore',
        'brand': 'Brand',
        'stato': 'Stato preventivo',
        'destinazione': 'Destinazione',
        'percentuale_ricarico': 'Percentuale ricarico',
        'adulti': 'Numero adulti',
        'bambini': 'Numero bambini',
        'fornitore': 'Fornitore',
        'descrizione': 'Descrizione',
        'totale': 'Importo totale',
        'valuta': 'Valuta',
        'cambio': 'Tasso di cambio',
        'data_scadenza': 'Data scadenza',
        'data_pagamento': 'Data pagamento',
        'importo_in_euro': 'Importo in Euro',
        'codice_fiscale': 'Codice fiscale',
        'numero_passaporto': 'Numero passaporto'
    };
    
    return translations[fieldName] || fieldName;
}
