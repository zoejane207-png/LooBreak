import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";

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
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(messages[score]);
  }, [score]);

  return (
    <Card data-testid="results" className="w-full max-w-md mx-auto">
      <CardHeader>
        <h1 className="text-3xl font-bold text-center">Game Over!</h1>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 text-center">
        <h2 data-testid="score" className="text-5xl font-bold">
          {score}/10
        </h2>
        <h3
          data-testid="results-message"
          className="text-lg italic text-muted-foreground"
        >
          {message}
        </h3>
        <p className="text-sm">
          Enter a playername to save your score to the leaderboard
        </p>
        <div className="flex justify-center my-2">
          <ArrowDown />
        </div>
      </CardContent>
    </Card>
  );
}
