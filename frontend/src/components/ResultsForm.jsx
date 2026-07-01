import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPlayer } from "../services/results";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ResultsForm(props) {
  const score = props.score;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    playername: "",
    score: score,
  });
  const [errors, setErrors] = useState({});
  const generatePlayerName = () => {
    const adjectives = [
      "sad",
      "old",
      "mad",
      "joy",
      "shy",
      "raw",
      "dry",
      "hot",
      "odd",
      "new",
      "pop",
      "pro",
      "sly",
      "fab",
      "icy",
      "ace",
      "top",
      "fun",
      "apt",
      "few",
    ];
    const nouns = [
      "Einstein",
      "Curie",
      "Darwin",
      "Galilei",
      "Newton",
      "Tesla",
      "Turing",
      "Behring",
      "Hodgkin",
      "Goodall",
      "Lovelace",
      "Hopper",
    ];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 9);
    setFormData((prev) => ({ ...prev, playername: `${adj}${noun}${num}` }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newErrors = {};
      if (formData.playername.length < 3)
        newErrors.playername = "Playername must be more than 3 characters long";
      if (formData.playername.length > 12)
        newErrors.playername =
          "Playername must be less than 12 characters long";
      if (!formData.playername) newErrors.playername = "Playername is required";
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const { playername, score, ...rest } = formData;
      await createPlayer({
        ...rest,
        playername: playername.trim(),
        score: score,
      });
      navigate("/leaderboard");
    } catch (err) {
      console.error(err);
      setErrors({ playername: err.message });
    }
  }

  return (
    <Card className="px-4 w-full max-w-md mx-auto mt-4">
      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit}
          data-testid="results-form"
          aria-label="results-form"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="playername" className="text-sm font-medium">
              Playername
            </label>
            <Input
              type="text"
              placeholder="Enter playername"
              id="playername"
              name="playername"
              value={formData.playername}
              onChange={handleChange}
            />
            {errors.playername && (
              <p className="text-sm text-red-500">{errors.playername}</p>
            )}
          </div>

          <input type="hidden" name="score" value={score} />

          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={generatePlayerName}
            >
              Generate playername
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
