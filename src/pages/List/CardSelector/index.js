import React, { useRef, useState } from "react";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import ListContext from "context/ListContext";
import SelectorHeader from "./SelectorHeader";
import SelectorContent from "./SelectorContent";
import StackController from "./StackController";
import ToggleButton from "./ToggleButton";
import ChipCard from "common/LegionCard/ChipCard";
import cards from "constants/cards";
import { Button } from "@material-ui/core";
import {
  getEligibleBattlesToAdd,
  getEligibleCommandsToAdd,
  
  getEligibleUnitsToAdd,
  getEligibleUpgrades,
  getUpgradeBar,
  unitHasUniques,
} from "components/eligibleCardListGetter";

import{
  getUnitsFromRegister,
  getUpgradesFromRegister
} from "components/tour/registerOperations"

import RegisterSelector from "../TourOfDuty/Common/RegisterSelector";

import {getEligibleCommendations, getEligibleSetbacks, registerUnitSelectPreamble, registerUpgradeSelectPreamble,makeTodBattleUpgradeSelectPreamble} from 'components/tour/registerOperations';
import DossierSelector from "../TourOfDuty/TourBattle/DossierSelector";

function Title({ title }) {
  return <Typography variant="body2">{title}</Typography>;
}

const CardSelector = () => {
  const {
    currentList,
    registerList,
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
    userSettings,
    handleAddDossierItem,
    handleAddDossierUnitForBattle
  } = React.useContext(ListContext);
  let header;
  let clickHandler;
  let moreHeaderContent;
  let selectorIds = { validIds: [], invalidIds: [] };
  const { action } = cardPaneFilter;

  const [stackSize, setStackSize] = useState(1);
  const [isApplyToAll, setIsApplyToAll] = useState(false);

  let hasUniques = false;

  if (
    cardPaneFilter.unitIndex !== undefined &&
    currentList.units[cardPaneFilter.unitIndex]
  ) {
    hasUniques = unitHasUniques(currentList.units[cardPaneFilter.unitIndex]);
  }

  // TODO escape out CC+Battle select; they're basically the same bw ToD and not
  // TODO this is a mess; mvp for now, this should get scoured later
  if(currentList.mode === "tour of duty"){

    const isBattle = registerList.register.isBattle;

    // Register edit; follows... most regular listbuilding rules
    if(!isBattle){

      switch(action){
        case "UNIT":

          selectorIds.validIds = getEligibleUnitsToAdd(
            currentList, 
            cardPaneFilter.rank,
            registerUnitSelectPreamble
          )
          selectorIds.invalidIds = [];
            clickHandler = (unitId) => {
              handleAddUnit(unitId, stackSize);
              setStackSize(1);
            };
          header = (
            <StackController
              stackSize={stackSize}
              handleChange={(newValue) => setStackSize(newValue)}
            />
          );
          break;
        case "COUNTERPART":
          selectorIds.validIds = [cardPaneFilter.counterpartId];
          clickHandler = (counterpartId) =>
            handleAddCounterpart(cardPaneFilter.unitIndex, counterpartId);
          header = <Title title="Add counterpart" />;
          break;
        case "UNIT_UPGRADE":
        case "COUNTERPART_UPGRADE":
        case "UNIT_UPGRADE_SPECIAL":
          let title =
            action === "COUNTERPART_UPGRADE"
              ? "Add counterpart upgrade"
              : "Add upgrade";

          const unit = currentList.units[cardPaneFilter.unitIndex];

            selectorIds = typeof getUpgradeBar(unit)[cardPaneFilter.upgradeIndex] === "object"
              ? { validIds: cardPaneFilter.upgrades }
              : getEligibleUpgrades(
                  currentList,
                  cardPaneFilter.upgradeType,
                  cardPaneFilter.unitId,
                  cardPaneFilter.upgradesEquipped,
                  registerUpgradeSelectPreamble
                );
          clickHandler = (upgradeId) => {
            handleEquipUpgrade(
              action,
              cardPaneFilter.unitIndex,
              cardPaneFilter.upgradeIndex,
              upgradeId,
              isApplyToAll
            );
          };
          header = (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
              }}
            >
              {hasUniques ? (
                <Title title={title} />
              ) : (
                <ToggleButton
                  label="Apply to All"
                  value={isApplyToAll}
                  handleChange={() => {
                    setIsApplyToAll(!isApplyToAll);
                  }}
                />
              )}
              {/* <Button
                size="large"
                style={{ marginLeft: 20 }}
                onClick={() => {
                  setCardSelectorToNextUpgradeSlot(
                    currentList,
                    action,
                    cardPaneFilter.unitIndex,
                    cardPaneFilter.upgradeIndex,
                    isApplyToAll,
                    true
                  );
                }}
              >
                Skip
              </Button> */}
            </div>
          );
          break;

        case "COMMENDATIONS":
        case "DEFINING_TRAIT":
          return (
            <RegisterSelector items={getEligibleCommendations(currentList, cardPaneFilter.unitIndex)} onClick={(item)=>handleAddDossierItem(cardPaneFilter.unitIndex, cardPaneFilter.action, item)}/>
          );
        
        case "SETBACKS":
          return( <RegisterSelector items={getEligibleSetbacks(currentList, cardPaneFilter.unitIndex)} onClick={(item)=>handleAddDossierItem(cardPaneFilter.unitIndex, cardPaneFilter.action, item)}/>);
        default:
          header = <Title title={`${action} is an invalid action.`} />;
      }
    } 
    // Battle edit; gets units+upgrades from register
    // for now, just allow uniques and trust user to tally
    else{

       switch(action){
        case "UNIT":
          return (
            <DossierSelector items={getUnitsFromRegister(registerList, currentList, cardPaneFilter.rank)} onClick={(item)=>{handleAddDossierUnitForBattle(item)}}/>
          );
          break;
        case "COUNTERPART":
          selectorIds.validIds = [cardPaneFilter.counterpartId];
          clickHandler = (counterpartId) =>
            handleAddCounterpart(cardPaneFilter.unitIndex, counterpartId);
          header = <Title title="Add counterpart" />;
          break;
        case "UNIT_UPGRADE":
        case "COUNTERPART_UPGRADE":
        case "UNIT_UPGRADE_SPECIAL":

          let title =
            action === "COUNTERPART_UPGRADE"
              ? "Add counterpart upgrade"
              : "Add upgrade";

          const unit = currentList.units[cardPaneFilter.unitIndex];
          const registerUnit = registerList.units.find(u=>u.dossier.name === unit.dossier.name);

            selectorIds = typeof getUpgradeBar(unit)[cardPaneFilter.upgradeIndex] === "object"
              ? { validIds: cardPaneFilter.upgrades }
              : getEligibleUpgrades(
                  currentList,
                  cardPaneFilter.upgradeType,
                  cardPaneFilter.unitId,
                  cardPaneFilter.upgradesEquipped,
                  makeTodBattleUpgradeSelectPreamble(registerUnit)
                );
          clickHandler = (upgradeId) => {
            handleEquipUpgrade(
              action,
              cardPaneFilter.unitIndex,
              cardPaneFilter.upgradeIndex,
              upgradeId,
              isApplyToAll
            );
          };
          header = (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
              }}
            >
              {hasUniques ? (
                <Title title={title} />
              ) : (
                <ToggleButton
                  label="Apply to All"
                  value={isApplyToAll}
                  handleChange={() => {
                    setIsApplyToAll(!isApplyToAll);
                  }}
                />
              )}
              {/* <Button
                size="large"
                style={{ marginLeft: 20 }}
                onClick={() => {
                  setCardSelectorToNextUpgradeSlot(
                    currentList,
                    action,
                    cardPaneFilter.unitIndex,
                    cardPaneFilter.upgradeIndex,
                    isApplyToAll,
                    true
                  );
                }}
              >
                Skip
              </Button> */}
            </div>
          );
          break;
        case "COMMAND":
          selectorIds = getEligibleCommandsToAdd(currentList);
          clickHandler = (commandId) => handleAddCommand(commandId);
          if (currentList.commandCards.length === 0) {
            header = <Title title="Add command cards" />;
          } else {
            const currentCommands = currentList.commandCards.map((commandId, i) => (
              <ChipCard
                card={cards[commandId]}
                key={commandId}
                handleClick={() => handleCardZoom(commandId)}
                handleDelete={() => handleRemoveCommand(i)}
              />
            ));
            header = (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexFlow: "row wrap",
                }}
              >
                <Title title="Commands:" style={{ marginRight: 4 }} />
                {currentCommands}
              </div>
            );
          }
          break;
        case "BATTLE":
          selectorIds = getEligibleBattlesToAdd(currentList, cardPaneFilter.type);
          clickHandler = (battleId) =>
            handleAddBattle(cardPaneFilter.type, battleId);
          const currentBattles = currentList[`${cardPaneFilter.type}Cards`].map(
            (id, i) => {
              return (
                <ChipCard
                  card={cards[id]}
                  handleClick={() => handleCardZoom(id)}
                  handleDelete={() => handleRemoveBattle(cardPaneFilter.type, i)}
                />
              );
            }
          );
          header = (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexFlow: "row wrap",
              }}
            >
              {currentBattles}
            </div>
          );
          break;

        case "COMMENDATIONS":
        case "DEFINING_TRAIT":
          return (
            <RegisterSelector items={getEligibleCommendations(currentList, cardPaneFilter.unitIndex)} onClick={(item)=>handleAddDossierItem(cardPaneFilter.unitIndex, cardPaneFilter.action, item)}/>
          );
        
        case "SETBACKS":
          return( <RegisterSelector items={getEligibleSetbacks(currentList, cardPaneFilter.unitIndex)} onClick={(item)=>handleAddDossierItem(cardPaneFilter.unitIndex, cardPaneFilter.action, item)}/>);
        default:
          header = <Title title={`${action} is an invalid action.`} />;
      }
    }
  }

  else{
    switch (action) {
      case "UNIT":

        selectorIds.validIds = getEligibleUnitsToAdd(
          currentList,
          cardPaneFilter.rank
        );
        selectorIds.invalidIds = [];
          clickHandler = (unitId) => {
            handleAddUnit(unitId, stackSize);
            setStackSize(1);
          };
        header = (
          <StackController
            stackSize={stackSize}
            handleChange={(newValue) => setStackSize(newValue)}
          />
        );
        break;
      case "COUNTERPART":
        selectorIds.validIds = [cardPaneFilter.counterpartId];
        clickHandler = (counterpartId) =>
          handleAddCounterpart(cardPaneFilter.unitIndex, counterpartId);
        header = <Title title="Add counterpart" />;
        break;
      case "UNIT_UPGRADE":
      case "COUNTERPART_UPGRADE":
      case "UNIT_UPGRADE_SPECIAL":
        let title =
          action === "COUNTERPART_UPGRADE"
            ? "Add counterpart upgrade"
            : "Add upgrade";

        const unit = currentList.units[cardPaneFilter.unitIndex];

        selectorIds =
          typeof getUpgradeBar(unit)[cardPaneFilter.upgradeIndex] === "object"
            ? { validIds: cardPaneFilter.upgrades }
            : getEligibleUpgrades(
                currentList,
                cardPaneFilter.upgradeType,
                cardPaneFilter.unitId,
                cardPaneFilter.upgradesEquipped
              );
        clickHandler = (upgradeId) => {
          handleEquipUpgrade(
            action,
            cardPaneFilter.unitIndex,
            cardPaneFilter.upgradeIndex,
            upgradeId,
            isApplyToAll
          );
        };
        header = (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
            }}
          >
            {hasUniques ? (
              <Title title={title} />
            ) : (
              <ToggleButton
                label="Apply to All"
                value={isApplyToAll}
                handleChange={() => {
                  setIsApplyToAll(!isApplyToAll);
                }}
              />
            )}
            <Button
              size="large"
              style={{ marginLeft: 20 }}
              onClick={() => {
                setCardSelectorToNextUpgradeSlot(
                  currentList,
                  action,
                  cardPaneFilter.unitIndex,
                  cardPaneFilter.upgradeIndex,
                  isApplyToAll,
                  true
                );
              }}
            >
              Skip
            </Button>
          </div>
        );
        break;
      case "COMMAND":
        selectorIds = getEligibleCommandsToAdd(currentList);
        clickHandler = (commandId) => handleAddCommand(commandId);
        if (currentList.commandCards.length === 0) {
          header = <Title title="Add command cards" />;
        } else {
          const currentCommands = currentList.commandCards.map((commandId, i) => (
            <ChipCard
              card={cards[commandId]}
              key={commandId}
              handleClick={() => handleCardZoom(commandId)}
              handleDelete={() => handleRemoveCommand(i)}
            />
          ));
          header = (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexFlow: "row wrap",
              }}
            >
              <Title title="Commands:" style={{ marginRight: 4 }} />
              {currentCommands}
            </div>
          );
        }
        break;
      case "BATTLE":
        selectorIds = getEligibleBattlesToAdd(currentList, cardPaneFilter.type);
        clickHandler = (battleId) =>
          handleAddBattle(cardPaneFilter.type, battleId);
        const currentBattles = currentList[`${cardPaneFilter.type}Cards`].map(
          (id, i) => {
            return (
              <ChipCard
                card={cards[id]}
                handleClick={() => handleCardZoom(id)}
                handleDelete={() => handleRemoveBattle(cardPaneFilter.type, i)}
              />
            );
          }
        );
        header = (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexFlow: "row wrap",
            }}
          >
            {currentBattles}
          </div>
        );
        break;

      case "COMMENDATIONS":
      case "DEFINING_TRAIT":
        return (
          <RegisterSelector items={getEligibleCommendations(currentList, cardPaneFilter.unitIndex)} onClick={(item)=>handleAddDossierItem(cardPaneFilter.unitIndex, cardPaneFilter.action, item)}/>
        );
      
      case "SETBACKS":
        return( <RegisterSelector items={getEligibleSetbacks(currentList, cardPaneFilter.unitIndex)} onClick={(item)=>handleAddDossierItem(cardPaneFilter.unitIndex, cardPaneFilter.action, item)}/>);
      default:
        header = <Title title={`${action} is an invalid action.`} />;
    }
  }

  return (
    <Fade unmountOnExit exit={false} in={cardPaneFilter.action !== "DISPLAY"}>
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
