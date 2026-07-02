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

// Mirrors the validation in the front-end results form so the same rules are
// enforced on direct API calls (e.g. Postman) that bypass the form entirely.
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 12;
const MIN_SCORE = 0;
const MAX_SCORE = 10;

async function createPlayer(req, res) {
  try {
    const rawName = req.body.playername;
    const score = req.body.score;

    if (typeof rawName !== "string" || !rawName.trim()) {
      return res.status(400).json({ message: "Playername is required" });
    }

    const playername = rawName.trim();

    if (playername.length < MIN_NAME_LENGTH) {
      return res.status(400).json({
        message: `Playername must be at least ${MIN_NAME_LENGTH} characters long`,
      });
    }

    if (playername.length > MAX_NAME_LENGTH) {
      return res.status(400).json({
        message: `Playername must be at most ${MAX_NAME_LENGTH} characters long`,
      });
    }

    // Score is optional, but when supplied it must be a whole number within the
    // quiz's range — stops fabricated high scores being posted to the leaderboard.
    if (score !== undefined && score !== null) {
      if (
        typeof score !== "number" ||
        !Number.isInteger(score) ||
        score < MIN_SCORE ||
        score > MAX_SCORE
      ) {
        return res.status(400).json({
          message: `Score must be a whole number between ${MIN_SCORE} and ${MAX_SCORE}`,
        });
      }
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
