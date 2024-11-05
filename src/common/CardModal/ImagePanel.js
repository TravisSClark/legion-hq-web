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
import UpgradeBar from '../UpgradeBar';
import CardChip from '../CardChip';

function ImagePanel({ card, usingOriginalImage = false }) {
  if (!card) return null;
  const { cardType, imageName } = card;
  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded={!usingOriginalImage}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{usingOriginalImage ? (card.cardType === "battle" ? 'Map': 'Original Card Image') : 'Current Card Image'}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: '0px 24px 24px' }}>
          <div>
            <Img
              src={`${urls.cdn}/${cardType}Cards/${usingOriginalImage ? `original-${imageName}` : imageName}`}
              style={{ width: '100%' }}
            />
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              {(card.cost || card.cost === 0) && <CardChip type="points" value={card.cost} size={20} />}
              <UpgradeBar upgradeBar={card.upgradeBar}/>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default ImagePanel;
