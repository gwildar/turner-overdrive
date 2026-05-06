export default [
  // ─── Daemons of Chaos ────────────────────────────────────────────────

  {
    id: "daemonic",
    displayName: "Daemonic",
    description:
      "5+ Ward save against wounds caused by non-magical attacks. Also grants: Daemonic Instability, Fear, Immune to Psychology, Magical Attacks, Unbreakable, Warp-spawned. Characters cannot join units without this rule.",
    phases: ["choose-fight", "shoot"],
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
    description:
      "Hatred (Daemons of Slaanesh). During a turn in which it charged, gains +1 Strength (not its mount).",
    phases: ["choose-fight"],
  },
  {
    id: "daemon of nurgle",
    displayName: "Daemon of Nurgle",
    description:
      "Hatred (Daemons of Tzeentch). Enemy models directing attacks against this model must re-roll To Hit rolls of a natural 6.",
    phases: ["choose-fight"],
    opponentOnly: true,
  },
  {
    id: "daemon of slaanesh",
    displayName: "Daemon of Slaanesh",
    phases: [
      {
        subPhaseId: "declare-charges",
        yourTurnOnly: true,
        description:
          'Hatred (Daemons of Khorne). +1" maximum charge range and +1 to Charge/Pursuit roll result.',
      },
      {
        subPhaseId: "charge-moves",
        yourTurnOnly: true,
        description:
          '+1" maximum charge range and +1 to Charge/Pursuit roll result.',
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
    description:
      "Hatred (Daemons of Nurgle). If a Wizard with this rule, gains +1 to Casting rolls.",
    phases: ["conjuration"],
  },
];
