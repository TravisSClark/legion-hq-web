import React from 'react';
import Img from 'react-image';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import urls from 'constants/urls';

function ImagePanel({ card, usingOriginalImage = false }) {
  if (!card) return null;
  const { cardType, imageName } = card;

  let url =`${urls.cdn}/${cardType}Cards/${usingOriginalImage ? `original-${imageName}` : imageName}`;
  if(card.newUrl){
    url = `${urls.cdn2}/${cardType}Cards/${imageName}`;
  }
  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded={!usingOriginalImage}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{usingOriginalImage ? 'Original Card Image' : 'Current Card Image'}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: '0px 24px 24px' }}>
          <Img
            src={url}
            style={{ width: '100%' }}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default ImagePanel;
