import { useState, ChangeEvent, useMemo } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import { ValidateUsername } from "../utils/UsernameManager";

interface UsernameProps {
  onUsernameSubmitted: (username: string) => void;
}

export const UsernameForm = ({ onUsernameSubmitted }: UsernameProps) => {
  const [usernameInput, setUsername] = useState<string>("");
  const enableSaveButton = useMemo(
    () => usernameInput.trim() !== "" && ValidateUsername(usernameInput),
    [usernameInput]
  );

  // Handle username changes and update localStorage
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleUsernameSubmit = (username: string) => {
    const trimmedUsername = username.trim();
    if (ValidateUsername(trimmedUsername)) {
      onUsernameSubmitted(trimmedUsername);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        m: 4,
      }}
    >
      <Typography variant="h6" align="left" sx={{ alignSelf: "center", mb: 1 }}>
        Bungie Username
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUsernameSubmit(usernameInput);
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="LeeroyJenkins#1234"
          value={usernameInput}
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
            type="submit"
            variant="contained"
            color="primary"
            disabled={!enableSaveButton}
            size={"medium"}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};
