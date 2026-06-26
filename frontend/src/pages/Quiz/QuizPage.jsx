import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getQuiz } from "../../services/quiz";
import NavBar from "../../components/NavBar";

export function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const currentQuestion = quiz[currentIndex];
  const [score, setScore] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    getQuiz().then((data) => {
      setQuiz(data);
    });
  }, []);

  function handleNextQuestion() {
    setIsSelected(false);
    setHasSubmitted(false);
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === quiz.length - 1) {
      setFinished(true);
      //when results page is finished we can navigate to it here!
    }
  }

  function handleAnswer(currentQuestion, answer) {
    setIsSelected(true);
    setPlayerAnswer(answer);
  }

  function handleSubmit() {
    setHasSubmitted(true);
    if (playerAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
      // turn button green
    } else {
      //turn button red
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
      <NavBar />
      <h2>Quiz</h2>
      <h3>Question {currentIndex + 1}:</h3>
      <p>Score: {score}/10</p>
      <div className="feed" role="feed">
        <p>{currentQuestion.question}</p>
        <div>
          {answers.map((answer) => (
            <button
              key={answer}
              onClick={() => handleAnswer(currentQuestion, answer)}
              disabled={hasSubmitted}
            >
              {answer}
            </button>
          ))}
        </div>
        {!hasSubmitted && (
          <button disabled={!isSelected} onClick={handleSubmit}>
            Submit
          </button>
        )}
        {!finished && hasSubmitted && (
          <button onClick={handleNextQuestion}>→</button>
        )}
        {finished && hasSubmitted && (
          <Link to="/results" data-testid="results-button">
            Results
          </Link>
        )}
      </div>
    </>
  );
}
