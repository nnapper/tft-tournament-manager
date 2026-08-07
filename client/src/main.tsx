import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/playerSlice.tsx";
import gameReducer from "./features/gamesSlice.tsx";
import configReducer from "./features/configSlice.tsx";

const store = configureStore({
  reducer: {
    player: playerReducer,
    games: gameReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
