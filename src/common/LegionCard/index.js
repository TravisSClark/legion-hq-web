import React, { useContext } from 'react';
import DataContext from 'context/DataContext';
import cards from 'constants/cards';
import ImageCard from './ImageCard';
import TextCard from './TextCard';

function LegionCard({
  id,
  isSelected = false,
  handleClick,
  handleCardZoom,
}) {
  const { userSettings } = useContext(DataContext);
  const card = cards[id];
  if (userSettings.cardStyle === 'images') {
    return (
      <ImageCard
        isSelected={isSelected}
        card={card}
        handleClick={isSelected ? undefined : handleClick}
        handleCardZoom={handleCardZoom}
      />
    );
  } else if (userSettings.cardStyle === 'text') {
    return (
      <TextCard
        isSelected={isSelected}
        card={card}
        handleClick={isSelected ? undefined : handleClick}
        handleCardZoom={handleCardZoom}
      />
    );
  } else {
    return null;
  }
};

export default LegionCard;
