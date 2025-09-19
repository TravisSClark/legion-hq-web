import React, { useContext } from 'react';
import {
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  Avatar,
  Typography,
  Link,
  Select,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import battleForcesDict from 'constants/battleForcesDict';

import cards from 'constants/cards';
import ranks from 'constants/ranks';
import { getOriginalRankLimits } from 'components/listValidator';
import ListContext from 'context/ListContext';
import BattleforceSelectorMenu from './BattleforceSelectorMenu';

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
    fontSize:14,
    marginTop:4
  }
});


function BFRules({list}){
  
  const bfPdf = "https://cdn.svc.asmodee.net/production-amgcom/uploads/2025/04/DOC13_BattleForces.pdf"
  const classes = useStyles();

  if(!list.battleForce){
    return null;
  }

  let bfRules = battleForcesDict[list.battleForce].rules;
  const article = ["A","E","I","O","U"].includes(list.battleForce[0]) ? "an":"a";

  if(!bfRules){
    return <Typography style={{marginBottom:0}} gutterBottom>See your rule doc for full battleforce rules while playing.</Typography>
  }


  // TODO this should be data-driven or at least made via a func or sth; it's gross lol
  return <div>
    <Typography style={{marginBottom:0}} variant="subtitle1" gutterBottom>Special Rules:</Typography>
    <DialogContent>
      { bfRules.noFieldComm && 
          <Typography className={classes.bfRules}>The Field Commander keyword cannot be used in {article} {list.battleForce} army.</Typography>
      }
      { bfRules.countMercs && 
          <div>
            { list.battleForce !== "Shadow Collective" && <Typography className={classes.bfRules}>This Battle Force may take any number of Mercenary units.</Typography>}
            { list.battleForce === "Shadow Collective" && <Typography className={classes.bfRules}>This Battle Forcemust be composed entirely of Mercenary units.</Typography> }
            <Typography className={classes.bfRules}>These units do count towards the miniumum number of Ranks required and the army may include any number of Mercenaries at each Rank.</Typography>
          </div>
      } 
      { bfRules.take2NonEwokRebs && 
          <Typography className={classes.bfRules}>This Battle Force must take at least 2 non-EWOK, REBEL units.</Typography>
      }
      { bfRules.buildsAsCorps && 
                <Typography className={classes.bfRules}>
                  The following unit{bfRules.buildsAsCorps.length > 1 ? "s":""} counts as a CORPS unit for the purposes of army building{bfRules.ccAsCorps ? " and Battle Cards":""}: {bfRules.buildsAsCorps.map(id=>cards[id].displayName ? cards[id].displayName : cards[id].cardName)
                  .join(", ")}.</Typography>
      }
      { bfRules.minOneOfEachCorps && 
        <Typography className={classes.bfRules}>When building an army, {article} {list.battleForce} Battle Force cannot take more than 1 of each with a CORPS rank until at least one of each has been taken. This army may not include detachments.</Typography>
      }
      { bfRules.remnantEquipRules && 
        <Typography className={classes.bfRules}>Any non-droid trooper unit in this army with a HEAVY WEAPON upgrade icon may equip a HEAVY WEAPON upgrade with one of the following unit requirements, ignoring that requirement: Stormtroopers only, Shoretroopers only, Scout Troopers only, or Imperial Death Troopers only.</Typography>
      }
      { bfRules.ignoreDetach && 
        <Typography className={classes.bfRules}>{cards[bfRules.ignoreDetach].cardName} units in this army do not have the DETACHMENT keyword.</Typography>
      }
      {battleForcesDict[list.battleForce].plainTextRules?.map(r=> <Typography className={classes.bfRules}>{r}</Typography>)}
    </DialogContent>
    {/* <Typography style={{marginBottom:0}} gutterBottom>See your rule doc for full battleforce rules while playing:</Typography> */}
    {/* <Typography>Additional Rules:</Typography> */}
    <DialogContentText>
      <Link underline="always" href={bfPdf} target="_blank" rel="noreferrer noopener">Download Battle Forces Rules Document</Link>
    </DialogContentText>
  </div> 
}

