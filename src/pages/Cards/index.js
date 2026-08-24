import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import CardModal from "common/CardModal";
import cards from "constants/cards";
import keywords from "constants/keywords";
import BasicCardChips from "./BasicCardChips";
import BasicKeywordChips from "./BasicKeywordChips";

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
  const [search, setSearch] = React.useState("");
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

  const sortedKeywords = Object.keys(keywords)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .filter((keyword) => keyword.toLowerCase().includes(search.toLowerCase()));

  var inKeywords = (keywordList) => {
    return keywordList?.some(
      (keyword) =>
        keyword["name"]?.toLowerCase().includes(search.toLowerCase()) ||
        (keyword.toLowerCase?.() &&
          keyword.toLowerCase().includes(search.toLowerCase())),
    );
  };

  var includesSearch = (card) => {
    return (
      card.cardName.toLowerCase().includes(search.toLowerCase()) ||
      card.displayName?.toLowerCase().includes(search.toLowerCase()) ||
      inKeywords(card.keywords) ||
      card.weapons?.some((w) => inKeywords(w.keywords))
    );
  };

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
        if (includesSearch(card)) {
          if (card.cardSubtype.includes("trooper")) {
            unitCards.trooper.push(id);
          } else if (card.cardSubtype.includes("vehicle")) {
            unitCards.vehicle.push(id);
          }
        }
      } else if (card.cardType === "counterpart") {
        if (includesSearch(card)) {
          unitCards.counterpart.push(id);
        }
      } else if (card.cardType === "upgrade") {
        if (includesSearch(card)) {
          if (card.cardSubtype in upgradeCards) {
            upgradeCards[card.cardSubtype].push(id);
          }
        }
      } else if (card.cardType === "command") {
        if (card.cardSubtype in commandCards) {
          if (includesSearch(card)) {
            commandCards[card.cardSubtype].push(id);
          }
        }
      } else if (card.cardType === "battle") {
        if (card.cardName.toLowerCase().includes(search.toLowerCase())) {
          if (card.cardSubtype in battleCards) {
            battleCards[card.cardSubtype].push(id);
          }
        }
      }
    });
  return (
    <div className={classes.columnContainer}>
      <TextField
        label="Filter By Unit or Keyword"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <BasicKeywordChips sortedKeywords={sortedKeywords} keywords={keywords} />
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
