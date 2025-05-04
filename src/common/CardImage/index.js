import React from 'react';
import { styled } from '@mui/material/styles';
import { Skeleton } from '@mui/material';
import cards from 'constants/cards';
import urls from 'constants/urls';

const PREFIX = 'CardImage';

const classes = {
  container: `${PREFIX}-container`,
  unit: `${PREFIX}-unit`,
  upgrade: `${PREFIX}-upgrade`,
  command: `${PREFIX}-command`,
  flaw: `${PREFIX}-flaw`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.container}`]: {
    marginRight: 4,
    zIndex: 1,
    '&:hover': {
      opacity: 0.75,
      transition: '.25s ease',
      cursor: 'help'
    }
  },

  [`& .${classes.unit}`]: { width: 210, height: 150 },
  [`& .${classes.upgrade}`]: { width: 'auto', height: 150 },
  [`& .${classes.command}`]: { width: 150, height: 210 },
  [`& .${classes.flaw}`]: { width: 'auto', height: 150 }
}));

function CardImage({ id, handleClick }) {
  const card = cards[id];

  return (
    <Root className={classes.container}>
      <img
        alt={card.cardName}
        src={`${urls.cdn}/${card.cardType}Cards/${card.imageName}`}
        loader={<Skeleton className={classes[card.cardType]} />}
        className={classes[card.cardType]}
        onClick={handleClick}
      />
    </Root>
  );
}

export default CardImage;
