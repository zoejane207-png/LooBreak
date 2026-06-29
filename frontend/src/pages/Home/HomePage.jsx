import "./HomePage.css";
import "../../components/icebreaker.module.css";
import "../../components/lootips.module.css";
import Icebreaker from "../../components/icebreaker";
import LooTips from "../../components/lootips";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="home">
        <h1>Welcome to LooBreak!</h1>
        <Link to="/quiz" data-testid="quiz-button">
          Quiz
        </Link>
        <Icebreaker data-testid="icebreaker-component" />
        <LooTips data-testid="lootips-component" />
        <Link to="/leaderboard" data-testid="leaderboard-button">
          Leaderboard
        </Link>
      </div>
    </>
  );
}
