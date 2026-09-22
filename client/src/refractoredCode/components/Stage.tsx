import type { RootState } from "../../store";
import { createFillPlayer } from "../../util/snakeSeed";
import { useDispatch, useSelector } from "react-redux";
import {
	generateLobbies,
	initStandings,
	logGame,
	sortStandings,
	STAGES,
	type Stages,
} from "../features/tournamentSlice";
import { useEffect, useState } from "react";
import { Lobby, type LobbyData } from "./lobby/Lobby";
import { Standings } from "./Standings";

type StageProps = {
	stage: Stages;
};

export const Stage = ({ stage }: StageProps) => {
	const stageData = useSelector((state: RootState) =>
		stage === STAGES.generalQual
			? state.tournament.generalQual
			: stage === STAGES.topEightQual
				? state.tournament.topEightQual
				: state.tournament.finalLobby,
	);
	const { standings, round, totalRound, cutoffs, gameLog, conditions } =
		stageData;

	const [enableLobbyCreation, setEnableLobbyCreation] =
		useState<boolean>(true);

	const dispatch = useDispatch();
	const createLobbies = () => {
		dispatch(generateLobbies({ stage }));
		setEnableLobbyCreation(false);
	};
	const lobbyFinished = (lobby: LobbyData) => {
		// for testing, will have to change once Riot API call is made
		let indexes = [1, 2, 3, 4, 5, 6, 7, 8];
		indexes = indexes.sort(() => Math.random() - 0.5);

		const updatedPlayers = [...lobby.players];
		for (let i = 0; i < 8; i++) {
			updatedPlayers[i] = {
				...updatedPlayers[i],
				placement: indexes[i],
			};
		}

		const updatedLobby = {
			...lobby,
			players: updatedPlayers,
			completed: true,
		};
		dispatch(logGame({ stage, lobbyResult: updatedLobby }));
	};
	const updateStandings = () => {
		dispatch(sortStandings({ stage }));
		setEnableLobbyCreation(true);
	};

	useEffect(() => {
		const testStandings = [];
		if (standings.length == 0) {
			for (let i = 0; i < 64; i++) {
				const player = createFillPlayer();
				player.riotId += i;
				testStandings.push(player);
			}
			dispatch(
				initStandings({
					stage: STAGES.generalQual,
					standings: testStandings,
				}),
			);
		}
	}, []);

	return (
		<div>
			<Standings
				standings={standings}
				cutoffs={cutoffs}
				condition={conditions}
			/>
			<button
				onClick={updateStandings}
				disabled={enableLobbyCreation || round === totalRound}
			>
				Update standings
			</button>
			<button
				onClick={createLobbies}
				disabled={!enableLobbyCreation || round === totalRound}
			>
				Create Lobbies
			</button>
			{gameLog &&
				gameLog.map((round, roundIndex) => (
					<div>
						<div key={roundIndex} className="lobbies">
							{round.map((lobby, lobbyIndex) => (
								<div
									key={`${roundIndex}${lobbyIndex}`}
									className="lobby"
								>
									Test lobby
									<Lobby
										lobby={lobby}
										lobbyFinished={lobbyFinished}
									/>
								</div>
							))}
						</div>
						<hr />
					</div>
				))}
		</div>
	);
};
