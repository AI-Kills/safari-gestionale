import React from 'react';
import moment from 'moment';
import InputText from "@/app/ui/inputs/input-text";
import InputSelect from "@/app/ui/inputs/input-select";
import InputNumber from "@/app/ui/inputs/input-number";
import InputDate from "@/app/ui/inputs/input-date";
import { PreventivoInputGroup } from '../../general-interface.defs';
import { formatDateToString } from '../../helpers';
import { Badge } from "@/components/ui/badge";

export interface PreventivoFormProps {
  preventivo: PreventivoInputGroup;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fieldName: string) => void;
  readonly?: boolean;
  className?: string;
  brandOptions?: string[];
  operatoreOptions?: string[];
  destinazioniOptions?: string[];
}

const statoOptions = [
  'da fare',
  'in trattativa',
  'confermato',
  'inviato'
];

const tipoViaggioOptions = [
  { value: "viaggio_di_nozze", name: "viaggio di nozze" },
  { value: "viaggio_di_lavoro", name: "viaggio di lavoro" },
  { value: "altro", name: "altro" }
];

export function PreventivoForm({ 
  preventivo, 
  onFieldChange, 
  readonly = false, 
  className = "",
  brandOptions = [],
  operatoreOptions = [],
  destinazioniOptions = []
}: PreventivoFormProps) {
  
  const handleFieldChange = (fieldName: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    onFieldChange(e, fieldName);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Header con badge */}
      <div className="flex items-center h-12 gap-3 pl-0 pt-2">
        <h3 className="text-xl md:text-2xl pb-1">Preventivo</h3>
        <Badge variant="outline" className="ml-2">
          {formatDateToString(preventivo?.data_partenza)} {preventivo?.brand} {preventivo?.numero_preventivo?.toString()}
        </Badge>
      </div>

      {/* Prima riga: Dati principali */}
      <div className="flex flex-row space-x-1">
        <InputNumber 
          disabled 
          label="ID" 
          name="numero_preventivo" 
          onChange={handleFieldChange('numero_preventivo')} 
          value={preventivo?.numero_preventivo?.toString() || ''} 
          className="w-[52px]" 
        />
        <InputSelect 
          label="Brand" 
          name="brand" 
          options={brandOptions} 
          onChange={handleFieldChange('brand')} 
          value={preventivo?.brand || ''} 
          className="w-[80px]"
          disabled={readonly}
        />
        <InputSelect 
          label="Operatore" 
          name="operatore" 
          options={operatoreOptions} 
          onChange={handleFieldChange('operatore')} 
          value={preventivo?.operatore || ''} 
          className="w-[120px]"
          disabled={readonly}
        />
        <InputDate 
          label="Data di Richiesta" 
          name="data" 
          onChange={handleFieldChange('data')} 
          value={preventivo?.data ? moment(preventivo.data).format('YYYY-MM-DD') : ''}
          disabled={readonly}
        />
        <InputSelect 
          label='Destinazione' 
          onChange={handleFieldChange('destinazione')} 
          value={preventivo?.destinazione || ''} 
          name="destinazione" 
          options={destinazioniOptions} 
          className="w-[175px]"
          disabled={readonly}
        />
        <InputDate 
          label="Data di Partenza" 
          name="data_partenza" 
          onChange={handleFieldChange('data_partenza')} 
          value={preventivo?.data_partenza ? moment(preventivo.data_partenza).format('YYYY-MM-DD') : ''}
          disabled={readonly}
        />
        <InputNumber 
          label="Adulti" 
          name="adulti" 
          onChange={handleFieldChange('adulti')} 
          value={preventivo?.adulti?.toString() || ''} 
          className="w-[55px]"
          disabled={readonly}
        />
        <InputNumber 
          label="Bambini" 
          name="bambini" 
          onChange={handleFieldChange('bambini')} 
          value={preventivo?.bambini?.toString() || ''} 
          className="w-[55px]"
          disabled={readonly}
        />
      </div>

      {/* Seconda riga: Dettagli aggiuntivi */}
      <div className="flex flex-row space-x-1">
        <InputText 
          label="Riferimento" 
          name="riferimento" 
          onChange={handleFieldChange('riferimento')} 
          value={preventivo?.riferimento || ''} 
          className="w-[110px]"
          disabled={readonly}
        />
        <InputSelect 
          label='Tipo Viaggio' 
          onChange={handleFieldChange('tipo_viaggio')} 
          value={preventivo?.tipo_viaggio || ''} 
          name="tipo_viaggio" 
          options={tipoViaggioOptions} 
          className="w-[150px]"
          disabled={readonly}
        />
        <InputText 
          label="Note" 
          name="note" 
          onChange={handleFieldChange('note')} 
          value={preventivo?.note || ''} 
          className="w-[215px]"
          disabled={readonly}
        />
        <InputText 
          label="Feedback" 
          name="feedback" 
          onChange={handleFieldChange('feedback')} 
          value={preventivo?.feedback || ''} 
          className="w-[215px]"
          disabled={readonly}
        />
        <InputSelect 
          label="Stato" 
          name="stato" 
          options={statoOptions} 
          onChange={handleFieldChange('stato')} 
          value={preventivo?.stato || ''} 
          className="w-[140px]"
          disabled={readonly}
        />
      </div>

      {/* Terza riga: Percentuale ricarico */}
      <div className="flex flex-row">
        <InputNumber 
          label="Percentuale ricarico" 
          name="percentuale_ricarico" 
          value={preventivo?.percentuale_ricarico?.toString() || ''} 
          onChange={handleFieldChange('percentuale_ricarico')}
          disabled={readonly}
        />
      </div>
    </div>
  );
}
