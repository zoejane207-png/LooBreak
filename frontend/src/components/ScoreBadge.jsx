import { getQuiz } from "../services/quiz";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import correctSvg from "../assets/loobreak-correct.svg";
import incorrectSvg from "../assets/loobreak-incorrect.svg";

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

  const isGoodScore = data.score > 5;

  return (
    <div
      data-testid="score-badge"
      className="flex w-full flex-wrap justify-center gap-2"
      aria-live="polite"
    >
      {error ? (
        <Badge role="alert" variant="destructive">
          {error}
        </Badge>
      ) : loading ? (
        <Badge variant="destructive">Loading...</Badge>
      ) : (
        <Badge 
          variant={isGoodScore ? "default" : "destructive"}
          className="flex items-center gap-2 px-4 py-2"
        >
          <img 
            src={isGoodScore ? correctSvg : incorrectSvg}
            alt={isGoodScore ? "Good score" : "Low score"}
            className="w-5 h-5"
          />
          <div className="flex flex-col">
            <span>Keep it up {data.playername}!</span>
            <span className="font-bold">{data.score}/{quiz.length}</span>
          </div>
        </Badge>
      )}
    </div>
  );
}