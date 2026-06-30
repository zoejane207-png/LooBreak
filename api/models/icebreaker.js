const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const IcebreakerSchema = new mongoose.Schema({
  icebreaker: {
    type: String,
    required: true,
  },
});

// We use the Schema to create the Icebreaker model. Models are classes which we can
// use to construct entries in our Database.
const Icebreaker = mongoose.model("Icebreaker", IcebreakerSchema);

module.exports = Icebreaker;
