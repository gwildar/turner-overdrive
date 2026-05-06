export default [
  // ─── Beastmen ────────────────────────────────────────────────────────
  {
    name: "The Black Maul",
    type: "weapon",
    points: 80,
    effect:
      "S+2, AP -3. Extra Attacks (+D6), Magical Attacks. Each natural 6 rolled for Extra Attacks causes -1 WS (min 1) for the remainder of the game.",
    phases: ["combat"],
  },
  {
    name: "Primeval Club",
    type: "weapon",
    points: 60,
    effect:
      "S equals the wielder's current Leadership. AP -3. Hatred (Empire), Magical Attacks, Poisoned Attacks.",
    phases: ["combat"],
  },
  {
    name: "Axe of Men",
    type: "weapon",
    points: 50,
    effect:
      "S-1. Killing Blow, Magical Attacks. If the wielder kills an enemy character (including champions) in a challenge, they gain Terror for the remainder of the game.",
    phases: ["combat"],
  },
  {
    name: "The Axes of Khorgor",
    type: "weapon",
    points: 40,
    effect:
      "S+1, AP -2. Extra Attacks (+1), Magical Attacks, Requires Two Hands. May re-roll any To Wound rolls of natural 1.",
    phases: ["combat"],
  },
  {
    name: "Mangelder",
    type: "weapon",
    points: 40,
    effect:
      "S+1, AP -1. The wielder causes Terror. Any enemy unit suffering unsaved wounds gains -1 Leadership (min 2) until end of turn.",
    phases: ["combat"],
  },
  {
    name: "Hunter's Spear",
    type: "weapon",
    points: 35,
    effect:
      'Range 24", S6, AP -3. Cumbersome, Magical Attacks, Multiple Wounds (2), Through & Through.',
    phases: ["combat", "shooting"],
  },
  {
    name: "The Brass Cleaver",
    type: "weapon",
    points: 30,
    effect:
      "S, AP -2. Magical Attacks. On a natural 6 To Wound, enemy cannot make armour, Ward, or Regeneration saves.",
    phases: ["combat"],
  },
  {
    name: "Scimitar of Skultar",
    type: "weapon",
    points: 25,
    effect: "S, AP -1. Armour Bane (1), Magical Attacks, Multiple Wounds (2).",
    phases: ["combat"],
  },
  {
    name: "Mansmasher",
    type: "weapon",
    points: 0,
    effect:
      "S+1, AP -1. Armour Bane (1), Magical Attacks, Multiple Wounds (D3). Strength modifier applies only during a turn in which the wielder charged.",
    phases: ["combat"],
  },
  {
    name: "Full Plate Chaos Armour",
    type: "armour",
    points: 40,
    effect:
      "Full plate armour. A Wizard may equip without penalty. 5+ Ward save.",
    phases: ["combat", "shooting"],
    ward: "5+",
    armourBase: 4,
  },
  {
    name: "Pelt of the Dark Young",
    type: "armour",
    mr: -2,
    points: 40,
    effect:
      "May be worn with other armour. +1 armour value (max 2+). The wearer and their unit gains Magic Resistance (-2).",
    phases: ["combat", "shooting"],
    armourMod: -1,
  },
  {
    name: "Heavy Chaos Armour",
    type: "armour",
    points: 30,
    effect: "Heavy armour. A Wizard may equip without penalty. 5+ Ward save.",
    phases: ["combat", "shooting"],
    ward: "5+",
    armourBase: 5,
  },
  {
    name: "The Blackened Plate",
    type: "armour",
    points: 25,
    effect: "Full plate armour. 3+ Ward save against Flaming Attacks.",
    phases: ["combat", "shooting"],
    armourBase: 4,
  },
  {
    name: "The Fur of Sharggu",
    type: "armour",
    points: 20,
    effect:
      "May be worn with other armour. +2 armour value (max 2+) against non-magical shooting attacks.",
    phases: ["shooting"],
  },
  {
    name: "Chalice of Dark Rain",
    type: "talisman",
    points: 50,
    effect:
      "Single use. During the Command sub-phase, if not engaged. Until next Start of Turn, the range of all enemy missile weapons is halved and enemy war machines cannot shoot.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Rune of the True Beast",
    type: "talisman",
    points: 30,
    effect: 'Enemy monsters within 6" suffer -1 WS.',
    phases: ["combat"],
  },
  {
    name: "Cornucopia of Corpulence",
    type: "talisman",
    points: 30,
    effect:
      "When the bearer's combat is chosen, enemy models in base contact must make a Toughness test. If failed, they lose a single Wound.",
    phases: ["combat"],
  },
  {
    name: "Dark Heart",
    type: "talisman",
    points: 25,
    effect:
      "Single use. During the Command sub-phase, the model recovers one lost Wound.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "The Skull of the Unicorn Lord",
    type: "talisman",
    points: 0,
    effect:
      "Ghorros only. 6+ Ward save vs non-magical attacks. 5+ Ward save vs magical attacks.",
    phases: ["combat", "shooting"],
    ward: "6+",
  },
  {
    name: "The Plague Chalice",
    type: "arcane-item",
    points: 40,
    effect:
      "If any natural double is rolled on a Casting roll (not double 1), the spell is cast as a perfect invocation. Each time, the bearer suffers a S4 hit (no armour save; Ward and Regeneration allowed).",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Blood of the Shadowgave",
    type: "arcane-item",
    points: 35,
    effect:
      "Single use. May be used instead of a Wizardly dispel. The spell is automatically dispelled. Cannot dispel perfect invocations.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Hagtree Fetish",
    type: "arcane-item",
    points: 30,
    effect:
      "Whenever the bearer successfully casts a Magic Missile, they may re-roll any failed To Wound rolls.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Daemon Heart",
    type: "arcane-item",
    points: 30,
    effect:
      "When attempting a Wizardly dispel, the bearer counts their Level of Wizardry as one higher than the opposing Wizard (or one higher than a Bound Spell's Power Level).",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Jagged Dagger",
    type: "arcane-item",
    points: 15,
    effect:
      "Must have joined a unit. Before a Casting roll, may sacrifice one model from the unit (removed as casualty). Add the sacrificed model's Wounds to the Casting roll result.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Goretooth",
    type: "arcane-item",
    points: 15,
    effect: "The bearer may also know spells from the Lore of Primal Magic.",
    phases: ["passive"],
  },
  {
    name: "Slug-skin",
    type: "enchanted-item",
    points: 50,
    effect:
      "Enemy models directing attacks against this model or its unit in Combat suffer -1 To Hit.",
    phases: ["combat"],
  },
  {
    name: "Stone of Spite",
    type: "enchanted-item",
    points: 45,
    effect:
      "Single use. During the Command sub-phase, if not engaged. Until next Start of Turn, all Wizards (friend or foe) suffer -2 to Casting rolls.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Crown of Horns",
    type: "enchanted-item",
    points: 45,
    effect: "The character and their unit gains Stubborn.",
    phases: ["passive"],
  },
  {
    name: "Muscular Monstrosity",
    type: "enchanted-item",
    points: 35,
    effect: "Mutation. +1 Strength (excluding mount).",
    phases: ["combat"],

    strengthMod: "+1",
  },
  {
    name: "Pelt of Midnight",
    type: "enchanted-item",
    points: 35,
    effect:
      "Enemy models targeting this character or their unit during the Shooting phase suffer -1 To Hit.",
    phases: ["shooting"],
  },
  {
    name: "Horn of the Great Hunt",
    type: "enchanted-item",
    points: 35,
    effect:
      "Once per turn, after rolling for Ambushers reinforcements, if the bearer is on the battlefield and not fleeing, may apply +1 or -1 to the result.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Horn of the First Beast",
    type: "enchanted-item",
    points: 30,
    effect:
      "Unless fleeing, any friendly unit within 18\" may use this model's Leadership when testing for Primal Fury.",
    phases: ["passive"],
  },
  {
    name: "Gouge-tusks",
    type: "enchanted-item",
    points: 30,
    effect:
      "Mutation. During Combat, the AP of any weapon used by this model (not mount) is improved by 1.",
    phases: ["combat"],
  },
  {
    name: "Rune of the Beast Ascendant",
    type: "enchanted-item",
    points: 25,
    effect:
      "Beastman Chieftains only. Unless fleeing, friendly Bestigor, Gor and Ungor Herds gain +1 Leadership (max 10) within Command range.",
    phases: ["passive"],
  },
  {
    name: "Scourge of the Burdened",
    type: "enchanted-item",
    points: 25,
    effect:
      "May cast Call of the Wild (Lore of Primal Magic) as a Bound Spell with Power Level 2.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Many-limbed Fiend",
    type: "enchanted-item",
    points: 20,
    effect:
      "Mutation. +1 Attacks (excluding mount). The bonus attack must be made with a hand weapon.",
    phases: ["combat"],
  },
  {
    name: "Gnarled Hide",
    type: "enchanted-item",
    points: 15,
    effect:
      "Mutation. Infantry only. Gains Armoured Hide (1), improving armour value by 1.",
    phases: ["combat", "shooting"],
  },
  {
    name: "Skin of Man",
    type: "enchanted-item",
    points: 15,
    effect:
      "Beastmen Chieftains and Shamans (infantry only). Gains Scouts and Vanguard.",
    phases: ["passive"],
  },
  {
    name: "Cacophonous Dirge",
    type: "enchanted-item",
    points: 15,
    effect:
      'Enemy musicians within 18" cannot use Onwards to Victory!, Steadying Rhythm, or Quick Time.',
    phases: ["passive"],
  },
  {
    name: "Uncanny Senses",
    type: "enchanted-item",
    points: 10,
    effect: "Mutation. +1 Initiative (excluding mount).",
    phases: ["combat"],
  },
  {
    name: "Totem of Rust",
    type: "banner",
    points: 50,
    effect:
      'Every model (friend or foe) within 6" suffers -1 to Armour Save rolls.',
    phases: ["combat", "shooting"],
  },
  {
    name: "The Gore Banner",
    type: "banner",
    points: 50,
    effect:
      "When an enemy unit declares a charge against this unit, it must first make a Leadership test. If failed, the charge fails and the unit cannot move.",
    phases: ["combat"],
  },
  {
    name: "Banner of the Warped Moon",
    type: "banner",
    points: 45,
    effect:
      "Single use. During the Command sub-phase, if not engaged, make a Leadership test. If passed, enemy units cannot use Fly (X) until next Start of Turn.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "The Beast Banner",
    type: "banner",
    points: 40,
    effect:
      'The unit increases maximum charge range by 3". When making a Charge roll, may apply +D3 to the result.',
    phases: ["combat"],
    chargeMod: { range: 3, tag: "Beast", color: "orange", order: 10 },
  },
  {
    name: "Manbane Standard",
    type: "banner",
    points: 40,
    effect: 'All enemy units within 6" suffer -1 Leadership (min 2).',
    phases: ["passive"],
  },
  {
    name: "Vitriolic Totem",
    type: "banner",
    points: 30,
    effect: "The unit gains Poisoned Attacks.",
    phases: ["combat"],
    grantsRules: ["poisoned attacks"],
  },
  {
    name: "Banner of Outrage",
    type: "banner",
    points: 25,
    effect:
      "The unit may re-roll its Leadership test when testing for Primal Fury.",
    phases: ["combat"],
  },
  {
    name: "The Soiled Tapestry",
    type: "banner",
    points: 15,
    effect:
      "The unit gains Hatred (all enemies). However, all enemy models gain Hatred against this unit.",
    phases: ["combat"],
  },

  // ─── chaos-mutations ─────────────────────────────
  {
    name: `Crown of Horns (Beastmen)`,
    type: "enchanted-item",
    points: 45,
    effect: `Characters only. This character and any unit they have joined gains the Stubborn special rule.`,
    phases: ["passive"],
  },
];
