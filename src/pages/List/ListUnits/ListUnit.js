import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UnitAvatar from 'common/UnitAvatar';
import CardName from 'common/CardName';
import UnitPoints from 'common/UnitPoints';
import UnitActions from './UnitActions';
import UnitUpgrades from './UnitUpgrades';
import UnitFlaw from './UnitFlaw';

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
  unit,
  uniques,
  unitCard,
  unitIndex,
  counterpartId,
  counterpartUnit,
  handleCardZoom,
  addCounterpartHandler,
  removeCounterpartHandler,
  zoomUpgradeHandlers,
  swapUpgradeHandlers,
  addUpgradeHandlers,
  deleteUpgradeHandlers,
  changeLoadoutHandlers,
  deleteLoadoutHandlers
}) {
  const classes = useStyles();

  const upgrades = (
    <UnitUpgrades
      key="upgrades"
      counterpartId={counterpartId}
      upgradesEquipped={unit.upgradesEquipped}
      upgradeInteractions={unit.upgradeInteractions}
      totalUpgradeBar={[...unitCard.upgradeBar, ...unit.additionalUpgradeSlots]}
      loadoutUpgrades={unit.loadoutUpgrades}
      addCounterpartHandler={addCounterpartHandler}
      removeCounterpartHandler={removeCounterpartHandler}
      swapUpgradeHandlers={swapUpgradeHandlers}
      zoomUpgradeHandlers={zoomUpgradeHandlers}
      addUpgradeHandlers={addUpgradeHandlers}
      deleteUpgradeHandlers={deleteUpgradeHandlers}
      changeLoadoutHandlers={changeLoadoutHandlers}
      deleteLoadoutHandlers={deleteLoadoutHandlers}
    />
  );
  const flaws = unitCard.flaw ? <UnitFlaw key="flaws" flawId={unitCard.flaw} /> : undefined;
  return (
    <div className={classes.unitColumn}>
      <div className={classes.unitRow}>
        <div className={classes.leftCell}>
          <div style={{ marginTop: 2 }} />
          <UnitAvatar
            key="avatar"
            id={unitCard.id}
            count={unit.count}
            handleClick={handleCardZoom}
          />
        </div>
        <div className={classes.middleCell}>
          <CardName key="name" id={unitCard.id} />
          {upgrades}
          {flaws}
        </div>
        <div className={classes.rightCell}>
          <UnitPoints key="points" unit={unit} />
          <UnitActions unit={unit} unitIndex={unitIndex} />
        </div>
      </div>
      {counterpartUnit}
    </div>
  );
};

export default ListUnit;
