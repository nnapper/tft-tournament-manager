import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../features/playerSlice.tsx";
import gameReducer from "../features/gamesSlice.tsx";
import configReducer from "../features/configSlice.tsx";
import tournamentReducer from "../refractoredCode/features/tournamentSlice.tsx";

export const store = configureStore({
	reducer: {
		player: playerReducer,
		games: gameReducer,
		config: configReducer,
		tournament: tournamentReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
