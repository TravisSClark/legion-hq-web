import React, { useState,  } from 'react';
import { Typography, Button, Checkbox, makeStyles, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, MenuItem, Select, InputLabel } from '@material-ui/core';
import DiceCountPicker from './DiceCountPicker';
import { Check } from '@material-ui/icons';

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

function ControlPanel({
  parameters,
  onControlChange,
  handleRollDice
}) {

  const {redCount, blackCount, whiteCount} = parameters;
  const [isDisabled, setIsDisabled] = useState(false);
  const [surgeTokenCount, setSurgeTokenCount] = useState(0);
  const classes = useStyles();


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
        <DiceCountPicker color="red"   numDice={redCount}   handleSetDice={(value)=>onControlChange({...parameters, redCount:value})} />
        <DiceCountPicker color="white" numDice={whiteCount}   handleSetDice={(value)=>onControlChange({...parameters, whiteCount:value})} />
        <DiceCountPicker color="black" numDice={blackCount} handleSetDice={(value)=>onControlChange({...parameters, blackCount:value})} />

        <FormControl>
          <InputLabel id="surge-select-label">Surge</InputLabel>
          <Select
            labelId="surge-select-label"
            id="surge-select"
            value={parameters.attackSurge}
            label="Surge"
            onChange={(e)=>onControlChange({...parameters, attackSurge:e.target.value})}
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
              value={parameters.defenseColor}
              width={200}
              onChange={(e)=>onControlChange({...parameters, attackSurge:e.target.value})}
            >
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="white">White</MenuItem>
            </Select>
            <div className={classes.row}>
              <Checkbox color='primary'/>
              <Typography>Surge : Block</Typography>
            </div>
          </FormControl>

        <FormControl>
          <FormLabel>Cover</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="none"
            name="radio-buttons-group"
            value={parameters.cover}
            onChange={(e)=>onControlChange({...parameters, cover:e.target.value})}
          >
            <FormControlLabel value="none" control={radio} label="None" />
            <FormControlLabel value="light" control={radio} label="Light" />
            <FormControlLabel value="heavy" control={radio} label="Heavy" />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          disabled={isDisabled}
          style={{ marginTop: 8 }}
          onClick={() => {
            // setIsDisabled(true);
            handleRollDice();
            setTimeout(() => setIsDisabled(false), 500);
          }}
        >
          Roll!
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
