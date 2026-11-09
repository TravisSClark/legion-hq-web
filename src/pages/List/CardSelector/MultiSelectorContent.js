import React from "react";
import { Collapse, Typography, Divider, IconButton } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import LegionCard from "common/LegionCard";
import ChipCard from "common/LegionCard/ChipCard";
import cards from "constants/cards";

function CollapsedContent({ children, isExpanded }) {
  return (
    <Collapse unmountOnExit timeout="auto" in={isExpanded}>
      {children}
    </Collapse>
  );
}

function MultiSelectorContent({
  action,
  validIds = [],
  invalidIds = [],
  equippedIds = [],
  handleClick,
  handleCardZoom,
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  if (validIds.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography>No eligible cards found</Typography>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <Typography style={{ marginRight: 8 }}>Eligible Commands</Typography>
        <Divider style={{ flexGrow: 1 }} />
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start" }}
      >
        {validIds.map((id) => (
          <LegionCard
            key={id}
            id={id}
            isSelected={equippedIds.includes(id)}
            handleClick={() => handleClick(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
      {invalidIds.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography style={{ marginRight: 8 }}>
            Ineligible Commands
          </Typography>
          <Divider style={{ flexGrow: 1 }} />
          <IconButton
            size="small"
            sx={(theme) => ({
              transform: `rotate(${isExpanded ? 180 : 0}deg)`,
              marginLeft: 1,
              transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
              }),
            })}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      )}
      <CollapsedContent isExpanded={isExpanded}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {invalidIds.map((id) => (
            <ChipCard
              key={id}
              card={cards[id]}
              handleClick={() => handleCardZoom(id)}
            />
          ))}
        </div>
      </CollapsedContent>
    </div>
  );
}

export default MultiSelectorContent;
