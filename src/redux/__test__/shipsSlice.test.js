import { ShipType } from "../../enums/shipType";
import shipsReducer, { updateShipsHit } from "../shipsSlice";

describe("shipsSlice", () => {
  describe("slicesReducer", () => {
    it("should return state given invalid payload", () => {
      const payload = { shipIndex: undefined, positionIndex: undefined };
      const result = shipsReducer(
        [{ type: ShipType.BATTLESHIP, positions: [[[0, 0]]], hit: [false] }],
        updateShipsHit(payload)
      );
      expect(result).toStrictEqual([
        {
          type: ShipType.BATTLESHIP,
          positions: [[[0, 0]]],
          hit: [false],
        },
      ]);
    });

    it("should update coordinate with payload value", () => {
      const payload = { shipIndex: 0, positionIndex: 0 };
      const result = shipsReducer(
        [{ type: ShipType.BATTLESHIP, positions: [[[0, 0]]], hit: [false] }],
        updateShipsHit(payload)
      );
      expect(result).toStrictEqual([
        {
          type: ShipType.BATTLESHIP,
          positions: [[[0, 0]]],
          hit: [true],
        },
      ]);
    });
  });
  describe("actions", () => {
    const payload = { shipIndex: 0, positionIndex: 0 };
    const result = updateShipsHit(payload);
    expect(result).toEqual({
      payload: { shipIndex: 0, positionIndex: 0 },
      type: "ships/updateShipsHit",
    });
  });
});
