export default [
  // ─── Chaos Dwarfs ────────────────────────────────────────────────────
  {
    name: "Black Hammer of Hashut",
    type: "weapon",
    points: 60,
    effect:
      "S+2, AP -1. Flaming Attacks, Killing Blow (against Flammable units), Magical Attacks, Multiple Wounds (D3).",
    phases: ["combat"],
  },
  {
    name: "Dark Maul",
    type: "weapon",
    points: 50,
    effect:
      "Killing Blow, Magical Attacks. When a model takes unsaved wounds, it must pass a Strength test or suffer an additional wound.",
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
    name: "The Graven Sceptre",
    type: "weapon",
    points: 30,
    effect:
      "S+1. Magical Attacks. When rolling To Wound, a roll of 4+ is always a success regardless of the target's Toughness.",
    phases: ["combat"],
  },
  {
    name: "Armour of Bazherak the Cruel",
    type: "armour",
    mr: -2,
    points: 50,
    effect:
      "Full plate armour. The wearer gains Immune to Psychology and Magic Resistance (-2).",
    phases: ["combat", "shooting"],
    armourBase: 4,
  },
  {
    name: "The Mask of the Furnace",
    type: "armour",
    points: 40,
    effect:
      "May be worn with other armour. +1 armour value (max 2+) and a 3+ Ward save against wounds caused by Flaming Attacks.",
    phases: ["combat", "shooting"],
    armourMod: -1,
  },
  {
    name: "Mantle of Stone",
    type: "talisman",
    points: 30,
    effect: "+1 Toughness, -1 Initiative.",
    phases: ["passive"],
  },
  {
    name: "Hellshard",
    type: "talisman",
    points: 20,
    effect:
      "When the bearer is reduced to zero Wounds by an enemy attack during the Combat phase, the attacking unit takes D6 S5, AP -1 hits.",
    phases: ["combat"],
  },
  {
    name: "Daemon Flask",
    type: "arcane-item",
    points: 50,
    effect:
      "Single use. During the Command sub-phase, all enemy units within this character's Command range must make a Panic test.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Vial of Lammasu Blood",
    type: "arcane-item",
    points: 40,
    effect:
      "Single use. May be used instead of attempting a dispel. The spell is automatically dispelled with no Dispel roll required. Cannot dispel perfect invocations.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Scroll of Binding",
    type: "arcane-item",
    points: 30,
    effect:
      "Single use. When casting a spell, roll 3D6 instead of 2D6 for the Casting roll. If a double 1 is rolled on any two dice, the spell is miscast.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Daemonic Familiar",
    type: "enchanted-item",
    points: 30,
    effect:
      "Enemy models engaged in combat with the owner must reduce the armour value of any Ward or Regeneration save by 1 (min 6+).",
    phases: ["combat"],
  },
  {
    name: "Breath of Hashut",
    type: "enchanted-item",
    points: 25,
    effect:
      "Single use. Breath weapon: S4, AP -2, Flaming Attacks, Magical Attacks.",
    phases: ["shooting"],
  },
  {
    name: "Obsidian Vambraces",
    type: "enchanted-item",
    mr: -1,
    points: 15,
    effect:
      "+1 Strength, Magic Resistance (-1). If the wearer rolls a natural 1 To Hit during Combat, the gauntlets shatter.",
    phases: ["combat"],

    strengthMod: "+1",
  },
  {
    name: "The Lammasu's Beard",
    type: "banner",
    mr: -2,
    points: 65,
    effect:
      'The unit gains a 6+ Ward save and Magic Resistance (-2). Friendly units within 6" gain a 5+ Ward save during the Shooting phase and Magic Resistance (-1).',
    phases: ["combat", "shooting"],
    ward: "6+",
  },
  {
    name: "Ashen Banner",
    type: "banner",
    points: 30,
    effect:
      "Enemy models targeting the unit during the Shooting phase suffer an additional -1 To Hit.",
    phases: ["shooting"],
  },
  {
    name: "Overseer's Sigil",
    type: "banner",
    points: 25,
    effect: 'Friendly units within 9" lose the Levies special rule.',
    phases: ["passive"],
  },
  {
    name: "Shroud of the Ancestor",
    type: "banner",
    points: 10,
    effect: "The unit gains Hatred (Dwarfs).",
    phases: ["combat"],
  },
];
