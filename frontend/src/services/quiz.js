// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getQuiz() {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch(`${BACKEND_URL}/quiz`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch quiz");
  }

  const data = await response.json();
  return data.quiz;
}
