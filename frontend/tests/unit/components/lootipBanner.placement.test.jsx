import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import HomePage from "../../../src/pages/Home/HomePage";
import LeaderboardPage from "../../../src/pages/Leaderboard/LeaderboardPage";
import { QuizPage } from "../../../src/pages/Quiz/QuizPage";

// The footer banner fetches a tip on mount, so stub the service everywhere.
vi.mock("../../../src/services/lootips", () => ({
  getLootip: vi.fn().mockResolvedValue({ looTip: { lootip: "Test tip" } }),
}));

// QuizPage loads questions on mount.
vi.mock("../../../src/services/quiz", () => ({
  getQuiz: vi.fn().mockResolvedValue([
    {
      question: "Test question?",
      correct_answer: "A",
      incorrect_answers: ["B", "C", "D"],
    },
  ]),
}));

const renderWithRouter = (ui) =>
  render(
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      {ui}
    </BrowserRouter>,
  );

describe("Loo tip footer banner placement", () => {
  test("shows on the home page", () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByTestId("lootip-banner")).toBeTruthy();
  });

  test("shows on the leaderboard page", () => {
    renderWithRouter(<LeaderboardPage />);
    expect(screen.getByTestId("lootip-banner")).toBeTruthy();
  });

  test("does NOT show on the quiz questions page", async () => {
    renderWithRouter(<QuizPage />);
    // Wait for the questions to load before asserting the banner is absent.
    await screen.findByText("Test question?");
    expect(screen.queryByTestId("lootip-banner")).toBeNull();
  });
});
