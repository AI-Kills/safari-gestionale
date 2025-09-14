import { 
  createCliente, 
  updateCliente, 
  searchClienti,
  fetchPreventiviByIdCliente
} from '@/app/lib/actions';
import { ClienteInputGroup, PreventivoInputGroup } from '../general-interface.defs';
import { isValidEmail, formatDate } from '@/app/lib/utils';
import { isValidTel, validationErrorsToString, errorTranslations } from '../helpers';

export class ClienteService {
  
  // Helper per convertire class instances a plain objects
  private static convertToPlainObject(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }
    
    if (obj instanceof Date) {
      return obj.toISOString();
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => ClienteService.convertToPlainObject(item));
    }
    
    if (typeof obj === 'object') {
      const plainObj: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          plainObj[key] = ClienteService.convertToPlainObject(obj[key]);
        }
      }
      return plainObj;
    }
    
    return obj;
  }

  static async searchClienti(cliente: ClienteInputGroup) {
    try {
      const plainCliente = ClienteService.convertToPlainObject(cliente);
      const result = await searchClienti(plainCliente);
      
      if (result.success && result.values) {
        return {
          success: true,
          data: result.values,
          error: null
        };
      } else {
        return {
          success: false,
          data: [],
          error: result.errorsMessage || 'Errore sconosciuto'
        };
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error.toString()
      };
    }
  }

  static async createCliente(cliente: ClienteInputGroup) {
    // Validazioni
    if (!cliente.email || !isValidEmail(cliente.email)) {
      return {
        success: false,
        error: 'Inserisci una email con formato valido.'
      };
    }

    if (cliente.tel && !isValidTel(cliente.tel)) {
      return {
        success: false,
        error: 'Inserisci un numero di telefono con formato valido.'
      };
    }

    try {
      const plainCliente = ClienteService.convertToPlainObject(cliente);
      const result = await createCliente(plainCliente);
      
      if (result.success) {
        return {
          success: true,
          error: null
        };
      } else {
        const errorMessage = errorTranslations(result.errorsMessage || '') + '\n' + 
                           validationErrorsToString(result.errors);
        return {
          success: false,
          error: errorMessage
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.toString()
      };
    }
  }

  static async updateCliente(cliente: ClienteInputGroup) {
    // Validazioni
    if (!cliente.email || !isValidEmail(cliente.email)) {
      return {
        success: false,
        error: 'Inserisci una email con formato valido.'
      };
    }

    if (cliente.tel && !isValidTel(cliente.tel)) {
      return {
        success: false,
        error: 'Inserisci un numero di telefono con formato valido.'
      };
    }

    try {
      const plainCliente = ClienteService.convertToPlainObject({ ...cliente, id: cliente.id });
      const result = await updateCliente(plainCliente);
      
      if (result.success) {
        return {
          success: true,
          error: null
        };
      } else {
        const errorMessage = errorTranslations(result.errorsMessage || '') + '\n' + 
                           validationErrorsToString(result.errors);
        return {
          success: false,
          error: errorMessage
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.toString()
      };
    }
  }

  static async fetchPreventiviByCliente(clienteId: string) {
    try {
      const result = await fetchPreventiviByIdCliente(clienteId);
      
      if (result.success) {
        if (result.values.length > 0) {
          const preventiviInputGroup = result.values.map(p => new PreventivoInputGroup(p));
          return {
            success: true,
            data: preventiviInputGroup,
            error: null
          };
        } else {
          return {
            success: false,
            data: [],
            error: 'Il cliente non ha preventivi...'
          };
        }
      } else {
        const errorMessage = result.errorsMessage + '\n' + validationErrorsToString(result.errors);
        return {
          success: false,
          data: [],
          error: errorMessage
        };
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error.toString()
      };
    }
  }
}
