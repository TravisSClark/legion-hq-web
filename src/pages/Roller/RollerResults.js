import React, { useRef, useState } from 'react';
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const handleRollDice = (rollerState) => {
  let newResults = {};
  newResults.red = [];
  newResults.black = [];
  newResults.white = [];

  for(let i=0; i< rollerState.redCount; i++){
    newResults.red.push(getRandomInt(8));
  }
  for(let i=0; i< rollerState.blackCount; i++){
    newResults.black.push(getRandomInt(8));
  }
  for(let i=0; i< rollerState.whiteCount; i++){
    newResults.white.push(getRandomInt(8));
  }

  console.log('rolled', JSON.stringify(newResults));
 
  // setTimeout(() => setIsRolling(false), 500);

  return newResults;
}

function RollerResults({isRolling, parameters, onResultsReady}) {
  const classes = useStyles();
  let hasRolled = useRef(false);

  const [results, setResults] = useState({})

  console.log(isRolling, parameters)

  if(!hasRolled.current && !isRolling){
    return null;
  }


  if(isRolling){
    setResults(handleRollDice(parameters));
    onResultsReady();

    hasRolled.current = true;
    return null;
  }

  return (
    <div className={classes.column}>
      <div className={classes.row}>
        {results.red?.map((result, i) => (
          <AttackDie
            key={`red_${result}_${i}`}
            color="red"
            faceIndex={result}
            isRolling={isRolling}
          />
        ))}
      </div>
      <div className={classes.row}>
        {results.black?.map((result, i) => (
          <AttackDie
            key={`black_${result}_${i}`}
            color="black"
            faceIndex={result}
            isRolling={isRolling}
          />
        ))}
      </div>
      <div className={classes.row}>
        {results.white?.map((result, i) => (
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
