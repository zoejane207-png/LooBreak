import { getQuiz } from "../services/quiz";
import { useState, useEffect } from "react";

export default function ScoreBadge({ data }) {
  const [quiz, setQuiz] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuiz()
      .then(setQuiz)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid="score-badge">
      {error ? (
        <p role="alert">{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Come back tomorrow for another quiz {data.playername}!</p>
          <p>{data.score}/{quiz.length}</p>
        </div>
      )}
    </div>
  );
}