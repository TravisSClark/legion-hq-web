import React from 'react';
import {
  Divider,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import keywords from 'constants/keywords';

function KeywordsPanel({ cardKeywords }) {
  if (!(cardKeywords instanceof Array)) return null;
  else if (cardKeywords.length === 0) return null;
  const columnContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 24px 24px'
  };
  return (
    <React.Fragment>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Keywords</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={columnContainerStyles}>
          {cardKeywords.map(keyword => (
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="caption" color="textSecondary">{keyword}</Typography>
              </ExpansionPanelSummary>
              <div key={keyword}>
                <Typography variant="body2">
                  {keyword in keywords ? keywords[keyword].full : 'No definition found.'}
                </Typography>
              </div>
            </ExpansionPanel>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default KeywordsPanel;
