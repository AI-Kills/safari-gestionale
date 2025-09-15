import { useState, useCallback } from 'react';
import { Pagamento } from '../general-interface.defs';

export function usePagamentiManagement(initialPagamenti: Pagamento[] = []) {
  const [pagamenti, setPagamenti] = useState<Pagamento[]>(initialPagamenti);
  
  // Genera nuovo ID per pagamento
  const generateNewId = useCallback((): string => {
    return `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Aggiunge nuovo pagamento
  const addPagamento = useCallback(() => {
    const newId = generateNewId();
    const newPagamento = new Pagamento(newId);
    setPagamenti(prev => [...prev, newPagamento]);
    return newPagamento;
  }, [generateNewId]);

  // Aggiorna pagamento esistente
  const updatePagamento = useCallback((index: number, updatedPagamento: Pagamento) => {
    setPagamenti(prev => prev.map((pagamento, i) => 
      i === index ? updatedPagamento : pagamento
    ));
  }, []);

  // Rimuove pagamento
  const removePagamento = useCallback((index: number) => {
    setPagamenti(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Imposta tutti i pagamenti
  const setAllPagamenti = useCallback((newPagamenti: Pagamento[]) => {
    setPagamenti(newPagamenti);
  }, []);

  // Pulisce tutti i pagamenti
  const clearPagamenti = useCallback(() => {
    setPagamenti([]);
  }, []);

  // Ottiene pagamento per indice
  const getPagamento = useCallback((index: number): Pagamento | undefined => {
    return pagamenti[index];
  }, [pagamenti]);

  return {
    pagamenti,
    addPagamento,
    updatePagamento,
    removePagamento,
    setAllPagamenti,
    clearPagamenti,
    getPagamento,
    count: pagamenti.length
  };
}
