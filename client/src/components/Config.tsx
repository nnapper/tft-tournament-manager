import { useState } from "react";
import {
	addCutoff,
	addReseed,
	setCondition,
	setTotalRounds,
	STAGES,
	type TopEightConditions,
	type Stages,
	type WinConditions,
	TOP_EIGHT_CONDITIONS,
	WIN_CONDITIONS,
	type CutoffData,
} from "../features/tournament/tournamentSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";

type CutoffsDisplayProps = {
	cutoffs: CutoffData[];
};

const CutoffsDisplay = (props: CutoffsDisplayProps) => {
	const { cutoffs } = props;
	return (
		<div>
			Cutoffs
			{cutoffs.map((cutoffData) => (
				<div>
					After round {cutoffData.round} top {cutoffData.cutoff}{" "}
					remain
				</div>
			))}
		</div>
	);
};

type ConfigProps = {
	stage: Stages;
};

export const Config = (props: ConfigProps) => {
	const { stage } = props;

	const stageData = useSelector((state: RootState) =>
		stage === STAGES.generalQual
			? state.tournament.generalQual
			: stage === STAGES.topEightQual
				? state.tournament.topEightQual
				: state.tournament.finalLobby,
	);
	const { totalRounds, reseed, cutoffs, conditions } = stageData;

	const [totalRoundsInput, setTotalRoundsInput] = useState<number>(0);
	const [reseedInput, setReseedInput] = useState<number>(0);
	const [cutoffInput, setCutoffInput] = useState<string>("");
	const [conditionInput, setConditionInput] = useState<
		TopEightConditions | WinConditions | undefined
	>(undefined);

	const dispatch = useDispatch();
	const updateTotalRounds = (totalRounds: number) => {
		dispatch(setTotalRounds({ stage, totalRounds }));
	};
	const updateReseeds = (reseed: number) => {
		dispatch(addReseed({ stage, reseed }));
	};
	const updateCutoffs = (cutoffStringInput: string) => {
		const cutoffValues = cutoffStringInput.split(",");
		if (cutoffValues.length != 2) return;

		const cutoff = { round: +cutoffValues[0], cutoff: +cutoffValues[1] };
		dispatch(addCutoff({ stage, cutoff }));
	};
	const updateCondition = (condition: TopEightConditions | WinConditions) => {
		dispatch(setCondition({ condition }));
	};

	return (
		<div>
			<input
				type="number"
				placeholder="total rounds"
				onChange={(e) => setTotalRoundsInput(+e.target.value)}
			/>
			<button onClick={() => updateTotalRounds(totalRoundsInput)}>
				Set Total Rounds
			</button>
			<input
				type="number"
				placeholder="reseed"
				onChange={(e) => setReseedInput(+e.target.value)}
			/>
			<button onClick={() => updateReseeds(reseedInput)}>
				Add reseed
			</button>
			<input
				type="text"
				placeholder="round,cutoff"
				onChange={(e) => setCutoffInput(e.target.value)}
			/>
			<button onClick={() => updateCutoffs(cutoffInput)}>
				Add cutoff
			</button>
			{/* replace this with a dropdown later */}
			{stage !== STAGES.generalQual && (
				<input
					type="text"
					placeholder="condition"
					onChange={(e) => {
						console.log("Hallo");
						setConditionInput(
							e.target.value === "basic"
								? TOP_EIGHT_CONDITIONS.basic
								: e.target.value === "lastChance"
									? TOP_EIGHT_CONDITIONS.lastChance
									: e.target.value === "points"
										? WIN_CONDITIONS.points
										: WIN_CONDITIONS.checkmate,
						);
					}}
				/>
			)}
			{stage !== STAGES.generalQual && (
				// @ts-expect-error this should only be undefined when stage is generalQual but then this won't show up
				<button onClick={() => updateCondition(conditionInput)}>
					Set condition
				</button>
			)}

			<div>Total Rounds: {totalRounds}</div>
			<div>Reseed lobbies: {reseed}</div>
			<CutoffsDisplay cutoffs={cutoffs} />
			{conditions && <div>Conditions: {conditions}</div>}
		</div>
	);
};
