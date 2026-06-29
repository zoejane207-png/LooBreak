const Quiz = require("../models/quiz");

async function getQuiz(req, res) {
  const quiz = await Quiz.find();
  res.status(200).json({ quiz: quiz });
}

const QuizController = {
  getQuiz: getQuiz,
};

module.exports = QuizController;
