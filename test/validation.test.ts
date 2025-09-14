import { describe, test, expect } from 'vitest';
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
  updateAssicurazioneSchema
} from '../app/lib/actions/entity-zod-schemas';

describe('Zod Schema Validation', () => {
  describe('User Schema Validation', () => {
    test('should validate correct user data', () => {
      const validUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        password: 'password123'
      };

      const result = userSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    test('should reject invalid email', () => {
      const invalidUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'invalid-email',
        password: 'password123'
      };

      const result = userSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Email non valida');
      }
    });

    test('should reject short password', () => {
      const invalidUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        password: '123'
      };

      const result = userSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('almeno 6 caratteri');
      }
    });

    test('createUserSchema should not require id', () => {
      const validCreateUser = {
        email: 'test@example.com',
        password: 'password123'
      };

      const result = createUserSchema.safeParse(validCreateUser);
      expect(result.success).toBe(true);
    });

    test('updateUserSchema should allow partial updates', () => {
      const validUpdate = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'newemail@example.com'
      };

      const result = updateUserSchema.safeParse(validUpdate);
      expect(result.success).toBe(true);
    });
  });

  describe('Cliente Schema Validation', () => {
    test('should validate correct cliente data', () => {
      const validCliente = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'mario.rossi@example.com',
        tel: '+39 123 456 7890',
        cf: 'RSSMRA80A01H501U'
      };

      const result = clienteSchema.safeParse(validCliente);
      expect(result.success).toBe(true);
    });

    test('should reject invalid email in cliente', () => {
      const invalidCliente = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nome: 'Mario',
        cognome: 'Rossi',
        email: 'invalid-email',
        tel: '+39 123 456 7890'
      };

      const result = clienteSchema.safeParse(invalidCliente);
      expect(result.success).toBe(false);
    });

    test('should validate optional fields', () => {
      const clienteWithOptionals = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        data_di_nascita: new Date('1980-01-01'),
        data_scadenza_passaporto: new Date('2030-01-01')
      };

      const result = clienteSchema.safeParse(clienteWithOptionals);
      expect(result.success).toBe(true);
    });

    test('should reject too long fields', () => {
      const longString = 'a'.repeat(256);
      const invalidCliente = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nome: longString,
        email: 'test@example.com'
      };

      const result = clienteSchema.safeParse(invalidCliente);
      expect(result.success).toBe(false);
    });
  });

  describe('Fornitore Schema Validation', () => {
    test('should validate correct fornitore data', () => {
      const validFornitore = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nome: 'Fornitore Test',
        valuta: 'EUR'
      };

      const result = fornitoreSchema.safeParse(validFornitore);
      expect(result.success).toBe(true);
    });

    test('should require nome field', () => {
      const invalidFornitore = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        valuta: 'EUR'
      };

      const result = fornitoreSchema.safeParse(invalidFornitore);
      expect(result.success).toBe(false);
    });

    test('createFornitoreSchema should not require id', () => {
      const validCreate = {
        nome: 'Nuovo Fornitore'
      };

      const result = createFornitoreSchema.safeParse(validCreate);
      expect(result.success).toBe(true);
    });
  });

  describe('Destinazione Schema Validation', () => {
    test('should validate correct destinazione data', () => {
      const validDestinazione = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nome: 'Roma'
      };

      const result = destinazioneSchema.safeParse(validDestinazione);
      expect(result.success).toBe(true);
    });

    test('should require nome field', () => {
      const invalidDestinazione = {
        id: '123e4567-e89b-12d3-a456-426614174000'
      };

      const result = destinazioneSchema.safeParse(invalidDestinazione);
      expect(result.success).toBe(false);
    });
  });

  describe('Banca Schema Validation', () => {
    test('should validate correct banca data', () => {
      const validBanca = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nome: 'Banca Intesa'
      };

      const result = bancaSchema.safeParse(validBanca);
      expect(result.success).toBe(true);
    });

    test('should require nome field', () => {
      const invalidBanca = {
        id: '123e4567-e89b-12d3-a456-426614174000'
      };

      const result = bancaSchema.safeParse(invalidBanca);
      expect(result.success).toBe(false);
    });
  });

  describe('Preventivo Schema Validation', () => {
    test('should validate correct preventivo data', () => {
      const validPreventivo = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        id_cliente: '456e7890-e89b-12d3-a456-426614174000',
        data: new Date(),
        percentuale_ricarico: 10.5,
        adulti: 2,
        bambini: 1,
        destinazione: 'Roma',
        data_partenza: new Date('2024-06-01')
      };

      const result = preventivoSchema.safeParse(validPreventivo);
      expect(result.success).toBe(true);
    });

    test('should require id_cliente', () => {
      const invalidPreventivo = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        data: new Date()
      };

      const result = preventivoSchema.safeParse(invalidPreventivo);
      expect(result.success).toBe(false);
    });

    test('should validate numeric fields are positive', () => {
      const invalidPreventivo = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        id_cliente: '456e7890-e89b-12d3-a456-426614174000',
        data: new Date(),
        percentuale_ricarico: -5,
        adulti: -1
      };

      const result = preventivoSchema.safeParse(invalidPreventivo);
      expect(result.success).toBe(false);
    });
  });

  describe('ServizioATerra Schema Validation', () => {
    test('should validate correct servizio data', () => {
      const validServizio = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        id_preventivo: '456e7890-e89b-12d3-a456-426614174000',
        descrizione: 'Hotel 4 stelle',
        data: new Date(),
        numero_notti: 7,
        numero_camere: 2,
        totale: 1500.50,
        valuta: 'EUR',
        cambio: 1.0,
        servizio_aggiuntivo: false
      };

      const result = serviziATerraSchema.safeParse(validServizio);
      expect(result.success).toBe(true);
    });

    test('should require id_preventivo', () => {
      const invalidServizio = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        descrizione: 'Hotel 4 stelle'
      };

      const result = serviziATerraSchema.safeParse(invalidServizio);
      expect(result.success).toBe(false);
    });

    test('should validate positive numeric fields', () => {
      const invalidServizio = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        id_preventivo: '456e7890-e89b-12d3-a456-426614174000',
        numero_notti: -1,
        totale: -100
      };

      const result = serviziATerraSchema.safeParse(invalidServizio);
      expect(result.success).toBe(false);
    });
  });

  describe('Volo Schema Validation', () => {
    test('should validate correct volo data', () => {
      const validVolo = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        id_preventivo: '456e7890-e89b-12d3-a456-426614174000',
        compagnia_aerea: 'Alitalia',
        descrizione: 'Roma - New York',
        data_partenza: new Date('2024-06-01'),
        data_arrivo: new Date('2024-06-01'),
        totale: 800.00,
        ricarico: 50.00,
        numero: 2,
        valuta: 'EUR',
        cambio: 1.0
      };

      const result = voloSchema.safeParse(validVolo);
      expect(result.success).toBe(true);
    });

    test('should require id_preventivo', () => {
      const invalidVolo = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        compagnia_aerea: 'Alitalia'
      };

      const result = voloSchema.safeParse(invalidVolo);
      expect(result.success).toBe(false);
    });
  });

  describe('Assicurazione Schema Validation', () => {
    test('should validate correct assicurazione data', () => {
      const validAssicurazione = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        id_preventivo: '456e7890-e89b-12d3-a456-426614174000',
        assicurazione: 'Assicurazione Viaggio',
        netto: 100.00,
        ricarico: 10.00,
        numero: 2
      };

      const result = assicurazioneSchema.safeParse(validAssicurazione);
      expect(result.success).toBe(true);
    });

    test('should require id_preventivo', () => {
      const invalidAssicurazione = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        assicurazione: 'Assicurazione Viaggio'
      };

      const result = assicurazioneSchema.safeParse(invalidAssicurazione);
      expect(result.success).toBe(false);
    });

    test('should validate positive numeric fields', () => {
      const invalidAssicurazione = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        id_preventivo: '456e7890-e89b-12d3-a456-426614174000',
        netto: -50,
        ricarico: -10
      };

      const result = assicurazioneSchema.safeParse(invalidAssicurazione);
      expect(result.success).toBe(false);
    });
  });

  describe('Edge Cases and Complex Validation', () => {
    test('should handle null and undefined values correctly', () => {
      const clienteWithNulls = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        nome: null,
        cognome: undefined,
        tel: null
      };

      const result = clienteSchema.safeParse(clienteWithNulls);
      expect(result.success).toBe(true);
    });

    test('should validate date fields properly', () => {
      const clienteWithDates = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        data_di_nascita: new Date('1980-01-01'),
        data_scadenza_passaporto: new Date('2030-12-31')
      };

      const result = clienteSchema.safeParse(clienteWithDates);
      expect(result.success).toBe(true);
    });

    test('should reject invalid date objects', () => {
      const clienteWithInvalidDate = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        data_di_nascita: new Date('invalid-date')
      };

      const result = clienteSchema.safeParse(clienteWithInvalidDate);
      expect(result.success).toBe(false);
    });

    test('should validate string length limits', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      const clienteWithLongEmail = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: longEmail
      };

      const result = clienteSchema.safeParse(clienteWithLongEmail);
      expect(result.success).toBe(false);
    });
  });
});
