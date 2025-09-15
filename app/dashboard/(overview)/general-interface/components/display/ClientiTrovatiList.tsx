import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentTextIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { ClienteInputGroup, PreventivoInputGroup } from '../../general-interface.defs';
import { ClienteForm } from '../forms/ClienteForm';
import { formatDate } from "@/app/lib/utils";

export interface ClientiTrovatiListProps {
  clientiTrovati: ClienteInputGroup[];
  showFormAggiornaCliente: boolean;
  clienteDaAggiornare: ClienteInputGroup;
  showPreventiviClienteList: boolean;
  preventiviClienteList: PreventivoInputGroup[];
  onMostraListaPreventivi: (cliente: ClienteInputGroup) => void;
  onNuovoPreventivo: (cliente: ClienteInputGroup) => void;
  onShowFormAggiornaCliente: (cliente: ClienteInputGroup) => void;
  onUpdateCliente: (cliente: ClienteInputGroup) => void;
  onFieldChangeClienteDaAggiornare: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fieldName: string) => void;
  onShowFormAggiornaPreventivo: (cliente: ClienteInputGroup, preventivo: PreventivoInputGroup) => void;
}

export function ClientiTrovatiList({
  clientiTrovati,
  showFormAggiornaCliente,
  clienteDaAggiornare,
  showPreventiviClienteList,
  preventiviClienteList,
  onMostraListaPreventivi,
  onNuovoPreventivo,
  onShowFormAggiornaCliente,
  onUpdateCliente,
  onFieldChangeClienteDaAggiornare,
  onShowFormAggiornaPreventivo
}: ClientiTrovatiListProps) {

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Clienti Trovati</CardTitle>
        <CardDescription>Seleziona un cliente dalla lista per gestire i suoi preventivi</CardDescription>
      </CardHeader>
      <CardContent>
        {clientiTrovati?.length > 0 && clientiTrovati.map((cliente, i) => (
          <Card key={cliente.id} className="mb-4 border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-900">{cliente.cognome} {cliente.nome}</p>
                  <p className="text-sm text-gray-600">{cliente.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onMostraListaPreventivi(cliente)}
                  >
                    <DocumentTextIcon className="w-4 h-4 mr-1" />
                    {showPreventiviClienteList && cliente.id === clienteDaAggiornare.id ? 'Nascondi Lista' : 'Lista Prev'}
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onNuovoPreventivo(cliente)}
                  >
                    <PlusIcon className="w-4 h-4" />
                    Nuovo Preventivo
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onShowFormAggiornaCliente(cliente)}
                  >
                    <UserIcon className="w-4 h-4 mr-1" />
                    {showFormAggiornaCliente && clienteDaAggiornare.id === cliente.id ? 'Annulla' : 'Aggiorna'}
                  </Button>
                </div>
              </div>

              {/* Form Aggiorna Cliente */}
              {showFormAggiornaCliente && clienteDaAggiornare.id === cliente.id && (
                <div className="mt-4">
                  <ClienteForm
                    cliente={clienteDaAggiornare}
                    onFieldChange={onFieldChangeClienteDaAggiornare}
                    className="mb-4"
                  />
                  <Button
                    className="mt-3"
                    onClick={() => onUpdateCliente(clienteDaAggiornare)}
                  >
                    Aggiorna Cliente
                  </Button>
                </div>
              )}

              {/* Lista Preventivi del Cliente */}
              {showPreventiviClienteList && cliente.id === clienteDaAggiornare.id && (
                <div key={cliente.id + 'preventiviClienteList'} className="ml-[400px] flex flex-col pt-0">
                  {preventiviClienteList.length > 0 && preventiviClienteList.map((preventivo, i) => {
                    // Formatta il numero preventivo con brand (es: INO0011, IMS0013)
                    const numeroFormattato = `${preventivo.brand || ''}${preventivo.numero_preventivo || ''}`;
                    
                    return (
                      <div key={preventivo.id} className="flex flex-row gap-2 pt-2 justify-between text-sm text-brown-500">
                        <div className="flex flex-col">
                          <div className="font-medium">
                            {numeroFormattato} {preventivo.destinazione && `- ${preventivo.destinazione}`}
                          </div>
                          <div className="text-xs opacity-75">
                            {formatDate(preventivo.data_partenza)} • {preventivo.riferimento} • {preventivo.operatore}
                          </div>
                        </div>
                        <Button
                          className="bg-white text-brown-500 hover:text-white"
                          onClick={() => onShowFormAggiornaPreventivo(cliente, preventivo)}
                        >
                          VEDI PREVENTIVO
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
