const {
  resetTodaysLeaderboard,
} = require("../../../services/dailyLeaderboardService");
const Player = require("../../../models/player");

jest.mock("../../../models/player");

describe("resetTodaysLeaderboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("players collection deletes all player documents", async () => {
    jest.mocked(Player.deleteMany).mockResolvedValue({ deletedCount: 5 });

    await resetTodaysLeaderboard();

    expect(Player.deleteMany).toHaveBeenCalledWith({});
    expect(Player.deleteMany).toHaveBeenCalledTimes(1);
  });

  test("service successfully runs even without players in the db", async () => {
    jest.mocked(Player.deleteMany).mockResolvedValue({ deletedCount: 0 });

    await resetTodaysLeaderboard();

    expect(Player.deleteMany).toHaveBeenCalled();
    expect(Player.deleteMany).toHaveBeenCalledTimes(1);
  });

  test("throws error message when deletion fails", async () => {
    Player.deleteMany.mockRejectedValue(
      new Error("Database connection failed"),
    );
    await expect(resetTodaysLeaderboard()).rejects.toThrow(
      "Database connection failed",
    );
  });
});
