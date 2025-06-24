import React, { useRef, useState } from 'react';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import ListContext from 'context/ListContext';
import SelectorHeader from './SelectorHeader';
import SelectorContent from './SelectorContent';
import StackController from './StackController';
import ToggleButton from './ToggleButton';
import ChipCard from 'common/LegionCard/ChipCard';
import cards from 'constants/cards';
import { Button } from '@material-ui/core';
import { getEligibleBattlesToAdd, getEligibleCommandsToAdd, getEligibleUnitsToAdd, getEquippableUpgrades, getUpgradeBar, unitHasUniques } from 'components/eligibleCardListGetter';

function Title({ title }) {
  return <Typography variant="body2">{title}</Typography>;
}

const CardSelector = () => {

  const {
    currentList,
    cardPaneFilter,
    setCardPaneFilter,
    handleAddUnit,
    handleAddCommand,
    handleRemoveCommand,
    handleAddBattle,
    handleRemoveBattle,
    handleCardZoom,
    handleEquipUpgrade,
    handleAddCounterpart,
    setCardSelectorToNextUpgradeSlot,
    userSettings
  } = React.useContext(ListContext);
  let header; let clickHandler; let moreHeaderContent;
  let selectorIds = {validIds:[], invalidIds:[]};
  const { action } = cardPaneFilter;

  const [stackSize, setStackSize] = useState(1);
  const [isApplyToAll, setIsApplyToAll] = useState(false);

  let hasUniques = false;
  
  if(cardPaneFilter.unitIndex !== undefined && currentList.units[cardPaneFilter.unitIndex]){
    hasUniques = unitHasUniques(currentList.units[cardPaneFilter.unitIndex]);
  }

    switch(action){
      case 'UNIT':
        selectorIds.validIds = getEligibleUnitsToAdd(currentList, cardPaneFilter.rank, userSettings);
        selectorIds.invalidIds = [];
      clickHandler = (unitId) => {handleAddUnit(unitId, stackSize); setStackSize(1)}
      header = (
        <StackController
          stackSize={stackSize}
          handleChange={(newValue)=>setStackSize(newValue)}
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
    case 'UNIT_UPGRADE_SPECIAL':
      let upgradeTargetId = cardPaneFilter.unitId;

      let title = action === 'COUNTERPART_UPGRADE' ? "Add counterpart upgrade" : "Add upgrade";

      const unit = currentList.units[cardPaneFilter.unitIndex]

      console.log('upgrades sel', JSON.stringify(cardPaneFilter.upgrades), getUpgradeBar(unit), cardPaneFilter.upgradeIndex)
      selectorIds = typeof getUpgradeBar(unit)[cardPaneFilter.upgradeIndex] === "object" ? {validIds: cardPaneFilter.upgrades} : 
        getEquippableUpgrades(
          currentList,
          cardPaneFilter.upgradeType,
          upgradeTargetId,
          cardPaneFilter.upgradesEquipped,
        );

      clickHandler = (upgradeId) => {
        handleEquipUpgrade(
          action,
          cardPaneFilter.unitIndex,
          cardPaneFilter.upgradeIndex,
          upgradeId,
          isApplyToAll
        );}
      header = (
      
      <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:"center", flex:1}} >
       
        { hasUniques ? 
          <Title title={title} />
         : 
          <ToggleButton
            label="Apply to All"
            value={isApplyToAll}
            handleChange={()=>{setIsApplyToAll(!isApplyToAll)}}
          /> 
        }
         <Button size="large" style={{marginLeft:20}} onClick={()=>{
            setCardSelectorToNextUpgradeSlot(currentList, action, cardPaneFilter.unitIndex, cardPaneFilter.upgradeIndex, isApplyToAll, true)
          }}>
            Skip
        </Button>
        </div>
      );
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
          setCardPaneFilter={setCardPaneFilter}
          moreHeaderContent={moreHeaderContent}
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
