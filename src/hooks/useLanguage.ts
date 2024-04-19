import { useCallback, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useTranslation } from "react-i18next";

export type AvailableLanguages = "en" | "pt-BR";

export default function useLanguage() {
  const [value, setValue] = useLocalStorage<AvailableLanguages>(
    "language",
    "en",
    false
  );
  const { i18n } = useTranslation();

  const setLanguage = useCallback(
    (language: AvailableLanguages) => {
      setValue(language);
    },
    [setValue]
  );

  useEffect(() => {
    i18n.changeLanguage(value);
  }, [i18n, value]);

  return { language: value, setLanguage };
}
