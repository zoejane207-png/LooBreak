import PageLayout from "../../components/PageLayout";
import Leaderboard from "../../components/Leaderboard";

export default function LeaderboardPage() {
  return (
    <PageLayout>
      <h1 className="text-3xl font-bold">Leaderboard</h1>
      <Leaderboard />
    </PageLayout>
  );
}
