import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(
    resourcesToBackend((lng: string, ns: string) => {
      return import(`@/locales/${lng}/${ns}.json`);
    })
  )
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    lng: "en",
    defaultNS: "common",
    fallbackLng: "en",
    returnObjects: true,
  });

export default i18next;
