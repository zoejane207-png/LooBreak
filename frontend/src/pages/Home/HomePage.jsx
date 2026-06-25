import "./HomePage.css";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="home">
        <h1>Welcome to LooBreak!</h1>
        <Link to="/quiz" id="quiz-button" aria-label="quiz-button">
          Quiz
        </Link>
        <Link
          to="/leaderboard"
          id="leaderboard-button"
          aria-label="quiz-button"
        >
          Leaderboard
        </Link>
      </div>
    </>
  );
}
