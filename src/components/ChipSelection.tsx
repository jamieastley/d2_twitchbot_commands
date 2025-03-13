import React from "react";
import { Chip, Box } from "@mui/material";
import { Selectable } from "../types/Selectable";

interface ChipSelectionProps<T extends Selectable> {
  chips: T[];
  selectedChip: T | null;
  onChipClick: (item: T) => void;
}

export const ChipSelection = <T extends Selectable>({
  chips,
  selectedChip,
  onChipClick
}: ChipSelectionProps<T>) => {
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {chips.map(chip => (
        <Chip
          key={chip.key}
          label={chip.label}
          onClick={() => onChipClick(chip)}
          color={selectedChip?.key === chip.key ? "primary" : "default"}
          variant={selectedChip?.key === chip.key ? "filled" : "outlined"}
          clickable
        />
      ))}
    </Box>
  );
};