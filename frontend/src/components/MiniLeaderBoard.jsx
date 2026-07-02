import { useState, useEffect } from "react";
import { getPlayers } from "../services/results";
import medal1 from "../assets/loobreak-medal-1.svg";
import medal2 from "../assets/loobreak-medal-2.svg";
import medal3 from "../assets/loobreak-medal-3.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getQuiz } from "@/services/quiz";

const medals = [medal1, medal2, medal3];
const medalLabel = ["1st place", "2nd place", "3rd place"];

// Gold / silver / bronze tints for the podium rows (index 0–2).
const podiumRowClass = [
  "bg-amber-100/70 hover:bg-amber-100 dark:bg-amber-400/10 dark:hover:bg-amber-400/15",
  "bg-slate-100/80 hover:bg-slate-100 dark:bg-slate-400/10 dark:hover:bg-slate-400/15",
  "bg-orange-100/70 hover:bg-orange-100 dark:bg-orange-400/10 dark:hover:bg-orange-400/15",
];

// Mirrors the real table's two columns so the layout doesn't jump on load.
function MiniLeaderboardSkeletonRows() {
  return Array.from({ length: 3 }).map((_, i) => (
    <TableRow key={i} data-testid="mini-leaderboard-skeleton-row">
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="ml-auto h-4 w-10" />
      </TableCell>
    </TableRow>
  ));
}

export default function MiniLeaderboard() {
  const [quiz, setQuiz] = useState({});
  const [players, setPlayers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayers();
        const quizData = await getQuiz();
        setPlayers(data.players.slice(0, 3));
        setQuiz(quizData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div
      data-testid="mini-leaderboard"
      className="bg-card text-card-foreground mx-auto w-full max-w-xs overflow-hidden rounded-xl border shadow-sm"
    >
      <Table>
        <caption className="sr-only">Mini leaderboard</caption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10 text-center">Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <MiniLeaderboardSkeletonRows />
          ) : error ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-destructive py-6 text-center"
              >
                {error}
              </TableCell>
            </TableRow>
          ) : (
            players.map((player, i) => (
              <TableRow
                key={player._id}
                className={i < 3 ? podiumRowClass[i] : undefined}
              >
                <TableCell className="text-center">
                  {i < 3 ? (
                    <img
                      src={medals[i]}
                      alt={medalLabel[i]}
                      className="mx-auto h-6 w-6"
                    />
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {i + 1}
                    </span>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {player.playername}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  <span aria-hidden="true">
                    {player.score}/{quiz.length}
                  </span>
                  <span className="sr-only">
                    Score: {player.score} out of {quiz.length}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
