const cron = require("node-cron");

const { populateTodaysQuiz } = require("../services/dailyQuizService");
const { populateTodaysLooTip } = require("../services/dailyLooTipService");
const {
  populateTodaysIcebreaker,
} = require("../services/dailyIcebreakerService");

function startDailyJobs() {
  cron.schedule(
    "1 0 * * *",
    async () => {
      try {
        await Promise.all([
          populateTodaysQuiz(),
          populateTodaysLooTips(),
          populateTodaysIcebreaker(),
        ]);
        console.log("Daily jobs completed");
      } catch (err) {
        console.error("Daily jobs failed:", err.message);
      }
    },
    { timezone: "Europe/London" },
  );
}
module.exports = { startDailyJobs };
