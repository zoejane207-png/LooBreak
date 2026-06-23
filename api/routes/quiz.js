const express = require("express");
const router = express.Router();

const QuizController = require("../controllers/quiz");

router.get("/", QuizController.getQuiz);
router.post("/", QuizController.createQuiz);

module.exports = router;
