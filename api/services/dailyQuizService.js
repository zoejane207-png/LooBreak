const Quiz = require("../models/quiz");
const { fetchExternalQuiz } = require("./externalQuizApi"); //need to work on

async function populateTodaysQuiz() {
    //First delete all existing quiz data from previous day
    Quiz.deleteMany({});
    const data = await fetchExternalQuiz();
    const question = data.results[0].correct_answer;
    console.log(today)
    await Quiz.insertMany(
        { question: question },
        { correct_answer: correct_answer },
        { incorrect_answers: incorrect_answers },
    );
}
module.exports = { populateTodaysQuiz }; //await the ticket to test

