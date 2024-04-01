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
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setAssertions: (state, action: PayloadAction<number>) => {
      state.assertions = action.payload;
    },
  },
});

export const { setPlayer, setAssertions, setScore } = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
