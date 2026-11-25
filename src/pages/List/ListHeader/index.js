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
  Button,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Info as InfoIcon,
  Warning as WarningIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

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
import BattleforceChoicesGroupedToggle from "./BattleforceChoicesGroupedToggle";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  choiceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
  },
  battleForceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  item: { marginRight: 6 },
  valError: {
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bfRules: {
    fontSize: 14,
  },
});

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
    isBattleforceChoicesOpen,
    setIsBattleforceChoicesOpen,
    isCustomClanChoicesOpen,
    setIsCustomClanChoicesOpen,
  } = useContext(ListContext);

  const classes = useStyles();
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
    <div id="list-header" className={classes.columnContainer}>
      <div className={classes.container} style={{ width: "50%" }}>
        <TitleField
          activations={numActivations}
          title={currentList.title}
          handleChange={(e) => {
            e.persist();
            handleChangeTitle(e.target.value);
          }}
        />
        {validationIssues.length > 0 && (
          <div className={classes.battleForceContainer}>
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
                  <div key={i} className={classes.valError}>
                    <WarningIcon
                      className={classes.item}
                      style={{ color: el.level === 1 ? "yellow" : "red" }}
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
          <div className={classes.item}>
            <KillPointsField killPoints={currentKillPoints} />
          </div>
        )}
      </div>
      <div className={classes.container}>
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
          <div className={classes.item}>
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
          <div className={classes.item}>
            <ModeButton
              currentMode={currentList.mode}
              points={currentList.pointTotal}
              maxPoints={legionModes[currentList.mode].maxPoints}
              handleChangeMode={handleChangeMode}
            />
          </div>
        </Box>
        <div className={classes.battleForceContainer}>
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
        currentList.battleForce === "Custom Clone Battalion" &&
        battleForcesDict[currentList.battleForce].choices && (
          <>
            <Button
              size="small"
              aria-expanded={isBattleforceChoicesOpen}
              onClick={() =>
                setIsBattleforceChoicesOpen(!isBattleforceChoicesOpen)
              }
            >
              Traits
              <ExpandMoreIcon
                fontSize="small"
                style={{
                  transform: isBattleforceChoicesOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 150ms",
                }}
              />
            </Button>
            <Collapse in={isBattleforceChoicesOpen}>
              <div className={classes.choiceContainer}>
                <BattleforceChoicesGroupedToggle
                  currentChoices={currentList.choices}
                  battleforceChoices={
                    battleForcesDict[currentList.battleForce].choices
                  }
                  handleSetBattleforceChoices={handleSetBattleforceChoices}
                />
              </div>
            </Collapse>
            {!isBattleforceChoicesOpen && (
              <Typography variant="caption">
                {currentList.choices.join(" / ")}
              </Typography>
            )}
          </>
        )}
      {currentList.battleForce &&
        currentList.battleForce === "Custom Clan" &&
        battleForcesDict[currentList.battleForce].choices && (
          <>
            <Button
              size="small"
              sx={{
                textTransform: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              aria-expanded={isCustomClanChoicesOpen}
              onClick={() =>
                setIsCustomClanChoicesOpen(!isCustomClanChoicesOpen)
              }
            >
              Traits
              <ExpandMoreIcon
                fontSize="small"
                style={{
                  transform: isCustomClanChoicesOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 150ms",
                }}
              />
            </Button>
            <Collapse in={isCustomClanChoicesOpen}>
              <div className={classes.choiceContainer}>
                <BattleforceChoicesMultiToggle
                  currentChoices={currentList.choices}
                  battleforceChoices={
                    battleForcesDict[currentList.battleForce].choices
                  }
                  handleSetBattleforceChoices={handleSetBattleforceChoices}
                  maxChoices={2}
                />
              </div>
            </Collapse>
            {!isCustomClanChoicesOpen && (
              <Typography variant="caption">
                {currentList.choices.join(" / ")}
              </Typography>
            )}
          </>
        )}
    </div>
  );
}

export default ListHeader;
