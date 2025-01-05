import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListContext from 'context/ListContext';
import ranks from 'constants/ranks';
import { Badge, IconButton, Avatar } from '@material-ui/core';
import LargerTooltip from 'common/LargerTooltip';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
});

function RankSelector({style}) {
  const classes = useStyles();
  const { currentList, setCardPaneFilter, rankLimits } = useContext(ListContext);

  const {unitCounts, gametimeUnitCounts, rankIssues} = currentList;

  return (
    <div className={classes.container} style={style}>
      {Object.keys(rankLimits).map(rank => {

         // commOp is a non-array, non-displayed rank limit
        if(!ranks[rank]) return null;

        let color = 'primary';
        let badgeContent = unitCounts[rank];
        let toolTip = ranks[rank].title;

        // TODO rename this in cards.json at some point
        let rankName = rank === "special" ? "special forces" : rank;

        if(unitCounts[rank] !== gametimeUnitCounts[rank]){
          badgeContent += "("+gametimeUnitCounts[rank] +")"

          toolTip = " " + rankName.toUpperCase() + " count during army building is " + unitCounts[rank]+". ";
          toolTip += rankName.toUpperCase() + " count during the game is (" + gametimeUnitCounts[rank] +")"; 
        }

        if(rankIssues[rank] && rankIssues[rank].length > 0){
          color = 'error'
          toolTip = rankIssues[rank][0].text;
        }

        return (
          <LargerTooltip title={toolTip}>
            <IconButton size="small" onClick={() => setCardPaneFilter({
                  action: 'UNIT', rank: rank
                })} style={{ marginRight: 10 }}>
              <Badge
                showZero
                max={100}
                color={color}
                badgeContent={badgeContent}
              >
                <Avatar
                  alt={rank}
                  src={ranks[rank].icon}
                  style={{ width: 32, height: 32 }}
                />
              </Badge>
            </IconButton>
          </LargerTooltip>
        );
      })}
    </div>
  );
};


export default RankSelector;
