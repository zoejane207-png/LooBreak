import { Link } from "react-router-dom";

import "./HomePage.css";
import "../../components/icebreaker.module.css";
import "../../components/lootips.module.css";
import Icebreaker from "../../components/icebreaker";
import LooTips from "../../components/lootips";

export function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to LooBreak!</h1>
      <Link to="/quiz">Quiz</Link>
      <Icebreaker />
      <LooTips />
    </div>
  );
}
