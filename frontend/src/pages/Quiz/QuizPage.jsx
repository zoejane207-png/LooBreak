import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getQuiz } from "../../services/quiz";
// import Quiz from "../../components/Quiz";

export function QuizPage() {
  
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    getQuiz().then((data) => {
      setQuiz(data)
    });
  }, []);

  const question = quiz.question;
  const answers = [quiz.correct_answer, quiz.incorrect_answers]

  console.log(quiz.incorrect_answers);
  // for (let questionIndex = 0; questionSet.length < 10; questionIndex++)

  return (
    <>
      <h2>Quiz</h2>
      <h3>Question:</h3>
      <div className="feed" role="feed">
        <p>{question}</p>
        <p>{answers}</p>
        <button>→</button>
      </div>
    </>
  );
}

