import React from "react";
import { Img } from "react-image";
import { Skeleton } from "@mui/material";
import cards from "constants/cards";
import urls from "constants/urls";

function CardImage({ id, handleClick }) {
  const card = cards[id];
  const classes = useStyles();
  return (
    <div
      sx={{
        marginRight: 4,
        zIndex: 1,
        "&:hover": {
          opacity: 0.75,
          transition: ".25s ease",
          cursor: "help",
        },
      }}
    >
      <Img
        alt={card.cardName}
        src={`${urls.cdn}/${card.cardType}Cards/${card.imageName}`}
        loader={<Skeleton className={classes[card.cardType]} />}
        className={classes[card.cardType]}
        onClick={handleClick}
      />
    </div>
  );
}

export default CardImage;
