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
import { PointsChip } from '../CardChip';

function ImagePanel({ card, extraCardImage = false }) {
  if (!card) return null;
  const { cardType, imageName } = card;
  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded={!extraCardImage}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{extraCardImage ? (card.cardType === "battle" ? 'Map': 'Card Back') : 'Card Image'}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: '0px 24px 24px' }}>
          <div>
            <Img
              src={`${urls.cdn}/${cardType}Cards/${extraCardImage ? `extra-${imageName}` : imageName}?${new Date().getTime()}`}
              style={{ width: '100%' }}
            />
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              {(card.cost || card.cost === 0) && <PointsChip value={card.cost}/>}
              <UpgradeBar upgradeBar={card.upgradeBar}/>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default ImagePanel;
