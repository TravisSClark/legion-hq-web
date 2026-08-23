import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";

function KeywordDialog({ keywords, keyword, isOpen, handleClose }) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle
        style={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: 5,
          justifyContent: "space-between",
        }}
      >
        {keyword}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{keywords[keyword]}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

function BasicKeywordChips({ keywords }) {
  const [isKeywordDialogOpen, setIsKeywordDialogOpen] = React.useState(false);
  const [keywordValue, setKeywordValue] = React.useState("");
  const sortedKeywords = Object.keys(keywords).sort(([a], [b]) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
  const handleCloseDialog = () => {
    setIsKeywordDialogOpen(false);
  };
  const handleOpenDialog = (keyword) => {
    setKeywordValue(keyword);
    setIsKeywordDialogOpen(true);
  };

  return (
    <>
      <KeywordDialog
        keywords={keywords}
        keyword={keywordValue}
        isOpen={isKeywordDialogOpen}
        handleClose={handleCloseDialog}
      />
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Keywords</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: 16 }}>
          <div style={{ display: "flex", flexFlow: "row wrap" }}>
            {sortedKeywords.map((key) => (
              <Chip
                clickable
                onClick={() => handleOpenDialog(key)}
                size={"medium"}
                label={key}
                style={{ marginBottom: 4, marginLeft: 4 }}
              />
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}

export default BasicKeywordChips;
