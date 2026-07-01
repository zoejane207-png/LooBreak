const cron = require("node-cron");

const { populateTodaysQuiz } = require("../../../services/dailyQuizService");
const {
  resetTodaysLeaderboard,
} = require("../../../services/dailyLeaderboardService");
const { startDailyJobs } = require("../../../jobs/startDailyJobs");

jest.mock("node-cron", () => ({
  schedule: jest.fn(),
}));
jest.mock("../../../services/dailyQuizService", () => ({
  populateTodaysQuiz: jest.fn().mockResolvedValue(),
}));

jest.mock("../../../services/dailyLeaderboardService", () => ({  // Add this
  resetTodaysLeaderboard: jest.fn().mockResolvedValue(),
}));

describe("startDailyJobs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    startDailyJobs();
  });

  it("registers the job with the correct cron expression and timezone", () => {
    expect(cron.schedule).toHaveBeenCalledWith(
      "15 * * * *",
      expect.any(Function),
      { timezone: "Europe/London" },
    );
  });

  it("runs both daily services and logs success when they resolve", async () => {
    const callback = cron.schedule.mock.calls[0][1]; //need to understand this fully
    console.log("CALLBACK:", callback);
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await callback();

    expect(populateTodaysQuiz).toHaveBeenCalledTimes(2); // one for start up and one for CRON
    expect(resetTodaysLeaderboard).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("Daily jobs completed");
  });

  it("logs an error if quiz service rejects", async () => {
    populateTodaysQuiz.mockRejectedValueOnce(
      new Error("whatever the error message is"),
    );

    const callback = cron.schedule.mock.calls[0][1];
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await callback();

    expect(errorSpy).toHaveBeenCalledWith(
      "Daily jobs failed:",
      "whatever the error message is",
    );
  });

  it("logs an error if leaderboard service rejects", async () => {
    resetTodaysLeaderboard.mockRejectedValueOnce(
      new Error("whatever the error message is"),
    );

    const callback = cron.schedule.mock.calls[0][1];
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await callback();

    expect(errorSpy).toHaveBeenCalledWith(
      "Daily jobs failed:",
      "whatever the error message is",
    );
  });
});
