import { createSlice } from "@reduxjs/toolkit";
import { GridSquareStatus } from "../enums/gridSquareStatus";

const BATTLESHIP_SIZE = 10;

export const initialiseGrid = (size) => {
  var grid = Array.apply(null, Array(size)).map(() => {
    return new Array(size).fill(GridSquareStatus.EMPTY);
  });
  return grid;
};

const gridSlice = createSlice({
  name: "grid",
  initialState: initialiseGrid(BATTLESHIP_SIZE),
  reducers: {
    updateGrid(state, action) {
      const { row, col, value } = action.payload;
      if (row === undefined || col === undefined || value === undefined) {
        return state;
      }
      state[row][col] = value;
    },
  },
});

export const { updateGrid } = gridSlice.actions;
export default gridSlice.reducer;
