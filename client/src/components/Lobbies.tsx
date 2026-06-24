import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../main";
import { useEffect, useState } from "react";
import type { Player } from "../features/playerSlice";
import { snakeSeed } from "../util/snakeSeed";
import { logGames } from "../features/gameSlice";
import { Table } from "./Table";

export const Lobbies = () => {
  const [lobbies, setLobbies] = useState<Player[][] | null>(null);

  const round = useSelector((state: RootState) => state.games.round);
  const cutoffs = useSelector((state: RootState) => state.tournament.cutoffs);
  const standings = useSelector((state: RootState) => state.player.standings);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const basicTopEight = useSelector(
    (state: RootState) => state.tournament.basicTopEight,
  );

  const createLobbies = () => {
    const cutoff =
      cutoffs[round - 1] != null ? cutoffs[round - 1] : standings.length;
    const availablePlayers = standings.slice(0, cutoff);
    console.log(round, cutoff);
    setLobbies(snakeSeed(availablePlayers));

    /*
    if (basicTopEight) {
      const cutoff =
        cutoffs[round - 1] != null ? cutoffs[round - 1] : standings.length;
      const availablePlayers = standings.slice(0, cutoff);
      console.log(round, cutoff);
      setLobbies(snakeSeed(availablePlayers));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const availablePlayers = standings.slice(4, 13);
      console.log("Not basic top 8");
    }
      */
    // console.log()
  };

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Lobbies created", lobbies);
    dispatch(logGames(lobbies));
  }, [lobbies, dispatch]);

  return (
    <div>
      <button onClick={createLobbies}>Lobbies</button>Hello
      {lobbies && <Table lobbies={lobbies} />}
    </div>
  );

  // return (
  //   <>
  //     <button onClick={createLobbies}>Create Lobbies</button>
  //     {lobbies && lobbies[0] && (
  //       <table>
  //         <thead>
  //           <tr>
  //             {lobbies.map((lobby: Player[], i) => (
  //               <th key={i}>Lobby {i + 1}</th>
  //             ))}
  //           </tr>
  //         </thead>
  //         {lobbies[0].map((player: Player, i) => (
  //           <tbody key={i}>
  //             <tr>
  //               {lobbies.map((lobby: Player[], j) => (
  //                 <td key={i + j}>{lobby[i].riotId}</td>
  //               ))}
  //             </tr>
  //           </tbody>
  //         ))}
  //       </table>
  //     )}
  //   </>
  // );
};
