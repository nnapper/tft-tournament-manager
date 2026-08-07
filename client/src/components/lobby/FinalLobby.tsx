import { useDispatch, useSelector } from "react-redux";
import { FinalLobbyStandings } from "../Standings";
import { Lobby, type LobbyData } from "./Lobby";
import { updatePlayer, updateStandings } from "../../features/playerSlice";
import { useEffect, useState } from "react";
import { incrementGame } from "../../features/gamesSlice";
import { sortPoints } from "../../util/playerSort";

export const FinalLobby = () => {
  const [lobby, setLobby] = useState<LobbyData[] | null>(null);

  const dispatch = useDispatch();

  const standings = useSelector(
    (state: RootState) => state.player.finalLobbyStandings,
  );
  const game = useSelector((state: RootState) => state.games.game);
  const finalGame = useSelector((state: RootState) => state.config.games).at(
    -1,
  );

  // for testing
  const allPlayers = useSelector((state: RootState) => state.player.standings);

  useEffect(() => {
    if (standings == null || standings.length == 0) {
      console.log("Slice is", allPlayers.slice(0, 8));
      dispatch(
        updateStandings({
          finalLobby: true,
          newStandings: allPlayers.slice(0, 8),
        }),
      );
    }
  }, [dispatch, standings, allPlayers]);

  const checkmate = useSelector((state: RootState) => state.config.checkmate);

  const finalLobby = { players: standings, completed: false };

  const lobbyFinished = (lobby: LobbyData) => {
    lobby.players.forEach((player) => {
      dispatch(updatePlayer({ finalLobby: true, player }));
      if (player.gameHistory.at(-1) == 8 && player.points >= 28 && checkmate)
        console.log("winner is", player);
    });
    setLobby(lobby);
  };

  return (
    <div>
      Final Lobby
      <FinalLobbyStandings />
      <br />
      {game < finalGame && (
        <button
          onClick={() => {
            console.log("Standings are", standings);
            const newStandings = sortPoints(standings, 0, 8);
            console.log("New standings are", newStandings);
            dispatch(updateStandings({ finalLobby: true, newStandings }));
            setLobby(finalLobby);
            dispatch(incrementGame());
          }}
        >
          Reset Lobby
        </button>
      )}
      {game <= finalGame && lobby && (
        <Lobby lobby={lobby} updateLobby={lobbyFinished} />
      )}
    </div>
  );
};
