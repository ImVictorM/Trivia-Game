import { useState, useEffect } from "react";

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === defaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key, defaultValue]);

  return [value, setValue];
}
