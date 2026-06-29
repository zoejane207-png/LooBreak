const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createPlayer({ playername, score }) {
  const formData = new FormData();
  formData.append("playername", playername);
  formData.append("score", score);
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  const response = await fetch(`${BACKEND_URL}/players`, requestOptions);
  if (!response.ok) {
    throw new Error("Unable to create player and record score");
  }
  const data = await response.json();
  return data;
}
// Suggestion but need to discuss further as formdata used a LOT:
// export async function createPlayer({ playername, score }) {
//   const response = await fetch(`${BACKEND_URL}/players`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ playername, score }),
//   });
//   if (!response.ok) {
//     throw new Error("Unable to create player and record score");
//   }
//   return response.json();
// }
