import React, { useContext } from 'react';
import {
  DialogContent,
  DialogContentText,
  Avatar,
  Typography,
  Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import battleForcesDict from 'constants/battleForcesDict';

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

  return <div style={{ marginLeft:10}}>
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
        
        let bf  = battleForcesDict[list.battleForce];
        let unitLinks = null;
        let unitNames = [];
        if(bf){
            unitNames = bf[r].map(id=>{

        
                let name = cards[id].displayName ? cards[id].displayName : cards[id].cardName;
                let unitLimits = bf.rules.unitLimits?.find(l=>l.ids.includes(id));
                let limit = "";
                if(unitLimits)
                    limit = unitLimits.count[0] + " - " + unitLimits.count[1];
                console.log("l " + JSON.stringify(unitLimits) + " " + limit);

                return limit + " " + name;
            })
            unitLinks = bf[r].map(id=>{

        
                let name = cards[id].displayName ? cards[id].displayName : cards[id].cardName;
                let unitLimits = bf.rules.unitLimits?.find(l=>l.ids.includes(id));
                let limit = "";
                if(unitLimits)
                    limit = unitLimits.count[0] + " - " + unitLimits.count[1];
                console.log("l " + JSON.stringify(unitLimits) + " " + limit);

                return <a onPress={null}>{limit} {name}</a>
            })
        }

// 
        return <div className={classes.row} style={{marginBottom:5}}>
            <Avatar
                alt={r.toUpperCase()}
                src={ranks[r].icon}
                style={{ width: 32, height: 32, marginRight:10 }}
            />
            <DialogContentText style={{marginBottom:0}}>{rankReqs[r][0]} -  {rankReqs[r][1]}</DialogContentText>
            <Typography style={{marginLeft:5}}>{unitNames.join(', ')}</Typography>
            {/* <Typography className={classes.row} style={{marginBottom:5}}>
                {unitLinks}
            </Typography> */}
        </div>
        } 
        return null;
    })}
   
  </div> 
}
export {RankLimits, BFRules}
