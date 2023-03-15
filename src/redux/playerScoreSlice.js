import { createSlice } from "@reduxjs/toolkit";

const playerScoreSlice = createSlice({
  name: "playerScore",
  initialState: 0,
  reducers: {
    updatePlayerScore(state, payload) {
      if (payload.payload === undefined) {
        return state;
      }
      return payload.payload;
    },
  },
});

export const { updatePlayerScore } = playerScoreSlice.actions;
export default playerScoreSlice.reducer;
