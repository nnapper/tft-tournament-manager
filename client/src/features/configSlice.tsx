import { createSlice } from "@reduxjs/toolkit";

export type TopEightConditions = "lastChance" | "basic";
export type WinConditions = "checkmate" | "points";

const initialState: {
  games: number[];
  reseed: number[];
  cutoffs: number[];
  basicTopEight: boolean;
  checkmate: boolean;
  configLocked: boolean;
} = {
  games: [],
  reseed: [],
  cutoffs: [],
  basicTopEight: false,
  checkmate: false,
  configLocked: false,
};

const testConfig = {
  games: [3, 6, 9],
  reseed: [2, -1, -1],
  cutoffs: [16, 8, 1],
  basicTopEight: true,
  checkmate: false,
  configLocked: true,
};

export type TournamentStateType = typeof initialState;

export const configSlice = createSlice({
  name: "config",
  initialState: testConfig,
  reducers: {
    addGames: (state, action: { payload: number }) => {
      // console.log("Game pushed");
      state.games.push((state.games.at(-1) | 0) + action.payload);
    },
    addReseed: (state, action: { payload: number }) => {
      state.reseed.push(
        action.payload == -1
          ? action.payload
          : (state.games.at(-2) | 0) + action.payload,
      );
    },
    addCutoffs: (state, action: { payload: number }) => {
      // console.log("Cutoff pushed type", typeof action.payload);
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
    reset: () => {
      return initialState;
    },
  },
});

export const {
  addCutoffs,
  addGames,
  addReseed,
  setTopEightCondition,
  setWinCondition,
  lockConfig,
  reset,
} = configSlice.actions;
export default configSlice.reducer;
