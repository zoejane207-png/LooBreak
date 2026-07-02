import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Leaderboard from "../../components/Leaderboard";

export default function LeaderboardPage() {
  return (
    <>
      <NavBar />
      <h1 className="mx-auto p-6 text-2xl font-bold">Leaderboard</h1>
      <Leaderboard />
      <Footer />
    </>
  );
}
