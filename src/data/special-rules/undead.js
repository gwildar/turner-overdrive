export default [
  // ─── Undead ──────────────────────────────────────────────────────────

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
];
