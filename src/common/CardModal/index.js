import React from "react";
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import cards from "constants/cards";
import ImagePanel from "./ImagePanel";
import KeywordsPanel from "./KeywordsPanel";
import HistoryPanel from "./HistoryPanel";

function CardModal({ id, isOpen, handleClose }) {
  const theme = useTheme();
  const isFullscreen = useMediaQuery(theme.breakpoints.down("sm"));
  if (!id) return null;
  const card = cards[id];
  return (
    <Dialog fullScreen={isFullscreen} open={isOpen} onClose={handleClose}>
      <DialogTitle style={{ padding: "16px 16px 0" }}>
        {card.displayName ? card.displayName : card.cardName}
      </DialogTitle>
      {card.title && (
        <DialogContentText
          style={{ padding: "0 0 16px 32px", marginBottom: 0 }}
        >
          {card.title}
        </DialogContentText>
      )}
      <DialogContent style={{ padding: 8 }}>
        <ImagePanel card={card} />
        {["unit", "battle"].includes(card.cardType) && (
          <ImagePanel card={card} extraCardImage={true} />
        )}
        <KeywordsPanel card={card} />
        {card.history && <HistoryPanel history={card.history.reverse()} />}
      </DialogContent>
      {isFullscreen && (
        <DialogActions>
          <Button size="large" onClick={handleClose}>
            Go Back
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default CardModal;
