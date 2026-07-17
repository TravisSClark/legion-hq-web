import * as React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

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
