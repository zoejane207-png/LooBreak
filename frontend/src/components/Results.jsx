export default function Results(props) {
  const score = props.score;

  return (
    <>
      <h1>End of quiz</h1>
      <h2>{score}/10</h2>
      <p>
        Submit your playername below to enter your score to the leaderboard:
      </p>
    </>
  );
}
