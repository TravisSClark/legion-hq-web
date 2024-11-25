// Lots to be done here, but this would/could be a sensible spot for tracking
// game state things as a player aid. For now, move the kill tracker here

// Gut/delete this class if grabnar is working parallel to a bigger effort XD


function restoreUnit(list, index) {
  let unit = list.units[index];
  let perUnitCost = unit.totalUnitCost / unit.count;

  const killedFiltered = list.killedUnits.filter(function(item){
    return item === unit.unitId + unit.count;
  })

  if(killedFiltered.length !== 0 && killedFiltered.length <= unit.totalUnitCost){
    killedFiltered.pop();
    const remainingUnits = list.killedUnits.filter(function(item){
      return item !== unit.unitId + perUnitCost;
    });

    list.killedUnits = killedFiltered.concat(remainingUnits);
    list.killPoints -= perUnitCost;
  }

  return list;
}

function killUnit(list, index) {
  let unit = list.units[index];
  let perUnitCost = unit.totalUnitCost / unit.count;

  const killedFiltered = list.killedUnits.filter(function(item){
    return item === unit.unitId + perUnitCost;
  })

  if(killedFiltered.length < unit.count) {
    list.killedUnits.push(unit.unitId + unit.count);
    list.killPoints += perUnitCost;
  }

  return list;
}

export {
  killUnit,
  restoreUnit
}