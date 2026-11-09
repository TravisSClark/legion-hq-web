import React from "react";
import { Popover, Chip, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import factions from "constants/factions";

function ListChipDropdown({ chips, faction }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

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
        style={{ margin: "0 5 5 0" }}
        label={
          <Typography variant="subtitle1">{`${chips.length} lists`}</Typography>
        }
        onClick={handleClick}
      />
      <Popover
        id={`${faction} list menu`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { padding: 8, background: "#1F2125" } }}
      >
        {chips.map((chip, i) => (
          <div key={`${faction}_list_${i}`} style={{ margin: 6 }}>
            {chip}
          </div>
        ))}
      </Popover>
    </ThemeProvider>
  );
}

export default ListChipDropdown;
