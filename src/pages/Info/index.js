import React from 'react';
import { Typography } from '@mui/material';

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
          Currently being supported by darjim and grabnar6 on Discord.
        </Typography>
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
          All game images, character names, and game pieces are © AMG & © Disney.
        </Typography>
        <Typography>
          Full art upgrade cards created by {' '}
          <a
            href="https://www.reddit.com/r/SWlegion/comments/1eb3oz9/following_on_from_ugoober413s_resized_upgrade/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button"
            style={{ textDecoration: 'none', color: 'lightblue' }}
          >
            u/CptStanhope
          </a>
          .
        </Typography>
        <Typography>
          If you enjoy LegionHQ, kindly also support and watch {' '} 
          <a
            href="https://www.youtube.com/@crit2block"
            style={{ textDecoration: 'none', color: 'lightblue' }}
          >
            Crit2Block
          </a>
          &nbsp;and&nbsp;
          <a
            href="https://www.youtube.com/@kokozula"
            style={{ textDecoration: 'none', color: 'lightblue' }}
          >
            Kokozula 
          </a>
          &nbsp;on YouTube.
        </Typography>
      </div>
    </div>
  );
};

export default Info;
