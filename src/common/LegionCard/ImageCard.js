import React, { useState } from "react";
import {
  Grow,
  IconButton,
  Collapse,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardActionArea,
  Chip,
  Tooltip,
} from "@mui/material";
import clsx from "clsx";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { PointsChip } from "common/CardChip";
import KeywordChips from "common/KeywordChips";
import urls from "constants/urls";
import UpgradeBar from "../UpgradeBar";

const styles = {
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
  },
  expandOpen: { transform: "rotate(180deg)" },
  selected: { border: "1px solid lightblue" },
  card: { marginRight: 4, marginBottom: 4 },
  unitCard: { maxWidth: 315 },
  commandCard: { maxWidth: 225 },
  upgradeCard: { maxWidth: 150 },
  unitImage: { width: 315, height: 225 },
  upgradeImage: { width: 150, height: 232.5 },
  commandImage: { width: 225, height: 315 },
  battleImage: { width: 225, height: 450 },
  doubleUpgrade: { width: 300 },
};

function ImageCard({ isSelected, card, handleClick, handleCardZoom }) {
  const chipSize = "small";
  const {
    cost,
    cardType,
    cardSubtype,
    cardName,
    displayName,
    keywords,
    imageName,
    upgradeBar,
  } = card;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isIn, setIn] = useState(true);

  const handleExpandClick = () => setIsExpanded(!isExpanded);
  const isDoubleSided = cardType === "upgrade" && card.isDoubleSided;

  let flickerCard = () => {
    setIn(false);
    setTimeout(() => setIn(true), 200);
  };

  return (
    <Grow in={isIn}>
      <Card
        sx={{
          ...styles.card,
          ...(isSelected ? styles.selected : {}),
          ...(cardType === "unit" ? styles.unitCard : {}),
          ...(cardType === "upgrade" && !isDoubleSided
            ? styles.upgradeCard
            : {}),
          ...(isDoubleSided ? styles.doubleUpgrade : {}),
          ...(cardType === "command" || cardType === "battle"
            ? styles.commandCard
            : {}),
        }}
      >
        <CardActionArea
          disableRipple={true}
          onClick={() => {
            handleClick();
            flickerCard();
          }}
        >
          <CardMedia
            title={displayName ? displayName : cardName}
            image={`${urls.cdn}/${cardType}Cards/${imageName}`}
            sx={{
              ...(cardType === "unit" || cardType === "counterpart"
                ? styles.unitImage
                : {}),
              ...(cardType === "battle" && cardSubtype === "primary"
                ? styles.battleImage
                : {}),
              ...(cardType === "upgrade" ? styles.upgradeImage : {}),
              ...(cardType === "command" ||
              (cardType === "battle" && cardSubtype !== "primary")
                ? styles.commandImage
                : {}),
              ...(isDoubleSided ? styles.doubleUpgrade : {}),
            }}
          />
        </CardActionArea>
        <CardActions disableSpacing>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {(cost || cost === 0) && (
              <PointsChip value={cost} size={chipSize} />
            )}
            {card.isUnreleased && (
              <Tooltip
                title={`This unit/upgrade is unreleased, on the roadmap for a ${card.isUnreleased} release, not yet legal for organized play.\nPoints, keywords, or upgrades may be absent or incorrect.`}
              >
                <Chip
                  size={chipSize}
                  style={{
                    marginBottom: 4,
                    marginRight: 4,
                    backgroundColor: "orange",
                  }}
                />
              </Tooltip>
            )}
            {(cardType === "unit" || cardType === "counterpart") && (
              <UpgradeBar upgradeBar={upgradeBar} iconHeight={20} />
            )}
          </div>
          <IconButton
            size="small"
            aria-expanded={isExpanded}
            sx={(theme) => ({
              ...styles.expand,
              transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
              }),
              ...(isExpanded ? styles.expandOpen : {}),
            })}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse unmountOnExit timeout="auto" in={isExpanded}>
          {keywords.length > 0 && (
            <CardActions sx={styles.card}>
              <KeywordChips size={chipSize} keywords={keywords} />
            </CardActions>
          )}
          <CardActions>
            <Button
              size="small"
              style={{ marginLeft: "auto" }}
              onClick={handleCardZoom}
            >
              Show More
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    </Grow>
  );
}

export default ImageCard;
