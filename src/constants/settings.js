
const settings = {
  default: {
    themeColor: 'dark',
    cardStyle: 'images',
    chipSize: 'medium',
    builderOrientation: 'right',
    cascadeUpgradeSelection: 'yes',
    showStormTide:false,
    dragDelayTime: 1
  },
  list: [
    {
      key: 'themeColor',
      name: 'Theme',
      values: [
        { key: 'dark', name: 'Dark Side' },
        { key: 'light', name: 'Light Side'}
      ]
    },
    {
      key: 'cardStyle',
      name: 'Card Style',
      values: [
        { key: 'images', name: 'Images' },
        { key: 'text', name: 'Text' },
        { key: 'compact', name: 'Compact' }
      ]
    },
    {
      key: 'chipSize',
      name: 'Chip Size',
      values: [
        { key: 'small', name: 'Small' },
        { key: 'medium', name: 'Large' }
      ]
    },
    {
      key: 'cascadeUpgradeSelection',
      name: 'Cascade Upgrade Selection',
      values: [
        { key: 'yes', name: 'Yes' },
        { key: 'no', name: 'No' }
      ]
    },
    // TODO looks like this needs either a custom component state on top of react-beautiful-dnd, or for that sunset lib to get replaced w something w a setting for this
    // react-beautiful-dnd will be removed, eventually, when LHQ2, eventually, updates MUI and RN, so I'm inclined to punt this for now
    // {
    //   key: 'dragDelayTime',
    //   name: 'Unit Drag Delay Time',
    //   values: [{key:1, name:"1 second"},{key:2, name:"2 seconds"},{key:5, name:"5 seconds"} ]
    // },
    {
      key: 'showStormTide',
      name: 'Show Storm Tide Options',
      values: [
        { key: true, name: 'Yes' },
        { key: false, name: 'No' }
      ]
    }
  ]
}

export default settings;
