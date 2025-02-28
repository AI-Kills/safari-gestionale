import moment from 'moment';
export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
/**
 * convert date object to format YYYY-MM-DD
 * @param date 
 */
export const formatDate = (date: Date): string => {
const formattedDate = moment(date).format('YYYY-MM-DD');
return formattedDate;
}
/**
 * check if string has a valid email format
 * @param email 
 * @returns true if email is valid, false otherwises
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const flattenObject = (obj: any, prefix = ''): Array<{ nome: string, valore: any }> => {
  return Object.entries(obj).reduce((acc: Array<{ nome: string, valore: any }>, [key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
          // Se il valore è un oggetto (ma non un array), ricorsione
          return [...acc, ...flattenObject(value, prefix + key + '.')];
      }
      // Altrimenti aggiungi la coppia nome-valore
      return [...acc, { nome: prefix + key, valore: value }];
  }, []);
};