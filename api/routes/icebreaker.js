const express = require("express");
const router = express.Router();

const IceBreakerController = require("../controllers/icebreaker");

router.get("/", IceBreakerController.getOneRandomIcebreaker);

module.exports = router;
