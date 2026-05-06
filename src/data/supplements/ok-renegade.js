/**
 * Ogre Kingdoms Renegades supplement data.
 * Draft v1.5.2.2 — community supplement.
 */

export default {
  units: {},

  specialRules: [
    {
      id: "smooth ride",
      displayName: "Smooth Ride",
      passive: true,
      description: "Ignores the To Hit modifier for Moving and Shooting.",
      phases: [],
    },
    {
      id: "monstrous-ranks-renegade",
      displayName: "Monstrous Ranks",
      aliases: ["Monstrous Ranks {renegade}"],
      passive: true,
      description:
        "All Ogre Kingdoms Monstrous Infantry (except Yhetees) gain the Press of Battle and Massed Infantry special rules.",
      phases: [],
    },
  ],

  spells: {
    "great-maw-renegade": {
      name: "Lore of the Great Maw",
      faction: "Ogre Kingdoms",
      signatureOnly: true,
      spells: [
        {
          num: "S",
          name: "Toothcracker",
          type: "enchantment",
          cv: "7+/10+",
          range: '12"',
        },
        {
          num: "S",
          name: "Trollguts",
          type: "enchantment",
          cv: "7+/10+",
          range: '15"',
        },
      ],
    },
  },

  magicItems: [
    {
      name: "Tooth-Gnoblar",
      type: "arcane",
      points: 10,
      maxPerModel: 3,
      singleUse: true,
      effect:
        "One use only. May be used when making a casting roll for a spell from the Lore of the Great Maw. Add +1 to the casting roll.",
      phases: [],
    },
  ],
};
