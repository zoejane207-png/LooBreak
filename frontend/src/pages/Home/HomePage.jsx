import { Link } from "react-router-dom";

import "./HomePage.css";
import "../../components/icebreaker.module.css";
import Icebreaker from "../../components/icebreaker";

export function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to LooBreak!</h1>
      <Link to="/quiz">Quiz</Link>
      <Icebreaker />
    </div>
  );
}
