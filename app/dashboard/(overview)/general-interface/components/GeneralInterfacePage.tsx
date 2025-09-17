'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentTextIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import Feedback from '@/app/ui/feedback/feedback';
import { useSearchParams } from 'next/navigation';

import { GeneralInterfaceProvider, useGeneralInterface } from '../contexts/GeneralInterfaceContext';
import { ClienteForm, PreventivoForm, DynamicServiceList, ClientiTrovatiList, PreventivoAlClienteForm, PagamentoModal, LoadingText } from './index';
import { getServiziATerraConfigs, getVoliConfigs, getAssicurazioniConfigs, getPartecipantiConfigs } from './lists/ServiceListConfigs';
import { getSommaTuttiTotEuro, formatNumberItalian } from '../helpers';
import { ClienteService, PreventivoService } from '../services';
import { useSpinnerContext } from '@/app/context/spinner-context';
import { useDebouncedCallback } from 'use-debounce';
import { PreventivoInputGroup, Data, Pagamento, ClienteInputGroup } from '../general-interface.defs';
import { useEntityTransformation } from '../hooks';

// Import data
import fornitoriData from '@/app/lib/fundamental-entities-json/fornitori.json';
import destinazioniData from '@/app/lib/fundamental-entities-json/destinazioni.json';
import bancheData from '@/app/lib/fundamental-entities-json/banche.json';
import valuteValues from '@/app/seed/valute.json';
import brandValues from "@/app/seed/brands.json";
import operatoriValues from "@/app/seed/operatori.json";

// Options
const fornitoriOptions = fornitoriData.map(fornitore => fornitore.nome);
const destinazioniOptions = destinazioniData.map(destinazione => destinazione.nome);
const bancheOptions = bancheData.map(banca => banca.nome);
const brandOptions = brandValues.brand;
const operatoreOptions = operatoriValues.operatori;
const valuteOptions = valuteValues.valute;

