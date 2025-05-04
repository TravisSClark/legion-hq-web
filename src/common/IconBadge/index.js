import React from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { Typography } from '@mui/material';
import ranks from 'constants/ranks';
import upgradeTypes from 'constants/upgradeTypes';

const PREFIX = 'IconBadge';

const classes = {
  outerRowContainer: `${PREFIX}-outerRowContainer`,
  innerColumnContainer: `${PREFIX}-innerColumnContainer`,
  numberSpan: `${PREFIX}-numberSpan`,
  imageSpan: `${PREFIX}-imageSpan`,
  typography: `${PREFIX}-typography`,
  smallTypography: `${PREFIX}-smallTypography`,
  image: `${PREFIX}-image`,
  hidden: `${PREFIX}-hidden`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.outerRowContainer}`]: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: -10
  },

  [`& .${classes.innerColumnContainer}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  [`& .${classes.numberSpan}`]: {
    width: 22,
    height: 22,
    borderRadius: 25,
    left: 12,
    backgroundColor: 'white',
    position: 'relative',
    border: '1px solid #1e2125'
  },

  [`& .${classes.imageSpan}`]: {
    width: 22,
    height: 22,
    borderRadius: 25,
    left: 12,
    top: 1,
    backgroundColor: 'white',
    position: 'relative',
    border: '1px solid #1e2125'
  },

  [`& .${classes.typography}`]: { bottom: 2, left: 6, color: 'black', position: 'relative' },
  [`& .${classes.smallTypography}`]: { bottom: 2, left: 1.5, color: 'black', position: 'relative' },
  [`& .${classes.image}`]: { width: 20, height: 20 },
  [`& .${classes.hidden}`]: { visibility: 'hidden' }
}));

function IconBadge({ avatar, count = 1, upgradeType, rank }) {

  let alt = ''; let src = '';
  if (upgradeType && upgradeType in upgradeTypes) {
    alt = upgradeType;
    src = upgradeTypes[upgradeType].icon;
  } else if (rank && rank in ranks) {
    alt = rank;
    src = ranks[rank].icon;
  }
  return (
    <Root className={classes.outerRowContainer}>
      <div className={classes.innerColumnContainer}>
        <span
          className={clsx(classes.numberSpan, {
            [classes.hidden]: count < 2
          })}
        >
          <Typography
            variant="button"
            className={clsx(
              { [classes.typography]: count < 10 },
              { [classes.smallTypography]: count > 9 }
            )}
          >
            {count}
          </Typography>
        </span>
        <span className={classes.imageSpan}>
          <img alt={alt} src={src} className={classes.image} />
        </span>
      </div>
      {avatar}
    </Root>
  );
}

export default IconBadge;
