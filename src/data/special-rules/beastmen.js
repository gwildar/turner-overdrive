export default [
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
];
