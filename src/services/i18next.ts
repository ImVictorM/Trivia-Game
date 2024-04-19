import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  debug: true,
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        login: {
          start: "Start game",
          ranking: "Ranking",
          nameLabel: "Enter your name",
          emailLabel: "Enter your email or gravatar email",
        },
      },
    },
    "pt-BR": {
      translation: {
        login: {
          start: "Iniciar jogo",
          ranking: "Classificação",
          nameLabel: "Insira seu nome",
          emailLabel: "Insira seu email ou email do gravatar",
        },
      },
    },
  },
});
