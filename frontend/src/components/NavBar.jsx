import logo from "../assets/toilet-icon-png-5.png";
import { useDarkMode } from "../utils/useDarkMode";
import HomeButton from "../components/HomeButton";
import QuizButton from "../components/QuizButton";
import LeaderboardButton from "../components/LeaderboardButton";

export default function NavBar() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <nav className="navbar" id="navbar">
      <img src={logo} alt="LooBreak Logo" className="navbar-logo" />
      <HomeButton />
      <QuizButton />
      <LeaderboardButton />
      <button onClick={() => setIsDark(!isDark)}>
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}
