import { useEffect, useState } from "react";
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
  "Flawless. Go on, have a smug smile—you've earned it.",
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
      } catch(err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResult
  }, [score, error]);

  return (
    <>
      <div data-testid="results">
        <h2>Game Over!</h2>
        {error ? (
          <p role="alert">{error}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1>{score}/{quiz.length}</h1>
            <h3>{message}</h3>
            <p>Enter a playername to save your score to the leaderboard:</p>
          </div>
        )}
      </div>
    </>
  );
}
