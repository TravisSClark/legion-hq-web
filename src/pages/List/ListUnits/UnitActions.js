import React, { useContext, useState } from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  PlusOne as PlusOneIcon,
  Add as PlusIcon,
  Remove as NegativeIcon,
  Remove as MinusOneIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Icon as IconifyIcon } from '@iconify/react';
import ListContext from 'context/ListContext';
import { unitHasUniques } from 'components/eligibleCardListGetter';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    minWidth: '72px'
  },
  buttonsMobile: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignContent:'center',
    minWidth: '72px'
  }
}));

function UnitActions({
  unit,
  unitIndex,
  isCounterpart = false
}) {

  // TODO - at some point, might want to move this into listcontext; 
  // in current state (hah!), it doesn't handle a list edit while changing kill points
  const [numKilled, setNumKilled] = useState(0);
  const classes = useStyles();
  const fontSize = 26;

  const {width, isKillPointMode, handleDecrementUnit, handleIncrementUnit, handleRemoveCounterpart, handleAddKillPoints} = useContext(ListContext);
  // TODO; should cascade this via context
  const isMobile = width === 'xs';

  if (isKillPointMode) {
    if(isCounterpart)
      return null;    

    const killPointsPlus = (
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          if(numKilled < unit.count){
            setNumKilled(numKilled + 1);
            handleAddKillPoints(unit.totalUnitCost / unit.count);
          }
        }}
        disabled={numKilled >= unit.count}
        style={{ marginLeft: 1, marginRight: 2 }}
      >
        <PlusIcon style={{ fontSize: 13 }} />
        <IconifyIcon style={{ fontSize: 21 }} icon="fa-solid:skull-crossbones" />
        <Typography
          variant="caption"
          style={{ marginLeft: 2 }}
        >
          {numKilled}/{unit.count}
        </Typography>
      </Button>
    );

    const killPointsMinus = (
      <Button
        size="small"
        onClick={() => {
          if(numKilled > 0){
            setNumKilled(numKilled - 1);
            handleAddKillPoints( -1* unit.totalUnitCost / unit.count);
          }
        }}
        disabled={numKilled <= 0}
        style={{ marginLeft: 2, marginRight: 1 }}
      >
        <NegativeIcon style={{ fontSize: 13 }} />
        <IconifyIcon style={{ fontSize: 21 }} icon="fa-solid:skull-crossbones" />
      </Button>
    );

    if(!isMobile){
      return (
        <div className={classes.buttons}>
          {killPointsMinus}
          {killPointsPlus}
        </div>
      );
    } else {
      return (
        <div className={classes.buttonsMobile}>
          {killPointsPlus}
          {killPointsMinus}
        </div>
      );
    }
  } else {

    let hasUniques = unitHasUniques(unit);

    return(
      <div className={classes.buttons}>
        {!hasUniques && !isCounterpart ? (
          <React.Fragment>
            <IconButton
              size="small"
              onClick={()=>handleDecrementUnit(unitIndex)}
              style={{ marginLeft: 2, marginRight: 1 }}
            >
              <MinusOneIcon style={{ fontSize }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={()=>handleIncrementUnit(unitIndex)}
              style={{ marginLeft: 1, marginRight: 2 }}
            >
              <PlusOneIcon style={{ fontSize }} />
            </IconButton>
          </React.Fragment>
        ) : (
          <IconButton
            size="small"
            onClick={()=>{
              if(isCounterpart)
                handleRemoveCounterpart(unitIndex);
              else 
                handleDecrementUnit(unitIndex);
            }}
          >
            <DeleteIcon style={{ fontSize }} />
          </IconButton>
        )}
      </div>
    );
  }
};

export default UnitActions;
