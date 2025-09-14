import { FieldConfig, CalculationConfig } from './DynamicServiceList';
import { 
  ServizioATerraInputGroup, 
  VoloInputGroup, 
  AssicurazioneInputGroup 
} from '../../general-interface.defs';
import { 
  getTotServizio, 
  getRicaricoServizio, 
  getTotVolo, 
  getTotAssicurazione 
} from '../../helpers';

// Configurazioni per Servizi a Terra
export const getServiziATerraConfigs = (
  destinazioniOptions: string[], 
  fornitoriOptions: string[], 
  valuteOptions: string[]
) => {
  const fieldConfigs: FieldConfig[] = [
    {
      name: 'destinazione',
      label: 'Destinazione',
      type: 'select',
      options: destinazioniOptions,
      className: 'w-[120px]',
      showOnlyOnFirst: true
    },
    {
      name: 'fornitore',
      label: 'Fornitore',
      type: 'lookup',
      options: fornitoriOptions,
      className: 'w-[100px]',
      showOnlyOnFirst: true
    },
    {
      name: 'descrizione',
      label: 'Descrizione',
      type: 'text',
      className: 'w-[120px]',
      showOnlyOnFirst: true
    },
    {
      name: 'data',
      label: 'Data Inizio',
      type: 'date',
      showOnlyOnFirst: true
    },
    {
      name: 'numero_notti',
      label: 'N. Notti',
      type: 'number',
      className: 'w-[60px]',
      showOnlyOnFirst: true
    },
    {
      name: 'numero_camere',
      label: 'N. Cam.',
      type: 'number',
      className: 'w-[60px]',
      showOnlyOnFirst: true
    },
    {
      name: 'totale',
      label: 'Importo',
      type: 'number',
      className: 'w-[80px]',
      showOnlyOnFirst: true
    },
    {
      name: 'valuta',
      label: 'Valuta',
      type: 'lookup',
      options: valuteOptions,
      className: 'w-[60px]',
      showOnlyOnFirst: true
    },
    {
      name: 'cambio',
      label: 'Cambio',
      type: 'number',
      className: 'w-[60px]',
      showOnlyOnFirst: true
    }
  ];

  const calculationConfigs: CalculationConfig[] = [
    {
      label: 'ricarico',
      calculate: (servizio: ServizioATerraInputGroup, percentualeRicarico: number) =>
        getRicaricoServizio(servizio.totale, servizio.cambio, percentualeRicarico, servizio.numero_notti, servizio.numero_camere)
    },
    {
      label: 'tot euro',
      calculate: (servizio: ServizioATerraInputGroup, percentualeRicarico: number) =>
        getTotServizio(servizio.totale, servizio.cambio, percentualeRicarico, servizio.numero_notti, servizio.numero_camere)
    }
  ];

  const calculateTotal = (servizi: ServizioATerraInputGroup[], percentualeRicarico: number) =>
    servizi.reduce((acc, servizio) => 
      acc + getTotServizio(servizio.totale, servizio.cambio, percentualeRicarico, servizio.numero_notti, servizio.numero_camere), 0
    );

  return { fieldConfigs, calculationConfigs, calculateTotal };
};

// Configurazioni per Voli
export const getVoliConfigs = (
  fornitoriOptions: string[], 
  valuteOptions: string[]
) => {
  const fieldConfigs: FieldConfig[] = [
    {
      name: 'fornitore',
      label: 'Fornitore',
      type: 'lookup',
      options: fornitoriOptions,
      className: 'w-[100px]',
      showOnlyOnFirst: true
    },
    {
      name: 'compagnia_aerea',
      label: 'Compagnia',
      type: 'text',
      className: 'w-[120px]',
      showOnlyOnFirst: true
    },
    {
      name: 'descrizione',
      label: 'Descrizione',
      type: 'text',
      className: 'w-[120px]',
      showOnlyOnFirst: true
    },
    {
      name: 'data_partenza',
      label: 'Partenza',
      type: 'date',
      showOnlyOnFirst: true
    },
    {
      name: 'data_arrivo',
      label: 'Arrivo',
      type: 'date',
      showOnlyOnFirst: true
    },
    {
      name: 'totale',
      label: 'Totale',
      type: 'number',
      showOnlyOnFirst: true
    },
    {
      name: 'ricarico',
      label: 'Ricarico',
      type: 'number',
      showOnlyOnFirst: true
    },
    {
      name: 'numero',
      label: 'Numero',
      type: 'number',
      showOnlyOnFirst: true
    },
    {
      name: 'valuta',
      label: 'Valuta',
      type: 'lookup',
      options: valuteOptions,
      className: 'max-w-[60px]',
      showOnlyOnFirst: true
    },
    {
      name: 'cambio',
      label: 'Cambio',
      type: 'number',
      showOnlyOnFirst: true
    }
  ];

  const calculationConfigs: CalculationConfig[] = [
    {
      label: 'tot euro',
      calculate: (volo: VoloInputGroup) =>
        getTotVolo(volo.totale, volo.cambio, volo.ricarico, volo.numero),
      className: 'w-24'
    }
  ];

  const calculateTotal = (voli: VoloInputGroup[]) =>
    voli.reduce((acc, volo) => 
      acc + getTotVolo(volo.totale, volo.cambio, volo.ricarico, volo.numero), 0
    );

  return { fieldConfigs, calculationConfigs, calculateTotal };
};

// Configurazioni per Assicurazioni
export const getAssicurazioniConfigs = (fornitoriOptions: string[]) => {
  const fieldConfigs: FieldConfig[] = [
    {
      name: 'fornitore',
      label: 'Fornitore',
      type: 'lookup',
      options: fornitoriOptions,
      className: 'w-[100px]',
      showOnlyOnFirst: true
    },
    {
      name: 'assicurazione',
      label: 'Assicurazione',
      type: 'text',
      className: 'w-[120px]',
      showOnlyOnFirst: true
    },
    {
      name: 'netto',
      label: 'Netto',
      type: 'number',
      showOnlyOnFirst: true
    },
    {
      name: 'ricarico',
      label: 'Ricarico',
      type: 'number',
      showOnlyOnFirst: true
    },
    {
      name: 'numero',
      label: 'Numero',
      type: 'number',
      showOnlyOnFirst: true
    }
  ];

  const calculationConfigs: CalculationConfig[] = [
    {
      label: 'tot euro',
      calculate: (assicurazione: AssicurazioneInputGroup) =>
        getTotAssicurazione(assicurazione.netto, assicurazione.ricarico, assicurazione.numero),
      className: 'w-24'
    }
  ];

  const calculateTotal = (assicurazioni: AssicurazioneInputGroup[]) =>
    assicurazioni.reduce((acc, assicurazione) => 
      acc + getTotAssicurazione(assicurazione.netto, assicurazione.ricarico, assicurazione.numero), 0
    );

  return { fieldConfigs, calculationConfigs, calculateTotal };
};
