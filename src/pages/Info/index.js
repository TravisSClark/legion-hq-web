import React from 'react';
import { Typography } from '@material-ui/core';

function Info() {
  return (
    <div
      style={{
        height: 'calc(100vh - 60px)',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography>
          Questions, comments, or concerns can be sent to {' '}
          <a
            href="mailto:crit2block@gmail.com"
            style={{ textDecoration: 'none', color: 'lightblue' }}
          >
            crit2block@gmail.com
          </a>
          .
        </Typography>
        <Typography>
          All game images, character names, and game pieces are © FFG & © Disney. Full art upgrade cards created by u/CptStanhope.
        </Typography>
      </div>
    </div>
  );
};

export default Info;
