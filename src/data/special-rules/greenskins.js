/** @type {import("../../types").SpecialRule[]} */
const RULES = [
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
  {
    id: "da boyz",
    displayName: "Da Boyz",
    description:
      "Army building: one Black Orc War Boss or Big Boss for each Black Orc Mob, and vice versa.",
    passive: true,
    phases: [],
  },
  {
    id: "quell impetuosity",
    displayName: "Quell Impetuosity",
    description:
      'A friendly Impetuous unit within 6" may re-roll a failed Leadership test when testing whether it must declare a charge.',
    phases: ["declare-charges"],
    yourTurnOnly: true,
  },
  {
    id: "tusker charge",
    displayName: "Tusker Charge",
    description:
      "In a turn it charged, a War Boar's tusks are S+1, AP -1. Not the rider, chariot or crew.",
    phases: ["choose-fight"],
  },
  {
    id: "mob rule",
    displayName: "Mob Rule",
    description:
      "While joined to a unit of Orcs or Black Orcs with US 10+, +1 to Casting rolls.",
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "squigs go wild",
    displayName: "Squigs Go Wild",
    description:
      'If the Squig Herd Breaks and flees with 5+ Cave Squigs, every unit (friend or foe) within 2D6" suffers D3 S5 AP -1 hits (+1 to the D3 per extra five Squigs). Then the herd is removed as destroyed.',
    phases: ["break-test"],
  },
  {
    id: "ker-splat",
    displayName: "Ker-splat",
    description: "Treats all difficult terrain as dangerous terrain.",
    phases: ["compulsory-moves", "remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "spiked ball & chains",
    displayName: "Spiked Ball & Chains",
    aliases: ["spiked ball and chains"],
    description: "Impact Hits caused by this model have AP -3.",
    phases: ["compulsory-moves", "choose-fight"],
  },
];

export default RULES;
