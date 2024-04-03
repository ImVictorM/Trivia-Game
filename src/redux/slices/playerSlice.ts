import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PlayerState = {
  name: string;
  assertions: number;
  score: number;
  gravatarEmail: string;
};

const initialPlayerState: PlayerState = {
  name: "",
  assertions: 0,
  score: 0,
  gravatarEmail: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState: initialPlayerState,
  reducers: {
    setPlayer: (
      state,
      action: PayloadAction<{ name: string; gravatarEmail: string }>
    ) => {
      state.name = action.payload.name;
      state.gravatarEmail = action.payload.gravatarEmail;
    },
    setGameStats: (
      state,
      action: PayloadAction<{ score: number; assertions: number }>
    ) => {
      state.score = action.payload.score;
      state.assertions = action.payload.assertions;
    },
  },
});

export const { setPlayer, setGameStats } = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
