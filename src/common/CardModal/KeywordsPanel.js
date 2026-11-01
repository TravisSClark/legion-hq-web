import React from "react";
import {
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import keywords from "constants/keywords";

function drawKeyword(kw) {
  let keyword = kw;
  if (typeof keyword === "string") {
    keyword = { name: kw };
  }

  return (
    <div key={keyword.name}>
      <Typography variant="caption" color="textSecondary">
        {keyword.name +
          (!keyword.value
            ? ""
            : (Number.isInteger(keyword.value) ? " " : ": ") + keyword.value)}
      </Typography>
      <div style={{ flexGrow: 1 }} />
      <Typography variant="body2">
        {keyword.name in keywords
          ? keywords[keyword.name]
          : "No definition found."}
      </Typography>
      <Divider />
    </div>
  );
}

function KeywordsPanel({ card, variant = "inherit" }) {
  const cardKeywords = card.keywords;

  if (!(cardKeywords instanceof Array)) return null;
  else if (cardKeywords.length === 0 && card.weapons === undefined) return null;
  const columnContainerStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "0px 24px 24px",
  };
  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant={variant}>Keywords</Typography>
        </AccordionSummary>
        <AccordionDetails style={columnContainerStyles}>
          {cardKeywords?.map((kw) => drawKeyword(kw))}

          {card.weapons?.map((w) => w.keywords?.map((kw) => drawKeyword(kw)))}
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}

export default KeywordsPanel;
