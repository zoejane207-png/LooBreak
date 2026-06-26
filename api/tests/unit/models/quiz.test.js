require("../../mongodb_helper");
const Quiz = require("../../../models/quiz");

describe("Quiz model", () => {
  beforeEach(async () => {
    await Quiz.deleteMany({});
  });
  it("has a question", () => {
    const quiz = new Quiz({
      question: "Test question?",
      correct_answer: "Test correct answer",
      incorrect_answers: ["Test", "incorrect", "answers"],
    });
    expect(quiz.question).toEqual("Test question?");
  });
  it("has a correct answer", () => {
    const quiz = new Quiz({
      question: "Test question?",
      correct_answer: "Test correct answer",
      incorrect_answers: ["Test", "incorrect", "answers"],
    });
    expect(quiz.correct_answer).toEqual("Test correct answer");
  });
  it("has incorrect answers", () => {
    const quiz = new Quiz({
      question: "Test question?",
      correct_answer: "Test correct answer",
      incorrect_answers: ["Test", "incorrect", "answers"],
    });
    expect(quiz.incorrect_answers).toEqual(["Test", "incorrect", "answers"]);
  });
  it("can save and retrieve a quiz", async () => {
    const quiz = new Quiz({
      question: "Test question?",
      correct_answer: "Test correct answer",
      incorrect_answers: ["Test", "incorrect", "answers"],
    });

    await quiz.save();

    const quizzes = await Quiz.find();

    expect(quizzes.length).toEqual(1);
    expect(quizzes[0].question).toEqual("Test question?");
  });
});