function GeneralInterfaceContent() {
  const { setIsActiveSpinner } = useSpinnerContext();
  const { transformPreventivoCompleto } = useEntityTransformation();
  const searchParams = useSearchParams();
  const [hasAutoLoaded, setHasAutoLoaded] = useState(false);
  
  // Stati per modale pagamenti
  const [isPagamentoModalOpen, setIsPagamentoModalOpen] = useState(false);
  const [currentPagamento, setCurrentPagamento] = useState<Pagamento | undefined>();
  const [currentServiceGroupId, setCurrentServiceGroupId] = useState<number | null>(null);
  const [currentPagamentoIndex, setCurrentPagamentoIndex] = useState<number | null>(null);
  const [currentServiceType, setCurrentServiceType] = useState<'serviziATerra' | 'serviziAggiuntivi' | 'voli' | 'partecipanti' | null>(null);
  
  const {
    // State
    cliente,
    clientiTrovati,
    isSearchingClienti,
    showClientiTrovati,
    clienteDaAggiornare,
    showFormAggiornaCliente,
    preventivo,
    preventiviClienteList,
    showPreventiviClienteList,
    showFormPreventivo,
    serviziATerra,
    serviziAggiuntivi,
    voli,
    assicurazioni,
    partecipanti,
    preventivoAlCliente,
    feedback,
    errorsList,
    
    // Actions
    updateClienteField,
    setClientiTrovati,
    setIsSearchingClienti,
    setShowClientiTrovati,
    resetClienteForm,
    setClienteDaAggiornare,
    updateClienteDaAggiornareField,
    setShowFormAggiornaCliente,
    updatePreventivoField,
    setPreventivo,
    setPreventiviClienteList,
    setShowPreventiviClienteList,
    setShowFormPreventivo,
    serviziATerraActions,
    serviziAggiuntiviActions,
    voliActions,
    assicurazioniActions,
    partecipantiActions,
    updatePreventivoAlClienteDescrizioneViaggio,
    addPreventivoAlClienteRow,
    removePreventivoAlClienteRow,
    updatePreventivoAlClienteRow,
    setFeedback,
    setErrorsList,
    clearAll,
    loadPreventivoData
  } = useGeneralInterface();

  // Auto-carica preventivo da URL parametri
  useEffect(() => {
    const numeroPreventivo = searchParams.get('preventivo');
    
    // Solo se c'è un parametro URL, non abbiamo già caricato automaticamente, 
    // e non c'è già un preventivo caricato (per evitare conflitti con flusso normale)
    if (numeroPreventivo && !hasAutoLoaded && !preventivo?.id) {
      setHasAutoLoaded(true);
      
      const loadPreventivoFromUrl = async () => {
        setIsActiveSpinner(true);
        try {
          const result = await PreventivoService.fetchPreventivoCompletoByNumero(numeroPreventivo);
          
          if (result.success && result.data) {
            // Transform data using entity transformation
            const transformedData = await transformPreventivoCompleto(result.data);
            
            // Crea oggetti InputGroup dal preventivo e cliente
            const clienteInputGroup = new ClienteInputGroup(
              result.data.preventivo.cliente.nome,           // nome
              result.data.preventivo.cliente.cognome,        // cognome
              undefined,                                      // note
              result.data.preventivo.cliente.citta,          // citta
              undefined,                                      // collegato
              undefined,                                      // tipo
              result.data.preventivo.cliente.data_di_nascita, // data_di_nascita
              result.data.preventivo.cliente.tel,            // tel
              result.data.preventivo.cliente.email,          // email
              undefined,                                      // provenienza
              result.data.preventivo.cliente.indirizzo,      // indirizzo
              result.data.preventivo.cliente.cap,            // cap
              result.data.preventivo.cliente.codice_fiscale, // cf
              result.data.preventivo.cliente.luogo_di_nascita, // luogo_nascita
              undefined,                                      // provincia_nascita
              result.data.preventivo.cliente.numero_passaporto, // numero_passaporto
              result.data.preventivo.cliente.data_scadenza_passaporto, // data_scadenza_passaporto
              undefined,                                      // nazionalita
              undefined,                                      // provincia
              undefined,                                      // sesso
              result.data.preventivo.cliente.id              // id (ultimo parametro)
            );
            
            // Usiamo il costruttore che accetta direttamente l'oggetto Preventivo
            const preventivoInputGroup = new PreventivoInputGroup(result.data.preventivo);
            
            // Load all data into context
            loadPreventivoData({
              cliente: clienteInputGroup,
              preventivo: preventivoInputGroup,
              serviziATerra: transformedData.serviziATerra,
              serviziAggiuntivi: transformedData.serviziAggiuntivi,
              voli: transformedData.voli,
              assicurazioni: transformedData.assicurazioni,
              partecipanti: transformedData.partecipanti || [],
              preventivoAlCliente: transformedData.preventivoAlCliente
            });
            
            setClienteDaAggiornare(clienteInputGroup);
            setFeedback({ success: true });
          } else {
            setErrorsList([result.error || 'Errore nel caricamento preventivo']);
          }
        } catch (error) {
          setErrorsList(['Errore nel caricamento preventivo: ' + error.toString()]);
        } finally {
          setIsActiveSpinner(false);
        }
      };
      
      loadPreventivoFromUrl();
    }
  }, [searchParams, hasAutoLoaded, preventivo?.id, setIsActiveSpinner, transformPreventivoCompleto, loadPreventivoData, setClienteDaAggiornare, setFeedback, setErrorsList]);

  // Handlers
  const onVCCliente = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fieldName: string) => {
    const fieldType = fieldName === 'data_di_nascita' || fieldName === 'data_scadenza_passaporto' ? 'date' : 'string';
    updateClienteField(fieldName as any, e.target.value, fieldType);
    debouncedSearchClienti();
  };

  const onVCClienteDaAggiornare = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fieldName: string) => {
    const fieldType = fieldName === 'data_di_nascita' || fieldName === 'data_scadenza_passaporto' ? 'date' : 'string';
    updateClienteDaAggiornareField(fieldName as any, e.target.value, fieldType);
  };

  const onVCpreventivo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fieldName: string) => {
    let fieldType = 'string';
    if (['data_partenza', 'data'].includes(fieldName)) fieldType = 'date';
    else if (['adulti', 'bambini'].includes(fieldName)) fieldType = 'number';
    else if (['percentuale_ricarico'].includes(fieldName)) fieldType = 'float';
    
    updatePreventivoField(fieldName as any, e.target.value, fieldType);
  };

  // Debounced search for clienti
  const debouncedSearchClienti = useDebouncedCallback(async () => {
    setIsSearchingClienti(true);
    setShowClientiTrovati(false);
    setShowFormPreventivo(false);
    
    try {
      const result = await ClienteService.searchClienti(cliente);
      
      // Mostra sempre i risultati, anche se vuoti
      setClientiTrovati(result.data || []);
      setShowClientiTrovati(true);
      
      // Gestisci gli errori separatamente
      if (!result.success && result.error) {
        setErrorsList([result.error]);
      } else {
        setErrorsList([]); // Pulisci eventuali errori precedenti
      }
    } catch (error) {
      setErrorsList(['Errore nella ricerca clienti: ' + error.toString()]);
      setClientiTrovati([]);
      setShowClientiTrovati(true); // Mostra comunque la sezione vuota
    } finally {
      setIsSearchingClienti(false);
    }
  }, 500);

  const submitCreateCliente = async () => {
    setIsActiveSpinner(true);
    try {
      const result = await ClienteService.createCliente(cliente);
      if (result.success) {
        const searchResult = await ClienteService.searchClienti(cliente);
        setClientiTrovati(searchResult.data);
        setFeedback({ success: true });
      } else {
        setErrorsList([result.error || 'Errore nella creazione del cliente']);
      }
    } catch (error) {
      setErrorsList(['Errore nella creazione del cliente: ' + error.toString()]);
    } finally {
      setIsActiveSpinner(false);
    }
  };

  const onClickMostraListaPreventivi = async (c: any) => {
    setIsActiveSpinner(true);
    try {
      const result = await ClienteService.fetchPreventiviByCliente(c.id);
      if (result.success) {
        setClienteDaAggiornare(c);
        setPreventiviClienteList(result.data);
        setShowPreventiviClienteList(!showPreventiviClienteList);
      } else {
        setErrorsList([result.error || 'Errore nel recupero preventivi']);
      }
    } catch (error) {
      setErrorsList(['Errore nel recupero preventivi: ' + error.toString()]);
    } finally {
      setIsActiveSpinner(false);
    }
  };

  const onClickNuovoPreventivo = async (c: any) => {
    setIsActiveSpinner(true);
    try {
      const result = await PreventivoService.getNextPreventivoNumber();
      if (result.success) {
        // Pulisci solo i dati del preventivo, mantieni il cliente
        serviziATerraActions.clearItems();
        serviziAggiuntiviActions.clearItems();
        voliActions.clearItems();
        assicurazioniActions.clearItems();
        partecipantiActions.clearItems();
        setClienteDaAggiornare(c);
        setPreventivo(new PreventivoInputGroup(result.numeroPreventivo));
        setShowFormPreventivo(true);
        setShowFormAggiornaCliente(false);
        setShowPreventiviClienteList(false);
        setShowClientiTrovati(false);
        setErrorsList([]);
        setFeedback(null);
      } else {
        setErrorsList([result.error || 'Errore nel recupero numero preventivo']);
      }
    } catch (error) {
      setErrorsList(['Errore nel recupero numero preventivo: ' + error.toString()]);
    } finally {
      setIsActiveSpinner(false);
    }
  };

  const onClickShowFormAggiornaCliente = (c: any) => {
    setClienteDaAggiornare(c);
    setShowFormAggiornaCliente(!showFormAggiornaCliente);
  };

  const submitUpdateCliente = async (c: any) => {
    setIsActiveSpinner(true);
    try {
      const result = await ClienteService.updateCliente(c);
      if (result.success) {
        setClienteDaAggiornare(c);
        setShowClientiTrovati(false);
        setFeedback({ success: true });
      } else {
        setErrorsList([result.error || 'Errore nell\'aggiornamento del cliente']);
      }
    } catch (error) {
      setErrorsList(['Errore nell\'aggiornamento del cliente: ' + error.toString()]);
    } finally {
      setIsActiveSpinner(false);
    }
  };

  const onClickShowFormAggiornaPreventivo = async (c: any, p: any) => {
    setIsActiveSpinner(true);
    try {
      const result = await PreventivoService.fetchPreventivoCompleto(p);
      if (result.success) {
        // Transform data using entity transformation
        const transformedData = await transformPreventivoCompleto(result.data);
        
        // Assicurati che il cliente sia impostato correttamente
        setClienteDaAggiornare(c);
        
        // Load all data into context
        loadPreventivoData({
          cliente: c,
          preventivo: p,
          serviziATerra: transformedData.serviziATerra,
          serviziAggiuntivi: transformedData.serviziAggiuntivi,
          voli: transformedData.voli,
          assicurazioni: transformedData.assicurazioni,
          partecipanti: transformedData.partecipanti || [],
          preventivoAlCliente: transformedData.preventivoAlCliente
        });
      } else {
        setErrorsList([result.error || 'Errore nel caricamento preventivo']);
      }
    } catch (error) {
      setErrorsList(['Errore nel caricamento preventivo: ' + error.toString()]);
    } finally {
      setIsActiveSpinner(false);
    }
  };

  const submitCreatePreventivo = async () => {
    setErrorsList([]);
    setIsActiveSpinner(true);
    
    try {
      // Per la creazione di un nuovo preventivo, usa clienteDaAggiornare invece di cliente
      const clienteToUse = clienteDaAggiornare.id ? clienteDaAggiornare : cliente;
      
      if (!clienteToUse.id) {
        setErrorsList(['Errore: Nessun cliente selezionato per il preventivo']);
        return;
      }

      const data: Data = {
        cliente: clienteToUse,
        preventivo: preventivo!,
        serviziATerra: serviziATerra,
        serviziAggiuntivi: serviziAggiuntivi,
        voli: voli,
        assicurazioni: assicurazioni,
        partecipanti: partecipanti,
        preventivoAlCliente: preventivoAlCliente
      };

      const result = await PreventivoService.createPreventivo(data);
      if (result.success) {
        setFeedback({ success: true });
        setShowFormPreventivo(false);
      } else {
        setErrorsList([result.error || 'Errore nella creazione del preventivo']);
      }
    } catch (error) {
      setErrorsList(['Errore nella creazione del preventivo: ' + error.toString()]);
    } finally {
      setIsActiveSpinner(false);
    }
  };

  const submitUpdatePreventivo = async () => {
    setErrorsList([]);
    setIsActiveSpinner(true);
    
    try {
      // Per l'aggiornamento, usa clienteDaAggiornare se disponibile
      const clienteToUse = clienteDaAggiornare.id ? clienteDaAggiornare : cliente;
      
      if (!clienteToUse.id) {
        setErrorsList(['Errore: Nessun cliente selezionato per il preventivo']);
        return;
      }

      const data: Data = {
        cliente: clienteToUse,
        preventivo: preventivo!,
        serviziATerra: serviziATerra,
        serviziAggiuntivi: serviziAggiuntivi,
        voli: voli,
        assicurazioni: assicurazioni,
        partecipanti: partecipanti,
        preventivoAlCliente: preventivoAlCliente
      };

      const result = await PreventivoService.updatePreventivo(data);
      if (result.success) {
        setFeedback({ success: true });
        setShowFormPreventivo(false);
      } else {
        setErrorsList([result.error || 'Errore nell\'aggiornamento del preventivo']);
      }
    } catch (error) {
      setErrorsList(['Errore nell\'aggiornamento del preventivo: ' + error.toString()]);
    } finally {
      setIsActiveSpinner(false);
    }
  };

  const submitDuplicatePreventivo = async () => {
    setErrorsList([]);
    setIsActiveSpinner(true);
    
    try {
      // Per la duplicazione, usa clienteDaAggiornare
      const clienteToUse = clienteDaAggiornare.id ? clienteDaAggiornare : cliente;
      
      if (!clienteToUse.id) {
        setErrorsList(['Errore: Nessun cliente selezionato per il preventivo']);
        return;
      }

      const data: Data = {
        cliente: clienteToUse,
        preventivo: preventivo!,
        serviziATerra: serviziATerra,
        serviziAggiuntivi: serviziAggiuntivi,
        voli: voli,
        assicurazioni: assicurazioni,
        preventivoAlCliente: preventivoAlCliente
      };

      const result = await PreventivoService.duplicatePreventivo(data);
      if (result.success) {
        setFeedback({ success: true });
        setShowFormPreventivo(false);
        // Opzionalmente, ricarica la lista dei preventivi del cliente per mostrare il nuovo preventivo
        if (clienteDaAggiornare?.id) {
          const preventiviResult = await ClienteService.fetchPreventiviByCliente(clienteDaAggiornare.id);
          if (preventiviResult.success) {
            setPreventiviClienteList(preventiviResult.data);
          }
        }
      } else {
        setErrorsList([result.error || 'Errore nella duplicazione del preventivo']);
      }
    } catch (error) {
      setErrorsList(['Errore nella duplicazione del preventivo: ' + error.toString()]);
    } finally {
      setIsActiveSpinner(false);
    }
  };

  // Funzioni per gestione pagamenti
  const handleAddPagamento = (serviceType: 'serviziATerra' | 'serviziAggiuntivi' | 'voli' | 'partecipanti', groupId: number) => {
    setCurrentServiceType(serviceType);
    setCurrentServiceGroupId(groupId);
    setCurrentPagamento(undefined);
    setCurrentPagamentoIndex(null);
    setIsPagamentoModalOpen(true);
  };

  const handleEditPagamento = (serviceType: 'serviziATerra' | 'serviziAggiuntivi' | 'voli' | 'partecipanti', groupId: number, pagamentoIndex: number) => {
    setCurrentServiceType(serviceType);
    setCurrentServiceGroupId(groupId);
    setCurrentPagamentoIndex(pagamentoIndex);
    
    // Trova il pagamento da modificare
    let targetService;
    if (serviceType === 'serviziATerra') {
      targetService = serviziATerra.find(s => s.groupId === groupId);
    } else if (serviceType === 'serviziAggiuntivi') {
      targetService = serviziAggiuntivi.find(s => s.groupId === groupId);
    } else if (serviceType === 'voli') {
      targetService = voli.find(s => s.groupId === groupId);
    } else if (serviceType === 'partecipanti') {
      targetService = partecipanti.find(s => s.groupId === groupId);
    }
    
    if (targetService) {
      let pagamenti;
      if (serviceType === 'partecipanti') {
        pagamenti = targetService.incassi;
      } else {
        pagamenti = targetService.pagamenti;
      }
      
      if (pagamenti && pagamenti[pagamentoIndex]) {
        setCurrentPagamento(pagamenti[pagamentoIndex]);
      }
    }
    
    setIsPagamentoModalOpen(true);
  };

  const handleSavePagamento = (pagamento: Pagamento) => {
    if (!currentServiceType || currentServiceGroupId === null) return;

    if (currentPagamentoIndex !== null) {
      // Modifica pagamento esistente
      if (currentServiceType === 'serviziATerra') {
        serviziATerraActions.updatePagamentoInItem(currentServiceGroupId, currentPagamentoIndex, pagamento);
      } else if (currentServiceType === 'serviziAggiuntivi') {
        serviziAggiuntiviActions.updatePagamentoInItem(currentServiceGroupId, currentPagamentoIndex, pagamento);
      } else if (currentServiceType === 'voli') {
        voliActions.updatePagamentoInItem(currentServiceGroupId, currentPagamentoIndex, pagamento);
      } else if (currentServiceType === 'partecipanti') {
        partecipantiActions.updateIncassoInItem(currentServiceGroupId, currentPagamentoIndex, pagamento);
      }
    } else {
      // Nuovo pagamento
      if (currentServiceType === 'serviziATerra') {
        serviziATerraActions.addPagamentoToItem(currentServiceGroupId, pagamento);
      } else if (currentServiceType === 'serviziAggiuntivi') {
        serviziAggiuntiviActions.addPagamentoToItem(currentServiceGroupId, pagamento);
      } else if (currentServiceType === 'voli') {
        voliActions.addPagamentoToItem(currentServiceGroupId, pagamento);
      } else if (currentServiceType === 'partecipanti') {
        partecipantiActions.addIncassoToItem(currentServiceGroupId, pagamento);
      }
    }
  };

  const handleDeletePagamento = () => {
    if (!currentServiceType || currentServiceGroupId === null || currentPagamentoIndex === null) return;

    if (currentServiceType === 'serviziATerra') {
      serviziATerraActions.removePagamentoFromItem(currentServiceGroupId, currentPagamentoIndex);
    } else if (currentServiceType === 'serviziAggiuntivi') {
      serviziAggiuntiviActions.removePagamentoFromItem(currentServiceGroupId, currentPagamentoIndex);
    } else if (currentServiceType === 'voli') {
      voliActions.removePagamentoFromItem(currentServiceGroupId, currentPagamentoIndex);
    } else if (currentServiceType === 'partecipanti') {
      partecipantiActions.removeIncassoFromItem(currentServiceGroupId, currentPagamentoIndex);
    }
  };

  // Auto-clear feedback after success
  useEffect(() => {
    if (feedback?.success) {
      const timer = setTimeout(() => {
        setFeedback(null);
        setErrorsList([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback, setFeedback, setErrorsList]);

  return (
    <div className='flex flex-col space-y-6'>
      {feedback && <Feedback result={feedback} />}

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="pl-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <DocumentTextIcon className="w-8 h-8 text-green-600" />
            Gestione Preventivi
          </h1>
          <p className="text-gray-600 mt-2">
            Sistema completo dei preventivi dei clienti.
          </p>
        </div>
      </div>

      <div className="general-interface-container max-w-7xl">
        {/* Cliente Section */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <UserIcon className="w-6 h-6 text-blue-600" />
                Gestione Cliente
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={submitCreateCliente}
                >
                  <PlusIcon className="w-4 h-4" />
                  Crea Cliente
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                >
                  Pulisci Tutto
                </Button>
              </div>
            </div>
            <CardDescription>
              Inserisci i dati del cliente per cercare clienti esistenti o crearne di nuovi
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <ClienteForm
              cliente={cliente}
              onFieldChange={onVCCliente}
            />

            {isSearchingClienti && !showClientiTrovati && (
              <div className="flex flex-col py-4">
                <LoadingText text="Ricerca clienti" className="text-lg" />
              </div>
            )}

            {showClientiTrovati && (
              <ClientiTrovatiList
                clientiTrovati={clientiTrovati}
                showFormAggiornaCliente={showFormAggiornaCliente}
                clienteDaAggiornare={clienteDaAggiornare}
                showPreventiviClienteList={showPreventiviClienteList}
                preventiviClienteList={preventiviClienteList}
                onMostraListaPreventivi={onClickMostraListaPreventivi}
                onNuovoPreventivo={onClickNuovoPreventivo}
                onShowFormAggiornaCliente={onClickShowFormAggiornaCliente}
                onUpdateCliente={submitUpdateCliente}
                onFieldChangeClienteDaAggiornare={onVCClienteDaAggiornare}
                onShowFormAggiornaPreventivo={onClickShowFormAggiornaPreventivo}
              />
            )}
          </CardContent>
        </Card>

        {/* Preventivo Section */}
        {showFormPreventivo && (
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-50 to-brown-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <DocumentTextIcon className="w-6 h-6 text-green-600" />
                Gestione Preventivo
                {preventivo && (
                  <Badge variant="outline" className="ml-2">
                    {preventivo.brand} {preventivo.numero_preventivo}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Crea o modifica un preventivo di viaggio con tutti i servizi inclusi
              </CardDescription>
            </CardHeader>

            <CardContent className="py-6">
              <div className="flex flex-col">
                {/* Preventivo Form */}
                {preventivo && (
                  <PreventivoForm
                    preventivo={preventivo}
                    onFieldChange={onVCpreventivo}
                    brandOptions={brandOptions}
                    operatoreOptions={operatoreOptions}
                    destinazioniOptions={destinazioniOptions}
                  />
                )}

                {/* Servizi a Terra */}
                {(() => {
                  const { fieldConfigs, calculationConfigs, calculateTotal } = getServiziATerraConfigs(
                    destinazioniOptions, 
                    fornitoriOptions, 
                    valuteOptions
                  );
                  return (
                    <DynamicServiceList
                      title="Servizi a Terra"
                      items={serviziATerra}
                      fieldConfigs={fieldConfigs}
                      calculationConfigs={calculationConfigs}
                      onAddItem={serviziATerraActions.addItem}
                      onRemoveItem={serviziATerraActions.removeItem}
                      onUpdateItem={serviziATerraActions.updateItem}
                      calculateTotal={calculateTotal}
                      totalLabel="somma tot euro"
                      calculationArgs={[preventivo?.percentuale_ricarico]}
                      onAddPagamento={(groupId) => handleAddPagamento('serviziATerra', groupId)}
                      onEditPagamento={(groupId, pagamentoIndex) => handleEditPagamento('serviziATerra', groupId, pagamentoIndex)}
                    />
                  );
                })()}

                {/* Servizi Aggiuntivi */}
                {(() => {
                  const { fieldConfigs, calculationConfigs, calculateTotal } = getServiziATerraConfigs(
                    destinazioniOptions, 
                    fornitoriOptions, 
                    valuteOptions
                  );
                  return (
                    <DynamicServiceList
                      title="Servizi aggiuntivi"
                      items={serviziAggiuntivi}
                      fieldConfigs={fieldConfigs}
                      calculationConfigs={calculationConfigs}
                      onAddItem={serviziAggiuntiviActions.addItem}
                      onRemoveItem={serviziAggiuntiviActions.removeItem}
                      onUpdateItem={serviziAggiuntiviActions.updateItem}
                      calculateTotal={calculateTotal}
                      totalLabel="somma tot euro"
                      calculationArgs={[preventivo?.percentuale_ricarico]}
                      onAddPagamento={(groupId) => handleAddPagamento('serviziAggiuntivi', groupId)}
                      onEditPagamento={(groupId, pagamentoIndex) => handleEditPagamento('serviziAggiuntivi', groupId, pagamentoIndex)}
                    />
                  );
                })()}

                {/* Voli */}
                {(() => {
                  const { fieldConfigs, calculationConfigs, calculateTotal } = getVoliConfigs(
                    fornitoriOptions, 
                    valuteOptions
                  );
                  return (
                    <DynamicServiceList
                      title="Voli"
                      items={voli}
                      fieldConfigs={fieldConfigs}
                      calculationConfigs={calculationConfigs}
                      onAddItem={voliActions.addItem}
                      onRemoveItem={voliActions.removeItem}
                      onUpdateItem={voliActions.updateItem}
                      calculateTotal={calculateTotal}
                      totalLabel="somma tot euro"
                      onAddPagamento={(groupId) => handleAddPagamento('voli', groupId)}
                      onEditPagamento={(groupId, pagamentoIndex) => handleEditPagamento('voli', groupId, pagamentoIndex)}
                    />
                  );
                })()}

                {/* Assicurazioni */}
                {(() => {
                  const { fieldConfigs, calculationConfigs, calculateTotal } = getAssicurazioniConfigs(
                    fornitoriOptions
                  );
                  return (
                    <DynamicServiceList
                      title="Assicurazioni"
                      items={assicurazioni}
                      fieldConfigs={fieldConfigs}
                      calculationConfigs={calculationConfigs}
                      onAddItem={assicurazioniActions.addItem}
                      onRemoveItem={assicurazioniActions.removeItem}
                      onUpdateItem={assicurazioniActions.updateItem}
                      calculateTotal={calculateTotal}
                      totalLabel="somma tot euro"
                    />
                  );
                })()}

                {/* Partecipanti */}
                {(() => {
                  const { fieldConfigs, calculationConfigs, calculateTotaleQuote, calculateTotaleDifferenze } = getPartecipantiConfigs();
                  return (
                    <div>
                      <DynamicServiceList
                        title="Partecipanti"
                        items={partecipanti}
                        fieldConfigs={fieldConfigs}
                        calculationConfigs={calculationConfigs}
                        onAddItem={partecipantiActions.addItem}
                        onRemoveItem={partecipantiActions.removeItem}
                        onUpdateItem={partecipantiActions.updateItem}
                        onAddPagamento={(groupId) => handleAddPagamento('partecipanti', groupId)}
                        onEditPagamento={(groupId, incassoIndex) => handleEditPagamento('partecipanti', groupId, incassoIndex)}
                      />
                      
                      {/* Totali Partecipanti */}
                      <div className="flex flex-row justify-end pt-4 pr-11 space-x-8">
                        <div className="text-right">
                          <p className="font-semibold">Totale Quote: {formatNumberItalian(calculateTotaleQuote(partecipanti))}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Totale Differenze: {formatNumberItalian(calculateTotaleDifferenze(partecipanti))}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                                 {/* Totale */}
                 <div className="tot-euro-of-list flex flex-row items-center justify-end pt-4 pr-11">
                   <p className='border-t-2 border-gray-300 pt-2'>
                     somma di tutti i tot euro: {formatNumberItalian(getSommaTuttiTotEuro(preventivo?.percentuale_ricarico, serviziATerra, serviziAggiuntivi, voli, assicurazioni))}
                   </p>
                 </div>

                 {/* Preventivo al Cliente */}
                 <PreventivoAlClienteForm
                   preventivoAlCliente={preventivoAlCliente}
                   destinazioniOptions={destinazioniOptions}
                   onUpdateDescrizioneViaggio={updatePreventivoAlClienteDescrizioneViaggio}
                   onAddRow={addPreventivoAlClienteRow}
                   onRemoveRow={removePreventivoAlClienteRow}
                   onUpdateRow={updatePreventivoAlClienteRow}
                 />

                                                                     {/* Buttons */}
                 <div className="flex flex-row items-center justify-center pt-10 gap-4">
                   {preventivo?.id ? (
                     // Se il preventivo esiste, mostra "Duplica Preventivo"
                     <Button size="lg" onClick={submitDuplicatePreventivo}>
                       <PlusIcon className="w-4 h-4 mr-2" />
                       Duplica Preventivo
                     </Button>
                   ) : (
                     // Se è un nuovo preventivo, mostra "Crea Preventivo"
                     <Button size="lg" onClick={submitCreatePreventivo}>
                       <PlusIcon className="w-4 h-4 mr-2" />
                       Crea Preventivo
                     </Button>
                   )}
                   {preventivo?.id && (
                     <Button variant="secondary" size="lg" onClick={submitUpdatePreventivo}>
                       <DocumentTextIcon className="w-4 h-4 mr-2" />
                       Aggiorna Preventivo
                     </Button>
                   )}
                 </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Errors Section */}
        {errorsList.length > 0 && (
          <Card className="border-l-4 border-l-red-500 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700 text-lg">Errori Rilevati</CardTitle>
              <CardDescription>Correggi i seguenti errori per continuare</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {errorsList.map((error, index) => (
                  <li key={index} className="text-red-600 flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modale Pagamenti */}
      <PagamentoModal
        isOpen={isPagamentoModalOpen}
        onClose={() => setIsPagamentoModalOpen(false)}
        onSave={handleSavePagamento}
        onDelete={currentPagamentoIndex !== null ? handleDeletePagamento : undefined}
        pagamento={currentPagamento}
        bancheOptions={bancheOptions}
        title={currentPagamentoIndex !== null ? "Modifica Pagamento" : "Nuovo Pagamento"}
      />
    </div>
  );
}

export default function GeneralInterfacePage() {
  return (
    <GeneralInterfaceProvider>
      <GeneralInterfaceContent />
    </GeneralInterfaceProvider>
  );
}
