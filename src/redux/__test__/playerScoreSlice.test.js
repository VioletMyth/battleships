import playerReducer, { updatePlayerScore } from "../playerScoreSlice";

describe("playerScoreSlice", () => {
  describe("playerScoreReducers", () => {
    it("should return state given invalid payload", () => {
      const payload = undefined;
      const result = playerReducer(2, updatePlayerScore(payload));
      expect(result).toBe(2);
    });
    it("should update playerScore with payload value", () => {
      const payload = 1;
      const result = playerReducer(0, updatePlayerScore(payload));
      expect(result).toStrictEqual(1);
    });
  });

  describe("actions", () => {
    const payload = 1;
    const result = updatePlayerScore(payload);
    expect(result).toEqual({
      payload: 1,
      type: "playerScore/updatePlayerScore",
    });
  });
});
