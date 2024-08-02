import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListContext from 'context/ListContext';
import ranks from 'constants/ranks';
// import legionModes from 'constants/legionModes';
// import cards from 'constants/cards';
import RankButton from './RankButton';
// import battleForcesDict from 'constants/battleForcesDict';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  item: { marginRight: 10 }
});

function RankSelector() {
  const classes = useStyles();
  const { currentList, setCardPaneFilter, rankLimits } = useContext(ListContext);
  

  const currentUnitCounts = { ...currentList.unitCounts };

  return (
    <div className={classes.container}>
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
