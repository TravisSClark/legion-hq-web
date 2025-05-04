import React, { useContext } from 'react';
import { Button, Grid, Chip, Avatar } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ListContext from 'context/ListContext';
import CardIcon from 'common/CardIcon';
import cards from 'constants/cards';
import urls from 'constants/urls';

const chipSize = 'medium';

function CommandLabel({ card, handleSwapCommand }) {

  const getNumPips = (card) => {
    if (card.cardSubtype === '1') return '•';
    else if (card.cardSubtype === '2') return '••';
    else if (card.cardSubtype === '3') return '•••';
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        disableRipple
        size="small"
        onClick={handleSwapCommand}
        style={{ textTransform: 'none' }}
      >
        {`${getNumPips(card)} ${card.cardName}`}
      </Button>
    </div>
  );
}

function ListCommands() {
  const {
    currentList,
    setCardPaneFilter,
    handleCardZoom,
    handleRemoveCommand
  } = useContext(ListContext);
  const chipStyle = { marginRight: 4, marginBottom: 4 };
  return (
    <Grid container id="list-commands" direction="row" justifyContent="center">
      {currentList.commandCards.length < 6 && (
        <Grid item>
          <Chip
            size={chipSize}
            label="Command"
            icon={<AddIcon />}
            style={chipStyle}
            onClick={() => setCardPaneFilter({ action: 'COMMAND' })}
          />
        </Grid>
      )}
      {currentList.commandCards.map((cardId, commandIndex) => (
        <Grid item key={cardId}>
          <Chip
            label={(
              <CommandLabel
                card={cards[cardId]}
                cardId={{cardId}}
                handleSwapCommand={() => setCardPaneFilter({ action: 'COMMAND' })}>
                </CommandLabel> )}
            avatar={
              <CardIcon
                size="small"
                card={cards[cardId]}
                handleClick={() => handleCardZoom(cardId)}
              />
            }
            style={chipStyle}
            onDelete={() => handleRemoveCommand(commandIndex)}
          />
        </Grid>
      ))}
      <Grid item>
        <Chip
          label="•••• Standing Orders"
          // size="medium"
          avatar={ <Avatar src={`${urls.cdn}/commandIcons/${cards['aa'].imageName}`} alt="S" sx={{width: 50, height:18}}/> }
          // style={chipStyle}
        />
      </Grid>
    </Grid>
  );
};

export default ListCommands;
