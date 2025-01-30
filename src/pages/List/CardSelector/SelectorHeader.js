import React from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';

function SelectorHeader({ headerContent, setCardPaneFilter, moreHeaderContent }) {
  const sticky = {
    top: 0,
    zIndex: 1,
    marginBottom: 4,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    justifyContent: 'space-between',
    position: 'sticky',
    width:'100%'
  };
  return (
    <Paper style={sticky}>
      <div style={{flexDirection:'column', width:'100%'}}>
        <div style={{display:'flex', flex:1, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
          {headerContent}
          <IconButton onClick={() => setCardPaneFilter({ action: 'DISPLAY' })}>
            <ClearIcon />
          </IconButton>
        </div>
        {moreHeaderContent}
      </div>
    </Paper>
  );
}

export default SelectorHeader;
