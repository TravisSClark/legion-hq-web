import React, { useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

export default function BattleforceChoicesGroupedToggle({
  currentChoices = [],
  battleforceChoices,
  handleSetBattleforceChoices,
}) {
  const [isDescriptionsOpen, setIsDescriptionsOpen] = React.useState(false);
  const choicesByGroup = battleforceChoices.reduce((groups, choice) => {
    if (!groups[choice.group]) {
      groups[choice.group] = [];
    }
    groups[choice.group].push(choice);
    return groups;
  }, {});

  const groups = Object.entries(choicesByGroup);

  const defaultChoices = groups.map(([, groupChoices]) => {
    const selectedChoice = groupChoices.find((choice) =>
      currentChoices.includes(choice.name),
    );
    return (selectedChoice || groupChoices[0]).name;
  });
  const selectedChoices = groups.map(([, groupChoices], index) =>
    groupChoices.find((choice) => choice.name === defaultChoices[index]),
  );

  useEffect(() => {
    if (
      currentChoices.length !== defaultChoices.length ||
      currentChoices.some((choice, index) => choice !== defaultChoices[index])
    ) {
      handleSetBattleforceChoices(defaultChoices);
    }
  }, [currentChoices, defaultChoices, handleSetBattleforceChoices]);

  const handleMakeChoice = (group, newChoice) => {
    const nextChoices = groups.map(([choiceGroup], index) =>
      choiceGroup === group ? newChoice : defaultChoices[index],
    );
    handleSetBattleforceChoices(nextChoices);
  };

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gridGap={4}>
      {groups.map(([group, groupChoices], index) => {
        return (
          <Box key={group} display="flex" flexDirection="column" minWidth={200}>
            <Typography variant="subtitle2">{group}</Typography>
            <Select
              variant="outlined"
              value={defaultChoices[index]}
              onChange={(event) => handleMakeChoice(group, event.target.value)}
            >
              {groupChoices.map((choice) => (
                <MenuItem key={choice.name} value={choice.name}>
                  {choice.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        );
      })}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Button
          size="small"
          aria-expanded={isDescriptionsOpen}
          aria-controls="battleforce-choice-descriptions"
          onClick={() => setIsDescriptionsOpen(!isDescriptionsOpen)}
        >
          Choice descriptions
          <ExpandMoreIcon
            fontSize="small"
            style={{
              transform: isDescriptionsOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 150ms",
            }}
          />
        </Button>
        <Collapse
          id="battleforce-choice-descriptions"
          in={isDescriptionsOpen}
          style={{ width: "100%" }}
        >
          <Box width="100%" maxWidth={900} margin="0 auto">
            <Paper
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
            >
              <Box padding={2}>
                {selectedChoices.map((choice) => (
                  <Box key={choice.name} marginBottom={2}>
                    <Typography variant="subtitle2">{choice.name}</Typography>
                    <Typography
                      variant="body2"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {choice.description.replace(/\. /g, ".\n")}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
