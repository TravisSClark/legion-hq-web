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
  if(currentList.isUsingOldPoints){
    cardsPerDeck = 4;
    decks[0] = {type:'objective', label:"Objectives", cards: currentList.objectiveCards, theme:createMuiTheme({
      palette: { primary: { main: '#274c82' } }
    })};
    decks[1] = {type:'condition', label:"Conditions", cards:currentList.deploymentCards, theme:createMuiTheme({
      palette: { primary: { main: '#38643A' } }
    })};
    decks[2] = {type:'deployment', label:"Deployments", cards:currentList.conditionCards, theme:createMuiTheme({
      palette: { primary: { main: '#963233' } }
    })};
  }else{
    cardsPerDeck = 3;
    decks[0] = {type:'primary', label:"Primaries", cards:currentList.primaryCards, theme:createMuiTheme({
      palette: { primary: { main: '#963233' } }
    })};
    decks[1] = {type:'secondary', label:"Secondaries", cards:currentList.secondaryCards, theme:createMuiTheme({
      palette: { primary: { main: '#E68646' } }
    })};
    decks[2] = {type:'advantage', label:"Advantages", cards:currentList.advantageCards, theme:createMuiTheme({
      palette: { primary: { main: '#306036' } }
    })};
  }

  const battleSelectors = decks.map(d=>
    <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        <ThemeProvider theme={d.theme}>
          {d.cards.length < cardsPerDeck && <Chip
            clickable
            size={chipSize}
            color="primary"
            label= {d.label}
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({
              action: 'BATTLE', type: d.type
            })}
          />}
          {
            d.cards.map((id, i) => (
              <Chip
                color="primary"
                key={id}
                label={cards[id].cardName}
                style={chipStyle}
                onClick={() => handleCardZoom(id)}
                onDelete={() => handleRemoveBattle(d.type, i)}
              />
            ))}
        </ThemeProvider>
      </div>
  );

  return (
    <div
      id="list-objectives"
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center'
      }}
    >
      {battleSelectors}
    </div>
  );
};

export default ListObjectives;
