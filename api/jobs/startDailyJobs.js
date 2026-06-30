const cron = require("node-cron");
const Player = require("../models/player");
const { populateTodaysQuiz } = require("../services/dailyQuizService");

async function resetAllTokens() {
  await Player.updateMany({}, { $inc: { tokenVersion: 1 } });
}

function startDailyJobs() {
  populateTodaysQuiz().catch((e) =>
    console.error("initial run failed:", e.message),
  );

  cron.schedule(
    "15 * * * *", // currently changed to refresh each 15 mins, can change back to 1 0 * * *
    async () => {
      const results = await Promise.allSettled([
        populateTodaysQuiz(),
        resetAllTokens(),
      ]);

      results.forEach((result, i) => {
        const jobName = ["populateTodaysQuiz", "resetAllTokens"][i];
        if (result.status === "rejected") {
          console.error(`${jobName} failed:`, result.reason.message);
        }
      });

      console.log("Daily jobs completed");
    },
    { timezone: "Europe/London" },
  );
}

module.exports = { startDailyJobs, resetAllTokens };
