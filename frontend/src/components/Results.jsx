import { useEffect, useState } from "react";

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
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(messages[score]);
  }, [score]);

  return (
    <>
      <h1>Game Over!</h1>
      <h2>{score}/10</h2>
      <h3>{message}</h3>
      <p>Enter a playername to save your score to the leaderboard:</p>
    </>
  );
}
