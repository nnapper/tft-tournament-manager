import { createSlice } from "@reduxjs/toolkit";
import type { Player } from "./playerSlice";

export const initialState: {
  round: number;
  games: Player[][];
} = {
  round: 0,
  games: [],
};

export type GameStateType = typeof initialState;

export const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    logGames: (state, action) => {
      state.games.push(action.payload);
    },
  },
});

export const { logGames } = gameSlice.actions;
export default gameSlice.reducer;
