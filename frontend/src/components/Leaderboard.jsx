import { useState, useEffect } from "react";
import { getPlayers } from "../services/results";

const medals = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const [players, setPlayers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayers();
        setPlayers(data.players);
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
      <div data-testid="leaderboard">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3}>Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3}>{error}</td>
              </tr>
            ) : (
              players.map((player, i) => (
                <tr key={player._id}>
                  {i < 3 ? (
                    <td data-testid="{i}" aria-label="{i}">
                      {medals[i]}
                    </td>
                  ) : (
                    <td>{i + 1}</td>
                  )}
                  <td>{player.playername}</td>
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
