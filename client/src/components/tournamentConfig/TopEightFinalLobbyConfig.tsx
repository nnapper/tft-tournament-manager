import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  addCutoffs,
  incrementRounds,
  addGames,
  addReseed,
  setWinCondition,
  setTopEightCondition,
  type TopEightConditions,
  type WinConditions,
  lockConfig,
} from "../../features/tournamentSlice";
import "../../App.css";
import { TopEightQualConfig } from "./TopEightQualConfig";
import { FinalLobbyConfig } from "./FinalLobbyConfig";

export const TopEightFinalLobbyConfig = () => {
  const [topTwelveGamesLC, setTopTwelveGamesLC] = useState<number>(0);
  const [topEightGamesLC, setTopEightGamesLC] = useState<number>(0);
  const [topEightGames, setTopEightGames] = useState<number>(0);
  const [topEightQual, setTopEightQual] =
    useState<TopEightConditions>("lastChance");

  const [finalLobbyGames, setFinalLobbyGames] = useState<number>(0);
  const [winCon, setWinCon] = useState<WinConditions>("checkmate");

  const dispatch = useDispatch();
  const updateConfig = () => {
    dispatch(incrementRounds());

    if (topEightQual == "lastChance") {
      dispatch(addGames(topTwelveGamesLC));
      dispatch(addReseed(topTwelveGamesLC));
      dispatch(addCutoffs(12));
      dispatch(incrementRounds());
      dispatch(addGames(topEightGamesLC));
      dispatch(addReseed(-1));
      dispatch(addCutoffs(8));
    } else {
      dispatch(addGames(topEightGames));
      dispatch(addReseed(-1));
      dispatch(addCutoffs(8));
    }

    dispatch(setTopEightCondition(topEightQual));

    dispatch(incrementRounds());
    if (winCon == "points") dispatch(addGames(finalLobbyGames));
    else dispatch(addGames(8));
    dispatch(addReseed(-1));
    dispatch(addCutoffs(1));
    dispatch(setWinCondition(winCon));

    dispatch(lockConfig());
  };

  return (
    <>
      <TopEightQualConfig
        topEightGames={topEightGames}
        setTopEightGames={setTopEightGames}
        topTwelveGamesLC={topTwelveGamesLC}
        setTopTwelveGamesLC={setTopTwelveGamesLC}
        topEightGamesLC={topEightGamesLC}
        setTopEightGamesLC={setTopEightGamesLC}
        setTopEightQual={setTopEightQual}
      />
      <FinalLobbyConfig
        finalLobbyGames={finalLobbyGames}
        setFinalLobbyGames={setFinalLobbyGames}
        setWinCon={setWinCon}
      />
      <button
        onClick={() => {
          updateConfig();
        }}
      >
        Lock Top 8 and Final Lobby Config
      </button>
    </>
  );
};
