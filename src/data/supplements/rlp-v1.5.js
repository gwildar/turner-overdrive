/**
 * The Renegade Legacy Pack v1.5 (Last Update September 15, 2025)
 * Community supplement by Val Heffelfinger / Square Based.
 *
 * Covers: Chaos Dwarfs, Daemons of Chaos, Lizardmen, Ogre Kingdoms,
 *         Skaven, Vampire Counts, Dark Elves.
 *
 * These are the stable/default Renegade rules. The v1.5.2.2 draft files
 * (de-renegade.js, ok-renegade.js, sk-renegade.js) are the opt-in override.
 */

export default {
  units: {},

  specialRules: [
    // ── Ogre Kingdoms ────────────────────────────────────────────────
    {
      id: "monstrous-ranks",
      displayName: "Monstrous Ranks",
      passive: true,
      description:
        "All Ogre Kingdoms Monstrous Infantry (except Yhetees) gain the Press of Battle and Massed Infantry special rules.",
      phases: [],
    },

    // ── Chaos Dwarfs ─────────────────────────────────────────────────
    {
      id: "born-of-fire",
      displayName: "Born of Fire",
      passive: true,
      description:
        "K'daai Fireborn have a 3+ Ward save against any wounds suffered that were caused by an attack that has the Flaming Attacks special rule.",
      phases: [],
    },

    // ── Dark Elves ───────────────────────────────────────────────────
    // Note: OWB exports "Murderous {renegade}" — this resolves via the draft
    // supplement's murderous-renegade alias. v1.5 scope: first round only;
    // draft scope: all rounds. Both apply to non-magical weapons only.
    {
      id: "murderous-v1.5",
      displayName: "Murderous",
      passive: true,
      description:
        "In the first round of combat, a model with this special rule may re-roll any rolls To Wound of a natural 1. Only applies to non-magical weapons. Does not apply to a model's mount. (Renegade Legacy Pack v1.5)",
      phases: ["choose-fight"],
    },

    // ── Lizardmen ────────────────────────────────────────────────────
    {
      id: "wisdom-of-the-old-ones",
      displayName: "Wisdom of the Old Ones",
      description:
        "Once per turn, the Slann Mage-Priest may re-roll one D6 when making a Casting Roll. This ability may not be used to re-roll a Miscast. In addition, it knows one more spell (chosen in the usual way) than is normal for their Level of Wizardry.",
      phases: ["strategy"],
    },

    // ── Vampire Counts ───────────────────────────────────────────────
    {
      id: "dark-vitality",
      displayName: "Dark Vitality",
      passive: true,
      description:
        "A Vampire Count or Vampire Thrall Wizard with this special rule may wear armour or carry a shield without penalty — they may Cast and Dispel as normal.",
      phases: [],
    },
  ],

  spells: {
    // ── Chaos Dwarfs v1.5 ────────────────────────────────────────────
    "hashut-v1.5": {
      name: "Lore of Hashut",
      faction: "Chaos Dwarfs",
      signatureOnly: true,
      spells: [
        {
          num: "S",
          name: "Curse of Hashut",
          type: "magic-missile",
          cv: "9+",
          range: '18"',
        },
        {
          num: "S",
          name: "Storm of Ash",
          type: "hex",
          cv: "9+",
          range: "Self",
        },
        {
          num: "S",
          name: "Flames of Hashut",
          type: "assailment",
          cv: "8+",
          range: "Combat",
        },
      ],
    },

    // ── Lizardmen v1.5 ───────────────────────────────────────────────
    "lustria-v1.5": {
      name: "Lore of Lustria",
      faction: "Lizardmen",
      signatureOnly: true,
      spells: [
        {
          num: "S",
          name: "Apotheosis",
          type: "enchantment",
          cv: "8+/10+",
          range: '24"',
        },
        {
          num: "S",
          name: "Monsoon",
          type: "magical-vortex",
          cv: "8+",
          range: '15"',
        },
      ],
    },

    // ── Ogre Kingdoms v1.5 ───────────────────────────────────────────
    "great-maw-v1.5": {
      name: "Lore of the Great Maw",
      faction: "Ogre Kingdoms",
      signatureOnly: true,
      spells: [
        {
          num: "S",
          name: "Toothcracker",
          type: "enchantment",
          cv: "6+/9+",
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

    // ── Skaven v1.5 ──────────────────────────────────────────────────
    "horned-rat-v1.5": {
      name: "Lore of the Horned Rat",
      faction: "Skaven",
      signatureOnly: true,
      spells: [
        {
          num: "S",
          name: "Skitterleap",
          type: "conveyance",
          cv: "7+",
          range: '18"',
        },
        {
          num: "S",
          name: "Warp Lightning",
          type: "magic-missile",
          cv: "9+",
          range: '18"',
        },
        {
          num: "S",
          name: "Cloud of Corruption",
          type: "magical-vortex",
          cv: "9+",
          range: '9"',
        },
      ],
    },

    // ── Vampire Counts v1.5 ──────────────────────────────────────────
    "undeath-v1.5": {
      name: "Lore of Undeath",
      faction: "Vampire Counts",
      signatureOnly: true,
      spells: [
        {
          num: "S",
          name: "Vanhal's Danse Macabre",
          type: "enchantment",
          cv: "7+/11+",
          range: '12"',
        },
        {
          num: "S",
          name: "Hellish Vigour",
          type: "enchantment",
          cv: "6+/10+",
          range: "Self",
        },
        {
          num: "S",
          name: "Raise Dead",
          type: "enchantment",
          cv: "9+",
          range: '12"',
        },
      ],
    },

    // ── Dark Elves v1.5 ──────────────────────────────────────────────
    "naggaroth-v1.5": {
      name: "Lore of Naggaroth",
      faction: "Dark Elves",
      signatureOnly: true,
      spells: [
        {
          num: "S",
          name: "Cursing Word",
          type: "hex",
          cv: "7+",
          range: '12"',
        },
        {
          num: "S",
          name: "Black Horror",
          type: "magical-vortex",
          cv: "9+",
          range: '18"',
        },
      ],
    },
  },

  magicItems: [],
};
