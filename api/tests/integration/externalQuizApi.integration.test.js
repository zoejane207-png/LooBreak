const {fetchExternalQuiz} = require("../../services/externalQuizApi.js");

describe ('externalQuizApi actual API', () => {
    it('responds with data in this structure', async () => {
        const quizData = await fetchExternalQuiz();

        expect(Array.isArray(quizData.results)).toBe(true);
        expect(quizData.results.length).toBeGreaterThan(0);
        expect(quizData.response_code).toBe(0);   
        const first = quizData.results[0];
        expect(first).toHaveProperty("question");
        expect(first).toHaveProperty("correct_answer");
        expect(first).toHaveProperty("incorrect_answers");
        expect(Array.isArray(first.incorrect_answers)).toBe(true);    
    });
});
