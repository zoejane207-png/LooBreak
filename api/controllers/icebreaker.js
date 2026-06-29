const Icebreaker = require("../models/icebreaker");

async function getAllIcebreaker(req, res) {
  try {
    const iceBreakers = await Icebreaker.find({});
    if (iceBreakers.length === 0) return res.status(404).json({ error: "No icebreakers found" });
    res.status(200).json({ iceBreakers: iceBreakers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch icebreakers" });
  }

}

async function getOneRandomIcebreaker(req, res) {
  try {
    const result = await Icebreaker.aggregate([{ $sample: { size: 1 } }]);  //Mongoose specific syntax to get random sample regardless of data size.
    if (result.length === 0) return res.status(404).json({ error: "No icebreakers found" });
    res.status(200).json({ iceBreaker: result[0] }); //have to send back element since sample sends back array.
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch a random icebreaker" });
  }

}

async function getRandomIcebreakers(req, res) {
  try {
    const result = await Icebreaker.aggregate([{ $sample: { size: 3 } }]);  
    if (result.length === 0) return res.status(404).json({ error: "No icebreakers found" });
    res.status(200).json({ iceBreakers: result }); 
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch random icebreakers" });
  }

}

const IcebreakerController = {
  getAllIcebreaker: getAllIcebreaker,
  getOneRandomIcebreaker: getOneRandomIcebreaker,
  getRandomIcebreakers: getRandomIcebreakers,
};

module.exports = IcebreakerController;
