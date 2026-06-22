import { useState } from "react";
import { setTopEightCondition } from "../../features/tournamentSlice";
import { Attribute } from "./Attribute";
import { ChoicePrompt } from "./TournamentConfig";

export const SetTopEightConfig = (props: {
  lastCutoff: number;
  updateConfig: (cutoff: number) => void;
  setTopEightCon: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { lastCutoff, updateConfig, setTopEightCon } = props;

  const [numGames, setNumGames] = useState<number>(0);
  const [reseed, setReseed] = useState<number>(0);
  const [cutoff, setCutoff] = useState<number>(0);

  return lastCutoff != 16 ? (
    <div>
      Pre top-16
      {/* <Attribute
        label="Games for round"
        value={numGames}
        setValue={setNumGames}
      />
      <Attribute
        label="Games before reseed"
        value={reseed}
        setValue={setReseed}
      />
      <Attribute label="Player cutoff" value={cutoff} setValue={setCutoff} />
      <button
        onClick={() => {
          updateConfig(cutoff);
        }}
      >
        Lock Round Config
      </button> */}
    </div>
  ) : (
    <div>
      Top 8 Qualification Options
      <br />
      <div className="flex-container">
        <ChoicePrompt
          numGames={numGames}
          reseed={-1}
          cutoff={12}
          mode={"lastChance"}
          updateStore={setTopEightCondition}
          setMode={setTopEightCon}
          label="Bottom 4 elimanted, top 4 move on, final 8 qualifier"
        />
        <ChoicePrompt
          numGames={numGames}
          reseed={-1}
          cutoff={8}
          mode={"basic"}
          updateStore={setTopEightCondition}
          setMode={setTopEightCon}
          label="Top 8 move on"
        />
      </div>
    </div>
  );
};

// props: {
// lastCutoff: number;
// numGames: number;
// setNumGames: React.Dispatch<React.SetStateAction<number>>;
// reseed: number;
// setReseed: React.Dispatch<React.SetStateAction<number>>;
// cutoff: number;
// setCutoff: React.Dispatch<React.SetStateAction<number>>;
// setTopEightCon: React.Dispatch<React.SetStateAction<number>>;
// updateConfig: (cutoff: number) => void;

// }

// const {
//   lastCutoff,
//   numGames,
//   setNumGames,
//   reseed,
//   setReseed,
//   cutoff,
//   setCutoff,
//   setTopEightCon,
//   updateConfig,
// } = props;
