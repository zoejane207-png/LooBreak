import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LeaderboardPage from "../../src/pages/Leaderboard/LeaderboardPage";

describe("Leaderboard Page", () => {
  test("It displays the title", () => {
    render(
      <BrowserRouter>
        <LeaderboardPage />
      </BrowserRouter>
    );

    const heading = screen.getByRole("heading", { name: "Leaderboard" });
    expect(heading).toBeInTheDocument();
  });
});