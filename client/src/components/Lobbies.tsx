import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../main";
import { useEffect, useState } from "react";
import { updatePlayer, type Player } from "../features/playerSlice";
import { snakeSeed } from "../util/snakeSeed";
import { logGames } from "../features/gameSlice";

interface Lobby {
  players: Player[];
  completed: boolean;
}

interface LobbyProps {
  lobby: Lobby;
  updateLobby: (lobby: Lobby) => void;
}

const Lobby = ({ lobby, updateLobby }: LobbyProps) => {
  const round = useSelector((state: RootState) => state.tournament.rounds);

  // console.log("Lobby passed is", typeof lobby);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lobbyEnd = (players: Player[]) => {};

  const lobbyEndTest = (players: Player[]) => {
    let indexes = [0, 1, 2, 3, 4, 5, 6, 7];
    indexes = indexes.sort(() => Math.random() - 0.5);

    const updatedPlayers = [...players];

    for (let i = 0; i < 8; i++) {
      updatedPlayers[indexes[i]] = {
        ...updatedPlayers[indexes[i]],
        points: updatedPlayers[indexes[i]].points + 8 - i,
        gameHistory: [...updatedPlayers[indexes[i]].gameHistory, 8 - i],
      };

      console.log("Points scored: " + players[indexes[i]].points);
    }

    const updatedLobby = {
      ...lobby,
      players: updatedPlayers,
      completed: true,
    };

    console.log("The updated player points are is", updatedLobby.players);

    updateLobby(updatedLobby);
  };

  console.log("Comparison", round, lobby.players[0].gameHistory.length);

  return (
    <div className="flex-child">
      {lobby.players.map((player: Player) => (
        <div key={player.puuid}>
          {player.riotId}
          {lobby.completed && " - "}
          {lobby.completed && player.gameHistory.at(-1)}
        </div>
      ))}
      <button onClick={() => lobbyEndTest(lobby.players)}>Test game end</button>
    </div>
  );
};

export const Lobbies = () => {
  const [lobbies, setLobbies] = useState<Lobby[] | null>(null);

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

    const tempLobbies = snakeSeed(availablePlayers).map((players: Player[]) => {
      return {
        players: players,
        completed: false,
      };
    });

    console.log("tempLobbies are", tempLobbies);

    setLobbies(tempLobbies);

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

  const lobbyFinished = (lobby: Lobby) => {
    console.log("Passed this lobby: " + lobby);

    const newLobbies = lobbies.map((prevLobby) =>
      prevLobby.players[0].puuid === lobby.players[0].puuid
        ? {
            ...lobby,
            players: lobby.players.toSorted(
              (player1, player2) =>
                player2.gameHistory.at(-1) - player1.gameHistory.at(-1),
            ),
          }
        : prevLobby,
    );

    console.log("In lobbyFinished", newLobbies);

    setLobbies(newLobbies);

    console.log("New lobbies", lobbies);

    lobby.players.forEach((player) => dispatch(updatePlayer(player)));
    console.log("updated players");
  };

  useEffect(() => {
    console.log("Updated lobbies are", lobbies);
  }, [lobbies]);

  return (
    <div>
      <button
        onClick={() => {
          setLobbies(null);
          createLobbies();
        }}
      >
        Create Lobbies
      </button>
      {lobbies && (
        <div className="lobbies">
          {lobbies.map((lobby) => (
            <div key={lobby.players[0].puuid} className="lobby">
              Test lobby
              <Lobby lobby={lobby} updateLobby={lobbyFinished} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
