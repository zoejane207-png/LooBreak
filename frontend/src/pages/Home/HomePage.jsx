import "../../components/icebreaker.module.css";
import Icebreaker from "../../components/icebreaker";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { useState, useEffect } from "react";
import ScoreBadge from "../../components/ScoreBadge";
import { getToken, removeToken } from "../../services/auth";
import { getMyScore } from "../../services/results";
import MiniLeaderboard from "../../components/MiniLeaderBoard";

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
    <PageLayout>
      <h1 className="text-4xl font-bold">Welcome to LooBreak!</h1>
      {quizCompleted && <ScoreBadge data={scoreData} />}
      <Link to="/quiz" data-testid="quiz-button">
        Quiz
      </Link>
      <h3>Top 3 Players Today:</h3>
      <MiniLeaderboard data-testid="mini-leaderboard" />
      <Icebreaker data-testid="icebreaker-component" />
      <Link to="/leaderboard" data-testid="leaderboard-button">
        Leaderboard
      </Link>
    </PageLayout>
  );
}
