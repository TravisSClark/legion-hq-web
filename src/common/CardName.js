import React from 'react';
import Typography from '@material-ui/core/Typography';
import cards from 'constants/cards';

function CardName({ id, variant = 'body1' }) {
  const card = cards[id];
  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
      <Typography variant={variant}>
        {card.displayName ? card.displayName : card.cardName} 
      </Typography>
      <Typography>({card.cost})</Typography>
    </div>
  );
};

export default CardName;
