const e = require("express");
const Player = require("../models/player");
const JWT = require("jsonwebtoken");

async function createPlayer(req, res) {
  try {
    const playername = req.body.playername?.trim();
    const score = req.body.score;

    if (!playername) {
      return res.status(400).json({ message: "Playername is required" });
    }

    const existingPlayer = await Player.findOne({ playername });
    if (existingPlayer) {
      return res
        .status(400)
        .json({
          message: "Playername already exists. Playername must be unique.",
        });
    }

    const player = new Player({ playername, score });
    const savedPlayer = await player.save();

    const token = JWT.sign(
      { sub: savedPlayer._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
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
    res
      .status(200)
      .json({ playername: player.playername, score: player.score });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
}

async function getAllPlayers(req, res) {
  try {
    const players = await Player.find();
    if (players.length === 0) {
      return res.status(404).json({ message: "Players not found" });
    }
    res
      .status(200)
      .json({ players: players.sort((a, b) => b.score - a.score) });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong" });
  }
}

const PlayersController = {
  createPlayer: createPlayer,
  getPlayer: getPlayer,
  getAllPlayers: getAllPlayers,
};

module.exports = PlayersController;
