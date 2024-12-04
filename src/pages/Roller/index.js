import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, Typography } from '@material-ui/core';
import ControlPanel from './ControlPanel';
import AttackDie from './AttackDie';
import RollerResults from './RollerResults';

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

function Stats() {
  const classes = useStyles();
  const [isRolling, setIsRolling] = useState(false);

  const [rollerState, setRollerState] = useState({
    redCount: 0,
    blackCount: 0, 
    whiteCount: 0,
    attackSurge: "none",
    defenseColor:"white",
    cover:1
  });


  const [results, setResults] = useState({red:[], black:[], white:[]});

  const handleControlChange = (newState)=>{
    setRollerState({...newState});
  }
  
  const handleRollDice = () => {
    setIsRolling(true);
    let newResults = {};
    newResults.red = [];
    newResults.black = [];
    newResults.white = [];

    for(let i=0; i< rollerState.redCount; i++){
      newResults.red.push(getRandomInt(16));
    }
    for(let i=0; i< rollerState.blackCount; i++){
      newResults.black.push(getRandomInt(16));
    }
    for(let i=0; i< rollerState.whiteCount; i++){
      newResults.white.push(getRandomInt(16));
    }

    setResults(newResults);
    console.log('rolled', JSON.stringify(newResults));
   
    setTimeout(() => setIsRolling(false), 500);
  }

  console.log('index results', JSON.stringify(results));
  return (
    <div className={classes.column}>
      <div className={classes.row}>
        <Typography variant="h5">
          Dice Roller
        </Typography>
      </div>
      <div className={clsx(classes.row, classes.column)}>
        <ControlPanel
          rollerState = {rollerState}
          onControlChange = {handleControlChange}
          handleRollDice={handleRollDice}
        />
      </div>
      <RollerResults isRolling={isRolling} results={results}></RollerResults>
    </div>
  );
};

export default Stats;
