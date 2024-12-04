import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import AttackDie from './AttackDie';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  column: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    flexGrow: 1
  }
}));

function RollerResults({isRolling, results}) {
  const classes = useStyles();

  console.log('results:', JSON.stringify(results));
  
  return (
    <div className={classes.column}>
      <div className={classes.row}>
        {results.red.map((result, i) => (
          <AttackDie
            key={`red_${result}_${i}`}
            color="red"
            faceIndex={result}
            isRolling={isRolling}
          />
        ))}
      </div>
      <div className={classes.row}>
        {results.black.map((result, i) => (
          <AttackDie
            key={`black_${result}_${i}`}
            color="black"
            faceIndex={result}
            isRolling={isRolling}
          />
        ))}
      </div>
      <div className={classes.row}>
        {results.white.map((result, i) => (
          <AttackDie
            key={`white_${result}_${i}`}
            color="white"
            faceIndex={result}
            isRolling={isRolling}
          />
        ))}
      </div>
    </div>
  );
};

export default RollerResults;
