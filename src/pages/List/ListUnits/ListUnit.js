import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import UnitAvatar from 'common/UnitAvatar';
import CardName from 'common/CardName';
import UnitPoints from 'common/UnitPoints';
import UnitActions from './UnitActions';
import UnitUpgrades from './UnitUpgrades';
import UnitFlaw from './UnitFlaw';
import UnitContext from 'context/UnitContext';
import ListContext from 'context/ListContext';
import UpgradeAddBar from './UpgradeAddbar';

const PREFIX = 'ListUnit';

const classes = {
  unitRow: `${PREFIX}-unitRow`,
  unitColumn: `${PREFIX}-unitColumn`,
  leftCell: `${PREFIX}-leftCell`,
  counterpart: `${PREFIX}-counterpart`,
  middleCell: `${PREFIX}-middleCell`,
  rightCell: `${PREFIX}-rightCell`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.unitRow}`]: {
    display: 'flex',
    flexFlow: 'row nowrap',
    borderTop: '1px solid rgba(255,255,255,0.12)'
  },

  [`&.${classes.unitColumn}`]: { display: 'flex', flexFlow: 'column nowrap' },
  [`& .${classes.leftCell}`]: { marginRight: 4 },
  [`& .${classes.counterpart}`]: { marginLeft: 20 },

  [`& .${classes.middleCell}`]: {
    flex: 1,
    marginRight: 2,
    display: 'flex',
    flexFlow: 'column nowrap',
    overflowX: 'auto',
    overflowY: 'hidden'
  },

  [`& .${classes.rightCell}`]: {
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


  const {unit, unitIndex, unitCard} = useContext(UnitContext);
  const {handleCardZoom} = useContext(ListContext);


  const highestUnitError = unit.validationIssues ? unit.validationIssues.reduce((hi, i)=>{return i.level > hi ? i.level : hi}, 0) : 0;
  console.log(JSON.stringify(unit.validationIssues));

  let bgColor = 'transparent';
  if(highestUnitError == 2){
    bgColor ='#6e1303'
  }else if(highestUnitError == 1){
    bgColor = "#550"
  }

  return (
    <Root className={classes.unitColumn} style={{backgroundColor: bgColor, borderRadius:10}}>
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
          <UpgradeAddBar counterpartId={unitCard.counterpartId}
            addCounterpartHandler={addCounterpartHandler}/>
        </div>
        <div className={classes.rightCell}>
          <UnitPoints key="points" unit={unit} />
          <UnitActions unit={unit} unitIndex={unitIndex} />
        </div>
      </div>
      <UnitUpgrades
        key="upgrades"
        counterpartId={unitCard.counterpartId}
        addCounterpartHandler={addCounterpartHandler}
      />
      {counterpartUnit}
    </Root>
  );
}

export default ListUnit;
