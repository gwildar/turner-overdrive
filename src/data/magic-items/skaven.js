export default [
  // ─── Skaven ──────────────────────────────────────────────────────────
  // Magic Weapons
  {
    name: "The Fellblade",
    type: "weapon",
    points: 100,
    effect:
      "Infantry characters only. S+3. Magical Attacks, Multiple Wounds (D3). No armour, Ward or Regeneration saves permitted against wounds caused. During each Command sub-phase, roll a D3 — on a 1, the wielder suffers a single Wound.",
    phases: ["combat", "strategy"],
    subPhases: ["command"],
  },
  {
    name: "Weeping Blade",
    type: "weapon",
    points: 50,
    effect:
      "S-2, -2 AP. Magical Attacks, Multiple Wounds (D3), Poisoned Attacks.",
    phases: ["combat"],
  },
  {
    name: "Blade of Nurglitch",
    type: "weapon",
    points: 35,
    effect:
      "S+1. Magical Attacks. Any enemy model that suffers one or more unsaved wounds must immediately make a Toughness test. If failed, they suffer a -1 modifier to their Toughness characteristic (to a minimum of 1) for the remainder of the game.",
    phases: ["combat"],
  },
  {
    name: "Death Globe",
    type: "weapon",
    points: 25,
    effect:
      'Single use. 9" range. Target a specific model and make a To Hit roll. On success, centre a 3" blast template on the target. Any model under the template must pass an Initiative test or suffer 1 Wound. Magical Attacks, Move & Shoot.',
    phases: ["shooting"],
    extremely: true,
  },
  // Magic Armour
  {
    name: "Warpstone Armour",
    type: "armour",
    points: 25,
    effect:
      "Heavy armour. May be purchased and worn by a Wizard even if they do not normally have the option to wear armour, with no casting penalty.",
    phases: ["passive"],
    extremely: true,
    armourBase: 5,
  },
  {
    name: "Cautious Shield",
    type: "armour",
    points: 20,
    effect:
      "Shield. The bearer may choose to wield it two-handed when their combat is chosen during Step 1.1 of any Choose & Fight Combat sub-phase. If they do, until the end of this Combat phase it improves its armour save by 3, but their Attacks characteristic is reduced to 0.",
    phases: ["combat"],
  },
  // Talismans
  {
    name: "Shadow Magnet",
    type: "talisman",
    points: 40,
    effect:
      "Any enemy model that targets the bearer or any unit they have joined during the Shooting phase suffers an additional -1 To Hit modifier.",
    phases: ["shooting"],
  },
  {
    name: "Warpstone Amulet",
    type: "talisman",
    points: 35,
    effect: "4+ Ward save against wounds caused by non-magical enemy attacks.",
    phases: ["combat", "shooting"],
  },
  // Arcane Items
  {
    name: "Warp Condenser",
    type: "arcane-item",
    points: 50,
    effect:
      'Increases Dispel range by 3". +1 modifier to Casting rolls for Magic Missile spells. May re-roll results on the Miscast table.',
    phases: ["strategy"],
    subPhases: ["conjuration"],
  },
  {
    name: "Storm Daemon",
    type: "arcane-item",
    points: 30,
    effect:
      'Bound spell (Magic Missile), Power Level 1. Casting Value 8+, 18" range. Target enemy unit suffers D3+1 S5 hits, each with -2 AP.',
    phases: ["strategy", "shooting"],
    subPhases: ["conjuration"],
  },
  {
    name: "Warpstone Tokens",
    type: "arcane-item",
    points: 15,
    effect:
      "May purchase up to three. Single use each. Before making a Casting roll, consume a token to roll an additional D3 and add the result to the Casting roll. For each natural 1 rolled, the bearer loses 1 Wound.",
    phases: ["strategy"],
    subPhases: ["conjuration"],
    extremely: true,
  },
  // Enchanted Items
  {
    name: "Brass Orb",
    type: "enchanted-item",
    points: 50,
    effect:
      "Single use. During the Combat phase, instead of attacking normally, target a specific model in an engaged enemy unit and make a single To Hit roll. If successful, the target must pass an Initiative test or be removed as a casualty.",
    phases: ["combat"],
  },
  {
    name: "Skalm",
    type: "enchanted-item",
    points: 35,
    effect:
      "Single use. During the Command sub-phase, the bearer recovers a single lost Wound and, until your next Start of Turn sub-phase, has a +1 modifier to their Toughness characteristic.",
    phases: ["strategy"],
    subPhases: ["command"],
  },
  {
    name: "Skavenbrew",
    type: "enchanted-item",
    points: 20,
    effect:
      "Single use. Skaven Warlords and Chieftains only. During the Command sub-phase, if not engaged in combat, make a Leadership test. If passed, the bearer and any unit they have joined gains the Frenzy special rule until your next Start of Turn sub-phase.",
    phases: ["strategy"],
    subPhases: ["command"],
    extremely: true,
  },
  // Magic Standards
  {
    name: "Storm Banner",
    type: "banner",
    points: 65,
    effect:
      "Single use. Activate during the Command sub-phase. Until your next Start of Turn sub-phase, enemy units cannot use the Fly (X) special rule and all enemy shooting suffers an additional -1 To Hit modifier.",
    phases: ["strategy", "shooting", "movement"],
    subPhases: ["command"],
  },
  {
    name: "Grand Banner of Superiority",
    type: "banner",
    points: 50,
    effect:
      "When calculating combat result, the unit carrying this banner may claim an additional +D3 combat result points.",
    phases: ["combat"],
  },
  {
    name: "Dwarf Hide Banner",
    type: "banner",
    points: 40,
    effect: "The unit gains Hatred (Dwarfs) and Stubborn.",
    phases: ["combat"],
  },
  {
    name: "Banner of Verminous Scurrying",
    type: "banner",
    points: 35,
    effect: "The unit gains the Swiftstride special rule.",
    phases: ["movement"],
  },
];
