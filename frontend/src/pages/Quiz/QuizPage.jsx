import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getQuiz } from "../../services/quiz";
import Quiz from "../../components/Quiz";

export function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const navigate = useNavigate();




  return (
    <>
      <h2>Quiz</h2>
      <div className="feed" role="feed">
        {quiz.map((quiz) => (
          <Quiz quiz={quiz} key={quiz._id} />
        ))}
      </div>
    </>
  );
}
