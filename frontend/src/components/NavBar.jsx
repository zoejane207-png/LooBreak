import { NavLink } from "react-router-dom";
import logo from "../assets/loobreak-logo.svg";
import useDarkMode from "../utils/useDarkMode";
import { Switch } from "@/components/ui/switch";
import { MoonStar } from "lucide-react";
import { Sun } from "lucide-react";
import { Label } from "./ui/label";

// Active route gets the solid primary fill; the rest sit muted until hovered.
const navLinkClass = ({ isActive }) =>
  [
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-primary text-primary-foreground"
      : "text-foreground/70 hover:bg-secondary hover:text-secondary-foreground",
  ].join(" ");

export default function NavBar() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-testid="navbar"
    >
      {/* Brand doubles as the home link; its accessible name ("LooBreak Logo")
          intentionally avoids "home"/"quiz"/"leaderboard" so each nav link
          stays the sole match for those names in the tests. */}
      <NavLink to="/" end className="flex items-center gap-2">
        <img
          src={logo}
          alt="LooBreak Logo"
          data-testid="navbar-logo"
          className="h-9 w-9"
        />
        <span className="text-lg font-bold tracking-tight">LooBreak</span>
      </NavLink>

      <div className="flex items-center gap-1 sm:gap-2">
        <NavLink to="/" end data-testid="home-button" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink
          to="/quiz"
          data-testid="navbar-quiz-button"
          className={navLinkClass}
        >
          Quiz
        </NavLink>
        <NavLink
          to="/leaderboard"
          data-testid="leaderboard-button"
          className={navLinkClass}
        >
          Leaderboard
        </NavLink>

        {/* Inline theme toggle — main positioned this fixed to the viewport,
            which floated it out of the bar; keeping it in the flex row lines
            it up with the links. */}
        <div className="ml-1 flex items-center gap-2">
          <Switch
            id="theme-toggle"
            checked={isDark}
            onCheckedChange={setIsDark}
            data-testid="theme-toggle"
          />
          <Label htmlFor="theme-toggle" aria-label="dark/light mode">
            {isDark ? <MoonStar size={16} /> : <Sun size={16} />}
          </Label>
        </div>
      </div>
    </nav>
  );
}
