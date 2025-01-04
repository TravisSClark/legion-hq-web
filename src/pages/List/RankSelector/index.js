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

  const currentUnitCounts = { ...currentList.unitCounts };

  return (
    <div className={classes.container} style={style}>
      {Object.keys(rankLimits).map(rank => {

         // commOp is a non-array, non-displayed rank limit
        if(!ranks[rank]) return null;

        let color = 'primary';
        if(currentUnitCounts[rank] > rankLimits[rank][1] || currentUnitCounts[rank] < rankLimits[rank][0]){
          color = 'error'
        }

        return (
          <LargerTooltip title={ranks[rank].title}>
            <IconButton size="small" onClick={() => setCardPaneFilter({
                  action: 'UNIT', rank: rank
                })} style={{ marginRight: 10 }}>
              <Badge
                showZero
                max={100}
                color={color}
                badgeContent={currentUnitCounts[rank]}
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
