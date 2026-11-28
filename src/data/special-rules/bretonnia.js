/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  {
    id: "untutored arcanist",
    displayName: "Untutored Arcanist",
    description:
      "When rolling on the Miscast table, roll an extra D6 and discard the highest result.",
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
  },
  {
    id: "blessings of the lady",
    displayName: "Blessings of the Lady",
    description:
      "6+ Ward save (5+ vs S5+). Lost if the unit flees or a character refuses a challenge.",
    phases: ["choose-fight"],
  },
  {
    id: "finest warhorses",
    displayName: "Finest Warhorses",
    phases: [
      {
        subPhaseId: "declare-charges",
        yourTurnOnly: true,
        description:
          "Re-roll any natural 1s on Charge, Flee, or Pursuit rolls (before discarding dice).",
      },
      {
        subPhaseId: "pursuit",
        description:
          "Re-roll any natural 1s on Flee or Pursuit rolls (before discarding dice).",
      },
    ],
  },
  {
    id: "crusader's zeal",
    displayName: "Crusader's Zeal",
    chargeMod: { range: 1, tag: "Zeal", color: "orange", order: 2 },
    phases: [
      {
        subPhaseId: "declare-charges",
        yourTurnOnly: true,
        description:
          '+1" to maximum charge range and +1 to Charge roll result. Also gains Impetuous.',
      },
    ],
  },
  {
    id: "earn your spurs",
    displayName: "Earn Your Spurs",
    description:
      'Enemy standards captured worth 100 VPs. Within 6" of a Grail Vow model or Lord of Bretonnia, re-roll natural 1s To Hit.',
    phases: ["choose-fight"],
  },
  {
    id: "Peasant's Duty",
    displayName: "Peasant's Duty",
    description:
      "May Give Ground instead of Fall Back in Good Order. Friendly Levies within Command range re-roll failed Panic tests.",
    phases: ["break-test"],
  },
  {
    id: "the grail vow",
    displayName: "The Grail Vow",
    description:
      "Immune to Psychology, Magical Attacks, Stubborn. Cannot refuse challenges.",
    phases: ["choose-fight"],
    ward: "6+ (5+ > S5)",
  },
  {
    id: "the questing vow",
    displayName: "The Questing Vow",
    description: "Stubborn. Re-roll failed Fear, Panic, and Terror tests.",
    phases: ["break-test"],
  },
  {
    id: "exile's vow",
    displayName: "The Exile's Vow",
    aliases: ["the exile's vow", "the exile's vow (replaces the knight's vow)"],
    passive: true,
    phases: [],
    description: "Replaces The Knight's Vow. Grants Stubborn and Veteran.",
    grantsRules: ["stubborn", "veteran"],
  },
  {
    id: "peasantry",
    displayName: "Peasantry",
    description:
      "Within 6\" of a non-fleeing Knight's/Questing/Grail Vow model, may use that model's Ld. Standard cannot be taken as a trophy.",
    phases: ["command", "rally", "break-test"],
  },
  {
    id: "blessed knight",
    displayName: "Blessed Knight",
    phases: [],
    description:
      "The Green Knight has a 5+ Ward save against any wounds suffered.",
    ward: "5+",
  },
  {
    id: "guardian of the sacred sites",
    displayName: "Guardian of the Sacred Sites",
    description:
      "Not deployed. Each Start of Turn he is off the battlefield, roll D6: 3+ awakens him (automatic from round 5).",
    phases: [
      {
        subPhaseId: "start-of-turn",
        description:
          "If the Green Knight is not on the battlefield, roll D6: 3+ awakens him (automatic from round 5).",
        yourTurnOnly: true,
      },
      {
        subPhaseId: "compulsory-moves",
        description:
          'If awakened this turn, place him completely within any natural terrain feature (woods, difficult or dangerous terrain), not within 1" of an enemy.',
        yourTurnOnly: true,
      },
      {
        subPhaseId: "remaining-moves",
        description:
          'Instead of moving, if completely within natural terrain and not in combat, may be removed and placed completely within a different natural terrain feature (not within 1" of an enemy). Cannot move again this phase.',
        yourTurnOnly: true,
      },
    ],
  },
  {
    id: "aura of the fay",
    displayName: "Aura of the Fay",
    description:
      "When slain he is removed but may be awakened again with Guardian of the Sacred Sites, at a cumulative -1 to the roll and -1 Wounds characteristic (min 1) each time. The enemy only scores Victory Points for him the first time.",
    phases: ["start-of-turn"],
    yourTurnOnly: true,
  },
  {
    id: "arcane backlash",
    displayName: "Arcane Backlash",
    phases: [
      {
        subPhaseId: "conjuration",
        opponentOnly: true,
        description:
          "+1 to Dispel rolls. On any natural double (except double 1), the spell is unbound and the casting Wizard loses a Wound.",
      },
      {
        subPhaseId: "remaining-moves",
        opponentOnly: true,
        description:
          "+1 to Dispel rolls vs Conveyance spells. On any natural double (except double 1), the spell is unbound and the casting Wizard loses a Wound.",
      },
      {
        subPhaseId: "shoot",
        opponentOnly: true,
        description:
          "+1 to Dispel rolls vs Magic Missiles. On any natural double (except double 1), the spell is unbound and the casting Wizard loses a Wound.",
      },
      {
        subPhaseId: "choose-fight",
        description:
          "+1 to Dispel rolls vs Assailment spells. On any natural double (except double 1), the spell is unbound and the casting Wizard loses a Wound.",
      },
    ],
  },
  {
    id: "lance formation",
    displayName: "Lance Formation",
    description:
      "A unit in Lance formation with Unit Strength 5+ claims +1 combat result.",
    phases: ["combat-result"],
  },
  {
    id: "the knights vow",
    displayName: "The Knight's Vow",
    aliases: ["the knight's vow"],
    description:
      'No Panic test when a friendly Peasantry unit is destroyed within 6", or flees through this unit. Cannot be joined by (or join) Peasantry characters/units.',
    phases: ["shoot", "compulsory-moves", "break-test"],
  },
  {
    id: "aura of the lady",
    displayName: "Aura of the Lady",
    description: "Any unit this character has joined gains Magical Attacks.",
    phases: ["choose-fight"],
  },
  {
    id: "shield of the lady",
    displayName: "Shield of the Lady",
    description:
      "In a joined unit of US 10+ with a Chivalrous Vow, may retire to the rear at any time: cannot attack or be attacked, but still confers Leadership and rules and may cast as if in the fighting rank.",
    phases: ["choose-fight"],
  },
  {
    id: "grail reliquae",
    displayName: "Grail Reliquae",
    description:
      'Counts as six models (2 in each of the first three ranks), and as standard bearer and musician. Cannot lose Wounds while Battle Pilgrims remain. Within 12" of a non-fleeing friendly Grail Vow model, the unit is Immune to Psychology and Unbreakable.',
    phases: ["break-test"],
  },
  {
    id: "retinue of the saints",
    displayName: "Retinue of the Saints",
    description:
      "Army may include one Grail Reliquae per character or unit with the Grail Vow.",
    passive: true,
    phases: [],
  },
  {
    id: "living saints",
    displayName: "Living Saints",
    description:
      "Every model in the unit can issue and accept challenges as if it were a character.",
    phases: ["choose-fight"],
  },
  {
    id: "the wyrm slayer",
    displayName: "The Wyrm Slayer",
    description:
      "If he kills an enemy monstrous infantry, monstrous cavalry, monstrous creature or behemoth in combat, he gains Terror for the rest of the game.",
    phases: ["choose-fight"],
  },
];

export default RULES;
