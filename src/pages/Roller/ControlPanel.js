import React, { useState,  } from 'react';
import { Typography, Button, Checkbox, makeStyles, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, MenuItem, Select, InputLabel } from '@material-ui/core';
import DiceCountPicker from './DiceCountPicker';
import { Check } from '@material-ui/icons';
import { useRoller, useRollerDispatch } from './RollerContext';

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
  },
  radio: {
    '&$checked': {
      color: 'white'
    }
  },
  checked: {}
}));

function ControlPanel() {

  const roller = useRoller();
  const dispatch = useRollerDispatch()

  const parameters = roller.parameters;
  const [isDisabled, setIsDisabled] = useState(false);
  const classes = useStyles();

  function onControlChange(parameters){
    dispatch({
      type:"updateParameters",
      parameters
    })
  }

  console.log('params', JSON.stringify(parameters));

  const radio = <Radio classes={{root:classes.radio, checked: classes.checked}}/>;
  return (
    <div style={{ padding: 16, width: 'calc(100% + 100px)' }}>
      <div
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center', 
          // alignItems:'flex-start'
        }}
      >
        <Typography>
          Attack Dice
        </Typography>
        <DiceCountPicker color="red"   numDice={parameters.redCount}   handleSetDice={(value)=>onControlChange({ redCount:value })} />
        <DiceCountPicker color="white" numDice={parameters.whiteCount}   handleSetDice={(value)=>onControlChange({ whiteCount:value })} />
        <DiceCountPicker color="black" numDice={parameters.blackCount} handleSetDice={(value)=>onControlChange({ blackCount:value })} />

        <FormControl>
          <InputLabel id="surge-select-label">Surge</InputLabel>
          <Select
            labelId="surge-select-label"
            id="surge-select"
            value={parameters.attackSurge}
            onChange={(e)=>onControlChange({attackSurge:e.target.value})}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="hit">Hit</MenuItem>
            <MenuItem value="crit">Crit</MenuItem>
            <MenuItem value="tokens">Surge Tokens</MenuItem>

          </Select>
        </FormControl>
        <Divider style={{ marginLeft: 8, flexGrow: 1 }} />

        <Typography>
          Defender
        </Typography>
          <FormControl sx={{m:1, minWidth:200}} size="medium">
            <InputLabel id="def-select-label">Defense Dice</InputLabel>
            <Select
              labelId="def-select-label"
              id="def-select"
              value={parameters.defenseDice}
              width={200}
              onChange={(e)=>onControlChange({defenseDice:e.target.value})}
            >
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="white">White</MenuItem>
            </Select>
            <div className={classes.row}>
              <Checkbox checked={parameters.defenseSurge} color='primary' 
                onChange={(e)=>onControlChange({defenseSurge:e.target.checked})}/>
              <Typography>Surge : Block</Typography>
            </div>
          </FormControl>

          <FormControl>
          <InputLabel id="cover-select-label">Cover</InputLabel>
          <Select
            labelId="cover-select-label"
            id="cover-select"
            value={parameters.cover}
            onChange={(e)=>onControlChange({cover:e.target.value})}
          >
            <MenuItem value={0}>None</MenuItem>
            <MenuItem value={1}>Light</MenuItem>
            <MenuItem value={2}>Heavy</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          disabled={isDisabled}
          style={{ marginTop: 8 }}
          onClick={() => {
            dispatch({type:'rollDice'})
          }}
        >
          Roll!
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
