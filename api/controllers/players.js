const Player = require("../models/player");

function create(req, res) {
  const playername = req.body.playername;
  const score = req.body.score;
  const player = new Player({ playername, score });

  if (!playername || player.playername.trim().length < 3)
    return res.status(400).json({ message: "Must insert playername with no less than 3 characters" });
  

  player
    .save()
    .then((player) => {
      console.log("player created, id:", player._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
}

const PlayersController = {
  create: create,
};

module.exports = PlayersController;
