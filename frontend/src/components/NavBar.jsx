import { Link } from "react-router-dom";
import logo from "../assets/toilet-vector.png";
import useDarkMode from "../utils/useDarkMode";

export default function NavBar({ quizStatus }) {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <nav className="navbar" data-testid="navbar">
      <img
        src={logo}
        alt="LooBreak Logo"
        data-testid="navbar-logo"
        className="logo"
      />
      <Link to="/" data-testid="home-button">
        Home
      </Link>
      <Link to="/quiz" data-testid="quiz-button" state={{ quizStatus }}>
        Quiz
      </Link>
      <Link to="/leaderboard" data-testid="leaderboard-button">
        Leaderboard
      </Link>
      <button onClick={() => setIsDark(!isDark)}>
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}
