/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  {
    id: "blood frenzy",
    displayName: "Blood Frenzy",
    description:
      "When this model inflicts an unsaved wound, it becomes Frenzied (not its rider). May gain Frenzy this way even if lost previously.",
    phases: ["choose-fight"],
  },
  {
    id: "cold blooded",
    displayName: "Cold Blooded",
    passive: true,
    description:
      "When making a Fear, Panic, or Terror test, roll an extra D6 and discard the highest result.",
    phases: ["command", "rally", "choose-fight", "break-test"],
  },
  {
    id: "aquatic",
    displayName: "Aquatic",
    passive: true,
    description:
      "No movement penalty in water terrain features (streams, rivers, lakes, swamps designated as water features).",
    phases: ["remaining-moves"],
  },
  {
    id: "obsidian blades",
    displayName: "Obsidian Blades",
    description:
      "A single non-magical hand weapon has AP -1. Not with two hand weapons or other weapons; not the mount.",
    phases: ["choose-fight"],
  },
  {
    id: "arcane vassal",
    displayName: "Arcane Vassal",
    description:
      'Once per turn (not fleeing or in combat), a friendly Slann within 12" may channel a spell through this model: range, targeting, line of sight and effects measured from this model. Not Self spells.',
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "beast handlers",
    displayName: "Beast Handlers",
    description:
      "Enemy shooting at the Pack: roll D6 per hit — 1-4 hits a Salamander/Razordon, 5+ a Skink Handler. In combat, enemies must attack models in base contact (or the closest in the fighting rank).",
    phases: ["shoot", "choose-fight"],
    opponentOnly: true,
  },
  {
    id: "arcane shield",
    displayName: "Arcane Shield",
    description: "5+ Ward save against any wounds suffered.",
    passive: true,
    phases: [],
    ward: "5+",
  },
  {
    id: "guardians",
    displayName: "Guardians",
    description:
      "If a friendly Slann within 3\" suffers a hit in the Shooting phase, roll D6: on 2+ you may transfer the hit to this unit. Within a Slann's Command range, every model can issue and accept challenges as if a character.",
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "skirmish screen",
    displayName: "Skirmish Screen",
    description:
      'Can see and move through friendly Skink Skirmisher units in Skirmish formation (nudge Skinks aside). Skinks within 1" may count it as part of their unit for coherency.',
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "drop rocks",
    displayName: "Drop Rocks",
    description:
      "Once per game, fly over one enemy unit not in combat: after moving, it suffers D3 S4 hits per model that moved over it.",
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "toad rage",
    displayName: "Toad Rage",
    description:
      "Before the game (after Scouts), place one blot toad marker per Ripperdactyl Riders unit on an enemy unit. Against a marked unit, Ripperdactyls (not riders) gain Extra Attacks (+1) and re-roll To Hit rolls of a natural 1.",
    phases: ["deployment", "choose-fight"],
  },
  {
    id: "impervious defence",
    displayName: "Impervious Defence",
    description:
      "Enemy units cannot claim bonus combat result for being engaged with this model's flank or rear.",
    phases: ["combat-result"],
  },
  {
    id: "primeval roar",
    displayName: "Primeval Roar",
    description:
      'Once per game, take a Leadership test (own Leadership): if passed, friendly Lizardmen units within 7" gain Furious Charge until the end of the turn.',
    phases: ["command"],
    yourTurnOnly: true,
  },
];

export default RULES;
