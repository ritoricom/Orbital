import { useState, useCallback, useEffect } from "react";

import { noopFn } from "@/utils/noop";

export const useLocalStorage = ({
  key,
  defaultValue = null,
  onInitialValueInEffect = noopFn,
}) => {
  const readStorageValue = useCallback(() => {
    const value = window.localStorage.getItem(key);

    return value !== null ? JSON.parse(value) : defaultValue;
  }, [key, defaultValue]);

  const [value, setValue] = useState(defaultValue);

  const setStorageValue = useCallback(
    (val) => {
      localStorage.setItem(key, JSON.stringify(val));
      setValue(val);
    },
    [key]
  );

  useEffect(() => {
    const val = readStorageValue();

    setValue(val);
    onInitialValueInEffect(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, setStorageValue];
};
