import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type LanguageCode = "en" | "pt-BR";

type InitialLanguageState = {
  code: LanguageCode;
};

function getLangFromLocalStorage(): LanguageCode {
  const localLang = localStorage.getItem("language") || "en";
  const lang = JSON.parse(localLang);

  if (lang === "en" || lang === "pt-BR") {
    return lang;
  }

  return "en";
}

const initialLanguageState: InitialLanguageState = {
  code: getLangFromLocalStorage(),
};

const languageSlice = createSlice({
  name: "language",
  initialState: initialLanguageState,
  reducers: {
    setLanguage: (state, action: PayloadAction<{ code: LanguageCode }>) => {
      localStorage.setItem("language", JSON.stringify(action.payload.code));

      state.code = action.payload.code;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const languageReducer = languageSlice.reducer;
