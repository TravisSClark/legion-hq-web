import { Tooltip } from '@mui/material';
import { withStyles } from '@mui/material/styles';

// Tooltip main argument is title

const LargerTooltip = withStyles(theme => ({
  tooltip: { fontSize: 16 }
}))(Tooltip);

export default LargerTooltip;
