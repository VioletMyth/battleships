import { GridSquareStatus } from "../../enums/gridSquareStatus";
import gridReducer, { updateGrid, initialiseGrid } from "../gridSlice";
describe("gridSlice", () => {
  describe("gridReducers", () => {
    it("should return state given invalid payload", () => {
      const payload = { row: 0, col: 0, value: undefined };
      const result = gridReducer(initialiseGrid(1), updateGrid(payload));
      expect(result).toStrictEqual([["empty"]]);
    });
    it("should update coordinate with payload value", () => {
      const payload = { row: 0, col: 0, value: GridSquareStatus.HIT };
      const result = gridReducer(initialiseGrid(1), updateGrid(payload));
      expect(result).toStrictEqual([["hit"]]);
    });
  });
  describe("actions", () => {
    const payload = { row: 0, col: 0, value: GridSquareStatus.HIT };
    const result = updateGrid(payload);
    expect(result).toEqual({
      payload: {
        row: 0,
        col: 0,
        value: GridSquareStatus.HIT,
      },
      type: "grid/updateGrid",
    });
  });
});
