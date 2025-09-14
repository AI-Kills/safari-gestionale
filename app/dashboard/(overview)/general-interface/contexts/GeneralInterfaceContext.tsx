'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  ClienteInputGroup, 
  PreventivoInputGroup, 
  ServizioATerraInputGroup, 
  VoloInputGroup, 
  AssicurazioneInputGroup,
  PreventivoAlClienteInputGroup,
  Data
} from '../general-interface.defs';
import { 
  useFormState, 
  useServiziATerraManagement,
  useServiziAggiuntiviManagement,
  useVoliManagement,
  useAssicurazioniManagement,
  useEntityTransformation
} from '../hooks';
import { usePreventivoAlClienteManagement } from '../hooks/usePreventivoAlClienteManagement';

// Types for the context
export interface GeneralInterfaceState {
  // Cliente state
  cliente: ClienteInputGroup;
  clientiTrovati: ClienteInputGroup[];
  isSearchingClienti: boolean;
  showClientiTrovati: boolean;
  
  // Cliente da aggiornare
  clienteDaAggiornare: ClienteInputGroup;
  showFormAggiornaCliente: boolean;
  
  // Preventivi
  preventivo?: PreventivoInputGroup;
  preventiviClienteList: PreventivoInputGroup[];
  showPreventiviClienteList: boolean;
  showFormPreventivo: boolean;
  
  // Servizi
  serviziATerra: ServizioATerraInputGroup[];
  serviziAggiuntivi: ServizioATerraInputGroup[];
  voli: VoloInputGroup[];
  assicurazioni: AssicurazioneInputGroup[];
  
  // Preventivo al cliente
  preventivoAlCliente: PreventivoAlClienteInputGroup;
  
  // UI State
  feedback: { success: boolean } | null;
  errorsList: string[];
}

export interface GeneralInterfaceActions {
  // Cliente actions
  updateClienteField: (field: keyof ClienteInputGroup, value: any, fieldType?: string) => void;
  setClientiTrovati: (clienti: ClienteInputGroup[]) => void;
  setIsSearchingClienti: (searching: boolean) => void;
  setShowClientiTrovati: (show: boolean) => void;
  resetClienteForm: () => void;
  
  // Cliente da aggiornare actions
  setClienteDaAggiornare: (cliente: ClienteInputGroup) => void;
  updateClienteDaAggiornareField: (field: keyof ClienteInputGroup, value: any, fieldType?: string) => void;
  setShowFormAggiornaCliente: (show: boolean) => void;
  
  // Preventivo actions
  setPreventivo: (preventivo: PreventivoInputGroup) => void;
  updatePreventivoField: (field: keyof PreventivoInputGroup, value: any, fieldType?: string) => void;
  setPreventiviClienteList: (preventivi: PreventivoInputGroup[]) => void;
  setShowPreventiviClienteList: (show: boolean) => void;
  setShowFormPreventivo: (show: boolean) => void;
  
  // Servizi actions
  serviziATerraActions: {
    addItem: () => void;
    removeItem: (groupId: number) => void;
    updateItem: (groupId: number, field: string, value: any) => void;
    setAllItems: (items: ServizioATerraInputGroup[]) => void;
    clearItems: () => void;
  };
  
  serviziAggiuntiviActions: {
    addItem: () => void;
    removeItem: (groupId: number) => void;
    updateItem: (groupId: number, field: string, value: any) => void;
    setAllItems: (items: ServizioATerraInputGroup[]) => void;
    clearItems: () => void;
  };
  
  voliActions: {
    addItem: () => void;
    removeItem: (groupId: number) => void;
    updateItem: (groupId: number, field: string, value: any) => void;
    setAllItems: (items: VoloInputGroup[]) => void;
    clearItems: () => void;
  };
  
  assicurazioniActions: {
    addItem: () => void;
    removeItem: (groupId: number) => void;
    updateItem: (groupId: number, field: string, value: any) => void;
    setAllItems: (items: AssicurazioneInputGroup[]) => void;
    clearItems: () => void;
  };
  
  // Preventivo al cliente actions
  setPreventivoAlCliente: (preventivo: PreventivoAlClienteInputGroup) => void;
  updatePreventivoAlClienteDescrizioneViaggio: (descrizione: string) => void;
  addPreventivoAlClienteRow: (tipo: 'righePrimoTipo' | 'righeSecondoTipo') => void;
  removePreventivoAlClienteRow: (tipo: 'righePrimoTipo' | 'righeSecondoTipo', groupId: number) => void;
  updatePreventivoAlClienteRow: (tipo: 'righePrimoTipo' | 'righeSecondoTipo', groupId: number, field: string, value: any) => void;
  
  // UI actions
  setFeedback: (feedback: { success: boolean } | null) => void;
  setErrorsList: (errors: string[]) => void;
  clearAll: () => void;
  
