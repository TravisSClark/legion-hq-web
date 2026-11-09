import { Tooltip } from "@mui/material";

function LargerTooltip(props) {
  return (
    <Tooltip
      {...props}
      slotProps={{ tooltip: { sx: { fontSize: 16 } } }}
    />
  );
}

export default LargerTooltip;
