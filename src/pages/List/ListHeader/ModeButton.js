import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Chip, Menu, MenuItem, MenuList } from '@material-ui/core';
import LargerTooltip from 'common/LargerTooltip';
import legionModes from 'constants/legionModes';
import DataContext from 'context/DataContext';

function ModeButton({ currentMode, points, maxPoints, tooltip, handleChangeMode }) {
  const [anchorEl, setAnchorEl] = useState();
  const handleOpenMenu = event => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl();
  const {userSettings} = useContext(DataContext);

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuList>
          { Object.getOwnPropertyNames(legionModes).map( modeName =>{
            const mode = legionModes[modeName];

            if(!userSettings.showStormTide && modeName.includes("storm tide"))
              return null;

            return(
              <MenuItem
              selected={currentMode === modeName}
              onClick={() => {
                handleChangeMode(modeName);
                handleCloseMenu();
              }}
            >{mode.name} ({mode.maxPoints} pts)</MenuItem>
            );
          })
        }
        </MenuList>
      </Menu>
      <LargerTooltip title={legionModes[currentMode].name}>
        <Chip
          clickable
          variant={points > maxPoints ? 'default' : 'outlined'}
          label={`${points}/${maxPoints}`}
          onClick={handleOpenMenu}
          style={points > maxPoints ? { backgroundColor: '#f44336' } : {}}
        />
      </LargerTooltip>
    </React.Fragment>
  );
};

ModeButton.defaultProps = {
  tooltip: 'Toggle between Skirmish (500), Standard (1000), and Grand Army (1600) formats.'
};

ModeButton.propTypes = {
  tooltip: PropTypes.string,
  points: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
  handleChangeMode: PropTypes.func.isRequired
};

export default ModeButton;
