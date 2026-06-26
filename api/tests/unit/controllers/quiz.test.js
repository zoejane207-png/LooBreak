const request = require("supertest");

const app = require("../../../app");
const Quiz = require("../../../models/quiz");

require("../../mongodb_helper");

describe("/quiz", () => {
  beforeEach(async () => {
    await Quiz.deleteMany({});
  });

  describe("GET /quiz", () => {
    test("returns every quiz in the collection", async () => {
      const quiz1 = new Quiz({
        question: "Test question?",
        correct_answer: "Test correct answer",
        incorrect_answers: ["Test", "incorrect", "answers"],
      });
      const quiz2 = new Quiz({
        question: "Another question?",
        correct_answer: "Another correct answer",
        incorrect_answers: ["More", "incorrect", "answers"],
      });

      await quiz1.save();
      await quiz2.save();

      const response = await request(app).get("/quiz");

      const quizzes = await Quiz.find();
      expect(quizzes.length).toEqual(2);
      expect(quizzes[0].question).toEqual("Test question?");
      expect(quizzes[1].question).toEqual("Another question?");
    });
  });
});
