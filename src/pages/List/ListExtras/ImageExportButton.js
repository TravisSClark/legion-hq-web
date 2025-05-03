import React, { useState } from 'react';
import domtoimage from 'dom-to-image-more';
import { Chip } from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';
import favicon from 'assets/favicon.svg';
import DialogModal from './DialogModal';

function ImageExport({ currentList }) {
  const [listSrc, setListSrc] = useState();
  const options = {
    cacheBust: true,
    quality: 0.85,
    style: {
      backgroundColor: '#1e2125',
      // font: 'small-caps bold 24px/1 sans-serif'
    }
  };
  if (!listSrc) {
    const list = document.getElementById('list-content');
    domtoimage.toJpeg(list, options).then(src => setListSrc(src));
    return <img alt="loading" className="pulse" src={favicon} />;
  }
  return <img alt="list" src={listSrc} style={{ width: '100%' }} />;
}

function ImageExportButton({ isMobile = false, currentList }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Chip
        clickable
        disabled={currentList.units.length === 0}
        variant="outlined"
        label="Image"
        icon={<ImageIcon />}
        style={{ marginRight: 4, marginBottom: 4 }}
        onClick={() => setIsOpen(true)}
      />
      <DialogModal
        isOpen={isOpen}
        isMobile={isMobile}
        title="Export Image"
        content={<ImageExport currentList={currentList} />}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ImageExportButton;
