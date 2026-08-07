import { useSelector } from "react-redux";
import "./App.css";
import { Lobbies } from "./components/lobby/Lobbies";
import { TournamentConfig } from "./components/tournamentConfig/TournamentConfig";
import type { RootState } from "./main";
import { PlayerUI } from "./components/PlayerUI";
import { useEffect, useState } from "react";

function App() {
  const configLocked = useSelector(
    (state: RootState) => state.config.configLocked,
  );

  const [testAPIData, setTestAPIData] = useState<string>("Hello");

  useEffect(() => {
    fetch("/api/hello_world")
      .then((e) => e.text())
      .then((e) => {
        setTestAPIData(e);
      });
  }, []);

  return (
    <div>
      {testAPIData}
      <TournamentConfig />
      {configLocked && <PlayerUI />}
      {configLocked && <br />}
      {configLocked && <Lobbies />}
    </div>
  );
}

export default App;
