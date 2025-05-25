import React from 'react';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import KeywordsPanel from './KeywordsPanel';

function WeaponsPanel({ weapons }) {
  if (!(weapons instanceof Array)) return null;


  const columnContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 24px 24px'
  };
  return (
    <React.Fragment>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Weapons</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={columnContainerStyles}>
          
          {weapons.map(w => {

            return(
            <div key={w.name}>
              <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Typography color="textSecondary">
                  { w.name }
                </Typography>
               
                <div style={{ display:'flex', flexDirection:'row', flex:0, justifyContent:'flex-start'}}>
                  <Typography color="textSecondary">
                    {w.range}
                  </Typography>
                  <Typography color="textSecondary">
                    {w.dice.r}
                  </Typography>
                  <Typography color="textSecondary">
                    {w.dice.w}
                  </Typography>
                  <Typography color="textSecondary">
                    {w.dice.b}
                  </Typography>
                </div>
              </div>
             <KeywordsPanel keywords={w.keywords} variant="caption"/>
            </div>)
          })}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default WeaponsPanel;
