const Quiz = require("../models/quiz");
const { fetchExternalQuiz } = require("./externalQuizApi");

async function populateTodaysQuiz() {
  // delete previous day's data first
  await Quiz.deleteMany({});

  const data = await fetchExternalQuiz();

  // build the documents array with a for loop
  const docs = [];
  for (let i = 0; i < data.results.length; i++) {
    const q = data.results[i];
    docs.push({
      question: q.question,
      correct_answer: q.correct_answer,
      incorrect_answers: q.incorrect_answers,
    });
  }

  await Quiz.insertMany(docs); // single array argument
}

module.exports = { populateTodaysQuiz };
