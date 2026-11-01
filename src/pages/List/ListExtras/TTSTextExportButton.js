import React, { useState } from 'react';
import {
  useMediaQuery,
  Chip,
  TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Description as TextIcon } from '@mui/icons-material';
import { generateTTSJSONText } from 'components/printList';
import DialogModal from './DialogModal';
import ClipboardButton from './ClipboardButton';

function TTSTextExportButton({ currentList }) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ttsJSON = isOpen ? generateTTSJSONText(currentList) : null;

  const isFullscreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div style={{ marginRight: 4, marginBottom: 4 }}>
      <Chip
        clickable
        variant="outlined"
        label="TTS JSON"
        icon={<TextIcon />}
        onClick={() => setIsOpen(true)}
      />
      <DialogModal
        isMobile={isFullscreen}
        isOpen={isOpen}
        actions={<ClipboardButton content={ttsJSON} autoCopy={true}/>}
        content={
         <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
            <TextField
              multiline
              size="small"
              variant="outlined"
              value={ttsJSON}
              style={{ padding: 8, width: '100%' }}
            />
          </div>
        }
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default TTSTextExportButton;
