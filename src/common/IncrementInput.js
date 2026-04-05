import React from 'react';
import {  IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  PlusOne as PlusOneIcon,
  ExposureNeg1 as MinusOneIcon,
  Add, 
  Remove
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center'
  }
}));

function IncrementInput({
  label,
  value,
  onIncrement,
  onDecrement
}) {

  const classes = useStyles();
  const fontSize = 26;

  return(
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <Typography>{label}</Typography>
      <div className={classes.buttons}>
        <React.Fragment>
          <IconButton
            size="small"
            onClick={()=>onDecrement()}
          >
            <Remove style={{ fontSize }} />
          </IconButton>
          <div>
            <Typography style={{ fontSize }} >{value}</Typography>
          </div>
          <IconButton
            size="small"
            onClick={()=>onIncrement()}
          >
            <Add style={{ fontSize }} />
          </IconButton>
        </React.Fragment>
      </div>
    </div>
  );
};

export default IncrementInput;
