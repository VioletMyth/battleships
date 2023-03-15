import React from "react";
import { render, screen } from "@testing-library/react";
import { ShipType } from "../../../enums/shipType";
import ShipCounter from "..";

describe("ShipCounter", () => {
  it("should render ship list", () => {
    render(
      <ShipCounter
        shipType={ShipType.BATTLESHIP}
        hitData={[false, false, false]}
      />
    );
    const subject = screen.getByAltText("battleship");
    expect(subject).toBeInTheDocument();
  });

  it("should render correct number of hit or miss imgs", () => {
    render(
      <ShipCounter
        shipType={ShipType.BATTLESHIP}
        hitData={[false, false, false]}
      />
    );
    const hits = screen.queryAllByAltText("hit");
    const misses = screen.queryAllByAltText("miss");
    const indicators = [...hits, ...misses];

    expect(indicators.length).toBe(3);
  });
});
