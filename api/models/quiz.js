const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const QuizSchema = new mongoose.Schema({
  message: String,
});

// We use the Schema to create the Quiz model. Models are classes which we can
// use to construct entries in our Database.
const Quiz = mongoose.model("Quiz", QuizSchema);


module.exports = Quiz;
