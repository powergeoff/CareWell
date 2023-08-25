import { parse } from 'query-string';
import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { DateTime } from '@/utils/dateTime';

type ConverterType = 'bool' | 'int' | 'float' | 'date';

const fromString = (value: string, type?: ConverterType) => {
  if (value == null || value === '') return undefined;
  switch (type) {
    case 'bool':
      return value === 'true';
    case 'int': {
      const val = parseInt(value);
      return isNaN(val) ? undefined : val;
    }
    case 'float': {
      const val = parseFloat(value); 
      return isNaN(val) ? undefined : val;
    }
    case 'date':
      return DateTime.init(value);
    default:
      return value;
  }
};

/* const toString = (value: unknown, type?: ConverterType) => {
  if (value == null || value === '') return undefined;
  switch (type) {
    case 'date':
      return DateTime.format(value as Date, 'isodate');
    default:
      return value;
  }
};
 */
export const useLocationParams = <P>(converterInit?: { [key in keyof P]: ConverterType }): [P] => {
  const history = useHistory();

  const [converters] = useState(converterInit);

  const params = useMemo(() => {
    const urlParams = parse(history.location.search, { arrayFormat: 'bracket' }) as Record<
      string,
      string | string[]
    >;
    return Object.entries<string | string[]>(urlParams).reduce((result, [key, value]) => {
      const type = converters?.[key as keyof P];
      result[key] = Array.isArray(value)
        ? value.map((x) => fromString(x, type))
        : fromString(value, type);
      return result;
    }, {} as Record<string, unknown>);
  }, [converters, history.location.search]);

  /* const setParams = useCallback(
    (urlParams: P) => {
      const paramsObj = Object.entries(urlParams).reduce((result, [key, value]) => {
        const type = converters?.[key as keyof P];
        result[key] = Array.isArray(value)
          ? value.map((x) => toString(x, type))
          : toString(value, type);
        return result;
      }, {} as Record<string, unknown>);
      history.push({
        ...history.location,
        search: stringify(paramsObj, { arrayFormat: 'bracket' }),
      });
    },
    [converters, history]
  ); 
  
  return [params as unknown as P, setParams ];
  */

  return [params as unknown as P];
};
