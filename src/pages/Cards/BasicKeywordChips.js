import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

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

function BasicKeywordChips({ sortedKeywords, keywords }) {
  const [isKeywordDialogOpen, setIsKeywordDialogOpen] = React.useState(false);
  const [keywordValue, setKeywordValue] = React.useState("");
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
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Keywords</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 16 }}>
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
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default BasicKeywordChips;
