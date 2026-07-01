const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createPlayer({ playername, score }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playername, score }),
  };
  
  const response = await fetch(`${BACKEND_URL}/players`, requestOptions);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to create player and record score");
  }
  return data;
}
