import { useContext, useState } from "react";
import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
import ListContext from "context/ListContext";

function CounterButton({ label }) {
  const buttonLabel = label.toLowerCase();
  const { currentList } = useContext(ListContext);
  currentList[buttonLabel] = !isNaN(+currentList[buttonLabel])
    ? +currentList[buttonLabel]
    : 0;
  const [count, setCount] = useState(currentList[buttonLabel]);
  const handleChange = (event) => {
    setCount(Math.max(Number(event.target.value), 0));
    currentList[buttonLabel] = Math.max(Number(event.target.value), 0);
  };
  return (
    <ButtonGroup style={{ margin: 5 }}>
      <Button
        aria-label="reduce"
        onClick={() => {
          setCount(Math.max(count - 1, 0));
          currentList[buttonLabel] = Math.max(count - 1, 0);
        }}
        size="small"
      >
        <RemoveIcon fontSize="small" />
      </Button>
      <TextField
        label={label}
        variant="outlined"
        onChange={handleChange}
        value={count}
        style={{ width: 70 }}
      />
      <Button
        aria-label="increase"
        size="small"
        onClick={() => {
          setCount(count + 1);
          currentList[buttonLabel] = count + 1;
        }}
      >
        <AddIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
}

export default CounterButton;
