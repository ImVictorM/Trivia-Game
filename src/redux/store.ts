import { configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "./slices/playerSlice";
import { languageReducer } from "./slices/languageSlice";

export const store = configureStore({
  reducer: { player: playerReducer, language: languageReducer },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
