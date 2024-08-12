import React, { useState, useContext } from 'react';
import { Chip, Menu, MenuItem } from '@material-ui/core';
import ListContext from 'context/ListContext';

export default function GameChangeButton() {
    const { currentList, handleSetGame } = useContext(ListContext);
    const [anchorEl, setAnchorEl] = useState();

    const handleOpenMenu = event => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl();

    return (
        <React.Fragment>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem
                  onClick={() => {
                    handleSetGame('legion');
                    handleCloseMenu();
                  }}
                >
                    Legion
                </MenuItem>
            </Menu>
            <Chip
                clickable
                variant="outlined"
                label={currentList.game === 'legion' ? 'Game: Legion' : currentList.game}
                onClick={handleOpenMenu}
                style={{ marginRight: 4, marginBottom: 4 }}
            />
        </React.Fragment>
    );
}
