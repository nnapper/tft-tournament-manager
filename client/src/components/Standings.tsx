import { useDispatch, useSelector } from "react-redux";
import { updateStandings, type Player } from "../features/playerSlice";
import type { RootState } from "../main";

export const Standings = () => {
  const standings = useSelector((state: RootState) => state.player.standings);
  const cutoffs = useSelector((state: RootState) => state.tournament.cutoffs);
  const basicTopEight = useSelector(
    (state: RootState) => state.tournament.basicTopEight,
  );
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          console.log(
            "Cutoffs:",
            cutoffs,
            "4 in cutoffs?",
            cutoffs.includes(4),
          );
          dispatch(updateStandings());
        }}
      >
        Update Standings
      </button>
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
