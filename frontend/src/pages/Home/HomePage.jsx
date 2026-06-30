import "./HomePage.css";
import "../../components/icebreaker.module.css";
import Icebreaker from "../../components/icebreaker";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import ScoreBadge from "../../components/ScoreBadge";
import { getToken, removeToken } from "../../services/auth";
import { getMyScore } from "../../services/results";

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
        const data = await getMyScore();
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
      <NavBar quizStatus={quizCompleted} />
      <div className="home">
        <h1>Welcome to LooBreak!</h1>
        {quizCompleted && <ScoreBadge data={scoreData} />}
        {!quizCompleted && (
          <Link
            to="/quiz"
            data-testid="quiz-button"
            state={{ quizStatus: quizCompleted }}
          >
            Quiz
          </Link>
        )}
        <Icebreaker data-testid="icebreaker-component" />
        <Link to="/leaderboard" data-testid="leaderboard-button">
          Leaderboard
        </Link>
      </div>
      <Footer />
    </>
  );
}
