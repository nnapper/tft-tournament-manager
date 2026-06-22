import { type WinConditions } from "../../features/tournamentSlice";
import { Attribute } from "./Attribute";

interface FinalLobbyConfigProps {
  finalLobbyGames: number;
  setFinalLobbyGames: React.Dispatch<React.SetStateAction<number>>;
  setWinCon: React.Dispatch<React.SetStateAction<WinConditions>>;
}

export const FinalLobbyConfig = (props: FinalLobbyConfigProps) => {
  const { finalLobbyGames, setFinalLobbyGames, setWinCon } = props;

  return (
    <div>
      Final Lobby
      <br />
      <div className="flex-container">
        <div>
          Point Cutoff
          <br />
          <Attribute
            label="Number of games"
            value={finalLobbyGames}
            setValue={setFinalLobbyGames}
          />
          <button onClick={() => setWinCon("points")}>Select</button>
        </div>
        <div>
          Checkmate
          <br />
          <button onClick={() => setWinCon("checkmate")}>Select</button>
        </div>
      </div>
    </div>
  );
};
