import { useCallback } from "react";
import { useLocalStorage } from ".";

export default function useToken() {
  const [value, setValue] = useLocalStorage("token", "");

  const setToken = useCallback(
    (token: string) => {
      setValue(token);
    },
    [setValue]
  );

  const clearToken = useCallback(() => {
    setValue("");
  }, [setValue]);

  return { setToken, clearToken, token: String(value) };
}
