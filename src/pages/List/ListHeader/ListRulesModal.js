import React from 'react';
import {
  DialogContent,
  DialogContentText,
  Avatar,
  Typography,
  Link
} from '@mui/material';
import { makeStyles } from '@mui/material/styles';

import battleForcesDict from 'constants/battleForcesDict';

import cards from 'constants/cards';
import ranks from 'constants/ranks';
import { getOriginalRankLimits } from 'components/listValidator';
import ListContext from 'context/ListContext';

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
  
  const bfPdf = "https://cdn.svc.asmodee.net/production-amgcom/uploads/2025/04/DOC13_BattleForces.pdf"
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
          <Typography className={classes.bfRules}>You cannot use the Field Commander keyword.</Typography>
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
      { bfRules.buildsAsCorps && 
                <Typography className={classes.bfRules}>
                  The following count as Corps during army building: {bfRules.buildsAsCorps.map(id=>cards[id].displayName ? cards[id].displayName : cards[id].cardName)
                  .join(", ")}.</Typography>
      }
      { bfRules.minOneOfEachCorps && 
        <Typography className={classes.bfRules}>When building an army, you cannot take more than 1 of any unit with a Corps rank until at least one of each has already been taken.</Typography>
      }
      { bfRules.remnantEquipRules && 
        <Typography className={classes.bfRules}>Your non-droid trooper units may ignore the following requirements when equipping a HEAVY WEAPON: Stormtroopers only, Shoretroopers only, Scout Troopers only, or Imperial Death Troopers only.</Typography>
      }
    </DialogContent>
    <Typography style={{marginBottom:0}} gutterBottom>See your rule doc for full battleforce rules while playing:</Typography>
    <DialogContentText>
      <Link underline="always" href={bfPdf} target="_blank" rel="noreferrer noopener">Battle Forces Rules</Link>
    </DialogContentText>
  </div> 
}

function RankLimits({list}){
  
  const classes = useStyles();
  const {handleCardZoom} = React.useContext(ListContext);

  // maybe do parens to show what the modified limits are now, e.g. detachment and associate
  let rankReqs = getOriginalRankLimits(list);

  return (
    <div style={{ marginLeft:10}}>
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
                        let link = <Link
                          component='span'
                          style={{flexWrap:'wrap'}}
                          onClick={()=>handleCardZoom(unitLimit.ids[idx])}
                          underline="hover">{n}</Link>;
                        let suffix = idx < allNames.length - 1 ? " OR " : "";
                        return <span>{link}{suffix}</span>
                      })

                      return <span style={{flexWrap:'wrap'}}>{limit} {links};</span>
                    }
                  }

                  let display = limit + " " + name;

                  let suffix = idx < bf[r].length -1 ? ",": ""

                  return (
                    <span><Link
                      component='span'
                      style={{flexWrap:'wrap'}}
                      onClick={()=>handleCardZoom(id)}
                      underline="hover">{display}</Link>{suffix}&nbsp;</span>
                  );
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
  ); 
}
export {RankLimits, BFRules}
