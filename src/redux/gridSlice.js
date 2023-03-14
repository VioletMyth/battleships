import { createSlice } from "@reduxjs/toolkit";
import { GridSquareStatus } from "../gridSquareStatus";

const BATTLESHIP_SIZE = 10;

const initialiseGrid = (size) => {
  var grid = Array.apply(null, Array(size)).map(() => {
    return new Array(size).fill(GridSquareStatus.Empty);
  });
  return grid;
};

const gridSlice = createSlice({
  name: "grid",
  initialState: initialiseGrid(BATTLESHIP_SIZE),
  reducers: {
    updateGrid(state, action) {
      const { row, col, value } = action.payload;
      state[row][col] = value;
    },
  },
});

export const { updateGrid } = gridSlice.actions;
export default gridSlice.reducer;
