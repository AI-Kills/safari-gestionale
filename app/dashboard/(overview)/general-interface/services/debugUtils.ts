// Debug utilities per tracciare problemi di conversione dati
export function debugDataConversion(obj: any, label: string = 'Data') {
  console.group(`🔍 Debug ${label}`);
  
  const analyzeValue = (value: any, path: string = '') => {
    if (value === null) {
      console.log(`${path}: null`);
    } else if (value === undefined) {
      console.log(`${path}: undefined`);
    } else if (value instanceof Date) {
      console.log(`${path}: Date(${value.toISOString()})`);
    } else if (Array.isArray(value)) {
      console.log(`${path}: Array[${value.length}]`);
      value.forEach((item, index) => {
        analyzeValue(item, `${path}[${index}]`);
      });
    } else if (typeof value === 'object') {
      console.log(`${path}: Object`);
      Object.keys(value).forEach(key => {
        analyzeValue(value[key], `${path}.${key}`);
      });
    } else {
      console.log(`${path}: ${typeof value}(${value})`);
    }
  };
  
  analyzeValue(obj, label);
  console.groupEnd();
}

export function validateDateFields(obj: any, label: string = 'Object'): string[] {
  const errors: string[] = [];
  
  const checkValue = (value: any, path: string = '') => {
    if (value instanceof Date) {
      if (isNaN(value.getTime())) {
        errors.push(`${path}: Invalid Date object`);
      }
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        checkValue(item, `${path}[${index}]`);
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.keys(value).forEach(key => {
        checkValue(value[key], `${path}.${key}`);
      });
    }
  };
  
  checkValue(obj, label);
  return errors;
}
