import React from "react";
import { render, screen } from "@testing-library/react";
import GridRow from "..";

jest.mock("../../GridCell", () => () => <div data-testid="gridCell" />);

describe("ShipCounter", () => {
  it("should row of grid cells given row and row index", () => {
    render(<GridRow row={["empty", "hit"]} rowIndex={0} />);
    const subject = screen.getAllByTestId("gridCell");
    expect(subject.length).toBe(2);
  });
});
