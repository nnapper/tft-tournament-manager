// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addPlayer } from "../../features/playerSlice";
// import { generatePlayer } from "../../util/playerGenerate";
// import { createFillPlayer } from "../../util/snakeSeed";
// import {
// 	useChalThresholdQuery,
// 	useGmThresholdQuery,
// } from "../../features/Player/TFTLeagueV1Api";
// import { useLazyGetPuuidQuery } from "../../features/Player/accountApi";

// export const AddPlayer = () => {
// 	const [riotId, setRiotId] = useState<string>("");
// 	const dispatch = useDispatch();

// 	const { gmThreshold } = useGmThresholdQuery();
// 	const { chalThreshold } = useChalThresholdQuery();

// 	// for testing
// 	const standings = useSelector((state: RootState) => state.player.standings);
// 	useEffect(() => {
// 		if (standings.length == 0) {
// 			for (let i = 0; i < 64; i++) {
// 				const player = createFillPlayer();
// 				player.riotId += i;
// 				dispatch(addPlayer(player));
// 			}
// 		}
// 	}, []);

// 	import axios from "axios";
// 	import { numToTierRankLP, tierRankLPToNum } from "./rankConversion";
// 	import type { Player } from "../features/playerSlice";
// import { AddPlayer } from "../../components/AddPlayer";

// 	interface AccountDto {
// 		puuid: string;
// 		gameName: string;
// 		tagLine: string;
// 	}

// 	const [getPuuid] = useLazyGetPuuidQuery;
// 	const generatePlayer = async (riotId: string) => {
// 		const parts = riotId.split("#");
// 		const gameName = parts[0];
// 		const tagLine = parts[1];

// 		const puuid = getPuuid(gameName, tagLine);

// 		const lp = 0;

// 		const transofmredLp = tierRankLPToNum(
// 			response.data[0].tier,
// 			response.data[0].rank,
// 			response.data[0].leaguePoints,
// 		);

// 		console.log("LP of", riotId, " is", lp);

// 		const playerInfo: Player = {
// 			riotId: playerDTO.gameName + "#" + playerDTO.tagLine,
// 			puuid,
// 			lp: await numToTierRankLP(lp),
// 			lpNormalized: lp,
// 			points: 0,
// 			gameHistory: [],
// 		};

// 		return playerInfo;
// 	};

// 	return (
// 		<div>
// 			<input
// 				type="text"
// 				placeholder="gameName#tagline"
// 				value={riotId}
// 				onChange={(e) => setRiotId(e.target.value)}
// 			/>
// 			<button
// 				onClick={async () => {
// 					const player = await generatePlayer(riotId);
// 					console.log("Generated player for", riotId);
// 					console.log("Generated player:", player);
// 					dispatch(addPlayer(player));
// 				}}
// 			>
// 				Add Player
// 			</button>
// 		</div>
// 	);
// };

export const AddPlayer = () => {};
