async function fetchExternalQuiz() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple",
  );
  if (!res.ok) throw new Error(`Response status: ${res.status}`);
  return res.json();
}

// Detect whether a single question's incorrect_answers contain duplicates.
// A duplicate is an incorrect answer that appears more than once, or one that
// matches the correct answer (which would leave the question with no real
// distractor for that option).
function hasDuplicateIncorrectAnswers(question) {
  const incorrectAnswers = question?.incorrect_answers;

  // Nothing to check if there is no list of incorrect answers.
  if (!Array.isArray(incorrectAnswers)) {
    return false;
  }

  // The correct answer counts as "already used", so an incorrect answer that
  // repeats it is treated as a duplicate.
  const usedAnswers = [question.correct_answer];

  for (const answer of incorrectAnswers) {
    const isDuplicate = usedAnswers.includes(answer);
    if (isDuplicate) {
      return true;
    }
    usedAnswers.push(answer);
  }

  // We got through every answer without seeing a repeat.
  return false;
}

// Scan an external quiz API response and return the questions whose
// incorrect_answers contain duplicates.
function findQuestionsWithDuplicateIncorrectAnswers(data) {
  const results = data?.results;
  if (!Array.isArray(results)) return [];
  return results.filter(hasDuplicateIncorrectAnswers);
}

// Fetch a quiz from the external API, but if any question comes back with
// duplicate incorrect answers, throw the whole set away and request a fresh
// set of 10. We retry up to maxAttempts times before giving up, so a
// persistently broken API can't make us loop forever.
async function fetchExternalQuizWithoutDuplicates(maxAttempts = 5) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const data = await fetchExternalQuiz();
    const badQuestions = findQuestionsWithDuplicateIncorrectAnswers(data);

    if (badQuestions.length === 0) {
      return data;
    }
  }

  throw new Error(
    `Could not fetch a quiz without duplicate answers after ${maxAttempts} attempts`,
  );
}

module.exports = {
  fetchExternalQuiz,
  hasDuplicateIncorrectAnswers,
  findQuestionsWithDuplicateIncorrectAnswers,
  fetchExternalQuizWithoutDuplicates,
};
