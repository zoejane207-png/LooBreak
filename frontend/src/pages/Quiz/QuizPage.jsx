import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getQuiz } from "../../services/quiz";
// import Quiz from "../../components/Quiz";

export function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const currentQuestion = quiz[currentIndex];

  useEffect(() => {
    getQuiz().then((data) => {
      setQuiz(data);
    });
  }, []);

  function handleNextQuestion() {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === quiz.length - 1) {
      setFinished(true);
      //when results page is finished we can navigate to it here!
    }
  }

  if (!quiz.length) {
    return <h3>Loading questions...</h3>;
  }

  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ].sort();

  return (
    <>
      <h2>Quiz</h2>
      <h3>Question {currentIndex + 1}:</h3>
      <div className="feed" role="feed">
        <p>{currentQuestion.question}</p>
        <div>
          {answers.map((answer) => (
            <button key={answer}> {answer}</button>
          ))}
        </div>
        {!finished && <button onClick={handleNextQuestion}>→</button>}
      </div>
    </>
  );
}
