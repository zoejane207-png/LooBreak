import "./HomePage.css";
import Icebreaker from "../../components/icebreaker";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import ScoreBadge from "../../components/ScoreBadge";
import { getToken, removeToken } from "../../services/auth";
import { getMyScore } from "../../services/results";
import MiniLeaderboard from "../../components/MiniLeaderBoard";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    const checkQuizStatus = async () => {
      const token = getToken();
      if (!token) {
        setCheckingStatus(false);
        return;
      }
      try {
        const data = await getMyScore(token);
        setScoreData(data);
        setQuizCompleted(true);
      } catch {
        removeToken();
        setQuizCompleted(false);
      } finally {
        setCheckingStatus(false);
      }
    };
    checkQuizStatus();
  }, []);

  if (checkingStatus) return null;

  return (
    <>
      <NavBar />
      <div className="home flex flex-col items-center gap-4 p-6">
        <h1 className="text-4xl font-bold">Welcome to LooBreak!</h1>
        {quizCompleted && <ScoreBadge data={scoreData} />}
        <Link to="/quiz" data-testid="homepage-quiz-button">
          <Button variant="default">Take the Quiz</Button>
        </Link>
        <h3>Top 3 Players Today:</h3>
        <div style={{ paddingLeft: "190px" }}>
          <MiniLeaderboard data-testid="mini-leaderboard" />
        </div>
        <br></br>
        <br></br>
        <Link to="/leaderboard" data-testid="leaderboard-button">
          Leaderboard
        </Link>        
        <br></br>
        <br></br>
        <Icebreaker />
      </div>
      <Footer />
    </>
  );
}
