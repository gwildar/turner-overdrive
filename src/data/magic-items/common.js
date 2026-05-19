export default [
  // ─── Magic Weapons ──────────────────────────────────────────────────
  {
    name: "Ogre Blade",
    type: "weapon",
    points: 75,
    effect: "Armour Bane (1), Magical Attacks, Multiple Wounds (D3).",
    phases: ["combat"],
    s: "S+2",
    ap: "-2",
  },
  {
    name: "Cackling Blade",
    type: "weapon",
    points: 65,
    effect:
      "Extra Attacks (+D6), Magical Attacks. Natural 6 on Extra Attacks roll: wielder loses a Wound.",
    phases: ["combat"],
    s: "S+1",
    ap: "-1",
    attacks: "+D6",
  },
  {
    name: "Sword of Battle",
    type: "weapon",
    points: 60,
    effect: "Armour Bane (1), Extra Attacks (+1), Magical Attacks.",
    phases: ["combat"],
    s: "S+1",
    ap: "-1",
    attacks: "+1",
  },
  {
    name: "Duellist's Blades",
    type: "weapon",
    points: 55,
    effect: "Extra Attacks (+2), Magical Attacks, Requires Two Hands.",
    phases: ["combat"],
    s: "S",
    ap: "-1",
    attacks: "+2",
  },
  {
    name: "Dragon Slaying Sword",
    type: "weapon",
    points: 50,
    effect: "Magical Attacks, Monster Slayer.",
    phases: ["combat"],
    s: "S",
    ap: "—",
  },
  {
    name: "Meteor Hammer",
    type: "weapon",
    points: 50,
    effect:
      "Magical Attacks, Requires Two Hands. To Wound: 3+ always succeeds.",
    phases: ["combat"],
    s: "S",
    ap: "-3",
  },
  {
    name: "Headsman's Axe",
    type: "weapon",
    points: 45,
    effect: "Killing Blow, Magical Attacks, Requires Two Hands.",
    phases: ["combat"],
    s: "S+1",
    ap: "-1",
  },
  {
    name: "Spelleater Axe",
    type: "weapon",
    points: 35,
    effect: "Magical Attacks, Magic Resistance (-2).",
    phases: ["combat", "strategy", "shooting"],
    subPhases: ["combat"],
    s: "S",
    ap: "-1",
    mr: -2,
  },
  {
    name: "Giant Blade",
    type: "weapon",
    points: 30,
    effect: "Armour Bane (2), Magical Attacks, Multiple Wounds (2).",
    phases: ["combat"],
    s: "S+1",
    ap: "—",
  },
  {
    name: "Hell-forged Axe",
    type: "weapon",
    points: 30,
    effect: "Armour Bane (3), Flaming Attacks, Magical Attacks.",
    phases: ["combat"],
    s: "S+1",
    ap: "-1",
  },
  {
    name: "Sword of Sorrow",
    type: "weapon",
    points: 30,
    effect:
      'Range 30", S5, AP -1. Armour Bane (2), Magical Attacks, Multiple Wounds (2). Missile weapon only. No Ward or Regeneration saves.',
    phases: ["shooting"],
    s: "5",
    ap: "-1",
  },
  {
    name: "Sword of Swiftness",
    type: "weapon",
    points: 25,
    effect: "Magical Attacks, Strike First.",
    phases: ["combat"],
    s: "S",
    ap: "—",
  },
  {
    name: "Berserker Blade",
    type: "weapon",
    points: 20,
    effect: "Extra Attacks (+1), Impetuous, Magical Attacks.",
    phases: ["combat", "movement"],
    extremely: true,
    s: "S+1",
    ap: "—",
    attacks: "+1",
  },
  {
    name: "Sword of Might",
    type: "weapon",
    points: 20,
    effect: "Magical Attacks.",
    phases: ["combat"],
    extremely: true,
    s: "S+1",
    ap: "-1",
  },
  {
    name: "Biting Blade",
    type: "weapon",
    points: 15,
    effect: "Armour Bane (1), Magical Attacks.",
    phases: ["combat"],
    s: "S",
    ap: "-2",
  },
  {
    name: "Sword of Striking",
    type: "weapon",
    points: 15,
    effect: "Magical Attacks. +1 To Hit in combat.",
    phases: ["combat"],
    extremely: true,
    s: "S",
    ap: "—",
  },
  {
    name: "Burning Blade",
    type: "weapon",
    points: 5,
    effect: "Flaming Attacks, Magical Attacks.",
    phases: ["combat"],
    extremely: true,
    s: "S",
    ap: "—",
  },

  // ─── Magic Armour ───────────────────────────────────────────────────
  {
    name: "Armour of Destiny",
    type: "armour",
    points: 70,
    effect:
      "Heavy armour. The wearer has a 4+ Ward save against any wounds suffered.",
    phases: ["combat", "shooting"],
    armourBase: 5,
    ward: "4+",
  },
  {
    name: "Bedazzling Helm",
    type: "armour",
    points: 60,
    effect:
      "Infantry or cavalry only. May be worn with other armour. Improves armour value by 1 (max 2+). Any enemy model directing attacks against the wearer during the Combat phase suffers -1 To Hit.",
    phases: ["combat"],
    armourMod: -1,
  },
  {
    name: "Armour of Silvered Steel",
    type: "armour",
    points: 40,
    effect:
      "Gives the wearer an armour value of 3+ which cannot be improved in any way.",
    phases: ["combat", "shooting"],
    armourBase: 3,
  },
  {
    name: "Glittering Scales",
    type: "armour",
    points: 35,
    effect:
      "Light armour. Once per turn, you may make your opponent re-roll a single roll To Hit made against the wearer.",
    phases: ["combat", "shooting"],
    armourBase: 6,
  },
  {
    name: "Shield of the Warrior True",
    type: "armour",
    points: 30,
    effect:
      "Shield. The bearer has a 5+ Ward save against any wounds suffered during the Shooting phase.",
    phases: ["shooting"],
  },
  {
    name: "Levitating Shield",
    type: "armour",
    points: 25,
    effect:
      "Infantry only. Shield. The bearer may use it alongside a weapon with the Requires Two Hands special rule during combat.",
    phases: ["combat"],
  },
  {
    name: "Spellshield",
    type: "armour",
    points: 25,
    effect:
      "Shield. The bearer has a 5+ Ward save against any wounds suffered that were caused by a Magic Missile, a Magical Vortex, or an Assailment spell.",
    phases: ["shooting"],
    subPhases: ["combat"],
  },
  {
    name: "Armour of Meteoric Iron",
    type: "armour",
    points: 20,
    effect:
      "Gives the wearer an armour value of 5+ which cannot be improved or reduced in any way.",
    phases: ["combat"],
    armourBase: 5,
  },
  {
    name: "Trailblazer's Hauberk",
    type: "armour",
    points: 20,
    effect:
      "Infantry only. Heavy armour. The wearer gains Move Through Cover and Scouts special rules.",
    phases: ["movement"],
    armourBase: 5,
  },
  {
    name: "Enchanted Shield",
    type: "armour",
    points: 10,
    effect:
      "Shield. The bearer has a 6+ Ward save against any wounds suffered that were caused by a non-magical enemy attack.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Charmed Shield",
    type: "armour",
    points: 5,
    effect:
      "Shield. Single use. Gives the bearer a 5+ Ward save against a single wound. After use, becomes an ordinary non-magical shield.",
    phases: ["combat", "shooting"],
  },

  // ─── Talismans ──────────────────────────────────────────────────────
  {
    name: "Dawnstone",
    type: "talisman",
    points: 35,
    effect: "The bearer may re-roll any Armour Save roll of a natural 1.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Icon of Fortitude",
    type: "talisman",
    points: 35,
    effect:
      "Infantry or cavalry only. The bearer is immune to the Multiple Wounds (X) special rule. If wounded by such an attack, they suffer a single wound.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Ironhide Talisman",
    type: "talisman",
    points: 30,
    effect:
      "Infantry only. Any enemy model that makes a successful roll To Hit against the bearer during the Shooting phase or Combat phase must re-roll any rolls To Wound of a natural 6. Does not work against attacks that hit automatically.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Talisman of Protection",
    type: "talisman",
    points: 30,
    effect: "Gives the bearer a 5+ Ward save against any wounds suffered.",
    phases: ["combat", "shooting"],
    ward: "5+",
  },
  {
    name: "Paymaster's Coin",
    type: "talisman",
    points: 25,
    effect:
      "Single use. The bearer can re-roll any failed rolls To Hit made during the Combat phase.",
    phases: ["combat"],
    extremely: true,
  },
  {
    name: "Obsidian Lodestone",
    type: "talisman",
    mr: -1,
    points: 20,
    effect:
      "May purchase up to three. One gives Magic Resistance (-1), two gives (-2), three gives (-3).",
    phases: ["strategy"],
    subPhases: ["conjuration"],
    extremely: true,
  },
  {
    name: "Luckstone",
    type: "talisman",
    points: 15,
    effect:
      "Single use. The bearer can re-roll a single failed Armour Save roll.",
    phases: ["combat", "shooting"],
    extremely: true,
  },

  // ─── Arcane Items ───────────────────────────────────────────────────
  {
    name: "Feedback Scroll",
    type: "arcane-item",
    points: 60,
    effect:
      "Single use. May be used instead of a Wizardly dispel attempt. The spell is cast as normal. Once resolved, roll 2D6; for each 4+, the casting Wizard loses a single Wound.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Scroll of Transmogrification",
    type: "arcane-item",
    points: 50,
    effect:
      "Single use. May be used instead of a Wizardly dispel attempt. The spell is cast as normal. The casting player must then roll equal to or lower than the Wizard's Level on a D6. If failed, the Wizard turns into a frog (all characteristics except Wounds become 1, cannot cast/dispel/use equipment). Roll D6 each Start of Turn sub-phase; on 4+ the Wizard returns to normal.",
    phases: ["strategy"],
    subPhases: ["conjuration", "start-of-turn"],
  },
  {
    name: "Wand of Jet",
    type: "arcane-item",
    points: 45,
    effect:
      "The bearer may apply a +1 modifier to any Casting or Dispel roll. If any natural double is rolled, the Wand is destroyed. Does not negate a natural double 1.",
    phases: ["strategy", "shooting"],
    subPhases: ["conjuration"],
  },
  {
    name: "Staff of Quietude",
    type: "arcane-item",
    points: 35,
    effect:
      "During the Command sub-phase, the bearer can attempt a Leadership test. If passed, all Remains in Play spells currently in play are dispelled, including friendly ones.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Lore Familiar",
    type: "arcane-item",
    points: 30,
    effect:
      "The owner does not randomly generate spells. Instead, they may choose which spells they know from their chosen lore (including the signature spell).",
    phases: ["passive"],
  },
  {
    name: "Scroll of Disruption",
    type: "arcane-item",
    points: 30,
    effect:
      "Once per turn, the bearer may re-roll a Dispel roll. All dice are re-rolled, including any bonus or discard dice.",
    phases: ["strategy", "shooting"],
    subPhases: ["conjuration"],
  },
  {
    name: "Tome of Spellcraft",
    type: "arcane-item",
    points: 30,
    effect:
      "Once per turn, the bearer may re-roll a Casting roll. All dice are re-rolled, including any bonus or discard dice.",
    phases: ["strategy", "shooting"],
    subPhases: ["conjuration"],
    yourTurnOnly: true,
  },
  {
    name: "Dispel Scroll",
    type: "arcane-item",
    points: 20,
    effect:
      "Single use. May be used when attempting a Wizardly dispel. Roll an extra D6 on the Dispel roll and discard the lowest. If double 1 is rolled on any two dice, the Wizard is outclassed.",
    phases: ["strategy", "shooting"],
    subPhases: ["conjuration"],
  },
  {
    name: "Power Scroll",
    type: "arcane-item",
    points: 20,
    effect:
      "Single use. May be used when attempting to cast a spell. Roll an extra D6 on the Casting roll and discard the lowest. If double 1 is rolled on any two dice, the spell is miscast.",
    phases: ["strategy", "shooting"],
    subPhases: ["conjuration"],
    yourTurnOnly: true,
  },
  {
    name: "Arcane Familiar",
    type: "arcane-item",
    points: 15,
    effect:
      "The owner knows spells from two Lores of Magic rather than one. Roll for each Lore separately. May discard one randomly generated spell and replace it with the signature spell of the same Lore.",
    phases: ["passive"],
  },
  {
    name: "Earthing Rod",
    type: "arcane-item",
    points: 5,
    effect:
      "Single use. If the Wizard miscasts, they may re-roll the result on the Miscast table.",
    phases: ["strategy", "shooting"],
    subPhases: ["conjuration"],
  },

  // ─── Enchanted Items ────────────────────────────────────────────────
  {
    name: "Wizarding Hat",
    type: "enchanted-item",
    points: 45,
    effect:
      "The wearer is a Level 1 Wizard and knows one randomly generated spell from a Lore of Magic of your choosing. The wearer also becomes subject to the Stupidity special rule.",
    phases: ["strategy", "shooting"],
    subPhases: ["conjuration"],
  },
  {
    name: "Arch-Lightning Rod",
    type: "enchanted-item",
    points: 40,
    effect:
      "Single use. During the Command sub-phase, if not engaged in combat, the bearer may attempt a Leadership test (unmodified). If passed, until your next Start of Turn sub-phase enemy units cannot use the Fly (X) special rule.",
    phases: ["strategy"],
    subPhases: ["command"],
    yourTurnOnly: true,
  },
  {
    name: "Flying Carpet",
    type: "enchanted-item",
    points: 40,
    effect:
      "Regular infantry or heavy infantry only. The bearer gains Fly (8) and Swiftstride. However, the bearer cannot join a unit.",
    phases: ["movement"],
  },
  {
    name: "Healing Potion",
    type: "enchanted-item",
    points: 35,
    effect:
      "Single use. During the Command sub-phase, the bearer can consume it. The model immediately recovers D3 lost Wounds.",
    phases: ["strategy"],
    subPhases: ["command"],
    extremely: true,
  },
  {
    name: "Ruby Ring of Ruin",
    type: "enchanted-item",
    points: 35,
    effect:
      'The wielder can cast the Fireball spell from the Lore of Battle Magic as a Bound spell, with a Power Level of 1. Fireball, Casting Value: 8+, Range 24"',
    phases: ["shooting"],
    yourTurnOnly: true,
  },
  {
    name: "Potion of Fervour",
    type: "enchanted-item",
    points: 30,
    effect:
      "Single use. During the Command sub-phase, the bearer can consume it. Until the end of that turn, the model has a +D3 modifier to its Attacks characteristic (max 10).",
    phases: ["strategy", "combat"],
    subPhases: ["command"],
  },
  {
    name: "Potion of Strength",
    type: "enchanted-item",
    points: 25,
    effect:
      "Single use. During the Command sub-phase, the bearer can consume it. Until the end of that turn, the model has a +D3 modifier to its Strength characteristic (max 10).",
    phases: ["strategy", "combat"],
    subPhases: ["command"],
    extremely: true,
  },
  {
    name: "Becalming Orb",
    type: "enchanted-item",
    points: 20,
    effect:
      "Single use. The bearer may cast a Bound spell (Power Level 1): Hex, Casting Value 8+, Range: Self. Until your next Start of Turn sub-phase, enemy Wizards within 15\" when attempting to cast must increase that spell's casting value by 2.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Potion of Toughness",
    type: "enchanted-item",
    points: 20,
    effect:
      "Single use. During the Command sub-phase, the bearer can consume it. Until the end of that turn, the model has a +D3 modifier to its Toughness characteristic (max 10).",
    phases: ["strategy", "combat", "shooting"],
    subPhases: ["command"],
    extremely: true,
  },
  {
    name: "Potion of Speed",
    type: "enchanted-item",
    points: 10,
    effect:
      "Single use. During the Command sub-phase, the bearer can consume it. Until the end of that turn, the model has a +D3 modifier to its Initiative characteristic (max 10).",
    phases: ["strategy", "combat"],
    subPhases: ["command"],
    extremely: true,
  },
  {
    name: "Potion of Foolhardiness",
    type: "enchanted-item",
    points: 5,
    effect:
      "Single use. During the Command sub-phase, the bearer can consume it. Until the end of that turn, the model gains the Immune To Psychology special rule.",
    phases: ["strategy"],
    subPhases: ["command"],
    extremely: true,
  },

  // ─── Magic Standards (Banners) ──────────────────────────────────────
  {
    name: "Banner of Iron Resolve",
    type: "banner",
    points: 50,
    effect: "The unit gains the Stubborn special rule.",
    phases: ["combat"],
  },
  {
    name: "Banner of the Steadfast",
    type: "banner",
    points: 50,
    effect:
      "Infantry only. If the unit belongs to the losing side of a Combat, it can Fall Back in Good Order even if the winning side has more than twice its Unit Strength.",
    phases: ["combat"],
  },
  {
    name: "Totem of Wrath",
    type: "banner",
    points: 50,
    effect:
      "During a turn in which the unit charged, models improve the Armour Piercing characteristic of their weapons by 1, and may re-roll any rolls To Wound of a natural 1.",
    phases: ["combat"],
    label: "+1AP, re-roll 1s to wound (on charge)",
  },
  {
    name: "Razor Standard",
    type: "banner",
    points: 40,
    effect: "The unit gains the Armour Bane (2) special rule.",
    phases: ["combat"],
    subPhases: ["choose-fight"],
    armourBane: 2,
  },
  {
    name: "Banner of Swirling Wind",
    type: "banner",
    points: 30,
    effect:
      "Any enemy model that shoots at the unit suffers an additional -1 To Hit modifier.",
    phases: ["shooting"],
    opponentOnly: true,
  },
  {
    name: "Rampaging Banner",
    type: "banner",
    points: 30,
    effect: "When the unit declares a charge, it may re-roll its Charge roll.",
    phases: ["movement"],
    chargeMod: { range: 0, tag: "Rampage", color: "orange", order: 10 },
  },
  {
    name: "The Blazing Banner",
    type: "banner",
    points: 25,
    effect: "The unit gains the Flaming Attacks special rule.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Monster Hunter's Tapestry",
    type: "banner",
    points: 25,
    effect: "Enemy units may not make Stomp Attacks against the unit.",
    phases: ["combat"],
  },
  {
    name: "War Banner",
    type: "banner",
    points: 25,
    effect:
      "When calculating combat result, the unit may claim an additional +1 combat result point.",
    phases: ["combat"],
    combatResBonus: 1,
  },

  // ─── Tomb Kings of Khemri Magic Weapons ─────────────────────────────
  {
    name: "Destroyer of Eternities",
    type: "weapon",
    points: 75,
    effect:
      "Killing Blow, Magical Attacks, Requires Two Hands, Strike Last. Each time the wielder rolls a natural 6 To Hit, they may make D6 additional hits against the same target instead of just 1.",
    phases: ["combat"],
    s: "S+2",
    ap: "-2",
  },
  {
    name: "The Conqueror's Blade",
    type: "weapon",
    points: 55,
    effect:
      "Killing Blow (5+), Magical Attacks, Requires Two Hands, Strike Last.",
    phases: ["combat"],
    s: "S+2",
    ap: "-2",
  },
  {
    name: "Crook & Flail of Radiance",
    type: "weapon",
    points: 50,
    effect:
      "Extra Attacks (+D3), Magical Attacks, Requires Two Hands, Strike First.",
    phases: ["combat"],
    s: "S",
    ap: "-1",
  },
  {
    name: "Blade of Antarhak",
    type: "weapon",
    points: 45,
    effect:
      "Magical Attacks. Each unsaved wound caused by the wielder restores 1 Wound to the wielder (up to their starting Wounds characteristic).",
    phases: ["combat"],
    s: "S+1",
    ap: "-1",
  },
  {
    name: "Flail of Skulls",
    type: "weapon",
    points: 35,
    effect:
      "Flail. Multiple Wounds (2), Requires Two Hands. Counts as a flail (+2 Strength on the charge only).",
    phases: ["combat"],
    s: "S+3",
    ap: "-1",
  },
  {
    name: "Phakth's Blades of Justice",
    type: "weapon",
    points: 35,
    effect:
      "Magical Attacks. The wielder gains +1 Attack for each full rank in the enemy unit they are engaged with (not counting the front rank).",
    phases: ["combat"],
    s: "S",
    ap: "-1",
  },
  {
    name: "Staff of Aeons",
    type: "weapon",
    points: 30,
    effect:
      "Magical Attacks. Each unsaved wound caused by this weapon permanently reduces the target model's armour save by 1 (to a minimum of none).",
    phases: ["combat"],
    s: "S+2",
    ap: "-1",
  },
  {
    name: "Serpent Staff",
    type: "weapon",
    points: 20,
    effect: "Magical Attacks, Poisoned Attacks, Requires Two Hands.",
    phases: ["combat"],
    s: "S+2",
    ap: "-2",
  },

  // ─── Tomb Kings of Khemri Magic Armour ──────────────────────────────
  {
    name: "Armour of the Ages",
    type: "armour",
    points: 50,
    effect:
      "Heavy armour. Any enemy model that successfully rolls To Wound against the wearer must re-roll that roll.",
    phases: ["combat", "shooting"],
    armourBase: 5,
  },
  {
    name: "Royal Mantle",
    type: "armour",
    points: 40,
    effect:
      "Improves the wearer's armour save by 1 (max 2+). While the wearer is alive, the range of the My Will Be Done special rule is extended by 3\".",
    phases: ["combat", "shooting", "strategy"],
    armourMod: -1,
  },
  {
    name: "Warding Splint",
    type: "armour",
    points: 35,
    effect:
      "Heavy armour. The wearer has a 5+ Ward save against any wounds suffered.",
    phases: ["combat", "shooting"],
    armourBase: 5,
    ward: "5+",
  },
  {
    name: "Shield of Ptra",
    type: "armour",
    points: 25,
    effect:
      "Shield. Any enemy model directing attacks against the wearer during the Combat phase suffers -1 To Hit.",
    phases: ["combat"],
  },

  // ─── Tomb Kings of Khemri Talismans ─────────────────────────────────
  {
    name: "Amulet of the Serpent",
    type: "talisman",
    points: 30,
    effect:
      "The bearer and any unit they join gain the Poisoned Attacks special rule.",
    phases: ["combat"],
    grantsRules: ["poisoned attacks"],
  },
  {
    name: "Crown of Kings",
    type: "talisman",
    points: 30,
    effect:
      "Extremely Common. During the Command sub-phase, the bearer may use the Arise! special rule to restore D3+1 Wounds to their unit instead of the normal amount.",
    phases: ["strategy"],
    subPhases: ["command"],
    extremely: true,
  },
  {
    name: "Collar of Shapesh",
    type: "talisman",
    points: 25,
    effect:
      "Single use. When the bearer suffers a wound that would remove their last Wound, roll a D6. On a 4+, that wound is negated and the Collar is destroyed.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Relic of the Desert Sun",
    type: "talisman",
    points: 25,
    effect:
      "The bearer is immune to the Dry as Dust special rule and the Flammable special rule.",
    phases: ["combat", "shooting"],
  },

  // ─── Tomb Kings of Khemri Enchanted Items ───────────────────────────
  {
    name: "Cloak of the Dunes",
    type: "enchanted-item",
    points: 50,
    effect:
      "The bearer gains the Fly (9) special rule. When the bearer flies over an enemy unit during the Movement phase, that unit suffers D6 Strength 2, AP -1 hits.",
    phases: ["movement", "combat"],
  },
  {
    name: "Staff of Awakening",
    type: "enchanted-item",
    points: 50,
    effect:
      "High Priest only. Whenever the bearer uses the Arise! special rule, any wounds restored are increased by D3.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Orb of Ptra",
    type: "enchanted-item",
    points: 40,
    effect: "All enemy units shooting at the bearer's unit suffer -1 To Hit.",
    phases: ["shooting"],
  },
  {
    name: "Icon of Rulership",
    type: "enchanted-item",
    points: 35,
    effect:
      "Extremely Common. War Chariots in the bearer's unit double the number of Impact Hits they inflict and those hits gain Magical Attacks and AP -2.",
    phases: ["combat"],
    extremely: true,
  },
  {
    name: "Death Mask of Kharnutt",
    type: "enchanted-item",
    points: 20,
    effect:
      "The bearer causes Terror. Any enemy unit that breaks from combat with the bearer's unit suffers an additional -1 to their Leadership for the remainder of the battle.",
    phases: ["combat"],
  },

  // ─── Tomb Kings of Khemri Arcane Items ──────────────────────────────
  {
    name: "Phâzerakt's Kanopi",
    type: "arcane-item",
    points: 40,
    effect:
      'Single use. During the Command sub-phase, the bearer may summon 2D6+3 Skeleton Warriors with hand weapon and shield within 12" of the bearer. They form a new unit.',
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Enkhil's Kanopi",
    type: "arcane-item",
    points: 30,
    effect:
      "Single use. At the start of any Strategy phase, the bearer may dispel all Remains in Play spells currently in play, including friendly ones.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Hieratic Jar",
    type: "arcane-item",
    points: 25,
    effect:
      "Extremely Common. The bearer may use the Arise! special rule twice per Command sub-phase instead of once.",
    phases: ["strategy"],
    subPhases: ["command"],
    extremely: true,
  },
  {
    name: "Curse-Weaver Wand",
    type: "arcane-item",
    points: 20,
    effect:
      "The bearer applies a +1 modifier to any Casting roll made for a hex or direct damage spell.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Scarab Brooch",
    type: "arcane-item",
    points: 20,
    effect:
      'The range of the From Beneath the Sands special rule for the bearer\'s unit is increased to 18" instead of 12".',
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Tablets of Tahoth",
    type: "arcane-item",
    points: 20,
    effect:
      "Extremely Common. May purchase up to three. The bearer applies a +1 modifier to any Casting roll (up to a maximum of +3 from this item).",
    phases: ["strategy"],
    subPhases: ["conjuration"],
    extremely: true,
  },
];
