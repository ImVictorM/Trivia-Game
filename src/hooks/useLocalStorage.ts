import { useState, useEffect } from "react";

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  clearKeyOnDefaultValue = true
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === defaultValue && clearKeyOnDefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key, defaultValue, clearKeyOnDefaultValue]);

  return [value, setValue];
}
