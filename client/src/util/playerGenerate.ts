import axios from "axios";
import { numToTierRankLP, tierRankLPToNum } from "./rankConversion";
import type { Player } from "../features/playerSlice";

interface AccountDto {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export const generatePlayer = async (riotId: string) => {
  const parts = riotId.split("#");
  const gameName = parts[0];
  const tagLine = parts[1];

  const urlPUUID = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${import.meta.env.VITE_RIOT_API_KEY}`;

  console.log("request is " + urlPUUID);

  const playerDTO: AccountDto = await axios({
    method: "get",
    url: urlPUUID,
    responseType: "json",
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("Player doesn't exist", err);
      return;
    });

  const puuid = playerDTO.puuid;

  const urlPlayerLP = `https://na1.api.riotgames.com/tft/league/v1/by-puuid/${puuid}?api_key=${import.meta.env.VITE_RIOT_API_KEY}`;

  const lp: number = await axios({
    method: "get",
    url: urlPlayerLP,
    responseType: "json",
  }).then((response) => {
    console.log("Hello getting lp");
    console.log(response);
    const temp = tierRankLPToNum(
      response.data[0].tier,
      response.data[0].rank,
      response.data[0].leaguePoints,
    );
    return temp;
  });
  console.log("LP of", riotId, " is", lp);
  // console.log("Real representation is", lp && numToTierRankLP(lp));

  const playerInfo: Player = {
    riotId: playerDTO.gameName + "#" + playerDTO.tagLine,
    puuid,
    lp: await numToTierRankLP(lp),
    lpNormalized: lp,
    points: 0,
    gameHistory: [],
  };

  return playerInfo;
};
