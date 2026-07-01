const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  playername: { type: String, required: true, unique: true },
  score: { type: Number },
  tokenVersion: { type: Number, default: 0 },
});

const Player = mongoose.model("player", PlayerSchema);

module.exports = Player;
