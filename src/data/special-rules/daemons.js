/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  // ─── Daemons of Chaos ────────────────────────────────────────────────

  {
    id: "daemonic",
    displayName: "Daemonic",
    description:
      "5+ Ward save against wounds caused by non-magical attacks. Also grants: Daemonic Instability, Fear, Immune to Psychology, Magical Attacks, Unbreakable, Warp-spawned. Characters cannot join units without this rule.",
    phases: ["choose-fight", "shoot"],
    ward: "5+ (non-magical)",
  },
  {
    id: "daemonic instability",
    displayName: "Daemonic Instability",
    description:
      "If combat is lost, take a Leadership test with +1 modifier per combat result point lost. If failed, lose Wounds equal to the amount failed by. Double 6 = unit is immediately removed from play.",
    phases: ["break-test"],
  },
  {
    id: "daemonic locus",
    displayName: "Daemonic Locus",
    description:
      'Friendly units with the same Daemonic Alignment within 12" reduce Daemonic Instability wounds by 1. Natural double 6 on Daemonic Instability test while within 12" does not destroy the unit.',
    phases: ["break-test"],
  },
  {
    id: "daemon of khorne",
    displayName: "Daemon of Khorne",
    aliases: ["daemons of khorne"],
    description:
      "Hatred (Daemons of Slaanesh). During a turn in which it charged, gains +1 Strength (not its mount).",
    phases: ["choose-fight"],
  },
  {
    id: "daemon of nurgle",
    displayName: "Daemon of Nurgle",
    aliases: ["daemons of nurgle"],
    description:
      "Hatred (Daemons of Tzeentch). Enemy models directing attacks against this model must re-roll To Hit rolls of a natural 6.",
    phases: ["choose-fight"],
    opponentOnly: true,
  },
  {
    id: "daemon of slaanesh",
    displayName: "Daemon of Slaanesh",
    aliases: ["daemons of slaanesh"],
    phases: [
      {
        subPhaseId: "declare-charges",
        yourTurnOnly: true,
        description:
          'Hatred (Daemons of Khorne). +1" maximum charge range and +1 to Charge/Pursuit roll result.+1" maximum charge range and +1 to Charge/Pursuit roll result.',
      },
      {
        subPhaseId: "pursuit",
        description: "+1 to Pursuit roll result.",
      },
    ],
  },
  {
    id: "daemon of tzeentch",
    displayName: "Daemon of Tzeentch",
    aliases: ["daemons of tzeentch"],
    description:
      "Hatred (Daemons of Nurgle). If a Wizard with this rule, gains +1 to Casting rolls.",
    phases: ["conjuration"],
  },
  {
    id: "infernal favour",
    displayName: "Infernal Favour",
    description:
      "Reduce the wounds suffered from Daemonic Instability by the number in brackets. Not cumulative: a unit uses the highest Infernal Favour value among its models.",
    phases: ["break-test"],
  },
  {
    id: "scintillating sorcery",
    displayName: "Scintillating Sorcery",
    description:
      "Knows one spell of its Daemonic Alignment (chosen before deployment), cast as a Bound spell with Power Level equal to the unit's current Rank Bonus.",
    phases: ["conjuration", "shoot"],
    yourTurnOnly: true,
  },
  {
    id: "attention seeker",
    displayName: "Attention Seeker",
    description:
      "Every model in the unit can issue and accept challenges as if it were a character.",
    phases: ["choose-fight"],
  },
  {
    id: "slime trail",
    displayName: "Slime Trail",
    description:
      "Enemy units cannot claim bonus combat result for being engaged in this unit's flank or rear.",
    phases: ["combat-result"],
  },
  {
    id: "soporific musk",
    displayName: "Soporific Musk",
    description:
      "Enemy models engaged with this model cannot use Strike First; enemies without Strike First are subject to Strike Last.",
    phases: ["choose-fight"],
  },
  {
    id: "brazen wheels",
    displayName: "Brazen Wheels",
    description: "Stomp Attacks have AP -3 (not against Behemoths).",
    phases: ["choose-fight"],
  },
];

export default RULES;
