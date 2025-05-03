import React from 'react';
import { Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import cards from 'constants/cards';
import urls from 'constants/urls';

const useStyles = makeStyles(theme => ({
  container: {
    marginRight: 4,
    zIndex: 1,
    '&:hover': {
      transition: '.25s ease',
      cursor: 'pointer',
      opacity: 0.75
    }
  },
  unit: { width: 210, height: 150 },
  upgrade: { width: 'auto', minWidth: 96, height: 150 },
  command: { width: 150, height: 210 },
  counterpart: { width: 210, height: 150 },
  flaw: { width: 'auto', height: 150 }
}));

function CardImage({ id, handleClick }) {
  const card = cards[id];
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img
        alt={card.cardName}
        src={`${urls.cdn}/${card.cardType}Cards/${card.imageName}`}
        loader={<Skeleton variant="rectangular" className={classes[card.cardType]} />}
        className={classes[card.cardType]}
        onClick={handleClick}
      />
    </div>
  );
};

export default CardImage;
