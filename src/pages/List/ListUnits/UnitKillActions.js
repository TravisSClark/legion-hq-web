import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { Icon as IconifyIcon } from '@iconify/react';
import {
  PlusOne as PlusOneIcon,
  ExposureNeg1 as MinusOneIcon,
  AcUnit as AcUnitIcon
} from '@mui/icons-material';

const PREFIX = 'UnitKillActions';

const classes = {
  buttons: `${PREFIX}-buttons`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.buttons}`]: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    minWidth: '72px'
  }
}));

function UnitKillActions({ killUnit, restoreUnit }) {

  const fontSize = 26;
  return (
    <Root className={classes.buttons}>
      <React.Fragment>
        <IconButton
            size="small"
            onClick={restoreUnit}
            style={{ marginLeft: 2, marginRight: 1 }}
        >
          <MinusOneIcon style={{ fontSize }} />
        </IconButton>
        <IconButton
          size="small"
          style={{ margin: 1 }}
        >
          <IconifyIcon
            icon="mdi:skull-crossbones"
            style={{ margin: 3 }}
          />
        </IconButton>
        <IconButton
            size="small"
            onClick={killUnit}
            style={{ marginLeft: 1, marginRight: 2 }}
        >
          <PlusOneIcon style={{ fontSize }} />
        </IconButton>
      </React.Fragment>
    </Root>
  );
}

export default UnitKillActions;
