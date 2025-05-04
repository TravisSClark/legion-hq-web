import React from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import {
  makeStyles,
  Collapse,
  Typography,
  Divider,
  IconButton
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import LegionCard from 'common/LegionCard';
import cards from 'constants/cards';
import ChipCard from 'common/LegionCard/ChipCard';

const PREFIX = 'SelectorContent';

const classes = {
  expand: `${PREFIX}-expand`,
  expandOpen: `${PREFIX}-expandOpen`,
  rowContainerWrap: `${PREFIX}-rowContainerWrap`,
  rowContainerNoWrap: `${PREFIX}-rowContainerNoWrap`,
  columnContainer: `${PREFIX}-columnContainer`,
  item: `${PREFIX}-item`,
  divider: `${PREFIX}-divider`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.expand}`]: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  [`& .${classes.expandOpen}`]: { transform: 'rotate(180deg)' },

  [`& .${classes.rowContainerWrap}`]: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },

  [`& .${classes.rowContainerNoWrap}`]: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 4
  },

  [`&.${classes.columnContainer}`]: {
    display: 'flex',
    flexDirection: 'column'
  },

  [`& .${classes.item}`]: {
    marginRight: 4,
    marginBottom: 4
  },

  [`& .${classes.divider}`]: {
    flexGrow: 1
  }
}));

function CollapsedContent({ children, isExpanded }) {
  return (
    <Collapse unmountOnExit timeout="auto" in={isExpanded}>
      {children}
    </Collapse>
  );
}

function SelectorContent({
  action, validIds = [], invalidIds = [], handleClick, handleCardZoom
}) {

  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  if (validIds.length === 0) {
    return (
      <Root className={classes.columnContainer}>
        <Typography>No eligible cards found</Typography>
      </Root>
    );
  } else if (!action.includes('UPGRADE')) {
    return (
      <div className={classes.rowContainerWrap}>
        {validIds.map(id => (
          <LegionCard
            key={id}
            id={id}
            handleClick={() => handleClick(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={classes.columnContainer}>
      <div className={classes.rowContainerWrap} style={{ alignItems: 'center' }}>
        <Typography style={{ marginRight: 8 }}>
          Equippable upgrades
        </Typography>
        <Divider className={classes.divider} />
      </div>
      <div className={classes.rowContainerWrap}>
        {validIds.map(id => (
          <LegionCard
            key={id}
            id={id}
            handleClick={() => handleClick(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
      {invalidIds.length > 0 && (
        <div className={classes.rowContainerNoWrap}>
          <Typography style={{ marginRight: 8 }}>
            Unequippable upgrades
          </Typography>
          <Divider className={classes.divider} />
          <IconButton
            size="small"
            className={clsx(classes.expand, {
              [classes.expandOpen]: isExpanded,
            })}
            style={{ marginLeft: 8 }}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      )}
      <CollapsedContent isExpanded={isExpanded}>
        <div className={classes.rowContainerWrap}>
          {invalidIds.map(id => (
            <ChipCard
              card={cards[id]}
              key={id}
              handleClick={()=>handleCardZoom(id)}
            />
          ))}
        </div>
      </CollapsedContent>
    </div>
  );
}

export default SelectorContent;


// TODO would be nice, but disabling this re-render prevents applytoall from working since clickhandler doesn't get updated with the new a2a value
// React.memo(SelectorContent, (prevProps, nextProps)=>{

//   if(prevProps.action != nextProps.action){
//     return false;
//   }

//   let arraysEqual = prevProps.validIds.length == nextProps.validIds.length;

//   for(let i=0; i<prevProps.validIds.length && arraysEqual; i++){
//     if(prevProps.validIds[i] !== nextProps.validIds[i]){
//       arraysEqual = false;
//     }
//   }
//   return arraysEqual;

// });
