import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import InputText from "@/app/ui/inputs/input-text";
import InputNumber from "@/app/ui/inputs/input-number";
import InputDate from "@/app/ui/inputs/input-date";
import { InputLookup } from "@/app/ui/inputs/input-lookup";
import { Pagamento } from '../../general-interface.defs';
import moment from 'moment';

export interface PagamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pagamento: Pagamento) => void;
  onDelete?: () => void;
  pagamento?: Pagamento;
  bancheOptions: string[];
  title?: string;
}

export function PagamentoModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  pagamento,
  bancheOptions,
  title = "Gestione Pagamento"
}: PagamentoModalProps) {
  const [formData, setFormData] = useState<Pagamento>(
    pagamento || new Pagamento('', undefined, undefined, undefined, 0, 0)
  );

  useEffect(() => {
    if (pagamento) {
      setFormData(pagamento);
    } else {
      setFormData(new Pagamento('', undefined, undefined, undefined, 0, 0));
    }
  }, [pagamento, isOpen]);

  const handleFieldChange = (field: keyof Pagamento, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>
              Inserisci i dettagli del pagamento
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 rounded-full p-0"
            onClick={onClose}
          >
            <XMarkIcon className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Banca */}
          <div>
            <InputLookup
              label="Banca"
              name="banca"
              options={bancheOptions}
              onChange={(e) => handleFieldChange('banca', e.target.value)}
              value={formData.banca || ''}
            />
          </div>

          {/* Data Scadenza */}
          <div>
            <InputDate
              label="Data Scadenza"
              name="data_scadenza"
              onChange={(e) => handleFieldChange('data_scadenza', new Date(e.target.value))}
              value={formData.data_scadenza ? moment(formData.data_scadenza).format('YYYY-MM-DD') : ''}
            />
          </div>

          {/* Data Pagamento */}
          <div>
            <InputDate
              label="Data Pagamento"
              name="data_pagamento"
              onChange={(e) => handleFieldChange('data_pagamento', new Date(e.target.value))}
              value={formData.data_pagamento ? moment(formData.data_pagamento).format('YYYY-MM-DD') : ''}
            />
          </div>

          {/* Importo in Valuta */}
          <div>
            <InputNumber
              label="Importo in Valuta"
              name="importo_in_valuta"
              onChange={(e) => {
                const value = e.target.value;
                const numValue = value === '' ? undefined : parseFloat(value);
                handleFieldChange('importo_in_valuta', numValue);
              }}
              value={formData.importo_in_valuta?.toString() || ''}
            />
          </div>

          {/* Importo in Euro */}
          <div>
            <InputNumber
              label="Importo in Euro"
              name="importo_in_euro"
              onChange={(e) => {
                const value = e.target.value;
                const numValue = value === '' ? undefined : parseFloat(value);
                handleFieldChange('importo_in_euro', numValue);
              }}
              value={formData.importo_in_euro?.toString() || ''}
            />
          </div>

          {/* Pulsanti */}
          <div className="flex flex-row justify-between pt-4">
            <div>
              {onDelete && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                >
                  <TrashIcon className="w-4 h-4" />
                  Elimina
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Annulla
              </Button>
              <Button
                onClick={handleSave}
              >
                Salva
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
