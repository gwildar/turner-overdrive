export default [
  // ─── Dwarfs ──────────────────────────────────────────────────────────
  // Weapon Runes
  {
    name: "Master Rune of Smiting",
    type: "weapon",
    points: 75,
    effect: "The weapon gains Multiple Wounds (D6).",
    phases: ["combat"],
  },
  {
    name: "Master Rune of Skalf Blackhammer",
    type: "weapon",
    points: 65,
    effect:
      "When rolling To Wound, a roll of 2+ is always a success regardless of Toughness.",
    phases: ["combat"],
  },
  {
    name: "Master Rune of Alaric the Mad",
    type: "weapon",
    points: 45,
    effect:
      "No armour save is permitted against wounds caused. Ward and Regeneration saves allowed.",
    phases: ["combat"],
  },
  {
    name: "Rune of Parrying",
    type: "weapon",
    points: 35,
    effect:
      "Enemy models directing attacks against the wielder in Combat suffer -1 To Hit.",
    phases: ["combat"],
  },
  {
    name: "Master Rune of Dragon Slaying",
    type: "weapon",
    points: 35,
    effect:
      "When rolling To Wound against behemoths, a roll of 2+ is always a success regardless of Toughness.",
    phases: ["combat"],
  },
  {
    name: "Rune of Banishment",
    type: "weapon",
    points: 25,
    effect:
      "Enemy models with Warp-spawned cannot make Ward saves against hits from this weapon.",
    phases: ["combat"],
  },
  {
    name: "Master Rune of Breaking",
    type: "weapon",
    points: 25,
    effect:
      "Any magic weapon carried by an enemy suffering unsaved wounds is destroyed for the remainder of the game.",
    phases: ["combat"],
  },
  {
    name: "Master Rune of Flight",
    type: "weapon",
    points: 25,
    effect:
      'Hand weapon only. May be thrown once per turn. Range 12", S user. Magical Attacks, Move & Shoot, Quick Shot.',
    phases: ["shooting"],
  },
  {
    name: "Master Rune of Swiftness",
    type: "weapon",
    points: 25,
    effect: "The wielder gains Strike First.",
    phases: ["combat"],
  },
  {
    name: "Rune of Fury",
    type: "weapon",
    points: 25,
    effect: "For each Rune of Fury inscribed, the wielder gains +1 Attacks.",
    phases: ["combat"],
  },
  {
    name: "Grudge Rune",
    type: "weapon",
    points: 20,
    effect:
      "For each Grudge Rune inscribed, the wielder may re-roll a single To Hit roll of natural 1 in Combat.",
    phases: ["combat"],
  },
  {
    name: "Rune of Might",
    type: "weapon",
    points: 20,
    effect: "For each Rune of Might inscribed, the wielder gains +1 Strength.",
    phases: ["combat"],
  },
  {
    name: "Rune of Cleaving",
    type: "weapon",
    points: 15,
    effect:
      "Hand weapon only. For each Rune of Cleaving inscribed, AP is improved by 1.",
    phases: ["combat"],
  },
  {
    name: "Rune of Striking",
    type: "weapon",
    points: 15,
    effect: "For each Rune of Striking inscribed, the wielder gains +1 WS.",
    phases: ["combat"],
  },
  {
    name: "Rune of Fire",
    type: "weapon",
    points: 10,
    effect: "The wielder gains Flaming Attacks.",
    phases: ["combat"],
  },
  {
    name: "Rune of Speed",
    type: "weapon",
    points: 5,
    effect:
      "For each Rune of Speed inscribed, the wielder gains +1 Initiative.",
    phases: ["combat"],
  },
  // Armour Runes
  {
    name: "Master Rune of Adamant",
    type: "armour",
    points: 100,
    effect:
      "The wearer has a Toughness of 10. Cannot be combined with other Armour runes.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Master Rune of Gromril",
    type: "armour",
    points: 45,
    effect: "The wearer has an armour value of 2+ which cannot be improved.",
    phases: ["combat", "shooting"],
    armourBase: 2,
  },
  {
    name: "Rune of Iron",
    type: "armour",
    points: 35,
    effect: "+1 Wound.",
    phases: ["passive"],
  },
  {
    name: "Rune of Fortitude",
    type: "armour",
    points: 30,
    effect: "For each Rune of Fortitude inscribed, +1 Toughness (max 10).",
    phases: ["combat", "shooting"],
  },
  {
    name: "Rune of Preservation",
    type: "armour",
    points: 25,
    effect:
      "Immune to Killing Blow and Multiple Wounds (X). If struck, loses only a single Wound.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Rune of Shielding",
    type: "armour",
    points: 15,
    effect: "One Rune: 6+ Ward save. Each additional Rune improves by 1.",
    phases: ["combat", "shooting"],
    ward: "6+",
  },
  {
    name: "Rune of Stone",
    type: "armour",
    points: 5,
    effect:
      "Single use. For each Rune of Stone inscribed, may re-roll a single failed Armour Save.",
    phases: ["combat", "shooting"],
  },
  // Talisman Runes
  {
    name: "Master Rune of Calm",
    type: "talisman",
    points: 50,
    effect:
      'Bound Hex spell, Power Level 2. At 8+: enemy Wizards within 18" must increase casting value by 2. At 11+: within 36". Lasts until next Start of Turn.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Master Rune of Balance",
    type: "talisman",
    points: 35,
    effect:
      "Runesmiths/Anvil of Doom only. Once per turn, when attempting a Wizardly dispel, roll an extra D6 and discard the lowest.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Master Rune of Spite",
    type: "talisman",
    points: 35,
    effect:
      "Each time the bearer loses a Wound to an enemy attack in Combat, the attacking unit suffers a S5, AP -2 hit.",
    phases: ["combat"],
  },
  {
    name: "Rune of Spellbreaking",
    type: "talisman",
    points: 25,
    effect:
      "Runesmiths/Anvil of Doom only. Single use. May be used instead of a dispel attempt to automatically dispel a spell.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Rune of Warding",
    type: "talisman",
    points: 20,
    effect:
      "Single use. Each Rune of Warding gives a 2+ Ward save against a single wound.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Rune of Luck",
    type: "talisman",
    points: 15,
    effect:
      "Single use. May re-roll a single failed To Hit, To Wound, or Armour Save roll.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Rune of the Furnace",
    type: "talisman",
    points: 5,
    effect: "3+ Ward save against Flaming Attacks.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Rune of Passage",
    type: "talisman",
    points: 5,
    effect: "The bearer and their unit gains Move Through Cover.",
    phases: ["passive"],
  },
  // Banner Runes
  {
    name: "Master Rune of Grungni",
    type: "banner",
    points: 80,
    effect:
      'The unit gains a 5+ Ward save. Friendly units within 6" gain a 6+ Ward save during the Shooting phase.',
    phases: ["passive"],
    ward: "5+",
  },
  {
    name: "Master Rune of Stromni Redbeard",
    type: "banner",
    points: 75,
    effect:
      "When calculating combat result, any friendly unit within Command range may claim +1 combat result point.",
    phases: ["combat"],
  },
  {
    name: "Master Rune of Hesitation",
    type: "banner",
    points: 45,
    effect:
      "An enemy unit charging the front arc does not count as having charged for weapons or special rules purposes.",
    phases: ["combat"],
  },
  {
    name: "Rune of Confusion",
    type: "banner",
    points: 35,
    effect: "Any enemy unit charging the front arc makes a disordered charge.",
    phases: ["combat"],
  },
  {
    name: "Rune of Fear",
    type: "banner",
    points: 30,
    effect: "The unit gains the Fear special rule.",
    phases: ["passive"],
  },
  {
    name: "Rune of Battle",
    type: "banner",
    points: 25,
    effect:
      "When calculating combat result, the unit may claim +1 combat result point.",
    phases: ["combat"],
  },
  {
    name: "Strollaz' Rune",
    type: "banner",
    points: 25,
    effect: "The unit gains Vanguard.",
    phases: ["passive"],
  },
  {
    name: "Rune of Courage",
    type: "banner",
    points: 15,
    effect: "The unit automatically passes any Fear or Terror tests.",
    phases: ["passive"],
  },
  // Engineering Runes
  {
    name: "Master Rune of Immolation",
    type: "enchanted-item",
    points: 30,
    effect:
      "Cannon only. Single use. If the cannon loses its last Wound in Combat, every enemy unit in base contact suffers D6 S5, AP -2 hits. The cannon is then removed.",
    phases: ["combat"],
  },
  {
    name: "Master Rune of Disguise",
    type: "enchanted-item",
    points: 25,
    effect: "The war machine is always considered to be behind full cover.",
    phases: ["passive"],
  },
  {
    name: "Rune of Skewering",
    type: "enchanted-item",
    points: 20,
    effect:
      "Bolt thrower only. +1 Strength and targets hit cannot make armour saves. Ward and Regeneration saves allowed.",
    phases: ["shooting"],
  },
  {
    name: "Rune of Forging",
    type: "enchanted-item",
    points: 15,
    effect: "Single use. May re-roll one misfire result on the Artillery dice.",
    phases: ["shooting"],
  },
  {
    name: "Rune of Burning",
    type: "enchanted-item",
    points: 10,
    effect: "The war machine gains Flaming Attacks.",
    phases: ["passive"],
  },
  {
    name: "Stalwart Rune",
    type: "enchanted-item",
    points: 5,
    effect:
      "When calculating combat result, the war machine may claim +1 combat result point.",
    phases: ["combat"],
  },
  {
    name: "Rune of Reloading",
    type: "enchanted-item",
    points: 5,
    effect:
      "The war machine can shoot every turn, even if it misfired and malfunctioned the previous turn.",
    phases: ["passive"],
  },

  // ─── engineers-weapon-runes ─────────────────────────────
  {
    name: `Enchanted Rune`,
    type: "weapon",
    points: 5,
    effect: `A weapon inscribed with this rune gains the Magical Attacks special rule.`,
    phases: ["shooting"],
  },
  {
    name: `Master Rune of Bursting Flame`,
    type: "weapon",
    points: 35,
    effect: `If the roll To Hit is successful, a weapon inscribed with this rune causes 2D3 hits to the target enemy unit, rather than the usual one hit.`,
    phases: ["shooting"],
  },
  {
    name: `Master Rune of Piercing`,
    type: "weapon",
    points: 40,
    effect: `A weapon inscribed with this rune has a +1 modifier to its Strength characteristic. In addition, a weapon inscribed with this rune shoots like a bolt thrower, using the Through & Through special rule.`,
    phases: ["shooting"],
  },
  {
    name: `Master Rune of Slaying`,
    type: "weapon",
    points: 50,
    effect: `When making a roll To Wound against an enemy whose troop type is behemoth with a weapon inscribed with this rune, a roll of 3+ is always a success regardless of the target's Toughness. In addition, a weapon inscribed with this rune gains the Multiple Wounds (D3) special rule.`,
    phases: ["shooting"],
  },
  {
    name: `Rune of Accuracy`,
    type: "weapon",
    points: 20,
    effect: `A weapon inscribed with this rune does not suffer any negative To Hit modifiers.`,
    phases: ["shooting"],
  },
  {
    name: `Rune of Concussive Force`,
    type: "weapon",
    points: 30,
    effect: `A unit hit with an attack made by a weapon inscribed with this rune gains the Stupidity special rule until your next Start of Turn sub-phase.`,
    phases: ["shooting"],
  },
  {
    name: `Rune of Molten Steel`,
    type: "weapon",
    points: 10,
    effect: `A weapon inscribed with this rune gains the Flaming Attacks special rule.`,
    phases: ["shooting"],
  },
  {
    name: `Rune of Rapid Fire`,
    type: "weapon",
    points: 15,
    effect: `A weapon inscribed with this rune gains the Multiple Shots (2) and Quick Shot special rules.`,
    phases: ["shooting"],
  },

  // ─── magic-weapons ─────────────────────────────
  {
    name: `Dragonblade`,
    type: "weapon",
    points: 0,
    effect: `Notes: Dragonblade is inscribed with a Rune of Fury and a Grudge Rune, as described in Forces of Fantasy.`,
    phases: ["combat"],
  },

  // ─── runic-tattoos ─────────────────────────────
  {
    name: `Rune of Blazing Fury`,
    type: "talisman",
    points: 5,
    effect: `A model with this runic tattoo has the Flaming Attacks special rule.`,
    phases: ["combat"],
  },
  {
    name: `Rune of Endless Battle`,
    type: "talisman",
    points: 40,
    effect: `During the Combat phase of any turn in which a model with this runic tattoo charged, every attack it makes that causes an unsaved wound allows it to immediately make one additional attack. Note that any additional attacks that cause unsaved wounds and any unsaved wounds caused by the Impact Hits (X) special rule do not benefit from this special rule.`,
    phases: ["combat"],
  },
  {
    name: `Rune of Grit`,
    type: "talisman",
    points: 25,
    effect: `A model with this runic tattoo has a +1 modifier to its Toughness characteristic.`,
    phases: ["passive"],
  },
  {
    name: `Rune of the Dauntless`,
    type: "talisman",
    points: 15,
    effect: `A model with this runic tattoo must always issue and accept challenges (if possible). During a challenge, this model may re-roll any failed rolls To Hit.`,
    phases: ["combat"],
  },
  {
    name: `Rune of the Dishonoured`,
    type: "talisman",
    points: 50,
    effect: `Daemon Slayers and Dragon Slayers only. Once a model with this runic tattoo is reduced to their last Wound, they gain a 3+ Ward save against any further wounds suffered. However, at the end of the battle, a model with this runic tattoo that has been slain is worth no Victory Points. If it is still alive, the enemy player wins a bonus number of Victory Points equal to 100% of its points cost.`,
    phases: ["combat"],
  },
  {
    name: `Rune of the Hateful`,
    type: "talisman",
    points: 30,
    effect: `A model with this runic tattoo gains the Hatred (all enemies) special rule.`,
    phases: ["combat"],
  },
  {
    name: `Rune of the Reckless`,
    type: "talisman",
    points: 35,
    effect: `A model with this runic tattoo gains the Frenzy special rule and, during the Combat phase, has a +1 modifier to their rolls To Hit. However, enemy models that target this model during the Combat phase also have a +1 modifier to their rolls To Hit.`,
    phases: ["combat"],
  },
  {
    name: `Rune of Wrath`,
    type: "talisman",
    points: 15,
    effect: `A model with this runic tattoo has a +1 modifier to its Attacks characteristic.`,
    phases: ["combat"],
  },
  {
    name: `Warrior's Rune`,
    type: "talisman",
    points: 10,
    effect: `A model with this runic tattoo has a +1 modifier to its Weapon Skill characteristic.`,
    phases: ["combat"],
  },
];
