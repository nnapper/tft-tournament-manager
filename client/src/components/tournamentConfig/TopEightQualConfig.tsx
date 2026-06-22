import type { TopEightConditions } from "../../features/tournamentSlice";
import { Attribute } from "./Attribute";

interface BasicTopEightProps {
  topEightGames: number;
  setTopEightGames: React.Dispatch<React.SetStateAction<number>>;
  setTopEightQual: React.Dispatch<React.SetStateAction<TopEightConditions>>;
}

const BasicTopEight = (props: BasicTopEightProps) => {
  const { topEightGames, setTopEightGames, setTopEightQual } = props;

  return (
    <div>
      Basic Top 8 Qualification
      <br />
      <Attribute
        label="Number of games"
        value={topEightGames}
        setValue={setTopEightGames}
      />
      <button onClick={() => setTopEightQual("basic")}>Select</button>
    </div>
  );
};

interface LastChanceQualProps {
  topTwelveGames: number;
  setTopTwelveGames: React.Dispatch<React.SetStateAction<number>>;
  topEightGames: number;
  setTopEightGames: React.Dispatch<React.SetStateAction<number>>;
  setTopEightQual: React.Dispatch<React.SetStateAction<TopEightConditions>>;
}

const LastChanceQual = (props: LastChanceQualProps) => {
  const {
    topTwelveGames,
    setTopTwelveGames,
    topEightGames,
    setTopEightGames,
    setTopEightQual,
  } = props;

  return (
    <div>
      Last Chance Qualification (top 12 into top 8)
      <br />
      <Attribute
        label="Number of games for top 12"
        value={topTwelveGames}
        setValue={setTopTwelveGames}
      />
      <Attribute
        label="Number of games for top 8"
        value={topEightGames}
        setValue={setTopEightGames}
      />
      <button onClick={() => setTopEightQual("lastChance")}>Select</button>
    </div>
  );
};

interface TopEightQualConfigProps {
  topEightGames: number;
  setTopEightGames: React.Dispatch<React.SetStateAction<number>>;
  topTwelveGamesLC: number;
  setTopTwelveGamesLC: React.Dispatch<React.SetStateAction<number>>;
  topEightGamesLC: number;
  setTopEightGamesLC: React.Dispatch<React.SetStateAction<number>>;
  setTopEightQual: React.Dispatch<React.SetStateAction<TopEightConditions>>;
}

export const TopEightQualConfig = (props: TopEightQualConfigProps) => {
  const {
    topEightGames,
    setTopEightGames,
    topTwelveGamesLC,
    setTopTwelveGamesLC,
    topEightGamesLC,
    setTopEightGamesLC,
    setTopEightQual,
  } = props;
  return (
    <div>
      Top 8 Qualification
      <div className="flex-container">
        <BasicTopEight
          topEightGames={topEightGames}
          setTopEightGames={setTopEightGames}
          setTopEightQual={setTopEightQual}
        />
        <LastChanceQual
          topTwelveGames={topTwelveGamesLC}
          setTopTwelveGames={setTopTwelveGamesLC}
          topEightGames={topEightGamesLC}
          setTopEightGames={setTopEightGamesLC}
          setTopEightQual={setTopEightQual}
        />
      </div>
    </div>
  );
};
