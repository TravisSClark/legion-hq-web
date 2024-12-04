import React from 'react';
import { Typography, Button, Slider, Input, TextField } from '@material-ui/core';
import symbols from 'constants/symbols';
import NumberInput from '../../common/NumberInput';

function valuetext(value) {
  return `${value} dice`;
}

export default function DiceCountPicker({
  numDice,
  color,
  handleSetDice,
}) {
  const { attack } = symbols;
  const { red, black, white } = attack;

  let icon = red;
  switch(color){
    case 'black':
      icon=black;
      break;
    case 'white':
      icon=white;
      break;
  }

  return (
    <div style={{ display: 'flex', flexDirection:'row', width: '100%', marginBottom: 4, alignItems:'center' }}>
      <img
        alt={color+" attack die"}
        src={icon}
        style={{ height: 28, marginRight: 12 }}
      />
      <TextField
          id="outlined-number"
          type="number"
          style={{width:80, marginRight:10}}
          onChange={(e)=>{
            let value= parseInt(e.target.value);
            if(value > -1){
              handleSetDice(value);
            }else{
              handleSetDice(0);
            }
          }}
          value={numDice}
      />  
      
      <Slider
        marks
        step={1}
        min={0}
        max={15}
        value={numDice}
        defaultValue={0}
        valueLabelDisplay="auto"
        getAriaValueText={() => valuetext(1)}
        onChange={(e, value) => {
          handleSetDice(value)}}
        style={{marginRight:10}}
      />
       
    
    </div>
  );
};
