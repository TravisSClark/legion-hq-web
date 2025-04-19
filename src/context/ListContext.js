import React, { useState, useEffect, useContext, createContext } from 'react';
import Axios from 'axios';
import DataContext from 'context/DataContext';
import ErrorFallback from 'common/ErrorFallback';
import LoadingWidget from 'common/LoadingWidget';
import factions from 'constants/factions';
import cards from 'constants/cards';
import urls from 'constants/urls';
import xapikey from 'constants/ssl';
import {
  addUnit,
  incrementUnit,
  decrementUnit,
  addCommand,
  removeCommand,
  addContingency,
  removeContingency,
  addCounterpart,
  removeCounterpart,
  addBattle,
  removeBattle,
  equipUpgrade,
  unequipUpgrade,
  countPoints
} from 'components/listOperations';
import listTemplate from 'constants/listTemplate';
import { validateList } from 'components/listValidator';

import {
  getEligibleCommandsToAdd,
  getEligibleContingenciesToAdd,
  getEligibleUnitsToAdd,
  getEquippableUpgrades,
  getEquippableLoadoutUpgrades,
  getEligibleBattlesToAdd,
} from 'components/eligibleCardListGetter'

import { getRankLimits, checkValidCards } from 'components/listValidator' 

import{
  mergeLists,
  convertHashToList,
  changeListTitle,
  setListMode,
} from 'components/listLoadAndHash'

const ListContext = createContext();
const httpClient = Axios.create();
httpClient.defaults.timeout = 10000;
let config = {
  headers: {
    "x-api-key": xapikey
  }
}

