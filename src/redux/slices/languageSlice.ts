import { LanguageCode } from "@/utils/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialLanguageState = {
  code: LanguageCode;
};

function getLangFromLocalStorage(): LanguageCode {
  const lang = localStorage.getItem("language") || "en";

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
