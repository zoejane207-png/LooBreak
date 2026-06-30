const express = require("express");
const PlayersController = require("../controllers/Players");
const router = express.Router();
const { tokenChecker } = require("../middleware/tokenChecker");

router.get("/", PlayersController.getAllPlayers);
router.post("/", PlayersController.createPlayer);
router.get("/me", tokenChecker, PlayersController.getPlayer);

module.exports = router;
