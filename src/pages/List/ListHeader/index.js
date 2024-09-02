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
  Avatar,
  Typography,
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

import cards from 'constants/cards';
import ranks from 'constants/ranks';
import { getOriginalRankLimits } from 'constants/listOperations';

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


function BFRules({list}){
  
  const classes = useStyles();

  if(!list.battleForce){
    return null;
  }

  let bfRules = battleForcesDict[list.battleForce].rules;

  if(!bfRules){
    return <Typography style={{marginBottom:0}} gutterBottom>See your rule doc for full battleforce rules while playing.</Typography>
  }

  console.log(JSON.stringify(bfRules));

  return <div>
    <Typography style={{marginBottom:0}} variant="subtitle1" gutterBottom>Special Listbuilding Rules:</Typography>
    <DialogContent>
      { bfRules.noFieldComm && 
          <Typography className={classes.bfRules}>You cannot use the Field Commander keyword (also not usable during the game).</Typography>
      }
      { bfRules.countMercs && 
          <div>
            <Typography className={classes.bfRules}>Mercenary units count towards your minimum ranks.</Typography>
            <Typography className={classes.bfRules}>You may have any number of Mercenaries at each rank.</Typography>
          </div>
      } 
      { bfRules.take2NonEwokRebs && 
          <Typography className={classes.bfRules}>You must take at least 2 non-Ewok Rebel units.</Typography>
      }

      { bfRules.unitLimits && 
          <div>
            <Typography>Unit Limits: </Typography>
            <div style={{marginLeft:8}}>
            { 
              bfRules.unitLimits.map((limit) => {
                return <Typography className={classes.bfRules}>{limit.count[0]} - {limit.count[1]} {limit.ids.map(id=>cards[id].displayName ? cards[id].displayName : cards[id].cardName)
                  .join(" OR ")}</Typography>
              })
            }
            </div>
          </div>
      }

      { bfRules.buildsAsCorps && 
                <Typography className={classes.bfRules}>
                  The following count as Corps during army building: {bfRules.buildsAsCorps.map(id=>cards[id].displayName ? cards[id].displayName : cards[id].cardName)
                  .join(" AND ")}</Typography>
      }
      { bfRules.minOneOfEachCorps && 
        <Typography className={classes.bfRules}>When building an army, you cannot take more than 1 of any unit with a Corps rank until at least one of each has already been taken</Typography>
      }
      { bfRules.remnantEquipRules && 
        <Typography className={classes.bfRules}>Any non-droid trooper unit in this army with a HEAVY WEAPON upgrade icon may equip a HEAVY WEAPON with one of the following unit requirements, ignoring that requirement: Stormtroopers only, Shoretroopers only, Scout Troopers only, or Imperial Death Troopers only</Typography>
      }
    </DialogContent>
    <Typography style={{marginBottom:0}} gutterBottom>See your rule doc for full battleforce rules while playing:</Typography>
    <DialogContentText>
      <Link underline="always" href={battleForcesDict[list.battleForce].ruleUrl} target="_blank" rel="noreferrer noopener">{list.battleForce} Rules</Link>
    </DialogContentText>
  </div> 
}

function RankLimits({list}){
  
  const classes = useStyles();

  // maybe do parens to show what the modified limits are now, e.g. detachment and associate
  let rankReqs = getOriginalRankLimits(list);

  console.log(JSON.stringify(rankReqs));
  return <div style={{ marginLeft:20}}>
    { Object.getOwnPropertyNames(rankReqs).map(r=>{ 
      
      if(r == 'commOp'){
        return <div className={classes.row} style={{marginBottom:5}}>
            <Avatar
              alt={'CMDR'}
              src={ranks['commander'].icon}
              style={{ width: 32, height: 32,}}
            />
            <Typography style={{fontSize:20, marginLeft:2, marginRight:2}}>/</Typography>
            <Avatar
              alt={'OP'}
              src={ranks['operative'].icon}
              style={{ width: 32, height: 32, marginRight:10 }}
            />
            <DialogContentText style={{marginBottom:0}}>1 - {rankReqs.commOp} (minimum 1 Commander)</DialogContentText>
            </div>
      } 
      
      if(rankReqs[r][1] > 0){
        
        if(!rankReqs["commOp"] || (r != 'commander' && r != 'operative')){
          return <div className={classes.row} style={{marginBottom:5}}>
            <Avatar
              alt={r.toUpperCase()}
              src={ranks[r].icon}
              style={{ width: 32, height: 32, marginRight:10 }}
            />
            <DialogContentText style={{marginBottom:0}}>{rankReqs[r][0]} -  {rankReqs[r][1]}</DialogContentText>
            </div>
          } 
        }
        return null;
    })}
   
  </div> 
}

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
              <DialogTitle>List Errors</DialogTitle>
              <DialogContent>
                <div className={classes.valError}>
                  <WarningIcon className={classes.item} style={{color: 'yellow'}}/>
                  <DialogContentText>Work in progress... double-check your army rules and unit cards!</DialogContentText>
                </div>
                {validationIssues.map((el, i) =>
                <div key={i} className={classes.valError}>
                  <WarningIcon className={classes.item} style={{color: el.level == 1 ?'yellow':'red'}}/>
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
              
              <RankLimits list={currentList}></RankLimits>
              <BFRules list={currentList}></BFRules>

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
