import React from "react";
import { render, screen } from "@testing-library/react";
import Grid from "..";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();

jest.mock("../../GridRow", () => () => <div data-testid="gridRow" />);

describe("Grid", () => {
  it("should render grid row given grid data", () => {
    const store = mockStore({
      grid: [
        ["empty", "empty"],
        ["empty", "empty"],
      ],
    });

    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const subject = screen.getAllByTestId("gridRow");
    expect(subject.length).toBe(2);
  });
});
