import React, { useContext } from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Info as InfoIcon, Warning as WarningIcon } from '@material-ui/icons';

import ListContext from 'context/ListContext';
import legionModes from 'constants/legionModes';
import battleForcesDict from 'constants/battleForcesDict';
import ModeButton from './ModeButton';
import TitleField from './TitleField';
import KillPointsField from './KillPointsField';
import FactionButton from './FactionButton';

import { BFRules, RankLimits } from './ListRulesModal';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  battleForceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: { marginRight: 6 },
  valError: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start'
  },
  row: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  bfRules: {
    fontSize:14
  }
});

function ListHeader() {
  const {
    currentList,
    handleSetBattleForce,
    currentKillPoints,
    isKillPointMode,
    handleChangeTitle,
    handleChangeMode,
    validationIssues
  } = useContext(ListContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isBattleForceDialogOpen, setIsBattleForceDialogOpen] = React.useState(false);
  const [isValidationDialogOpen, setValidationDialogOpen ] = React.useState(false);
  const handleFactionMenuOpen = event => setAnchorEl(event.currentTarget);
  const handleFactionMenuClose = () => setAnchorEl(null);
  const handleOpenBFDialog = () => setIsBattleForceDialogOpen(true);
  const handleCloseBFDialog = () => setIsBattleForceDialogOpen(false);
  const numActivations = currentList.units.reduce((num, unit) => {
    num += unit.count;
    return num;
  }, 0);

  const validBattleForces = Object.values(battleForcesDict).filter(bf => bf.faction === currentList.faction);

  var minValidationError = validationIssues.reduce((highest, e)=>{
    return e.level > highest ? e.level : highest;
  }, 0)


  return (
    <div id="list-header" className={classes.columnContainer}>
      <div className={classes.container}>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFactionMenuClose}
        >
          {currentList.faction !== 'mercenary' && (
            <MenuItem
              key="none"
              selected={!currentList.battleForce || currentList.battleForce === ''}
              onClick={() => {
                handleSetBattleForce('');
                handleFactionMenuClose();
              }}
            >
              No Battle Force
            </MenuItem>
          )}
          {validBattleForces.map(battleForce => {
            return (
              <MenuItem
                key={battleForce.name}
                selected={currentList.battleForce === battleForce.name}
                onClick={() => {
                  handleSetBattleForce(battleForce.name);
                  handleFactionMenuClose();
                }}
              >
                {battleForce.name}
              </MenuItem>
            );
          })}
        </Menu>
        <div className={classes.item}>
          <FactionButton
            faction={currentList.faction}
            handleFactionMenuOpen={handleFactionMenuOpen}
            handleFactionMenuClose={handleFactionMenuClose}
          />
        </div>
        <div className={classes.item}>
          <TitleField
            activations={numActivations}
            title={currentList.title}
            handleChange={e => {
              e.persist();
              handleChangeTitle(e.target.value);
            }}
          />
        </div>
        <div className={classes.item}>
          <ModeButton
            currentMode={currentList.mode}
            points={currentList.pointTotal}
            maxPoints={legionModes[currentList.mode].maxPoints}
            handleChangeMode={handleChangeMode}
          />
        </div>
        { validationIssues.length > 0 &&
          <div className={classes.battleForceContainer}>

            <IconButton onClick={()=>setValidationDialogOpen(true)}>
              <WarningIcon style={{color: minValidationError < 2 ? 'yellow':'red'}}/>
            </IconButton> 

            <Dialog open={isValidationDialogOpen} onClose={() => setValidationDialogOpen(false)}>
              <DialogTitle>List Errors/Warnings</DialogTitle>
              <DialogContent>
                {validationIssues.map((el, i) =>
                <div key={i} className={classes.valError}>
                  <WarningIcon className={classes.item} style={{color: el.level === 1 ?'yellow':'red'}}/>
                  <DialogContentText>{el.text}</DialogContentText>
                </div>
                )}
                <br/>
                <DialogContentText>
                  All Star Wars: Legion documents are located on the Atomic Mass Games{' '}
                  <Link underline="always" href="https://atomicmassgames.com/star-wars-legion-documents" target="_blank" rel="noreferrer noopener">website</Link>

                  {/* <a style={{ textDecoration: 'none' }} href="https://atomicmassgames.com/star-wars-legion-documents" target="_blank" rel="noreferrer noopener">website</a>. */}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        }
        {isKillPointMode && (
          <div className={classes.item}>
            <KillPointsField
              killPoints={currentKillPoints}
            />
          </div>
        )}

      </div>
        <div className={classes.battleForceContainer}>
          <Button
            endIcon={<InfoIcon />}
            variant="outlined"
            size="small"
            onClick={handleOpenBFDialog}
          >
            {currentList.battleForce ? currentList.battleForce : currentList.faction}
          </Button>
          <Dialog open={isBattleForceDialogOpen} onClose={handleCloseBFDialog}>
            <DialogTitle style={{paddingBottom:8}}>{currentList.battleForce} List Requirements</DialogTitle>
            <DialogContent>
              
              <RankLimits list={currentList}/>
              <BFRules list={currentList}/>

              <DialogContentText>
                All Star Wars: Legion documents are located on the Atomic Mass Games{' '}
                <Link underline="always" href="https://atomicmassgames.com/star-wars-legion-documents" target="_blank" rel="noreferrer noopener">website</Link>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
    </div>
  );
};

export default ListHeader;
