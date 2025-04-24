import React from 'react';
import clsx from 'clsx';
import { makeStyles, Typography } from '@material-ui/core';
import ControlPanel from './ControlPanel';
import AttackDie from './AttackDie';
import RollerResults from './RollerResults';
import {RollerProvider} from './RollerContext';

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


function Roller() {
  const classes = useStyles();

  return (
    <RollerProvider>
      <div className={classes.column}>
        <div className={classes.row}>
          <Typography variant="h5">
            Dice Roller
          </Typography>
        </div>
        <div className={clsx(classes.row, classes.column)}>
          <ControlPanel />
        </div>
        <RollerResults/>
      </div>
    </RollerProvider>
  );
};

export default Roller;
