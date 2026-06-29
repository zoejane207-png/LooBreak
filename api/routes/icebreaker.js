const express = require("express");
const router = express.Router();

const IceBreakerController = require("../controllers/icebreaker");

router.get("/random", IceBreakerController.getOneRandomIcebreaker);
router.get("/batch", IceBreakerController.getRandomIcebreakers);

module.exports = router;
