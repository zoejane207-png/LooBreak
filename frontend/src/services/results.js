const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createPlayer({ playername, score }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playername, score }),
  };
  const response = await fetch(`${BACKEND_URL}/players`, requestOptions);
  if (!response.ok) {
    throw new Error("Unable to create player and record score");
  }
  const data = await response.json();
  return data;
}
