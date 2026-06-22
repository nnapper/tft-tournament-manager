import { useState } from "react";
import {
  setTopEightCondition,
  setWinCondition,
} from "../../features/tournamentSlice";
import { Attribute } from "./Attribute";
import { ChoicePrompt } from "./TournamentConfig";

export const SetWinConConfig = (props: {
  lastCutoff: number;
  updateConfig: (cutoff: number) => void;
  setWinCon: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { lastCutoff, updateConfig, setWinCon } = props;

  const [numGames, setNumGames] = useState<number>(0);
  const [reseed, setReseed] = useState<number>(0);
  const [cutoff, setCutoff] = useState<number>(0);

  return (
    <div>
      Set win condition
      <br />
      <div className="flex-container">
        <ChoicePrompt
          numGames={10}
          reseed={-1}
          cutoff={1}
          mode={"checkmate"}
          updateStore={setWinCondition}
          setMode={setWinCon}
          label="Checkmate"
        />
        <ChoicePrompt
          numGames={numGames}
          reseed={-1}
          cutoff={1}
          mode={"points"}
          updateStore={setWinCondition}
          setMode={setWinCon}
          label="Highest Point Earner"
        />
      </div>
    </div>
  );
};
