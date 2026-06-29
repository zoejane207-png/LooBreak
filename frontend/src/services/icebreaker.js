const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getIcebreaker() {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch(`${BACKEND_URL}/icebreaker`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch icebreaker");
  }

  const data = await response.json();
  return data;
}
