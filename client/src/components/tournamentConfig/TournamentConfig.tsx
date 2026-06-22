import { useSelector } from "react-redux";
import type { RootState } from "../../main";
import "../../App.css";
import { PreTopEightConfig } from "./PreTopEightConfig";
import { TopEightFinalLobbyConfig } from "./TopEightFinalLobbyConfig";

const ConfigModule = ({ cutoff }: { cutoff: number | undefined }) => {
  return (
    <>
      {cutoff != 16 && <PreTopEightConfig />}
      <br />
      {cutoff == 16 && <TopEightFinalLobbyConfig />}
    </>
  );
};

export const TournamentConfig = () => {
  const tournamentConfig = useSelector((state: RootState) => state.tournament);

  console.log("Games in tourney", tournamentConfig.games.length);

  return (
    <>
      {!tournamentConfig.configLocked && (
        <ConfigModule cutoff={tournamentConfig.cutoffs.at(-1)} />
      )}
      <div className="center-container">
        <table>
          <thead>
            <tr>
              <th>Round</th>
              <th>Games</th>
              <th>Reseed</th>
              <th>Cutoff</th>
            </tr>
          </thead>
          {tournamentConfig.games.map((games, i) => (
            <tbody key={i}>
              <tr>
                <td key={i * i}>{i + 1}</td>
                <td key={i * i + 1}>{games}</td>
                <td key={i * i + 3}>{tournamentConfig.reseed[i]}</td>
                <td key={i * i + 4}>{tournamentConfig.cutoffs[i]}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};
