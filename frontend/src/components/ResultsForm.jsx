import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPlayer } from "../../services/results";

export default function ResultsForm(props) {
  const score = props.score;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    playername: "",
    score: 0,
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
      "wet",
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
      if (formData.playername.length() < 3)
        newErrors.playername = "Playername must be more than 3 characters long";
      if (formData.playername.length() > 12)
        newErrors.playername =
          "Playername must be less than 12 characters long";
      if (!formData.playername) newErrors.playername = "Playername is required";
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const { playername, score, ...rest } = FormData;
      await createPlayer({
        ...rest,
        playername: playername.trim(),
        score: score,
      });
      navigate("/leaderboard");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} aria-label="results-form">
        <label htmlFor="playername">Playername</label>
        <input
          type="text"
          placeholder="Enter playername"
          name="playername"
          value={formData.playername}
          onChange={handleChange}
        />
        <button onClick={generatePlayerName}>Generate playername</button>
        <input type="hidden" name="score" value={score} />
        {errors.playername && <p>{errors.playername}</p>}
        <button>Submit</button>
      </form>
    </>
  );
}
