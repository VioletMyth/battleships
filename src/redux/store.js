import { configureStore } from "@reduxjs/toolkit";
import gridReducers from "./gridSlice";
import shipsReducers from "./shipsSlice";
import playerScoreReducers from "./playerScoreSlice";
export const store = configureStore({
  reducer: {
    grid: gridReducers,
    ships: shipsReducers,
    playerScore: playerScoreReducers,
  },
});
