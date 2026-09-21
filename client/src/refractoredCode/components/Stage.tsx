import type { RootState } from "../../store";
import { createFillPlayer } from "../../util/snakeSeed";
import { useDispatch, useSelector } from "react-redux";
import {
	generateLobbies,
	initStandings,
	logGame,
	STAGES,
	// TOP_EIGHT_CONDITIONS,
	type Stages,
} from "../features/tournamentSlice";
import { useEffect } from "react";
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
	const {
		standings,
		// round,
		// totalRound,
		// reseed,
		cutoffs,
		gameLog,
		// conditions,
	} = stageData;

	// const [prevLobbies, setPrevLobbies] = useState<LobbyData[]>([]);

	// const getBounds = () => {
	// 	let standingsLowerBound = 0;
	// 	let standingsUpperBound = 0;

	// 	if (stage === STAGES.finalLobby || round === 0)
	// 		standingsLowerBound = standings.length;
	// 	else {
	// 		const mostRecentCutoff = cutoffs
	// 			.filter((cutoff) => cutoff.round <= round)
	// 			.at(-1);
	// 		// @ts-expect-error there should always be an eligible cutoff if
	// 		// not final lobby
	// 		standingsLowerBound = mostRecentCutoff.cutoff;
	// 	}

	// 	standingsUpperBound =
	// 		conditions != undefined &&
	// 		conditions === TOP_EIGHT_CONDITIONS.lastChance
	// 			? 4
	// 			: 0;

	// 	return { standingsLowerBound, standingsUpperBound };
	// };

	// Creating the lobbies for the round
	const createLobbies = () => dispatch(generateLobbies({ stage }));

	const dispatch = useDispatch();
	const lobbyFinished = (lobby: LobbyData) => {
		let indexes = [1, 2, 3, 4, 5, 6, 7, 8];
		indexes = indexes.sort(() => Math.random() - 0.5);

		const updatedPlayers = [...lobby.players];
		for (let i = 0; i < 8; i++) {
			updatedPlayers[indexes[i]] = {
				...updatedPlayers[indexes[i]],
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

	// const updateStandings = () => {
	// 	const { standingsLowerBound, standingsUpperBound } = getBounds();
	// 	const updatedStandings = sortPoints(
	// 		standings,
	// 		standingsLowerBound,
	// 		standingsUpperBound,
	// 	);
	// };

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
			<Standings standings={standings} cutoffs={cutoffs} />
			<button onClick={() => console.log("hallo")}>Sort standings</button>
			<button onClick={createLobbies}>Generate Lobbies</button>
			{gameLog[0] && (
				<div className="lobbies">
					{
						// @ts-expect-error if gameLog[0] exists then gameLog.at(-1) should exist
						gameLog.at(-1).map((lobby) => (
							<div
								key={lobby.players[0].player.puuid}
								className="lobby"
							>
								Test lobby
								<Lobby
									lobby={lobby}
									lobbyFinished={lobbyFinished}
								/>
							</div>
						))
					}
				</div>
			)}
		</div>
	);
};
