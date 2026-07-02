import Results from "../../../src/components/Results";
import { BrowserRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Results", () => {
  test("that headers appear", () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Results score={7} total={10} />
      </BrowserRouter>,
    );
    const heading1 = screen.getByRole("heading", { name: /game over/i });
    const heading2 = screen.getByTestId("score");
    const heading3 = screen.getByTestId("results-message");
    expect(heading1.textContent).toEqual("Game Over!");
    expect(heading2.textContent).toContain("/10");
    expect(heading3).toBeInTheDocument();
  });

  test("prompts the user to enter a playername", () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Results score={7} total={10} />
      </BrowserRouter>,
    );
    expect(
      screen.getByText(
        "Enter a playername to save your score to the leaderboard",
      ),
    ).toBeInTheDocument();
  });
});
