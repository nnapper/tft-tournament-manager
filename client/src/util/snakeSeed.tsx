import type { Player } from "../features/playerSlice";

const fillPlayer: Player = {
  riotId: "FILL",
  puuid: "",
  lp: "UNRANKED",
  lpNormalized: 0,
  points: 0,
  gameHistory: [],
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
          : fillPlayer;
      if (i % 2 === 0) games[j].push(player);
      else games[numGames - j - 1].push(player);
    }
  }
  return games;
};

/*
export const snakeSeed2 = (playerStandings: Player[]) => {
  //   console.log("Hello");
  const numPlayers = playerStandings.length;
  const numGames = Math.ceil(numPlayers / 8);
  const games: Player[][] = [];
  for (let i = 0; i < numGames; i++) {
    games[i] = [];
  }

  //   console.log(games);

  for (let i = 0; i < numPlayers; i++) {
    const l = Math.floor(i / numGames);
    const temp = Math.pow(-1, l % 2);
    const temp2 = Math.pow(-1, (l + 1) % 2);
    // console.log(temp2);
    const part1 = (Math.ceil(l + 0.1 * temp) + temp2) * numGames;

    const temp3 = Math.pow(-1, l % 2);
    const part2 = temp3 * (i % numGames);
    // console.log("part2 without temp3 " + (i % numGames));
    // console.log(temp3);

    // console.log("Part1: " + part1);
    const lobby: number = part1 + part2;
    console.log("Lobby of " + i + " is " + lobby);
    // console.log(playerStandings[i]);
    // games[lobby].push(playerStandings[i]);
  }
  //   console.log(games);
  return games;
};
*/
