import React, { useState } from 'react';
import { Chip, Typography } from '@material-ui/core';

export default function DossierItem({text, type, onDelete}) {

  return (
   <Chip
      // size={chipSize}
      label={
        <Typography variant="body2">
          {`${text}`}
        </Typography>
      }
      sx={[
        {
          "& .MuiChip-label": {
            padding: 2,
            backgroundColor: "red",
          },
        },
      ]}
      style={{ marginRight: 4, marginTop: 4, marginBottom: 6, height: "auto" }}
      onDelete={() =>{
        onDelete()
      }}
    />
  );
}