const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  playername: { type: String, required: true, unique: true },
  score: { type: Number },
});

const Player = mongoose.model("player", PlayerSchema);

module.exports = Player;
