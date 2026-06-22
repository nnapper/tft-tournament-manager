import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePlayers } from "../features/playerSlice";
import { generatePlayer } from "../util/playerGenerate";

export const AddPlayer = () => {
  const [riotId, setRiotId] = useState<string>("");
  const dispatch = useDispatch();
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
