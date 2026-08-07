import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../main";
import { useEffect, useState } from "react";
import {
  updatePlayer,
  updateStandings,
  type Player,
} from "../../features/playerSlice";
import { snakeSeed } from "../../util/snakeSeed";
import {
  incrementGame,
  incrementRound,
  logGames,
} from "../../features/gamesSlice";
import { sortPoints } from "../../util/playerSort";
import { Lobby, type LobbyData } from "./Lobby";

export const PreFinalLobby = () => {
  const [lobbies, setLobbies] = useState<LobbyData[] | null>(null);
  const [prevLobbies, setPrevLobbies] = useState<LobbyData[] | null>(null);
  const [updatePrevLobbies, setUpdatePrevLobbies] = useState<boolean>(true);

  let round = useSelector((state: RootState) => state.games.round);
  const game = useSelector((state: RootState) => state.games.game);
  const games = useSelector((state: RootState) => state.config.games);
  const reseeds = useSelector((state: RootState) => state.config.reseed);
  const cutoffs = useSelector((state: RootState) => state.config.cutoffs);
  const standings = useSelector((state: RootState) => state.player.standings);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const basicTopEight = useSelector(
    (state: RootState) => state.config.basicTopEight,
  );

  const dispatch = useDispatch();

  const createLobbies = () => {
    if (lobbies != null) dispatch(logGames(lobbies));

    let newStandings = standings;
    if (game != 0) {
      newStandings = sortPoints(
        standings,
        0,
        cutoffs[round - 1] != null ? cutoffs[round - 1] : standings.length,
      );
      dispatch(
        updateStandings({
          finalLobby: false,
          newStandings,
        }),
      );
    }

    console.log(
      "updated players, bound are",
      0,
      cutoffs[round - 1] != null ? cutoffs[round - 1] : standings.length,
    );

    if (games.includes(game)) {
      dispatch(incrementRound());
      round++;
    }

    setUpdatePrevLobbies(true);
    console.log("On game", game, "round", round);

    if (games.includes(game) || reseeds.includes(game) || game == 0) {
      console.log("reseed needed");
      const cutoff =
        cutoffs[round - 1] != null ? cutoffs[round - 1] : standings.length;
      console.log("cutoffs are", cutoff);
      const availablePlayers = newStandings.slice(0, cutoff);
      console.log(round, cutoff);

      const tempLobbies = snakeSeed(availablePlayers).map(
        (players: Player[]) => {
          return {
            players: players,
            completed: false,
          };
        },
      );

      // console.log("tempLobbies are", tempLobbies);

      setLobbies(tempLobbies);
    } else {
      console.log("Keep same lobbies");
      setLobbies(prevLobbies);
    }

    dispatch(incrementGame());
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

  useEffect(() => {
    // console.log("Lobbies created", lobbies);
    if (updatePrevLobbies) {
      // eslint-disable-next-line
      setPrevLobbies(lobbies);
      setUpdatePrevLobbies(false);
    }
  }, [lobbies, dispatch]);

  const lobbyFinished = (lobby: LobbyData) => {
    // console.log("Passed this lobby: " + lobby);

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

    // console.log("In lobbyFinished", newLobbies);

    setLobbies(newLobbies);

    // console.log("New lobbies", lobbies);

    lobby.players.forEach((player) =>
      dispatch(updatePlayer({ finalLobby: false, player })),
    );
    // console.log("current cutoff is", cutoffs[round - 1] != null ? cutoffs[round - 1] : standings.length;
    // console.log("cutoffs are", cutoffs);
  };

  return (
    <div>
      <button
        onClick={() => {
          //   setLobbies(null);
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
