const {fetchExternalQuiz} = require("../../../services/externalQuizApi.js");

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