  // Data transformation
  loadPreventivoData: (data: {
    cliente: ClienteInputGroup;
    preventivo: PreventivoInputGroup;
    serviziATerra: ServizioATerraInputGroup[];
    serviziAggiuntivi: ServizioATerraInputGroup[];
    voli: VoloInputGroup[];
    assicurazioni: AssicurazioneInputGroup[];
    preventivoAlCliente: PreventivoAlClienteInputGroup;
  }) => void;
}

export type GeneralInterfaceContextType = GeneralInterfaceState & GeneralInterfaceActions;

const GeneralInterfaceContext = createContext<GeneralInterfaceContextType | undefined>(undefined);

export function GeneralInterfaceProvider({ children }: { children: React.ReactNode }) {
  // Cliente form state
  const clienteForm = useFormState({
    initialState: new ClienteInputGroup()
  });
  
  // Cliente da aggiornare form state
  const clienteDaAggiornareForm = useFormState({
    initialState: new ClienteInputGroup()
  });
  
  // Altri stati
  const [clientiTrovati, setClientiTrovati] = useState<ClienteInputGroup[]>([]);
  const [isSearchingClienti, setIsSearchingClienti] = useState<boolean>(false);
  const [showClientiTrovati, setShowClientiTrovati] = useState<boolean>(false);
  const [showFormAggiornaCliente, setShowFormAggiornaCliente] = useState<boolean>(false);
  
  const [preventivo, setPreventivo] = useState<PreventivoInputGroup>();
  const [preventiviClienteList, setPreventiviClienteList] = useState<PreventivoInputGroup[]>([]);
  const [showPreventiviClienteList, setShowPreventiviClienteList] = useState<boolean>(false);
  const [showFormPreventivo, setShowFormPreventivo] = useState<boolean>(false);
  
  // Preventivo al cliente manager
  const preventivoAlClienteManager = usePreventivoAlClienteManagement();
  
  const [feedback, setFeedback] = useState<{ success: boolean } | null>(null);
  const [errorsList, setErrorsList] = useState<string[]>([]);
  
  // Service managers
  const serviziATerraManager = useServiziATerraManagement();
  const serviziAggiuntiviManager = useServiziAggiuntiviManagement();
  const voliManager = useVoliManagement();
  const assicurazioniManager = useAssicurazioniManagement();
  
  // Entity transformation
  const { transformPreventivoCompleto } = useEntityTransformation();
  
  // Actions
  const updateClienteField = useCallback((field: keyof ClienteInputGroup, value: any, fieldType?: string) => {
    clienteForm.updateField(field, value, fieldType as any);
  }, [clienteForm]);
  
  const updateClienteDaAggiornareField = useCallback((field: keyof ClienteInputGroup, value: any, fieldType?: string) => {
    clienteDaAggiornareForm.updateField(field, value, fieldType as any);
  }, [clienteDaAggiornareForm]);
  
  const updatePreventivoField = useCallback((field: keyof PreventivoInputGroup, value: any, fieldType?: string) => {
    if (!preventivo) return;
    
    const updatedPreventivo = { ...preventivo } as any;
    
    // Type conversion
    switch (fieldType) {
      case 'date':
        updatedPreventivo[field] = new Date(value);
        break;
      case 'number':
        updatedPreventivo[field] = parseInt(value);
        break;
      case 'float':
        updatedPreventivo[field] = parseFloat(value);
        break;
      default:
        updatedPreventivo[field] = value;
    }
    
    setPreventivo(updatedPreventivo);
  }, [preventivo]);
  
  // Preventivo al cliente field updates
  const updatePreventivoAlClienteDescrizioneViaggio = useCallback((descrizione: string) => {
    preventivoAlClienteManager.updateDescrizioneViaggio(descrizione);
  }, [preventivoAlClienteManager]);

  const addPreventivoAlClienteRow = useCallback((tipo: 'righePrimoTipo' | 'righeSecondoTipo') => {
    preventivoAlClienteManager.addRow(tipo);
  }, [preventivoAlClienteManager]);

  const removePreventivoAlClienteRow = useCallback((tipo: 'righePrimoTipo' | 'righeSecondoTipo', groupId: number) => {
    preventivoAlClienteManager.removeRow(tipo, groupId);
  }, [preventivoAlClienteManager]);

  const updatePreventivoAlClienteRow = useCallback((
    tipo: 'righePrimoTipo' | 'righeSecondoTipo', 
    groupId: number, 
    field: string, 
    value: any
  ) => {
    preventivoAlClienteManager.updateRow(tipo, groupId, field, value);
  }, [preventivoAlClienteManager]);
  
  const clearAll = useCallback(() => {
    clienteForm.resetForm();
    clienteDaAggiornareForm.resetForm();
    setPreventivo(new PreventivoInputGroup(undefined));
    serviziATerraManager.clearItems();
    serviziAggiuntiviManager.clearItems();
    voliManager.clearItems();
    assicurazioniManager.clearItems();
    preventivoAlClienteManager.reset();
    setShowFormPreventivo(false);
    setShowFormAggiornaCliente(false);
    setShowPreventiviClienteList(false);
    setShowClientiTrovati(false);
    setErrorsList([]);
    setFeedback(null);
  }, [clienteForm, clienteDaAggiornareForm, serviziATerraManager, serviziAggiuntiviManager, voliManager, assicurazioniManager]);
  
  const loadPreventivoData = useCallback((data: {
    cliente: ClienteInputGroup;
    preventivo: PreventivoInputGroup;
    serviziATerra: ServizioATerraInputGroup[];
    serviziAggiuntivi: ServizioATerraInputGroup[];
    voli: VoloInputGroup[];
    assicurazioni: AssicurazioneInputGroup[];
    preventivoAlCliente: PreventivoAlClienteInputGroup;
  }) => {
    clienteForm.setFullState(data.cliente);
    setPreventivo(data.preventivo);
    serviziATerraManager.setAllItems(data.serviziATerra);
    serviziAggiuntiviManager.setAllItems(data.serviziAggiuntivi);
    voliManager.setAllItems(data.voli);
    assicurazioniManager.setAllItems(data.assicurazioni);
    preventivoAlClienteManager.setFullState(data.preventivoAlCliente);
    setShowFormPreventivo(true);
  }, [clienteForm, serviziATerraManager, serviziAggiuntiviManager, voliManager, assicurazioniManager]);
  
  const contextValue: GeneralInterfaceContextType = {
    // State
    cliente: clienteForm.formState,
    clientiTrovati,
    isSearchingClienti,
    showClientiTrovati,
    clienteDaAggiornare: clienteDaAggiornareForm.formState,
    showFormAggiornaCliente,
    preventivo,
    preventiviClienteList,
    showPreventiviClienteList,
    showFormPreventivo,
    serviziATerra: serviziATerraManager.items,
    serviziAggiuntivi: serviziAggiuntiviManager.items,
    voli: voliManager.items,
    assicurazioni: assicurazioniManager.items,
    preventivoAlCliente: preventivoAlClienteManager.preventivoAlCliente,
    feedback,
    errorsList,
    
    // Actions
    updateClienteField,
    setClientiTrovati,
    setIsSearchingClienti,
    setShowClientiTrovati,
    resetClienteForm: clienteForm.resetForm,
    setClienteDaAggiornare: clienteDaAggiornareForm.setFullState,
    updateClienteDaAggiornareField,
    setShowFormAggiornaCliente,
    setPreventivo,
    updatePreventivoField,
    setPreventiviClienteList,
    setShowPreventiviClienteList,
    setShowFormPreventivo,
    
    serviziATerraActions: {
      addItem: serviziATerraManager.addItem,
      removeItem: serviziATerraManager.removeItem,
      updateItem: serviziATerraManager.updateItem,
      setAllItems: serviziATerraManager.setAllItems,
      clearItems: serviziATerraManager.clearItems,
    },
    
    serviziAggiuntiviActions: {
      addItem: serviziAggiuntiviManager.addItem,
      removeItem: serviziAggiuntiviManager.removeItem,
      updateItem: serviziAggiuntiviManager.updateItem,
      setAllItems: serviziAggiuntiviManager.setAllItems,
      clearItems: serviziAggiuntiviManager.clearItems,
    },
    
    voliActions: {
      addItem: voliManager.addItem,
      removeItem: voliManager.removeItem,
      updateItem: voliManager.updateItem,
      setAllItems: voliManager.setAllItems,
      clearItems: voliManager.clearItems,
    },
    
    assicurazioniActions: {
      addItem: assicurazioniManager.addItem,
      removeItem: assicurazioniManager.removeItem,
      updateItem: assicurazioniManager.updateItem,
      setAllItems: assicurazioniManager.setAllItems,
      clearItems: assicurazioniManager.clearItems,
    },
    
    setPreventivoAlCliente: preventivoAlClienteManager.setFullState,
    updatePreventivoAlClienteDescrizioneViaggio,
    addPreventivoAlClienteRow,
    removePreventivoAlClienteRow,
    updatePreventivoAlClienteRow,
    setFeedback,
    setErrorsList,
    clearAll,
    loadPreventivoData
  };
  
  return (
    <GeneralInterfaceContext.Provider value={contextValue}>
      {children}
    </GeneralInterfaceContext.Provider>
  );
}

export function useGeneralInterface() {
  const context = useContext(GeneralInterfaceContext);
  if (context === undefined) {
    throw new Error('useGeneralInterface must be used within a GeneralInterfaceProvider');
  }
  return context;
}
