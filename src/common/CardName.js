import React from 'react';
import Typography from '@material-ui/core/Typography';
import cards from 'constants/cards';

function CardName({ id, variant = 'body1' }) {
  const card = cards[id];
  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
      <Typography variant={variant}>
        {card.displayName ? card.displayName : card.cardName} 
      </Typography>
      <Typography style={{marginLeft:5}} >({card.cost})</Typography>
    </div>
  );
};

export default CardName;
