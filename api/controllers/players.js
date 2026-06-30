const e = require("express");
const Player = require("../models/player");
const JWT = require("jsonwebtoken");

function generateToken(player) {
  return JWT.sign(
    { sub: player._id.toString(), tokenVersion: player.tokenVersion },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
}

async function createPlayer(req, res) {
  try {
    const playername = req.body.playername?.trim();
    const score = req.body.score;

    if (!playername) {
      return res.status(400).json({ message: "Playername is required" });
    }

    const existingPlayer = await Player.findOne({ playername });
    if (existingPlayer) {
      return res.status(400).json({ message: "Playername already exists" });
    }

    const player = new Player({ playername, score });
    const savedPlayer = await player.save();

    const token = generateToken(savedPlayer);
    res.status(201).json({ message: "OK", token, player: savedPlayer });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong" });
  }
}

async function getPlayer(req, res) {
  try {
    const player = await Player.findById(req.player_id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    const token = generateToken(player);
    res
      .status(200)
      .json({ playername: player.playername, score: player.score, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
}

const PlayersController = {
  createPlayer: createPlayer,
  getPlayer: getPlayer,
};

module.exports = PlayersController;
