// Forms
export { ClienteForm } from './forms/ClienteForm';
export type { ClienteFormProps } from './forms/ClienteForm';

export { PreventivoForm } from './forms/PreventivoForm';
export type { PreventivoFormProps } from './forms/PreventivoForm';

export { PreventivoAlClienteForm } from './forms/PreventivoAlClienteForm';
export type { PreventivoAlClienteFormProps } from './forms/PreventivoAlClienteForm';

// Lists
export { DynamicServiceList } from './lists/DynamicServiceList';
export type { 
  DynamicServiceListProps, 
  FieldConfig, 
  CalculationConfig,
  DynamicListItem 
} from './lists/DynamicServiceList';

export { 
  getServiziATerraConfigs,
  getVoliConfigs,
  getAssicurazioniConfigs,
  getPartecipantiConfigs
} from './lists/ServiceListConfigs';

// Display
export { ClientiTrovatiList } from './display/ClientiTrovatiList';
export type { ClientiTrovatiListProps } from './display/ClientiTrovatiList';

// Main Page Component
export { default as GeneralInterfacePage } from './GeneralInterfacePage';

// Modals
export { PagamentoModal } from './modals/PagamentoModal';
export type { PagamentoModalProps } from './modals/PagamentoModal';

// UI Components
export { LoadingText } from './ui/LoadingText';
