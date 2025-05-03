import React from 'react';
import { Chip } from '@mui/material';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { Add as AddIcon } from '@mui/icons-material';
import ListContext from 'context/ListContext';
import cards from 'constants/cards';

const chipSize = 'medium';

function ListObjectives() {
  const {
    currentList,
    setCardPaneFilter,
    handleRemoveBattle,
    handleCardZoom
  } = React.useContext(ListContext);
  const chipStyle = { marginRight: 4, marginBottom: 4 };

  let decks = [];
  let cardsPerDeck = 3;
  
  decks[0] = {type:'primary', label:"Primaries", cards:currentList.primaryCards, theme:createTheme(adaptV4Theme({
    palette: { primary: { main: '#963233' } }
  }))};
  decks[1] = {type:'secondary', label:"Secondaries", cards:currentList.secondaryCards, theme:createTheme(adaptV4Theme({
    palette: { primary: { main: '#E68646' } }
  }))};
  decks[2] = {type:'advantage', label:"Advantages", cards:currentList.advantageCards, theme:createTheme(adaptV4Theme({
    palette: { primary: { main: '#306036' } }
  }))};

  const battleSelectors = decks.map(d=>
    <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}  key={d.type}>
        <StyledEngineProvider injectFirst>
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
        </StyledEngineProvider>
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
