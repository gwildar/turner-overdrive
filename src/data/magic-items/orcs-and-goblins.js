export default [
  // ─── Orcs & Goblins ─────────────────────────────────────────────────
  {
    name: "Battleaxe of the Last Big Waaagh!",
    type: "weapon",
    points: 75,
    effect:
      "S+2, AP -2. Extra Attacks (+D6), Magical Attacks, Requires Two Hands, Strike Last. If a natural 6 is rolled for Extra Attacks, the weapon loses Extra Attacks at end of the current Combat phase.",
    phases: ["combat"],
  },
  {
    name: "Bigger, Choppier Axe",
    type: "weapon",
    points: 55,
    effect:
      "S+2, AP -2. Killing Blow, Magical Attacks, Requires Two Hands, Strike Last.",
    phases: ["combat"],
  },
  {
    name: "Martog's Best Basha",
    type: "weapon",
    points: 50,
    effect:
      "S+1, AP -2. Magical Attacks, Requires Two Hands. The wielder gains +1 WS and +1 Initiative.",
    phases: ["combat"],
  },
  {
    name: "Porko's Pigstikka",
    type: "weapon",
    points: 40,
    effect:
      "Cavalry, Monster, or Chariot only. S+1, AP -1. Armour Bane (1), Magical Attacks. S and AP modifiers apply only during a turn the wielder charged. Grants +1 Attack per rank the enemy unit possesses.",
    phases: ["combat"],
  },
  {
    name: "Da Choppiest Choppa",
    type: "weapon",
    points: 35,
    effect: "S+1, AP -3. Magical Attacks.",
    phases: ["combat"],
  },
  {
    name: "Dagger of Malice",
    type: "weapon",
    points: 35,
    effect:
      "Frenzy, Hatred (all enemies), Magical Attacks. The wielder cannot lose Frenzy.",
    phases: ["combat"],
  },
  {
    name: "Da Akrit Axe",
    type: "weapon",
    points: 30,
    effect:
      "S+1. Armour Bane (1), Magical Attacks. May re-roll failed To Hit rolls.",
    phases: ["combat"],
  },
  {
    name: "Backstabber's Blade",
    type: "weapon",
    points: 25,
    extremely: true,
    effect:
      "Goblin and Night Goblin Bosses only. S+1, AP -1. Magical Attacks. May re-roll failed To Wound if engaged with enemy flank; re-roll failed To Hit and To Wound if engaged with rear.",
    phases: ["combat"],
  },
  {
    name: "Wollopa's One Hit Wunda",
    type: "weapon",
    points: 15,
    effect:
      "Goblin and Night Goblin Bosses only. Single use. First round of combat: S10, AP -3, Magical Attacks, Strike First. Otherwise counts as a hand weapon with Magical Attacks.",
    phases: ["combat"],
  },
  {
    name: "Bog-wood Staff",
    type: "weapon",
    points: 0,
    effect:
      "Ogdruz Swampdigga only. S+2, AP -1. Magical Attacks, Requires Two Hands. For each unsaved Wound inflicted, Ogdruz may recover a lost Wound.",
    phases: ["combat"],
  },
  {
    name: "Da Skull Smasha",
    type: "weapon",
    points: 0,
    effect:
      "Kiknik only. Choose profile when combat is chosen. Hammer: S+2, AP -1, Armour Bane (2), Magical Attacks. Pick: S, AP -2, Armour Bane (2), Magical Attacks, Multiple Wounds (2).",
    phases: ["combat"],
  },
  {
    name: "Trollhide Trousers",
    type: "armour",
    points: 40,
    extremely: true,
    effect:
      "May be worn with other armour. +1 armour value (max 2+). The wearer gains Regeneration (5+).",
    phases: ["combat", "shooting"],
    armourMod: -1,
    regen: "5+",
  },
  {
    name: "Dead 'Ard Armour",
    type: "armour",
    points: 35,
    effect:
      "Black Orc and Orc Bosses only (infantry, cavalry, or chariot). Full plate armour. +1 Toughness.",
    phases: ["combat", "shooting"],
    armourBase: 4,
  },
  {
    name: "Armour of Mork",
    type: "armour",
    mr: -2,
    points: 30,
    effect: "Heavy armour (5+). The wearer gains Magic Resistance (-2).",
    phases: ["combat", "shooting"],
    armourBase: 5,
  },
  {
    name: "Spiteful Shield",
    type: "armour",
    points: 20,
    effect:
      "Shield. Whenever an enemy rolls a natural 1 To Hit or To Wound against the wielder in combat, that model suffers a S4 hit.",
    phases: ["combat"],
  },
  {
    name: "Necklace of Blessed Teef",
    type: "enchanted-item",
    points: 50,
    effect:
      "The bearer may re-roll any Armour Save, Ward Save, or Regeneration Save roll of a natural 1.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Sparkly Wizard Finda",
    type: "talisman",
    mr: -2,
    points: 45,
    effect:
      "The bearer gains Magic Resistance (-2) and Hatred (enemy Wizards).",
    phases: ["combat", "shooting"],
  },
  {
    name: "Effigy of Mork",
    type: "talisman",
    points: 35,
    effect:
      "Any model directing attacks against the bearer in Combat suffers -1 To Hit.",
    phases: ["combat"],
  },
  {
    name: "Glowy Green Amulet",
    type: "talisman",
    points: 35,
    effect:
      "When the bearer's unit is targeted by an enemy spell, may use instead of a Wizardly dispel. Roll a D6; on 2+ the spell is dispelled. On 1, the amulet explodes (destroyed, bearer loses a Wound).",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Mantle of Stone",
    type: "talisman",
    points: 30,
    effect: "+1 Toughness, -1 Initiative.",
    phases: ["passive"],
  },
  {
    name: "The Collar of Zorga",
    type: "talisman",
    points: 20,
    effect:
      "Enemy beasts of burden (mounts, beasts drawing chariots) directing attacks against the bearer or their unit suffer -1 To Hit in Combat.",
    phases: ["combat"],
  },
  {
    name: "Staff of Baduumm",
    type: "arcane-item",
    points: 55,
    effect:
      'The bearer gains +D3 to any Casting roll. If a natural double 1 or double 6 is rolled, centre a 5" blast template over the bearer; all models underneath suffer S6, AP -1 hits. The staff is then destroyed.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Idol of Gork",
    type: "arcane-item",
    points: 40,
    effect:
      'The bearer increases spell range by 3". Once per turn, may re-roll a Casting roll.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Glittering Wotnots",
    type: "arcane-item",
    points: 40,
    effect:
      "When targeted by an enemy spell, may use instead of a Wizardly dispel. Roll a D6: on 1-3, no effect; on 4+, the spell reflects back to the caster who may attempt a Wizardly dispel.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Buzgob's Knobbly Staff",
    type: "arcane-item",
    points: 35,
    effect: "Once per turn, the bearer may re-roll a Casting roll.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Idol of Mork",
    type: "arcane-item",
    points: 30,
    effect:
      'Dispel range increases by 3". Once per turn, when attempting a Wizardly dispel, the bearer may re-roll the Dispel roll.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Da Hag's Brew",
    type: "arcane-item",
    points: 25,
    effect:
      "Orc, Goblin, and Night Goblin Shamans only. The bearer may also select spells from the Lore of Troll Magic.",
    phases: ["passive"],
  },
  {
    name: "Big Boss 'At",
    type: "enchanted-item",
    points: 50,
    effect:
      "During the Command sub-phase, if not engaged in combat, make a Leadership test. If passed, the character and their unit gains Unbreakable until the next Start of Turn sub-phase.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Grisly Trophy Rack",
    type: "enchanted-item",
    points: 30,
    effect:
      'Black Orc, Orc, Goblin, and Night Goblin Bosses only. All enemy units within 6" suffer -1 Leadership (min 2).',
    phases: ["passive"],
  },
  {
    name: "Da Thinkin' Orc's 'At",
    type: "enchanted-item",
    points: 25,
    effect:
      "+1 Initiative. The wearer and their unit are not subject to the Impetuous special rule.",
    phases: ["passive"],
    removesRules: ["impetuous"],
  },
  {
    name: "'Eadbuttin' 'At",
    type: "enchanted-item",
    points: 15,
    extremely: true,
    effect: "The wearer gains Impact Hits (1) with AP -2.",
    phases: ["combat"],
  },
  {
    name: "Fungus Wine",
    type: "enchanted-item",
    points: 10,
    extremely: true,
    effect:
      "Night Goblin characters only. Single use. During the Command sub-phase, make a Leadership test. If passed, the character and their unit gain Immune to Psychology until the next Start of Turn sub-phase.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Da Boss' Trophy Rack",
    type: "enchanted-item",
    points: 0,
    effect:
      "Kiknik only. During a turn in which he charged, Kiknik and any Goblin Wolf Rider Mob he has joined cause Fear and gain +1 combat result point.",
    phases: ["combat"],
  },
  {
    name: "Trollhide Shawl",
    type: "talisman",
    points: 0,
    effect:
      "Ogdruz Swampdigga only. +1 armour value. The bearer gains Regeneration (5+) and Flammable.",
    phases: ["combat", "shooting"],
    regen: "5+",
  },
  {
    name: "The Big Red Raggedy Flag",
    type: "banner",
    points: 50,
    effect:
      "The unit gains +1 WS (max 10). When calculating combat result, may claim an additional +1 combat result point.",
    phases: ["combat"],
    combatResBonus: 1,
  },
  {
    name: "Waaagh! Banner",
    type: "banner",
    points: 40,
    effect:
      'The unit increases maximum charge range by 3" and may apply a +D3 modifier to its charge roll.',
    phases: ["combat"],
    chargeMod: { range: 3, tag: "Waaagh!", color: "orange", order: 10 },
  },
  {
    name: "Da Banner of Butchery",
    type: "banner",
    points: 35,
    effect:
      "All models in the unit gain +1 Strength during a turn in which they charged.",
    phases: ["combat"],
    label: "+1S on charge",
  },
  {
    name: "Da Spider Banner",
    type: "banner",
    points: 35,
    effect:
      "The unit gains Poisoned Attacks. If it already has Poisoned Attacks, attacks wound automatically on a natural 5 or 6 To Hit.",
    phases: ["combat"],
    grantsRules: ["poisoned attacks"],
  },
  {
    name: "Da Angry Ladz Flag",
    type: "banner",
    points: 35,
    effect: "The unit gains the Frenzy special rule.",
    phases: ["combat"],
  },
  {
    name: "Da Banner of Da Nomadz",
    type: "banner",
    points: 25,
    effect:
      "When making a Charge, Flee, or Pursuit roll, the unit may re-roll any dice showing a natural 1.",
    phases: ["combat"],
  },
  {
    name: "Guff's Windy Banner",
    type: "banner",
    points: 20,
    effect: "The unit may re-roll any failed Panic test.",
    phases: ["passive"],
  },
  {
    name: "Banner of the Wildz",
    type: "banner",
    points: 20,
    effect: "The unit gains the Move Through Cover special rule.",
    phases: ["passive"],
  },
];
