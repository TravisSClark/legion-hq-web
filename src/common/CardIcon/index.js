import { Img } from "react-image";
import { Skeleton } from "@mui/material";
import urls from "constants/urls";

const sizeStyles = {
  large: { width: 62.5, height: 50 },
  medium: { width: 50, height: 40 },
  small: { width: 40, height: 32 },
};

function CardIcon({ size = "large", handleClick, card }) {
  const placeholder = (
    <Skeleton variant="rect" sx={{ ...sizeStyles[size], borderRadius: 25 }} />
  );
  return (
    <Img
      decode={false}
      alt={card.cardName}
      src={`${urls.cdn}/${card.cardType}Icons/${card.imageName}`}
      sx={{
        ...sizeStyles[size],
        objectFit: "cover",
        marginLeft: 0,
        borderRadius: 25,
        scale: 5,
        cursor: handleClick !== undefined ? "pointer" : undefined,
      }}
      loader={placeholder}
      onClick={handleClick}
    />
  );
}

export default CardIcon;
