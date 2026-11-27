/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  // ─── Vampire Counts ───────────────────────────────────────────────────

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
];

export default RULES;
