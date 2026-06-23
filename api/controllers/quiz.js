const Quiz = require("../models/quiz");
const { generateToken } = require("../lib/token");

async function getQuiz(req, res) {
  const quiz = await Quiz.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ quiz: quiz, token: token });
}

async function createQuiz(req, res) {
  const quiz = new Quiz(req.body);
  quiz.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Quiz created", token: newToken });
}

const QuizController = {
  getQuiz: getQuiz,
  createQuiz: createQuiz,
};

module.exports = QuizController;
