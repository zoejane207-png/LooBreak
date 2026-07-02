import "./HomePage.css";
import Icebreaker from "../../components/icebreaker";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
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

  // Route through the shared PageLayout so the home page lines up with every
  // other page (centered column, consistent padding, one nav bar + footer)
  // rather than the ad-hoc padding/spacer hacks main's standalone version used.
  return (
    <PageLayout>
      <h1 className="text-4xl font-bold" data-testid="homepage-header">Welcome to LooBreak!</h1>
      {quizCompleted && <ScoreBadge data={scoreData} />}
      <Link to="/quiz" data-testid="homepage-quiz-button">
        <Button variant="default">Take the Quiz</Button>
      </Link>
      <h3>Top 3 Players Today:</h3>
      <MiniLeaderboard data-testid="mini-leaderboard" />
      <Link to="/leaderboard" data-testid="homepage-leaderboard-button">
          <Button variant="default">Check out the full leaderboard</Button>
      </Link>
      <Icebreaker />
    </PageLayout>
  );
}
