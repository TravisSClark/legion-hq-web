import React from "react";
import Img from "react-image";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import urls from "constants/urls";
import UpgradeBar from "../UpgradeBar";
import { PointsChip } from "../CardChip";

function ImagePanel({
  card,
  extraCardImage = false,
  originalCardImage = false,
}) {
  if (!card) return null;
  const { cardType, imageName } = card;
  let label = "";
  if (extraCardImage) {
    if (cardType === "battle") {
      label = "Map";
    } else {
      label = "Card Back";
    }
  } else if (originalCardImage) {
    label = "Original Card Image";
  }
  let startUrl = "";
  if (extraCardImage) startUrl = "extra-";
  else if (originalCardImage) startUrl = "original-";
  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded={!extraCardImage && !originalCardImage}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{label}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: "0px 24px 24px" }}>
          <div>
            <Img
              src={`${urls.cdn}/${cardType}Cards/${startUrl + imageName}`}
              style={{ width: "100%" }}
            />
            {!extraCardImage && !originalCardImage && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {(card.cost || card.cost === 0) && (
                  <PointsChip value={card.cost} />
                )}
                <UpgradeBar upgradeBar={card.upgradeBar} />
              </div>
            )}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
}

export default ImagePanel;
