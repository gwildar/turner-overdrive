export default [
  // ─── High Elves ─────────────────────────────────────────────────────
  {
    name: "Woodsman's Axe",
    type: "weapon",
    points: 90,
    effect:
      "S+3, AP -4. Magical Attacks, Monster Slayer, Requires Two Hands, Strike Last. Chracian Warhost only.",
    phases: ["combat"],
  },
  {
    name: "The White Sword",
    type: "weapon",
    points: 70,
    effect:
      "S+3, AP -2. Magical Attacks, Monster Slayer, Requires Two Hands, Strike Last. Infantry or chariot only.",
    phases: ["combat"],
  },
  {
    name: "The Blade of Leaping Gold",
    type: "weapon",
    points: 50,
    effect: "Armour Bane (2), Extra Attacks (+D3), Magical Attacks.",
    phases: ["combat"],
  },
  {
    name: "Bow of the Seafarer",
    type: "weapon",
    points: 50,
    effect:
      'Bow of Avelorn. Range 30", S5, AP -3. Cumbersome, Magical Attacks, Multiple Wounds (D3), Through & Through. Sea Guard Garrison only.',
    phases: ["shooting"],
  },
  {
    name: "Star Lance",
    type: "weapon",
    points: 45,
    effect:
      "S+3, AP -4. Magical Attacks, Strike First. Cavalry or monster only. Only usable during a turn the wielder charged; otherwise must use hand weapon.",
    phases: ["combat"],
  },
  {
    name: "Reaver Bow",
    type: "weapon",
    points: 40,
    effect:
      'Bow of Avelorn. Range 30", S+1. Magical Attacks. May make shooting attacks equal to Attacks characteristic. No modifiers for multiple shots.',
    phases: ["shooting"],
  },
  {
    name: "Blade of Sea Gold",
    type: "weapon",
    points: 40,
    effect:
      "S+1, AP -1. Magical Attacks, Multiple Wounds (D3). Sea Guard Garrison only.",
    phases: ["combat"],
  },
  {
    name: "Foe Bane",
    type: "weapon",
    points: 20,
    effect:
      "Magical Attacks. When rolling To Wound, a roll of 4+ is always a success regardless of the target's Toughness.",
    phases: ["combat"],
  },
  {
    name: "Chayal",
    type: "weapon",
    points: 0,
    effect:
      "Killing Blow, Requires Two Hands. May re-roll any To Hit rolls of natural 1.",
    phases: ["combat"],
    s: "S+2",
    ap: "-3",
  },
  {
    name: "Mathlann's Ire",
    type: "weapon",
    points: 0,
    effect:
      "S+1, AP -2. Armour Bane (1), Magical Attacks. Enemy models must re-roll a single successful To Hit roll against the wielder in Combat.",
    phases: ["combat"],
  },
  {
    name: "Armour of Stars",
    type: "armour",
    points: 40,
    effect:
      "Infantry or cavalry only. Heavy armour (5+). Immune to Killing Blow; may make normal armour and Regeneration saves, losing only a single Wound if unsaved.",
    phases: ["combat"],
    armourBase: 5,
  },
  {
    name: "Armour of Caledor",
    type: "armour",
    points: 35,
    effect: "Full plate armour (4+). 5+ Ward save.",
    phases: ["combat", "shooting"],
    ward: "5+",
    armourBase: 4,
  },
  {
    name: "The Golden Shield",
    type: "armour",
    points: 30,
    effect:
      "Shield. Enemy models attacking the bearer in Combat must re-roll any To Hit rolls of natural 6.",
    phases: ["combat"],
  },
  {
    name: "Dragon Helm",
    type: "armour",
    points: 10,
    effect:
      "May be worn with other armour. +1 armour value (max 2+). 6+ Ward save against Flaming Attacks.",
    phases: ["combat", "shooting"],
    armourMod: -1,
  },
  {
    name: "Circlet of Atrazar",
    type: "talisman",
    points: 55,
    effect: "+1 Wound. If infantry or cavalry, also +1 Toughness.",
    phases: ["passive"],
  },
  {
    name: "Sacred Incense",
    type: "talisman",
    points: 35,
    effect:
      "Enemy models targeting this character or their unit during the Shooting phase suffer -1 To Hit.",
    phases: ["shooting"],
  },
  {
    name: "The Loremaster's Cloak",
    type: "talisman",
    points: 25,
    effect:
      "The bearer and their unit has a 4+ Ward save against wounds caused by a Magic Missile.",
    phases: ["passive"],
  },
  {
    name: "Opal Amulet",
    type: "talisman",
    points: 20,
    effect:
      "Single use. Gives the bearer a 2+ Ward save against a single wound.",
    phases: ["combat", "shooting"],
  },
  {
    name: "The Vortex Shard",
    type: "arcane-item",
    points: 50,
    effect:
      "Single use. Automatically dispels a spell with no roll required. All Remains in Play spells are also dispelled, including friendly ones.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Sigil of Asuryan",
    type: "arcane-item",
    points: 40,
    effect:
      "Single use. May be used instead of a dispel attempt to automatically dispel a spell. Cannot dispel a perfect invocation.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "The Trickster's Pendant",
    type: "arcane-item",
    points: 40,
    effect:
      "Single use. When attempting a Wizardly dispel, roll an extra D6 and discard the lowest. If successfully dispelled, the opposing caster cannot cast more spells that turn. Double 1s on any two dice causes a Miscast.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Annulian Crystal",
    type: "arcane-item",
    points: 30,
    effect:
      "Once per turn, after successfully casting a spell, the bearer may forget that spell and immediately generate another (not signature spells).",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Silvery Wand",
    type: "arcane-item",
    points: 15,
    effect:
      "The bearer knows one additional spell beyond their Level of Wizardry. Does not increase the Wizard's Level.",
    phases: ["passive"],
  },
  {
    name: "Staff of Solidity",
    type: "arcane-item",
    points: 15,
    effect:
      "Single use. When the bearer would roll on the Miscast table, they may choose not to.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Null Stone",
    type: "enchanted-item",
    points: 75,
    effect:
      "All Wizards within Command range suffer -1 to Casting and Dispel rolls. During the Command sub-phase, if not engaged, make a Leadership test. If passed, the bearer cannot be targeted by spells until next Start of Turn.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Amulet of the Tempest",
    type: "enchanted-item",
    points: 50,
    effect:
      'Sea Guard Garrison only. Enemy Wizards within 9" lose their ability to add Wizardry level to casting rolls.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Loremaster",
    type: "enchanted-item",
    points: 35,
    effect:
      "Ithilmar Discipline. Cannot be mounted. Becomes a Level 1 Wizard with one spell from Battle Magic, Elementalism, High Magic, or Illusion. Gains Ithilmar Armour, Lileath's Blessing (re-roll one failed Casting roll per turn), and Lore of Saphery.",
    phases: ["passive"],
  },
  {
    name: "The Cloak of Beards",
    type: "enchanted-item",
    points: 30,
    effect:
      "The wearer causes Terror. Other models cannot use the wearer's Leadership.",
    phases: ["passive"],
  },
  {
    name: "Ring of Fury",
    type: "enchanted-item",
    points: 25,
    effect:
      "May cast Hammerhand (Battle Magic) as a Bound Spell with Power Level 1. 2D3 S4, AP -2 hits on a single enemy unit in combat with the caster.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Shadow Stalker",
    type: "enchanted-item",
    points: 20,
    effect:
      "Ithilmar Discipline. Cannot be mounted. May equip a Bow of Avelorn for free. Gains Ambushers, Evasive, Fire & Flee, Move Through Cover, and Scouts.",
    phases: ["passive"],
  },
  {
    name: "Seed of Rebirth",
    type: "enchanted-item",
    points: 20,
    effect: "The bearer gains Regeneration (5+).",
    phases: ["combat", "shooting"],
    regen: "5+",
  },
  {
    name: "Blood of Caledor",
    type: "enchanted-item",
    points: 15,
    effect:
      "Ithilmar Discipline. Must be mounted on Barded Elven Steed, Sun/Moon/Star Dragon. +1 WS. May equip full plate armour for free. Gains Dragon Armour and Impetuous.",
    phases: ["passive"],
  },
  {
    name: "Anointed of Asuryan",
    type: "enchanted-item",
    points: 15,
    effect:
      "Ithilmar Discipline. Must mount on Flamespyre or Frostheart Phoenix. May equip ceremonial halberd for free. Gains Blessings of Asuryan (5+ Ward vs Flaming), Fear, and Witness to Destiny (6+ Ward vs non-magical).",
    phases: ["passive"],
  },
  {
    name: "Gem of Courage",
    type: "enchanted-item",
    points: 15,
    effect:
      "Single use. Chracian Warhost only. When making a Break test, roll an extra D6 and discard the highest.",
    phases: ["combat"],
  },
  {
    name: "Chracian Hunter",
    type: "enchanted-item",
    points: 10,
    effect:
      "Ithilmar Discipline. Must mount on White Lion Chariot. May equip Chracian great blade for free. Gains Lion Cloak, Move Through Cover, and Stubborn.",
    phases: ["passive"],
  },
  {
    name: "Warden of Saphery",
    type: "enchanted-item",
    points: 10,
    effect:
      "Ithilmar Discipline. Cannot be mounted. May equip Sword of Hoeth for free. Gains Deflect Shots (6+ Ward vs non-magical shooting), Ithilmar Armour, and Killing Blow.",
    phases: ["passive"],
  },
  {
    name: "The Pelt of Charandis",
    type: "enchanted-item",
    points: 0,
    effect:
      "+1 armour in melee, +2 armour (max 2+) vs non-magical ranged attacks. Regeneration (5+).",
    phases: ["combat", "shooting"],
    regen: "5+",
    armourMod: -1,
  },
  {
    name: "Pure of Heart",
    type: "enchanted-item",
    points: 0,
    effect:
      "Unless fleeing, all friendly units within Command range may use this character's Leadership. The character and their unit automatically passes Panic tests.",
    phases: ["passive"],
  },
  {
    name: "Sea Guard",
    type: "enchanted-item",
    points: 0,
    effect:
      "Ithilmar Discipline. Must mount on Lothern Skycutter. May equip warbow for free. Gains Naval Discipline (Sea Guard may Stand & Shoot regardless of proximity) and Rallying Cry (nominate fleeing unit in Command range to attempt Rally in Command sub-phase).",
    phases: ["strategy", "shooting"],
    subPhases: ["command"],
  },
  {
    name: "Banner of Resilience",
    type: "banner",
    points: 80,
    effect: "The unit gains +1 Toughness.",
    phases: ["passive"],
  },
  {
    name: "Banner of Arcane Protection",
    type: "banner",
    mr: -3,
    points: 70,
    effect:
      'The unit gains Magic Resistance (-3). All friendly units within 6" gain Magic Resistance (-1).',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Battle Banner",
    type: "banner",
    points: 60,
    effect:
      "When calculating combat result, the unit may claim an additional +D3 combat result points.",
    phases: ["combat"],
  },
  {
    name: "The Banner of Lothern",
    type: "banner",
    points: 55,
    effect:
      "When equipped on a unit with thrusting spears, half the models in the third rank (rounded up) may make supporting attacks.",
    phases: ["combat"],
  },
  {
    name: "Lion Standard",
    type: "banner",
    points: 25,
    effect: "The unit automatically passes any Fear or Terror tests.",
    phases: ["passive"],
  },
  {
    name: "Banner of Balance",
    type: "banner",
    points: 25,
    effect:
      "Enemy units in base contact cannot re-roll any To Hit or To Wound rolls. However, neither can the unit carrying this banner.",
    phases: ["combat"],
  },
  {
    name: "Banner of Confidence",
    type: "banner",
    points: 20,
    effect:
      "The unit does not suffer -1 To Hit when making a Stand & Shoot charge reaction.",
    phases: ["shooting"],
  },
  {
    name: "Banner of Ellyrion",
    type: "banner",
    points: 20,
    effect: "The unit gains Move Through Cover.",
    phases: ["passive"],
  },
];
