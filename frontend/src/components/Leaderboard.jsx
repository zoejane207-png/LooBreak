import { useState, useEffect } from "react";
import { getPlayers } from "../services/results";

const medals = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const [players, setPlayers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlayers()
      .then((data) => {
        setPlayers(data.players);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [players]);

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
              <p>Loading...</p>
            ) : (
              players.map((player, i) => (
                <tr key={player.index}>
                  {i < 3 ? <td>{medals[i]}</td> : <td>{i + 1}</td>}
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
