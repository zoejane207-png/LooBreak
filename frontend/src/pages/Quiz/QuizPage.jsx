import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getQuiz } from "../../services/quiz";
// import Quiz from "../../components/Quiz";
import NavBar from "../../components/NavBar";

export function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const currentQuestion = quiz[currentIndex];
  const [score, setScore] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    getQuiz().then((data) => {
      setQuiz(data);
    });
  }, []);

  function handleNextQuestion() {
    setIsSelected(false);
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
    if (answer === currentQuestion.correct_answer) {
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
              disabled={isSelected}
            >
              {answer}
            </button>
          ))}
        </div>
        {!finished && <button onClick={handleNextQuestion}>→</button>}
      </div>
    </>
  );
}
