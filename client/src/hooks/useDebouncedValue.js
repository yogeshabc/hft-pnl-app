import { useEffect, useState } from 'react';

// Delays expensive filtering until the user pauses typing.
export function useDebouncedValue(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timerId = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timerId);
  }, [value, delay]);
  return debouncedValue;
}
