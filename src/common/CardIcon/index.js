import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Skeleton } from '@mui/material';
import urls from 'constants/urls';

const useStyles = makeStyles(theme => ({
  card: { width: 315, marginRight: 4, marginBottom: 4 },
  large: { width: 62.5, height: 50 },
  medium: { width: 50, height: 40 },
  small: { width: 40, height: 32 },
  image: { objectFit: 'cover', marginLeft: 0, borderRadius: 25 },
  imageHover: { '&:hover': { cursor: 'pointer' } }
}));

function CardIcon({
  size = 'large',
  handleClick,
  card
}) {
  const classes = useStyles();
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
};

export default CardIcon;
