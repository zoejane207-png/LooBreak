import { jwtDecode } from "jwt-decode";

// Single source of truth for reading/writing the auth token and for pulling
// the player's id out of the JWT, so components don't each reach into
// localStorage (and decode the token) on their own.

const TOKEN_KEY = "token";

export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  // Guard against a literal "undefined"/"null" that an earlier bug could have
  // written into storage.
  if (!token || token === "undefined" || token === "null") return null;
  return token;
}

export function setToken(token) {
  // Never persist a missing token — doing so used to poison localStorage with
  // the string "undefined" and break every later authenticated request.
  if (!token) return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Pull the logged-in player's id (the JWT "sub" claim) without a network call.
export function getPlayerIdFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token).sub;
  } catch {
    return null;
  }
}
