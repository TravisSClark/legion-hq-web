import React, { useContext } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
  Typography,
} from "@mui/material";
import { Info as InfoIcon, Warning as WarningIcon } from "@mui/icons-material";

import DataContext from "context/DataContext";
import ListContext from "context/ListContext";
import legionModes from "constants/legionModes";
import battleForcesDict from "constants/battleForcesDict";

import ModeButton from "./ModeButton";
import TitleField from "./TitleField";
import KillPointsField from "./KillPointsField";
import FactionButton from "./FactionButton";
import BattleforceSelectorMenu from "./BattleforceSelectorMenu";
import { ListRulesModal } from "./ListRulesModal";
import BattleforceChoicesMultiToggle from "./BattleforceChoicesMultiToggle";

function ListHeader() {
  const {
    currentList,
    handleSetBattleForce,
    currentKillPoints,
    isKillPointMode,
    handleChangeTitle,
    handleChangeMode,
    handleSetBattleforceChoices,
    validationIssues,
  } = useContext(ListContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isBattleForceDialogOpen, setIsBattleForceDialogOpen] =
    React.useState(false);
  const [isValidationDialogOpen, setValidationDialogOpen] =
    React.useState(false);
  const { userSettings } = useContext(DataContext);

  const numActivations = currentList.units.reduce((num, unit) => {
    num += unit.count;
    return num;
  }, 0);

  var minValidationError = validationIssues.reduce((highest, e) => {
    return e.level > highest ? e.level : highest;
  }, 0);

  const showHeaderLabel = userSettings.showHeaderLabel !== "off";

  return (
    <div
      id="list-header"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TitleField
          activations={numActivations}
          title={currentList.title}
          handleChange={(e) => {
            e.persist();
            handleChangeTitle(e.target.value);
          }}
        />
        {validationIssues.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
            }}
          >
            <IconButton onClick={() => setValidationDialogOpen(true)}>
              <WarningIcon
                style={{ color: minValidationError < 2 ? "yellow" : "red" }}
              />
            </IconButton>
            <Dialog
              open={isValidationDialogOpen}
              onClose={() => setValidationDialogOpen(false)}
            >
              <DialogTitle>List Errors/Warnings</DialogTitle>
              <DialogContent>
                {validationIssues.map((el, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "start",
                    }}
                  >
                    <WarningIcon
                      style={{
                        color: el.level === 1 ? "yellow" : "red",
                        marginRight: 6,
                      }}
                    />
                    <DialogContentText>{el.text}</DialogContentText>
                  </div>
                ))}
                <br />
                <DialogContentText>
                  All Star Wars: Legion documents are located on the Atomic Mass
                  Games{" "}
                  <Link
                    underline="always"
                    href="https://atomicmassgames.com/star-wars-legion-documents"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    website
                  </Link>
                  {/* <a style={{ textDecoration: 'none' }} href="https://atomicmassgames.com/star-wars-legion-documents" target="_blank" rel="noreferrer noopener">website</a>. */}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        )}
        {isKillPointMode && (
          <div style={{ marginRight: 6 }}>
            <KillPointsField killPoints={currentKillPoints} />
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BattleforceSelectorMenu
          currentList={currentList}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          handleSetBattleForce={handleSetBattleForce}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {showHeaderLabel && (
            <Typography
              variant="subtitle1"
              component="label"
              htmlFor="my-button"
            >
              Battleforce:
            </Typography>
          )}
          <div style={{ marginRight: 6 }}>
            <FactionButton
              currentList={currentList}
              handleFactionMenuOpen={(event) =>
                setAnchorEl(event.currentTarget)
              }
              handleFactionMenuClose={() => setAnchorEl(null)}
            />
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {showHeaderLabel && (
            <Typography
              variant="subtitle1"
              component="label"
              htmlFor="my-button"
            >
              Mode:
            </Typography>
          )}
          <div style={{ marginRight: 6 }}>
            <ModeButton
              currentMode={currentList.mode}
              points={currentList.pointTotal}
              maxPoints={legionModes[currentList.mode].maxPoints}
              handleChangeMode={handleChangeMode}
            />
          </div>
        </Box>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
          }}
        >
          <IconButton onClick={() => setIsBattleForceDialogOpen(true)}>
            <InfoIcon />
          </IconButton>
          <ListRulesModal
            open={isBattleForceDialogOpen}
            handleClose={() => setIsBattleForceDialogOpen(false)}
          />
        </div>
      </div>
      {currentList.battleForce &&
        battleForcesDict[currentList.battleForce].choices && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 12,
            }}
          >
            <BattleforceChoicesMultiToggle
              currentChoices={currentList.choices}
              battleforceChoices={
                battleForcesDict[currentList.battleForce].choices
              }
              handleSetBattleforceChoices={handleSetBattleforceChoices}
              maxChoices={2}
            />
          </div>
        )}
    </div>
  );
}

export default ListHeader;
