import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi, test } from "vitest";
import { getQuiz } from "../../../src/services/quiz";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createFetchMock(vi).enableMocks();

describe("Quiz API Service", () => {
  test("getQuiz returns quiz data", async () => {
    const mockQuiz = [
      {
        question: "Test?",
        correct_answer: "Yes",
        incorrect_answers: ["No"],
      },
    ];

    fetch.mockResponseOnce(JSON.stringify({ quiz: mockQuiz }), { status: 200 });
    const result = await getQuiz();
    expect(result).toEqual(mockQuiz);
  });

  test("does not resolve with data when backend returns an error payload", async () => {
    await expect(getQuiz()).rejects.toThrow(
      "Unable to fetch quiz",
    );
  });
});
