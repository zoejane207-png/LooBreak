const { resetTodaysLeaderboard } = require("../../../services/dailyLeaderboardService");
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

});
