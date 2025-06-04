import { useState, useEffect, ChangeEvent } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import { GetUsername, StoreUsername, ValidateUsername } from "../utils/UsernameManager";

interface UsernameProps {
  onUsernameSet?: (username: string) => void;
}

export const UsernameForm = ({ onUsernameSet }: UsernameProps) => {
  const [username, setUsername] = useState<string>("");
  const isValidUsername = ValidateUsername(username);

  // Load username from localStorage on component mount
  useEffect(() => {
    const storedUsername = GetUsername();
    if (storedUsername) {
      setUsername(storedUsername);
      if (onUsernameSet) {
        onUsernameSet(storedUsername);
      }
    }
  }, []);

  // Handle username changes and update localStorage
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleUsernameSubmit = (username: string) => {
    const trimmedUsername = username.trim();
    if (ValidateUsername(trimmedUsername)) {
      StoreUsername(trimmedUsername);
    }
  };

  return (
    <Box
      sx={{
        mb: 2,
        display: "flex",
        flexDirection: "column",
        width: 250,
      }}
    >
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUsernameSubmit(username)}
          disabled={!isValidUsername}
          size={"medium"}
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
