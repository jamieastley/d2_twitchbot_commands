import { useState } from "react";
import { ThemeProvider } from "@mui/material";
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

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [selectedCheckpoint, setSelectedCheckpoint] =
    useState<ActivityCheckpoint | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);

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

  // TODO: set background based on selected activity
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
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
          </Stack>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
