import { useState, useEffect } from "react";
import { getPlayers } from "../services/results";

const medals = ["🥇", "🥈", "🥉"];

export default function MiniLeaderboard() {
  const [players, setPlayers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayers();
        setPlayers(data.players.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <>
      <div data-testid="mini-leaderboard">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <td colSpan={3}>Loading...</td>
            ) : error ? (
              <tr>
                <td colSpan={3}>{error}</td>
              </tr>
            ) : (
              players.map((player, i) => (
                <tr key={player._id}>
                  <td data-testid="{i}" aria-label="{i}">
                    {medals[i]} {player.playername}
                  </td>
                  <td>{player.score}/10</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
