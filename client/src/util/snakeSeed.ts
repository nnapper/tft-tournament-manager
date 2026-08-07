import type { Player } from "../features/playerSlice";

export const createFillPlayer = () => {
  const fillPlayer = {
    riotId: "FILL",
    puuid: Math.random().toString(36).substring(2),
    lp: "UNRANKED",
    lpNormalized: 0,
    points: 0,
    gameHistory: [],
  };
  return fillPlayer;
};

export const snakeSeed = (playerStandings: Player[]) => {
  const numPlayers = playerStandings.length;
  const numGames = Math.ceil(numPlayers / 8);
  const games: Player[][] = [];
  // const gamesMirror = [];
  for (let i = 0; i < numGames; i++) games[i] = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < numGames; j++) {
      const player =
        playerStandings[numGames * i + j] != null
          ? playerStandings[numGames * i + j]
          : createFillPlayer();
      if (player.riotId == "FILL")
        player.puuid = Math.random().toString(36).substring(2);
      if (i % 2 === 0) games[j].push(player);
      else games[numGames - j - 1].push(player);
    }
  }
  return games;
};
