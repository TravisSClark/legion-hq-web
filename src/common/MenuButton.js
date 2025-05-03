import * as React from 'react';
import {Chip, Menu} from '@material-ui/core';

export default function MenuButton({label="Menu", icon, children}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Chip
        id="basic-button"
        onClick={handleClick}
        label= {label}
        icon={icon}
        variant="outlined"
        style={{ marginRight: 4, marginBottom: 4 }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {children}
      </Menu>
    </div>
  );
}