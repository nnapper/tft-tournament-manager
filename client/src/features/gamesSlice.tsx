import { createSlice } from "@reduxjs/toolkit";
import type { Player } from "./playerSlice";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState: {
  round: number;
  game: number;
  games: Player[][];
} = {
  round: 0,
  game: 0,
  games: [],
};

const testConfig = {
  round: 2,
  game: 6,
  games: [],
};

export type GameStateType = typeof initialState;

export const gameSlice = createSlice({
  name: "games",
  initialState: testConfig,
  reducers: {
    incrementRound: (state) => {
      state.round++;
    },
    incrementGame: (state) => {
      state.game++;
    },
    logGames: (state, action) => {
      state.games.push(action.payload);
    },
  },
});

export const { incrementRound, incrementGame, logGames } = gameSlice.actions;
export default gameSlice.reducer;
