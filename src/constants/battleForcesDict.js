const battleForcesDict = {
  'Echo Base Defenders': {
      name: 'Echo Base Defenders',
      faction: 'rebels',
      linkId: 'ebd',
      commander: ['ab', 'ad', 'ac', 'bi'],
      operative: ['jg', 'ji', 'af'],
      corps: ['gv', 'if'],
      special: [],
      support: ['an', 'he'],
      heavy: ['ap'],
      allowedUniqueUpgrades: ['fk'],

      rules: { 
        noFieldComm: true
      },

      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_EchoBaseDefenders.pdf',
      'standard mode': {
        commOp: 4,

        commander: [1, 4],
        operative: [0, 3],
        corps: [3, 6],
        special: [0, 0],
        support: [1, 4],
        heavy: [0, 2]
      },
      '500-point mode': {
        commOp: 3,

        commander: [1, 3],
        operative: [0, 2],
        corps: [2, 4],
        special: [0, 0],
        support: [1, 3],
        heavy: [0, 1]
      }
    },
  'Bright Tree Village': {
      name: 'Bright Tree Village',
      faction: 'rebels',
      linkId: 'btv',
      commander: ['vv', 'ac', 'ab', 've', 'wd'],
      operative: ['af'],
      corps: ['vk', 'ah'],
      special: ['vu', 'ak'],
      support: [],
      heavy: ['vj'],

      allowedUniqueUpgrades: ['vq', 'wa', 'wb', 'wc'],
      rules: {
        countMercs: true,
        take2NonEwokRebs:true, // lol
        unitLimits:[{ids:['ah'], count:[0,2]},{ids:['ak'], count:[0,2]}]
      },

      ruleUrl: 'cdn.svc.asmodee.net/production-amgcom/uploads/2023/07/StarWarsLegionBFRulesSheetBrightTreeVillage1',
      'standard mode': {
        commOp: 5,

        commander: [1, 5],
        operative: [0, 1],
        corps: [3, 6],
        special: [0, 3],
        support: [0, 0],
        heavy: [0, 1]
      },
      '500-point mode': {
        commOp: 4,

        commander: [1, 4],
        operative: [0, 3],
        corps: [2, 4],
        special: [0, 3],
        support: [0, 1],
        heavy: [0, 1]
      }
  },
  'Blizzard Force': {
      name: 'Blizzard Force',
      faction: 'empire',
      linkId: 'bf',
      commander: ['at', 'au', 'ar'],
      operative: [],
      corps: ['az', 'ay',  'sr'],
      special: [],
      support: ['bf', 'be'],
      heavy: ['bg'],
      allowedUniqueUpgrades: ['fl'],

      rules: {
        noFieldComm: true,
        unitLimits: [{ids:['ay', 'sr'], count:[0,2]}]
      },

      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_BlizzardForce.pdf',
      'standard mode': {
        commander: [1, 2],
        operative: [0, 0],
        corps: [3, 6],
        special: [0, 0],
        support: [1, 4],
        heavy: [0, 2]
      },
      '500-point mode': {
        commander: [1, 2],
        operative: [0, 0],
        corps: [2, 4],
        special: [0, 0],
        support: [1, 3],
        heavy: [0, 1]
      }
    },
  'Imperial Remnant': {
    name: 'Imperial Remnant',
    faction: 'empire',
    linkId: 'ir',
    commander: ['ui', 'ar'],
    operative: [],
    corps: ['ay', 'hg'],
    special: ['ba', 'bd'],
    support: ['bf', 'be'],
    heavy: ['tm'],
    allowedUniqueUpgrades: ['uj', 'gm'],

    rules:{
      unitLimits: [{ids:['ay'], count:[1,2]},{ids:['hg'], count:[1,2]}],
      buildsAsCorps: ['ba', 'bd'],
      minOneOfEachCorps: true, // lol
      remnantEquipRules: true
    },
    ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_ImperialRemnant-1.pdf',
    'standard mode': {
      // commOp: 2,

      commander: [1, 2],
      operative: [0, 0],
      corps: [3, 6],
      special: [0, 0],
      support: [0, 2],
      heavy: [0, 2]
    },
    '500-point mode': {
      // commOp: 2,

      commander: [1, 2],
      operative: [0, 0],
      corps: [2, 4],
      special: [0, 0],
      support: [0, 1],
      heavy: [0, 1]
    }
  },
  'Tempest Force': {
    name: 'Tempest Force',
    faction: 'empire',
    linkId: 'tf',
    commander: ['ar'],
    operative: [],
    corps: ['ay'],
    special: ['ba'],
    support: ['bf'],
    heavy: ['we', 'bg'],
    allowedUniqueUpgrades: [],
    rules:{},
    ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_TempestForce-1.pdf',
    'standard mode': {
      commander: [1, 2],
      operative: [0, 0],
      corps: [1, 3],
      special: [2, 6],
      support: [0, 3],
      heavy: [0, 3]
    },
    '500-point mode': {
      commander: [1, 2],
      operative: [0, 0],
      corps: [1, 2],
      special: [1, 4],
      support: [0, 2],
      heavy: [0, 2]
    }
  },
  '501st Legion': {
      name: '501st Legion',
      faction: 'republic',
      linkId: '5t',
      commander: ['na', 'fy', 'ns', 'Bc'],
      operative: [],
      corps: ['fz'],
      special: ['kz', 'ky', 'Ay'],
      support: ['mb', 'ic', 'xj', 'xp'],
      heavy: ['oo'],
      allowedUniqueUpgrades: ['lh', 'lg'],
      rules:{},
      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_501st.pdf',
      'standard mode': {
        commander: [1, 2],
        operative: [0, 0],
        corps: [1, 4],
        special: [1, 4],
        support: [1, 2],
        heavy: [0, 1]
      },
      '500-point mode': {
        commander: [1, 1],
        operative: [0, 0],
        corps: [1, 4],
        special: [1, 4],
        support: [0, 2],
        heavy: [0, 1]
      }
    },
    'Wookiee Defenders': {
      name: 'Wookiee Defenders',
      faction: 'republic',
      linkId: 'wd',
      commander: ['ol', 'po', 'ph'],
      operative: [],
      corps: ['fz'],
      special: ['kz', 'pg', 'pm'],
      support: ['qh', 'xf', 'ic'],
      heavy: ['gb', 'qs'],
      allowedUniqueUpgrades: [],

      rules: {
        buildsAsCorps:['pm'],
        unitLimits:[
          {ids:['kz'], count:[0,1]},
          {ids:['fz'], count:[0,2]},
          {ids:['ic'], count:[0,1]},
        ]
      },

      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_WookieesDefenders.pdf',
      'standard mode': {
        commander: [1, 2],
        operative: [0, 0],
        corps: [3, 6],
        special: [0, 4],
        support: [0, 3],
        heavy: [0, 1]
      },
      '500-point mode': {
        commander: [1, 2],
        operative: [0, 0],
        corps: [2, 4],
        special: [0, 3],
        support: [0, 1],
        heavy: [0, 1]
      }
    },
  'Separatist Invasion': {
      name: 'Separatist Invasion',
      faction: 'separatists',
      linkId: 'si',
      commander: ['fx', 'ia', 'nr'],
      operative: ['nb'],
      corps: ['gx'],
      special: ['px'],
      support: ['ie', 'mc'],
      heavy: ['gc'],
      rules: {
        noFieldComm: true
      },
      allowedUniqueUpgrades: ['il'],
      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2022/10/StarWarsLegionBFRulesSheetSI.pdf',

      'standard mode': {
        commander: [1, 1],
        operative: [0, 1],
        corps: [4, 8],
        special: [0, 2],
        support: [0, 3],
        heavy: [1, 2]
      },
      '500-point mode': {
        commander: [1, 1],
        operative: [0, 1],
        corps: [2, 6],
        special: [0, 1],
        support: [0, 2],
        heavy: [1, 1]
      }
    },
    'Experimental Droids': {
      name: 'Experimental Droids',
      faction: 'separatists',
      linkId: 'exd',
      commander: ['py', 'nr', 'pz', 'qa'],
      operative: [],
      corps: ['gx', 'ga'],
      special: ['la', 'xd'],
      support: ['ie'],
      heavy: ['xe'],
      allowedUniqueUpgrades: [],

      rules:{
        buildsAsCorps:['xd'],
        rankLimits:[
          {ids:['la'], count:[0,2]},
          {ids:['gx'], count:[0,2]},
          {ids:['ga'], count:[0,2]}
        ]
      },

      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_ExperimentalDroids.pdf',
      'standard mode': {
        commander: [1, 2],
        operative: [0, 0],
        corps: [3, 6],
        special: [0, 3],
        support: [0, 3],
        heavy: [0, 2]
      },
      '500-point mode': {
        commander: [1, 2],
        operative: [0, 0],
        corps: [2, 4],
        special: [0, 3],
        support: [0, 1],
        heavy: [0, 1]
      }
    },
  'Shadow Collective': {
      name: 'Shadow Collective',
      faction: 'mercenary',
      forceAffinity:'dark side',
      linkId: 'sc',
      commander: ['ra', 'rd', 'qy'],
      operative: ['rc', 'kx', 'ax'],
      corps: ['rb', 'qz'],
      special: ['re'],
      support: ['sq'],
      heavy: ['sm'],
      allowedUniqueUpgrades: ['rq', 'so', 'se', 'sp', 'sg', 'sh', 'si'],
      rules:{
        countMercs: true
      },

      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_ShadowCollective.pdf',

      'standard mode': {
        commOp: 4,

        commander: [1, 4],
        operative: [0, 3],
        corps: [2, 6],
        special: [0, 4],
        support: [0, 3],
        heavy: [0, 2]
      },
      '500-point mode': {
        commOp: 2,

        commander: [1, 2],
        operative: [0, 1],
        corps: [1, 4],
        special: [0, 3],
        support: [0, 2],
        heavy: [0, 1]
      }
    }
};

export default battleForcesDict;
