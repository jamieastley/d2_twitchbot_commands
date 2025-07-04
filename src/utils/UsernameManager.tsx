const USERNAME_STORAGE_KEY = "bungie_id";

// Loads the saved username from local storage, if it exists
export function GetUsername() {
  return localStorage.getItem(USERNAME_STORAGE_KEY);
}

// Saves the username to local storage
export function StoreUsername(username: string) {
  localStorage.setItem(USERNAME_STORAGE_KEY, username);
}

export function ClearUsername() {
  localStorage.removeItem(USERNAME_STORAGE_KEY);
}

// Validates the username to ensure the pattern is correct and matches the expected format
// of <name>#<4-digit number>
export function ValidateUsername(username: string) {
  // Check if the username is in the correct format
  const usernamePattern = /^\S[^#]+#\d{4}$/;
  return usernamePattern.test(username);
}
