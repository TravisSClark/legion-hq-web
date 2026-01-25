import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UnitAvatar from 'common/UnitAvatar';
import CardName from 'common/CardName';
import UnitPoints from 'common/UnitPoints';
import UnitActions from '../UnitActions';
import UnitContext from 'context/UnitContext';
import ListContext from 'context/ListContext';
import { Grid, TextField, Button } from '@material-ui/core';
import DossierUpgrades from '../DossierUpgrades';
import DossierItem from './DossierItem';

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

function Dossier({
  counterpartUnit,
  addCounterpartHandler,
}) {
  const classes = useStyles();

  const {unit, unitIndex, unitCard} = useContext(UnitContext);
  const {setCardPaneFilter, handleCardZoom, handleRemoveDossierItem, handleXpUpdate, mode} = useContext(ListContext);

  console.log('unit is ', JSON.stringify(unit));

  const highestUnitError = unit.validationIssues ? unit.validationIssues.reduce((hi, i)=>{return i.level > hi ? i.level : hi}, 0) : 0;

  let bgColor = 'transparent';
  if(highestUnitError === 2){
    bgColor ='#6e1303'
  }else if(highestUnitError === 1){
    bgColor = "#550"
  }

  let dossier = unit.dossier;

  return (
    <div >
      <TextField
        value={unit.dossierName}
        label="Dossier Name"
        // onChange={handleChange}
      />      
      {/* TODO for now this is a copy of unitListItem - maybe fold it back in, probably not with how upgrades work */}
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
            <DossierUpgrades
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

      <Grid
        container
        direction="row"
        alignItems="start"
      >  
        <Grid item xs={3}>
          <TextField label="XP" type="number" value={dossier?.xp} onChange={(v)=>{handleXpUpdate(unitIndex, v.target.value)}} inputProps={{step:1}}/>
        </Grid>
        <Grid item xs={3}>
          <div>Veteran Rank</div>
          <div style={{display:'flex', flexDirection:'row'}}>
          { dossier.level}
          </div>
        </Grid>
        <Grid item xs={6}>
          {/* Spend Supply */}
        </Grid>
        <Grid item xs={6}>
            <div>Commendations</div>
            {dossier?.commendations.map((c,i)=>{return <DossierItem type="commendations" text={c} 
                onDelete={()=>{handleRemoveDossierItem(unitIndex, "commendations", i)}}/>})}
            <Button onClick={()=>{
               setCardPaneFilter({
                  action: 'COMMENDATIONS',
                  unitIndex, 
                })
            }}>Add</Button>
        </Grid>
        <Grid item xs={6}>
          <div>Setbacks</div>
          {dossier?.setbacks.map((c,i)=>{return <DossierItem type="setbacks" text={c} 
              onDelete={()=>{handleRemoveDossierItem(unitIndex, "setbacks", i)}}/>})}
          <Button onClick={()=>{
              setCardPaneFilter({
                action: 'SETBACKS',
                unitIndex, 
              })}}>Add</Button>
        </Grid>

      </Grid>
    </div>
  )
};

export default Dossier;
