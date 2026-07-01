import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import MiniLeaderboard from "../../../src/components/MiniLeaderBoard";
import { getPlayers } from "../../../src/services/results";

vi.mock("../../../src/services/results");

describe("MiniLeaderBoard", () => {
  const mockPlayersData = {
    players: [
      { _id: "1", playername: "Alice", score: 10 },
      { _id: "2", playername: "Bob", score: 8 },
      { _id: "3", playername: "Charlie", score: 7 },
      { _id: "4", playername: "Dave", score: 5 }, // Now position 3, won't display
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getPlayers).mockResolvedValue(mockPlayersData); // Default mock
  });

  test("shows skeleton rows before data resolves", () => {
    getPlayers.mockReturnValueOnce(new Promise(() => {}));
    render(<MiniLeaderboard />);
    expect(
      screen.getAllByTestId("mini-leaderboard-skeleton-row").length,
    ).toBeGreaterThan(0);
  });
  
  test("displays the players in a table", async () => {
    render(<MiniLeaderboard />);
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("displays player and score headers in a table", async () => {
    render(<MiniLeaderboard />);

    await waitFor(() => {
      const playerTitle = screen.getByRole("columnheader", { name: "Player" });
      const playerScore = screen.getByRole("columnheader", { name: "Score" });

      expect(playerTitle).toBeInTheDocument();
      expect(playerScore).toBeInTheDocument();
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  test("displays top 3 players of the day and their scores", async () => {
    render(<MiniLeaderboard />);

    await waitFor(() => {
      expect(screen.getByText(/Alice/i)).toBeInTheDocument();
      expect(screen.getByText(/Bob/i)).toBeInTheDocument();
      expect(screen.getByText(/Charlie/i)).toBeInTheDocument();
      expect(screen.queryByText(/Dave/i)).not.toBeInTheDocument();
    });
  });

  test("displays medals with each name", async () => {
      render(<MiniLeaderboard />);
      await screen.findByText(/alice/i);
      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(4);
      expect(rows[1]).toHaveTextContent("🥇");
      expect(rows[2]).toHaveTextContent("🥈");
      expect(rows[3]).toHaveTextContent("🥉");
    });

  test("shows an error message if players fail to load", async () => {
      getPlayers.mockRejectedValueOnce(new Error("Network error"));
      render(<MiniLeaderboard />);
      expect(await screen.findByText(/network error/i)).toBeInTheDocument();
    });
});
