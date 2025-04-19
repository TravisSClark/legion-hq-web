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


function Stats() {
  const classes = useStyles();
  const [isRolling, setIsRolling] = useState(false);


  // This would probably be better as a Context
  const [parameters, setParameters] = useState({redCount:0, blackCount:0, whiteCount:0});

  const handleControlChange = (newState)=>{

    console.log('changestate', newState);

    setParameters({...newState});
  }
  
  

  return (
    <div className={classes.column}>
      <div className={classes.row}>
        <Typography variant="h5">
          Dice Roller
        </Typography>
      </div>
      <div className={clsx(classes.row, classes.column)}>
        <ControlPanel
          onControlChange = {(v)=>handleControlChange(v)}
          handleRollDice={()=>setIsRolling(true)}
          parameters={parameters}
        />
      </div>
      <RollerResults onResultsReady={()=>setIsRolling(false)} isRolling={isRolling} parameters={parameters}></RollerResults>
    </div>
  );
};

export default Stats;
