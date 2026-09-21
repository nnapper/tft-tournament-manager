import { STAGES } from "../../features/tournamentSlice";
import { Stage } from "../Stage";

export const Lobbies = () => {
	return (
		<div>
			<Stage stage={STAGES.generalQual} />
		</div>
	);
};
