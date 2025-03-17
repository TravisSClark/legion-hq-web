import React from 'react';
import Fade from '@material-ui/core/Fade';
import favicon from 'assets/favicon.svg';

function LoadingWidget() {
  return (
    <Fade in>
      <div
        style={{
          top: '44%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <img alt="Loading..." className="pulse" src={favicon} />
      </div>
    </Fade>
  );
};

export default LoadingWidget;
