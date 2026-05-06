export default [
  // ─── Marks of Chaos ──────────────────────────────────────────────────

  {
    id: "mark of chaos undivided",
    displayName: "Mark of Chaos Undivided",
    passive: true,
    description: "Re-roll any failed Fear, Panic, or Terror tests.",
    phases: [],
  },
  {
    id: "mark of khorne",
    displayName: "Mark of Khorne",
    passive: true,
    description: "Grants the Frenzy special rule.",
    phases: [],
  },
  {
    id: "mark of nurgle",
    displayName: "Mark of Nurgle",
    description:
      "Enemy models directing attacks against this model must re-roll To Hit rolls of a natural 6.",
    phases: ["choose-fight"],
    opponentOnly: true,
  },
  {
    id: "mark of slaanesh",
    displayName: "Mark of Slaanesh",
    phases: [
      {
        subPhaseId: "choose-fight",
        description:
          "+1 Initiative during the first round of any combat. If the majority have this mark, the unit automatically passes any Panic tests.",
      },
    ],
  },
  {
    id: "mark of tzeentch",
    displayName: "Mark of Tzeentch",
    description:
      "Grants Flaming Attacks and Magic Resistance (-1). If a Wizard with this mark has joined an same-mark unit with Unit Strength 10+, gains +1 to Casting rolls.",
    phases: ["conjuration"],
  },
  {
    id: "forsaken by khorne",
    displayName: "Forsaken by Khorne",
    passive: true,
    description: "Grants the Hatred (all enemies) special rule.",
    phases: [],
  },
  {
    id: "forsaken by nurgle",
    displayName: "Forsaken by Nurgle",
    passive: true,
    description: "Grants the Fear special rule.",
    phases: [],
  },
  {
    id: "forsaken by slaanesh",
    displayName: "Forsaken by Slaanesh",
    passive: true,
    description: "Grants the Swiftstride special rule.",
    phases: [],
  },
  {
    id: "forsaken by tzeentch",
    displayName: "Forsaken by Tzeentch",
    passive: true,
    description: "Grants the Magic Resistance (-3) special rule.",
    phases: [],
  },
];
