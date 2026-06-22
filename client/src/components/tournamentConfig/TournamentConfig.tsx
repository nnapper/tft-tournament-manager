import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../main";
import { useState } from "react";
import {
  addCutoffs,
  incrementRounds,
  addGames,
  addReseed,
  setWinCondition,
  setTopEightCondition,
  type TournamentStateType,
  type TopEightConditions,
  type WinConditions,
} from "../../features/tournamentSlice";
import "../../App.css";
import type { Reducer } from "@reduxjs/toolkit";
import type { GameStateType } from "../../features/gameSlice";
import { SetTopEightConfig } from "./SetTopEightConfig";
import { Attribute } from "./Attribute";

export const ChoicePrompt = (props: {
  numGames: number;
  reseed: number;
  cutoff: number;
  mode: string;
  updateStore: Reducer<TournamentStateType | GameStateType>;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
}) => {
  const { numGames, reseed, cutoff, mode, updateStore, setMode, label } = props;
  const dispatch = useDispatch();
  const updateConfig = () => {
    dispatch(incrementRounds());
    dispatch(addGames(numGames));
    dispatch(addReseed(reseed));
    dispatch(addCutoffs(cutoff));
    //
    dispatch(updateStore(mode));
    setMode(true);
  };

  return (
    <div className="flex-child">
      {label}
      <br />
      <button onClick={() => updateConfig()}>Select</button>
    </div>
  );
};

const ChoicePromptTopEight = (props: {
  topTwelveGames: number;
  topEightGames: number;
  setTopTwelveGames: React.Dispatch<React.SetStateAction<number>>;
  setTopEightGames: React.Dispatch<React.SetStateAction<number>>;
  setTopEightQual: React.Dispatch<React.SetStateAction<TopEightConditions>>;
}) => {
  const {
    topTwelveGames,
    setTopTwelveGames,
    topEightGames,
    setTopEightGames,
    setTopEightQual,
  } = props;
  return (
    <div>
      <div className="flex-child">
        Last Chance Qualificiation
        <br />
        <Attribute
          label="Games for round"
          value={topTwelveGames}
          setValue={setTopTwelveGames}
        />
        <Attribute
          label="Games for round"
          value={topEightGames}
          setValue={setTopEightGames}
        />
        <button onClick={() => setTopEightQual("lastChance")}>Select</button>
      </div>
      <div className="flex-child">
        Basic Eight
        <br />
        <Attribute
          label="Games for round"
          value={topEightGames}
          setValue={setTopEightGames}
        />
        <button onClick={() => setTopEightQual("basic")}>Select</button>
      </div>
    </div>
  );
};

// const PreTopEightConfig = () => {
//   const [numGames, setNumGames] = useState<number>(0);
//   const [reseed, setReseed] = useState<number>(0);
//   const [cutoff, setCutoff] = useState<number>(0);

//   const dispatch = useDispatch();
//   const updateConfig = (cutoff: number) => {
//     dispatch(incrementRounds());
//     dispatch(addGames(numGames));
//     dispatch(addReseed(reseed));
//     dispatch(addCutoffs(cutoff));
//   };

//   return (
//     <div>
//       <Attribute
//         label="Games for round"
//         value={numGames}
//         setValue={setNumGames}
//       />
//       <Attribute
//         label="Games before reseed"
//         value={reseed}
//         setValue={setReseed}
//       />
//       <Attribute label="Player cutoff" value={cutoff} setValue={setCutoff} />
//       <button
//         onClick={() => {
//           updateConfig(cutoff);
//         }}
//       >
//         Lock Round Config
//       </button>
//     </div>
//   );
// };

const TopEightFinalLobbyConfig = () => {
  const [topTwelveGames, setTopTwelveGames] = useState<number>(0);
  const [topEightGames, setTopEightGames] = useState<number>(0);
  const [topEightQual, setTopEightQual] =
    useState<TopEightConditions>("lastChance");

  const [finalLobbyGames, setFinalLobbyGames] = useState<number>(0);
  const [winConSet, setWinCon] = useState<WinConditions>("checkmate");

  const dispatch = useDispatch();
  const updateConfig = () => {
    dispatch(incrementRounds());

    if (topEightQual == "lastChance") {
      dispatch(addGames(topTwelveGames));
      dispatch(addReseed(-1));
      dispatch(addCutoffs(12));
      dispatch(incrementRounds());
    }

    dispatch(addGames(topEightGames));
    dispatch(addReseed(-1));
    dispatch(addCutoffs(8));
    dispatch(setTopEightCondition(topEightQual));

    dispatch(incrementRounds());
    dispatch(addGames(finalLobbyGames));
    dispatch(addReseed(-1));
    dispatch(addCutoffs(1));
    dispatch(setWinCondition(winConSet));
  };

  return (
    <>
      <ChoicePromptTopEight
        topEightGames={topEightGames}
        setTopEightGames={setTopEightGames}
        topTwelveGames={topTwelveGames}
        setTopTwelveGames={setTopTwelveGames}
        setTopEightQual={setTopEightQual}
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

const ConfigModule = () => {
  return (
    <>
      {/* <PreTopEightConfig /> */}
      <TopEightFinalLobbyConfig />
    </>
  );
};

export const TournamentConfig = () => {
  const tournamentSettings = useSelector(
    (state: RootState) => state.tournament,
  );

  console.log("Games in tourney", tournamentSettings.games.length);

  return (
    <>
      {ConfigModule(tournamentSettings.cutoffs[tournamentSettings.rounds - 1])}
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Games</th>
            <th>Reseed</th>
            <th>Cutoff</th>
          </tr>
        </thead>
        {tournamentSettings.games.map((games, i) => (
          <tbody key={i}>
            <tr>
              <td key={i * i}>{i + 1}</td>
              <td key={i * i + 1}>{games}</td>
              <td key={i * i + 3}>{tournamentSettings.reseed[i]}</td>
              <td key={i * i + 4}>{tournamentSettings.cutoffs[i]}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};
