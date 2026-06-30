import { describe, expect, vi, test } from "vitest";
import { getQuiz } from "../../../src/services/quiz";

describe("Quiz API Service integration", () => {
  test("HTML entities in the data should be decoded", async () => {
    const mockQuiz = {
      quiz: [
        {
          question: "What&#39;s Shakespeare&#39;s most famous play?",
          correct_answer: "Hamlet",
          incorrect_answers: ["Romeo &amp; Juliet", "Macbeth&#39;s tragedy"],
        },
        {
          question: "Which element&#39;s symbol is &quot;Au&quot;?",
          correct_answer: "Gold",
          incorrect_answers: ["Silver &amp; Bronze", "Copper&#39;s metal"],
        },
        {
          question: "What&#39;s the name of the famous music duo?",
          correct_answer: "Simon &amp; Garfunkel",
          incorrect_answers: [
            "The Beatles &amp; Queen",
            "Lennon&#39;s partner",
          ],
        },
      ],
    };

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockQuiz),
      }),
    );

    const result = await getQuiz();

    expect(result[0].question).toBe("What's Shakespeare's most famous play?");
    expect(result[1].question).toBe('Which element\'s symbol is "Au"?');
    expect(result[0].question).not.toContain("&#39;");
    expect(result[1].question).not.toContain("&quot;");
    expect(result[1].incorrect_answers).toStrictEqual([
      "Silver & Bronze",
      "Copper's metal",
    ]);
    expect(result[1].incorrect_answers).not.toContain("amp;");
    expect(result[2].correct_answer).toBe("Simon & Garfunkel");
    expect(result[2].correct_answer).not.toContain("amp;");
  });

  test("Other encoding types are not resolved in the returned data", async () => {
    const mockQuiz = {
      quiz: [
        {
          question: "What\u0027s the name of the famous music duo\u003F", //base64 encoding
          correct_answer: "Simon \u0026 Garfunkel",
          incorrect_answers: [
            "The Beatles \u0026 Queen",
            "Lennon\u0027s partner",
          ],
        },
        {
          question:
            "What%27s%20the%20name%20of%20the%20famous%20music%20duo%3F", // URL encoding
          correct_answer: "Simon%20%26%20Garfunkel",
          incorrect_answers: [
            "The%20Beatles%20%26%20Queen",
            "Lennon%27s%20partner",
          ],
        },
        {
          question: "V2hhdCdzIHRoZSBuYW1lIG9mIHRoZSBmYW1vdXMgbXVzaWMgZHVvPw==", // Unicode escape sequences
          correct_answer: "U2ltb24gJiBHYXJmdW5rZWw=",
          incorrect_answers: [
            "VGhlIEJlYXRsZXMgJiBRdWVlbg==",
            "TGVubm9uJ3MgcGFydG5lcg==",
          ],
        },
      ],
    };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockQuiz),
      }),
    );

    const result = await getQuiz();

    expect(result[0].question).toBe(
      "What\u0027s the name of the famous music duo\u003F",
    );
    expect(result[1].question).toBe(
      "What%27s%20the%20name%20of%20the%20famous%20music%20duo%3F",
    );
    expect(result[2].question).toBe(
      "V2hhdCdzIHRoZSBuYW1lIG9mIHRoZSBmYW1vdXMgbXVzaWMgZHVvPw==",
    );

    expect(result[0].correct_answer).toBe("Simon \u0026 Garfunkel");
    expect(result[1].correct_answer).toBe("Simon%20%26%20Garfunkel");
    expect(result[2].correct_answer).toBe("U2ltb24gJiBHYXJmdW5rZWw=");

    expect(result[0].incorrect_answers).toStrictEqual([
      "The Beatles \u0026 Queen",
      "Lennon\u0027s partner",
    ]);
    expect(result[1].incorrect_answers).toStrictEqual([
      "The%20Beatles%20%26%20Queen",
      "Lennon%27s%20partner",
    ]);
    expect(result[2].incorrect_answers).toStrictEqual([
      "VGhlIEJlYXRsZXMgJiBRdWVlbg==",
      "TGVubm9uJ3MgcGFydG5lcg==",
    ]);
  });
});
