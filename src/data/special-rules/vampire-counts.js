export default [
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
];
