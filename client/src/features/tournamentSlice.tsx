import { createSlice } from "@reduxjs/toolkit";

export type TopEightConditions = "lastChance" | "basic";
export type WinConditions = "checkmate" | "points";

const initialState: {
  rounds: number;
  games: number[];
  reseed: number[];
  cutoffs: number[];
  basicTopEight: boolean;
  checkmate: boolean;
  configLocked: boolean;
} = {
  rounds: 0,
  games: [],
  reseed: [],
  cutoffs: [],
  basicTopEight: false,
  checkmate: false,
  configLocked: false,
};

export type TournamentStateType = typeof initialState;

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    incrementRounds: (state) => {
      state.rounds++;
    },
    addGames: (state, action: { payload: number }) => {
      console.log("Game pushed");
      state.games.push(action.payload);
    },
    addReseed: (state, action: { payload: number }) => {
      state.reseed.push(action.payload);
    },
    addCutoffs: (state, action: { payload: number }) => {
      console.log("Cutoff pushed type", typeof action.payload);
      state.cutoffs.push(action.payload);
    },
    setTopEightCondition: (state, action: { payload: TopEightConditions }) => {
      state.checkmate = action.payload == "basic";
    },
    setWinCondition: (state, action: { payload: WinConditions }) => {
      state.checkmate = action.payload == "checkmate";
      state.configLocked = true;
    },
    lockConfig: (state) => {
      state.configLocked = true;
    },
    reset: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});

export const {
  incrementRounds,
  addCutoffs,
  addGames,
  addReseed,
  setTopEightCondition,
  setWinCondition,
  lockConfig,
  reset,
} = tournamentSlice.actions;
export default tournamentSlice.reducer;
