export default [
  // ─── Grand Cathay ─────────────────────────────────────────────────────
  // Magic Weapons
  {
    name: "The Monkey King's Wisdom",
    type: "weapon",
    points: 75,
    effect:
      "Magical Attacks, Multiple Wounds (D3), Requires Two Hands, Strike Last.",
    phases: ["combat"],
    s: "10",
    ap: "-4",
  },
  {
    name: "Sun & Moon Blades",
    type: "weapon",
    points: 20,
    effect:
      "If the wielder is struck by a Killing Blow, roll a D6. On a 4+, the Killing Blow is parried and discarded with no further effect.",
    phases: ["combat"],
  },
  {
    name: "Spirit Longma Spear",
    type: "weapon",
    points: 25,
    effect:
      "Cavalry, monster or chariot only. A Cathayan lance's Strength and Armour Piercing modifiers apply only during a turn in which the wielder charged.",
    phases: ["combat"],
  },
  {
    name: "Jade Blade of the Great Fleet",
    type: "weapon",
    points: 70,
    effect: "The wielder gains the Regeneration (5+) special rule.",
    phases: ["combat"],
  },
  {
    name: "The Sword of Reason",
    type: "weapon",
    points: 65,
    effect:
      "The wielder strikes a Killing Blow on a natural 5 or 6 when making a roll To Wound, rather than the usual 6.",
    phases: ["combat"],
  },
  {
    name: "The Brazen Blade",
    type: "weapon",
    points: 50,
    effect:
      "Enemy models are not permitted a Ward or Regeneration save against an attack made with this weapon if the wielder rolls a natural 6 To Wound.",
    phases: ["combat"],
  },
  {
    name: "The Wrath of Xen Yang",
    type: "weapon",
    points: 45,
    effect:
      "Enemy models cannot make Regeneration saves against a wound caused by this weapon.",
    phases: ["combat"],
  },
  {
    name: "The Sword of Nan-Gau",
    type: "weapon",
    points: 35,
    effect: "Hatred (Warriors of Chaos), Magical Attacks.",
    phases: ["combat"],
    s: "S",
    ap: "-3",
  },
  // Magic Armour
  {
    name: "The Armour of the Warbird",
    type: "armour",
    points: 45,
    effect:
      "Regular infantry or heavy infantry only. Heavy armour. The wearer gains Counter Charge, Fly (9) and Swiftstride. The bearer cannot join a unit.",
    phases: ["passive"],
  },
  {
    name: "Jade Armour of Beichai",
    type: "armour",
    points: 40,
    effect:
      "Full plate armour. The wearer has a 5+ Ward save against any wounds suffered and gains Magic Resistance (-2).",
    phases: ["passive"],
  },
  {
    name: "Shield of Nan-Gau",
    type: "armour",
    points: 20,
    effect:
      "Shield. During a turn in which the bearer was charged, the Shield of Nan-Gau improves the bearer's armour value by 2 (to a maximum of 2+).",
    phases: ["passive"],
  },
  {
    name: "The Mantle of Heaven",
    type: "armour",
    points: 20,
    effect:
      "Infantry or cavalry only. May be worn with other armour. The wearer improves their armour value by 2 (to a maximum of 2+) against non-magical shooting attacks.",
    phases: ["passive"],
  },
  // Talismans
  {
    name: "Crystal of Kunlan",
    type: "talisman",
    points: 35,
    effect:
      "5+ Ward save against any wounds suffered. If a natural 6 is rolled on the Ward save, every enemy model in base contact with the bearer suffers a Strength 3 hit (AP -) with Flaming Attacks.",
    phases: ["passive"],
  },
  {
    name: "Sigil of Smoke & Powder",
    type: "talisman",
    points: 35,
    effect:
      "Any enemy model targeting this character or any unit they have joined during the Shooting phase suffers an additional -1 To Hit modifier.",
    phases: ["passive"],
  },
  {
    name: "Crown of Jade",
    type: "talisman",
    points: 20,
    effect:
      "4+ Ward save against wounds caused by a Magic Missile, Magical Vortex, or Assailment spell.",
    phases: ["passive"],
  },
  {
    name: "Vermilion Quills",
    type: "talisman",
    points: 25,
    effect:
      "Extremely Common. 0-1 per model. Single use. The bearer (but not their mount) can re-roll any failed rolls To Hit and/or To Wound made during the Combat phase.",
    phases: ["combat"],
    extremely: true,
  },
  // Arcane Items
  {
    name: "Cloak of Po Mei",
    type: "arcane-item",
    points: 50,
    effect:
      "In addition to randomly generated spells, the wearer knows all three spells from the Lore of Yin or the Lore of Yang. However, they can only cast a number of spells equal to their Level of Wizardry per turn.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Clockwork Compass",
    type: "arcane-item",
    points: 50,
    effect:
      "Single use. The bearer may use this item instead of making a Wizardly dispel attempt. If they do so, the spell is automatically dispelled. In addition, all Remains in Play spells currently in play are dispelled, including friendly Wizards' spells.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Guardian Feng Shi Bo",
    type: "arcane-item",
    points: 35,
    effect:
      "Extremely Common. Any enemy model that directs its attacks against the owner during the Combat phase suffers a -1 modifier to its rolls To Hit.",
    phases: ["combat"],
    extremely: true,
  },
  {
    name: "Seal of Xing Po",
    type: "arcane-item",
    points: 35,
    effect:
      "Extremely Common. 0-1 per model. The bearer may discard two randomly generated spells and instead select two signature spells from the Lore of Yang or the Lore of Yin.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
    extremely: true,
  },
  {
    name: "Scrolls of Wei-jin",
    type: "arcane-item",
    points: 10,
    effect:
      "The bearer knows one more spell than is normal for their Level of Wizardry. However, they can only cast a number of spells equal to their Level of Wizardry per turn.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Learned Feng Shi Bo",
    type: "arcane-item",
    points: 15,
    effect:
      "Extremely Common. The owner knows one more spell than is normal for their Level of Wizardry. This does not increase the Wizard's Level.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
    extremely: true,
  },
  // Enchanted Items
  {
    name: "Maw Shard",
    type: "enchanted-item",
    points: 50,
    effect:
      'If an enemy Wizard rolls any natural double when making a Casting roll whilst within 18" of the bearer, the spell is miscast, regardless of the casting result.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Alchemist's Mask",
    type: "enchanted-item",
    points: 35,
    effect:
      "The wearer can cast the Plague of Rust spell from the Lore of Elementalism as a Bound spell, with a Power Level of 1.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Spirit Lantern",
    type: "enchanted-item",
    points: 25,
    effect:
      "Extremely Common. The bearer causes Terror. The bearer may re-roll any rolls To Wound of a natural 1 against enemy models that are 'Daemonic' or 'Undead'.",
    phases: ["combat"],
    extremely: true,
  },
  {
    name: "Ring of Jet",
    type: "enchanted-item",
    points: 30,
    effect:
      "The wielder can cast the Unquiet Spirits spell from the Lore of Necromancy as a Bound Spell, with a Power Level of 1.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Golden Lion",
    type: "enchanted-item",
    points: 25,
    effect:
      "The bearer and their unit may re-roll any failed Fear, Panic, Rally or Terror test.",
    phases: ["passive"],
  },
  {
    name: "The Fires of Nan-Gau",
    type: "enchanted-item",
    points: 20,
    effect: "Extremely Common. 0-1 per model. Single use. Breath weapon.",
    phases: ["combat"],
    extremely: true,
  },
  // Magic Standards
  {
    name: "Standard of Wei-Jin",
    type: "banner",
    points: 60,
    effect:
      'A unit carrying this banner causes Fear. All enemy units within 12" suffer a -1 modifier to their Leadership when making a Fear, Panic or Terror test.',
    phases: ["combat"],
  },
  {
    name: "Banner of the Dragon's Wrath",
    type: "banner",
    points: 45,
    effect:
      "A unit carrying this banner gains Flaming Attacks and Impact Hits (1).",
    phases: ["combat"],
  },
  {
    name: "Icon of Heavenly Fury",
    type: "banner",
    points: 45,
    effect:
      "Single use. During the Command sub-phase, if not engaged in combat, the bearer may make a Leadership test. If passed, until your next Start of Turn sub-phase enemy units cannot use the Fly (X) special rule.",
    phases: ["combat"],
  },
  {
    name: "The Jade Banner",
    type: "banner",
    points: 40,
    effect:
      "When calculating combat result, a unit carrying this banner may claim an additional +2 combat result points.",
    phases: ["combat"],
  },
  {
    name: "Dragon's Eye Banner",
    type: "banner",
    points: 30,
    effect:
      "When an enemy Wizard chooses a unit carrying this banner as the target of a spell, roll a D6. On a 4+, the Wizard must choose another target. If there is no other viable target in range, the spell cannot be cast.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "The Shroud of Shiyama",
    type: "banner",
    points: 25,
    effect:
      "A unit carrying this banner gains Fear. If they already have Fear, they instead gain Terror.",
    phases: ["passive"],
  },
  {
    name: "Banner of the Bastion",
    type: "banner",
    points: 25,
    effect: "A unit carrying this banner gains the Shieldwall special rule.",
    phases: ["combat"],
  },
  {
    name: "The Banner of Xen Wun",
    type: "banner",
    points: 15,
    effect:
      "Enemy units wishing to declare a Stand & Shoot or Fire & Flee charge reaction against this unit must first make a Leadership test. If failed, they must Hold instead.",
    phases: ["movement"],
  },
];
