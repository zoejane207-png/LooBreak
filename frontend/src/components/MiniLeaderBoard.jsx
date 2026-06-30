import { useState, useEffect } from "react";
import { getPlayers } from "../services/results";

export default function MiniLeaderboard() {
  const [players, setPlayers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlayers()
      .then((data) => {
        setPlayers(data.players.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [players]);

  return (
    <>
      <div data-testId="mini-leaderboard">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <p>Loading...</p>
            ) : (
              players.map((player) => (
                <tr key={player.index}>
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
