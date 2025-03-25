import { useState, useEffect, ChangeEvent } from "react";
import { TextField, Box, Typography } from "@mui/material";

// Local storage key for the username
const USERNAME_STORAGE_KEY = "player_username";

interface UsernameProps {
  onUsernameChange?: (username: string) => void;
}

export const Username = ({ onUsernameChange }: UsernameProps) => {
  const [username, setUsername] = useState<string>("");

  // Load username from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem(USERNAME_STORAGE_KEY);
    if (storedUsername) {
      setUsername(storedUsername);
      if (onUsernameChange) {
        onUsernameChange(storedUsername);
      }
    }
  }, []);

  // Handle username changes and update localStorage
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    localStorage.setItem(USERNAME_STORAGE_KEY, newUsername);
    if (onUsernameChange) {
      onUsernameChange(newUsername);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" align="left" sx={{ alignSelf: "flex-start", mb: 1 }}>
        Bungie Username
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter your Discord username"
        value={username}
        onChange={handleUsernameChange}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
          },
        }}
      />
    </Box>
  );
};
