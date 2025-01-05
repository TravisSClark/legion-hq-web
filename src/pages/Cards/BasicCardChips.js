import React from 'react';
import clsx from 'clsx';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Divider,
  Collapse,
  IconButton,
  makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cards from 'constants/cards';
import ChipCard from 'common/LegionCard/ChipCard';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: { transform: 'rotate(180deg)' },
  divider: { flexGrow: 1, margin: '0 8px' }
}));

function capitalizeFirstLetters(words) {
  const strings = words.split(' ').map(string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });
  return strings.join(' ');
}


function CollapsedContent({ label, cardIds, handleCardZoom }) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  return (
    <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
      <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
        <Typography>
          {capitalizeFirstLetters(label)}
        </Typography>
        <Divider className={classes.divider} />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: isExpanded,
          })}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <Collapse unmountOnExit timeout="auto" in={isExpanded}>
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
          {cardIds.map(cardId => (
            <ChipCard
              key={cardId}
              card={cards[cardId]}
              handleClick={() => handleCardZoom(cardId)}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
}

function BasicCardChips({ title, cardDict, handleCardZoom }) {
  const keys = Object.keys(cardDict);
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ padding: 16 }}>
        <div style={{ display: 'flex', flexFlow: 'column', width: '100%' }}>
          {keys.map(key => (
            <CollapsedContent
              key={key}
              label={key}
              cardIds={cardDict[key]}
              handleCardZoom={handleCardZoom}
            />
          ))}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default BasicCardChips;
