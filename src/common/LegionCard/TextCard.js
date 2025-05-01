import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  Collapse,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grow,
  Divider
} from '@material-ui/core';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import { DefenseChip, PointsChip, SpeedChip, StatChip, SurgeChip } from 'common/CardChip';
import KeywordChips from 'common/KeywordChips';
import CardIcon from 'common/CardIcon';
import IconBadge from 'common/IconBadge';
import UpgradeBar from 'common/UpgradeBar';
import ListContext from 'context/ListContext';

function capitalizeFirstLetters(words) {
  const strings = words.split(' ').map(string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });
  return strings.join(' ');
}

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: { transform: 'rotate(180deg)' },
  card: { width: '100%', marginRight: 4, marginBottom: 4 }
}));

function ReverseWrapper({ children }) {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  };
  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
}

function CounterpartCardHeader({ card, handleClick }) {
  const { isUnique, isUniqueTitle, displayName, cardName } = card;
  const avatar = (
    <CardIcon
      card={card}
    />
  );
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{ margin: 8 }}>
      <AddIcon />
    </IconButton>
  );
  return (
    <CardHeader
      avatar={avatar}
      title={`${isUnique || isUniqueTitle ? '• ' : ''}${displayName ? displayName : cardName}`}
      subheader={capitalizeFirstLetters(card.cardSubtype)}
      action={action}
      style={{ padding: 8 }}
    />
  );
}

function BattleCardHeader({ card, handleClick }) {
  const { cardName, cardType } = card;
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{ margin: 8 }}>
      <AddIcon />
    </IconButton>
  );
  const isRecon = card.keywords.includes('Recon');
  return (
    <CardHeader
      title={cardName}
      subheader={capitalizeFirstLetters(cardType) + 'Card' + isRecon ? '(Recon)' : ''}
      action={action}
      style={{ padding: 8 }}
    />
  );
}

function CommandCardHeader({ card, handleClick }) {
  const { cardName, cardType } = card;
  const{handleCardZoom} = useContext(ListContext);

  const avatar = (
    <CardIcon
      card={card}
      handleClick={()=>{
        handleCardZoom(card.id)
      }}
    />
  );
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{ margin: 8 }}>
      <AddIcon />
    </IconButton>
  );

  let pips = '';
  const subtypeInt = parseInt(card.cardSubtype);
  for(let i=0; subtypeInt && i<subtypeInt; i++){
    pips += '•';
  }

  return (
    <CardHeader
      avatar={avatar}
      title={pips + " " + cardName}
      // subheader={capitalizeFirstLetters(cardType)}
      action={action}
      style={{ padding: 8 }}
    />
  );
}

function UpgradeCardHeader({ card, handleClick }) {
  const { isUnique, isUniqueTitle, displayName, cardName, cardSubtype } = card;
  const avatar = (
    <IconBadge
      upgradeType={cardSubtype}
      avatar={
        <CardIcon
          card={card}
        />
      }
    />
  );
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{ margin: 8 }}>
      <AddIcon />
    </IconButton>
  );
  return (
    <CardHeader
      avatar={avatar}
      title={`${isUnique || isUniqueTitle ? '• ' : ''}${displayName ? displayName : cardName}`}
      subheader={capitalizeFirstLetters(cardSubtype)}
      action={action}
      style={{ padding: 8 }}
    />
  );
}

function UnitCardHeader({ card, handleClick }) {
  const { rank, isUnique, isUniqueTitle, displayName, cardName, cardSubtype } = card;
  const avatar = (
    <IconBadge
      rank={rank}
      avatar={
        <CardIcon
          card={card}
        />
      }
    />
  );
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{ margin: 8 }}>
      <AddIcon />
    </IconButton>
  );
  return (
    <CardHeader
      avatar={avatar}
      title={`${isUnique || isUniqueTitle ? '• ' : ''}${displayName ? displayName : cardName}`}
      subheader={capitalizeFirstLetters(cardSubtype)}
      action={action}
      style={{ padding: 8 }}
    />
  );
}

function CounterpartCardContent({ card, chipSize }) {
  const { cost, wounds } = card;
  return (
    <CardContent style={{ padding: 8, textAlign: 'right' }}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Cost
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <PointsChip value={cost} size={chipSize} />
      </ReverseWrapper>
      <Divider style={{ marginBottom: 4 }} />
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Stats
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <StatChip type="wounds" value={wounds} size={chipSize} />
      </ReverseWrapper>
    </CardContent>
  );
}

function CommandCardContent({ card, chipSize }) {
  const { cardSubtype } = card;
  return (null
    // <CardContent style={{ padding: 8, textAlign: 'right' }}>
    //   <ReverseWrapper>
    //     <Typography variant="body2" color="textSecondary">
    //       Pips
    //     </Typography>
    //     <div style={{ flexGrow: 1 }} />
    //     <Typography variant="body1" style={{ marginRight: 16 }}>
    //       {cardSubtype}
    //     </Typography>
    //   </ReverseWrapper>
    // </CardContent>
  );
}

