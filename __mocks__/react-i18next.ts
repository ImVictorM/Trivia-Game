// Define tMock and i18nInstance outside useTranslation to prevent infinite loops inside useEffect when t or i18n is used inside a dependency array
const tMock = (text: string) => text;

const i18nInstanceMock = {
  changeLanguage: (lang: string) => lang,
};

export const useTranslation = () => {
  return {
    t: tMock,
    i18n: i18nInstanceMock,
  };
};

export const Trans = ({ children }) => children;
