import React from 'react';
import {
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

function HistoryPanel({ history }) {
  if (!(history instanceof Array)) return null;
  const columnContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 24px 24px'
  };
  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>History</Typography>
        </AccordionSummary>
        <AccordionDetails style={columnContainerStyles}>
          {history.map(entry => (
            <div key={entry.description}>
              <Typography variant="caption" color="textSecondary">
                {entry.date}
              </Typography>
              <div style={{ flexGrow: 1 }} />
              <Typography variant="body2">
                {entry.description}
              </Typography>
              <Divider />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};

export default HistoryPanel;
