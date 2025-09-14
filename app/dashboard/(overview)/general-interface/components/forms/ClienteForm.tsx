import React from 'react';
import moment from 'moment';
import InputTell from "@/app/ui/inputs/input-tell";
import InputText from "@/app/ui/inputs/input-text";
import InputSelect from "@/app/ui/inputs/input-select";
import InputEmail from "@/app/ui/inputs/input-email";
import InputDate from "@/app/ui/inputs/input-date";
import { ClienteInputGroup } from '../../general-interface.defs';

export interface ClienteFormProps {
  cliente: ClienteInputGroup;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fieldName: string) => void;
  readonly?: boolean;
  className?: string;
}

const provenienzaOptions = [
  'Passaparola',
  'Sito IWS',
  'Sito INO',
  'Telefono',
  'Email Diretta',
  'Sito ISE',
  'Sito IMS'
];

export function ClienteForm({ 
  cliente, 
  onFieldChange, 
  readonly = false, 
  className = "" 
}: ClienteFormProps) {
  
  const handleFieldChange = (fieldName: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    onFieldChange(e, fieldName);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Prima riga: Dati anagrafici base */}
      <div className="flex flex-row space-x-2">
        <InputText 
          label="Cognome" 
          name="cognome" 
          onChange={handleFieldChange('cognome')} 
          value={cliente?.cognome || ''} 
          className="w-[200px]"
          disabled={readonly}
        />
        <InputText 
          label="Nome" 
          name="nome" 
          onChange={handleFieldChange('nome')} 
          value={cliente?.nome || ''} 
          className="w-[200px]"
          disabled={readonly}
        />
        <InputEmail 
          label="Email" 
          name="email" 
          onChange={handleFieldChange('email')} 
          value={cliente?.email || ''}
          disabled={readonly}
        />
        <InputTell 
          label="Telefono" 
          name="tel" 
          onChange={handleFieldChange('tel')} 
          value={cliente?.tel || ''}
          disabled={readonly}
        />
        <InputSelect 
          label="Sesso" 
          name="sesso" 
          options={['M', 'F']} 
          onChange={handleFieldChange('sesso')} 
          value={cliente?.sesso || ''} 
          className="w-[60px]"
          disabled={readonly}
        />
      </div>

      {/* Seconda riga: Indirizzo */}
      <div className="flex flex-row space-x-2 mt-3">
        <InputText 
          label="Indirizzo" 
          name="indirizzo" 
          onChange={handleFieldChange('indirizzo')} 
          value={cliente?.indirizzo || ''} 
          className="w-[310px]"
          disabled={readonly}
        />
        <InputText 
          label="CAP" 
          name="cap" 
          onChange={handleFieldChange('cap')} 
          value={cliente?.cap || ''} 
          className="w-[90px]"
          disabled={readonly}
        />
        <InputText 
          label="Città" 
          name="citta" 
          onChange={handleFieldChange('citta')} 
          value={cliente?.citta || ''} 
          className="w-[200px]"
          disabled={readonly}
        />
        <InputText 
          label="Prov R" 
          name="provincia" 
          onChange={handleFieldChange('provincia')} 
          value={cliente?.provincia || ''} 
          className="w-[60px]"
          disabled={readonly}
        />
        <InputText 
          label="Codice Fiscale" 
          name="codice_fiscale" 
          onChange={handleFieldChange('cf')} 
          value={cliente?.cf || ''} 
          className="w-[170px]"
          disabled={readonly}
        />
      </div>

      {/* Terza riga: Dati nascita e documento */}
      <div className="flex flex-row space-x-2 mt-3">
        <InputDate 
          label="Data di Nascita" 
          name="data_di_nascita" 
          onChange={handleFieldChange('data_di_nascita')} 
          value={cliente?.data_di_nascita ? moment(cliente.data_di_nascita).format('YYYY-MM-DD') : ''}
          disabled={readonly}
        />
        <InputText 
          label="Luogo di Nascita" 
          name="luogo_nascita" 
          onChange={handleFieldChange('luogo_nascita')} 
          value={cliente?.luogo_nascita || ''} 
          className="w-[200px]"
          disabled={readonly}
        />
        <InputText 
          label="Prov N" 
          name="provincia_nascita" 
          onChange={handleFieldChange('provincia_nascita')} 
          value={cliente?.provincia_nascita || ''} 
          className="w-[60px]"
          disabled={readonly}
        />
        <InputText 
          label="Numero Passaporto" 
          name="numero_passaporto" 
          onChange={handleFieldChange('numero_passaporto')} 
          value={cliente?.numero_passaporto || ''} 
          className="w-[140px]"
          disabled={readonly}
        />
        <InputDate 
          label="Scadenza Passaporto" 
          name="data_scadenza_passaporto" 
          onChange={handleFieldChange('data_scadenza_passaporto')} 
          value={cliente?.data_scadenza_passaporto ? moment(cliente.data_scadenza_passaporto).format('YYYY-MM-DD') : ''}
          disabled={readonly}
        />
        <InputText 
          label="Nazionalità" 
          name="nazionalita" 
          onChange={handleFieldChange('nazionalita')} 
          value={cliente?.nazionalita || ''} 
          className="w-[146px]"
          disabled={readonly}
        />
      </div>

      {/* Quarta riga: Tipo cliente e note */}
      <div className="flex flex-row space-x-2 mt-3">
        <InputSelect 
          label="Tipo" 
          name="tipo" 
          options={['PRIVATO', 'AGENZIA VIAGGI', 'AZIENDA']} 
          onChange={handleFieldChange('tipo')} 
          value={cliente?.tipo || ''} 
          className="w-[160px]"
          disabled={readonly}
        />
        <InputSelect 
          label="Provenienza" 
          name="provenienza" 
          options={provenienzaOptions} 
          onChange={handleFieldChange('provenienza')} 
          value={cliente?.provenienza || ''} 
          className="w-[130px]"
          disabled={readonly}
        />
        <InputText 
          label="Collegato" 
          name="collegato" 
          onChange={handleFieldChange('collegato')} 
          value={cliente?.collegato || ''} 
          className="w-[190px]"
          disabled={readonly}
        />
        <InputText 
          textarea 
          label="Note Cliente" 
          name="note_cliente" 
          onChange={handleFieldChange('note')} 
          value={cliente?.note || ''} 
          className="w-[354px]"
          disabled={readonly}
        />
      </div>
    </div>
  );
}
