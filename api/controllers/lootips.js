const Lootip = require("../models/lootips");

async function getAllLootips(req, res) {
  const looTip = await Lootip.find({});
  res.status(200).json({ looTip: looTip });
}

async function getOneRandomLootip(req, res) {
  const result = await Lootip.aggregate([{ $sample: { size: 1 } }]);  //Mongoose specific syntax to get random sample regardless of data size.
  res.status(200).json({ looTip: result[0] }); //have to send back element since sample sends back array.
}

const LootipController = {
  getAllLootips: getAllLootips,
  getOneRandomLootip: getOneRandomLootip,
};

module.exports = LootipController;
