import { getQuiz } from "../services/quiz";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

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
    <div
      data-testid="score-badge"
      className="flex w-full flex-wrap justify-center gap-2"
    >
      {error ? (
        <Badge role="alert" variant="destructive">
          {error}
        </Badge>
      ) : loading ? (
        <Badge variant="destructive">Loading...</Badge>
      ) : (
        <Badge variant="destructive">
          Keep it up {data.playername}!
          <br />
          {data.score}/{quiz.length}
        </Badge>
      )}
    </div>
  );
}