export function ListProvider({
  width, children, slug, listHash, storedLists, updateStoredList
}) {
  const { userId, userSettings, goToPage } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [listSaveMessage, setListSaveMessage] = useState();
  const [currentList, setCurrentList] = useState();
  const [leftPaneWidth, setLeftPaneWidth] = useState(0);
  const [rightPaneWidth, setRightPaneWidth] = useState(0);
  const [modalContent, setModalContent] = useState();
  const [cardPaneFilter, setCardPaneFilter] = useState({ action: 'DISPLAY' });
  const [isKillPointMode, setIsKillPointMode] = useState(false);
  const [currentKillPoints, setCurrentKillPoints] = useState(0);
  const [validationIssues, setValidationIssues] = useState([]);
  const [rankLimits, setRankLimits] = useState();


  useEffect(() => {
    // route '/list/rebels' fetches the rebel list from storage
    if (slug in factions) {
      if (listHash) {
        const convertedList = convertHashToList(slug, listHash);
        if (convertedList) updateThenValidateList({ ...convertedList });
        else updateThenValidateList(JSON.parse(JSON.stringify(storedLists[slug])));
      } else updateThenValidateList(JSON.parse(JSON.stringify(storedLists[slug])));
    }
    // route '/list/1b2f34' fetches list 1b2f34 from database
    else if (slug !== '') {
      setStatus('loading');
      httpClient.get(`${urls.api}/lists/${slug}`, config)
        .then(response => {
          if (Object.keys(response.data).length) {
            let loadedList = response.data;
            let oldCounterparts = ['lw', 'ji', 'jj'];
            loadedList.units = loadedList.units.filter(unit => {
              return !oldCounterparts.includes(unit.unitId)
            });
            updateThenValidateList(loadedList);
          } else setError(`List ${slug} not found.`);
          setStatus('idle');
        })
        .catch(err => {
          setMessage(`Failed to fetch list (id=${slug})`);
          setError(err);
          setStatus('idle');
        });
    }
  }, [slug]);
  useEffect(() => {
    // Save list before unmount
    return () => { if (currentList && !currentList.listId) updateStoredList(currentList); }
  }, [currentList]);
  useEffect(() => {
    if (width === 'xs' || width === 'sm') {
      setLeftPaneWidth(12);
      setRightPaneWidth(0);
    } else {
      setLeftPaneWidth(6);
      setRightPaneWidth(6);
    }
  }, [width]);
  useEffect(() => {
    if (width === 'xs' || width === 'sm') {
      if (cardPaneFilter.action === 'DISPLAY') {
        setLeftPaneWidth(12);
        setRightPaneWidth(0);
      } else {
        setLeftPaneWidth(0);
        setRightPaneWidth(12);
      }
    }
  }, [width, cardPaneFilter]);

  // TODO needs some intelligence/context to know WHAT needs validation after a given list change.
  // There are edges all over and it doesn't *seem* like this "check everything" check chugs too hard,
  // but it's still bad from a performance perspective
  const updateThenValidateList = (list) => { 
    let revisedList = checkValidCards(list);
    const rankLimits = getRankLimits(revisedList);
    setCurrentList(revisedList);
    setValidationIssues(validateList(revisedList, rankLimits));
    setRankLimits(rankLimits);
    countPoints(revisedList);
  }

  const reorderUnits = (startIndex, endIndex) => {
    function reorder(arr) {
      const result = Array.from(arr);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    }
    currentList.units = reorder(
      currentList.units, startIndex, endIndex
    );
    setCurrentList({ ...currentList });
  }

  const handleClearList = () => {
    setCardPaneFilter({ action: 'DISPLAY' });
    const newList = JSON.parse(JSON.stringify(listTemplate));
    if (currentList.faction === 'mercenary') newList.battleForce = 'Shadow Collective';
    updateThenValidateList({ ...newList, faction: currentList.faction });
  }
  
  const handleChangeTitle = title => setCurrentList({ ...changeListTitle(currentList, title) });

  const handleChangeMode = mode => {
    updateThenValidateList({ ...setListMode(currentList, mode) });
  }

  const setCardSelectorToNextUpgradeSlot = (list, action, unitIndex, upgradeIndex, getNewType = false) => {
    const unit = list.units[unitIndex];
    const unitCard = cards[unit.unitId];

    // These might be a bad pattern, but they sort of are needed for confirming we haven't exceeded the total upgrade count when cascading
    let upgradesEquipped = unit.upgradesEquipped;
    let upgradeBar = unitCard.upgradeBar.concat(unit.additionalUpgradeSlots);
    
    let filter = null;

    if ( userSettings && userSettings.cascadeUpgradeSelection === 'yes'){

      let getFilter; // function getFilter(index)  -> returns a cardselector filter if one is applicable for proposed next index and current action

      // Create a function for each action type that will return a CardSelector filter after adding an upgrade (or null if no selector valid) for the next upgrade index
      switch(action){
        case "COUNTERPART_UPGRADE":
          // this could probably re-use default by changing upgradesEquipped and upgradeBar; leaving it alone for now
          // since it works and there's currently 1 counterpart upgrade slot in the entire game for now, lol
          upgradesEquipped = unit.counterpart.upgradesEquipped;
          upgradeBar = cards[unit.counterpart.counterpartId].upgradeBar;

          getFilter = (index) =>{
            if (!upgradesEquipped[index]) {
              return {
                action,
                unitIndex,
                upgradeIndex: index,
                upgradeType: upgradeBar[index],
                unitId: unit.unitId,
                upgradesEquipped,
                additionalUpgradeSlots: []
              }
            }
            return null;
          }
          break;

        case "COUNTERPART_LOADOUT_UPGRADE":
          // Punt for now - rather have non-function than a breaking change if/when a 
          // counterpart with loadout and multiple slots appears in-game
          upgradesEquipped = unit.counterpart.upgradesEquipped;
          upgradeBar = cards[unit.counterpart.counterpartId].upgradeBar;
          getFilter = () => null
          break;

        case "UNIT_LOADOUT_UPGRADE":
          // If it's a laodout upgrade, return a UNIT_LOADOUT selector if the next upgrade is filled, return a UNIT_UPGRADE pick if not

          getFilter = (index, getNewType) =>{
            if(!getNewType || upgradeBar[upgradeIndex] !== upgradeBar[index]){

              if (!upgradesEquipped[index]) {
                return {
                  action: "UNIT_UPGRADE",
                  unitIndex,
                  upgradeIndex: index,
                  upgradeType: upgradeBar[index],
                  unitId: unit.unitId,
                  upgradesEquipped: unit.upgradesEquipped,
                  additionalUpgradeSlots: unit.additionalUpgradeSlots
                }
              } else if(!unit.loadoutUpgrades[index]){
                return {
                  action: "UNIT_LOADOUT_UPGRADE",
                  unitIndex,
                  upgradeIndex: index,
                  upgradeType: upgradeBar[index],
                  unitId: unit.unitId,
                  upgradesEquipped: unit.upgradesEquipped,
                  additionalUpgradeSlots: unit.additionalUpgradeSlots
                }
              }
            }
            return null;
          }
          break;

        default:
          // If the next upgrade is empty on UNIT_UPGRADE, get me a selector for that next slot, if used, return null
          getFilter = (index, getNewType) =>{

            if (!upgradesEquipped[index]) {
              if(!getNewType || upgradeBar[upgradeIndex] !== upgradeBar[index]){
                return {
                  action,
                  unitIndex,
                  upgradeIndex: index,
                  upgradeType: upgradeBar[index],
                  unitId: unit.unitId,
                  upgradesEquipped: unit.upgradesEquipped,
                  additionalUpgradeSlots: unit.additionalUpgradeSlots
                }
              }
            }
            return null;
          }
      }

      let nextUpgradeIndex = (upgradeIndex + 1) % upgradesEquipped.length;
      let count = 0;

      while (filter == null && count < upgradesEquipped.length) {
        filter = getFilter(nextUpgradeIndex, getNewType);
        count++;
        nextUpgradeIndex = (nextUpgradeIndex + 1) % upgradesEquipped.length;
      }
    } 
    
    if(filter){
      setCardPaneFilter(filter, getNewType);
    }
    else{
      setCardPaneFilter({ action: 'DISPLAY' });
    }

  }

  const handleEquipUpgrade = (action, unitIndex, upgradeIndex, upgradeId, isApplyToAll) => {

    const {list:newList, unitIndex:newUnitIndex} = equipUpgrade(
      currentList, action, unitIndex, upgradeIndex, upgradeId, isApplyToAll
    );

    setCardSelectorToNextUpgradeSlot(newList, action, newUnitIndex, upgradeIndex);

    updateThenValidateList({ ...newList });
  };

  const handleUnequipUpgrade = (action, unitIndex, upgradeIndex) => {

    setCardPaneFilter({ action: 'DISPLAY' });
    const newList = unequipUpgrade(
      currentList, action, unitIndex, upgradeIndex
    );
    updateThenValidateList({ ...newList });
  }
  const handleAddUnit = (unitId, stackSize) => {
    if (width === 'xs' || width === 'sm') {
      setCardPaneFilter({ action: 'DISPLAY' });
    }
    const newList = addUnit(currentList, unitId, stackSize);
    updateThenValidateList({ ...newList });
  }
  const handleAddCommand = (commandId) => {
    const newList = addCommand(currentList, commandId);
    setCurrentList({ ...newList });
  }
  const handleAddContingency = (commandId) => {
    const newList = addContingency(currentList, commandId);
    setCurrentList({ ...newList });
  }
  const handleRemoveCommand = (commandIndex) => {
    const newList = removeCommand(currentList, commandIndex);
    setCurrentList({ ...newList });
  }
  const handleRemoveContingency = (contingencyIndex) => {
    const newList = removeContingency(currentList, contingencyIndex);
    setCurrentList({ ...newList });
  }
  const handleAddBattle = (type, battleId) => {
    const {list, nextType} = addBattle(currentList, type, battleId);

    if((userSettings && userSettings.cascadeUpgradeSelection === 'yes') && nextType !== type){
      if(nextType){
        setCardPaneFilter({
          action: 'BATTLE', type: nextType
        })
      } else {
        setCardPaneFilter({
          action: 'DISPLAY'
        })
      }
    }

    setCurrentList({ ...list });
  }
  const handleRemoveBattle = (type, battleId) => {
    const newList = removeBattle(currentList, type, battleId);
    setCurrentList({ ...newList });
  }
  const handleAddCounterpart = (unitIndex, counterpartId) => {
    setCardPaneFilter({ action: 'DISPLAY' });
    const newList = addCounterpart(currentList, unitIndex, counterpartId);
    updateThenValidateList({ ...newList });
  }
  const handleRemoveCounterpart = (unitIndex) => {
    setCardPaneFilter({ action: 'DISPLAY' });
    const newList = removeCounterpart(currentList, unitIndex);
    updateThenValidateList({ ...newList });
  }
  const handleIncrementUnit = (index) => {
    const newList = incrementUnit(currentList, index);
    updateThenValidateList({ ...newList });
  }
  const handleDecrementUnit = (index) => {
    if (cardPaneFilter.action.includes('UPGRADE')) {
      setCardPaneFilter({ action: 'DISPLAY' });
    }
    const newList = decrementUnit(currentList, index);
    updateThenValidateList({ ...newList });
  }

  const handleMergeList = (listToMerge) => {
    const newList = mergeLists(currentList, listToMerge);
    updateThenValidateList({ ...newList });
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent();
  }
  const handleCardZoom = (cardId) => {
    setModalContent(cardId);
    setIsModalOpen(true);
  }
  const handleListSave = (list) => {
    if (!userId) return;
    const { _id, listId, ...rest } = list;
    if (listId) {
      httpClient.put(`${urls.api}/lists/${listId}?userId=${userId}`, list, config).then(response => {
        list.updatedAt = response.data.updatedAt;
        setCurrentList(list);
        setListSaveMessage('List Updated!');
      }).catch(e => {
        setError(e);
        setMessage(`Failed to update list ${listId}`);
      });
    } else {
      httpClient.post(`${urls.api}/lists?userId=${userId}`, { ...rest, userId }, config).then(response => {
        const { listId, createdAt, updatedAt } = response.data;
        setCurrentList({ ...currentList, listId, userId, createdAt, updatedAt });
        setListSaveMessage('List Created!')
      }).catch(e => {
        setError(e);
        setMessage(`Failed to create list for user ${userId}`);
      });
    }
  }
  const handleListFork = (list) => {
    if (!userId) return;
    const { _id, listId, ...rest } = list;
    if (!listId) return;
    const forkedList = { ...rest, title: list.title + ' fork' };
    httpClient.post(`${urls.api}/lists?userId=${userId}`, { ...forkedList }, config).then(response => {
      goToPage(`/list/${response.data.listId}`);
    }).catch(e => {
      setError(e);
      setMessage(`Failed to fork list ${listId} for user ${userId}`);
    });
  }

  const handleToggleIsKillPointMode = () => {
    if (isKillPointMode) setCurrentKillPoints(0);
    setIsKillPointMode(!isKillPointMode);
  }

  const handleAddKillPoints = (points) => {
    setCurrentKillPoints(currentKillPoints + points);
  }

  const handleSetBattleForce = (battleForce) => {
    updateThenValidateList({ ...currentList, battleForce });
  }

  const unitProps = {
    getEligibleUnitsToAdd,
    getEquippableUpgrades,
    getEquippableLoadoutUpgrades,
    handleAddUnit,
    handleAddCounterpart,
    handleRemoveCounterpart,
    handleEquipUpgrade,
    handleUnequipUpgrade,
    handleIncrementUnit,
    handleDecrementUnit,
    handleSetBattleForce
  };
  const battleProps = {
    getEligibleBattlesToAdd,
    handleAddBattle,
    handleRemoveBattle
  }
  const commandProps = {
    getEligibleCommandsToAdd,
    handleAddCommand,
    handleRemoveCommand,
    getEligibleContingenciesToAdd,
    handleAddContingency,
    handleRemoveContingency
  };
  const listProps = {
    currentList,
    reorderUnits,
    isKillPointMode,
    currentKillPoints,
    handleClearList,
    handleChangeTitle,
    handleChangeMode,
    handleListSave,
    handleListFork,
    handleMergeList,
    handleToggleIsKillPointMode,
    handleAddKillPoints,
    setCardSelectorToNextUpgradeSlot
  };
  const modalProps = {
    handleOpenModal,
    handleCloseModal,
    modalContent,
    isModalOpen,
    handleCardZoom
  };
  const viewProps = {
    width,
    cardPaneFilter,
    setCardPaneFilter,
    leftPaneWidth,
    rightPaneWidth,
    setLeftPaneWidth,
    setRightPaneWidth
  };
  const messageProps = {
    listSaveMessage
  };
  if (error) return <ErrorFallback error={error} message={message} />;
  if (status === 'loading') return <LoadingWidget />;
  if (status === 'idle') {
    return (
      <ListContext.Provider
        value={{
          userSettings,
          ...unitProps,
          ...commandProps,
          ...battleProps,
          ...listProps,
          ...modalProps,
          ...viewProps,
          ...messageProps,
          validationIssues,
          rankLimits
        }}
      >
        {children}
      </ListContext.Provider>
    );
  }
}

export default ListContext;
