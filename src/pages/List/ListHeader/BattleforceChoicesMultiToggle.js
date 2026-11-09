import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function BattleforceChoicesMultiToggle({
  currentChoices,
  battleforceChoices,
  handleSetBattleforceChoices,
  maxChoices,
}) {
  const [choices, setChoices] = React.useState(() =>
    currentChoices ? currentChoices : [],
  );

  const handleMakeChoices = (event, newChoices) => {
    if (newChoices.length <= maxChoices) {
      setChoices(newChoices);
      handleSetBattleforceChoices(newChoices);
    }
  };

  return (
    <ToggleButtonGroup value={choices} onChange={handleMakeChoices}>
      {battleforceChoices.map((choice) => {
        return <ToggleButton value={choice.name}>{choice.name}</ToggleButton>;
      })}
    </ToggleButtonGroup>
  );
}
