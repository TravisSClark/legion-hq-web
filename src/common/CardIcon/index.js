import React from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { Skeleton } from '@mui/material';
import urls from 'constants/urls';

const PREFIX = 'CardIcon';

const classes = {
  card: `${PREFIX}-card`,
  large: `${PREFIX}-large`,
  medium: `${PREFIX}-medium`,
  small: `${PREFIX}-small`,
  image: `${PREFIX}-image`,
  imageHover: `${PREFIX}-imageHover`
};

const Root = styled('img\r\n')((
  {
    theme
  }
) => ({
  [`& .${classes.card}`]: { width: 315, marginRight: 4, marginBottom: 4 },
  [`& .${classes.large}`]: { width: 62.5, height: 50 },
  [`& .${classes.medium}`]: { width: 50, height: 40 },
  [`& .${classes.small}`]: { width: 40, height: 32 },
  [`& .${classes.image}`]: { objectFit: 'cover', marginLeft: 0, borderRadius: 25 },
  [`& .${classes.imageHover}`]: { '&:hover': { cursor: 'pointer' } }
}));

function CardIcon({
  size = 'large',
  handleClick,
  card
}) {

  const placeholder = (
    <Skeleton
      variant="rectangular"
      className={classes[size]}
      style={{ borderRadius: 25 }}
    />
  );
  return (
    <img
      decode={false}
      alt={card.cardName}
      src={`${urls.cdn}/${card.cardType}Icons/${card.imageName}`}
      style={{ scale: 5 }}
      loader={placeholder}
      className={clsx(classes.image, classes[size], {
        [classes.imageHover]: handleClick !== undefined
      })}
      onClick={handleClick}
    />
  );
}

export default CardIcon;
