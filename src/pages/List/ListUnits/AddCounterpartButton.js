import React from 'react';
import { IconButton, Icon, Avatar } from '@material-ui/core';
import cards from 'constants/cards';
import urls from 'constants/urls';

function AddCounterpartButton({ counterpartId, handleClick }) {
  const { cardName, imageName } = cards[counterpartId];
  const size = 32;
  // TODO: Figure out zoom
  return (
    <IconButton size="small" style={{ marginBottom: 4 }} onClick={handleClick}>
      <Icon style={{ height: size, width: size }}>
        <Avatar
          alt={cardName}
          src={`${urls.cdn}/counterpartCards/${imageName}`}
          style={{ height: size, width: size }}
        />
      </Icon>
    </IconButton>
  );
};

export default AddCounterpartButton;
