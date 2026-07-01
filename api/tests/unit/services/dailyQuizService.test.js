const { populateTodaysQuiz } = require("../../../services/dailyQuizService");
const {
  fetchExternalQuizWithoutDuplicates,
} = require("../../../services/externalQuizApi");
const Quiz = require("../../../models/quiz");

// replace the real dependencies with auto-mocks
jest.mock("../../../services/externalQuizApi");
jest.mock("../../../models/quiz");

// a fake API payload matching OpenTDB's shape
const fakeQuizData = {
  response_code: 0,
  results: [
    {
      question: "What is Tasmania?",
      correct_answer: "An Australian State",
      incorrect_answers: ["A flavor of ice-cream", "A disorder", "A cartoon"],
    },
    {
      question: "In which direction does the Sun rise?",
      correct_answer: "East",
      incorrect_answers: ["West", "North", "South"],
    },
  ],
};

describe("populateTodaysQuiz", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // reset call history between tests
    fetchExternalQuizWithoutDuplicates.mockResolvedValue(fakeQuizData);
    Quiz.deleteMany.mockResolvedValue({ deletedCount: 0 });
    Quiz.insertMany.mockResolvedValue([]);
  });

  it("clears the database before inserting new data", async () => {
    await populateTodaysQuiz();

    expect(Quiz.deleteMany).toHaveBeenCalledTimes(1);
    expect(Quiz.deleteMany).toHaveBeenCalledWith({}); // {} = delete all
  });

  it("inserts the fetched questions in the right shape", async () => {
    await populateTodaysQuiz();

    expect(Quiz.insertMany).toHaveBeenCalledTimes(1);
    expect(Quiz.insertMany).toHaveBeenCalledWith([
      {
        question: "What is Tasmania?",
        correct_answer: "An Australian State",
        incorrect_answers: ["A flavor of ice-cream", "A disorder", "A cartoon"],
      },
      {
        question: "In which direction does the Sun rise?",
        correct_answer: "East",
        incorrect_answers: ["West", "North", "South"],
      },
    ]);
  });

  it("deletes before it inserts (order matters)", async () => {
    const order = [];
    Quiz.deleteMany.mockImplementation(async () => {
      order.push("delete");
    });
    Quiz.insertMany.mockImplementation(async () => {
      order.push("insert");
    });

    await populateTodaysQuiz();

    expect(order).toEqual(["delete", "insert"]);
  });

  it("propagates an error if the fetch fails", async () => {
    fetchExternalQuizWithoutDuplicates.mockRejectedValue(new Error("API down"));

    await expect(populateTodaysQuiz()).rejects.toThrow("API down");
    expect(Quiz.insertMany).not.toHaveBeenCalled(); // never got to the insert
  });

  it("leaves the previous day's quiz untouched if the fetch fails", async () => {
    fetchExternalQuizWithoutDuplicates.mockRejectedValue(new Error("API down"));

    await expect(populateTodaysQuiz()).rejects.toThrow("API down");
    expect(Quiz.deleteMany).not.toHaveBeenCalled(); // old quiz not wiped
    expect(Quiz.insertMany).not.toHaveBeenCalled();
  });
});
