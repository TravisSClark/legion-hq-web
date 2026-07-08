import { ToggleButtonGroup } from "@material-ui/lab";

export default function ChoicesMultiToggle({ choices, handleChoices }) {
  return (
    <ToggleButtonGroup
      value={choices}
      onChange={handleChoices}
      onClose={onClose}
    >
      {choices.map((choice) => {
        return <ToggleButton value={choice}>{choice.name}</ToggleButton>;
      })}
    </ToggleButtonGroup>
  );
}
