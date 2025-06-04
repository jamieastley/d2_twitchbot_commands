import { useReducer, useState, useEffect } from "react";
import { Button, ThemeProvider } from "@mui/material";
import { Stack } from "@mui/material";
import {
  Activity,
  ActivityCheckpoint,
  Difficulty,
  raids,
  dungeons,
  difficulties,
} from "../data/Activities";
import "./Popup.css";
import { darkTheme } from "../theme/Theme";
import { ChipGroup } from "../components/ChipGroup";
import { UsernameForm } from "../components/UsernameForm";
import { SetClipboardValue } from "../utils/ClipboardManager";
import { ValidateUsername, GetUsername } from "../utils/UsernameManager";

// Define state and action types
type SelectionState = {
  selectedActivity: Activity | null;
  selectedCheckpoint: ActivityCheckpoint | null;
  selectedDifficulty: Difficulty | null;
  username: string;
  isValid: boolean;
};

type SelectionAction =
  | { type: "SET_ACTIVITY"; payload: Activity | null }
  | { type: "SET_CHECKPOINT"; payload: ActivityCheckpoint | null }
  | { type: "SET_DIFFICULTY"; payload: Difficulty | null }
  | { type: "SET_USERNAME"; payload: string };

function selectionReducer(state: SelectionState, action: SelectionAction): SelectionState {
  let newState: SelectionState;

  switch (action.type) {
    case "SET_ACTIVITY":
      newState = {
        ...state,
        selectedActivity: action.payload,
        // Reset checkpoint when activity changes
        selectedCheckpoint: null,
      };
      break;

    case "SET_CHECKPOINT":
      newState = {
        ...state,
        selectedCheckpoint: action.payload,
      };
      break;

    case "SET_DIFFICULTY":
      newState = {
        ...state,
        selectedDifficulty: action.payload,
      };
      break;

    case "SET_USERNAME":
      newState = {
        ...state,
        username: action.payload,
      };
      break;

    default:
      return state;
  }

  // Calculate validity after any state change
  newState.isValid = Boolean(
    newState.selectedActivity &&
      newState.selectedCheckpoint &&
      newState.selectedDifficulty &&
      newState.username.trim() !== ""
  );

  return newState;
}

function App() {
  const [usernameSubmitted, setUsernameSubmitted] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [state, dispatch] = useReducer(selectionReducer, {
    selectedActivity: null,
    selectedCheckpoint: null,
    selectedDifficulty: null,
    username: "",
    isValid: false,
  });

  // Check for stored username on component mount
  useEffect(() => {
    const storedUsername = GetUsername();
    if (storedUsername && ValidateUsername(storedUsername)) {
      dispatch({ type: "SET_USERNAME", payload: storedUsername });
      setUsernameSubmitted(true);
    }
  }, []);

  const handleActivitySelected = (activity: Activity) => {
    dispatch({
      type: "SET_ACTIVITY",
      payload: state.selectedActivity?.key === activity.key ? null : activity,
    });
  };

  const handleCheckpointSelected = (checkpoint: ActivityCheckpoint) => {
    dispatch({
      type: "SET_CHECKPOINT",
      payload: state.selectedCheckpoint?.key === checkpoint.key ? null : checkpoint,
    });
  };

  const handleDifficultySelected = (difficulty: Difficulty) => {
    dispatch({
      type: "SET_DIFFICULTY",
      payload: state.selectedDifficulty?.key === difficulty.key ? null : difficulty,
    });
  };

  const handleUsernameSet = (newUsername: string) => {
    dispatch({ type: "SET_USERNAME", payload: newUsername });
  };

  const handleUsernameSubmit = (username: string) => {
    if (ValidateUsername(username)) {
      dispatch({ type: "SET_USERNAME", payload: username });
      setUsernameSubmitted(true);
    }
  };

  const handleConcatenateKeys = () => {
    const keys: string[] = ["!queue"];
    if (state.selectedActivity) keys.push(state.selectedActivity.key);
    if (state.selectedCheckpoint) keys.push(state.selectedCheckpoint.key);
    if (state.selectedDifficulty) keys.push(state.selectedDifficulty.key);
    if (state.username) keys.push(state.username);

    const concatenated = keys.join(" ");
    SetClipboardValue(concatenated);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
          {!usernameSubmitted ? (
            // Username input screen
            <div>
              <UsernameForm onUsernameSet={handleUsernameSet} />
            </div>
          ) : (
            // Activity selection screen
            <Stack spacing={2}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div>Username: {state.username}</div>
                <Button variant="text" size="small" onClick={() => setUsernameSubmitted(false)}>
                  Change
                </Button>
              </div>
              <ChipGroup
                sectionTitle="Raids"
                chips={raids}
                selectedChip={state.selectedActivity}
                onChipClick={handleActivitySelected}
              />
              <ChipGroup
                sectionTitle="Dungeons"
                chips={dungeons}
                selectedChip={state.selectedActivity}
                onChipClick={handleActivitySelected}
              />
              {state.selectedActivity && state.selectedActivity.checkpoints.length > 0 && (
                <ChipGroup
                  sectionTitle="Checkpoints"
                  chips={state.selectedActivity.checkpoints}
                  selectedChip={state.selectedCheckpoint}
                  onChipClick={handleCheckpointSelected}
                />
              )}
              {state.selectedActivity && (
                <ChipGroup
                  sectionTitle="Difficulty"
                  chips={difficulties}
                  selectedChip={state.selectedDifficulty}
                  onChipClick={handleDifficultySelected}
                />
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleConcatenateKeys}
                disabled={!state.isValid}
                size={"medium"}
                sx={{ mt: 2, width: "auto" }}
              >
                Queue for Activity
              </Button>
            </Stack>
          )}
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
