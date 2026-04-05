import React, { useContext } from "react";
import { Grid, Divider, Button } from "@material-ui/core";
import DataContext from "context/DataContext";
import ListContext from "context/ListContext";
import CardModal from "common/CardModal";
import themes from "constants/themes";
import ListHeader from "../../ListHeader";
import RankSelector from "../../RankSelector";
import ListCommands from "../../ListCommands";
import ListObjectives from "../../ListObjectives";
import ListExtras from "../../ListExtras";
import ListDisplay from "../../ListDisplay";
import ListId from "../../ListId";
import CardSelector from "../../CardSelector";
import DossierUnits from "./DossierUnits";
import IncrementInput from "common/IncrementInput";

function TodListLayout() {
  const { userSettings } = useContext(DataContext);
  const { themeColor } = userSettings;
  const palette = themes.palettes[themeColor];
  const {
    width,
    leftPaneWidth,
    rightPaneWidth,
    isModalOpen,
    modalContent,
    handleCloseModal,
    currentList,
    registerList,
    handleSupplyUpdate,
    handleCombatPotentialUpdate,
    handleToggleBattle
  } = useContext(ListContext);

  const isMobile = width === "xs" || width === "sm";

  const paneStyles = {
    padding: "0 2px 2px",
    overflow: "auto",
    height: `calc(100vh - ${isMobile ? "125px" : "75px"})`,
  };

  const stickyStyles = {
    top: 0,
    zIndex: 2,
    position: "-webkit-sticky",
    backgroundColor: palette ? palette.background.default : "",
  };

  const isBattle = registerList.register.isBattle;

  const battleToggleText = isBattle ? "Edit Register" : "To Battle";

  let builderPane = leftPaneWidth > 0 && (
    <Grid item xs={leftPaneWidth} style={paneStyles}>
      <div id="list-content">
        <div style={stickyStyles}>
          <ListHeader />
          <div style={{ marginTop: 16 }} />
          <RankSelector />
        </div>
        <div style={{display:'flex', flex:1, flexDirection:'column', alignItems:'space-evenly'}}>
          <Button variant='outlined' onClick={()=>handleToggleBattle()}>{battleToggleText}</Button>
          {!isBattle && <div style={{display: 'flex', flex:1, flexDirection:'row', justifyContent:'space-evenly', marginLeft:20}}>
            <IncrementInput label="Supply Points" value={currentList.register.supplyPoints} 
              onIncrement={()=>{handleSupplyUpdate(currentList.register.supplyPoints + 1)}} 
              onDecrement={()=>{handleSupplyUpdate(currentList.register.supplyPoints - 1)}}/>
            <IncrementInput label="Combat Potential" value={currentList.register.combatPotential} 
              onIncrement={()=>{handleCombatPotentialUpdate(currentList.register.combatPotential + 150)}} 
              onDecrement={()=>{handleCombatPotentialUpdate(currentList.register.combatPotential - 150)}}/>
          </div>}
        </div>
        <Divider style={{ marginTop: 4, marginBottom: 4 }} />
        {/* <UnitContext.Provider
              value={{
                unit: currentList.register.paragon,
                unitCard: null,
                // totalUpgradeBar: [...counterpartCard.upgradeBar],
                // TODO: this is not *great*; relies on card funcs following "COUNTERPART_UPGRADE" et al to work
                actionPrefix: "UNIT",
              }}
            >
          <ParagonUnit/>
        </UnitContext.Provider> */}
        <DossierUnits isBattle={isBattle}/>
        { isBattle && <Divider style={{ marginTop: 4, marginBottom: 4 }} /> }
        { isBattle && <ListCommands /> }
        { isBattle && <Divider style={{ marginTop: 4, marginBottom: 6 }} /> }
        { isBattle && <ListObjectives /> }
      </div>
      <Divider style={{ marginTop: 4, marginBottom: 6 }} />
      <ListExtras />
      <ListId />
      <div style={{ marginTop: 24 }} />
    </Grid>
  );

  const cardPane = rightPaneWidth > 0 && (
    <Grid item xs={rightPaneWidth} style={paneStyles}>
      <ListDisplay />
      <CardSelector />
    </Grid>
  );

  const modal = (
    <CardModal
      id={modalContent}
      isOpen={isModalOpen}
      handleClose={handleCloseModal}
    />
  );
  return (
    <Grid container direction="row">
      {modal}
      {builderPane}
      {cardPane}
    </Grid>
  );
}

export default TodListLayout;
