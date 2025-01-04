import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListContext from 'context/ListContext';
import ranks from 'constants/ranks';
import RankButton from './RankButton';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  item: { marginRight: 10 }
});

function RankSelector(props) {
  const classes = useStyles();
  const { currentList, setCardPaneFilter, rankLimits } = useContext(ListContext);
  

  const currentUnitCounts = { ...currentList.unitCounts };

  return (
    <div className={classes.container} style={props.style}>
      {Object.keys(rankLimits).map(key => {

         // commOp is a non-array, non-displayed rank limit
        if(!ranks[key]) return null;

        let color = 'primary';
        if(currentUnitCounts[key] > rankLimits[key][1] || currentUnitCounts[key] < rankLimits[key][0]){
          color = 'error'
        }

        return (
          <div key={key} className={classes.item}>
            <RankButton
              rank={key}
              color={color}
              count={currentUnitCounts[key]}
              handleClick={() => setCardPaneFilter({
                action: 'UNIT', rank: key
              })}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RankSelector;
