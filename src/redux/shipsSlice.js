import { createSlice } from "@reduxjs/toolkit";
import data from "../data/response.json";

const getShipInitialState = (data) => {
  var ships = [];
  Object.keys(data.shipTypes).map((ship) => {
    ships.push({
      type: ship,
      positions: data?.layout
        ?.filter((layout) => layout.ship === ship)
        .map((layout) => layout?.positions),
      hit: Array(data.shipTypes[ship].size).fill(false),
    });
  });
  return ships;
};

const shipsSlice = createSlice({
  name: "ships",
  initialState: getShipInitialState(data),
  reducers: {
    updateShipsHit(state, action) {
      const { i, pIndex } = action.payload;
      state[i].hit[pIndex] = true;
    },
  },
});

export const { updateShipsHit } = shipsSlice.actions;
export default shipsSlice.reducer;
