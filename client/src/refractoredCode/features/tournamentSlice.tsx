import { type Player } from "../../features/playerSlice";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LobbyData } from "../components/lobby/Lobby";
import { snakeSeed } from "../../util/snakeSeed";
import { sortPoints } from "../../util/playerSort";

export const TOP_EIGHT_CONDITIONS = {
	lastChance: "lastChance",
	basic: "basic",
} as const;
type TopEightConditions =
	(typeof TOP_EIGHT_CONDITIONS)[keyof typeof TOP_EIGHT_CONDITIONS];

export const WIN_CONDITIONS = {
	checkmate: "checkmate",
	points: "points",
} as const;
type WinConditions = (typeof WIN_CONDITIONS)[keyof typeof WIN_CONDITIONS];

export type CutoffData = { round: number; cutoff: number };

type StageData = {
	standings: Player[];
	round: number;
	totalRound: number;
	prevLobbies: LobbyData[];
	reseed: number[];
	cutoffs: CutoffData[];
	gameLog: LobbyData[][];
	conditions?: TopEightConditions | WinConditions;
};

export const STAGES = {
	generalQual: "generalQual",
	topEightQual: "topEightQual",
	finalLobby: "finalLobby",
} as const;

export type Stages = (typeof STAGES)[keyof typeof STAGES];

const initialState: {
	stage: Stages;
	generalQual: StageData;
	topEightQual: StageData;
	finalLobby: StageData;
} = {
	stage: STAGES.generalQual,
	generalQual: {
		standings: [] as Player[],
		round: 0,
		totalRound: 6,
		prevLobbies: [] as LobbyData[],
		reseed: [0],
		cutoffs: [
			{ round: 2, cutoff: 16 },
			{ round: 4, cutoff: 8 },
		] as CutoffData[],
		gameLog: [] as LobbyData[][],
	},
	topEightQual: {
		standings: [] as Player[],
		round: 0,
		totalRound: -1,
		prevLobbies: [] as LobbyData[],
		reseed: [0],
		cutoffs: [] as CutoffData[],
		gameLog: [] as LobbyData[][],
		conditions: TOP_EIGHT_CONDITIONS.basic,
	},
	finalLobby: {
		standings: [] as Player[],
		round: 0,
		totalRound: -1,
		prevLobbies: [] as LobbyData[],
		reseed: [0],
		cutoffs: [] as CutoffData[],
		gameLog: [] as LobbyData[][],
		conditions: WIN_CONDITIONS.points,
	},
};

type InitStandingsParams = {
	stage: Stages;
	standings: Player[];
};

type StagesParam = {
	stage: Stages;
};

type UpdateReseedParams = {
	stage: Stages;
	value: number;
};

type UpdateCutoffsParams = {
	stage: Stages;
	value: CutoffData;
};

type UpdateConditionParams = {
	condition: TopEightConditions | WinConditions;
};

type LogGameParams = {
	stage: Stages;
	lobbyResult: LobbyData;
};

