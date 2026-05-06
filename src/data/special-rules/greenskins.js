export default [
  // ─── Greenskins ──────────────────────────────────────────────────────

  {
    id: "waaagh!",
    displayName: "Waaagh!",
    aliases: ["waaagh"],
    description:
      "Once per game during the Command sub-phase: take a Leadership test. If passed, this character, their mount, and any joined Orc unit may re-roll To Hit rolls of 1, and gains +1 to combat result, until next Start of Turn.",
    phases: ["command"],
    yourTurnOnly: true,
  },
];
