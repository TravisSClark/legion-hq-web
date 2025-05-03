import React  from 'react';
import { Button } from '@mui/material';
import LargerTooltip from 'common/LargerTooltip';
import DataContext from 'context/DataContext';

function LoginButton({ auth }) {
  const {
    isLoginDisabled,
    loginTooltipText,
    loginButtonText,
    loginHandler
  } = React.useContext(DataContext);
  return (
    <LargerTooltip arrow title={loginTooltipText}>
      <Button variant="contained" disabled={isLoginDisabled} onClick={loginHandler}>
        {loginButtonText}
      </Button>
    </LargerTooltip>
  );
};

export default LoginButton;
