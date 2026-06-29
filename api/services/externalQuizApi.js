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

// OpenTDB rate-limits each IP to one request every 5 seconds, so we wait this
// long between attempts to avoid being throttled.
const RATE_LIMIT_MS = 5000;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Fetch a quiz from the external API and return a set of 10 questions that has
// no duplicate answers. An attempt fails if either the request errors (network
// failure / non-OK response) or the response contains duplicate answers; in
// both cases we wait out the rate limit and request a fresh set. We retry up to
// maxAttempts times before giving up, so a persistently broken API can't make
// us loop forever.
async function fetchExternalQuizWithoutDuplicates(
  maxAttempts = 5,
  delayMs = RATE_LIMIT_MS,
) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    // Wait between attempts (but not before the first) so we don't exceed the
    // API's one-request-per-5-seconds limit.
    if (attempt > 1) {
      await delay(delayMs);
    }

    try {
      const data = await fetchExternalQuiz();
      const badQuestions = findQuestionsWithDuplicateIncorrectAnswers(data);

      if (badQuestions.length === 0) {
        return data;
      }

      lastError = new Error("response contained duplicate answers");
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(
    `Could not fetch a valid quiz after ${maxAttempts} attempts: ${lastError.message}`,
  );
}

module.exports = {
  fetchExternalQuiz,
  hasDuplicateIncorrectAnswers,
  findQuestionsWithDuplicateIncorrectAnswers,
  fetchExternalQuizWithoutDuplicates,
};