function BattleCardContent({ card, chipSize }) {
  const { cardSubtype } = card;
  return (
    <CardContent style={{ padding: 8, textAlign: 'right' }}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Type
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Typography variant="body1" style={{ marginRight: 16 }}>
          {capitalizeFirstLetters(cardSubtype)}
        </Typography>
      </ReverseWrapper>
    </CardContent>
  );
}

function UpgradeCardContent({ card, chipSize }) {
  const { cost } = card;
  return (
    <CardContent style={{ padding: 8, textAlign: 'right' }}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Cost
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <PointsChip value={cost} size={chipSize} />
      </ReverseWrapper>
    </CardContent>
  );
}

function UnitCardContent({ card, chipSize }) {
  const {
    cost,
    wounds,
    resilience,
    courage,
    speed,
    defense,
    surges,
    upgradeBar
  } = card;
  return (
    <CardContent style={{ padding: 8, textAlign: 'right' }}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">Cost</Typography>
        <div style={{ flexGrow: 1 }} />
        <PointsChip value={cost} size={chipSize} />
      </ReverseWrapper>
      <Divider style={{ marginBottom: 4 }} />
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Stats
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <StatChip type="wounds" value={wounds} size={chipSize} />
        {resilience ? (
          <StatChip type="resilience" value={resilience} size={chipSize} />
        ) : (
          <StatChip type="courage" value={courage} size={chipSize} />
        )}
        <SpeedChip value={speed} size={chipSize} />
        <DefenseChip type="defense" value={defense} size={chipSize} />
        <SurgeChip type="surges" value={surges} size={chipSize} />
      </ReverseWrapper>
      <Divider style={{ marginBottom: 4 }} />
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Upgrades
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <UpgradeBar upgradeBar={upgradeBar} />
      </ReverseWrapper>
    </CardContent>
  );
}

function TextCardActions({ card, chipSize, isExpanded, handleExpandClick }) {
  const classes = useStyles();
  return (
    <CardActions disableSpacing style={{ padding: '0 8px 8px' }}>
      <IconButton
        size="medium"
        className={clsx(classes.expand, {
          [classes.expandOpen]: isExpanded,
        })}
        onClick={handleExpandClick}
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
  );
}

function TextCardCollapsedContent({ card, chipSize, isExpanded, handleCardZoom }) {
  const { keywords } = card;
  return (
    <Collapse unmountOnExit timeout="auto" in={isExpanded}>
      {keywords.length > 0 && (
        <CardContent style={{ padding: 8 }}>
          <KeywordChips size={chipSize} keywords={keywords} />
        </CardContent>
      )}
      <CardActions>
        <Button
          size="medium"
          style={{ marginLeft: 'auto' }}
          onClick={handleCardZoom}
        >
          Show more
        </Button>
      </CardActions>
    </Collapse>
  );
}

function TextCard({ card, handleClick, handleCardZoom }) {
  const chipSize = 'small';
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);

  let cardContents = null;
  let showActions = true;


  switch(card.cardType){
    case 'unit':
      cardContents = (
        <div>
          <UnitCardHeader card={card} handleClick={handleClick} />
          <UnitCardContent card={card} chipSize={chipSize} />
        </div>
      );
      break;
    case 'upgrade':
      cardContents = (
        <div>
          <UpgradeCardHeader card={card} handleClick={handleClick} />
          <UpgradeCardContent card={card} chipSize={chipSize} />
        </div>
      );
      break;
    case 'counterpart':
      cardContents = (
        <div>
          <CounterpartCardHeader card={card} handleClick={handleClick} />
          <CounterpartCardContent card={card} chipSize={chipSize} />
        </div>
      );
      break;
    case 'command':
      cardContents = (
        <div>
          <CommandCardHeader card={card} handleClick={handleClick} />
          <CommandCardContent card={card} chipSize={chipSize} />
        </div>
      );
      showActions = false;
      break;
    case 'battle':
      cardContents = (
        <div>
          <BattleCardHeader card={card} handleClick={handleClick} />
          <BattleCardContent card={card} chipSize={chipSize} />
        </div>
      );
      break;
  }

  return (
    <Grow unmountOnExit in={true}>
      <Card className={classes.card}>
        {/* <TextCardHeader card={card} handleClick={handleClick} />
        <TextCardContent card={card} chipSize={chipSize} /> */}
        {cardContents}
        
        { showActions &&
          <TextCardActions
            card={card}
            chipSize={chipSize}
            isExpanded={isExpanded}
            handleExpandClick={handleExpandClick}
          /> 
        }
        { showActions &&
          <TextCardCollapsedContent
            card={card}
            isExpanded={isExpanded}
            chipSize={chipSize}
            handleCardZoom={handleCardZoom}
          />
        }
      </Card>
    </Grow>
  );
};

export default TextCard;
