// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getLootip() {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch(`${BACKEND_URL}/lootips`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch lootip");
  }

  const data = await response.json();
  return data;
}
