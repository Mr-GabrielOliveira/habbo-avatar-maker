import { useState, useEffect } from 'react';

/**
 * Hook para adicionar um atraso na atualização do valor,
 * evitando chamadas excessivas a API (rate limiting).
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
