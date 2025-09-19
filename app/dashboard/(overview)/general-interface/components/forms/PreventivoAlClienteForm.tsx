import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import InputText from "@/app/ui/inputs/input-text";
import InputNumber from "@/app/ui/inputs/input-number";
import { InputLookup } from "@/app/ui/inputs/input-lookup";
import { 
  PreventivoAlClienteInputGroup, 
  PreventivoAlClienteRow 
} from '../../general-interface.defs';
import { formatNumberItalian, formatPrecisionNumber } from '../../helpers';

export interface PreventivoAlClienteFormProps {
  preventivoAlCliente: PreventivoAlClienteInputGroup;
  destinazioniOptions: string[];
  onUpdateDescrizioneViaggio: (value: string) => void;
  onAddRow: (tipo: 'righePrimoTipo' | 'righeSecondoTipo') => void;
  onRemoveRow: (tipo: 'righePrimoTipo' | 'righeSecondoTipo', groupId: number) => void;
  onUpdateRow: (tipo: 'righePrimoTipo' | 'righeSecondoTipo', groupId: number, field: string, value: any) => void;
  className?: string;
}

export function PreventivoAlClienteForm({
  preventivoAlCliente,
  destinazioniOptions,
  onUpdateDescrizioneViaggio,
  onAddRow,
  onRemoveRow,
  onUpdateRow,
  className = ""
}: PreventivoAlClienteFormProps) {

  const handleDescrizioneChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateDescrizioneViaggio(e.target.value);
  };

  const handleRowFieldChange = (
    tipo: 'righePrimoTipo' | 'righeSecondoTipo',
    groupId: number,
    field: string
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onUpdateRow(tipo, groupId, field, e.target.value);
  };

  const renderRowGroup = (tipo: 'righePrimoTipo' | 'righeSecondoTipo') => {
    const rows = preventivoAlCliente?.[tipo] || [];
    const title = tipo === 'righePrimoTipo' ? 'Totale senza assicurazione' : 'Totale con assicurazione';

    return (
      <div key={tipo}>
        {/* Header gruppo righe */}
        <div className="flex flex-row items-center justify-start">
          <div>
            <p className="pt-4">{title}</p>
          </div>
          <div className="flex flex-row items-center justify-center pt-4 pl-5">
            <Button
              variant="outline"
              size="sm"
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
              onClick={() => onAddRow(tipo)}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Righe del gruppo */}
        {rows.map((row, index) => (
          <div key={row.groupId} className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                  onClick={() => onRemoveRow(tipo, row.groupId)}
                >
                  <MinusIcon className="w-4 h-4" />
                </Button>
                <InputLookup
                  label={index === 0 ? "Destinazione" : ''}
                  name={`destinazione-${row.groupId}`}
                  options={destinazioniOptions}
                  onChange={handleRowFieldChange(tipo, row.groupId, 'destinazione')}
                  value={row.destinazione || ''}
                  className="w-[120px]"
                />
                <InputText
                  label={index === 0 ? "Descrizione" : ''}
                  name={`descrizione-${row.groupId}`}
                  onChange={handleRowFieldChange(tipo, row.groupId, 'descrizione')}
                  value={row.descrizione || ''}
                  className="w-[120px]"
                />
                <InputNumber
                  label={index === 0 ? "Individuale" : ''}
                  name={`individuale-${row.groupId}`}
                  onChange={handleRowFieldChange(tipo, row.groupId, 'individuale')}
                  value={row.individuale?.toString() || ''}
                />
                <InputNumber
                  label={index === 0 ? "Numero" : ''}
                  name={`numero-${row.groupId}`}
                  onChange={handleRowFieldChange(tipo, row.groupId, 'numero')}
                  value={row.numero?.toString() || ''}
                />
              </div>
              
              <div className="flex flex-row items-center pt-7 pl-5">
                <div className={`${index > 0 ? 'pb-3' : ''}`}>
                  {index === 0 && (
                    <div className='flex justify-end mr-3'>
                      <p>tot euro:</p>
                    </div>
                  )}
                  <div className="w-24 mr-2 flex justify-end">
                    <p>{formatNumberItalian((row.individuale || 0) * (row.numero || 0))}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Totale del gruppo */}
        <div className="flex flex-row items-center justify-end">
          <p>tot euro {title.toLowerCase()}:</p>
          <div className="w-60 mr-3 flex justify-end">
            <p>{formatNumberItalian(
              rows.reduce((acc, row) => acc + ((row.individuale || 0) * (row.numero || 0)), 0)
            )}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="preventivo-mostrare-cliente" className={className}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-between pb-4">
            <h3 className="text-xl md:text-2xl pt-4 pb-1">Preventivo al cliente</h3>
          </div>
          
          {/* Descrizione viaggio */}
          <div className="flex flex-row">
            <InputText
              label="Descrizione viaggio"
              name="descrizione_viaggio"
              textarea
              onChange={handleDescrizioneChange}
              value={preventivoAlCliente?.descrizione_viaggio || ''}
            />
          </div>
          
          {/* Gruppi di righe */}
          <div className="flex flex-col gap-4">
            {renderRowGroup('righePrimoTipo')}
            {renderRowGroup('righeSecondoTipo')}
          </div>
          
          {/* Totale generale */}
          <div className="flex flex-row items-center justify-end">
            <p>totale generale:</p>
            <div className="w-60 mr-3 flex justify-end">
              <p title={formatPrecisionNumber(
                (preventivoAlCliente?.righePrimoTipo?.reduce((acc, row) => acc + ((row.individuale || 0) * (row.numero || 0)), 0) || 0) +
                (preventivoAlCliente?.righeSecondoTipo?.reduce((acc, row) => acc + ((row.individuale || 0) * (row.numero || 0)), 0) || 0)
              )}>
                {formatNumberItalian(
                  (preventivoAlCliente?.righePrimoTipo?.reduce((acc, row) => acc + ((row.individuale || 0) * (row.numero || 0)), 0) || 0) +
                  (preventivoAlCliente?.righeSecondoTipo?.reduce((acc, row) => acc + ((row.individuale || 0) * (row.numero || 0)), 0) || 0)
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
