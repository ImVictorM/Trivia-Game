import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MD5 } from "crypto-js";

type PlayerState = {
  name: string;
  assertions: number;
  score: number;
  gravatarImgSrc: string;
};

const initialPlayerState: PlayerState = {
  name: "",
  assertions: 0,
  score: 0,
  gravatarImgSrc: "",
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

      const emailHash = MD5(action.payload.gravatarEmail).toString();

      state.gravatarImgSrc = `https://www.gravatar.com/avatar/${emailHash}`;
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
