import React from 'react';
import { Chip, Typography } from '@material-ui/core';

function PointsChip({ size="small", value, compact }) {

  // TODO still thinking on how 'compact' should be. Would be ideal to reduce size basedon 
  let label = value + ' point';
  label += value === 1 ? "":"s";

  if(compact) label = value+" pts";
  return (
    <Chip
      size={size}
      label={<Typography variant="body2">{label}</Typography>}
      style={{ marginBottom: 4, marginRight: 4 }}
    />
  );
}

export default PointsChip;
