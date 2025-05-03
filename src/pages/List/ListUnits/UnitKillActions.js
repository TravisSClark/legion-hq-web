import React from 'react';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Icon as IconifyIcon } from '@iconify/react';
import {
  PlusOne as PlusOneIcon,
  ExposureNeg1 as MinusOneIcon,
  AcUnit as AcUnitIcon
} from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    minWidth: '72px'
  }
}));

function UnitKillActions({ killUnit, restoreUnit }) {
  const classes = useStyles();
  const fontSize = 26;
  return (
    <div className={classes.buttons}>
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
    </div>
  );
};

export default UnitKillActions;
