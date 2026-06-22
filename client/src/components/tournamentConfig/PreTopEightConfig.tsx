import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCutoffs,
  addGames,
  addReseed,
  incrementRounds,
} from "../../features/tournamentSlice";
import { Attribute } from "./Attribute";

export const PreTopEightConfig = () => {
  const [numGames, setNumGames] = useState<number>(0);
  const [reseed, setReseed] = useState<number>(0);
  const [cutoff, setCutoff] = useState<number>(0);

  const dispatch = useDispatch();
  const updateConfig = (cutoff: number) => {
    dispatch(incrementRounds());
    dispatch(addGames(numGames));
    dispatch(addReseed(reseed));
    dispatch(addCutoffs(cutoff));
  };

  return (
    <div>
      <Attribute
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
          if (cutoff < 16) alert("Cutoff must be at least 16");
          else updateConfig(cutoff);
        }}
      >
        Lock Round Config
      </button>
    </div>
  );
};
