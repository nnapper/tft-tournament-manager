import type { Player } from "../../../features/playerSlice";

export type LobbyPlayers = {
	player: Player;
	placement: number;
};

export type LobbyData = {
	players: LobbyPlayers[];
	completed: boolean;
};

type LobbyProps = {
	lobby: LobbyData;
	lobbyFinished: (lobby: LobbyData) => void;
};

export const Lobby = ({ lobby, lobbyFinished }: LobbyProps) => {
	return (
		<div className="flex-child">
			{lobby.players.map((lobbyPlayer) => (
				<div key={lobbyPlayer.player.puuid}>
					{lobbyPlayer.player.riotId}
					{lobby.completed && " - "}
					{lobby.completed && lobbyPlayer.player.gameHistory.at(-1)}
				</div>
			))}
			{!lobby.completed && (
				<button onClick={() => lobbyFinished(lobby)}>
					Test game end
				</button>
			)}
		</div>
	);
};
