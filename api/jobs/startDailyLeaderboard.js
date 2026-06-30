const cron = require("node-cron");
const { resetTodaysLeaderboard } = require("../services/dailyLeaderboardService");

function startDailyLeaderboard() {
  // Initial run
  resetTodaysLeaderboard().catch((e) => {
    console.error("initial run failed:", e.message);
  });

  // Scheduled job
  cron.schedule(
    "15 * * * *",
    async () => {
      try {
        await resetTodaysLeaderboard();
        console.log("Daily leaderboard reset completed");
      } catch (err) {
        console.error("Daily leaderboard reset failed:", err.message);
      }
    },
    { timezone: "Europe/London" }
  );
}

module.exports = { startDailyLeaderboard };