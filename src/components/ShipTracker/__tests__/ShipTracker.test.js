import React from "react";
import { render, screen } from "@testing-library/react";
import { ShipType } from "../../../enums/shipType";
import ShipTracker from "..";

jest.mock("../../ShipCounter", () => () => <div data-testid="shipCounter" />);

describe("ShipCounter", () => {
  it("should render ship counters given ships list", () => {
    render(
      <ShipTracker
        shipData={[
          {
            type: ShipType.BATTLESHIP,
            positions: [[0, 0]],
            hit: [false],
          },
          {
            type: ShipType.CARRIER,
            positions: [[0, 1]],
            hit: [false],
          },
        ]}
      />
    );
    const subject = screen.getAllByTestId("shipCounter");
    expect(subject.length).toBe(2);
  });
});
