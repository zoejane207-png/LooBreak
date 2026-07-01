const express = require("express");
const PlayersController = require("../controllers/players");
const router = express.Router();
const { tokenChecker } = require("../middleware/tokenChecker");

router.get("/", PlayersController.getAllPlayers);
router.post("/", PlayersController.createPlayer);
router.get("/me", tokenChecker, PlayersController.getPlayer);

module.exports = router;
