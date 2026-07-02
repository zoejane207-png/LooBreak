import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";
import { getQuiz } from "../services/quiz";

const messages = [
  "That's almost impressively wrong.",
  "At least we know the scoring system works.",
  "You and the correct answers seem to have a complicated relationship.",
  "Room for improvement? That's putting it politely.",
  "You've started the engine, now try steering.",
  "Couldn't be more middle-of-the-road if you tried.",
  "Now we're talking. Decent effort.",
  "You've clearly been paying attention.",
  "That's the sort of score worth mentioning.",
  "Agonisingly close. You'll be thinking about that one.",
  "Flawless. Go on, have a smug smile you've earned it.",
];

export default function Results(props) {
  const score = props.score;
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const quizData = await getQuiz();
        setQuiz(quizData);
        setMessage(messages[score]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [score]);

  return (
    <>
      <div data-testid="results">
        <h1>Game Over!</h1>
        <h2 data-testid="score">{score}/{quiz.length}</h2>
        <h3 data-testid="results-message">{message}</h3>
        <p>Enter a playername to save your score to the leaderboard:</p>
      </div>
    </>
  );
}
