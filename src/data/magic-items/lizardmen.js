export default [
  // ─── Lizardmen ───────────────────────────────────────────────────────
  {
    name: "Blade of Revered Tzunki",
    type: "weapon",
    points: 65,
    effect: "No armour or Ward saves. Regeneration saves allowed.",
    phases: ["combat"],
    s: "S+1",
    ap: "None",
  },
  {
    name: "Scimitar of the Sun Resplendent",
    type: "weapon",
    points: 50,
    effect: "AP -1. Extra Attacks (+D3), Flaming Attacks, Magical Attacks.",
    phases: ["combat"],
  },
  {
    name: "Staff of the Lost Sun",
    type: "weapon",
    points: 40,
    effect:
      'Ranged (12"): S4, AP -3, Magical Attacks, Multiple Shots (3). Combat: S+1, Magical Attacks, Requires Two Hands.',
    phases: ["shooting", "combat"],
  },
  {
    name: "Piranha Blade",
    type: "weapon",
    points: 35,
    effect: "AP -1. Magical Attacks, Multiple Wounds (2).",
    phases: ["combat"],
  },
  {
    name: "Shield of the Mirror Pool",
    type: "armour",
    points: 40,
    effect:
      "Shield. Whenever the bearer sustains one or more Wounds from a Magic Missile, the caster suffers a single S5, AP -2 hit.",
    phases: ["passive"],
  },
  {
    name: "Hide of the Cold Ones",
    type: "armour",
    points: 20,
    effect:
      "Improves armour value by 1 (max 2+). Can be worn with other armour. The wearer is subject to the Stupidity special rule.",
    phases: ["combat", "shooting"],
    armourMod: -1,
  },
  {
    name: "Glyph Necklace",
    type: "talisman",
    mr: -2,
    points: 45,
    effect: "The bearer has a 5+ Ward save and gains Magic Resistance (-2).",
    phases: ["combat", "shooting"],
    ward: "5+",
  },
  {
    name: "Aura of Quetzl",
    type: "talisman",
    points: 40,
    effect:
      "Any enemy model directing attacks against the bearer during the Combat phase suffers -1 To Hit.",
    phases: ["combat"],
  },
  {
    name: "Cupped Hands of the Old Ones",
    type: "arcane-item",
    points: 55,
    effect:
      'When the bearer miscasts, roll a D6. On a 1, follow the Miscast table as normal. On a 2+, nominate an enemy character and centre a 3" blast template over them; every model under suffers a single S6, AP -2 hit.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Cube of Darkness",
    type: "arcane-item",
    points: 50,
    effect:
      "Single use. May be used instead of attempting a dispel. The spell is automatically dispelled. All Remains in Play spells are also dispelled, including friendly ones.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Itxi Grub",
    type: "arcane-item",
    points: 30,
    effect:
      "Single use. Before making a Casting roll, the bearer may attempt to consume a grub by making a Toughness test. Success grants +3 to the Casting roll. Failure costs one Wound.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Higher State of Mind",
    type: "enchanted-item",
    points: 60,
    effect:
      "The bearer gains the Ethereal special rule. Can only be wounded by Magical Attacks.",
    phases: ["passive"],
  },
  {
    name: "Becalming Cogitation",
    type: "enchanted-item",
    points: 50,
    effect:
      'Once per turn, the Slann may re-roll one D6 when making a Wizardly dispel attempt. Increases Dispel range by 3".',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Wandering Deliberations",
    type: "enchanted-item",
    points: 40,
    effect:
      "Instead of generating spells normally, this character knows four signature spells chosen from: Battle Magic, Daemonology, Dark Magic, Elementalism, High Magic, Illusion, and Necromancy. May discard one in favour of a spell from the Lore of Lustria.",
    phases: ["passive"],
  },
  {
    name: "Cloak of Feathers",
    type: "enchanted-item",
    points: 40,
    effect:
      "Skink Heroes with infantry troop type only. The bearer gains Fly (10) and Swiftstride.",
    phases: ["movement"],
  },
  {
    name: "Transcendent Healing",
    type: "enchanted-item",
    points: 35,
    effect: "The bearer gains the Regeneration (5+) special rule.",
    phases: ["passive"],
    regen: "5+",
  },
  {
    name: "Sorcerous Void",
    type: "enchanted-item",
    mr: -3,
    points: 30,
    effect:
      "The bearer gains Magic Resistance (-D3). Roll the D3 before armies are deployed.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Harrowing Scrutiny",
    type: "enchanted-item",
    points: 20,
    effect: "The bearer gains the Terror special rule.",
    phases: ["combat"],
  },
  {
    name: "Venom of the Firefly Frog",
    type: "enchanted-item",
    points: 15,
    effect:
      "All combat attacks by the bearer gain Poisoned Attacks and Flaming Attacks. Only applies to non-magical weapons; does not apply to mount.",
    phases: ["combat"],
  },
  {
    name: "Horned One",
    type: "enchanted-item",
    points: 10,
    effect:
      "Saurus Heroes on Cold Ones only. The mount loses Stupidity and gains M8.",
    phases: ["passive"],
  },
  {
    name: "Soul of Stone",
    type: "enchanted-item",
    points: 10,
    effect:
      "When rolling on the Miscast table, the character may modify the result by -1 (min 2) or +1 (max 12).",
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Sun Standard of Chotec",
    type: "banner",
    points: 40,
    effect:
      "Enemy units cannot declare Stand & Shoot against this unit. Enemy models targeting the unit in the Shooting phase suffer an additional -1 To Hit.",
    phases: ["shooting", "combat"],
  },
  {
    name: "Skavenpelt Banner",
    type: "banner",
    points: 35,
    effect: "The unit gains Frenzy and Hatred (Skaven).",
    phases: ["combat"],
  },
  {
    name: "Totem of Prophecy",
    type: "banner",
    points: 30,
    effect: "The unit gains the Fear special rule.",
    phases: ["combat"],
  },
  {
    name: "Jaguar Standard",
    type: "banner",
    points: 20,
    effect:
      "When making a Pursuit roll, the unit may roll an extra D6 and discard the lowest result.",
    phases: ["combat"],
  },
];
