import React from "react";
// import { render, unmountComponentAtNode, screen } from "react-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import GridCell from "..";
import { ShipType } from "../../../enums/shipType";
import { updateGrid } from "../../../redux/gridSlice";
import { GridSquareStatus } from "../../../enums/gridSquareStatus";
import { updateShipsHit } from "../../../redux/shipsSlice";

const mockStore = configureStore();

describe("GridCell", () => {
  it("should render empty cell given empty cell coordinates", () => {
    const store = mockStore({ grid: [["empty"]] });
    const { container } = render(
      <Provider store={store}>
        <GridCell row={0} col={0} />
      </Provider>
    );
    const subject = container.lastElementChild;
    expect(subject).toBeInTheDocument();
  });

  it("should render hit given hit coordinate", () => {
    const store = mockStore({ grid: [["hit"]] });
    render(
      <Provider store={store}>
        <GridCell row={0} col={0} />
      </Provider>
    );
    const subject = screen.getByAltText("hitBig");
    expect(subject).toBeInTheDocument();
  });

  it("should render miss given miss coordinate", () => {
    const store = mockStore({ grid: [["miss"]] });
    render(
      <Provider store={store}>
        <GridCell row={0} col={0} />
      </Provider>
    );
    const subject = screen.getByAltText("miss");
    expect(subject).toBeInTheDocument();
  });

  it("should update grid and ships onClick given ship position", () => {
    const store = mockStore({
      grid: [["empty"]],
      ships: [
        {
          type: ShipType.BATTLESHIP,
          positions: [[[0, 0]]],
          hit: [false],
        },
      ],
    });
    render(
      <Provider store={store}>
        <GridCell row={0} col={0} />
      </Provider>
    );
    const subject = screen.getAllByText("");
    fireEvent.click(subject[2]);
    console.log(store.getActions());
    expect(store.getActions()).toContainEqual(
      updateShipsHit({ shipIndex: 0, positionIndex: 0 }),
      updateGrid({ row: 0, col: 0, value: GridSquareStatus.HIT })
    );
  });

  it("should dispatch updateGrid action onClick given empty ship position", () => {
    const store = mockStore({
      grid: [
        ["empty", "empty"],
        ["empty", "empty"],
      ],
      ships: [
        {
          type: ShipType.BATTLESHIP,
          positions: [[[0, 0]]],
          hit: [false],
        },
      ],
    });
    render(
      <Provider store={store}>
        <GridCell row={0} col={1} />
      </Provider>
    );
    const subject = screen.getAllByText("");
    fireEvent.click(subject[2]);
    console.log(store.getActions());
    expect(store.getActions()).toContainEqual(
      updateGrid({ row: 0, col: 1, value: GridSquareStatus.MISS })
    );
  });
});
