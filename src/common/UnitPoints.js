import React from 'react';
import Typography from '@material-ui/core/Typography';

function UnitPoints({ unit, variant = 'body1', parentheses=false }) {
  let { totalUnitCost } = unit;

  let text = '' + totalUnitCost;
  if(parentheses)
    text = '(' + text + ')'

  if(unit.count > 1){
    text = `(${totalUnitCost/unit.count}) ` + text;
  }

  return (
    <Typography variant={variant}>
      {text}
    </Typography>
  );
};

export default UnitPoints;
