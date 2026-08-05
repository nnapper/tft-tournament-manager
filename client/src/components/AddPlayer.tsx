import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlayers } from "../features/playerSlice";
import { generatePlayer } from "../util/playerGenerate";
import { createFillPlayer } from "../util/snakeSeed";

export const AddPlayer = () => {
  const [riotId, setRiotId] = useState<string>("");
  const dispatch = useDispatch();

  // const [generateTestPlayers, setGenerateTestPlayers] = useState<boolean>();

  const standings = useSelector((state: RootState) => state.player.standings);

  // for testing
  useEffect(() => {
    if (standings.length == 0) {
      for (let i = 0; i < 64; i++) {
        const player = createFillPlayer();
        player.riotId += i;
        dispatch(updatePlayers(player));
      }
    }
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="gameName#tagline"
        value={riotId}
        onChange={(e) => setRiotId(e.target.value)}
      />
      <button
        onClick={async () => {
          const player = await generatePlayer(riotId);
          console.log("Generated player for", riotId);
          console.log("Generated player:", player);
          dispatch(updatePlayers(player));
        }}
      >
        Add Player
      </button>
    </div>
  );
};
