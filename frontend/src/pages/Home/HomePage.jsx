import "./HomePage.css";
import "../../components/icebreaker.module.css";
import Icebreaker from "../../components/icebreaker";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import MiniLeaderboard from "../../components/MiniLeaderBoard";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="home flex flex-col items-center gap-4 p-6">
        <h1 className="text-4xl font-bold">Welcome to LooBreak!</h1>
        <h3>Top 3 Players Today:</h3>
        <div style={{ paddingLeft: "190px" }}>
          <MiniLeaderboard data-testid="mini-leaderboard" />
        </div>
        <br></br>
        <br></br>
        <Link to="/quiz" data-testid="quiz-button">
          Quiz
        </Link>
        <br></br>
        <br></br>
        <Icebreaker data-testid="icebreaker-component" />
        <br></br>
        <br></br>
        <Link to="/leaderboard" data-testid="leaderboard-button">
          Leaderboard
        </Link>
      </div>
      <Footer />
    </>
  );
}
