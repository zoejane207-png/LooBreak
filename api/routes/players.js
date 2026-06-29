const express = require("express");

const PlayersController = require("../controllers/players");

const router = express.Router();

router.post("/", PlayersController.create);

module.exports = router;
