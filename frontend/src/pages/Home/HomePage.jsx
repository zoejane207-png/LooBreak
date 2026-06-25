import "./HomePage.css";
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
        <Link to="/leaderboard" data-testid="leaderboard-button">
          Leaderboard
        </Link>
      </div>
    </>
  );
}
