const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const LootipSchema = new mongoose.Schema({
  lootip: String,
});

// We use the Schema to create the Lootip model. Models are classes which we can
// use to construct entries in our Database.
const Lootip = mongoose.model("Lootip", LootipSchema);

module.exports = Lootip;
