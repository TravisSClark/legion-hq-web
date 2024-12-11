import React from 'react';
import { Typography, Button, Checkbox, makeStyles, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
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
  rollerState,
  onControlChange,
  handleRollDice
}) {

  const {redCount, blackCount, whiteCount} = rollerState;
  const [isDisabled, setIsDisabled] = React.useState(false);
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
        <DiceCountPicker color="red"   numDice={redCount}   handleSetDice={(value)=>onControlChange({...rollerState, redCount:value})} />
        <DiceCountPicker color="black" numDice={blackCount} handleSetDice={(value)=>onControlChange({...rollerState, blackCount:value})} />
        <DiceCountPicker color="white" numDice={whiteCount}   handleSetDice={(value)=>onControlChange({...rollerState, whiteCount:value})} />

        <FormControl>
            <FormLabel id="radio-cover">Surge</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="none"
              name="radio-cover-group"
              value={rollerState.attackSurge}
              onChange={(e)=>onControlChange({...rollerState, attackSurge:e.target.value})}
            >
              <FormControlLabel value="none" control={radio} label="None" />
              <FormControlLabel value="hit" control={radio} label="Hit" />
              <FormControlLabel value="crit" control={radio} label="Crit" />
            </RadioGroup>
          </FormControl>
       

        <Divider style={{ marginLeft: 8, flexGrow: 1 }} />

        <Typography>
          Defender
        </Typography>

        <div className={classes.row}>

          <FormControl>
            <FormLabel id="radio-cover">Dice</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="red"
              name="radio-cover-group"
              value={rollerState.defenseColor}
              onChange={(e)=>onControlChange({...rollerState, defenseColor:e.target.value})}
            >
              <FormControlLabel value="red" control={radio}label="Red" />
              <FormControlLabel value="white" control={radio} label="White" />
            </RadioGroup>
          </FormControl>

          <div className={classes.row}>
            <Checkbox color='primary'/>
            <Typography>Surge : Block</Typography>
          </div>
        </div>

        <FormControl>
          <FormLabel>Cover</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="none"
            name="radio-buttons-group"
            value={rollerState.cover}
            onChange={(e)=>onControlChange({...rollerState, cover:e.target.value})}
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
            setIsDisabled(true);
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
