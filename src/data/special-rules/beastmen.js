/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  // ─── Beastmen ────────────────────────────────────────────────────────

  {
    id: "primal fury",
    displayName: "Primal Fury",
    description:
      "When combat is chosen (step 1.1 of Choose & Fight), the unit must make a Leadership test. If passed, it may re-roll To Hit rolls of a natural 1 until the end of this Combat phase.",
    phases: ["choose-fight"],
  },
  {
    id: "blood rage",
    displayName: "Blood Rage",
    description:
      "If the Primal Fury Leadership test is passed with a natural double, the unit also becomes Frenzied. This applies even if Frenzy was lost earlier in the game.",
    phases: ["choose-fight"],
  },
  {
    id: "bestial charge",
    displayName: "Bestial Charge",
    description:
      'During a turn in which it made a charge move of 3" or more, gains +1 Strength.',
    phases: ["choose-fight"],
  },
  {
    id: "blood greed",
    displayName: "Blood Greed",
    phases: [
      {
        subPhaseId: "choose-fight",
        description: "Whilst Frenzied, +2 Attacks (instead of the usual +1).",
      },
      {
        subPhaseId: "pursuit",
        description: "Rolls a single D6 for its Pursuit roll (instead of 2D6).",
      },
    ],
  },
  {
    id: "foe render",
    displayName: "Foe Render",
    description:
      "Whilst subject to Primal Fury, a single non-magical hand weapon has AP -2. Not with two hand weapons or other weapons; not the mount.",
    phases: ["choose-fight"],
  },
  {
    id: "brayhorn",
    displayName: "Brayhorn",
    description:
      "General only. From round 2, if on the battlefield, test Leadership: if passed, re-roll for each unit of Ambushers still in reserve that didn't arrive this Start of Turn.",
    phases: ["command"],
    yourTurnOnly: true,
    fromRound: 2,
  },
  {
    id: "bull-gors",
    displayName: "Bull-gors",
    description: "Impact Hits caused by this model have AP -1.",
    phases: ["choose-fight"],
  },
  {
    id: "slaughterers call",
    displayName: "Slaughterer's Call",
    aliases: ["slaughterer's call"],
    description:
      "Whilst this model is Frenzied, any unit it has joined is also Frenzied.",
    phases: ["choose-fight"],
  },
  {
    id: "drunken",
    displayName: "Drunken",
    description:
      "Roll D6 for each unit not Frenzied, not in combat and not fleeing. Lasts until its next Start of Turn.",
    phases: [
      {
        subPhaseId: "start-of-turn",
        description:
          "Roll D6 for each unit not Frenzied, not in combat and not fleeing. Lasts until its next Start of Turn.",
        yourTurnOnly: true,
        table: [
          { D6: "1", Result: "Unsteady: Random Movement, Movement D6+2" },
          { D6: "2-5", Result: "Sobering Up: no effect" },
          {
            D6: "6",
            Result: "Belligerent Drunks: Frenzy (even if lost earlier)",
          },
        ],
      },
    ],
  },
  {
    id: "the quickening storm",
    displayName: "The Quickening Storm",
    description:
      "5+ Ward save vs Magic Missiles and Magical Vortexes. Hit by Storm Call → Quickened: +1 Initiative and +1 Attacks until your next Start of Turn.",
    phases: ["choose-fight"],
    ward: "5+ (Magic Missiles & Vortexes)",
  },
  {
    id: "maddening aura",
    displayName: "Maddening Aura",
    description:
      'Every enemy unit within 8" (including fleeing or engaged units) takes a Leadership test. Fail = D3 S3 hits, no armour or Regeneration saves.',
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "spurting bile blood",
    displayName: "Spurting Bile Blood",
    description:
      "For each Wound this model loses in combat, the attacking enemy unit suffers a S4 AP -1 hit.",
    phases: ["choose-fight"],
  },
  {
    id: "ghostsight",
    displayName: "Ghostsight",
    description:
      "Re-roll failed To Hit rolls against enemy Wizards, models/units with magic items, or models/units with a Ward or Regeneration save.",
    phases: ["choose-fight"],
  },
  {
    id: "soul-eater",
    displayName: "Soul-eater",
    description:
      'An enemy Wizard casting within 12" of a Cygor first tests Leadership. If failed, a failed casting attempt is a miscast.',
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    opponentOnly: true,
  },
  {
    id: "swallow whole",
    displayName: "Swallow Whole",
    description:
      "If engaged with regular or heavy infantry: nominate one such unit; it takes an Initiative test. Fail = one model removed as a casualty and the Ghorgon recovers a Wound.",
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "endless malice",
    displayName: "Endless Malice",
    description:
      'If it wins a round of combat and restrains and reforms (passing the Leadership test), enemy units within 6" take a Panic test as if a nearby friend was destroyed.',
    phases: ["combat-result"],
  },
  {
    id: "storm call",
    displayName: "Storm Call",
    description:
      'Bound spell (Power Level 1), Magic Missile, casting value 7+, range Self, may be cast in combat: every unit within 6" (friend or foe, including this one) suffers D3 S4 AP -1 hits.',
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "mixed unit",
    displayName: "Mixed Unit",
    description:
      "Gors and Ungors have different WS and T. Enemy shooting hits are split as evenly as possible between them before rolling To Wound; in combat, enemies attack models in the fighting rank.",
    phases: ["shoot", "choose-fight"],
    opponentOnly: true,
  },
  {
    id: "father of beasts",
    displayName: "Father of Beasts",
    description:
      "Friendly Centigor Herds within Ghorros's Command range may re-roll the D6 on the Drunken table.",
    phases: ["start-of-turn"],
    yourTurnOnly: true,
  },
  {
    id: "the sons of ghorros",
    displayName: "The Sons of Ghorros",
    description:
      "Army building: 0-1 Centigor Herd may be Sons of Ghorros (+2 pts per model): +1 WS and Ld (max 10) and Armour Bane (1).",
    passive: true,
    phases: [],
  },
  {
    id: "herdstones",
    displayName: "Herdstones",
    description:
      'Special feature (impassable, up to 6" across), placed after terrain outside the opponent\'s deployment zone and more than 6" from the centre. Controlled by the closest non-fleeing unit of US 5+ within 6". Controller gains Magic Resistance (-1). If a Beastmen unit controls it: Beastmen within 12" re-roll To Wound 1s in combat, Beastmen Wizards within 12" get +1 to cast (enemy Wizards -1), and enemies within 12" have -1 Ld for Fear, Panic and Terror tests.',
    phases: ["deployment", "choose-fight", "conjuration"],
  },
  {
    id: "blessings of chaos",
    displayName: "Blessings of Chaos",
    aliases: ["blessing of chaos"],
    description:
      "When this unit's combat is chosen, roll D6 for its blessing, lasting this Combat phase.",
    phases: [
      {
        subPhaseId: "choose-fight",
        description:
          "When this unit's combat is chosen, roll D6 for its blessing, lasting this Combat phase.",
        table: [
          { D6: "1-2", Result: "Stinging Barbs: Poisoned Attacks" },
          { D6: "3-4", Result: "Scything Talons: all attacks AP -2" },
          { D6: "5-6", Result: "Chitinous Hide: +1 Toughness" },
        ],
      },
    ],
  },
];

export default RULES;
