const legionModes = {
  "500-point mode": {
    name: "Recon",
    maxPoints: 600,
    rankReqs: {
      commander: [1, 1],
      operative: [0, 1],
      corps: [2, 4],
      special: [0, 2],
      support: [0, 2],
      heavy: [0, 1],
    },
  },
  "escalation mode": {
    name: "Escalation",
    maxPoints: 800,
    rankReqs: {
      commander: [1, 2],
      operative: [0, 2],
      corps: [3, 6],
      special: [0, 3],
      support: [0, 3],
      heavy: [0, 2],
    },
  },
  "standard mode": {
    name: "Standard",
    maxPoints: 1000,
    rankReqs: {
      commander: [1, 2],
      operative: [0, 2],
      corps: [3, 6],
      special: [0, 3],
      support: [0, 3],
      heavy: [0, 2],
    },
  },
  "grand army mode": {
    name: "Grand Army",
    maxPoints: 1600,
    rankReqs: {
      commander: [1, 4],
      operative: [0, 3],
      corps: [6, 10],
      special: [0, 5],
      support: [0, 5],
      heavy: [0, 4],
    },
  },
};

export default legionModes;
