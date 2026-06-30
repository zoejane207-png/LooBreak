const Quiz = require("../models/quiz");
const { fetchExternalQuizWithoutDuplicates } = require("./externalQuizApi");

async function populateTodaysQuiz() {
  // Request a set of 10 questions first, re-requesting if the API sends
  // duplicates. We do this BEFORE touching the database so that if the fetch
  // fails (e.g. the API is down or keeps returning duplicates), we leave
  // yesterday's quiz in place instead of wiping it and ending up with nothing.
  const data = await fetchExternalQuizWithoutDuplicates();

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

  // Only now that we have good data, replace the previous day's quiz.
  await Quiz.deleteMany({});
  await Quiz.insertMany(docs);   // single array argument
}

module.exports = { populateTodaysQuiz };