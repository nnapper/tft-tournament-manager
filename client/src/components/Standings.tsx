import { useSelector } from "react-redux";
import { type Player } from "../features/playerSlice";
import type { RootState } from "../main";

export const Standings = () => {
  const standings = useSelector((state: RootState) => state.player.standings);
  const cutoffs = useSelector((state: RootState) => state.config.cutoffs);
  const basicTopEight = useSelector(
    (state: RootState) => state.config.basicTopEight,
  );

  return (
    <div>
      {standings.map((player: Player, i: number) => (
        <div key={i}>
          {player.riotId}, {player.lp} - {player.points}
          {cutoffs.includes(i + 1) && (
            <hr
              style={{
                color: "red",
                backgroundColor: "red",
                height: 1,
              }}
            />
          )}
          {!basicTopEight && i == 3 && (
            <hr
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

export const FinalLobbyStandings = () => {
  const standings = useSelector(
    (state: RootState) => state.player.finalLobbyStandings,
  );

  return (
    <div>
      {standings.map((player: Player, i: number) => (
        <div key={i}>
          {player.riotId}, {player.lp} - {player.points}
          {i == 0 && (
            <hr
              style={{
                color: "red",
                backgroundColor: "red",
                height: 1,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
