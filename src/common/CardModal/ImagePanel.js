import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import urls from 'constants/urls';
import UpgradeBar from '../UpgradeBar';
import { PointsChip } from '../CardChip';

function ImagePanel({ card, extraCardImage = false }) {
  if (!card) return null;
  const { cardType, imageName } = card;
  return (
    <React.Fragment>
      <Accordion defaultExpanded={!extraCardImage}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{extraCardImage ? (card.cardType === "battle" ? 'Map': 'Card Back') : 'Card Image'}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: '0px 24px 24px' }}>
          <div>
            <img
              src={`${urls.cdn}/${cardType}Cards/${extraCardImage ? `extra-${imageName}` : imageName}`}
              style={{ width: '100%' }}
            />
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              {(card.cost || card.cost === 0) && <PointsChip value={card.cost}/>}
              <UpgradeBar upgradeBar={card.upgradeBar}/>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};

export default ImagePanel;
