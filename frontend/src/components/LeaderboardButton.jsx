import { useNavigate } from "react-router-dom";

export default function LeaderboardButton() {
  const navigate = useNavigate();
  function LeaderboardRedirect() {
    navigate("/leaderboard");
  }

  return (
    <button
      onClick={LeaderboardRedirect}
      className="leaderboard"
      aria-label="leaderboard"
    >
      Leaderboard
    </button>
  );
}
