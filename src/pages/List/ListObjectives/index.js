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
    handleCardZoom
  } = React.useContext(ListContext);
  const chipStyle = { marginRight: 4, marginBottom: 4 };
  // const objectiveTheme = createMuiTheme({
  //   palette: { primary: { main: '#274c82' } }
  // });
  // const deploymentTheme = createMuiTheme({
  //   palette: { primary: { main: '#38643A' } }
  // });
  // const conditionTheme = createMuiTheme({
  //   palette: { primary: { main: '#963233' } }
  // });
  const advantageTheme = createMuiTheme({
    palette: { primary: { main: '#316037' } }
  });
  const primaryTheme = createMuiTheme({
    palette: { primary: { main: '#8e2f33' } }
  });
  const secondaryTheme = createMuiTheme({
    palette: { primary: { main: '#eb9139' } }
  });
  const primaries = currentList.primaryCards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onClick={() => handleCardZoom(id)}
      onDelete={() => handleRemoveBattle('primary', i)}
    />
  ));
  const secondaries = currentList.secondaryCards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onClick={() => handleCardZoom(id)}
      onDelete={() => handleRemoveBattle('secondary', i)}
    />
  ));
  const advantages = currentList.advantageCards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onClick={() => handleCardZoom(id)}
      onDelete={() => handleRemoveBattle('advantage', i)}
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
        <ThemeProvider theme={primaryTheme}>
          {primaries.length < 4 && <Chip
            clickable
            size={chipSize}
            color="primary"
            label="Primaries"
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({
              action: 'BATTLE', type: 'primary'
            })}
          />}
          {primaries}
        </ThemeProvider>
      </div>
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        <ThemeProvider theme={secondaryTheme}>
          {secondaries.length < 4 && <Chip
            clickable
            size={chipSize}
            color="primary"
            label="Secondary"
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({
              action: 'BATTLE', type: 'secondary'
            })}
          />}
          {secondaries}
        </ThemeProvider>
      </div>
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        <ThemeProvider theme={advantageTheme}>
          {advantages.length < 4 && <Chip
            clickable
            size={chipSize}
            color="primary"
            label="Advantage"
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({
              action: 'BATTLE', type: 'advantage'
            })}
          />}
          {advantages}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ListObjectives;
