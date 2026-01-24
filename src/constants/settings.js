const settings = {
  default: {
    themeColor: "dark",
    cardStyle: "images",
    chipSize: "medium",
    builderOrientation: "right",
    cascadeUpgradeSelection: "yes",
    dragDelayTime: 1,
    showHeaderLabel:"on"
  },
  list: [
    {
      key: "themeColor",
      name: "Theme",
      values: [
        { key: "dark", name: "Dark Side" },
        { key: "light", name: "Light Side" },
      ],
    },
    {
      key: "cardStyle",
      name: "Card Style",
      values: [
        { key: "images", name: "Images" },
        { key: "text", name: "Text" },
        { key: "compact", name: "Compact" },
      ],
    },
    {
      key: "showHeaderLabel",
      name: "Header Labels",
      values: [
        { key: "on", name: "On" },
        { key: "off", name: "Off" },
      ],
    },
    {
      key: "chipSize",
      name: "Chip Size",
      values: [
        { key: "small", name: "Small" },
        { key: "medium", name: "Large" },
      ],
    },
    {
      key: "cascadeUpgradeSelection",
      name: "Cascade Upgrade Selection",
      values: [
        { key: "yes", name: "Yes" },
        { key: "no", name: "No" },
      ],
    },
  ],
};

export default settings;
