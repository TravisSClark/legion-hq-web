import React from "react";
import { IconButton } from "@mui/material";
import { Icon as IconifyIcon } from "@iconify/react";
import { Add as PlusIcon, Remove as NegativeIcon } from "@mui/icons-material";

function UnitKillActions({ killUnit, restoreUnit }) {
  const fontSize = 26;
  return (
    <div
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        minWidth: "72px",
      }}
    >
      <React.Fragment>
        <IconButton
          size="small"
          onClick={restoreUnit}
          style={{ marginLeft: 2, marginRight: 1 }}
        >
          <NegativeIcon style={{ fontSize }} />
        </IconButton>
        <IconButton size="small" style={{ margin: 1 }}>
          <IconifyIcon icon="mdi:skull-crossbones" style={{ margin: 3 }} />
        </IconButton>
        <IconButton
          size="small"
          onClick={killUnit}
          style={{ marginLeft: 1, marginRight: 2 }}
        >
          <PlusIcon style={{ fontSize }} />
        </IconButton>
      </React.Fragment>
    </div>
  );
}

export default UnitKillActions;
