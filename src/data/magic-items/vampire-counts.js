export default [
  // ─── Vampire Counts ──────────────────────────────────────────────────
  {
    name: "Frostblade",
    type: "weapon",
    points: 60,
    effect:
      "Killing Blow, Magical Attacks. When an enemy model takes unsaved wounds, it must pass a Toughness test or gain Strike Last (I reduced to 1) for the remainder of the game.",
    phases: ["combat"],
  },
  {
    name: "Sword of Kings",
    type: "weapon",
    points: 55,
    effect: "Killing Blow on natural 5 or 6.",
    phases: ["combat"],
    s: "S+1",
    ap: "-1",
  },
  {
    name: "Blood Drinker",
    type: "weapon",
    points: 45,
    effect:
      "S user, AP -1. If the wielder causes one or more unsaved wounds during the Combat phase, they recover a single lost Wound.",
    phases: ["combat"],
  },
  {
    name: "Dreadlance",
    type: "weapon",
    points: 40,
    effect:
      "S+2, AP -2. Armour Bane (1), Magical Attacks. Cavalry or monster only. Only usable during the turn a charge occurs; otherwise must use hand weapon. May re-roll failed To Hit rolls.",
    phases: ["combat"],
  },
  {
    name: "The Flayed Hauberk",
    type: "armour",
    points: 35,
    effect:
      "Heavy armour that wizards can equip without penalty. The wearer gains a 6+ Ward save.",
    armourBase: 5,
    phases: ["combat", "shooting"],
    ward: "6+",
  },
  {
    name: "The Accursed Armour",
    type: "armour",
    points: 30,
    effect:
      "Infantry or cavalry only. Full plate armour (4+). The wearer gains +1 Toughness but suffers -1 WS and -1 Initiative (min 1).",
    armourBase: 4,
    phases: ["combat", "shooting"],
  },
  {
    name: "Von Carstein Ring",
    type: "talisman",
    points: 40,
    effect:
      "Vampires only. Single use. When the wearer loses their last Wound, roll a D6; on a 2+, the Wound is not lost.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Crown of the Damned",
    type: "talisman",
    points: 35,
    effect:
      "The wearer gains a 4+ Ward save but becomes subject to Stupidity. Test Ld at Start of Turn — if failed: cannot move, shoot, cast, or dispel.",
    phases: ["strategy", "combat", "shooting"],
    ward: "4+",
  },
  {
    name: "Skull Staff",
    type: "arcane-item",
    points: 50,
    effect:
      'Increases Dispel range by 3". When attempting a Wizardly dispel, the bearer may apply a +1 modifier to the Dispel roll.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Sceptre de Noirot",
    type: "arcane-item",
    points: 35,
    effect:
      "The bearer may use the Invocation of Nehek special rule twice per Command sub-phase instead of once. Each time, roll a D6; on a 1, the bearer suffers a single Wound.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Spell Familiar",
    type: "arcane-item",
    points: 15,
    effect:
      "The bearer knows one additional spell beyond their normal allotment for their Level of Wizardry.",
    phases: ["passive"],
  },
  {
    name: "Curse of the Revenant",
    type: "enchanted-item",
    points: 50,
    effect:
      "Vampiric Power. The Vampire gains a +1 modifier to its Wounds characteristic.",
    phases: ["passive"],
  },
  {
    name: "Helm of Commandment",
    type: "enchanted-item",
    points: 40,
    effect:
      "Necromancers and Wights only. During the Command sub-phase, make a Leadership test. If passed, until your next Start of Turn sub-phase, this character and their unit gains +D3 WS (max 10).",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Beguile",
    type: "enchanted-item",
    points: 40,
    effect:
      "Vampiric Power. Enemy units must make a Leadership test before rolling To Hit against this Vampire. If failed, only natural 6s will hit.",
    phases: ["combat"],
  },
  {
    name: "Flying Horror",
    type: "enchanted-item",
    points: 35,
    effect:
      "Vampiric Power. Infantry only. The Vampire gains Fly (10). Cannot join a unit.",
    phases: ["passive"],
  },
  {
    name: "Hand of Dust",
    type: "enchanted-item",
    points: 35,
    effect:
      "Necromancers only. Bound spell (Power Level 2, Casting Value 9+, Assailment). Target enemy unit suffers 2D6 S5 hits, AP -1. Each time used, roll a D6; on a 1, the item is destroyed.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Dark Acolyte",
    type: "enchanted-item",
    points: 30,
    effect:
      'Vampiric Power. The Vampire gains Invocation of Nehek and counts as a Level 1 Wizard for using it. During the Command sub-phase, may resurrect fallen Necromantic Undead units within 12".',
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Master of the Black Arts",
    type: "enchanted-item",
    points: 30,
    effect:
      "Vampiric Power. Vampire Count (Level 2) or Vampire Thrall (Level 1) only. The Vampire's Level of Wizardry increases by 1.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Cloak of Mist & Shadows",
    type: "enchanted-item",
    points: 30,
    effect:
      "Necromancers with infantry troop type only. The wearer gains the Ethereal special rule.",
    phases: ["passive"],
  },
  {
    name: "Supernatural Horror",
    type: "enchanted-item",
    points: 20,
    effect: "Vampiric Power. The Vampire gains the Terror special rule.",
    phases: ["combat"],
  },
  {
    name: "Lord of the Night",
    type: "enchanted-item",
    points: 15,
    effect:
      'Vampiric Power. During the Command sub-phase, make a Leadership test. If passed, a friendly Fell Bats, Bat Swarms, or Dire Wolves unit within 12" recovers D6 lost Wounds.',
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Banner of the Barrows",
    type: "banner",
    points: 65,
    effect:
      "Wight Lord BSB only. During the Combat phase, when the unit rolls To Hit, a roll of 3+ is always a success regardless of the target's WS.",
    phases: ["combat"],
  },
  {
    name: "Drakenhof Banner",
    type: "banner",
    points: 50,
    effect:
      "A unit with Regeneration (X+) improves its Regeneration save by 1.",
    phases: ["combat", "shooting"],
  },
  {
    name: "The Screaming Banner",
    type: "banner",
    points: 45,
    effect:
      "When an enemy unit makes a Leadership test due to Fear caused by this unit, it must roll an extra D6 and discard the lowest result.",
    phases: ["combat"],
  },
  {
    name: "Standard of Hellish Vigour",
    type: "banner",
    points: 40,
    effect:
      "The unit gains the Reserve Move special rule, allowing movement after the Shooting phase if it did not charge, march, or flee.",
    phases: ["passive"],
  },

  // ─── vampire-counts-magic-items ─────────────────────────────
  {
    name: `Sceptre of De Noirot`,
    type: "enchanted-item",
    points: 35,
    effect: `The bearer of the Sceptre of de Noirot may attempt to resurrect the fallen by using the Invocation of Nehek special rule twice during their Command sub-phase (rather than the usual once). Roll a D6 each time the sceptre is used. On a roll of 1, the bearer loses a single Wound.`,
    phases: ["passive"],
  },
];
