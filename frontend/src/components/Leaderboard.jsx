import { useState, useEffect } from "react";
import { getPlayers } from "../../services/Players";

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
      <div data-testId="leaderboard">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Playername</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <p>Loading...</p>
            ) : (
              players.map((player, i) => (
                <tr key={player.index}>
                  <td data-testId={player.index}>{player.playername}</td>
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
