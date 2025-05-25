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

  const redDie = Object.assign({backgroundColor:'#a00'}, styles.attackDie)
  const blackDie = Object.assign({backgroundColor:'#444', borderWidth:1, borderStyle:'solid', borderColor:'white'}, styles.attackDie)
  const whiteDie = Object.assign({backgroundColor:'#eee', color:'black'}, styles.attackDie)

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
                  <Typography color="textSecondary" style={{marginRight:15}}>
                    {w.range}
                  </Typography>

                  <div style={styles.dieHolder}>
                    <div style={redDie}>
                      <Typography style={{ flex:1, transform:"rotate(-45deg)", textAlign:'center', marginLeft:2}}>
                        {w.dice.r}
                      </Typography>
                    </div>
                  </div>
                  <div style={styles.dieHolder}>

                    <div style={whiteDie}>
                      <Typography style={{ flex:1, transform:"rotate(-45deg)", textAlign:'center'}}>
                        {w.dice.w}
                      </Typography>
                    </div>
                  </div>

                  <div style={styles.dieHolder}>

                    <div style={blackDie}>
                      <Typography style={{ flex:1, transform:"rotate(-45deg)", textAlign:'center', marginLeft:2}}>
                        {w.dice.b}
                      </Typography>
                    </div>
                  </div>
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


// TODO bad... just want something easy for now...
const styles = {
  attackDie: {
    height: 20,
    width: 20,
    // transform: [{rotateX: "45deg"}],
    transform:"rotate(45deg)",
    borderRadius:3,

    rotation: 45

  },

  dieHolder: {
    width:30
  }

}


export default WeaponsPanel;
