import React from 'react';
import IconBadge from 'common/IconBadge';
import CardIcon from 'common/CardIcon';
import cards from 'constants/cards';

function UnitCardAvatar({ id, count = 1, handleClick }) {
  const card = cards[id];
  if (card.cardType === 'counterpart') {
    return (
      <CardIcon
        size="medium"
        card={card}
        handleClick={handleClick}
      />
    );
  }
  return (
    <IconBadge
      count={count}
      rank={card.rank}
      avatar={
        <CardIcon
          card={card}
          handleClick={handleClick}
        />
      }
    />
  );
};

export default UnitCardAvatar;
