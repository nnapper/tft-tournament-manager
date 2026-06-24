import axios from "axios";

const tiers: Record<string, number> = {
  IRON: 0,
  BRONZE: 400,
  SILVER: 800,
  GOLD: 1200,
  PLATINUM: 1600,
  EMERALD: 2000,
  DIAMOND: 2400,
  MASTER: 2500,
};

const ranks: Record<string, number> = {
  IV: 0,
  III: 100,
  II: 200,
  I: 300,
};

export const tierRankLPToNum = (tier: string, rank: string, lp: number) => {
  if (tier in tiers) return tiers[tier] + ranks[rank] + lp;
  return tiers["MASTER"] + ranks[rank] + lp;
};

export const numToTierRankLP = async (num: number | null) => {
  if (num == null) return "UNRANKED";
  if (num < 2800) {
    const tierRemainder = num % 400;
    const tierVal = num - tierRemainder;
    const tier = Object.keys(tiers).find((key) => tiers[key] === tierVal);
    const lp = tierRemainder % 100;
    const rankVal = tierRemainder - lp;
    const rank = Object.keys(ranks).find((key) => ranks[key] === rankVal);
    return tier + " " + rank + " " + lp;
  }

  const lp = num - 2800;

  if (lp < 200) return "MASTER " + lp;

  const gmURL = `https://na1.api.riotgames.com/tft/league/v1/grandmaster?queue=RANKED_TFT&api_key=${import.meta.env.VITE_RIOT_API_KEY}`;

  const gmThreshold: number | null = await axios({
    method: "get",
    url: gmURL,
    responseType: "json",
  })
    .then((response) => {
      return response.data.entries.at(-1).leaguePoints;
    })
    .catch((err) => {
      console.log("Failed api call for some reason", err);
    });

  if (gmThreshold == null || lp < gmThreshold) return "MASTER " + lp;

  const chalURL = `https://na1.api.riotgames.com/tft/league/v1/challenger?queue=RANKED_TFT&api_key=${import.meta.env.VITE_RIOT_API_KEY}`;

  const chalThreshold: number | null = await axios({
    method: "get",
    url: chalURL,
    responseType: "json",
  })
    .then((response) => {
      return response.data.entries.at(-1).leaguePoints;
    })
    .catch((err) => {
      console.log("Failed api call for some reason", err);
    });

  if (chalThreshold == null || lp < chalThreshold) return "GRANDMASTER " + lp;

  return "CHALLENGER " + lp;
};
