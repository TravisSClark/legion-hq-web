import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

function DialogModal({
  isOpen, isMobile = false, title, content, actions, handleClose
}) {
  const dialogStyle = title ? {} : { padding: 0 };
  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={isOpen}
      fullScreen={isMobile}
      onClose={handleClose}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent style={dialogStyle}>
        {content}
      </DialogContent>
      <DialogActions>
        {isMobile ? (
          <DialogActions>
            {actions}
            <Button
              size="large"
              onClick={handleClose}
            >
              Go Back
            </Button>
          </DialogActions>
        ) : actions}
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;
