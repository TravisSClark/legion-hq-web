import React, { useState } from 'react';
import { Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as MinusIcon } from '@mui/icons-material';

function StackController({
  handleChange
}) {
  const rowContainerStyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center'
  };

  const [stackSize, setStackSize] = useState(1);
  const rowItemStyle = { marginRight: 4 };
  return (
    <div style={rowContainerStyle}>
      <Typography style={rowItemStyle}>
        Quantity:
      </Typography>
      <IconButton
        disabled={stackSize === 1}
        style={rowItemStyle}
        onClick={()=>{
          let newSize = stackSize - 1;
          setStackSize(newSize);
          handleChange(newSize);
        }}
        size="large">
        <MinusIcon />
      </IconButton>
      <Typography variant="h6" style={rowItemStyle}>
        {stackSize}
      </Typography>
      <IconButton
        disabled={stackSize === 12}
        style={rowItemStyle}
        onClick={()=>{
          let newSize = stackSize + 1;
          setStackSize(newSize);
          handleChange(newSize);
        }}
        size="large">
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default StackController;
