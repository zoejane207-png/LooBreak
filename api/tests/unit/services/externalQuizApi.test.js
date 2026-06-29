const {
  fetchExternalQuiz,
  hasDuplicateIncorrectAnswers,
  findQuestionsWithDuplicateIncorrectAnswers,
  fetchExternalQuizWithoutDuplicates,
} = require("../../../services/externalQuizApi.js");

// Build a fake API response. Pass true to make the first question contain a
// duplicate incorrect answer.
function buildResponse({ withDuplicate }) {
  const incorrect_answers = withDuplicate
    ? ['B', 'B', 'D']
    : ['B', 'C', 'D'];
  return {
    ok: true,
    status: 200,
    json: async () => ({
      response_code: 0,
      results: [
        { question: 'Q?', correct_answer: 'A', incorrect_answers },
      ],
    }),
  };
}

describe('externalQuizApi mocked data', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns parsed quiz data when the response is ok', async () => {
    const mockData = {
      response_code: 0,
      results: [
        {
          category: 'Entertainment: Music',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Sample question?',
          correct_answer: 'A',
          incorrect_answers: ['B', 'C', 'D'],
        },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const quizData = await fetchExternalQuiz();  // this does not actually call the url

    expect(Array.isArray(quizData.results)).toBe(true);
    expect(quizData.results.length).toBeGreaterThan(0);
    expect(quizData.results[0]).toHaveProperty('question');
  });

  it('throws an error when the response is not ok', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
    });

    await expect(fetchExternalQuiz()).rejects.toThrow('Response status: 429');
  });
});

describe('hasDuplicateIncorrectAnswers', () => {
  it('returns false when all incorrect answers are unique', () => {
    const question = {
      correct_answer: 'A',
      incorrect_answers: ['B', 'C', 'D'],
    };
    expect(hasDuplicateIncorrectAnswers(question)).toBe(false);
  });

  it('returns true when an incorrect answer is repeated', () => {
    const question = {
      correct_answer: 'A',
      incorrect_answers: ['B', 'C', 'B'],
    };
    expect(hasDuplicateIncorrectAnswers(question)).toBe(true);
  });

  it('returns true when an incorrect answer matches the correct answer', () => {
    const question = {
      correct_answer: 'A',
      incorrect_answers: ['A', 'C', 'D'],
    };
    expect(hasDuplicateIncorrectAnswers(question)).toBe(true);
  });

  it('returns false when incorrect_answers is missing or not an array', () => {
    expect(hasDuplicateIncorrectAnswers({ correct_answer: 'A' })).toBe(false);
    expect(hasDuplicateIncorrectAnswers({})).toBe(false);
    expect(hasDuplicateIncorrectAnswers(null)).toBe(false);
  });
});

describe('findQuestionsWithDuplicateIncorrectAnswers', () => {
  it('returns only the questions that contain duplicates', () => {
    const data = {
      results: [
        { correct_answer: 'A', incorrect_answers: ['B', 'C', 'D'] },
        { correct_answer: 'A', incorrect_answers: ['B', 'B', 'D'] },
        { correct_answer: 'A', incorrect_answers: ['A', 'C', 'D'] },
      ],
    };
    const flagged = findQuestionsWithDuplicateIncorrectAnswers(data);
    expect(flagged).toHaveLength(2);
    expect(flagged).toEqual([data.results[1], data.results[2]]);
  });

  it('returns an empty array when results is missing or not an array', () => {
    expect(findQuestionsWithDuplicateIncorrectAnswers({})).toEqual([]);
    expect(findQuestionsWithDuplicateIncorrectAnswers(null)).toEqual([]);
  });
});

describe('fetchExternalQuizWithoutDuplicates', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns the data on the first try when there are no duplicates', async () => {
    global.fetch.mockResolvedValueOnce(buildResponse({ withDuplicate: false }));

    const data = await fetchExternalQuizWithoutDuplicates();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(data.results).toHaveLength(1);
  });

  it('re-requests a fresh set when the first response has duplicates', async () => {
    global.fetch
      .mockResolvedValueOnce(buildResponse({ withDuplicate: true }))
      .mockResolvedValueOnce(buildResponse({ withDuplicate: false }));

    const data = await fetchExternalQuizWithoutDuplicates();

    expect(global.fetch).toHaveBeenCalledTimes(2);   // retried once
    expect(findQuestionsWithDuplicateIncorrectAnswers(data)).toEqual([]);
  });

  it('throws after maxAttempts if every response has duplicates', async () => {
    global.fetch.mockResolvedValue(buildResponse({ withDuplicate: true }));

    await expect(fetchExternalQuizWithoutDuplicates(3)).rejects.toThrow(
      'Could not fetch a quiz without duplicate answers after 3 attempts',
    );
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });
});