import { useCallback, useMemo } from "react";
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

  const tokenIsEmpty = useMemo(() => {
    return value === "";
  }, [value]);

  return { setToken, clearToken, token: value, tokenIsEmpty };
}
