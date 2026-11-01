import React, { useContext } from "react";
import { Chip, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Add as AddIcon } from "@mui/icons-material";
import DataContext from "context/DataContext";
import factions from "constants/factions";

function FactionChip({ faction }) {
  const { goToPage } = useContext(DataContext);
  const factionTheme = createTheme({
    palette: {
      primary: { main: factions[faction].primaryColor },
      secondary: { main: factions[faction].secondaryColor },
    },
  });
  return (
    <ThemeProvider theme={factionTheme}>
      <Chip
        clickable
        color="primary"
        icon={<AddIcon fontSize="small" />}
        label={
          <Typography variant="subtitle1">
            {`${factions[faction].singular}`}
          </Typography>
        }
        onClick={() => {
          // currentList = [];
          goToPage(`/list/${faction}`);
        }}
      />
    </ThemeProvider>
  );
}

export default FactionChip;
