const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const TipSchema = new mongoose.Schema({
  tip: String
});

// We use the Schema to create the tip model. Models are classes which we can
// use to construct entries in our Database.
const Tip = mongoose.model("tip", TipSchema);


module.exports = Tip;
