import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UnitAvatar from 'common/UnitAvatar';
import CardName from 'common/CardName';
import UnitPoints from 'common/UnitPoints';
import UnitActions from './UnitActions';
import UnitUpgrades from './UnitUpgrades';

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

function CounterpartUnit({
  counterpart,
  counterpartId,
  counterpartCard,
  unitIndex,
  handleCardZoom,
  zoomUpgradeHandlers,
  swapUpgradeHandlers,
  addUpgradeHandlers,
  deleteUpgradeHandlers,
  changeLoadoutHandlers,
  deleteLoadoutHandlers,
}) {
  const classes = useStyles();
  return (
    <div className={classes.unitRow}>
      <div className={classes.leftCell}>
        <UnitAvatar
            key="avatar"
            id={counterpartId}
            handleClick={handleCardZoom}
        />      
      </div>
      <div className={classes.middleCell}>
        <CardName key="name" id={counterpartId} />      
        <UnitUpgrades
          key="upgrades"
          upgradesEquipped={counterpart.upgradesEquipped}
          totalUpgradeBar={counterpartCard.upgradeBar}
          loadoutUpgrades={counterpart.loadoutUpgrades}
          zoomUpgradeHandlers={zoomUpgradeHandlers}
          swapUpgradeHandlers={swapUpgradeHandlers}
          addUpgradeHandlers={addUpgradeHandlers}
          deleteUpgradeHandlers={deleteUpgradeHandlers}
          changeLoadoutHandlers={changeLoadoutHandlers}
          deleteLoadoutHandlers={deleteLoadoutHandlers}
        />
      </div>
      <div className={classes.rightCell}>
        <UnitPoints key="points" unit={counterpart} parentheses={true}/>
        <UnitActions unit={counterpart} unitIndex={unitIndex} isCounterpart={true}/>
      </div>
    </div>
  );
};

export default CounterpartUnit;
