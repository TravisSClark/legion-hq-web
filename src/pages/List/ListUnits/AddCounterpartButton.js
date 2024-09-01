import React from 'react';
import { IconButton, Icon, Avatar } from '@material-ui/core';
import cards from 'constants/cards';
import urls, { getIconUrl } from 'constants/urls';

function AddCounterpartButton({ counterpartId, handleClick }) {
  const card = cards[counterpartId];
  const size = 32;
  return (
    <IconButton size="small" style={{ marginBottom: 4 }} onClick={handleClick}>
      <Icon style={{ height: size, width: size }}>
        <Avatar
          alt={card.cardName}
          src={getIconUrl(card)}
          style={{ height: size, width: size }}
        />
      </Icon>
    </IconButton>
  );
};

export default AddCounterpartButton;
