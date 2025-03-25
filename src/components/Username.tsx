import { useState, useEffect, ChangeEvent } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { GetUsername, StoreUsername, ValidateUsername } from "../utils/UsernameManager";

interface UsernameProps {
  onUsernameChange?: (username: string) => void;
}

export const Username = ({ onUsernameChange }: UsernameProps) => {
  const [username, setUsername] = useState<string>("");

  // Load username from localStorage on component mount
  useEffect(() => {
    const storedUsername = GetUsername();
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

    if (ValidateUsername(newUsername) && onUsernameChange) {
      onUsernameChange(newUsername);
      StoreUsername(newUsername);
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
        placeholder="LeeroyJenkins#1234"
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
