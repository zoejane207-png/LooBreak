import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Leaderboard from "../../../src/components/Leaderboard";
import { getPlayers } from "../../../src/services/results";

vi.mock("../../../src/services/results", () => ({
  getPlayers: vi.fn(),
}));

const mockPlayersData = {
  players: [
    { _id: "1", playername: "Alice", score: 10 },
    { _id: "2", playername: "Bob", score: 8 },
    { _id: "3", playername: "Charlie", score: 7 },
    { _id: "4", playername: "Dave", score: 5 },
  ],
};

describe("Leaderboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getPlayers).mockResolvedValue(mockPlayersData);
  });

  test("shows skeleton rows before data resolves", () => {
    getPlayers.mockReturnValueOnce(new Promise(() => {}));
    render(<Leaderboard />);
    expect(
      screen.getAllByTestId("leaderboard-skeleton-row").length,
    ).toBeGreaterThan(0);
  });

  test("displays the players in a table", async () => {
    render(<Leaderboard />);
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("displays player and score headers in a table", async () => {
    render(<Leaderboard />);

    await waitFor(() => {
      const playerRank = screen.getByRole("columnheader", { name: "Rank" });
      const playerTitle = screen.getByRole("columnheader", { name: "Player" });
      const playerScore = screen.getByRole("columnheader", { name: "Score" });

      expect(playerRank).toBeInTheDocument();
      expect(playerTitle).toBeInTheDocument();
      expect(playerScore).toBeInTheDocument();
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  test("displays all players of the day and their scores", async () => {
    render(<Leaderboard />);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(5);
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.getByText("Charlie")).toBeInTheDocument();
      expect(screen.getByText("Dave")).toBeInTheDocument();
    });
  });

  test("displays medals for top 3 and a rank number for the rest", async () => {
    render(<Leaderboard />);
    await screen.findByText("Alice");
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(5);
    expect(rows[1]).toHaveTextContent("🥇");
    expect(rows[2]).toHaveTextContent("🥈");
    expect(rows[3]).toHaveTextContent("🥉");
    expect(rows[4]).toHaveTextContent("4");
    expect(rows[4]).not.toHaveTextContent("🥇");
  });

  test("shows an error message if players fail to load", async () => {
    getPlayers.mockRejectedValueOnce(new Error("Network error"));
    render(<Leaderboard />);
    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });
});
