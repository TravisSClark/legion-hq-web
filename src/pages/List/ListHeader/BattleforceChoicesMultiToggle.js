import * as React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Box, Button, Collapse, Paper, Typography } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  choiceButton: {
    borderLeft: `1px solid ${theme.palette.divider} !important`,
  },
  choiceGroup: {
    gap: 2,
  },
}));

export default function BattleforceChoicesMultiToggle({
  currentChoices,
  battleforceChoices,
  handleSetBattleforceChoices,
  maxChoices,
}) {
  const classes = useStyles();
  const [choices, setChoices] = React.useState(() =>
    currentChoices ? currentChoices : [],
  );
  const [isDescriptionsOpen, setIsDescriptionsOpen] = React.useState(false);

  const activeChoices = battleforceChoices.filter((choice) =>
    choices.includes(choice.name),
  );

  const handleMakeChoices = (event, newChoices) => {
    if (newChoices.length <= maxChoices) {
      setChoices(newChoices);
      handleSetBattleforceChoices(newChoices);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      maxWidth="calc(100vw - 32px)"
    >
      <ToggleButtonGroup
        value={choices}
        onChange={handleMakeChoices}
        classes={{ root: classes.choiceGroup }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "100%",
        }}
      >
        {battleforceChoices.map((choice) => (
          <ToggleButton
            key={choice.name}
            value={choice.name}
            className={classes.choiceButton}
          >
            {choice.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Button
        size="small"
        aria-expanded={isDescriptionsOpen}
        aria-controls="choice-descriptions"
        onClick={() => setIsDescriptionsOpen(!isDescriptionsOpen)}
      >
        Descriptions
        <ExpandMoreIcon
          fontSize="small"
          style={{
            transform: isDescriptionsOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 150ms",
          }}
        />
      </Button>
      <Collapse
        id="choice-descriptions"
        in={isDescriptionsOpen}
        style={{ width: "100%" }}
      >
        <Box
          width="100%"
          maxWidth={900}
          margin="0 auto"
          style={{ overflowWrap: "anywhere" }}
        >
          <Paper variant="outlined" style={{ backgroundColor: "transparent" }}>
            <Box padding={2}>
              {activeChoices.length > 0 ? (
                activeChoices.map((choice) => (
                  <Box key={choice.name} marginBottom={2}>
                    <Typography variant="subtitle2">{choice.name}</Typography>
                    <Typography
                      variant="body2"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {choice.description.replace(/\. /g, ".\n")}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No choices selected.
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>
      </Collapse>
    </Box>
  );
}
