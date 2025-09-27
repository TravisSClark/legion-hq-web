import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UnitAvatar from 'common/UnitAvatar';
import CardName from 'common/CardName';
import UnitPoints from 'common/UnitPoints';
import UnitActions from './UnitActions';
import UnitUpgrades from './UnitUpgrades';
import UnitContext from 'context/UnitContext';
import ListContext from 'context/ListContext';
import { Grid, Input, Paper, TextField, Typography, Box, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  unitRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    borderTop: '1px solid rgba(255,255,255,0.12)'
  },
  unitColumn: { display: 'flex', flexFlow: 'column nowrap' },
  leftCell: { marginRight: 4 },
  counterpart: { marginLeft: 20 },
  middleCell: {
    flex: 1,
    marginRight: 2,
    display: 'flex',
    flexFlow: 'column nowrap',
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  rightCell: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    borderLeft: '1px solid rgba(255,255,255,0.12)'
  }
}));

function DossierEntry({type, unit}){

  let dossierArray = unit.dossier[type.toLowerCase()]

}

function Dossier({
  counterpartUnit,
  addCounterpartHandler,
  unitListItem
}) {
  const classes = useStyles();

  const {unit, unitIndex, unitCard} = useContext(UnitContext);
  const {setCardPaneFilter, handleCardZoom, mode} = useContext(ListContext);

  console.log('unit is ', JSON.stringify(unit));

  const highestUnitError = unit.validationIssues ? unit.validationIssues.reduce((hi, i)=>{return i.level > hi ? i.level : hi}, 0) : 0;

  let bgColor = 'transparent';
  if(highestUnitError === 2){
    bgColor ='#6e1303'
  }else if(highestUnitError === 1){
    bgColor = "#550"
  }

  let vetRank = 3;


  console.log("unit", JSON.stringify(unit));


  let dossier = unit.dossier;

  return (
    <div >
      <TextField
        value={unit.dossierName}
        label="Dossier Name"
        // onChange={handleChange}
      />      
      {unitListItem}

      <Grid
        container
        direction="row"
        alignItems="start"
      >  
        <Grid item xs={3}>
          <TextField label="XP" type="number" value={5} onChange={()=>{}} inputProps={{step:1}}/>
        </Grid>
        <Grid item xs={3}>
          <div>Veteran Rank</div>
          <div style={{display:'flex', flexDirection:'row'}}>
          { Array(vetRank).fill(<div>*</div>)}
          </div>
        </Grid>
        <Grid item xs={6}>
          {/* Spend Supply */}
        </Grid>
        <Grid item xs={6}>
            <div>Commendations</div>
            {dossier?.commendations.map(c=>{return <div>{c}</div>})}
            <Button onClick={()=>{
               setCardPaneFilter({
                  action: 'COMMENDATIONS',
                  unitIndex, 
                })
            }}>Add</Button>
        </Grid>
        <Grid item xs={6}>
          <div>Setbacks</div>
        </Grid>

      </Grid>
    </div>
  )
};

export default Dossier;
