import PageLayout from "../../components/PageLayout";
import Leaderboard from "../../components/Leaderboard";

export default function LeaderboardPage() {
  return (
    <PageLayout>
      <h2 className="text-3xl font-bold">Leaderboard</h2>
      <Leaderboard />
    </PageLayout>
  );
}
