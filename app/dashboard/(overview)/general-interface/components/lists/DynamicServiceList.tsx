import React from 'react';
import moment from 'moment';
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import InputText from "@/app/ui/inputs/input-text";
import InputSelect from "@/app/ui/inputs/input-select";
import InputNumber from "@/app/ui/inputs/input-number";
import InputDate from "@/app/ui/inputs/input-date";
import { InputLookup } from "@/app/ui/inputs/input-lookup";
import { formatNumberItalian } from '../../helpers';

export interface DynamicListItem {
  groupId: number;
  id?: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'lookup';
  options?: string[] | { value: string; name: string }[];
  className?: string;
  showOnlyOnFirst?: boolean;
}

export interface CalculationConfig {
  label: string;
  calculate: (item: any, ...args: any[]) => number;
  className?: string;
}

export interface DynamicServiceListProps<T extends DynamicListItem> {
  title: string;
  items: T[];
  fieldConfigs: FieldConfig[];
  calculationConfigs?: CalculationConfig[];
  onAddItem: () => void;
  onRemoveItem: (groupId: number) => void;
  onUpdateItem: (groupId: number, field: string, value: any) => void;
  calculateTotal?: (items: T[], ...args: any[]) => number;
  totalLabel?: string;
  className?: string;
  calculationArgs?: any[];
}

export function DynamicServiceList<T extends DynamicListItem>({
  title,
  items,
  fieldConfigs,
  calculationConfigs = [],
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  calculateTotal,
  totalLabel = "Totale",
  className = "",
  calculationArgs = []
}: DynamicServiceListProps<T>) {

  const handleFieldChange = (groupId: number, fieldName: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    onUpdateItem(groupId, fieldName, e.target.value);
  };

  const renderField = (item: T, config: FieldConfig, index: number) => {
    const commonProps = {
      name: config.name,
      onChange: handleFieldChange(item.groupId, config.name),
      className: config.className,
      label: (!config.showOnlyOnFirst || index === 0) ? config.label : ''
    };

    const value = (item as any)[config.name];

    switch (config.type) {
      case 'text':
        return (
          <InputText 
            {...commonProps}
            value={value || ''}
          />
        );
      
      case 'number':
        return (
          <InputNumber 
            {...commonProps}
            value={value?.toString() || ''}
          />
        );
      
      case 'date':
        return (
          <InputDate 
            {...commonProps}
            value={value ? moment(value).format('YYYY-MM-DD') : ''}
          />
        );
      
      case 'select':
        return (
          <InputSelect 
            {...commonProps}
            options={config.options || []}
            value={value || ''}
          />
        );
      
      case 'lookup':
        return (
          <InputLookup 
            {...commonProps}
            options={config.options as string[] || []}
            defaultValue={value || ''}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div id={title.toLowerCase().replace(/\s+/g, '-')} className={`input-block ${className}`}>
      {/* Header con titolo e bottone add */}
      <div className="flex flex-row items-center justify-start">
        <div>
          <h3 className="text-xl md:text-2xl pt-4 pb-1">{title}</h3>
        </div>
        <div className="flex flex-row items-center justify-center pt-4 pl-5">
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
            onClick={onAddItem}
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Lista items */}
      <div className="input-group-list">
        {items.map((item, index) => (
          <div key={item.groupId}>
            <div className="flex flex-row justify-between">
              {/* Campi input */}
              <div className="input-group-row flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                  onClick={() => onRemoveItem(item.groupId)}
                >
                  <MinusIcon className="w-4 h-4" />
                </Button>

                {fieldConfigs.map((config, configIndex) => (
                  <React.Fragment key={`${item.groupId}-${config.name}`}>
                    {renderField(item, config, index)}
                  </React.Fragment>
                ))}
              </div>

              {/* Calcoli */}
              {calculationConfigs.length > 0 && (
                <div className="flex flex-row items-center pt-3">
                  {calculationConfigs.map((calcConfig, calcIndex) => (
                    <div key={calcIndex} className={`${index > 0 ? 'pb-3' : ''}`}>
                      {index === 0 && (
                        <div className='flex justify-end'>
                          <p>{calcConfig.label}:</p>
                        </div>
                      )}
                      <div className={`w-20 mr-2 flex justify-end ${calcConfig.className || ''}`}>
                        <p>{formatNumberItalian(calcConfig.calculate(item, ...calculationArgs))}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Totale generale */}
      {calculateTotal && (
        <div className="tot-euro-of-list flex flex-row items-center justify-end pt-4 pr-11">
          <p>{totalLabel}: {formatNumberItalian(calculateTotal(items, ...calculationArgs))}</p>
        </div>
      )}
    </div>
  );
}
