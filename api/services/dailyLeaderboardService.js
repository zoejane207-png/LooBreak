const Player = require("../models/player");

async function resetTodaysLeaderboard() {
  // delete previous day's data
  await Player.deleteMany({});
}

module.exports = { resetTodaysLeaderboard };