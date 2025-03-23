import { useMemo, useState } from "react";
import { Button, ThemeProvider } from "@mui/material";
import { Stack } from "@mui/material";
import {
  Activity,
  ActivityCheckpoint,
  Difficulty,
  raids,
  dungeons,
  difficulties,
} from "./data/Activities.tsx";
import "./App.css";
import { darkTheme } from "./theme/Theme";
import { ChipGroup } from "./components/ChipGroup";
import { Username } from "./components/Username.tsx";
import { SetClipboardValue } from "./utils/ClipboardManager.tsx";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [selectedCheckpoint, setSelectedCheckpoint] =
    useState<ActivityCheckpoint | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);
  const [username, setUsername] = useState<string>("");

  // Custom hook to check if selections are complete
  const useSelectionStatus = useMemo(() => {
    const hasActivity = selectedActivity !== null;
    const hasUsername = username.trim() !== "";
    const hasRequiredCheckpoint = selectedCheckpoint !== null;
    const hasDifficulty = selectedDifficulty !== null;

    return hasActivity && hasRequiredCheckpoint && hasDifficulty && hasUsername;
  }, [selectedActivity, selectedCheckpoint, selectedDifficulty, username]);

  const handleActivitySelected = (activity: Activity) => {
    setSelectedActivity((prev) =>
      prev?.key === activity.key ? null : activity,
    );
    setSelectedCheckpoint(null);
  };

  const handleCheckpointSelected = (checkpoint: ActivityCheckpoint) => {
    setSelectedCheckpoint((prev) =>
      prev?.key === checkpoint.key ? null : checkpoint,
    );
  };

  const handleDifficultySelected = (difficulty: Difficulty) => {
    setSelectedDifficulty((prev) =>
      prev?.key === difficulty.key ? null : difficulty,
    );
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleConcatenateKeys = () => {
    const keys: string[] = ["!queue"];
    if (selectedActivity) keys.push(selectedActivity.key);
    if (selectedCheckpoint) keys.push(selectedCheckpoint.key);
    if (selectedDifficulty) keys.push(selectedDifficulty.key);
    if (username) keys.push(username);

    const concatenated = keys.join(" ");
    SetClipboardValue(concatenated);
  };

  // TODO: set background based on selected activity
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
          <Username onUsernameChange={handleUsernameChange} />
          <Stack spacing={2}>
            <ChipGroup
              sectionTitle="Raids"
              chips={raids}
              selectedChip={selectedActivity}
              onChipClick={handleActivitySelected}
            />
            <ChipGroup
              sectionTitle="Dungeons"
              chips={dungeons}
              selectedChip={selectedActivity}
              onChipClick={handleActivitySelected}
            />
            {selectedActivity && selectedActivity.checkpoints.length > 0 && (
              <>
                <ChipGroup
                  sectionTitle="Checkpoints"
                  chips={selectedActivity.checkpoints}
                  selectedChip={selectedCheckpoint}
                  onChipClick={handleCheckpointSelected}
                />
              </>
            )}
            {selectedActivity && (
              <>
                <ChipGroup
                  sectionTitle="Difficulty"
                  chips={difficulties}
                  selectedChip={selectedDifficulty}
                  onChipClick={handleDifficultySelected}
                />
              </>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleConcatenateKeys}
              disabled={!useSelectionStatus}
              size={"medium"}
              sx={{ mt: 2, widget: "auto" }}
            >
              Queue for Activity
            </Button>
          </Stack>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
