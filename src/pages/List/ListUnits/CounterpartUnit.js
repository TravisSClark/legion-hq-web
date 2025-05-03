import React, { useContext } from 'react';
import { makeStyles } from '@mui/material/styles';
import UnitAvatar from 'common/UnitAvatar';
import CardName from 'common/CardName';
import UnitPoints from 'common/UnitPoints';
import UnitActions from './UnitActions';
import UnitUpgrades from './UnitUpgrades';
import UnitContext from 'context/UnitContext';
import ListContext from 'context/ListContext';

const useStyles = makeStyles(theme => ({
  unitRow: {
    marginLeft: 25,
    display: 'flex',
    flexFlow: 'row nowrap'
  },
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
    borderLeft: '1px solid rgba(255,255,255,0.12)',
    borderTop: '1px solid rgba(255,255,255,0.12)'
  }
}));

function CounterpartUnit() {
  const classes = useStyles();

  const {unit, unitCard, unitIndex} = useContext(UnitContext);
  const {handleCardZoom} = useContext(ListContext);

  return (
    <div className={classes.unitRow}>
      <div className={classes.leftCell}>
        <UnitAvatar
            key="avatar"
            id={unitCard.id}
            handleClick={() => handleCardZoom(unitCard.id)}
        />      
      </div>
      <div className={classes.middleCell}>
        <CardName key="name" id={unitCard.id} />      
        <UnitUpgrades
          key="upgrades"
        />
      </div>
      <div className={classes.rightCell}>
        <UnitPoints key="points" unit={unit} parentheses={true}/>
        <UnitActions unit={unit} unitIndex={unitIndex} isCounterpart={true}/>
      </div>
    </div>
  );
};

export default CounterpartUnit;
