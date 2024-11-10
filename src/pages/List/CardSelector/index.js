import React, { useReducer } from 'react';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import ListContext from 'context/ListContext';
import SelectorHeader from './SelectorHeader';
import SelectorContent from './SelectorContent';
import StackController from './StackController';
import ToggleButton from './ToggleButton';
import ChipCard from 'common/LegionCard/ChipCard';
import cards from 'constants/cards';

function Title({ title }) {
  return <Typography variant="body2">{title}</Typography>;
}

function CardSelector() {
  const {
    currentList,
    cardPaneFilter,
    setCardPaneFilter,
    isApplyToAll,
    stackSize,
    getEligibleUnitsToAdd,
    getEquippableUpgrades,
    getEquippableLoadoutUpgrades,
    getEligibleCommandsToAdd,
    getEligibleContingenciesToAdd,
    getEligibleBattlesToAdd,
    handleAddUnit,
    handleAddCommand,
    handleAddContingency,
    handleRemoveCommand,
    handleRemoveContingency,
    handleAddBattle,
    handleRemoveBattle,
    handleCardZoom,
    handleEquipUpgrade,
    handleAddCounterpart,
    handleIncrementStackSize,
    handleDecrementStackSize,
    handleToggleIsApplyToAll,
    userSettings
  } = React.useContext(ListContext);
  let header; let clickHandler;
  let selectorIds = {validIds:[], invalidIds:[]};
  const { action } = cardPaneFilter;

  switch(action){
    case 'UNIT':
      selectorIds.validIds = getEligibleUnitsToAdd(currentList, cardPaneFilter.rank, userSettings);
      selectorIds.invalidIds = [];
      clickHandler = (unitId) => handleAddUnit(unitId);
      header = (
        <StackController
          stackSize={stackSize}
          handleIncrementStackSize={handleIncrementStackSize}
          handleDecrementStackSize={handleDecrementStackSize}
        />
      );
      break;
    case 'COUNTERPART':
      selectorIds.validIds = [cardPaneFilter.counterpartId];
      clickHandler = (counterpartId) => handleAddCounterpart(
        cardPaneFilter.unitIndex,
        counterpartId
      );
      header = <Title title="Add counterpart" />;
      break;
    case 'UNIT_UPGRADE':
    case 'COUNTERPART_UPGRADE':
      let upgradeTargetId = action == 'COUNTERPART_UPGRADE' ? cardPaneFilter.counterpartId : cardPaneFilter.unitId;

      let title = action == 'COUNTERPART_UPGRADE' ? "Add counterpart upgrade" : "Add upgrade";
      selectorIds = getEquippableUpgrades(
        currentList,
        cardPaneFilter.upgradeType,
        upgradeTargetId,
        cardPaneFilter.upgradesEquipped,
        cardPaneFilter.additionalUpgradeSlots
      );
      clickHandler = (upgradeId) => handleEquipUpgrade(
        action,
        cardPaneFilter.unitIndex,
        cardPaneFilter.upgradeIndex,
        upgradeId,
        isApplyToAll
      );
      header = cardPaneFilter.hasUniques ? (
        <Title title={title} />
      ) : (
        <ToggleButton
          label="Apply to All"
          value={isApplyToAll}
          handleChange={handleToggleIsApplyToAll}
        />
      );
      break;
    case 'LOADOUT_UPGRADE':
    case 'COUNTERPART_LOADOUT_UPGRADE':
      let id = action == 'COUNTERPART_LOADOUT_UPGRADE' ? cardPaneFilter.counterpartId : cardPaneFilter.unitId;
      selectorIds = getEquippableLoadoutUpgrades(
        currentList,
        cardPaneFilter.upgradeType,
        id,
        cardPaneFilter.upgradeIndex,
        cardPaneFilter.upgradesEquipped,
        cardPaneFilter.additionalUpgradeSlots
      );
      clickHandler = (upgradeId) => handleEquipUpgrade(
        action,
        cardPaneFilter.unitIndex,
        cardPaneFilter.upgradeIndex,
        upgradeId
      );
      header = <Title title="Add loadout upgrade" />;
      break;
    case 'COMMAND':
      selectorIds = getEligibleCommandsToAdd(currentList);
      clickHandler = (commandId) => handleAddCommand(commandId)
      if (currentList.commandCards.length === 0) {
        header = <Title title="Add command cards" />;
      } else {
        const currentCommands = currentList.commandCards.map((commandId, i) => (
          <ChipCard
            card={cards[commandId]}
            key={commandId}
            handleClick={()=>handleCardZoom(commandId)}
            handleDelete={() => handleRemoveCommand(i)}
          />
        ));
        header = (
          <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
            <Title title="Commands:" style={{ marginRight: 4 }} />
            {currentCommands}
          </div>
        );
      }
      break;
    case 'CONTINGENCY':
      selectorIds = getEligibleContingenciesToAdd(currentList);
      clickHandler = (commandId) => handleAddContingency(commandId);
      if (currentList.contingencies || currentList.contingencies.length === 0) {
        header = <Title title="Add contingency cards" />;
      } else {
        const currentContingencies = currentList.contingencies.map((commandId, i) => (
          <ChipCard
            card={cards[commandId]}
            key={commandId}
            handleClick={()=>handleCardZoom(commandId)}
            handleDelete={() => handleRemoveContingency(i)}
          />
        ));
        header = (
          <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
            <Title title="Commands:" style={{ marginRight: 4 }} />
            {currentContingencies}
          </div>
        );
      }
      break;
    case 'BATTLE':
      selectorIds = getEligibleBattlesToAdd(currentList, cardPaneFilter.type);
      clickHandler = (battleId) => handleAddBattle(cardPaneFilter.type, battleId)
      const currentBattles = currentList[`${cardPaneFilter.type}Cards`].map((id, i) => {
        return (
          <ChipCard
            card={cards[id]}
            handleClick={()=>handleCardZoom(id)}
            handleDelete={() => handleRemoveBattle(cardPaneFilter.type, i)}
          />
        );
      });
      header = (
        <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
          {currentBattles}
        </div>
      );
      break;
    default:
      header = <Title title={`${action} is an invalid action.`} />;
    }
  return (
    <Fade unmountOnExit exit={false} in={cardPaneFilter.action !== 'DISPLAY'}>
      <React.Fragment>
        <SelectorHeader
          headerContent={header}
          cardPaneFilter={cardPaneFilter}
          setCardPaneFilter={setCardPaneFilter}
        />
        <SelectorContent
          action={action}
          validIds={selectorIds.validIds}
          invalidIds={selectorIds.invalidIds}
          handleClick={clickHandler}
          handleCardZoom={handleCardZoom}
        />
      </React.Fragment>
    </Fade>
  );
};

export default CardSelector;
