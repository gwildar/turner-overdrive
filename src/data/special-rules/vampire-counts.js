/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  {
    id: "necromantic undead",
    displayName: "Necromantic Undead",
    phases: [
      {
        subPhaseId: "remaining-moves",
        description:
          "Cannot march (unless using Fly). Immune to Psychology. Unbreakable — Gives Ground instead of breaking.",
      },
      {
        subPhaseId: "combat-result",
        description:
          "Unstable: if combat is lost, unit suffers additional Wounds equal to combat result lost (no saves). Characters with this rule cannot join units without it.",
      },
    ],
  },
  {
    id: "the hunger",
    displayName: "The Hunger",
    phases: [
      {
        subPhaseId: "combat-result",
        description:
          "At end of any Combat phase in which this character inflicted 1+ unsaved wounds, roll D6: on 6, recover 1 Wound.",
      },
      {
        subPhaseId: "pursuit",
        description:
          "This character (and any joined unit) rolls only a single D6 for Pursuit rolls.",
      },
    ],
  },
  {
    id: "banner of the count",
    displayName: "Banner of the Count",
    description:
      'Replaces "Hold Your Ground" when this model is your Battle Standard Bearer: friendly units within its Command range may re-roll failed Leadership tests, and reduce Wounds lost to Unstable by D3 (not cumulative with Indomitable — use the higher).',
    phases: ["break-test"],
  },
  {
    id: "wight banner",
    displayName: "Wight Banner",
    description:
      'Replaces "Hold Your Ground" when this model is your Battle Standard Bearer: friendly units within its Command range may re-roll failed Leadership tests, and reduce Wounds lost to Unstable by D3 (not cumulative with Indomitable — use the higher).',
    phases: ["break-test"],
  },
  {
    id: "the newly dead",
    displayName: "The Newly Dead",
    description:
      "When resurrecting the fallen, this unit may go beyond its starting size (not its maximum).",
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "slavering charge",
    displayName: "Slavering Charge",
    description: "In a turn it charged, +1 Strength.",
    phases: ["choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "bound spirits",
    displayName: "Bound Spirits",
    description:
      "Not Undisciplined (unlike other swarms): can use the General's Inspiring Presence and a Battle Standard's \"Hold Your Ground\".",
    passive: true,
    phases: [],
  },
  {
    id: "infested",
    displayName: "Infested",
    description:
      "When this model loses its last Wound, every unit in base contact (friend or foe) suffers D6 S2 AP -1 hits.",
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "spectral coach",
    displayName: "Spectral Coach",
    description:
      "May become Incorporeal until your next Start of Turn: loses Impact Hits (D6+2), gains Ethereal and Fly (10).",
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "accursed weapons",
    displayName: "Accursed Weapons",
    description: "Hand weapons have Magical Attacks and AP -1.",
    phases: ["choose-fight"],
  },
  {
    id: "martial pride",
    displayName: "Martial Pride",
    description:
      "Every model can issue and accept challenges as if a character, and the unit cannot refuse a challenge it could accept.",
    phases: ["choose-fight"],
  },
  {
    id: "spectral reapers",
    displayName: "Spectral Reapers",
    description:
      "Fly over one enemy unit not in combat: after moving, it suffers one S4 hit per model that moved over it — no armour save, Flaming and Magical Attacks.",
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "carrion feeders",
    displayName: "Carrion Feeders",
    description:
      "Enemy units engaged in combat with this model suffer -1 Initiative.",
    phases: ["choose-fight"],
  },
  {
    id: "balefire brazier",
    displayName: "Balefire Brazier",
    description:
      'Enemy Wizards within 15" of a model with this rule increase the casting value of their spells by 1.',
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    opponentOnly: true,
  },
  {
    id: "warped tintinnabulation",
    displayName: "Warped Tintinnabulation",
    description:
      'When a friendly unit within 15" recovers Wounds from Invocation of Nehek, roll D6: on 4+ it recovers one more. Friendly units within 15" reduce Wounds lost to Unstable by 1 (cumulative with Indomitable).',
    phases: ["command", "break-test"],
  },
  {
    id: "accursed reliquary",
    displayName: "Accursed Reliquary",
    description:
      "Friendly Necromantic Undead units within this model's Command range have +1 Movement and +1 Initiative.",
    phases: ["remaining-moves", "choose-fight"],
  },
  {
    id: "blasphemous tome",
    displayName: "Blasphemous Tome",
    description:
      "All Wizards (friend or foe) within this model's Command range get +1 to Casting rolls, but a miscast there rolls twice on the Miscast table and applies both.",
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
  },
  {
    id: "the death of a general",
    displayName: "The Death of a General",
    description:
      "Your General must be a Wizard. Once the General is slain, Necromantic Undead units lose Regeneration and, at the end of that phase and each of your Start of Turn sub-phases, take a Leadership test, losing Wounds equal to the amount failed by.",
    phases: ["start-of-turn"],
    yourTurnOnly: true,
  },
  {
    id: "scrying pool",
    displayName: "Scrying Pool",
    description:
      "Bound spell (Power Level 2), Enchantment, 9+, Self, may be cast in combat: until your next Start of Turn, re-roll To Hit rolls of a natural 1.",
    phases: ["conjuration"],
    yourTurnOnly: true,
  },
  {
    id: "invocation of nehek",
    displayName: "Invocation of Nehek",
    description:
      'If not engaged, resurrect D3 + Wizard Level Wounds of Infantry, or Wizard Level Wounds of Monstrous/Cavalry, or 1 Wound of Behemoth/War Machine, in a friendly Necromantic Undead unit within 12". Requires Ld test.',
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "wailing dirge",
    displayName: "Wailing Dirge",
    description:
      'In your Shooting phase, unless it marched: target a unit within 8" (including in combat, or one it is engaged with). Ld test at -2. Wounds = margin of failure. No armour/Regen saves.',
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "bestial fury",
    displayName: "Bestial Fury",
    description:
      "Enemy units cannot claim bonus combat result points for being engaged with this model's flank or rear arc.",
    phases: ["combat-result"],
    opponentOnly: true,
  },
  {
    id: "ghoulish glamour",
    displayName: "Ghoulish Glamour",
    description:
      "Enemy models must pass a Leadership test before rolling To Hit during Combat. If failed, only natural 6s hit.",
    phases: ["choose-fight"],
    opponentOnly: true,
  },
];

export default RULES;
