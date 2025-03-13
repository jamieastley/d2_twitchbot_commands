import React from "react";
import { Selectable } from "../types/Selectable";
import { Box, Chip, Stack, Typography } from "@mui/material";

interface ChipGroupProps<T extends Selectable> {
  sectionTitle: string;
  chips: T[];
  selectedChip: T | null;
  onChipClick: (item: T) => void;
}

export const ChipGroup = <T extends Selectable>({
                                                  sectionTitle,
                                                  chips,
                                                  selectedChip,
                                                  onChipClick
                                                }: ChipGroupProps<T>) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h6" align="left"
                  sx={{ alignSelf: "flex-start" }}>{sectionTitle}</Typography>
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
    </Stack>

  );
};