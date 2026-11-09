import React, { useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ControlPanel from "./ControlPanel";
import AttackDie from "./AttackDie";

const Row = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "center",
  justifyContent: "center",
}));

const Column = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  flexGrow: 1,
}));

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function Stats() {
  const [isRolling, setIsRolling] = useState(false);
  const [numRedAttackDice, setNumRedAttackDice] = useState(0);
  const [redAttackResults, setRedAttackResults] = useState([]);
  const [numBlackAttackDice, setNumBlackAttackDice] = useState(0);
  const [blackAttackResults, setBlackAttackResults] = useState([]);
  const [numWhiteAttackDice, setNumWhiteAttackDice] = useState(0);
  const [whiteAttackResults, setWhiteAttackResults] = useState([]);
  const handleSetDice = (type, color, num) => {
    if (type === "attack") {
      if (color === "red") {
        setNumRedAttackDice(num);
        setRedAttackResults(redAttackResults.slice(0, num));
      }
      if (color === "black") {
        setNumBlackAttackDice(num);
        setBlackAttackResults(blackAttackResults.slice(0, num));
      }
      if (color === "white") {
        setNumWhiteAttackDice(num);
        setWhiteAttackResults(whiteAttackResults.slice(0, num));
      }
    } else if (type === "defense") {
      if (color === "red") {
      }
      if (color === "white") {
      }
    }
  };
  const handleRollDice = () => {
    setIsRolling(true);
    for (let i = 0; i < numRedAttackDice; i++) {
      if (i < redAttackResults.length) {
        redAttackResults[i] = getRandomInt(16);
      } else redAttackResults.push(getRandomInt(16));
    }
    for (let i = 0; i < numBlackAttackDice; i++) {
      if (i < blackAttackResults.length) {
        blackAttackResults[i] = getRandomInt(16);
      } else blackAttackResults.push(getRandomInt(16));
    }
    for (let i = 0; i < numWhiteAttackDice; i++) {
      if (i < whiteAttackResults.length) {
        whiteAttackResults[i] = getRandomInt(16);
      } else whiteAttackResults.push(getRandomInt(16));
    }
    setTimeout(() => setIsRolling(false), 500);
  };
  return (
    <Column>
      <Row>
        <Typography variant="h5">Dice Roller</Typography>
      </Row>
      <Row>
        <ControlPanel
          numRedAttackDice={numRedAttackDice}
          numBlackAttackDice={numBlackAttackDice}
          numWhiteAttackDice={numWhiteAttackDice}
          handleSetDice={handleSetDice}
          handleRollDice={handleRollDice}
        />
      </Row>
      <Row>
        {redAttackResults.map((result, i) => (
          <AttackDie
            key={`red_${result}_${i}`}
            color="red"
            faceIndex={result}
            isRolling={isRolling}
          />
        ))}
      </Row>
      <Row>
        {blackAttackResults.map((result, i) => (
          <AttackDie
            key={`black_${result}_${i}`}
            color="black"
            faceIndex={result}
            isRolling={isRolling}
          />
        ))}
      </Row>
      <Row>
        {whiteAttackResults.map((result, i) => (
          <AttackDie
            key={`white_${result}_${i}`}
            color="white"
            faceIndex={result}
            isRolling={isRolling}
          />
        ))}
      </Row>
    </Column>
  );
}

export default Stats;
