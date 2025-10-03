/**
 * IOU a schema
 *
 * 'rules' are for things that LHQ in particular cares about, ie things that affect listbuilding
 * (For now) they are expanded inside the ListRulesModal, could def stand being more data-driven
 *
 * 'plaintextRules' are for things we don't track, ie gametime-only rules
 */

const battleForcesDict = {
  "501st Legion": {
    name: "501st Legion",
    faction: "republic",
    linkId: "5t",
    commander: ["na", "fy", "ns", "Bc"],
    operative: [],
    corps: ["fz", "Bi"],
    special: ["kz", "ky", "Ay"],
    support: ["mb", "ic", "xj", "xp"],
    heavy: ["oo"],
    allowedUniqueUpgrades: ["lh", "lg", "Bd"], // TODO CC Rex incoming!
    rules: {},
    ruleUrl:
      "https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_501st.pdf",
    "standard mode": {
      commOp: 2,
      commander: [1, 2],
      operative: [0, 2],
      corps: [1, 4],
      special: [1, 4],
      support: [1, 2],
      heavy: [0, 1],
    },
    "500-point mode": {
      commOp: 1,
      commander: [1, 1],
      operative: [0, 1],
      corps: [1, 4],
      special: [1, 4],
      support: [0, 2],
      heavy: [0, 1],
    },
  },
  "Blizzard Force": {
    name: "Blizzard Force",
    faction: "empire",
    linkId: "bf",
    commander: ["at", "au", "Cb"],
    operative: [],
    corps: ["az", "ay", "sr"],
    special: [], // TODO add Imperial Probe Droids
    support: ["bf", "be"],
    heavy: ["bg"],
    allowedUniqueUpgrades: ["fl", "Ce", "Cf", "Cg"],

    rules: {
      noFieldComm: true,
      unitLimits: [{ ids: ["ay", "sr"], count: [0, 2] }],
      // TODO add Probe id here
      // ignoreDetach:""
    },
    ruleUrl:
      "https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_BlizzardForce.pdf",
    "standard mode": {
      commander: [1, 2],
      operative: [0, 0],
      corps: [3, 6],
      special: [0, 3],
      support: [1, 4],
      heavy: [0, 2],
    },
    "500-point mode": {
      commander: [1, 2],
      operative: [0, 0],
      corps: [2, 4],
      special: [0, 3],
      support: [1, 3],
      heavy: [0, 1],
    },
  },
  "Bright Tree Village": {
    name: "Bright Tree Village",
    faction: "rebels",
    linkId: "btv",
    commander: ["vv", "ac", "ab", "ve", "wd"],
    operative: ["af"],
    corps: ["vk", "ah"],
    special: ["vu", "ak"],
    support: [],
    heavy: ["vj"],
    allowedUniqueUpgrades: ["wa", "wb", "wc"],
    rules: {
      countMercs: true,
      take2NonEwokRebs: true, // lol
      unitLimits: [
        { ids: ["ah"], count: [0, 2] },
        { ids: ["ak"], count: [0, 2] },
      ],
      // gainAoC: 'rebels', // on 2nd thought, this doesn't matter since we already have the AoC listbuild benefit via countMercs... leave as reminder
    },
    plainTextRules: [
      "During the End Phase, EWOK units in this army remove 1 fewer Suppression token during the Remove Tokens step.",
      "REBEL COMMANDER units in this army gain Allies of Convenience",
    ],

    ruleUrl:
      "cdn.svc.asmodee.net/production-amgcom/uploads/2023/07/StarWarsLegionBFRulesSheetBrightTreeVillage1",
    "standard mode": {
      commOp: 5,
      commander: [1, 5],
      operative: [0, 5],
      corps: [3, 6],
      special: [0, 3],
      support: [0, 0],
      heavy: [0, 2],
    },
    "500-point mode": {
      commOp: 4,
      commander: [1, 4],
      operative: [0, 4],
      corps: [2, 4],
      special: [0, 3],
      support: [0, 0],
      heavy: [0, 1],
    },
  },
  "Echo Base Defenders": {
    name: "Echo Base Defenders",
    faction: "rebels",
    linkId: "ebd",
    commander: ["ab", "ad", "ac", "Bz"],
    operative: ["jg", "ji", "af", "By"],
    corps: ["gv", "if"],
    special: [],
    support: ["an", "he"],
    heavy: ["ap"],
    allowedUniqueUpgrades: ["fk", "Cp", "Cq", "Cr", "Cs", "Bn"], // TODO needs "Squadron Leader" once card available
    rules: {
      noFieldComm: true,
    },
    ruleUrl:
      "https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_EchoBaseDefenders.pdf",
    "standard mode": {
      commOp: 4,
      commander: [1, 4],
      operative: [0, 4],
      corps: [3, 6],
      special: [0, 0],
      support: [1, 4],
      heavy: [0, 2],
    },
    "500-point mode": {
      commOp: 3,
      commander: [1, 3],
      operative: [0, 3],
      corps: [2, 4],
      special: [0, 0],
      support: [1, 3],
      heavy: [0, 1],
    },
  },
  "Experimental Droids": {
    name: "Experimental Droids",
    faction: "separatists",
    linkId: "exd",
    commander: ["nr", "pz", "qa"],
    operative: [],
    corps: ["gx", "ga", "xd"],
    special: ["la", "xd"],
    support: ["ie"],
    heavy: ["xe"],
    allowedUniqueUpgrades: ["Bl"], // TODO add "Kraken" once his upgrade comes out
    rules: {
      buildsAsCorps: ["xd"],
      ccAsCorps: true, // adds in the "and Battle Cards" rule to printout
      unitLimits: [
        { ids: ["gx"], count: [0, 2] },
        { ids: ["ga"], count: [0, 2] },
        { ids: ["la"], count: [0, 2] },
      ],
      rankLimits: [
        { ids: ["la"], count: [0, 2] },
        { ids: ["gx"], count: [0, 2] },
        { ids: ["ga"], count: [0, 2] },
      ],
    },
    plainTextRules: [
      "At the start of each Activation Phase, choose up to 1 of your COMMANDER units. \
        If you do, put 3 Surge tokens on that unit’s Unit Card. Once during its \
        Activation, an allied SPECIAL FORCES, CORPS, or SUPPORT unit that has the AI keyword may \
        make a free action to spend 1 Surge token on the chosen COMMANDER unit, if it \
        is within 3. If it does, choose 1 of the following:\n\
        • Increase their Speed by 1 during their next Move action this Turn.\n\
        • Gain 1 Aim token or 1 Dodge token.\n\
        • Add 1 black die and 1 white die to 1 of their Attack Pools during \
        their next Attack action this turn.\n\
        • Remove up to 2 Suppression tokens.",
    ],
    ruleUrl:
      "https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_ExperimentalDroids.pdf",
    "standard mode": {
      commander: [1, 2],
      operative: [0, 0],
      corps: [3, 6],
      special: [0, 3],
      support: [0, 3],
      heavy: [0, 2],
    },
    "500-point mode": {
      commander: [1, 1],
      operative: [0, 1],
      corps: [2, 4],
      special: [0, 3],
      support: [0, 1],
      heavy: [0, 1],
    },
  },
  "Imperial Remnant": {
    name: "Imperial Remnant",
    faction: "empire",
    linkId: "ir",
    commander: ["ui", "Cb"],
    operative: ["Ca"],
    corps: ["ay", "hg", "ba", "bd"],
    special: ["ba", "bd"],
    support: ["bf", "be"],
    heavy: ["tm"],
    allowedUniqueUpgrades: ["uj", "Ce", "Cf", "Cg", "Ch", "Cj", "Bl", "Bn"],
    rules: {
      unitLimits: [
        { ids: ["ay"], count: [1, 2] },
        { ids: ["hg"], count: [1, 2] },
      ],
      buildsAsCorps: ["ba", "bd"],
      minOneOfEachCorps: true, // lol
      remnantEquipRules: true,
    },
    plainTextRules: [
      "When issuing Orders, the nominated Commander can only issue Orders \
        to allied units within 2 of them. Undeployed units or units not within \
        2 of any allied COMMANDER units gain Independent: Aim 1 or Dodge 1. \
        When an allied unit checks to see if it is Panicked, it can never use the \
        Courage of an allied unit that is not within 2",
    ],
    ruleUrl:
      "https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_ImperialRemnant-1.pdf",
    "standard mode": {
      commOp: 2,
      commander: [1, 2],
      operative: [0, 2],
      corps: [3, 6],
      special: [0, 0],
      support: [0, 2],
      heavy: [0, 2],
    },
    "500-point mode": {
      commOp: 2,
      commander: [1, 2],
      operative: [0, 2],
      corps: [2, 4],
      special: [0, 0],
      support: [0, 1],
      heavy: [0, 1],
    },
  },
  "Separatist Invasion": {
    name: "Separatist Invasion",
    faction: "separatists",
    linkId: "si",
    commander: ["fx", "ia", "nr"],
    operative: ["nb"],
    corps: ["gx"],
    special: ["px"],
    support: ["ie", "mc"],
    heavy: ["gc"],
    rules: {
      noFieldComm: true,
    },
    allowedUniqueUpgrades: [], // TODO add "Squadron Leader"
    ruleUrl:
      "https://cdn.svc.asmodee.net/production-amgcom/uploads/2022/10/StarWarsLegionBFRulesSheetSI.pdf",

    "standard mode": {
      commOp: 2,
      commander: [1, 2],
      operative: [0, 2],
      corps: [4, 8],
      special: [0, 2],
      support: [0, 3],
      heavy: [1, 2],
    },
    "500-point mode": {
      commOp: 2,
      commander: [1, 2],
      operative: [0, 2],
      corps: [2, 6],
      special: [0, 1],
      support: [0, 2],
      heavy: [1, 1],
    },
  },
  "Shadow Collective": {
    name: "Shadow Collective",
    faction: "mercenary",
    forceAffinity: "dark side",
    linkId: "sc",
    commander: ["ra", "rd", "qy"],
    operative: ["rc", "kx", "ax"], // TODO add "Savage Oppress"!!
    corps: ["rb", "qz"], // TODO add Weequay Pirates
    special: ["re"],
    support: ["sq"],
    heavy: ["sm"], // TODO add WLO-5 Speeder Tank
    allowedUniqueUpgrades: ["rq", "so", "se", "sp", "sg", "sh", "si", "Bn"], // TODO add "Gang Boss"
    rules: {
      countMercs: true,
    },
    plainTextRules: [
      "A Shadow Collective Battle Force is aligned with the Dark Side.",
      "Units in this army with the Transport keyword may issue Orders to transported units regardless of Affiliation.",
    ],
    ruleUrl:
      "https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_ShadowCollective.pdf",

    "standard mode": {
      commOp: 4,
      commander: [1, 4],
      operative: [0, 4],
      corps: [2, 6],
      special: [0, 4],
      support: [0, 3],
      heavy: [0, 2],
    },
    "500-point mode": {
      commOp: 2,
      commander: [1, 2],
      operative: [0, 2],
      corps: [1, 4],
      special: [0, 3],
      support: [0, 2],
      heavy: [0, 1],
    },
  },
  "Tempest Force": {
    name: "Tempest Force",
    faction: "empire",
    linkId: "tf",
    commander: ["Cb"],
    operative: ["Ca"],
    corps: ["ay"],
    special: ["ba"],
    support: ["bf"],
    heavy: ["we", "bg"],
    allowedUniqueUpgrades: [, "Ce", "Cf", "Ch", "Cj"], // TODO add "Squadron Leader"
    rules: {},
    plainTextRules: [
      "Vehicles in this army gain Scout 2.",
      "Units that are not within 3 of an allied COMMANDER unit and do not have a COMMS \
        upgrade equipped remove 1 less Suppression token during the Remove Tokens step.",
      "During Setup, you may set aside 1 allied SPECIAL FORCES or SUPPORT unit that is not \
        holding an Asset Objective token, marking the unit with an Advantage \
        token. The first time the set-aside unit would Activate this game, you \
        must place that unit in cohesion onto the battlefield not within 2 \
        of any enemy units, if able. If you do, that unit is treated as activated \
        and its Order token is placed facedown. Then, the unit loses its \
        Advantage token.",
    ],
    ruleUrl:
      "https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_TempestForce-1.pdf",
    "standard mode": {
      commOp: 2,
      commander: [1, 2],
      operative: [0, 2],
      corps: [1, 3],
      special: [2, 6],
      support: [0, 3],
      heavy: [0, 3],
    },
    "500-point mode": {
      commOp: 2,
      commander: [1, 2],
      operative: [0, 2],
      corps: [1, 2],
      special: [1, 4],
      support: [0, 2],
      heavy: [0, 2],
    },
  },
  "Wookiee Defenders": {
    name: "Wookiee Defenders",
    faction: "republic",
    linkId: "wd",
    commander: ["ol", "po", "ph"],
    operative: ["Da"],
    corps: ["fz", "pm"],
    special: ["kz", "pg", "pm"],
    support: ["qh", "xf", "ic"],
    heavy: ["gb", "qs"],
    // TODO remove Di-Dk to cut clutter if 'Tactical Acumen' is also allowed. ie it means Jedi Training were redundantly listed as they're limited, not unique
    allowedUniqueUpgrades: ["Bl", "Dc", "Dd", "De", "Di", "Dj", "Dk"],
    rules: {
      buildsAsCorps: ["pm"],
      ccAsCorps: true, // adds in the "and Battle Cards" rule unique to Wookiee building rules
      unitLimits: [
        { ids: ["kz"], count: [0, 1] },
        { ids: ["fz"], count: [0, 2] },
        { ids: ["ic"], count: [0, 1] },
        { ids: ["qs"], count: [0, 1] },
        { ids: ["gb"], count: [0, 1] },
      ],
      minimum3Wookiees: true, // TODO between this and BTV, we ought to have rules for faction/affil/type counts...
    },
    plainTextRules: [
      "Your army must include at least 3 Wookiee Trooper units.", // TODO this is currently validated, but displayed via plaintext; this way is easier, should probably move rules to plaintext with common keys/formatters
      "The first time 1 or more miniatures in each Wookiee Trooper unit are \
          defeated each Round, that unit may make a Speed-1 Move. A unit can \
          make this Move regardless of its speed.",
    ],
    ruleUrl:
      "https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_WookieesDefenders.pdf",
    "standard mode": {
      commOp: 2,
      commander: [1, 2],
      operative: [0, 2],
      corps: [3, 6],
      special: [0, 4],
      support: [0, 3],
      heavy: [0, 1],
    },
    "500-point mode": {
      commOp: 2,
      commander: [1, 2],
      operative: [0, 2],
      corps: [2, 5],
      special: [0, 3],
      support: [0, 2],
      heavy: [0, 1],
    },
    // '500-point mode': {
    //   commander: [1, 2],
    //   operative: [0, 0],
    //   corps: [2, 4],
    //   special: [0, 3],
    //   support: [0, 1],
    //   heavy: [0, 1]
    // }
  },
};

export default battleForcesDict;
