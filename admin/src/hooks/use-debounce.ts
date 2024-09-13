import { useState, useEffect } from "react";

export interface UseDebounceOptions {
  onChange?: () => void;
}

export const useDebounce = <T>(
  value: T,
  delay: number,
  options?: UseDebounceOptions
): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      options?.onChange?.();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
