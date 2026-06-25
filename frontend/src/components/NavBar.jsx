import { Link } from "react-router-dom";
import logo from "../assets/toilet-icon-png-5.png";
import useDarkMode from "../utils/useDarkMode";

export default function NavBar() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <nav className="navbar" id="navbar">
      <img src={logo} alt="LooBreak Logo" className="navbar-logo" />
      <Link to="/" id="home-button">
        Home
      </Link>
      <Link to="/quiz" id="quiz-button">
        Quiz
      </Link>
      <Link to="/leaderboard" id="leaderboard-button">
        Leaderboard
      </Link>
      <button onClick={() => setIsDark(!isDark)}>
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}
