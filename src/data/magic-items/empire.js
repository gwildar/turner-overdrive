export default [
  // ─── Empire ──────────────────────────────────────────────────────────
  {
    name: "Runefang",
    type: "weapon",
    points: 100,
    effect:
      "S, AP -2. Magical Attacks, Strike First. When rolling To Wound, a roll of 2+ is always a success regardless of the target's Toughness.",
    phases: ["combat"],
  },
  {
    name: "Mace of Helsturm",
    type: "weapon",
    points: 65,
    effect:
      "Two profiles, chosen each combat round. Single-Handed: S, Magical Attacks. Double-Handed: S10, AP -5, Magical Attacks, Multiple Wounds (D6), Requires Two Hands. When double-handed, the wielder makes only one attack.",
    phases: ["combat"],
  },
  {
    name: "Hammer of Righteousness",
    type: "weapon",
    points: 50,
    effect:
      "S+2, AP -2. Magical Attacks, Requires Two Hands, Strike Last. Each hit forces a Leadership test; if failed, the hit wounds automatically with no armour save (Regeneration and Ward saves allowed). If passed, roll To Wound as normal.",
    phases: ["combat"],
  },
  {
    name: "Sword of Justice",
    type: "weapon",
    points: 50,
    effect:
      "S, AP -1. Armour Bane (1), Magical Attacks, Multiple Wounds (2). May re-roll any failed To Wound rolls.",
    phases: ["combat"],
  },
  {
    name: "Pearl Daggers",
    type: "weapon",
    points: 35,
    effect:
      "S, AP -1. Extra Attacks (+D3), Magical Attacks, Requires Two Hands. May re-roll failed To Hit rolls.",
    phases: ["combat"],
  },
  {
    name: "Blade of Silvered Steel",
    type: "weapon",
    points: 30,
    effect:
      "S+1, AP -1. Armour Bane (1), Magical Attacks, Hatred (Undead). Undead cannot make Armour or Regeneration saves against wounds. Knightly Order only.",
    phases: ["combat"],
  },
  {
    name: "Dragon Bow",
    type: "weapon",
    points: 25,
    effect:
      'Range 36", S6, AP -2. Magical Attacks, Multiple Wounds (2). Commanders of the Empire only.',
    phases: ["shooting"],
  },
  {
    name: "Von Trickschotte's Wondrous Arquebus",
    type: "weapon",
    points: 25,
    effect:
      'Range 36", S5, AP -2. Armour Bane (1), Magical Attacks, Multiple Wounds (D3). No -1 To Hit at Long Range. City-state of Nuln only.',
    phases: ["shooting"],
  },
  {
    name: "Beast Reaver",
    type: "weapon",
    points: 0,
    effect:
      "S+1, AP -1. Armour Bane (1), Killing Blow, Magical Attacks. May re-roll failed To Wound rolls against Beastmen Brayherds.",
    phases: ["combat"],
  },
  {
    name: "Judgement",
    type: "weapon",
    points: 0,
    effect:
      "S+2, AP -2. Magical Attacks, Multiple Wounds (2), Requires Two Hands.",
    phases: ["combat"],
  },
  {
    name: "Armour of Fortune",
    type: "armour",
    points: 45,
    effect:
      "Heavy armour. 6+ Ward save. Immune to Killing Blow; if struck, may attempt armour and Regeneration saves normally, losing only a single Wound if unsaved.",
    phases: ["combat", "shooting"],
    ward: "6+",
    armourBase: 5,
  },
  {
    name: "Shield of the Gorgon",
    type: "armour",
    points: 40,
    effect:
      "Shield. Enemy models in base contact suffer -1 Attacks (min 1). Knightly Order only.",
    phases: ["combat"],
  },
  {
    name: "Armour of Tarnus",
    type: "armour",
    points: 35,
    effect:
      "Light armour that may be worn by an Imperial Wizard without penalty. 5+ Ward save.",
    phases: ["combat", "shooting"],
    ward: "5+",
    armourBase: 6,
  },
  {
    name: "Twice-Blessed Armour",
    type: "armour",
    points: 25,
    effect:
      "Full plate armour (4+). The wearer may cast Hammerhand (Lore of Battle Magic) as a Bound Spell with Power Level 2.",
    phases: ["combat", "strategy"],
    subPhases: ["conjuration"],
    armourBase: 4,
  },
  {
    name: "The Griffon Helm",
    type: "armour",
    points: 0,
    effect:
      "5+ Ward save. Immune to Killing Blow; may attempt armour and Regeneration saves normally, losing only a single Wound if unsaved.",
    phases: ["combat", "shooting"],
    ward: "5+",
  },
  {
    name: "The White Cloak",
    type: "talisman",
    points: 30,
    effect:
      "5+ Ward save. 3+ Ward save against wounds caused by Flaming Attacks.",
    phases: ["combat", "shooting"],
    ward: "5+",
  },
  {
    name: "Jade Amulet",
    type: "talisman",
    points: 25,
    effect:
      "Immune to Killing Blow; may attempt armour and Regeneration saves normally, losing only a single Wound if unsaved.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Witch Hunter's Ward",
    type: "talisman",
    mr: -2,
    points: 20,
    effect:
      "Magic Resistance (-2). Once per game, may re-roll a single failed Armour Save.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Slayer's Hourglass",
    type: "talisman",
    points: 10,
    effect: "Enemy monsters in base contact suffer -1 WS.",
    phases: ["combat"],
  },
  {
    name: "Twin-Tailed Wand",
    type: "arcane-item",
    points: 40,
    effect:
      "Once per turn, the bearer may attempt to cast one of their spells a second time. If the bearer miscasts, they suffer D3 wounds (no armour or Regeneration saves; Ward saves allowed) instead of rolling on the Miscast table.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Tome of Midnight",
    type: "arcane-item",
    points: 30,
    effect:
      "+1 to casting rolls for Daemonology, Dark Magic, or Necromancy. Knows one additional spell. Can only cast spells per turn equal to Level of Wizardry. Subject to the Loner special rule.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Crystal Ball",
    type: "arcane-item",
    points: 20,
    effect:
      "Once per turn, may make an opponent re-roll a single To Hit or To Wound roll against a friendly character within the bearer's Command range.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Squintsoffen's Marvellous Magnifier",
    type: "enchanted-item",
    points: 35,
    effect:
      "The bearer and their unit do not suffer -1 To Hit at Long Range. City-state of Nuln only.",
    phases: ["shooting"],
  },
  {
    name: "Ring of Fortune",
    type: "enchanted-item",
    points: 20,
    effect:
      "Single use. May re-roll any failed To Wound rolls during the Combat phase.",
    phases: ["combat"],
  },
  {
    name: "Ring of Taal",
    type: "enchanted-item",
    points: 20,
    effect:
      "Single use. May cast Oaken Shield (Lore of Battle Magic) as a Bound Spell with Power Level 3. Grants 5+ Ward save until next Start of Turn.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
    ward: "5+",
  },
  {
    name: "Order of the White Wolf",
    type: "virtue",
    points: 15,
    effect:
      "Must equip great weapons or halberds (may replace with wolf hammers for free). Gains Furious Charge. Characters and Inner Circle Knights have a 5+ Ward save against Flaming Attacks. Does not apply to mounts.",
    phases: ["combat", "shooting"],
    ward: "5+",
  },
  {
    name: "Order of the Fiery Heart",
    type: "virtue",
    points: 15,
    effect:
      "Can only be joined by members of the same order, Lectors, or Priests of Sigmar. Gains Hatred (enemy Wizards, Orcs & Goblins) and +1 Initiative in the first round of combat. Characters and Inner Circle Knights may re-roll natural 1s To Hit or To Wound. Does not apply to mounts.",
    phases: ["combat"],
  },
  {
    name: "Order of the Knights of Morr",
    type: "virtue",
    points: 15,
    effect:
      "Gains Hatred (Undead) and a 6+ Ward save against non-magical attacks. Characters and Inner Circle Knights gain Fear and Magical Attacks. Does not apply to mounts.",
    phases: ["combat", "shooting"],
    ward: "6+",
  },
  {
    name: "Order of the Blazing Sun",
    type: "virtue",
    points: 10,
    effect:
      "Gains Evasive and Flaming Attacks. Characters and Inner Circle Knights gain +1 combat result bonus when charging. Does not apply to mounts.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Order of the Knights Panther",
    type: "virtue",
    points: 10,
    effect:
      "Must be armed with lances. May re-roll a single natural 1 on Charge rolls. Gains Hatred (Warriors of Chaos, Beastmen Brayherds & Daemonic models). Characters and Inner Circle Knights gain Magic Resistance (-1). Does not apply to mounts.",
    phases: ["movement", "combat"],
    mr: -1,
  },
  {
    name: "Banner of the Knights Panther",
    type: "banner",
    points: 80,
    effect:
      "Order of the Knights Panther BSB only. The unit gains Unbreakable.",
    phases: ["combat"],
  },
  {
    name: "Imperial Banner",
    type: "banner",
    points: 60,
    effect:
      "All friendly units within Command range roll 3D6 for Fear, Panic, or Terror tests and discard the highest.",
    phases: ["passive"],
  },
  {
    name: "Griffon Standard",
    type: "banner",
    points: 50,
    effect:
      "The unit gains +2 Rank Bonus per extra rank behind the first, rather than +1.",
    phases: ["combat"],
  },
  {
    name: "Tapestry of Sigmar's Triumph",
    type: "banner",
    points: 40,
    effect:
      "The unit may re-roll any To Wound rolls of natural 1 during the first round of combat.",
    phases: ["combat"],
  },
  {
    name: "Icon of Morr",
    type: "banner",
    points: 25,
    effect: "The unit gains Fear. If it already has Fear, it gains Terror.",
    phases: ["combat"],
  },
  {
    name: "The Banner of the Free State of Nuln",
    type: "banner",
    points: 20,
    effect: "The unit gains Stubborn. City-state of Nuln only.",
    phases: ["combat"],
  },
  {
    name: "The Gleaming Pennant",
    type: "banner",
    points: 15,
    effect:
      "Single use. The unit may re-roll one failed Leadership test (not Break tests).",
    phases: ["passive"],
  },
  {
    name: "Banner of Duty",
    type: "banner",
    points: 10,
    effect: "The unit may re-roll any failed Rally test.",
    phases: ["strategy"],
    subPhases: ["command"],
  },

  // ─── Empire of Man ───────────────────────────────────────────────────
  {
    name: "Runefang",
    type: "weapon",
    points: 100,
    effect:
      "Magical Attacks. When making a roll To Wound, a roll of 2+ is always a success, regardless of the target's Toughness.",
    phases: ["combat"],
    s: "S",
    ap: "-2",
  },
  {
    name: "Mace of Helsturm",
    type: "weapon",
    points: 65,
    effect:
      "Magical Attacks. Two profiles: Single-handed (S, AP —) or Double-handed (S10, AP -5, one attack only regardless of Attacks characteristic).",
    phases: ["combat"],
    profiles: [
      { name: "Single-handed", s: "S", ap: "—", rules: ["Magical Attacks"] },
      {
        name: "Double-handed",
        s: "10",
        ap: "-5",
        rules: ["Magical Attacks", "Requires Two Hands. One attack only."],
      },
    ],
  },
  {
    name: "Hammer of Righteousness",
    type: "weapon",
    points: 50,
    effect:
      "Magical Attacks, Requires Two Hands. Each enemy model hit must pass a Leadership test or suffer a wound automatically with no armour save allowed.",
    phases: ["combat"],
    s: "S+2",
    ap: "-2",
  },
  {
    name: "Sword of Justice",
    type: "weapon",
    points: 50,
    effect:
      "Magical Attacks. The wielder may re-roll any failed rolls To Wound.",
    phases: ["combat"],
    s: "S",
    ap: "-1",
  },
  {
    name: "Pearl Daggers",
    type: "weapon",
    points: 35,
    effect:
      "Magical Attacks. The wielder may re-roll any failed rolls To Hit during combat.",
    phases: ["combat"],
    s: "S",
    ap: "-1",
  },
  {
    name: "Blade of Silvered Steel",
    type: "weapon",
    points: 30,
    effect:
      "Magical Attacks. Undead models cannot make armour or Regeneration saves against wounds caused by this weapon. Knightly Order only.",
    phases: ["combat"],
    s: "S+1",
    ap: "-1",
  },
  {
    name: "Dragon Bow",
    type: "weapon",
    points: 25,
    effect:
      'Range 36", S6, AP -2. Magical Attacks. Commanders of the Empire only.',
    phases: ["shooting"],
    s: "6",
    ap: "-2",
  },
  {
    name: "Von Trickschotte's Wondrous Arquebus",
    type: "weapon",
    points: 25,
    effect:
      'Range 36", S5, AP -2. Magical Attacks. The wielder does not suffer the -1 modifier for long range shooting. City-state of Nuln only.',
    phases: ["shooting"],
    s: "5",
    ap: "-2",
  },
  {
    name: "Armour of Fortune",
    type: "armour",
    points: 45,
    effect:
      "Heavy armour. The wearer has a 6+ Ward save against any wounds suffered, and is immune to the Killing Blow special rule (unsaved Killing Blows cause a single Wound instead).",
    phases: ["combat", "shooting"],
    armourBase: 5,
    ward: "6+",
  },
  {
    name: "Shield of the Gorgon",
    type: "armour",
    points: 40,
    effect:
      "Shield. While in base contact, enemy models suffer a -1 modifier to their Attacks characteristic. Knightly Order only.",
    phases: ["combat"],
  },
  {
    name: "Armour of Tarnus",
    type: "armour",
    points: 35,
    effect:
      "Light armour. Wizards may wear this armour without penalty. The wearer has a 5+ Ward save against any wounds suffered.",
    phases: ["combat", "shooting"],
    armourBase: 6,
    ward: "5+",
  },
  {
    name: "Twice-Blessed Armour",
    type: "armour",
    points: 25,
    effect:
      "Full plate armour. The wearer may cast Hammerhand as a Bound spell with a Power Level of 2.",
    phases: ["combat", "shooting"],
    armourBase: 4,
  },
  {
    name: "The White Cloak",
    type: "talisman",
    points: 30,
    effect:
      "The wearer has a 5+ Ward save against any wounds suffered, and a 3+ Ward save against wounds caused by Flaming Attacks.",
    phases: ["combat", "shooting"],
    ward: "5+ (3+ vs Flaming)",
  },
  {
    name: "Jade Amulet",
    type: "talisman",
    points: 25,
    effect:
      "The bearer is immune to the Killing Blow special rule. Unsaved Killing Blows cause a single Wound instead.",
    phases: ["combat", "shooting"],
    extremely: true,
  },
  {
    name: "Witch Hunter's Ward",
    type: "talisman",
    points: 20,
    effect:
      "Magic Resistance (-2). Once per game, the bearer may re-roll a single failed Armour Save.",
    phases: ["combat", "shooting", "strategy"],
    mr: -2,
    extremely: true,
  },
  {
    name: "Slayer's Hourglass",
    type: "talisman",
    points: 10,
    effect:
      "Enemy monsters in base contact with the bearer suffer a -1 modifier to their Weapon Skill characteristic.",
    phases: ["combat"],
  },
  {
    name: "Banner of the Knights Panther",
    type: "banner",
    points: 80,
    effect:
      "Battle Standard Bearer of the Order of the Knights Panther only. The unit gains the Unbreakable special rule.",
    phases: ["combat"],
  },
  {
    name: "Imperial Banner",
    type: "banner",
    points: 60,
    effect:
      "Friendly units within the bearer's Command range roll 3D6 for any Fear, Panic, or Terror tests and discard the highest result.",
    phases: ["combat"],
  },
  {
    name: "Griffon Standard",
    type: "banner",
    points: 50,
    effect:
      "The unit claims +2 Rank Bonus per extra rank rather than the usual +1 when determining combat result.",
    phases: ["combat"],
  },
  {
    name: "Tapestry of Sigmar's Triumph",
    type: "banner",
    points: 40,
    effect:
      "The unit may re-roll any rolls To Wound of a natural 1 during the first round of a combat.",
    phases: ["combat"],
  },
  {
    name: "Icon of Morr",
    type: "banner",
    points: 25,
    effect:
      "The unit gains the Fear special rule. If the unit already has Fear, it instead gains the Terror special rule.",
    phases: ["passive"],
  },
  {
    name: "The Banner of the Free State of Nuln",
    type: "banner",
    points: 20,
    effect:
      "The unit gains the Stubborn special rule. City-state of Nuln only.",
    phases: ["combat"],
  },
  {
    name: "The Gleaming Pennant",
    type: "banner",
    points: 15,
    effect: "Single use. The unit may re-roll one failed Leadership test.",
    phases: ["combat"],
  },
  {
    name: "Banner of Duty",
    type: "banner",
    points: 10,
    effect: "The unit may re-roll any failed Rally tests.",
    phases: ["combat"],
  },
  {
    name: "Laurels of Victory",
    type: "enchanted-item",
    points: 40,
    effect:
      "Each unsaved wound caused by the bearer (not their mount) counts as 2 combat result points instead of 1.",
    phases: ["combat"],
  },
  {
    name: "Squintsoffen's Marvellous Magnifier",
    type: "enchanted-item",
    points: 35,
    effect:
      "The bearer and any unit they have joined do not suffer the -1 To Hit modifier for shooting at long range. City-state of Nuln only.",
    phases: ["shooting"],
    extremely: true,
  },
  {
    name: "Ring of Fortune",
    type: "enchanted-item",
    points: 20,
    effect:
      "Single use. The bearer may re-roll any failed rolls To Wound during combat.",
    phases: ["combat"],
  },
  {
    name: "Ring of Taal",
    type: "enchanted-item",
    points: 20,
    effect:
      "Single use. The bearer may cast Oaken Shield as a Bound spell with a Power Level of 3.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "The Silver Horn",
    type: "enchanted-item",
    points: 15,
    effect:
      "Swiftstride characters only. The bearer and any unit they have joined may re-roll a D6 when using Swiftstride.",
    phases: ["movement"],
  },
  {
    name: "Shroud of Iron",
    type: "enchanted-item",
    points: 10,
    effect:
      "The bearer and any unit they have joined have a 6+ Ward save against wounds caused by non-magical templates.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Book of Ashur",
    type: "arcane-item",
    points: 85,
    effect:
      "Increases the bearer's Dispel range by 3\". The bearer gains a +1 modifier to Casting or Dispel rolls, unless rolling natural doubles.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Twin-Tailed Wand",
    type: "arcane-item",
    points: 40,
    effect:
      "Once per turn, the bearer may attempt to cast a spell twice. If either attempt Miscasts, the bearer suffers D3 wounds with no armour or Regeneration saves permitted.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
    yourTurnOnly: true,
  },
  {
    name: "Wizard's Familiar",
    type: "arcane-item",
    points: 35,
    effect: "The bearer gains a +1 modifier to Dispel rolls. 0-1 per Wizard.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
    extremely: true,
  },
  {
    name: "Tome of Midnight",
    type: "arcane-item",
    points: 30,
    effect:
      "The bearer gains a +1 modifier to Casting rolls when casting Daemonology, Dark Magic, or Necromancy spells. The bearer also knows one additional spell. Subject to the Loner special rule.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Crystal Ball",
    type: "arcane-item",
    points: 20,
    effect:
      "Once per turn, the bearer may force their opponent to re-roll a single roll To Hit or To Wound made against a friendly character within Command range.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Wizard's Staff",
    type: "arcane-item",
    points: 20,
    effect:
      "The bearer gains a +1 modifier to Casting rolls when casting Assailment spells or Magic Missiles. 0-1 per Wizard.",
    phases: ["strategy", "shooting"],
    subPhases: ["conjuration"],
    extremely: true,
  },

  // ─── infamous-origins ─────────────────────────────
  {
    name: `The Might of Miragliano`,
    type: "enchanted-item",
    points: 25,
    effect: `A model with the Might of Miragliano Infamous Origin: - Has a +1 modifier to their Leadership characteristic.; - Gains the Stubborn and Tilean Stoicism special rules..`,
    phases: ["passive"],
  },
  {
    name: `The Noble Outlaw`,
    type: "enchanted-item",
    points: 20,
    effect: `A model with the Noble Outlaw Infamous Origin: - Has a +1 modifier to their Ballistic Skill and Leadership characteristics.; - Gains the "Hold the Line" special rule.; - May purchase magic items from the Empire of Man magic item lists in Forces of Fantasy and Arcane Journal - Empire of Man.; - May take one of the following: - Handgun (+6 points); - Repeater handgun (+8 points); - Repeater pistol (+8 points); - Shortbow (+2 points); - Longbow (+4 points).; - May take one of the following special rules: - Ambushers (+10 points); - Scouts (+10 points)..`,
    phases: ["passive"],
  },
  {
    name: `The Renegade Knight`,
    type: "enchanted-item",
    points: 25,
    effect: `A model with the Renegade Knight Infamous Origin: - Has a +1 modifier to their Weapon Skill and Strength characteristics.; - May purchase magic items from the Kingdom of Bretonnia magic item lists in Forces of Fantasy and Arcane Journal - Kingdom of Bretonnia.; - Gains the Noble Disdain and Veteran special rules..`,
    phases: ["passive"],
  },
  {
    name: `The Wandering Diestro`,
    type: "enchanted-item",
    points: 20,
    effect: `A model with the Wandering Diestro Infamous Origin: - Has a +2 modifier to their Weapon Skill characteristic.; - Gains the Feint & Dodge special rule.; - May not take any weapons with the Strike Last special rule.; - May take an additional hand weapon (+3 points).`,
    phases: ["passive"],
  },
];
