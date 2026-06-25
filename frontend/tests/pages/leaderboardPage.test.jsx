import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LeaderboardPage from "../../src/pages/Leaderboard/LeaderboardPage";

describe("Leaderboard Page", () => {
  test("It displays the title", () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <LeaderboardPage />
      </BrowserRouter>,
    );

    const heading = screen.getByRole("heading", { name: "Leaderboard" });
    expect(heading).toBeInTheDocument();
  });

  test("displays navbar", () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <LeaderboardPage />
      </BrowserRouter>,
    );

    const navBar = screen.getByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });
});
