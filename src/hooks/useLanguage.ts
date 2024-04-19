import { useCallback, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useTranslation } from "react-i18next";

export type AvailableLanguages = "en" | "pt-BR";

export default function useLanguage(page?: string) {
  const [value, setValue] = useLocalStorage<AvailableLanguages>(
    "language",
    "en",
    false
  );
  const { t, i18n } = useTranslation();

  const setLanguage = useCallback(
    (language: AvailableLanguages) => {
      setValue(language);
    },
    [setValue]
  );

  useEffect(() => {
    i18n.changeLanguage(value);
  }, [i18n, value]);

  const translate = useCallback(
    (key: string) => {
      return page ? t(`${page}.${key}`) : t(key);
    },
    [page, t]
  );

  return { language: value, setLanguage, translate };
}
