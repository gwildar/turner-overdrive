export default [
  // ─── Warriors of Chaos ───────────────────────────────────────────────
  {
    name: "Daemonsword",
    type: "weapon",
    points: 75,
    effect:
      "S+D3, AP -2. Extra Attacks (+D3), Magical Attacks, Strike First. Every natural 1 To Hit results in a hit resolved against the wielder's own unit (or the wielder if not in a unit).",
    phases: ["combat"],
  },
  {
    name: "Obsidian Dread-Glaive",
    type: "weapon",
    points: 55,
    effect:
      "S+2, AP -1. Armour Bane (1), Killing Blow, Magical Attacks, Requires Two Hands, Strike Last. Heralds of Darkness only.",
    phases: ["combat"],
  },
  {
    name: "Chaos Runesword",
    type: "weapon",
    points: 45,
    effect:
      "S+1, AP -1. Magical Attacks. The wielder gains +1 WS and +1 Initiative.",
    phases: ["combat"],
  },
  {
    name: "Filth Mace",
    type: "weapon",
    points: 40,
    effect:
      "S+1, AP -1. Magical Attacks. Any enemy model that suffers unsaved wounds must make a Toughness test. If failed, -1 Toughness (min 1) until end of turn.",
    phases: ["combat"],
  },
  {
    name: "Dagger of the Dark Pantheon",
    type: "weapon",
    points: 35,
    effect:
      "S, AP -2. Magical Attacks. For each Wound an enemy unit loses from this weapon, the wielder may apply +1 to their next Casting or Dispel roll.",
    phases: ["combat"],
  },
  {
    name: "Chieftain's Blade",
    type: "weapon",
    points: 30,
    effect:
      "S+1, AP -1. Armour Bane (1), Magical Attacks. Wolves of the Sea only. +1 To Hit whilst in a challenge.",
    phases: ["combat"],
  },
  {
    name: "Taskmaster's Scourge",
    type: "weapon",
    points: 25,
    effect:
      "Extra Attacks (+1), Magical Attacks. Infantry only. During the Command sub-phase, make a Leadership test. If passed, the character and their unit gain +D3 Movement (max 10) until next Start of Turn.",
    phases: ["combat", "strategy"],
    subPhases: ["command"],
  },
  {
    name: "Spellthieving Sword",
    type: "weapon",
    points: 20,
    effect:
      "S-1. Magical Attacks. Any enemy Wizard that suffers unsaved wounds immediately forgets a single spell (random) for the remainder of the game.",
    phases: ["combat"],
  },
  {
    name: "Storm's Wrath",
    type: "weapon",
    points: 0,
    effect:
      "S+2, AP -1. Extra Attacks (+D3), Magical Attacks, Requires Two Hands. Strength modifier applies only against enemy models the wielder charged this turn.",
    phases: ["combat"],
  },
  {
    name: "Armour of the Damned",
    type: "armour",
    points: 70,
    effect:
      "Full plate armour (4+). During Combat, enemy models must re-roll successful To Hit rolls against the wearer.",
    phases: ["combat"],
    armourBase: 4,
  },
  {
    name: "Daemonic Platemail",
    type: "armour",
    points: 50,
    effect:
      "Infantry or cavalry only. Full plate armour (4+). +1 Toughness and +1 Initiative.",
    phases: ["combat", "shooting"],
    armourBase: 4,
  },
  {
    name: "Mighty Serpent's Scalemail",
    type: "armour",
    points: 40,
    effect:
      "Wolves of the Sea only. Heavy armour (5+). The wearer gains Strike First.",
    phases: ["combat", "shooting"],
    armourBase: 5,
  },
  {
    name: "Crimson Armour of Dargan",
    type: "armour",
    points: 40,
    effect:
      "Infantry or cavalry only. Heavy armour (5+). Immune to Multiple Wounds (X); loses only a single Wound from such attacks.",
    phases: ["passive"],
    armourBase: 5,
  },
  {
    name: "Talisman of the Carrion Crow",
    type: "talisman",
    points: 45,
    effect: "The bearer gains Regeneration (5+) and Poisoned Attacks.",
    phases: ["combat", "shooting"],
    regen: "5+",
  },
  {
    name: "Crown of Everlasting Conquest",
    type: "talisman",
    points: 40,
    effect: "The wearer gains Regeneration (5+).",
    phases: ["passive"],
    regen: "5+",
  },
  {
    name: "Talisman of the Soaring Eagle",
    type: "talisman",
    mr: -2,
    points: 35,
    effect:
      "Magic Resistance (-2) and a 5+ Ward save against wounds caused by Magical Attacks.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Brazen Collar",
    type: "talisman",
    mr: -2,
    points: 20,
    effect: "Magic Resistance (-2).",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Skull of Katam",
    type: "arcane-item",
    points: 60,
    effect:
      'The bearer and any other Wizard within 3" (friend or foe) may apply +1 to any Casting roll.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Sceptre of Power",
    type: "arcane-item",
    points: 55,
    effect:
      "+1 to any Casting or Dispel roll. If any natural double is rolled, the bearer suffers a single S10, AP -3 hit after the roll resolves.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Infernal Puppet",
    type: "arcane-item",
    points: 50,
    effect:
      'When an enemy Wizard within 15" makes a Casting roll, the enemy must roll an extra D6 and discard the highest result. Bearer must not be fleeing or engaged.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Grimoire of Ogvold",
    type: "arcane-item",
    points: 50,
    effect:
      "The bearer knows all seven spells from their chosen Lore (including signature). Can only cast a number equal to their Level of Wizardry per turn.",
    phases: ["passive"],
  },
  {
    name: "Tome of the Dark Gods",
    type: "arcane-item",
    points: 35,
    effect:
      "Mark of Chaos Undivided only. When generating spells, may discard randomly generated spells and select spells from the Lore of Chaos as if the bearer had the corresponding Mark.",
    phases: ["passive"],
  },
  {
    name: "Dark Majesty",
    type: "enchanted-item",
    points: 50,
    effect:
      "Unless fleeing, enemy units making Fear or Terror tests within Command range suffer -1 Leadership (min 2).",
    phases: ["passive"],
  },
  {
    name: "Daemon-flesh",
    type: "enchanted-item",
    points: 45,
    effect:
      "This character cannot be wounded by a To Wound roll of 2, regardless of Strength.",
    phases: ["passive"],
  },
  {
    name: "Bloodskull Pendant",
    type: "enchanted-item",
    points: 45,
    effect:
      "Infantry only. Instead of standard attacks, the bearer may deal a single S8, AP -1 hit to every enemy model in base contact. These hits have Killing Blow.",
    phases: ["combat"],
  },
  {
    name: "Rod of the Damned",
    type: "enchanted-item",
    points: 40,
    effect:
      'The bearer may cast The Summoning (Lore of Daemonology) as a Bound Spell with Power Level 2. Magic Missile, range 18", 2D6 S4, AP -1 hits.',
    phases: ["strategy", "shooting"],
    subPhases: ["conjuration"],
  },
  {
    name: "Extra Arm",
    type: "enchanted-item",
    points: 40,
    effect: "+1 Attacks (excluding mount).",
    phases: ["combat"],
  },
  {
    name: "Diabolic Splendour",
    type: "enchanted-item",
    points: 35,
    effect:
      "Infantry or cavalry only. Enemy models targeting this character or their unit during the Shooting phase suffer -1 To Hit.",
    phases: ["shooting"],
  },
  {
    name: "Enchanting Aura",
    type: "enchanted-item",
    points: 35,
    effect:
      "Infantry or cavalry only. Enemy units in combat with this character cannot benefit from Strike First. Enemies without Strike First instead gain Strike Last.",
    phases: ["combat"],
  },
  {
    name: "Daemon-Forged Barding",
    type: "enchanted-item",
    points: 35,
    effect:
      "Cavalry only. Heralds of Darkness only. On a turn in which the bearer charged, their mount and all mounts in their unit gain +1 Attacks.",
    phases: ["combat"],
  },
  {
    name: "Aura of Pain",
    type: "enchanted-item",
    points: 30,
    effect:
      "Single use. When this character's combat is chosen, a single enemy unit they are engaged with suffers D6 S3 hits. No armour or Regeneration saves permitted (Ward saves allowed).",
    phases: ["combat"],
  },
  {
    name: "Pendant of Damnation",
    type: "enchanted-item",
    points: 30,
    effect:
      "Infantry or cavalry only. The bearer gains +1 Attacks for every Wound they lose.",
    phases: ["combat"],
  },
  {
    name: "Master of Mortals",
    type: "enchanted-item",
    points: 25,
    effect:
      "Unless fleeing, friendly Chaos Marauders and Marauder Horsemen within Command range gain +1 Leadership (max 10).",
    phases: ["passive"],
  },
  {
    name: "Helm of Many Eyes",
    type: "enchanted-item",
    points: 20,
    effect:
      "The wearer (excluding mount) gains Strike First. However, the wearer gains Stupidity.",
    phases: ["combat"],
  },
  {
    name: "Acid Ichor",
    type: "enchanted-item",
    points: 15,
    effect:
      "For every Wound this character loses during a challenge, the enemy suffers a S4, AP -2 hit.",
    phases: ["combat"],
  },
  {
    name: "Poisonous Slime",
    type: "enchanted-item",
    points: 15,
    effect: "This character (excluding mount) gains Poisoned Attacks.",
    phases: ["combat"],
  },
  {
    name: "Favour of the Gods",
    type: "enchanted-item",
    points: 5,
    effect:
      "Single use. May re-roll the D6 when rolling on the Gaze of the Gods table.",
    phases: ["combat"],
  },
  {
    name: "Banner of the Gods",
    type: "banner",
    points: 75,
    effect: "The unit ignores all negative modifiers to its Leadership.",
    phases: ["passive"],
  },
  {
    name: "Doom Totem",
    type: "banner",
    points: 65,
    effect:
      "All enemy units that can draw line of sight to the bearer suffer -1 Leadership.",
    phases: ["passive"],
  },
  {
    name: "Banner of the Dark Powers",
    type: "banner",
    mr: -3,
    points: 50,
    effect: "The unit gains Magic Resistance (-3).",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Blasted Standard",
    type: "banner",
    points: 40,
    effect:
      "The unit may re-roll any natural 1s on Armour Save rolls against wounds suffered during the Shooting phase.",
    phases: ["shooting"],
  },
  {
    name: "Banner of Rage",
    type: "banner",
    points: 35,
    effect:
      "The unit gains Frenzy. Unlike other Frenzied units, this unit cannot lose Frenzy.",
    phases: ["combat"],
  },
  {
    name: "Sea Raider's Crest",
    type: "banner",
    points: 25,
    effect:
      "Wolves of the Sea only. The unit gains Fear. If it already has Fear, it gains Terror.",
    phases: ["combat"],
  },
  {
    name: "Banner of the Baying Hound",
    type: "banner",
    points: 25,
    effect: "Heralds of Darkness only. The unit gains Vanguard.",
    phases: ["passive"],
  },
  {
    name: "Icon of Darkness",
    type: "banner",
    points: 20,
    effect:
      "Enemy models targeting the unit during the Shooting phase suffer -1 To Hit.",
    phases: ["shooting"],
  },

  // ─── chaotic-traits ─────────────────────────────
  {
    name: `Battle Hunger`,
    type: "enchanted-item",
    points: 10,
    effect: `Models whose Troop Type is infantry only. A unit which consists entirely of models with this Chaotic Trait increases its maximum possible charge range by 2" and, when making a Charge or Pursuit roll, may apply a + D3 modifier to the result.`,
    phases: ["combat"],
  },
  {
    name: `Brazen Will`,
    type: "enchanted-item",
    points: 10,
    effect: `Models whose Troop Type is infantry or cavalry only. A unit with this Chaotic Trait gains the Magic Resistance (-1) special rule.`,
    phases: ["combat"],
  },
  {
    name: `Dark Hearts`,
    type: "enchanted-item",
    points: 20,
    effect: `Models whose Troop Type is infantry or cavalry only. If the winning side of a combat includes one or more units in which the majority of models have this Chaotic Trait, each unit that belongs to the losing side suffers a -1 modifier to its Leadership characteristic when making its Break test. Models that have this Chaotic Trait, that cause Terror, or that are Immune to Psychology are unaffected.`,
    phases: ["combat"],
  },
  {
    name: `Enhanced Reflexes`,
    type: "enchanted-item",
    points: 10,
    effect: `Whilst engaged in combat, models with this Chaotic Trait that choose to fight with a hand weapon gain a +2 modifier to their Initiative characteristic. Note that this Chaotic Trait only applies to a single, non-magical hand weapon, or an Ensorcelled Weapon, and does not apply to a model's mount (should it have one). If the model is using two hand weapons or any other sort of weapon, this Chaotic Trait ceases to apply.`,
    phases: ["combat"],
  },
  {
    name: `Longstriders`,
    type: "enchanted-item",
    points: 15,
    effect: `0-1 unit per 1,000 points. Unless they are wearing heavy armour or full plate armour, models with this Chaotic Trait gain the Vanguard special rule.`,
    phases: ["movement"],
  },
  {
    name: `Prophetic Foresight`,
    type: "enchanted-item",
    points: 10,
    effect: `Enemy units that deploy using the Scouts special rule cannot be deployed within 18" of a unit in which every model has this Chaotic Trait (rather than the usual 12"). In addition, enemy units that deploy using the Ambushers special rule may not be placed within 12" (rather than the usual 8") of a unit in which every model has this Chaotic Trait.`,
    phases: ["passive"],
  },
  {
    name: `Unnatural Fortitude`,
    type: "enchanted-item",
    points: 20,
    effect: `Unless they are wearing heavy armour or full plate armour, models with this Chaotic Trait improve their Toughness characteristic by 1 (to a maximum of 10).`,
    phases: ["combat"],
  },

  // ─── gifts-of-khorne ─────────────────────────────
  {
    name: `Armour of Khorne`,
    type: "enchanted-item",
    points: 40,
    effect: `The Armour of Khorne is a suit of heavy armour. In addition, its wearer has a 5+ Ward save against any wounds suffered.`,
    phases: ["passive"],
  },
  {
    name: `Axe of Khorne*`,
    type: "enchanted-item",
    points: 35,
    effect: ``,
    phases: ["combat"],
    extremely: true,
  },
  {
    name: `Collar of Khorne*`,
    type: "enchanted-item",
    points: 25,
    effect: `The wearer of a Collar of Khorne improves its Magic Resistance by 1. For example, a model with Magic Resistance (-2) wearing a Collar of Khorne would have Magic Resistance (-3).`,
    phases: ["passive"],
    extremely: true,
  },
  {
    name: `Might of Khorne`,
    type: "enchanted-item",
    points: 25,
    effect: `This model has a +1 modifier to its Strength characteristic.`,
    phases: ["passive"],
  },
  {
    name: `Spell Eater`,
    type: "enchanted-item",
    points: 50,
    effect: `This model may be nominated to attempt a Wizardly Dispel, as if it were a Wizard. For the purposes of Wizardly Dispel attempts, this model counts as a Level 2 Wizard.`,
    phases: ["passive"],
  },

  // ─── gifts-of-nurgle ─────────────────────────────
  {
    name: `Nurgling Infestation`,
    type: "enchanted-item",
    points: 45,
    effect: `Great Unclean One only. Whilst engaged in combat, this model may make an additional D6 attacks. These attacks are resolved at Initiative 2, with a Weapon Skill and Strength of 2, and with an AP of -. Additionally, when this model loses its last Wound, place a Nurgling Swarm of D3 models so that each model is within 3" of this model before removing this model from play. Note that these Nurgling Swarms are not worth any Victory Points.`,
    phases: ["combat"],
  },
  {
    name: `Sloppity Bilepiper`,
    type: "enchanted-item",
    points: 35,
    effect: `Daemonic Heralds whose troop type is infantry only. Friendly units with the Daemons of Nurgle special rule that begin their movement within this model's Command range have a +1 modifier to their Movement characteristic.`,
    phases: ["passive"],
  },
  {
    name: `Spoilpox Scrivener`,
    type: "enchanted-item",
    points: 30,
    effect: `Daemonic Heralds whose troop type is infantry only. Whilst within this model's Command range, friendly units with the Daemons of Nurgle special rule may re-roll any rolls To Hit of a natural 1.`,
    phases: ["combat"],
  },
  {
    name: `Stream of Contagion*`,
    type: "enchanted-item",
    points: 25,
    effect: ``,
    phases: ["passive"],
    extremely: true,
  },
  {
    name: `Trappings of Nurgle`,
    type: "enchanted-item",
    points: 30,
    effect: `The Trappings of Nurgle is a suit of armour that gives its wearer an armour value of 4+ which cannot be improved in any way.`,
    phases: ["passive"],
  },

  // ─── gifts-of-slaanesh ─────────────────────────────
  {
    name: `Allure of Slaanesh`,
    type: "enchanted-item",
    points: 35,
    effect: `Enemy units must make a Leadership test before making any rolls To Hit against this model during the Combat phase. If this test is failed, only rolls of a natural 6 will hit.`,
    phases: ["combat"],
  },
  {
    name: `Enrapturing Gaze*`,
    type: "enchanted-item",
    points: 20,
    effect: `Enemy models engaged in combat with this model cannot use the Inspiring Presence special rule of their General.`,
    phases: ["passive"],
    extremely: true,
  },
  {
    name: `Infernal Enrapturess`,
    type: "enchanted-item",
    points: 50,
    effect: `Daemonic Heralds whose troop type is infantry only. Whilst within this character's Command range, friendly Daemons of Slaanesh that are also Wizards (not including this model) may apply a +1 modifier to any Casting roll they make. Whilst within this character's Command range, enemy Wizards suffer a -1 modifier to any Casting roll they make.`,
    phases: ["passive"],
  },
  {
    name: `Siren Song`,
    type: "enchanted-item",
    points: 30,
    effect: `Single use. At the start of your opponent's Declare Charges & Charge Reactions sub-phase, nominate a single enemy unit that is able to declare a charge against this model (or its unit). That enemy unit must make a Leadership test Leadership Tests. If this test is passed, the unit may act as normal. However, if this test is failed, it must declare a charge against this model (or its unit).`,
    phases: ["combat"],
  },
  {
    name: `Soporific Musk*`,
    type: "enchanted-item",
    points: 30,
    effect: `Enemy models engaged in combat with this model cannot use the Strike First special rule. Enemy models that do not have the Strike First special rule become subject to the Strike Last special rule instead.`,
    phases: ["passive"],
    extremely: true,
  },

  // ─── gifts-of-tzeentch ─────────────────────────────
  {
    name: `Iridescent Corona*`,
    type: "enchanted-item",
    points: 30,
    effect: `Any enemy model that targets this model during the Shooting phase suffers an additional -1 To Hit modifier.`,
    phases: ["shooting"],
    extremely: true,
  },
  {
    name: `Power Vortex`,
    type: "enchanted-item",
    points: 35,
    effect: `Whilst within this Wizard's dispel range, enemy Wizards suffer a -1 modifier to their Casting rolls.`,
    phases: ["passive"],
  },
  {
    name: `Staff of Change`,
    type: "enchanted-item",
    points: 65,
    effect: `Notes: Any enemy model that suffers one or more unsaved wounds from the Staff of Change must immediately make a Toughness test. If this test is failed, the wounded model loses all of its remaining Wounds.`,
    phases: ["combat"],
  },
  {
    name: `Twin Heads`,
    type: "enchanted-item",
    points: 20,
    effect: `This model knows one more spell (chosen in the usual way) than is normal for their Level of Wizardry. Note that this does not increase the Wizard's Level.`,
    phases: ["passive"],
  },
  {
    name: `Will of Tzeentch`,
    type: "enchanted-item",
    points: 55,
    effect: `Once per round, this model may re-roll a single D6. This may be a D6 rolled on its own, as part of a batch of dice, or as part of a multiple dice roll.`,
    phases: ["passive"],
  },

  // ─── icons-of-khorne ─────────────────────────────
  {
    name: `Great Standard of Sundering`,
    type: "banner",
    points: 45,
    effect: `Any enemy Wizard that can draw a line of sight to the model carrying the Great Standard of Sundering suffers a -1 modifier to any Casting roll it makes.`,
    phases: ["passive"],
  },
  {
    name: `Icon of Endless War`,
    type: "banner",
    points: 30,
    effect: `When a unit carrying the Banner of Rage declares a charge, it may re-roll its Charge roll.`,
    phases: ["passive"],
  },
  {
    name: `Skull Totem`,
    type: "banner",
    points: 50,
    effect: `A unit carrying the Skull Totem (but not its mounts) gains the Furious Charge special rule.`,
    phases: ["passive"],
  },

  // ─── icons-of-nurgle ─────────────────────────────
  {
    name: `Icon of Eternal Virulence`,
    type: "banner",
    points: 50,
    effect: `When calculating its combat result, a unit carrying the Icon of Eternal Virulence may claim an additional bonus of +1 combat result point (to a maximum of +3) for each unsaved wound caused by a Poisoned Attack.`,
    phases: ["passive"],
  },
  {
    name: `Rotten Icon`,
    type: "banner",
    points: 10,
    effect: `Enemy units cannot claim any bonus combat result points for being engaged with the rear arc of a unit carrying the Rotten Icon.`,
    phases: ["passive"],
  },
  {
    name: `Standard of Seeping Decay`,
    type: "banner",
    points: 35,
    effect: `During the Combat phase, a unit carrying the Standard of Seeping Decay may re-roll any rolls To Wound of a natural 1.`,
    phases: ["passive"],
  },

  // ─── icons-of-slaanesh ─────────────────────────────
  {
    name: `Banner of Acquiescence`,
    type: "banner",
    points: 55,
    effect: `A single enemy unit engaged in combat with the bearer of the Banner of Acquiescence suffers a -D3 modifier to its Weapon Skill and Initiative characteristics (to a minimum of 1).`,
    phases: ["passive"],
  },
  {
    name: `Rapturous Standard`,
    type: "banner",
    points: 35,
    effect: `Any enemy unit that charges the front arc of a unit carrying the Rapturous Standard makes a disordered charge.`,
    phases: ["passive"],
  },
  {
    name: `Siren Standard`,
    type: "banner",
    points: 25,
    effect: `If an enemy unit charged by a unit carrying the Siren Standard wishes to Flee (or Fire & Flee) as a charge reaction, it must first make a Leadership test. If this test is passed, the unit may Flee (or Fire & Flee). However, if this test is failed, the unit must Hold.`,
    phases: ["passive"],
  },

  // ─── icons-of-tzeentch ─────────────────────────────
  {
    name: `Banner of Change`,
    type: "banner",
    points: 45,
    effect: `At the start of the Combat phase, a single enemy unit engaged in combat with this model suffers 3D6 Strength 2 hits, each with an AP of -.`,
    phases: ["passive"],
  },
  {
    name: `Banner of Discord`,
    type: "banner",
    points: 60,
    effect: `A unit carrying the Banner of Discord gains the Magic Resistance (-3) special rule. In addition, friendly units within 6" of the model carrying this standard gain the Magic Resistance (-1) special rule.`,
    phases: ["passive"],
  },
  {
    name: `Icon of Sorcery*`,
    type: "banner",
    points: 35,
    effect: `Pink Horrors only. When a unit carrying the Icon of Sorcery casts a Bound spell, it does so with a power level equal to twice its Rank Bonus.`,
    phases: ["passive"],
    extremely: true,
  },
];
