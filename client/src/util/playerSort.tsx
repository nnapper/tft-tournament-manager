import { type Player } from "../features/playerSlice";

const tieBreaker = (playerOne: Player, playerTwo: Player) => {
  // if no games have been made rank by lp
  if (playerOne.points === 0) {
    // console.log("Points are 0");
    if (playerOne.lpNormalized > playerTwo.lpNormalized) {
      return playerOne;
    } else if (playerOne.lp < playerTwo.lp) {
      return playerTwo;
    }
  } else {
    // tiebreaker by number of top 4s; 1sts count as two
    const playerOneWins = playerOne.gameHistory.filter((n) => n === 8).length;
    const playerTwoWins = playerTwo.gameHistory.filter((n) => n === 8).length;
    // excluding 1sts
    const playerOneTopFours = playerOne.gameHistory.filter(
      (n) => n >= 5 && n !== 8,
    ).length;
    const playerTwoTopFours = playerTwo.gameHistory.filter(
      (n) => n >= 5 && n !== 8,
    ).length;
    const playerOnePlacements = playerOneWins * 2 + playerOneTopFours;
    const playerTwoPlacements = playerTwoWins * 2 + playerTwoTopFours;
    if (playerOnePlacements > playerTwoPlacements) {
      return playerOne;
    } else if (playerOnePlacements < playerTwoPlacements) {
      return playerTwo;
    }

    // tiebreaker by number of individual placements
    for (let i = 8; i >= 1; i--) {
      const playerOneNumPlacements = playerOne.gameHistory.filter(
        (n) => n === i,
      ).length;
      const playerTwoNumPlacements = playerTwo.gameHistory.filter(
        (n) => n === i,
      ).length;

      if (playerOneNumPlacements > playerTwoNumPlacements) {
        return playerOne;
      } else if (playerOneNumPlacements < playerTwoNumPlacements) {
        return playerTwo;
      }
    }

    // tiebreaker by most recent game
    const gamesPlayed = playerOne.gameHistory.length;
    for (let i = gamesPlayed - 1; i >= 0; i--) {
      if (playerOne.gameHistory[i] > playerTwo.gameHistory[i]) {
        return playerOne;
      } else if (playerOne.gameHistory[i] < playerTwo.gameHistory[i]) {
        return playerTwo;
      }
    }
  }
  // random tiebreaker
  const random = Math.floor(Math.random() * 10);
  if (random <= 5) return playerOne;
  return playerTwo;
};

const sortPlayers = (players: Array<Player>, field: keyof Player) => {
  const len = players.length;

  if (len == 1) return players;

  const firstHalf = players.slice(0, len / 2);
  const secondHalf = players.slice(len / 2);

  const sortedFirstHalf = sortPlayers(firstHalf, field);
  const sortedSecondHalf = sortPlayers(secondHalf, field);

  // console.log(sortedFirstHalf, sortedSecondHalf);

  const sorted: Player[] = [];

  let i: number = 0;
  let j: number = 0;

  while (i < sortedFirstHalf.length && j < sortedSecondHalf.length) {
    const playerOne = sortedFirstHalf[i];
    const playerTwo = sortedSecondHalf[j];

    if (playerOne[field] > playerTwo[field]) {
      sorted.push(playerOne);
      i++;
    } else if (playerOne[field] === playerTwo[field] && field === "points") {
      // console.log("tiebreakers");
      if (tieBreaker(playerOne, playerTwo) === playerOne) {
        sorted.push(playerOne);
        i++;
      } else {
        sorted.push(playerTwo);
        j++;
      }
    } else {
      sorted.push(playerTwo);
      j++;
    }
  }

  while (i < sortedFirstHalf.length) {
    sorted.push(sortedFirstHalf[i]);
    i++;
  }
  while (j < sortedSecondHalf.length) {
    sorted.push(sortedSecondHalf[j]);
    j++;
  }

  return sorted;
};

export const sortAlphabetical = (players: Player[]) => {
  return sortPlayers(players, "riotId");
};

export const sortAlphabetical2 = (players: Player[]) => {
  return sortPlayers(players, "riotId");
};

export const sortLP = (players: Player[]) => {
  return sortPlayers(players, "lpNormalized");
};

export const sortLP2 = (players: Player[]) => {
  return sortPlayers(players, "lpNormalized");
};

export const sortPoints = (players: Player[]) => {
  return sortPlayers(players, "points");
};

export const sortPoints2 = (players: Player[]) => {
  return sortPlayers(players, "points");
};
