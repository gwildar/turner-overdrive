export default [
  // ─── Ogre Kingdoms ───────────────────────────────────────────────────

  // Big Names
  {
    name: "Mawseeker",
    type: "enchanted-item",
    points: 30,
    effect: "Infantry only. +1 Toughness modifier. Subject to Stupidity.",
    phases: ["combat"],
  },
  {
    name: "Mountaineater",
    type: "enchanted-item",
    points: 25,
    effect:
      "Infantry only. Cannot be wounded by a roll To Wound of 2, regardless of the Strength of the attack.",
    phases: ["combat"],
  },
  {
    name: "Giantbreaker",
    type: "enchanted-item",
    points: 20,
    effect:
      "+1 Strength modifier (character only, not mount). Cannot refuse challenges and neither the character nor their unit can flee as a charge reaction.",
    phases: ["combat"],
    strengthMod: "+1",
  },
  {
    name: "Kineater",
    type: "enchanted-item",
    points: 15,
    effect:
      "Army General only. Friendly models within command range may re-roll any failed Panic or Rally test, unless the character is fleeing.",
    phases: ["movement"],
  },
  {
    name: "Longstrider",
    type: "enchanted-item",
    points: 10,
    effect: "Infantry only. +1 Movement modifier.",
    phases: ["movement"],
  },
  {
    name: "Beastkiller",
    type: "enchanted-item",
    points: 5,
    effect:
      "Once per turn, may re-roll a single failed roll To Wound against an enemy model with the Large Target special rule.",
    phases: ["combat"],
  },
  {
    name: "Deathcheater",
    type: "enchanted-item",
    points: 5,
    effect:
      "Once per game, make your opponent re-roll a single roll To Wound made against this character.",
    phases: ["combat"],
  },

  // Ogre Kingdoms Magic Weapons
  {
    name: "Thundermace",
    type: "weapon",
    points: 90,
    effect:
      'Instead of normal attacks, may make a Thunderstrike: place 3" blast template over hit unit. Models underneath risk being hit.',
    phases: ["combat"],
    s: "S",
    ap: "—",
  },
  {
    name: "Tenderiser",
    type: "weapon",
    points: 70,
    effect: "Requires Two Hands, Multiple Wounds (D3).",
    phases: ["combat"],
    s: "S+2",
    ap: "-3",
    attacks: "+1",
  },
  {
    name: "Skullplucker",
    type: "weapon",
    points: 45,
    effect: "Killing Blow, Magical Attacks, Strike First.",
    phases: ["combat"],
    s: "S",
    ap: "—",
  },
  {
    name: "Bloodcleaver",
    type: "weapon",
    points: 30,
    effect:
      "Emissaries of the Great Maw only. If the wielder causes one or more unsaved wounds during combat, they recover a single lost Wound.",
    phases: ["combat"],
    s: "S",
    ap: "—",
  },

  // Ogre Kingdoms Magic Armour
  {
    name: "Gut Maw",
    type: "armour",
    points: 45,
    effect:
      "Heavy armour. For each unsaved wound the wearer causes during a Challenge, they recover a single lost Wound.",
    phases: ["combat"],
    armourBase: 5,
  },
  {
    name: "Mastodon Armour",
    type: "armour",
    points: 40,
    effect: "Full plate armour. 6+ Ward save against any wounds suffered.",
    phases: ["combat"],
    armourBase: 4,
    ward: "6+",
  },

  // Ogre Kingdoms Talismans
  {
    name: "Spangleshard",
    type: "talisman",
    points: 35,
    effect:
      "4+ Ward save. If a natural 1 is rolled for the Ward save, the item is destroyed.",
    phases: ["combat", "shooting"],
    ward: "4+",
  },
  {
    name: "Cathayan Jet Pendant",
    type: "talisman",
    points: 10,
    extremely: true,
    effect:
      "6+ Ward save against wounds caused by Magic Missile, Magical Vortex, or Assailment spells.",
    phases: ["shooting"],
    ward: "6+",
  },

  // Ogre Kingdoms Arcane Items
  {
    name: "Grut's Sickle",
    type: "arcane-item",
    points: 40,
    effect:
      'After casting, roll additional D3 and add to Casting roll. However, a friendly model within 3" immediately loses one Wound.',
    phases: ["strategy"],
  },
  {
    name: "Halfling Cookbook",
    type: "arcane-item",
    points: 30,
    effect:
      "Increases Command range, Dispel range, and one chosen spell's range by 3\".",
    phases: ["strategy"],
  },
  {
    name: "Hellheart",
    type: "arcane-item",
    points: 20,
    effect:
      "Single use. Bearer loses one Wound. Until next turn start, enemy Wizards' natural doubles on Casting rolls cause miscasts.",
    phases: ["strategy"],
  },

  // Ogre Kingdoms Enchanted Items
  {
    name: "Jade Lion",
    type: "enchanted-item",
    points: 25,
    effect:
      "Bearer and their unit may re-roll any failed Fear, Panic, Rally or Terror tests.",
    phases: ["movement", "combat"],
  },
  {
    name: "Daemon-Slayer Scars",
    type: "enchanted-item",
    points: 20,
    extremely: true,
    effect: "Bearer gains the Terror special rule.",
    phases: ["combat"],
  },
  {
    name: "Fistful of Laurels",
    type: "enchanted-item",
    points: 15,
    extremely: true,
    effect:
      "Single use. Bearer and their unit may re-roll 2D6 when making a Break test.",
    phases: ["combat"],
    subPhases: ["break-test"],
  },

  // Ogre Kingdoms Magic Standards
  {
    name: "Dragonhide Banner",
    type: "banner",
    points: 45,
    effect: "Unit may re-roll natural 1s To Hit and gains Flaming Attacks.",
    phases: ["combat"],
  },
  {
    name: "Rune Maw",
    type: "banner",
    points: 40,
    effect:
      "When enemy Wizard targets this unit with a spell, roll D6. On 3+, Wizard must choose another target or the spell cannot be cast.",
    phases: ["strategy"],
  },
  {
    name: "Cannibal Totem",
    type: "banner",
    points: 30,
    effect: 'Unit gains Regeneration (5+), but may only pursue D6".',
    phases: ["combat"],
    subPhases: ["choose-fight", "pursuit"],
    regen: "5+",
  },
  {
    name: "Bull Standard",
    type: "banner",
    points: 20,
    effect:
      "Unit may re-roll failed rolls To Wound when resolving Impact Hits.",
    phases: ["combat"],
  },
];
