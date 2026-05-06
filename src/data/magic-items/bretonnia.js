export default [
  // ─── Kingdom of Bretonnia ────────────────────────────────────────────
  {
    name: "Crusader's Lance",
    type: "weapon",
    points: 60,
    effect:
      "S+2, AP -2. Armour Bane (2), Furious Charge, Hatred (all enemies), Magical Attacks. Can only be used during a turn in which the wielder charged; otherwise must use hand weapon. Errantry Crusade only; cavalry or monster only.",
    phases: ["combat"],
  },
  {
    name: "Frontier Axe",
    type: "weapon",
    points: 30,
    effect:
      "S+2, AP -3. Magical Attacks, Multiple Wounds (2), Requires Two Hands. Bretonnian Exiles only.",
    phases: ["combat"],
    s: "S+2",
    ap: "-3",
  },
  {
    name: "Sword of the Stout Hearted",
    type: "weapon",
    points: 25,
    effect:
      "S+2, AP -1. Armour Bane (1), Immune to Psychology, Magical Attacks, Requires Two Hands.",
    phases: ["combat"],
  },
  {
    name: "Foebreaker",
    type: "weapon",
    points: 20,
    effect:
      "S+1. When a target suffers unsaved wounds, it must pass a Toughness test or suffer -1 to WS and Attacks (min 1) until end of next Combat phase.",
    phases: ["combat"],
  },
  {
    name: "The Dolorous Blade",
    type: "weapon",
    points: 0,
    effect:
      "Two profiles, chosen at start of each combat round. Rapid Strikes: S user, AP -1, Extra Attacks (+D6), Magical Attacks. Deadly Blows: S+2, AP -1, Armour Bane (1), Magical Attacks, Multiple Wounds (2).",
    phases: ["combat"],
    profiles: [
      {
        name: "Rapid Strikes",
        s: "S",
        ap: "-1",
        attacks: "+D6",
        rules: ["Magical Attacks"],
      },
      {
        name: "Deadly Blows",
        s: "S+2",
        ap: "-1",
        rules: ["Magical Attacks", "Armour Bane (1)", "Multiple Wounds (2)"],
      },
    ],
  },
  {
    name: "Sorrow's End",
    type: "weapon",
    points: 0,
    effect: "S+1, AP -1. Magical Attacks, Monster Slayer, Multiple Wounds (2).",
    phases: ["combat"],
  },
  {
    name: "Anointed Armour",
    type: "armour",
    points: 45,
    effect:
      "Heavy armour (5+). While the wearer maintains the Blessing of the Lady, they are immune to Killing Blow and Multiple Wounds (X). Grail Vow, infantry or cavalry only.",
    phases: ["combat", "shooting"],
    armourBase: 5,
  },
  {
    name: "Ironspike Shield",
    type: "armour",
    points: 20,
    effect:
      "Shield. Whenever an opponent rolls a natural 1 To Hit or To Wound against the wielder in combat, they suffer a S3, AP -1 hit. Bretonnian Exiles only.",
    phases: ["combat"],
  },
  {
    name: "Dragonhide Cloak",
    type: "talisman",
    points: 0,
    effect:
      "AP of any non-magical weapon attacking the bearer is reduced by 2. Immune to Killing Blow and Multiple Wounds (X). 3+ Ward save against Flaming Attacks.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Grail Pendant",
    type: "talisman",
    points: 40,
    effect:
      "Single use. When the wearer loses their final Wound, roll a D6; on a 2+, that Wound is not lost. Grail Vow only.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Lucky Heirloom",
    type: "talisman",
    points: 25,
    effect:
      "Once per round, the bearer can re-roll a single failed To Hit, To Wound, Armour Save, or Ward Save roll. Bretonnian Exiles only.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Heart of the Wilds",
    type: "arcane-item",
    points: 40,
    effect:
      "The bearer gains +1 to casting rolls while within natural terrain features (woods, difficult terrain, dangerous terrain).",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Diadem of Power",
    type: "arcane-item",
    points: 35,
    effect:
      "When the bearer attempts to cast a Magical Vortex, Magic Missile, or Assailment spell, they gain +1 to their Casting roll. Errantry Crusade only.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Flamestrike Wand",
    type: "arcane-item",
    points: 15,
    effect:
      "Single use. The bearer may cast Fireball from Battle Magic as a bound spell with Power Level 3. Bretonnian Exiles only.",
    phases: ["strategy", "shooting"],
    subPhases: ["conjuration"],
  },
  {
    name: "The Staff of the Elements",
    type: "arcane-item",
    points: 0,
    effect:
      "Lady Elisse may discard two randomly generated spells instead of one, then select two signature spells from Lore of Elementalism and/or Lore of the Lady.",
    phases: ["passive"],
  },
  {
    name: "The Seal of Parravon",
    type: "enchanted-item",
    points: 35,
    effect:
      "When the bearer makes a roll To Hit, a roll of 3+ is always a success, regardless of the target's WS.",
    phases: ["combat"],
  },
  {
    name: "Crusader's Clarion",
    type: "enchanted-item",
    points: 25,
    effect:
      "When the bearer charges, their mount and all mounts in their unit gain +1 Strength for that turn. Must be mounted on a Bretonnian Warhorse. Errantry Crusade only.",
    phases: ["combat"],
  },
  {
    name: "Wyrmbreath Vial",
    type: "enchanted-item",
    points: 20,
    effect:
      "Single use. Breath weapon with S4, AP -1. Flaming Attacks, Magical Attacks. Bretonnian Exiles only.",
    phases: ["shooting"],
  },
  {
    name: "Chalice of Brionne",
    type: "enchanted-item",
    points: 0,
    effect:
      "Within the bearer's Command range, enemy characters attempting to use special rules or magic items requiring a Leadership test suffer -2 to Ld (min 2).",
    phases: ["strategy", "combat"],
    opponentOnly: true,
  },
  {
    name: "Banner of the Lady's Grace",
    type: "banner",
    points: 75,
    effect:
      "The unit ignores all negative modifiers to its Leadership characteristic.",
    phases: ["passive"],
  },
  {
    name: "Crusader's Tapestry",
    type: "banner",
    points: 40,
    effect: "The unit gains the Frenzy special rule. Errantry Crusade only.",
    phases: ["combat"],
  },
  {
    name: "Banner of Honourable Warfare",
    type: "banner",
    points: 25,
    effect:
      "The unit must re-roll any failed To Hit rolls during the first round of combat when engaged with an enemy equipped with missile weapons.",
    phases: ["combat"],
  },
  {
    name: "Banner of the Zealous Knight",
    type: "banner",
    points: 25,
    effect: "The unit gains the Vanguard special rule. Bretonnian Exiles only.",
    phases: ["movement"],
  },
  {
    name: "Sword of the Quest",
    type: "weapon",
    points: 70,
    effect:
      "Two profiles, chosen at start of each combat round. Single-handed: S user, AP -1, Armour Bane (1), Magical Attacks. Double-handed: S+2, AP -2, Armour Bane (1), Magical Attacks, Requires Two Hands.",
    phases: ["combat"],
  },
  {
    name: "Sword of Heroes",
    type: "weapon",
    points: 60,
    effect:
      "S user, AP -1. Always Wounds on a 5+, regardless of target Toughness. Magical Attacks.",
    phases: ["combat"],
  },
  {
    name: "Heartwood Lance",
    type: "weapon",
    points: 50,
    effect:
      "S+2, AP -2. Armour Bane (1), Magical Attacks, Unbreakable (wielder only). Cavalry or monster only. Only usable during the turn a charge occurs; otherwise must use hand weapon.",
    phases: ["combat"],
  },
  {
    name: "Morning Star of Fracasse",
    type: "weapon",
    points: 40,
    effect:
      "S+1. Magical Attacks. If an enemy character suffers one or more unsaved wounds, any magic weapon they carry is destroyed.",
    phases: ["combat"],
  },
  {
    name: "Gilded Cuirass",
    type: "armour",
    points: 60,
    effect: "Heavy armour (5+). The wearer gains Regeneration (5+).",
    phases: ["combat", "shooting"],
    armourBase: 5,
    regen: "5+",
  },
  {
    name: "Gromril Great Helm",
    type: "armour",
    points: 40,
    effect:
      "+1 to armour value (max 2+). The wearer may re-roll natural 1s on armour save rolls.",
    phases: ["combat", "shooting"],
    armourMod: -1,
  },
  {
    name: "Mantle of the Damsel Elena",
    type: "talisman",
    points: 25,
    effect:
      "Immune to Poisoned Attacks. Any attacks with Poisoned Attacks targeting the bearer must roll To Wound normally instead.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Sirienne's Locket",
    type: "talisman",
    points: 25,
    effect: "Immune to Multiple Wounds. Infantry or cavalry only.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Valorous Standard",
    type: "banner",
    points: 60,
    effect: "When taking Break tests, roll 3D6 and discard the highest result.",
    phases: ["combat"],
  },
  {
    name: "Conqueror's Tapestry",
    type: "banner",
    points: 40,
    effect:
      "Enemy standards captured by the unit are worth 100 Victory Points each.",
    phases: ["passive"],
  },
  {
    name: "Errantry Banner",
    type: "banner",
    points: 30,
    effect:
      "The unit gains +1 Strength on a turn in which it charged. The unit also gains Impetuous.",
    phases: ["combat"],
    label: "+1S on charge",
  },
  {
    name: "Banner of Chalons",
    type: "banner",
    points: 20,
    effect:
      "Enemy units may not choose Stand & Shoot as a charge reaction against this unit.",
    phases: ["movement"],
  },
  {
    name: "Falcon-horn of Fredemund",
    type: "enchanted-item",
    points: 40,
    effect:
      'Single use. In the Command sub-phase, take a Ld test. If passed, select one enemy unit within 24" — it suffers -1 to Movement, WS, BS, and Initiative until the start of your next turn.',
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Antlers of the Great Hunt",
    type: "enchanted-item",
    points: 25,
    effect:
      "The bearer's unit gains Move Through Cover. Must be mounted on a Bretonnian Warhorse.",
    phases: ["movement"],
  },
  {
    name: "Gauntlet of the Duel",
    type: "enchanted-item",
    points: 5,
    effect: "Challenges issued by the bearer cannot be refused.",
    phases: ["combat"],
    extremely: true,
  },
  {
    name: "Silver Mirror",
    type: "arcane-item",
    points: 35,
    effect:
      "Single use. When making a Wizardly dispel attempt, roll an extra D6 and discard the lowest. If a double 1 is rolled, the dispel attempt fails regardless.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Sacrament of the Lady",
    type: "arcane-item",
    points: 30,
    effect: "Single use. Add +2 to a single Casting roll.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
    extremely: true,
  },
  {
    name: "Prayer Icon of Quenelles",
    type: "arcane-item",
    points: 25,
    effect:
      '+3" to Dispel range. +1 to Dispel rolls when attempting to dispel Hex spells.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },

  // Knightly Virtues
  {
    name: "Virtue of Knightly Temper",
    type: "virtue",
    points: 70,
    effect:
      "During a turn in which it charged, gains Extra Attacks (+D3) and Hatred (all enemies).",
    phases: ["combat"],
    subPhases: ["choose-fight"],
    attacks: "+D3",
  },
  {
    name: "Virtue of Heroism",
    type: "virtue",
    points: 60,
    effect:
      "Unless using a magic weapon, gains Killing Blow and Monster Slayer.",
    phases: ["combat"],
    subPhases: ["choose-fight"],
  },
  {
    name: "Virtue of Stoicism",
    type: "virtue",
    points: 55,
    effect: "Model and its unit may re-roll the 2D6 when making a Break test.",
    phases: ["combat"],
    subPhases: ["break-test"],
  },
  {
    name: "Virtue of the Penitent",
    type: "virtue",
    points: 50,
    effect:
      "Duke, Baron or Paladin only. Gains Unbreakable but cannot join friendly units.",
    phases: ["combat"],
  },
  {
    name: "Virtue of the Ideal",
    type: "virtue",
    points: 45,
    effect:
      "Duke, Baron or Paladin only. +1 WS, +1 I, +1 A, +1 Ld. Cannot be General or join units.",
    phases: ["combat"],
  },
  {
    name: "Virtue of the Impetuous Knight",
    type: "virtue",
    points: 40,
    effect:
      'Gains Impetuous. Increases maximum charge range by 3" and may apply +D3 modifier to Charge roll.',
    phases: ["movement"],
    chargeMod: { range: 3, tag: "Virtue", color: "orange", order: 5 },
  },
  {
    name: "Virtue of Audacity",
    type: "virtue",
    points: 35,
    effect:
      "May re-roll any failed rolls To Hit against an enemy model with a higher WS.",
    phases: ["combat"],
  },
  {
    name: "Virtue of Purity",
    type: "virtue",
    points: 30,
    effect:
      "Always benefits from Blessings of the Lady. Always has a 5+ Ward save.",
    phases: ["combat", "shooting"],
    ward: "5+",
  },
  {
    name: "Virtue of Duty",
    type: "virtue",
    points: 25,
    effect:
      "Duke, Baron or Paladin only. +1 combat result bonus while the General is alive.",
    phases: ["combat"],
    subPhases: ["combat-result"],
  },
  {
    name: "Virtue of the Joust",
    type: "virtue",
    points: 20,
    effect: "May re-roll any failed rolls To Wound when using a lance.",
    phases: ["combat"],
  },
  {
    name: "Virtue of Confidence",
    type: "virtue",
    points: 15,
    effect:
      "Must always issue and accept challenges. May re-roll failed To Hit rolls during challenges.",
    phases: ["combat"],
  },
  {
    name: "Virtue of Noble Disdain",
    type: "virtue",
    points: 10,
    effect:
      "May re-roll any failed rolls To Hit during the first round of combat vs enemies with missile weapons.",
    phases: ["combat"],
  },
  {
    name: "Virtue of Discipline",
    type: "virtue",
    points: 5,
    effect:
      'Model and its unit can march within 8" of an enemy without a Leadership test.',
    phases: ["movement"],
  },
  {
    name: "Virtue of Empathy",
    type: "virtue",
    points: 5,
    effect:
      "Duke, Baron or Paladin only. Can join units with the Peasantry special rule.",
    phases: ["movement"],
  },
];
