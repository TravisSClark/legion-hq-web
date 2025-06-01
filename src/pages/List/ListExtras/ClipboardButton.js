import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';

function ClipboardButton({ content, variant = 'text', autoCopy=false }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const priorContent = useRef('');

  const doCopy = ()=>{

    if(content === null){
      return;
    }
    navigator.clipboard.writeText(content);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1000); // 0.5 second cooldown

    priorContent.current = content;
  }

  useEffect(()=> { if(autoCopy && priorContent.current !== content)doCopy()});

  return (
    <Button
      variant={variant}
      disabled={copySuccess}
      onClick={() => {
        doCopy();
      }}
    >
      {copySuccess ? 'Copied to clipboard!' : 'Copy to clipboard'}
    </Button>
  );
};

export default ClipboardButton;
