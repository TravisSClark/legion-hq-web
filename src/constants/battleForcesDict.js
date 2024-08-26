const battleForcesDict = {
  'Echo Base Defenders': {
      name: 'Echo Base Defenders',
      faction: 'rebels',
      linkId: 'ebd',
      commander: ['ab', 'ad', 'ac', 'bi',  'Ba', 'Bb','Bd'],
      operative: ['jg', 'ji', 'af',  'Bc'],
      corps: ['gv', 'if',   'Bh'],
      special: [],
      support: ['an', 'he',   'Bg'],
      heavy: ['ap', 'xn'],
      allowedUniqueUpgrades: ['fk'],
      rules:{
        noFieldComm: true
      },
      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_EchoBaseDefenders.pdf',
      'standard mode': {
        commander: [1, 4],
        operative: [0, 3],
        corps: [3, 6],
        special: [0, 0],
        support: [1, 4],
        heavy: [0, 2],
        commOp: 4
      },
      '500-point mode': {
        commander: [1, 3],
        operative: [0, 2],
        corps: [2, 4],
        special: [0, 0],
        support: [1, 3],
        heavy: [0, 1],
        commOp: 3
      }
    },
    'Bright Tree Village': {
      name: 'Bright Tree Village',
      faction: 'rebels',
      linkId:'btv',
      commander: ['vv', 'ac', 'ab', 've', 'wd', 'xd', 'Ba'],
      operative: ['af'],
      corps: ['vk', 'ah', 'zh', 'xh', 'Be'],
      special: ['vu', 'ak', 'zg'],
      support: [],
      heavy: ['vj', 'zf'],
      allowedUniqueUpgrades: ['vq', 'wa', 'wb', 'wc'],
      rules: {
        countMercs: true,
        // TODO minimum 2 non-wok rebels
        // TODO maxes for commandos and troopers
        // TODO - more generally, add validation/checks for max Call to Arms eta al

      },
      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2023/07/StarWarsLegionBFRulesSheetBrightTreeVillage1.pdf',
      'standard mode': {
        commander: [1, 5],
        operative: [0, 4],
        corps: [3, 6],
        special: [0, 3],
        support: [0, 2],
        heavy: [0, 2],
        commOp: 5
      },
      '500-point mode': {
        commander: [1, 4],
        operative: [0, 3],
        corps: [2, 4],
        special: [0, 3],
        support: [0, 1],
        heavy: [0, 1],
        commOp: 4
      }
    },
  'Blizzard Force': {
      name: 'Blizzard Force',
      faction: 'empire',
      linkId: 'bf',
      commander: ['at', 'au', 'ar', 'Bp', 'Bq'],
      operative: [],
      corps: ['ay', 'az', 'sr', 'Bt','Bu','Bv'],
      special: [],
      support: ['bf', 'be', 'xy'],
      heavy: ['bg', 'yd'],
      rules: {
        noFieldComm: true,
      },
      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_BlizzardForce.pdf',
      allowedUniqueUpgrades: ['fl'],
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
    commander: ['ui', 'ar', 'Bq'],
    operative: [],
    corps: ['ay', 'hg', 'uy', 'uz',  'Bt','Bs'],
    special: [],
    support: ['bf', 'be','xy'],
    heavy: ['tm', 'ya'],
    rules:[
      // TODO: 1-of rule for corps
      // TODO sf-as-corps
    ],
    ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_ImperialRemnant-1.pdf',
    allowedUniqueUpgrades: ['uj', 'gm'],
    'standard mode': {
      commander: [1, 2],
      operative: [0, 1],
      corps: [3, 6],
      special: [0, 0],
      support: [0, 2],
      heavy: [0, 2],
      commOp: 2
    },
    '500-point mode': {
      commander: [1, 2],
      operative: [0, 1],
      corps: [2, 4],
      special: [0, 0],
      support: [0, 1],
      heavy: [0, 1],
      commOp: 2
    }
  },
  'Tempest Force': {
    name: 'Tempest Force',
    faction: 'empire',
    linkId: 'tf',
    commander: ['ar', 'Bq'],
    operative: [],
    corps: ['ay', 'Bt'],
    special: ['ba'],
    support: ['bf'],
    heavy: ['we', 'bg', 'yd', 'yc'],
    ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_TempestForce-1.pdf',
    allowedUniqueUpgrades: [],
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
      linkId: '5l',
      commander: ['na', 'fy', 'ns',  'yg', ],
      operative: [],
      corps: ['fz',  'yj'],
      special: ['kz', 'ky', 'yk', 'yl'],
      support: ['mb', 'ic', 'yp', 'xj', 'xp'],
      heavy: ['oo', 'yn'],
      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_501st.pdf',
      allowedUniqueUpgrades: ['lh', 'lg', 'Fm', 'Fp'],
      'standard mode': {
        commander: [1, 2],
        operative: [0, 1],
        corps: [1, 4],
        special: [1, 4],
        support: [1, 2],
        heavy: [0, 1],
        commOp: 2
      },
      '500-point mode': {
        commander: [1, 1],
        operative: [0, 1],
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
      commander: ['ol', 'po', 'ph', 'yf'],
      operative: [],
      corps: ['fz', 'xg', 'yj',],
      special: ['kz', 'pg'],
      support: ['qh', 'xf', 'ic', 'yo', ],
      heavy: ['gb', 'qs', 'ym'],
      rules:[
        // TODO, 0-1 arc, 0-2 clones, 0-1 barc, 0-1 saber?, 0-1 isp?
        // TODO: wookiee warriors (noble fighters) sf-as-corps
        // TODO min 3 wookiee troopers
      ],
      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_WookieesDefenders.pdf',
      allowedUniqueUpgrades: ['lh', 'lg'],
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
      commander: ['fx', 'ia', 'nr', 'yv','yw','yq'],
      operative: ['nb'],
      corps: ['gx',  'yx'],
      special: ['px'],
      support: ['ie', 'mc'],
      heavy: ['gc','zc'],
      rules: {
        noFieldComm: true
      },
      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2022/10/StarWarsLegionBFRulesSheetSI.pdf',
      allowedUniqueUpgrades: ['il'],
      rules:{
        noFieldComm: true
      },
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
      linkId: 'ed',
      commander: ['py', 'nr', 'pz', 'qa',  'yr', 'ys', 'yt', 'yq'],
      operative: [],
      corps: ['gx', 'ga', 'xd', 'yx', 'yy' ],
      special: ['la','yz', 'zb'],
      support: ['ie'],
      heavy: ['qt', 'xe', 'zd', 'ze'],
      rules:[
        // TODO proto maganas as corps
        // TODO 0-2 b1s, 0-2 b2s, 0-2 commandos

      ],
      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2024/07/SWQ_ExperimentalDroids.pdf',
      allowedUniqueUpgrades: [],
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
      linkId: 'bf',
      countsMercsForMin: true,
      commander: ['ra', 'rd', 'qy'],
      operative: ['rc', 'kx', 'ax'],
      corps: ['rb', 'qz'],
      special: ['re'],
      support: ['sq'],
      heavy: ['sm', 'zi'],
      forceAffinity: 'dark side',
      rules: {
        countMercs: true
      },
      ruleUrl: 'https://cdn.svc.asmodee.net/production-amgcom/uploads/2022/10/StarWarsLegionBFRulesSheetSC.pdf',
      allowedUniqueUpgrades: ['rq', 'so', 'se', 'sp', 'sg', 'sh', 'si'],
      rules:{
        countMercs: true
      },
      'standard mode': {
        commander: [1, 4],
        operative: [0, 3],
        corps: [2, 6],
        special: [0, 4],
        support: [0, 3],
        heavy: [0, 2],
        commOp: 4
      },
      '500-point mode': {
        commander: [1, 2],
        operative: [0, 1],
        corps: [1, 4],
        special: [0, 3],
        support: [0, 2],
        heavy: [0, 1],
        commOp: 2
      }
    }
};

export default battleForcesDict;