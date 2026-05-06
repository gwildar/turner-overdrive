export default [
  // ─── Dwarfs ───────────────────────────────────────────────────────────

  {
    id: "ancestral grudge",
    displayName: "Ancestral Grudge",
    description:
      "Hatred (enemy characters). If joined to Longbeards or Hammerers, that unit also gains this rule.",
    phases: ["choose-fight"],
  },
  {
    id: "ancestral fury",
    displayName: "Ancestral Fury",
    description:
      'During a turn in which the unit charged 3" or more, or made a follow-up move, gains +1 Strength.',
    phases: ["choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "gromril armour",
    displayName: "Gromril Armour",
    description: "Re-roll natural 1s on Armour Save rolls.",
    phases: ["shoot", "choose-fight"],
    opponentOnly: false,
  },
  {
    id: "gromril weapons",
    displayName: "Gromril Weapons",
    description:
      "Hand weapon has AP -1. Does not apply with two hand weapons, other weapon types, or runed weapons.",
    phases: ["choose-fight"],
  },
  {
    id: "deathblow",
    displayName: "Deathblow",
    description:
      "When reduced to zero Wounds by an enemy attack during Combat, the unit that killed it suffers a S3 AP -1 hit (or the attacking model if in a challenge).",
    phases: ["choose-fight"],
    opponentOnly: true,
  },
  {
    id: "resolute",
    displayName: "Resolute",
    description: "-1 to Flee rolls and Pursuit rolls (minimum 1).",
    phases: ["pursuit", "break-test"],
  },
];
