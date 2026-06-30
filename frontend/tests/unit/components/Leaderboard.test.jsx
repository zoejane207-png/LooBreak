import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Leaderboard from "../../../src/components/Leaderboard";
import { getPlayers } from "../../../src/services/results";

vi.mock("../../../src/services/results", () => ({
  getPlayers: vi.fn(),
}));

describe("Leaderboard", () => {
  beforeEach(() => {
    getPlayers.mockResolvedValueOnce(
      {
        playername: "player1",
        score: "3",
      },
      {
        playername: "player2",
        score: "6",
      },
      {
        playername: "player3",
        score: "9",
      },
      {
        playername: "player4",
        score: "2",
      },
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("displays the players in a table", async () => {
    render(<Leaderboard />);
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("shows loading state before data resolves", () => {
    render(<Leaderboard />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
