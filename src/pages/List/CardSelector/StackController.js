import React, { useState } from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { Add as AddIcon, Remove as MinusIcon } from '@material-ui/icons';

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
      >
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
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default StackController;
