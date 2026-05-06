export default [
  // ─── Dark Elves ──────────────────────────────────────────────────────
  {
    name: "Executioner's Axe",
    type: "weapon",
    points: 70,
    effect:
      "Killing Blow, Magical Attacks, Strike Last. AP -2. When making a roll To Wound, a roll of 2+ is always a success, regardless of the target's Toughness.",
    phases: ["combat"],
  },
  {
    name: "Sword of Ruin",
    type: "weapon",
    points: 65,
    effect:
      "Magical Attacks. No armour, Ward or Regeneration saves are permitted against wounds caused by the Sword of Ruin.",
    phases: ["combat"],
  },
  {
    name: "Lifetaker",
    type: "weapon",
    points: 35,
    effect:
      'Range 24", S3, AP -1. Armour Bane (1), Magical Attacks, Multiple Shots (D3+1), Poisoned Attacks.',
    phases: ["shooting"],
  },
  {
    name: "Whip of Agony",
    type: "weapon",
    points: 30,
    effect:
      "S+1, AP -1. Magical Attacks, Strike First. High Beastmasters only. Any enemy model that suffers one or more unsaved wounds suffers a -1 modifier to its Toughness (min 1) for the remainder of the game.",
    phases: ["combat"],
  },
  {
    name: "Shield of Ghrond",
    type: "armour",
    points: 40,
    effect:
      "Shield. All attacks directed against the bearer suffer a -1 modifier to their Strength (min 1).",
    phases: ["combat", "shooting"],
  },
  {
    name: "Blood Armour",
    type: "armour",
    points: 30,
    effect:
      "Infantry or cavalry only. Armour value of 5+. For each unsaved wound the wearer inflicts, this armour value is improved by 1, to a maximum of 2+.",
    armourBase: 5,
    phases: ["combat"],
  },
  {
    name: "Pendant of Khaeleth",
    type: "talisman",
    points: 40,
    effect: "5+ Ward vs S4 or lower, 4+ Ward vs S5 or higher.",
    phases: ["combat", "shooting"],
    ward: "5+ (4+ vs S5+)",
  },
  {
    name: "Pearl of Infinite Bleakness",
    type: "talisman",
    points: 15,
    effect:
      "The bearer and any unit they join gain the Immune to Psychology special rule.",
    phases: ["passive"],
  },
  {
    name: "Black Staff",
    type: "arcane-item",
    points: 55,
    effect:
      "When the bearer casts a spell, roll an extra D6 on the Casting roll and discard the lowest. If a double 1 is rolled on any two dice, the spell is miscast.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Tome of Furion",
    type: "arcane-item",
    points: 15,
    effect:
      "The bearer knows one more spell (chosen in the usual way) than is normal for their Level of Wizardry.",
    phases: ["passive"],
  },
  {
    name: "Focus Familiar",
    type: "arcane-item",
    points: 10,
    effect:
      'Single use. When casting a spell, place a marker within 12". The range and effects of the spell are measured from this marker rather than the caster.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
    yourTurnOnly: true,
  },
  {
    name: "Black Dragon Egg",
    type: "enchanted-item",
    points: 35,
    effect:
      "Single use. During the Command sub-phase, the bearer may consume it. Until end of turn, the model has T6 (cannot be further improved) and gains noxious breath (-1 WS, no armour saves permitted).",
    phases: ["strategy", "combat"],
    subPhases: ["command"],
  },
  {
    name: "Hydra's Tooth",
    type: "enchanted-item",
    points: 30,
    effect:
      'Missile weapon. Range 9", S user, AP -3. Magical Attacks, Move & Shoot, Quick Shot. Can target a specific model within the target unit.',
    phases: ["shooting"],
  },
  {
    name: "The Guiding Eye",
    type: "enchanted-item",
    points: 25,
    effect:
      "Single use. The bearer and any unit they have joined may re-roll any failed rolls To Hit made during the Shooting phase.",
    phases: ["shooting"],
  },
  {
    name: "Banner of Nagarythe",
    type: "banner",
    points: 65,
    effect:
      "The unit gains the Stubborn special rule. When calculating combat result, the unit may claim an additional +1 combat result point.",
    phases: ["combat"],
    combatResBonus: 1,
  },
  {
    name: "Standard of Slaughter",
    type: "banner",
    points: 40,
    effect:
      "When the unit carrying this standard charges into combat, it gains an additional +D3 bonus to its combat result during that turn.",
    phases: ["combat"],
  },
  {
    name: "Banner of Har Ganeth",
    type: "banner",
    points: 25,
    effect:
      "The unit improves the Armour Piercing characteristic of its combat weapons by 1.",
    phases: ["combat"],
    apMod: -1,
  },
  {
    name: "Cold-Blooded Banner",
    type: "banner",
    points: 20,
    effect:
      "Single use. When the unit makes any Leadership test, including Break tests, it may roll an additional D6 and discard the highest result.",
    phases: ["combat"],
  },
];
