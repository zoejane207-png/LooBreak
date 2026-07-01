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

export async function getPlayers() {
  const requestOptions = {
    method: "GET",
  };
  const response = await fetch(`${BACKEND_URL}/players`, requestOptions);
  if (response.status !== 200) {
    throw new Error("Unable to fetch players and their scores");
  }

  const data = await response.json();
  return data;
}
