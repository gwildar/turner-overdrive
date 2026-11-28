/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  {
    id: "bull charge",
    displayName: "Bull Charge",
    description:
      "Impact Hits caused by this model (not its mount) have an Armour Piercing characteristic of -1.",
    phases: ["choose-fight"],
  },
  {
    id: "thunderous charge",
    displayName: "Thunderous Charge",
    description: "Impact Hits caused by this model have an AP of -2.",
    phases: ["choose-fight"],
  },
  {
    id: "mournfang charge",
    displayName: "Mournfang Charge",
    description:
      "Impact Hits caused by this model have Armour Bane (1) and AP -1.",
    phases: ["choose-fight"],
  },
  {
    id: "numbing chill",
    displayName: "Numbing Chill",
    description:
      "Enemy models in base contact suffer -1 WS and -1 Initiative (minimum 1).",
    phases: ["choose-fight"],
  },
  {
    id: "butcher's cauldron",
    displayName: "Butcher's Cauldron",
    aliases: ["butchers cauldron"],
    phases: [
      {
        subPhaseId: "choose-fight",
        description: "Replaces Impact Hits (2) with Impact Hits (D3+1).",
      },
      {
        subPhaseId: "command",
        yourTurnOnly: true,
        description:
          "If not in combat, take a Leadership test. Pass: character and joined unit gain Regeneration (5+) until next Start of Turn. Fail: lose 1 Wound.",
      },
    ],
  },
  {
    id: "blessings of the volcano god",
    displayName: "Blessings of the Volcano God",
    description: "4+ Ward save against wounds caused by Flaming Attacks.",
    phases: ["choose-fight", "shoot"],
  },
  {
    id: "stone skeleton",
    displayName: "Stone Skeleton",
    passive: true,
    phases: [
      {
        subPhaseId: "choose-fight",
        description:
          "When suffering an unsaved wound from Multiple Wounds (X), reduce the number of wounds lost by 1 (minimum 1).",
      },
    ],
  },
  {
    id: "ravenous hunger",
    displayName: "Ravenous Hunger",
    chargeMod: { range: 0, tag: "Ravenous", color: "orange", order: 3 },
    description: "When declaring a charge, may re-roll the Charge roll.",
    phases: ["declare-charges"],
    yourTurnOnly: true,
  },
  {
    id: "look-out gnoblar",
    displayName: "Look-out Gnoblar",
    description:
      'Champion/character may make "Look Out, Sir!" with 2+ rank-and-file (instead of 5). With 5+, may re-roll the roll.',
    phases: ["shoot"],
  },
  {
    id: "largely insignificant",
    displayName: "Largely Insignificant",
    passive: true,
    phases: [],
    description:
      "Unit never causes friendly Panic tests. Cannot be joined by a character without this rule.",
  },
  {
    id: "running with the pack",
    displayName: "Running with the Pack",
    passive: true,
    phases: [],
    description:
      "Hunter joining Sabretusks gains Swiftstride. Sabretusks lose Impetuous while the Hunter remains.",
  },
  {
    id: "traps and snares",
    displayName: "Traps & Snares",
    aliases: ["traps & snares"],
    description:
      "Any enemy model that ends its charge move in base contact with this model must make a Dangerous Terrain test.",
    phases: ["choose-fight"],
  },
  {
    id: "bellowers and musicians",
    displayName: "Bellowers & Musicians",
    aliases: ["bellowers & musicians"],
    passive: true,
    phases: [],
    description:
      "Ogre musicians are Bellowers who use their voice instead of instruments. Function as standard musicians.",
  },
];

export default RULES;
