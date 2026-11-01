import React from 'react';
import { Chip } from '@mui/material';

function ChipCard({ card, handleClick, chipSize='medium', handleDelete }) {
  const { cardName, displayName } = card;
  let pips = '';
  const subtypeInt = parseInt(card.cardSubtype);
  for(let i=0; subtypeInt && i<subtypeInt; i++){
    pips += '•';
  }

  let label = displayName ? displayName : cardName;
  if (pips) label = `${pips} ${label}`;
  return (
    <Chip
      clickable
      size={chipSize}
      label={label}
      onClick={handleClick}
      onDelete={handleDelete}
      style={{ marginBottom: 4, marginLeft: 4 }}
    />
  );
};

export default ChipCard;
