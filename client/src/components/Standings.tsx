import { type Player } from "../features/playerSlice";
import {
	TOP_EIGHT_CONDITIONS,
	type CutoffData,
	type TopEightConditions,
	type WinConditions,
} from "../features/tournament/tournamentSlice";

type StandingsProp = {
	standings: Player[];
	cutoffs: CutoffData[];
	condition?: TopEightConditions | WinConditions;
};

export const Standings = (props: StandingsProp) => {
	const { standings, cutoffs, condition } = props;

	const playerCutoffs = [] as number[];
	cutoffs.map((cutoff) => playerCutoffs.push(cutoff.cutoff));

	return (
		<div>
			{standings.map((player, i) => (
				<div key={player.puuid}>
					{player.riotId}, {player.lp} - {player.points}
					{playerCutoffs.includes(i + 1) && (
						<hr
							key={`cutoff${i + 1}`}
							style={{
								color: "red",
								backgroundColor: "red",
								height: 1,
							}}
						/>
					)}
					{condition === TOP_EIGHT_CONDITIONS.lastChance &&
						i == 3 && (
							<hr
								key={"guarenteeQual"}
								style={{
									color: "green",
									backgroundColor: "green",
									height: 1,
								}}
							/>
						)}
				</div>
			))}
		</div>
	);
};
