const Quiz = require("../models/quiz");

async function getQuiz(req, res) {
  const quiz = await Quiz.find();
  res.status(200).json({ quiz: quiz });
}

async function createQuiz(req, res) {
  const quiz = new Quiz(req.body);
  quiz.save();

  res.status(201).json({ message: "Quiz created" });
}

const QuizController = {
  getQuiz: getQuiz,
  createQuiz: createQuiz,
};

module.exports = QuizController;
