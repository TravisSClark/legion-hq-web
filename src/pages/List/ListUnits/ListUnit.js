import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UnitAvatar from 'common/UnitAvatar';
import CardName from 'common/CardName';
import UnitPoints from 'common/UnitPoints';
import UnitActions from './UnitActions';
import UnitUpgrades from './UnitUpgrades';
import UnitContext from 'context/UnitContext';
import ListContext from 'context/ListContext';
import { Grid, Input, Paper, TextField, Typography } from '@material-ui/core';

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

function ListUnit({
  counterpartUnit,
  addCounterpartHandler,
}) {
  const classes = useStyles();

  const {unit, unitIndex, unitCard} = useContext(UnitContext);
  const {handleCardZoom, mode} = useContext(ListContext);

  console.log('unit is ', JSON.stringify(unit));

  const highestUnitError = unit.validationIssues ? unit.validationIssues.reduce((hi, i)=>{return i.level > hi ? i.level : hi}, 0) : 0;

  let bgColor = 'transparent';
  if(highestUnitError === 2){
    bgColor ='#6e1303'
  }else if(highestUnitError === 1){
    bgColor = "#550"
  }

  let unitListItem = (
    <div className={classes.unitColumn} style={{backgroundColor: bgColor, borderRadius:10}}>
      <div className={classes.unitRow}>
        <div className={classes.leftCell}>
          <UnitAvatar
            key="avatar"
            id={unitCard.id}
            count={unit.count}
            handleClick={() => handleCardZoom(unit.unitId)}
          />
        </div>
        <div className={classes.middleCell}>
          <CardName key="name" id={unitCard.id} />
          <UnitUpgrades
            key="upgrades"
            counterpartId={unitCard.counterpartId}
            addCounterpartHandler={addCounterpartHandler}
          />          
        </div>
        <div className={classes.rightCell}>
          <UnitPoints key="points" unit={unit} />
          <UnitActions unit={unit} unitIndex={unitIndex} />
        </div>
      </div>
      {counterpartUnit}
    </div>
  );

  if(mode !== "tour-of-duty"){
    return unitListItem;
  }

  let dossier = (
    <div >
      <TextField
        value={unit.dossierName}
        // onChange={handleChange}
      />      
      {unitListItem}
      {/* <div style={{diplay:'flex', flex:1, flexDirection:"row"}}>
        
        <div style={{display:'flex',  flex:'0 1', flexGrow:0, flexDirection:"column"}}>
          <div style={{display:"flex", flex:'0 1'}}>Commendations</div>
        </div>
        <div style={{display:'flex', flex:"0 1", flexGrow:0, flexDirection:"column"}}>
          <div style={{display:"flex", flex:'0 1'}}>Setbacks</div>
        </div>
      </div> */}

      <Grid container spacing={4}>
        <Grid size={6}>
            <Paper>Commendations</Paper>
        </Grid>
        <Grid size={6}>
          <Paper>Setbacks</Paper>
        </Grid>

      </Grid>

      <div style={{flex:1, flexFlow:"row"}}>
        <Typography>Veteran Level</Typography>
        <TextField></TextField>

        <Typography>XP</Typography>
        <Input variant="number"></Input>

      </div>
    </div>
  )

  return dossier;
};

export default ListUnit;
