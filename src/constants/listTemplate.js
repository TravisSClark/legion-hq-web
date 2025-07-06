const listTemplate = {
  title: 'Untitled',
  mode: 'standard mode',
  faction: '',
  pointTotal: 0,
  killPoints: 0,
  battleForce: '',
  killedUnits: [],
  units: [],
  commandCards: [],
  primaryCards: [],
  secondaryCards: [],
  advantageCards: [],
  unitCounts: {
    commander: 0,
    operative: 0,
    corps: 0,
    special: 0,
    support: 0,
    heavy: 0
  },
  uniqueCardIds:{
    unit:[], // string("id") | {id:string("id"), count:number}
    upgrade:[] // string("id") | {id:string("id"), count:number}
  }
};

export default listTemplate;
