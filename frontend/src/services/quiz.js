// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export async function getQuiz() {
  try {
    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(`${BACKEND_URL}/quiz`, requestOptions);

    const data = await response.json();
    return data.quiz.map((q) => ({
      ...q,
      question: decodeHTML(q.question),
      correct_answer: decodeHTML(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map((a) => decodeHTML(a)),
    }));
  } catch (err) {
    console.error(err);
    throw new Error("Unable to fetch quiz");
  }
}
