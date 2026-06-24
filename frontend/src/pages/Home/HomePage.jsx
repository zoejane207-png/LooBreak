import { Link } from "react-router-dom";

import "./HomePage.css";

export function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to LooBreak!</h1>
      <Link to="/quiz">Quiz</Link>
    </div>
  );
}
