async function fetchExternalQuiz() {
  const res = await fetch(
           //"http://localhost:8000/data"
          "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple",
  );
  if (!res.ok) throw new Error(`Response status: ${res.status}`);
  return res.json();
}
module.exports = { fetchExternalQuiz };