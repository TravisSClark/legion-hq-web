import React from 'react';
import Typography from '@mui/material/Typography';
import cards from 'constants/cards';

function CardName({ id}) {
  const card = cards[id];
  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
      <Typography style={{flex:1}}>
        {card.displayName ? card.displayName : card.cardName} ({card.cost})
      </Typography>
    </div>
  );
};

export default CardName;
