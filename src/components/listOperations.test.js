import { addUnit, updateBattleforceChoiceUpgradeSlots } from "./listOperations";

function makeList(choices, units = []) {
  return {
    battleForce: "Custom Clone Battalion",
    choices,
    units,
    commandCards: [],
    primaryCards: [],
    secondaryCards: [],
    advantageCards: [],
  };
}

function makeUnit(unitId, additionalUpgradeSlots = []) {
  const upgradeCount = unitId === "fz" ? 6 : 5;
  return {
    unitId,
    count: 1,
    upgradesEquipped: Array(upgradeCount + additionalUpgradeSlots.length).fill(
      null,
    ),
    additionalUpgradeSlots,
    specialUpgradeSlots: [],
  };
}

describe("battleforce choice upgrade slots", () => {
  it("adds the specified slots to matching units and removes them on deselection", () => {
    const list = makeList(
      ["Reinforced"],
      [makeUnit("fz"), makeUnit("Bi"), makeUnit("other")],
    );

    updateBattleforceChoiceUpgradeSlots(list);

    expect(list.units[0].additionalUpgradeSlots).toEqual(["personnel"]);
    expect(list.units[0].upgradesEquipped).toHaveLength(7);
    expect(list.units[1].additionalUpgradeSlots).toEqual(["personnel"]);
    expect(list.units[1].upgradesEquipped).toHaveLength(6);
    expect(list.units[2].additionalUpgradeSlots).toEqual([]);

    list.choices = [];
    updateBattleforceChoiceUpgradeSlots(list);

    expect(list.units[0].additionalUpgradeSlots).toEqual([]);
    expect(list.units[0].upgradesEquipped).toHaveLength(6);
    expect(list.units[1].additionalUpgradeSlots).toEqual([]);
    expect(list.units[1].upgradesEquipped).toHaveLength(5);
  });

  it("preserves other additional slots and applies active choices to new units", () => {
    const list = makeList(["Reinforced"], [makeUnit("fz", ["training"])]);

    updateBattleforceChoiceUpgradeSlots(list);

    expect(list.units[0].additionalUpgradeSlots).toEqual([
      "training",
      "personnel",
    ]);
    expect(list.units[0].upgradesEquipped).toHaveLength(8);

    list.choices = [];
    updateBattleforceChoiceUpgradeSlots(list);

    expect(list.units[0].additionalUpgradeSlots).toEqual(["training"]);
    expect(list.units[0].upgradesEquipped).toHaveLength(7);

    list.choices = ["Reinforced"];
    addUnit(list, "Bi");

    const newUnit = list.units.find((unit) => unit.unitId === "Bi");
    expect(newUnit.additionalUpgradeSlots).toEqual(["personnel"]);
    expect(newUnit.upgradesEquipped).toHaveLength(6);
  });
});
