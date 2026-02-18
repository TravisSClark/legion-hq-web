import { useContext, useState } from "react";
import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
import ListContext from "context/ListContext";

function CounterButton({ label }) {
  const buttonLabel = label.toLowerCase();
  const { currentList } = useContext(ListContext);
  currentList[buttonLabel] = 0;
  const handleChange = (event) => {
    currentList[buttonLabel] = Math.max(Number(event.target.value), 0);
  };
  return (
    <ButtonGroup style={{ margin: 5 }}>
      <Button
        aria-label="reduce"
        onClick={() => {
          currentList[buttonLabel] = Math.max(currentList[buttonLabel] - 1, 0);
        }}
        size="small"
      >
        <RemoveIcon fontSize="small" />
      </Button>
      <TextField
        label={label}
        variant="outlined"
        onChange={handleChange}
        value={currentList[buttonLabel]}
        style={{ width: 60 }}
      />
      <Button
        aria-label="increase"
        size="small"
        onClick={() => {
          currentList[buttonLabel] += 1;
        }}
      >
        <AddIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
}

export default CounterButton;
