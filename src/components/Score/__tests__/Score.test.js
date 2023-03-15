import React from "react";
import { render, screen } from "@testing-library/react";
import Score from "..";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();

jest.mock("../../GridRow", () => () => <div data-testid="gridRow" />);

describe("Score", () => {
  it("should render padded by 0 player one counter", () => {
    const store = mockStore({
      playerScore: 1,
      ships: [],
    });

    render(
      <Provider store={store}>
        <Score />
      </Provider>
    );

    const subject = screen.getByText("01");
    expect(subject).toBeInTheDocument();
  });
});
