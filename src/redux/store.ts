import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "./slices/playerSlice";
import { languageReducer } from "./slices/languageSlice";

const rootReducer = combineReducers({
  player: playerReducer,
  language: languageReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.DEV,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
