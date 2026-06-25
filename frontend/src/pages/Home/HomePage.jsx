import "./HomePage.css";
import NavBar from "../../components/NavBar";
import QuizButton from "../../components/QuizButton";
import LeaderboardButton from "../../components/LeaderboardButton";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="home">
        <h1>Welcome to LooBreak!</h1>
        <QuizButton />
        <LeaderboardButton />
      </div>
    </>
  );
}
