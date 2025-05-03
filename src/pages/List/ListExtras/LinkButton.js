import React from 'react';
import { Chip, TextField } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import ClipboardButton from './ClipboardButton';
import DialogModal from './DialogModal';
import generateLink from './generateLink';

function LinkButton({ currentList }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const listLink = isOpen ? generateLink(currentList) : '';
  return (
    <div style={{ marginRight: 4, marginBottom: 4 }}>
      <Chip
        clickable
        variant="outlined"
        label="Legion HQ Link"
        icon={<LinkIcon />}
        onClick={() => setIsOpen(true)}
      />
      <DialogModal
        isOpen={isOpen}
        title="Legion HQ Link"
        content={<TextField variant="standard" value={listLink} />}
        actions={<ClipboardButton content={listLink} />}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default LinkButton;
