export default [
  // ─── Wood Elves ──────────────────────────────────────────────────────
  {
    name: "Spear of Twilight",
    type: "weapon",
    points: 65,
    effect:
      "S+2. Killing Blow, Magical Attacks. When rolling To Wound, a roll of 3+ is always a success regardless of the target's Toughness.",
    phases: ["combat"],
  },
  {
    name: "Vaul's Wrath",
    type: "weapon",
    points: 55,
    effect:
      'Range 32", S+1, AP -2. Flaming Attacks, Magical Attacks, Multiple Wounds (2). Once per game, if the wielder did not move, may fire as a bolt thrower using Through & Through.',
    phases: ["shooting"],
  },
  {
    name: "Blades of Loec",
    type: "weapon",
    points: 45,
    effect:
      "Extra Attacks (+D3), Magical Attacks, Requires Two Hands. May re-roll any failed rolls To Wound.",
    phases: ["combat"],
  },
  {
    name: "Daith's Reaper",
    type: "weapon",
    points: 40,
    effect:
      "S+1, AP -1. Enemy models must re-roll any successful Armour Save rolls against wounds caused by this weapon.",
    phases: ["combat"],
  },
  {
    name: "Bow of Loren",
    type: "weapon",
    points: 40,
    effect:
      'Asrai longbow. Range 32", S, Armour Bane (1), Magical Attacks. May make shooting attacks equal to Attacks characteristic. No modifiers for multiple shots.',
    phases: ["shooting"],
  },
  {
    name: "Hunt Master's Pride",
    type: "weapon",
    points: 35,
    effect:
      "Magical Attacks, Multiple Wounds (2). Multiple Wounds only against monstrous infantry, monstrous cavalry, monstrous creatures, or behemoths. Orion's Wild Hunt only.",
    phases: ["combat"],
  },
  {
    name: "Blades of Endless Flame",
    type: "weapon",
    points: 25,
    effect: "S, AP -1. Extra Attacks (+1), Flaming Attacks, Magical Attacks.",
    phases: ["combat"],
  },
  {
    name: "Asyendi's Bane",
    type: "weapon",
    points: 10,
    effect:
      'Asrai longbow. Range 32", S. May re-roll a single failed To Hit roll during the Shooting phase. If the re-roll also fails, the wielder suffers a single S3 hit.',
    phases: ["shooting"],
  },
  {
    name: "The Spear of Kurnous",
    type: "weapon",
    points: 0,
    effect:
      'Ranged (18"): S+1, AP -2. Combat: S+1, AP -2. Magical Attacks, Multiple Wounds (D3). Ranged shots use Through & Through (S reduced by -1 for each hit after the first).',
    phases: ["shooting", "combat"],
  },
  {
    name: "Hawk's Talon",
    type: "weapon",
    points: 0,
    effect: 'Range 30", S, AP -1. Magical Attacks, Multiple Shots (D3+1).',
    phases: ["shooting"],
  },
  {
    name: "Spear of Talsyn",
    type: "weapon",
    points: 0,
    effect: "S, AP -1. Armour Bane (1), Magical Attacks.",
    phases: ["combat"],
  },
  {
    name: "Helm of the Hunt",
    type: "armour",
    points: 50,
    effect:
      "May be worn with other armour. +1 armour value (max 2+). During any turn the wearer charges, they gain +1 WS and +1 Attacks.",
    phases: ["combat"],
    armourMod: -1,
  },
  {
    name: "Mantle of Rebirth",
    type: "armour",
    points: 40,
    effect: "Light armour (6+). The wearer gains Regeneration (5+).",
    phases: ["combat", "shooting"],
    regen: "5+",
    armourBase: 6,
  },
  {
    name: "Railarian's Mantle",
    type: "armour",
    points: 35,
    effect:
      'Light armour (6+). When within 6" of a woodland terrain feature, the wearer gains a 4+ Ward save.',
    phases: ["combat", "shooting"],
    armourBase: 6,
  },
  {
    name: "Cloak of Tumbling Leaves",
    type: "armour",
    points: 30,
    effect:
      "Light armour. The wearer gains Fly (10) and Swiftstride. Cannot join a unit.",
    phases: ["passive"],
    armourBase: 6,
  },
  {
    name: "Glamourweave",
    type: "talisman",
    points: 30,
    effect:
      "Enemy models must make a Leadership test before rolling To Hit against the bearer in the Combat phase. If failed, only natural 6s will hit.",
    phases: ["combat"],
  },
  {
    name: "Merciw's Locus",
    type: "talisman",
    points: 35,
    effect:
      "The bearer's Strength cannot be modified by any weapon. However, any model directing attacks against the bearer in Combat also cannot have its Strength modified by any weapon.",
    phases: ["combat"],
  },
  {
    name: "Ariel's Favour",
    type: "talisman",
    mr: -2,
    points: 30,
    effect:
      "The bearer gains Magic Resistance (-2). Any enemy spell casting roll targeting the bearer's unit suffers a -2 modifier.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Orion's Favour",
    type: "talisman",
    points: 25,
    effect:
      "Single use. The bearer may re-roll any failed To Hit and/or To Wound rolls during the Combat phase.",
    phases: ["combat"],
  },
  {
    name: "Cloak of Isha",
    type: "talisman",
    points: 0,
    effect:
      "5+ Ward save. During each Start of Turn sub-phase, roll a D6; on a 5+, recover a single lost Wound.",
    phases: ["combat", "shooting"],
    ward: "5+",
  },
  {
    name: "Deepwood Sphere",
    type: "arcane-item",
    points: 45,
    effect:
      'When an enemy Wizard within 6" of a woodland successfully casts a spell, no dispel attempt can be made but after resolution the Wizard suffers D3 S4, AP -1 hits.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Oaken Stave",
    type: "arcane-item",
    points: 40,
    effect:
      'When within 3" of a woodland, Dispel range increases by 3" and when making a Dispel roll, roll an extra D6 and discard the lowest.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Orb of Midsummer",
    type: "arcane-item",
    points: 35,
    effect: "Once per turn, the bearer may re-roll a Casting roll.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Wand of Wych Elm",
    type: "arcane-item",
    points: 30,
    effect:
      'Once per turn, if within 3" of a woodland, the bearer may re-roll a failed Casting roll.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Sigil of the Mage Queen",
    type: "arcane-item",
    points: 25,
    effect: "Single use. The bearer may apply a +2 modifier to a Casting roll.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Heartwood Pendant",
    type: "arcane-item",
    points: 15,
    effect:
      "The bearer gains access to the Lore of the Wilds as an additional magical lore option.",
    phases: ["passive"],
  },
  {
    name: "A Blight of Terrors",
    type: "enchanted-item",
    points: 50,
    effect:
      "Spite. This model and any unit it has joined gains the Terror special rule.",
    phases: ["passive"],
  },
  {
    name: "Wraithstone",
    type: "enchanted-item",
    points: 50,
    effect:
      'Unless fleeing, enemy units within 6" suffer -1 Leadership (min 2).',
    phases: ["passive"],
  },
  {
    name: "A Muster of Malevolents",
    type: "enchanted-item",
    points: 40,
    effect:
      "Spite. Nobles and Waystalkers only. An enemy model hit by shooting from this model's Asrai longbow suffers an additional D3 S2, Armour Bane (1) hits.",
    phases: ["shooting"],
  },
  {
    name: "Crown of Antlers",
    type: "enchanted-item",
    points: 35,
    effect: "The wearer gains Armour Bane (1) and Impact Hits (D3) with AP -2.",
    phases: ["combat"],

    armourBane: 1,
  },
  {
    name: "Hail of Doom Arrow",
    type: "enchanted-item",
    points: 35,
    effect:
      'Single use. Asrai longbow only. If the To Hit roll succeeds, place a small (3") blast template over the target; models underneath suffer S4, AP -1, Magical Attacks hits.',
    phases: ["shooting"],
  },
  {
    name: "A Befuddlement of Mischiefs",
    type: "enchanted-item",
    points: 30,
    effect:
      "Spite. During Combat, a single enemy unit in base contact suffers -1 WS and -1 Initiative.",
    phases: ["combat"],
  },
  {
    name: "Moonstone of the Hidden Ways",
    type: "enchanted-item",
    points: 30,
    effect:
      'Single use. May cast Forest Walker (Lore of Athel Loren) as a Bound Spell with Power Level 3. Allows a character in woodland to relocate to a different woodland at least 6" from enemy.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Glamour Weave Kindred",
    type: "enchanted-item",
    points: 25,
    effect:
      "Noble Kindred. Wood Elf Mages only. The character has a 5+ Ward save and gains the Tree Spirit special rule.",
    phases: ["combat", "shooting"],
    ward: "5+",
  },
  {
    name: "A Murder of Spites",
    type: "enchanted-item",
    points: 25,
    effect:
      "Spite. When this model's combat is chosen, a single enemy unit it is engaged with suffers D3 S2, AP -1 hits.",
    phases: ["combat"],
  },
  {
    name: "A Lamentation of Despairs",
    type: "enchanted-item",
    points: 20,
    effect:
      'Spite. Unless fleeing, enemy units within 6" suffer -1 Leadership when making Fear, Panic, or Terror tests (min 2).',
    phases: ["passive"],
  },
  {
    name: "Aspect of the Hound",
    type: "enchanted-item",
    points: 20,
    effect:
      "Alter Kindred. The character and their unit may re-roll any To Hit rolls of a natural 1 during the Combat phase.",
    phases: ["combat"],
    grantsRules: ["aspect of the hound"],
  },
  {
    name: "Eternal Kindred",
    type: "enchanted-item",
    points: 20,
    effect:
      "Noble Kindred. Infantry only. The character and their unit may re-roll any To Hit rolls of a natural 1 during the Combat phase.",
    phases: ["combat"],
  },
  {
    name: "Wailing Arrow",
    type: "enchanted-item",
    points: 20,
    effect:
      "Single use. Asrai longbow only. Any unit that suffers an unsaved wound must make a Panic test as if it had taken heavy casualties.",
    phases: ["shooting"],
  },
  {
    name: "Wild Rider Kindred",
    type: "enchanted-item",
    points: 20,
    effect:
      "Noble Kindred. Nobles only. Must be mounted on Elven Steed or Great Stag. May only wear light armour. Gains Counter Charge, Frenzy, Furious Charge, and Talismanic Tattoos.",
    phases: ["combat"],
  },
  {
    name: "Aspect of the Bear",
    type: "enchanted-item",
    points: 15,
    effect:
      "Alter Kindred. Infantry or cavalry only. +1 Strength and +1 Toughness.",
    phases: ["passive"],
    strengthMod: "+1",
    grantsRules: ["aspect of the bear"],
  },
  {
    name: "Blight-Tipped Arrows",
    type: "enchanted-item",
    points: 15,
    effect:
      "Single use. Asrai longbow only. If the target suffers an unsaved wound, it must make a Toughness test each subsequent turn. Failure inflicts an additional wound (no armour or Regeneration saves).",
    phases: ["shooting"],
  },
  {
    name: "An Annoyance of Netlings",
    type: "enchanted-item",
    points: 15,
    effect:
      "Spite. When the bearer is in a challenge, its opponent suffers -1 To Hit.",
    phases: ["combat"],
  },
  {
    name: "Scout Kindred",
    type: "enchanted-item",
    points: 15,
    effect:
      "Noble Kindred. Infantry only. The character gains Quick Shot and Scouts.",
    phases: ["passive"],
  },
  {
    name: "Aspect of the Boar",
    type: "enchanted-item",
    points: 10,
    effect:
      "Alter Kindred. Improves AP of weapons by 1 during a turn in which the character charged. Gains Impact Hits (1).",
    phases: ["combat"],
    impactHits: "1",
    grantsRules: ["aspect of the boar"],
  },
  {
    name: "Aspect of the Cat",
    type: "enchanted-item",
    points: 10,
    effect:
      "Alter Kindred. Gains Armour Bane (1) and may re-roll failed To Hit rolls during a challenge.",
    phases: ["combat"],
    armourBane: 1,
    grantsRules: ["aspect of the cat"],
  },
  {
    name: "A Resplendence of Luminescents",
    type: "enchanted-item",
    points: 10,
    effect:
      "Spite. This model and its unit gains the Magical Attacks special rule.",
    phases: ["passive"],
  },
  {
    name: "Horn of the Wild Hunt",
    type: "enchanted-item",
    points: 0,
    effect:
      "Once per game, during the Command sub-phase, Orion may sound this horn. Friendly units within Command range gain Frenzy until end of turn.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Tapestry of Talsyn",
    type: "banner",
    points: 80,
    effect:
      'BSB in Host of Talsyn only. Command Range increases to 18". Friendly units within Command Range gain +1 Leadership (max 10).',
    phases: ["passive"],
  },
  {
    name: "Banner of the Wildwood",
    type: "banner",
    points: 40,
    effect:
      "The unit gains Fear. If it already has Fear, it instead gains Terror.",
    phases: ["passive"],
  },
  {
    name: "Banner of the Wild Hunt",
    type: "banner",
    points: 25,
    effect:
      "Orion's Wild Hunt only. The unit gains +1 combat result bonus and may re-roll Pursuit rolls.",
    phases: ["combat"],
  },
  {
    name: "Standard of Morning's Chill",
    type: "banner",
    points: 25,
    effect:
      "The bearer can cast Swirling Mists (Lore of the Wilds) as a Bound Spell with Power Level 2. Enemy shooting attacks against the unit must re-roll natural 6s To Hit.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Banner of the Hunter King",
    type: "banner",
    points: 25,
    effect: "The unit gains the Vanguard special rule.",
    phases: ["passive"],
  },
  {
    name: "Banner of the Eternal Queen",
    type: "banner",
    points: 20,
    effect:
      'When within 6" of a woodland, the unit may claim an additional +1 combat result point.',
    phases: ["combat"],
    combatResBonus: 1,
  },
  {
    name: "Banner of Springtide",
    type: "banner",
    points: 20,
    effect: "The unit gains the Quick Shot special rule.",
    phases: ["shooting"],
  },
  {
    name: "Banner of Midsummer's Eve",
    type: "banner",
    points: 15,
    effect: "The unit gains the Ignores Cover special rule.",
    phases: ["shooting"],
  },
];
