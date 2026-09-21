import { type Player } from "../../features/playerSlice";
import type { CutoffData } from "../features/tournamentSlice";

type StandingsProp = { standings: Player[]; cutoffs: CutoffData[] };

export const Standings = (props: StandingsProp) => {
	const { standings, cutoffs } = props;

	return (
		<div>
			{standings.map((player: Player, i: number) => (
				<div key={i}>
					{player.riotId}, {player.lp} - {player.points}
					{cutoffs.map(
						(cutoff) =>
							cutoff.cutoff === i + 1 && (
								<hr
									style={{
										color: "red",
										backgroundColor: "red",
										height: 1,
									}}
								/>
							),
					)}
					{/* {!basicTopEight && i == 3 && (
						<hr
							style={{
								color: "green",
								backgroundColor: "green",
								height: 1,
							}}
						/>
					)} */}
				</div>
			))}
		</div>
	);
};
