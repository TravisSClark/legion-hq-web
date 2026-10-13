const settings = {
  default: {
    themeColor: "dark",
    cardStyle: "images",
    // builderOrientation: "right",
    cascadeUpgradeSelection: "yes",
    showUnreleasedCards: true,
    // dragDelayTime: 1,
    showHeaderLabel: "on",
    useOriginalImages: false,
    sortType: "default",
  },
  list: [
    {
      key: "themeColor",
      name: "Theme",
      description: "Dark vs Light theme for the app",
      values: [
        { key: "dark", name: "Dark Side" },
        { key: "light", name: "Light Side" },
      ],
    },
    {
      key: "cardStyle",
      name: "Card Style",
      description: "Change how cards are displayed in the list",
      values: [
        { key: "images", name: "Images" },
        { key: "text", name: "Text" },
        { key: "compact", name: "Compact" },
      ],
    },
    {
      key: "showHeaderLabel",
      name: "Header Labels",
      description: "Show list headers (battleforce, mode)",
      values: [
        { key: "on", name: "On" },
        { key: "off", name: "Off" },
      ],
    },
    {
      key: "cascadeUpgradeSelection",
      name: "Cascade Upgrade Selection",
      description: "Automatically moves to the next empty upgrade slot",
      values: [
        { key: "yes", name: "Yes" },
        { key: "no", name: "No" },
      ],
    },
    {
      key: "showUnreleasedCards",
      name: "Show Unreleased Cards",
      description:
        "Display cards that have been announced but not yet released",
      values: [
        { key: true, name: "Yes" },
        { key: false, name: "No" },
      ],
    },
    {
      key: "useOriginalImages",
      name: "Use Original Images",
      description:
        "(Work in Progress) Use original upgrade card images instead of art",
      values: [
        { key: true, name: "Yes" },
        { key: false, name: "No" },
      ],
    },
    {
      key: "sortType",
      name: "Card Sort",
      description: "How cards are sorted in the list",
      values: [
        { key: "default", name: "Faction First" },
        { key: "name", name: "Alphabetical" },
        { key: "points", name: "Points" },
      ],
    },
  ],
};

export default settings;
