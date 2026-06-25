import { useNavigate } from "react-router-dom";

export default function QuizButton() {
  const navigate = useNavigate();
  function QuizRedirect() {
    navigate("/quiz");
  }

  return (
    <button onClick={QuizRedirect} className="quiz" aria-label="quiz">
      Quiz
    </button>
  );
}
