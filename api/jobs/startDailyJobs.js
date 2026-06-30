const cron = require("node-cron");

const { populateTodaysQuiz } = require("../services/dailyQuizService");
// const { populateTodaysLooTip } = require("../services/dailyLooTipService");
// const {
//   populateTodaysIcebreaker,
// } = require("../services/dailyIcebreakerService");

function startDailyJobs() {
  populateTodaysQuiz().catch((e) =>
    console.error("initial run failed:", e.message),
  );
  cron.schedule(
    "15 * * * *", // currently changed to refresh each 15 mins, can change back to 1 0 * * *
    async () => {
      try {
        await Promise.all([
          populateTodaysQuiz(),
          //   populateTodaysLooTip(),
          //   populateTodaysIcebreaker(),
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
