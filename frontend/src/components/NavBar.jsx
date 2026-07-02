import { Link } from "react-router-dom";
import logo from "../assets/toilet-vector.png";
import useDarkMode from "../utils/useDarkMode";
import { Switch } from "@/components/ui/switch";
import { MoonStar } from "lucide-react";
import { Sun } from "lucide-react";
import { Label } from "./ui/label";

export default function NavBar() {
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
      <Link to="/quiz" data-testid="navbar-quiz-button">
        Quiz
      </Link>
      <Link to="/leaderboard" data-testid="leaderboard-button">
        Leaderboard
      </Link>
      <div className="flex fixed right-2 top-4">
        <Switch
          id="theme-toggle"
          checked={isDark}
          onCheckedChange={setIsDark}
          data-testid="theme-toggle"
        />
        <Label htmlFor="theme-toggle" aria-label="dark/light mode">
          {isDark ? (
            <>
              <MoonStar size={16} />
            </>
          ) : (
            <>
              <Sun size={16} />
            </>
          )}
        </Label>
      </div>
    </nav>
  );
}
