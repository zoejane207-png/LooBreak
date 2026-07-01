import Results from "../../../src/components/Results";
import { BrowserRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getQuiz } from "../../../src/services/quiz";
import { vi, beforeEach } from "vitest";

vi.mock("../../../src/services/quiz", () => ({
  getQuiz: vi.fn(),
}));

function renderResults(score) {
  render(
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Results score={score} />
    </BrowserRouter>,
  );
}

describe("Results", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getQuiz.mockResolvedValue(Array(10).fill({})); // mock a 10-question quiz
  });

  test("that headers appear", async () => {
    renderResults(7);

    const heading1 = screen.getByRole("heading", { name: /game over/i });
    expect(heading1.textContent).toEqual("Game Over!");

    const heading2 = await screen.findByTestId("score");
    expect(heading2.textContent).toContain("/10");

    const heading3 = screen.getByTestId("results-message");
    expect(heading3).toBeInTheDocument();
  });

  test("prompts the user to enter a playername", async () => {
    renderResults(7);

    expect(
      await screen.findByText(
        "Enter a playername to save your score to the leaderboard:",
      ),
    ).toBeInTheDocument();
  });
});
