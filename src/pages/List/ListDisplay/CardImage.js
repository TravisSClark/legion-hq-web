import React from "react";
import { Img } from "react-image";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/material";
import cards from "constants/cards";
import urls from "constants/urls";

const styles = {
  container: {
    marginRight: 4,
    zIndex: 1,
    "&:hover": {
      transition: ".25s ease",
      cursor: "pointer",
      opacity: 0.75,
    },
  },
  unit: { width: 210, height: 150 },
  upgrade: { width: "auto", minWidth: 96, height: 150 },
  command: { width: 150, height: 210 },
  counterpart: { width: 210, height: 150 },
};

function CardImage({ id, handleClick }) {
  const card = cards[id];
  const cardStyle = styles[card.cardType] || styles.unit;

  return (
    <Box sx={styles.container}>
      <Img
        alt={card.cardName}
        src={`${urls.cdn}/${card.cardType}Cards/${card.imageName}`}
        loader={<Skeleton variant="rect" sx={cardStyle} />}
        style={cardStyle}
        onClick={handleClick}
      />
    </Box>
  );
}

export default CardImage;
