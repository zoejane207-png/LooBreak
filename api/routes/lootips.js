const express = require("express");
const router = express.Router();

const LootipController = require("../controllers/lootips");

router.get("/", LootipController.getOneRandomLootip);

module.exports = router;
