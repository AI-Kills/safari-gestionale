// Custom hooks per General Interface
export { useDynamicList } from './useDynamicList';
export type { DynamicListItem, UseDynamicListOptions } from './useDynamicList';

export { useFormState } from './useFormState';
export type { UseFormStateOptions, FormFieldConfig } from './useFormState';

export { useEntityTransformation } from './useEntityTransformation';

export { 
  useServiziATerraManagement,
  useServiziAggiuntiviManagement, 
  useVoliManagement,
  useAssicurazioniManagement,
  SERVIZIO_FIELD_TYPES,
  VOLO_FIELD_TYPES,
  ASSICURAZIONE_FIELD_TYPES
} from './useServiceListManagement';

export { usePreventivoAlClienteManagement } from './usePreventivoAlClienteManagement';
