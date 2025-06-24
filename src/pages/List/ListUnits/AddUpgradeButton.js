import React from 'react';
import { IconButton, Icon, Avatar } from '@material-ui/core';
import upgradeTypes from 'constants/upgradeTypes';

function AddUpgradeButton({ type, handleClick, special=false }) {
  const size = 32;

  return (
    <IconButton size="small" style={{ marginBottom: 4 }} onClick={handleClick}>
      <Icon style={{ height: size, width: size, backgroundColor: special?'blue':'transparent' }} color={'error'}>
        <Avatar
          color='error'
          alt={type}
          src={upgradeTypes[type].icon}
          style={{ height: size, width: size }}
        />
      </Icon>
    </IconButton>
  );
};

export default AddUpgradeButton;
