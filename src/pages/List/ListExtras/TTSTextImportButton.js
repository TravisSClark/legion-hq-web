import React, { useContext, useState } from 'react';
import {
  useMediaQuery,
  Chip,
  TextField,
  Button
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Description as TextIcon } from '@material-ui/icons';
import DialogModal from './DialogModal';

import{
  convertJsonToList
} from 'components/listLoadAndHash'
import ListContext from 'context/ListContext';


function TTSTextImportButton({ currentList }) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const [jsonText, setJsonText] = useState('');
  const {loadList} = useContext(ListContext);

  const isFullscreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div style={{ marginRight: 4, marginBottom: 4 }}>
      <Chip
        clickable
        variant="outlined"
        label="Import JSON..."
        icon={<TextIcon />}
        onClick={() => setIsOpen(true)}
      />
      <DialogModal
        isMobile={isFullscreen}
        title="Import JSON"
        isOpen={isOpen}
        actions={[
          <Button onClick={()=>{
            let list = convertJsonToList(jsonText); 
            loadList(list);
            setIsOpen(false);
          }}>Import</Button>
        ]}
        content={
         <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
            <TextField
              multiline
              placeholder='Paste your .json here...'
              value={jsonText}
              minRows={10}
              size="small"
              variant="outlined"
              onChange={(e)=>setJsonText(e.target.value)}
              style={{ padding: 8, width: '100%' }}
            />
          </div>
        }
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default TTSTextImportButton;
