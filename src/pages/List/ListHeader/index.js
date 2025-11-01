import React, { useContext } from "react";
import {
  Box,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Info as InfoIcon, Warning as WarningIcon } from "@material-ui/icons";

import ListContext from "context/ListContext";
import legionModes from "constants/legionModes";
import ModeButton from "./ModeButton";
import TitleField from "./TitleField";
import KillPointsField from "./KillPointsField";
import FactionButton from "./FactionButton";

import BattleforceSelectorMenu from "./BattleforceSelectorMenu";
import { ListRulesModal } from "./ListRulesModal";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "65%",
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
    validationIssues,
  } = useContext(ListContext);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isBattleForceDialogOpen, setIsBattleForceDialogOpen] =
    React.useState(false);
  const [isValidationDialogOpen, setValidationDialogOpen] =
    React.useState(false);

  const numActivations = currentList.units.reduce((num, unit) => {
    num += unit.count;
    return num;
  }, 0);

  var minValidationError = validationIssues.reduce((highest, e) => {
    return e.level > highest ? e.level : highest;
  }, 0);

  return (
    <div id="list-header" className={classes.columnContainer}>
      <div className={classes.container}>
        <div className={classes.item}>
          <TitleField
            activations={numActivations}
            title={currentList.title}
            handleChange={(e) => {
              e.persist();
              handleChangeTitle(e.target.value);
            }}
          />
        </div>
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
          <Typography variant="subtitle1" component="label" htmlFor="my-button">
            Battleforce:
          </Typography>
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
          <Typography variant="subtitle1" component="label" htmlFor="my-button">
            Mode:
          </Typography>
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
    </div>
  );
}

export default ListHeader;