export const tournamentSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		initStandings: (state, action: PayloadAction<InitStandingsParams>) => {
			const { stage, standings } = action.payload;
			if (stage === STAGES.generalQual)
				state.generalQual.standings = standings;
			else if (stage === STAGES.topEightQual)
				state.topEightQual.standings = standings;
			else state.finalLobby.standings = standings;
		},
		incrementRound: (state, action: PayloadAction<StagesParam>) => {
			const { stage } = action.payload;
			if (stage === STAGES.generalQual) state.generalQual.round++;
			else if (stage === STAGES.topEightQual) state.topEightQual.round++;
			else state.finalLobby.round++;
		},
		updateReseed: (state, action: PayloadAction<UpdateReseedParams>) => {
			const { stage, value } = action.payload;
			const chosenStage =
				stage === STAGES.generalQual
					? state.generalQual
					: stage === STAGES.topEightQual
						? state.topEightQual
						: state.finalLobby;

			chosenStage.reseed.push(value);
		},
		updateCutoff: (state, action: PayloadAction<UpdateCutoffsParams>) => {
			const { stage, value } = action.payload;
			const chosenStage =
				stage === STAGES.generalQual
					? state.generalQual
					: stage === STAGES.topEightQual
						? state.topEightQual
						: state.finalLobby;
			chosenStage.cutoffs.push(value);
		},
		updateCondition: (
			state,
			action: PayloadAction<UpdateConditionParams>,
		) => {
			const { condition } = action.payload;
			if (
				condition === TOP_EIGHT_CONDITIONS.basic ||
				condition === TOP_EIGHT_CONDITIONS.lastChance
			)
				state.topEightQual.conditions = condition;
			else state.finalLobby.conditions = condition;
		},
		sortStandings: (state, action: PayloadAction<StagesParam>) => {
			const { stage } = action.payload;
			const updatedStageData =
				stage === STAGES.generalQual
					? state.generalQual
					: stage === STAGES.topEightQual
						? state.topEightQual
						: state.finalLobby;

			const { conditions, cutoffs, round, standings } = updatedStageData;
			const standingsLowerBound =
				conditions != undefined &&
				conditions === TOP_EIGHT_CONDITIONS.lastChance
					? 4
					: 0;

			const mostRecentCutoff = cutoffs
				.filter((cutoff) => cutoff.round <= round)
				.at(-1);
			const standingsUpperBound =
				stage === STAGES.finalLobby || round === 0
					? standings.length
					: mostRecentCutoff
						? mostRecentCutoff.cutoff
						: standings.length;

			updatedStageData.standings = sortPoints(
				standings,
				standingsLowerBound,
				standingsUpperBound,
			);

			updatedStageData.round++;

			if (stage === STAGES.generalQual)
				state.generalQual = updatedStageData;
			else if (stage === STAGES.topEightQual)
				state.topEightQual = updatedStageData;
			else state.finalLobby = updatedStageData;
		},
		generateLobbies: (state, action: PayloadAction<StagesParam>) => {
			const { stage } = action.payload;
			const updatedStageData =
				stage === STAGES.generalQual
					? state.generalQual
					: stage === STAGES.topEightQual
						? state.topEightQual
						: state.finalLobby;

			const {
				conditions,
				cutoffs,
				prevLobbies,
				reseed,
				round,
				standings,
			} = updatedStageData;

			if (
				!reseed.includes(round) &&
				cutoffs.filter((cutoff) => cutoff.round === round).length === 0
			)
				updatedStageData.gameLog.push(prevLobbies);
			else {
				const mostRecentCutoff = cutoffs
					.filter((cutoff) => cutoff.round <= round)
					.at(-1);
				const standingsLowerBound =
					stage === STAGES.finalLobby || round === 0
						? standings.length
						: mostRecentCutoff
							? mostRecentCutoff.cutoff
							: standings.length;
				const standingsUpperBound =
					conditions === TOP_EIGHT_CONDITIONS.lastChance ? 4 : 0;

				const eligiblePlayers = standings.slice(
					standingsUpperBound,
					standingsLowerBound,
				);
				const newLobbies = snakeSeed(eligiblePlayers).map((players) => {
					return {
						players: players,
						completed: false,
					};
				});

				updatedStageData.gameLog.push(newLobbies);
				updatedStageData.prevLobbies = newLobbies;

				console.log("Created lobbies", [
					...updatedStageData.gameLog[round],
				]);
			}

			if (stage === STAGES.generalQual)
				state.generalQual = updatedStageData;
			else if (stage === STAGES.topEightQual)
				state.topEightQual = updatedStageData;
			else state.finalLobby = updatedStageData;
		},
		logGame: (state, action: PayloadAction<LogGameParams>) => {
			const { stage, lobbyResult } = action.payload;
			const updatedStageData =
				stage === STAGES.generalQual
					? state.generalQual
					: stage === STAGES.topEightQual
						? state.topEightQual
						: state.finalLobby;

			const { round } = updatedStageData;

			console.log("Lobby result is", { ...lobbyResult });

			const index = updatedStageData.gameLog[round].findIndex(
				(lobby) =>
					lobby.players[0].player.puuid ===
					lobbyResult.players[0].player.puuid,
			);
			updatedStageData.gameLog[round][index] = lobbyResult;

			lobbyResult.players.sort(
				(playerOne, playerTwo) =>
					playerTwo.placement - playerOne.placement,
			);
			lobbyResult.players.map((playerLobby) => {
				const { puuid } = playerLobby.player;

				const player = updatedStageData.standings.find(
					(playerStanding) => playerStanding.puuid === puuid,
				);
				if (player == null) return;

				const pointsScored = 9 - playerLobby.placement;
				player.points += pointsScored;
				player.gameHistory.push(pointsScored);
			});

			if (stage === STAGES.generalQual)
				state.generalQual = updatedStageData;
			else if (stage === STAGES.topEightQual)
				state.topEightQual = updatedStageData;
			else state.finalLobby = updatedStageData;
		},
	},
});

export const { initStandings, sortStandings, generateLobbies, logGame } =
	tournamentSlice.actions;
export default tournamentSlice.reducer;
