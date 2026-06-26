const e = require("express");
const Player = require("../models/player");
const JWT = require("jsonwebtoken");

function createPlayer(req, res) {
  const playername = req.body.playername;
  const score = req.body.score;
  const player = new Player({ playername, score });

  if (!playername || player.playername.trim().length < 3)
    return res
      .status(400)
      .json({
        message: "Must insert playername with no less than 3 characters",
      });

  player
    .save()
    .then((player) => {
      console.log("player created, id:", player._id.toString());
      const token = JWT.sign(
        { sub: player._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );
      res.status(201).json({ message: "OK", token, player });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
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

const PlayersController = {
  createPlayer: createPlayer,
  getPlayer: getPlayer,
};

module.exports = PlayersController;
