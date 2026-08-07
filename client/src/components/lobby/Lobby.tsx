export interface LobbyData {
  players: Player[];
  completed: boolean;
}

interface LobbyProps {
  lobby: LobbyData;
  updateLobby: (lobby: LobbyData) => void;
}

export const Lobby = ({ lobby, updateLobby }: LobbyProps) => {
  // const round = useSelector((state: RootState) => state.config.rounds);

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

      // console.log("Points scored: " + players[indexes[i]].points);
    }

    const updatedLobby = {
      ...lobby,
      players: updatedPlayers,
      completed: true,
    };

    // console.log("The updated player points are is", updatedLobby.players);

    updateLobby(updatedLobby);
  };

  // console.log("Comparison", round, lobby.players[0].gameHistory.length);

  return (
    <div className="flex-child">
      {lobby.players.map((player: Player) => (
        <div key={player.puuid}>
          {player.riotId}
          {lobby.completed && " - "}
          {lobby.completed && player.gameHistory.at(-1)}
        </div>
      ))}
      {!lobby.completed && (
        <button onClick={() => lobbyEndTest(lobby.players)}>
          Test game end
        </button>
      )}
    </div>
  );
};
