import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../../../src/pages/Home/HomePage";
import { getToken, removeToken } from "../../../src/services/auth";
import { getMyScore } from "../../../src/services/results";
import { getQuiz } from "../../../src/services/quiz";
import { expect, vi, beforeEach } from "vitest";

vi.mock("../../../src/services/auth", () => ({
  getToken: vi.fn(),
  removeToken: vi.fn(),
}));

vi.mock("../../../src/services/results", () => ({
  getMyScore: vi.fn(),
}));

vi.mock("../../../src/services/quiz", () => ({
  getQuiz: vi.fn(),
}));

function renderHomePage() {
  render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <HomePage />
    </MemoryRouter>,
  );
}

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getToken.mockReturnValue(null); // default: logged out, unless a test overrides it
    getQuiz.mockResolvedValue([]);
  });

  test("welcomes you to the site", () => {
    renderHomePage();
    const heading = screen.getByRole("heading", {
      name: "Welcome to LooBreak!",
    });
    expect(heading).toBeInTheDocument();
  });

  test("displays navbar", () => {
    renderHomePage();
    const navBar = screen.getByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });

  test("displays a quiz link", () => {
    renderHomePage();
    const quizLinks = screen.getAllByRole("link", { name: /quiz/i });
    expect(quizLinks[1].getAttribute("href")).toEqual("/quiz");
  });

  test("displays the icebreaker component", () => {
    renderHomePage();
    expect(screen.getByTestId("icebreaker-component")).toBeInTheDocument();
  });

  test("displays a leaderboard link", () => {
    renderHomePage();
    const leaderboardLinks = screen.getAllByRole("link", {
      name: /leaderboard/i,
    });
    expect(leaderboardLinks[1].getAttribute("href")).toEqual("/leaderboard");
  });

  test("removes token and hides score badge when getMyScore fails", async () => {
    getToken.mockReturnValue("stale-token");
    getMyScore.mockRejectedValueOnce(new Error("unauthorized"));

    renderHomePage();

    await waitFor(() => {
      expect(removeToken).toHaveBeenCalled();
    });
    expect(screen.queryByTestId("score-badge")).not.toBeInTheDocument();
  });

  test("shows score badge when a valid token returns score data", async () => {
    getToken.mockReturnValue("valid-token");
    getMyScore.mockResolvedValueOnce({ playername: "chris1", score: 5 });

    renderHomePage();

    expect(await screen.findByTestId("score-badge")).toBeInTheDocument();
  });
});