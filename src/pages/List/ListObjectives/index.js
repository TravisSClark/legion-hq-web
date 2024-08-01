import React from 'react';
import { Chip } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';
import ListContext from 'context/ListContext';
import cards from 'constants/cards';

const chipSize = 'medium';

function ListObjectives() {
  const {
    currentList,
    setCardPaneFilter,
    handleRemoveBattle,
    handleCardZoom,
    userSettings
  } = React.useContext(ListContext);
  const chipStyle = { marginRight: 4, marginBottom: 4 };

  let decks = [];
  let cardsPerDeck = 3;
  if(userSettings.useOldCards){
    cardsPerDeck = 4;
    decks[0] = {type:'objective', label:"Objective", cards: currentList.objectiveCards, theme:createMuiTheme({
      palette: { primary: { main: '#274c82' } }
    })};
    decks[1] = {type:'condition', label:"Condition", cards:currentList.deploymentCards, theme:createMuiTheme({
      palette: { primary: { main: '#38643A' } }
    })};
    decks[2] = {type:'deployment', label:"Deployment", cards:currentList.conditionCards, theme:createMuiTheme({
      palette: { primary: { main: '#963233' } }
    })};
  }else{
    cardsPerDeck = 3;
    decks[0] = {type:'primary', label:"Objective", cards:currentList.primaryCards, theme:createMuiTheme({
      palette: { primary: { main: '#963233' } }
    })};
    decks[1] = {type:'secondary', label:"Secondary", cards:currentList.secondaryCards, theme:createMuiTheme({
      palette: { primary: { main: '#E68646' } }
    })};
    decks[2] = {type:'advantage', label:"Advantage", cards:currentList.advantageCards, theme:createMuiTheme({
      palette: { primary: { main: '#306036' } }
    })};
  }

  const objectives = decks[0].cards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onClick={() => handleCardZoom(id)}
      onDelete={() => handleRemoveBattle(decks[0].type, i)}
    />
  ));
  const deployments = decks[1].cards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onClick={() => handleCardZoom(id)}
      onDelete={() => handleRemoveBattle(decks[1].type, i)}
    />
  ));
  const conditions = decks[2].cards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onClick={() => handleCardZoom(id)}
      onDelete={() => handleRemoveBattle(decks[2].type, i)}
    />
  ));
  return (
    <div
      id="list-objectives"
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        <ThemeProvider theme={decks[0].theme}>
          {objectives.length < 4 && <Chip
            clickable
            size={chipSize}
            color="primary"
            label= {decks[0].label}
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({
              action: 'BATTLE', type: decks[0].type
            })}
          />}
          {objectives}
        </ThemeProvider>
      </div>
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        <ThemeProvider theme={decks[1].theme}>
          {deployments.length < 4 && <Chip
            clickable
            size={chipSize}
            color="primary"
            label={decks[1].label}
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({
              action: 'BATTLE', type: decks[1].type
            })}
          />}
          {deployments}
        </ThemeProvider>
      </div>
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        <ThemeProvider theme={decks[2].theme}>
          {conditions.length < 4 && <Chip
            clickable
            size={chipSize}
            color="primary"
            label={decks[2].label}
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({
              action: 'BATTLE', type: decks[2].type
            })}
          />}
          {conditions}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ListObjectives;
