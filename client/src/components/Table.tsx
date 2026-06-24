import type { Player } from "../features/playerSlice";

interface LobbyProps {
  lobby: Player[];
}

const Lobby = ({ lobby }: LobbyProps) => {
  return (
    <div className="flex-child">
      {lobby.map((player: Player) => (
        <div key={player.puuid}>{player.riotId}</div>
      ))}
    </div>
  );
};

interface TableProps {
  lobbies: Player[][];
}

export const Table = ({ lobbies }: TableProps) => {
  return (
    <div className="flex-container">
      {lobbies.map((lobby: Player[]) => (
        <div>Test lobby{Lobby({ lobby })}</div>
      ))}
    </div>
  );
};
