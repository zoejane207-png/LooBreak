import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LeaderboardPage from "../../../src/pages/Leaderboard/LeaderboardPage";

describe("Leaderboard Page", () => {
  beforeEach(() => {
    // We need the Browser Router so that the Link elements load correctly
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <LeaderboardPage />
      </BrowserRouter>,
    );
  });

  test("It displays the title", () => {
    const heading = screen.getByRole("heading", { name: "Leaderboard" });
    expect(heading).toBeInTheDocument();
  });

  test("displays navbar", () => {
    const navBar = screen.getByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });
});
