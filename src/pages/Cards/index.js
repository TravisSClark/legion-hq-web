import React from "react";
import {
  Chip,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Collapse,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Alert from "@material-ui/lab/Alert";
import CardModal from "common/CardModal";
import cards from "constants/cards";
import keywords from "constants/keywords";
import BasicCardChips from "./BasicCardChips";

const useStyles = makeStyles((theme) => ({
  columnContainer: {
    padding: 8,
    display: "flex",
    flexFlow: "column nowrap",
  },
}));

function Cards() {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState();
  const handleCardZoom = (cardId) => {
    setModalContent(cardId);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent();
  };
  const unitCards = {
    trooper: [],
    counterpart: [],
    vehicle: [],
  };
  const upgradeCards = {
    "heavy weapon": [],
    personnel: [],
    force: [],
    command: [],
    hardpoint: [],
    gear: [],
    grenades: [],
    comms: [],
    pilots: [],
    training: [],
    generator: [],
    armament: [],
    crew: [],
    ordnance: [],
  };
  const commandCards = { 1: [], 2: [], 3: [], 4: [] };
  const battleCards = { primary: [], secondary: [], advantage: [] };
  Object.keys(cards)
    .sort((a, b) => {
      const cardA = cards[a];
      const cardB = cards[b];
      const nameA = cardA.displayName ? cardA.displayName : cardA.cardName;
      const nameB = cardB.displayName ? cardB.displayName : cardB.cardName;
      if (nameA > nameB) return 1;
      if (nameA < nameB) return -1;
      return 0;
    })
    .forEach((id) => {
      const card = cards[id];
      if (card.cardType === "unit") {
        if (card.cardSubtype.includes("trooper")) {
          unitCards.trooper.push(id);
        } else if (card.cardSubtype.includes("vehicle")) {
          unitCards.vehicle.push(id);
        }
      } else if (card.cardType === "counterpart") {
        unitCards.counterpart.push(id);
      } else if (card.cardType === "upgrade") {
        if (card.cardSubtype in upgradeCards) {
          upgradeCards[card.cardSubtype].push(id);
        }
      } else if (card.cardType === "command") {
        if (card.cardSubtype in commandCards) {
          commandCards[card.cardSubtype].push(id);
        }
      } else if (card.cardType === "battle") {
        if (card.cardSubtype in battleCards) {
          battleCards[card.cardSubtype].push(id);
        }
      }
    });
  const sortedKeywords = Object.keys(keywords).sort(([a], [b]) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
  return (
    <div className={classes.columnContainer}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Keywords</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: 16 }}>
          <div style={{ display: "flex", flexFlow: "row wrap" }}>
            {sortedKeywords.map((key) => (
              <Chip
                clickable
                size={"medium"}
                label={key}
                style={{ marginBottom: 4, marginLeft: 4 }}
              />
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <CardModal
        id={modalContent}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      />
      <BasicCardChips
        title="Unit Cards"
        cardDict={unitCards}
        handleCardZoom={handleCardZoom}
      />
      <BasicCardChips
        title="Upgrade Cards"
        cardDict={upgradeCards}
        handleCardZoom={handleCardZoom}
      />
      <BasicCardChips
        title="Command Cards"
        cardDict={commandCards}
        handleCardZoom={handleCardZoom}
      />
      <BasicCardChips
        title="Battle Cards"
        cardDict={battleCards}
        handleCardZoom={handleCardZoom}
      />
    </div>
  );
}

export default Cards;
