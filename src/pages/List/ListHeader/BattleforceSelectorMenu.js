import { Menu, MenuItem } from "@material-ui/core";
import battleForcesDict from "constants/battleForcesDict";


export default function BattleforceSelectorMenu({currentList, anchorEl, onClose, handleSetBattleForce}){

  const validBattleForces = Object.values(battleForcesDict).filter(bf => bf.faction === currentList.faction);

  return(
      <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          {currentList.faction !== 'mercenary' && (
            <MenuItem
              key="none"
              selected={!currentList.battleForce || currentList.battleForce === ''}
              onClick={() => {
                handleSetBattleForce('');
                onClose();
              }}
            >
              No Battle Force
            </MenuItem>
          )}
          {validBattleForces.map(battleForce => {
            return (
              <MenuItem
                key={battleForce.name}
                selected={currentList.battleForce === battleForce.name}
                onClick={() => {
                  handleSetBattleForce(battleForce.name);
                  onClose();
                }}
              >
                {battleForce.name}
              </MenuItem>
            );
          })}
        </Menu>
  )


}