function RankLimits({list}){
  
  const classes = useStyles();
  const {handleCardZoom} = React.useContext(ListContext);

  // maybe do parens to show what the modified limits are now, e.g. detachment and associate
  let rankReqs = getOriginalRankLimits(list);

  return <div style={{ marginLeft:10}}>
    { Object.getOwnPropertyNames(rankReqs).map(r=>{ 
      
      if (r === 'commOp'){
        return <div className={classes.row} style={{marginBottom:5}}>
            <Avatar
              alt={'CMDR'}
              src={ranks['commander'].icon}
              style={{ width: 30, height: 30,}}
            />
            <Typography style={{fontSize:20, marginLeft:2, marginRight:2}}>/</Typography>
            <Avatar
              alt={'OP'}
              src={ranks['operative'].icon}
              style={{ width: 30, height: 30, marginRight:10 }}
            />
            <DialogContentText style={{marginBottom:0}}>1 - {rankReqs.commOp} (minimum 1 Commander)</DialogContentText>
            </div>
      } 
      
      if(rankReqs[r][1] > 0){
        
        let bf  = battleForcesDict[list.battleForce];
        let unitLinks = null;
        if(bf){

            let seen = [];

            unitLinks = bf[r].map((id, idx)=>{
                if(seen.includes(id)){
                  return null;
                }

                if(!cards[id]){
                  console.warn('no card for id', id);
                  return null;
                }
                let name = cards[id].displayName ? cards[id].displayName : cards[id].cardName;
                let unitLimit = bf.rules.unitLimits?.find(l=>l.ids.includes(id));
                let limit = "";

                if(unitLimit){
                  limit = unitLimit.count[0] + " - " + unitLimit.count[1];

                  if(unitLimit.ids.length > 1){

                    let allNames = unitLimit.ids.map(id =>  cards[id].displayName ? cards[id].displayName : cards[id].cardName);
                    seen = seen.concat(seen, unitLimit.ids);
                    // name = allNames;
                    let links = allNames.map((n,idx) =>{
                      let link = <Link component='span' style={{flexWrap:'wrap'}} onClick={()=>handleCardZoom(unitLimit.ids[idx])}>{n}</Link>;
                      let suffix = idx < allNames.length - 1 ? " OR " : "";
                      return <span>{link}{suffix}</span>
                    })

                    return <span style={{flexWrap:'wrap'}}>{limit} {links};</span>
                  }
                }

                let display = limit + " " + name;

                let suffix = idx < bf[r].length -1 ? ",": ""

                return <span><Link component='span' style={{flexWrap:'wrap'}} onClick={()=>handleCardZoom(id)}>{display}</Link>{suffix}&nbsp;</span>
            })
            unitLinks = unitLinks.filter(l=>l!=null);
        }

        return <div className={classes.row} style={{marginBottom:5}}>
            <Avatar
                alt={r.toUpperCase()}
                src={ranks[r].icon}
                style={{ width: 32, height: 32, marginRight:10 }}
            />
            <DialogContentText style={{marginBottom:0, minWidth:40}}>{rankReqs[r][0]} -  {rankReqs[r][1]}</DialogContentText>
            <div style={{display:'flex', flexDirection:'row', flexWrap:"wrap"}}>
              {unitLinks}
            </div>
        </div>
        } 
        return null;
    })}
   
  </div> 
}


function ListRulesModal({open, handleClose}){

  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    currentList,
    handleSetBattleForce,
  } = useContext(ListContext);

  const bfName = currentList.battleForce ? currentList.battleForce : (currentList.faction.charAt(0).toUpperCase() + currentList.faction.slice(1) + " (No Battleforce)");

  const rankLabel = currentList.battleForce ? "Rank and Unit Requirements:" : "Rank Requirements:";

  return(
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{display:'flex', flexDirection:'row', paddingBottom:5, justifyContent:'space-between'}}>
        {bfName}
        <Button variant='outlined' style={{marginLeft:10}} onClick={(e)=>setAnchorEl(e.currentTarget)}>Change</Button></DialogTitle>
      <DialogContent>
        <Typography>{rankLabel}</Typography>
        <RankLimits list={currentList}/>
        <BFRules list={currentList}/>

        <DialogContentText>
          All Star Wars: Legion documents are located on the Atomic Mass Games{' '}
          <Link underline="always" href="https://atomicmassgames.com/star-wars-legion-documents" target="_blank" rel="noreferrer noopener">website</Link>
        </DialogContentText>
      </DialogContent>
      <BattleforceSelectorMenu currentList={currentList} anchorEl={anchorEl} onClose={()=>setAnchorEl(null)} handleSetBattleForce={handleSetBattleForce}></BattleforceSelectorMenu>
    </Dialog>
  );
  
}
export {RankLimits, BFRules, ListRulesModal}
