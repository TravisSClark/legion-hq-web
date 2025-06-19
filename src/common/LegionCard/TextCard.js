import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  Collapse,
  Card,
  CardHeader,
  CardContent,
  Grow,
  Divider,
  Avatar
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

function isUniqueCard(card){
  return card.isUnique || card.isUniqueTitle;
}

// TODO a lot of this would be better if it shrunk based on screen width. For now, shave some space off to make mobile easier to use
// (ie Compact is made with mobile first in mind)
function TextCardHeader({ card, handleClick, handleExpandClick, hideExpand, isCardExpanded }) {
  const { cardName, cardType, cardSubtype } = card;
  const{handleCardZoom} = useContext(ListContext);

  const isRecon = card.keywords.includes('Recon');

  let showPoints = !['battle', 'command'].includes(card.cardType);

  // switch IconBadge props based on cardType
  let avatar = (
    <IconBadge
      upgradeType={cardType === 'upgrade' ? cardSubtype: null}
      rank={cardType === 'unit' ? card.rank: null}
      hidden={cardType === 'command' || cardType === 'counterpart' || cardType === 'battle'}
      avatar={
        <CardIcon
          size="medium" // default large
          card={card}
          handleClick={()=>{
            handleCardZoom(card.id)
          }}
        />
      }
    />
  );

  if(cardType === "battle"){
    // TODO stop repeating this code/color map
    let bgColor = "#953233";
    let textColor = "#eee"
    if(cardSubtype === 'secondary'){
      bgColor = "#E68646";
      textColor="#000"
    }else if(cardSubtype === 'advantage'){
      bgColor = '#306036';
    }

    let avatarText = card.cardName.split(' ').map(s=>s.substring(0,1)).filter(s=>s.toUpperCase()===s).slice(0,2).join('');

    avatar = <Avatar style={{ backgroundColor: bgColor, color:textColor }}  onClick={()=>{
      handleCardZoom(card.id)
    }}>{avatarText}</Avatar>;
  }

  // Add button, same for every type, simply passing thru the 'add this card' handler
  const action = (
    <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
      { showPoints && !isCardExpanded && <PointsChip compact={true} value={card.cost}></PointsChip>}
      {!hideExpand(card) && <IconButton size="medium" onClick={handleExpandClick}>
        <ExpandMoreIcon />
      </IconButton>}
      <IconButton size="medium" onClick={handleClick}>
        <AddIcon />
      </IconButton>
    </div>
  );

  // Header text. Add pips for uniques+CCs, add (Recon) if it's a recon battlecard
  let pipCount = parseInt(card.cardSubtype);
  pipCount = isUniqueCard(card) ? 1 : pipCount;
  pipCount = card.uniqueCount ? card.uniqueCount : pipCount;

  let pips = '•'.repeat(pipCount) + (pipCount > 0 ? " ":"");

  let subheader = capitalizeFirstLetters(cardSubtype) + (isRecon ? ' (Recon)' : '');
  if(cardType === "command"){
    subheader = "Command";
  }

  const title = <Typography onClick={()=>{
    handleCardZoom(card.id)
  }}>{pips}{cardName}</Typography>

  // TODO see if there's a way to left-align the (+) and have no space on header; did not see one in ~5s of reviewing MUI page
  return (
    <CardHeader
      avatar={avatar}
      // title={`${pips}${displayName ? displayName : cardName}`}
      title={title}
      subheader={subheader}
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
    resilience,
    upgradeBar,
  } = card;


  let stats = card.stats;
  if(!stats){
    stats = {};
  }

  const defense = stats.defense === 'w' ? 'white' : 'red';
  const surges = [];
  if(stats.hitsurge === 'h'){
    surges.push('hit');
  }
  else if(stats.hitsurge === 'c'){
    surges.push('crit');
  }

  if(stats.defsurge === 'b'){
    surges.push('block');
  }

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
        <StatChip type="wounds" value={stats.hp} size={chipSize} />
        {resilience ? (
          <StatChip type="resilience" value={resilience} size={chipSize} />
        ) : (
          <StatChip type="courage" value={stats.courage} size={chipSize} />
        )}
        <SpeedChip speed={stats.speed} size={chipSize} />
        <DefenseChip type="defense" color={defense} size={chipSize} />
        <SurgeChip type="surges" surges={surges} size={chipSize} />
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

function TextCard({ card, handleClick, isExpanded:expandAtStart }) {
  const chipSize = 'small';
  const classes = useStyles();
  const hideExpand = c => c.cardType !== 'unit' && c.cardType !== 'upgrade' && !(c.keywords?.length)

  // default to open
  const [isExpanded, setIsExpanded] = React.useState(expandAtStart !== undefined ? expandAtStart: !hideExpand(card));
  const handleExpandClick = () => setIsExpanded(!isExpanded);

  let cardContents = null;

  switch(card.cardType){
    case 'unit':
      cardContents = (
          <UnitCardContent card={card} chipSize={chipSize} />
      );
      break;
    case 'upgrade':
      cardContents = (
          <UpgradeCardContent card={card} chipSize={chipSize} />
      );
      break;
    case 'counterpart':
      cardContents = (
          <CounterpartCardContent card={card} chipSize={chipSize} />
      );
      break;
    case 'command':
      cardContents = null;
      break;
    case 'battle':
      cardContents = null;
      break;
    default:
      cardContents = (
          <UnitCardContent card={card} chipSize={chipSize} />
      );
      break;
  }

  return (
    <Grow unmountOnExit in={true}>
      <Card className={classes.card}>
        <TextCardHeader hideExpand={hideExpand} isCardExpanded={isExpanded}
          card={card} handleClick={handleClick} handleExpandClick={handleExpandClick}
        />
        <Collapse in={isExpanded}>

          {cardContents}
          
          <CardContent style={{ padding: 8 }}>
            <KeywordChips size={chipSize} keywords={card.keywords} />
          </CardContent>
        </Collapse>
      </Card>
    </Grow>
  );
};

export default TextCard;
