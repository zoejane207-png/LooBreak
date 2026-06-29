const Icebreaker = require("../models/icebreaker");

async function getAllIcebreaker(req, res) {
  const iceBreaker = await Icebreaker.find({});
  res.status(200).json({ iceBreaker: iceBreaker });
}

async function getOneRandomIcebreaker(req, res) {
  const result = await Icebreaker.aggregate([{ $sample: { size: 1 } }]); //Mongoose specific syntax to get random sample regardless of data size.
  res.status(200).json({ iceBreaker: result[0] }); //have to send back element since sample sends back array.
}

const IcebreakerController = {
  getAllIcebreaker: getAllIcebreaker,
  getOneRandomIcebreaker: getOneRandomIcebreaker,
};

module.exports = IcebreakerController;
