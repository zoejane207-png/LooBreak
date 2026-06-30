import Results from "../../../src/components/Results";
import { BrowserRoute } from "react-router-dom";
import { screen, render } from "@testing-library/react";

describe("Results", () => {
  test("that headers appear", () => {
    render(
      <BrowserRoute
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Results />
      </BrowserRoute>,
    );
    const heading1 = screen.getByRole("heading", { name: /game over/i });
    const heading2 = screen.getByTestId("score");
    const heading3 = screen.getByTestId("results-message");
    expect(heading1.textContent).toEqual("Game Over!");
    expect(heading2.textContent).toContain("/10");
    expect(heading3.textContent).toBeInTheDocument();
  });
});

// something about prompting user to enter playername?
