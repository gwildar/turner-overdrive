/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  {
    id: "dark runes",
    displayName: "Dark Runes",
    passive: true,
    description:
      "5+ Ward save against any wound caused by a non-magical attack.",
    phases: [],
    ward: "5+ (non-magical shooting)",
  },
  {
    id: "eternal hatred",
    displayName: "Eternal Hatred",
    description:
      "Against High Elves, Hatred applies in every round of combat, not just the first. Does not affect mount.",
    phases: ["choose-fight"],
  },
  {
    id: "murderous",
    displayName: "Murderous",
    description:
      "Fighting with a single hand weapon: re-roll any To Wound rolls of natural 1. Does not apply with two hand weapons or other weapon types. Does not affect mount.",
    phases: ["choose-fight"],
  },
  {
    id: "abyssal howl",
    displayName: "Abyssal Howl",
    passive: true,
    description:
      'Enemy units within 6" suffer -1 Leadership when making Fear, Panic, or Terror tests (min 2). Does not stack with similar effects.',
    phases: [],
  },
  {
    id: "black lotus",
    displayName: "Black Lotus",
    passive: true,
    description:
      "For each unsaved Wound inflicted by this character, the enemy character suffers -1 Leadership for the remainder of the game.",
    phases: [],
  },
  {
    id: "blessings of khaine",
    displayName: "Blessings of Khaine",
    description:
      "Bound spell (9+). Until next Start of Turn, caster and friendly Death Hags, Witch Elves, and Sisters of Slaughter within Command range gain one of: Fury of Khaine (Furious Charge), Strength of Khaine (Cleaving Blow), or Bloodshield of Khaine (5+ Ward save).",
    phases: ["conjuration"],
  },
  {
    id: "cry of war",
    displayName: "Cry of War",
    passive: true,
    description:
      "Enemy units suffer -1 Leadership whilst within Command range of a non-fleeing Death Hag with this rule.",
    phases: [],
  },
  {
    id: "cursed coven",
    displayName: "Cursed Coven",
    passive: true,
    description:
      "The unit knows one spell from Dark Magic or Daemonology (chosen before deployment). Power Level is 2 (US 10+ with Master), 1 (US ≤9 with Master), or 0 (no Master).",
    phases: [],
  },
  {
    id: "dance of death",
    displayName: "Dance of Death",
    description:
      "If this unit makes a successful charge, the charge target suffers -1 to its Maximum Rank Bonus until the end of the Combat phase.",
    phases: ["combat-result"],
  },
  {
    id: "dark venom",
    displayName: "Dark Venom",
    description:
      "Gains Killing Blow. On a natural 6 To Wound, infantry and cavalry cannot use armour or Regeneration saves (Ward saves allowed). An unsaved Killing Blow wound removes all remaining wounds.",
    phases: ["choose-fight"],
  },
  {
    id: "forbidden poisons",
    displayName: "Forbidden Poisons",
    passive: true,
    description:
      "Khainite Assassin may select one poison: Black Lotus, Dark Venom, or Manbane.",
    phases: [],
  },
  {
    id: "gifts of khaine",
    displayName: "Gifts of Khaine",
    passive: true,
    description:
      "Death Hag selects one gift: Cry of War, Rune of Khaine (Extra Attacks +D3), or Witchbrew.",
    phases: [],
  },
  {
    id: "goad beast",
    displayName: "Goad Beast",
    description:
      "During Command sub-phase, one friendly monster within Command range (including own mount) gains +D3 Attacks (max 10) until end of turn.",
    phases: ["start-of-turn"],
    yourTurnOnly: true,
  },
  {
    id: "hekarti's blessing",
    displayName: "Hekarti's Blessing",
    description: "Once per game, may re-roll a single failed Casting roll.",
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
  },
  {
    id: "hidden (dark elves)",
    displayName: "Hidden",
    passive: true,
    description:
      "Khainite Assassin starts hidden in a friendly Dark Elf infantry unit (US 10+). Revealed during any Start of Turn sub-phase or at start of any Combat phase. Destroyed with host if host is destroyed before revelation. Cannot be General.",
    phases: [],
  },
  {
    id: "manbane",
    displayName: "Manbane",
    description:
      "To Wound rolls of 4+ always succeed, regardless of the target's Toughness.",
    phases: ["choose-fight"],
  },
  {
    id: "rune of khaine",
    displayName: "Rune of Khaine",
    description:
      "Extra Attacks (+D3). Roll during the Choose & Fight Combat sub-phase.",
    phases: ["choose-fight"],
  },
  {
    id: "sea dragon cloak",
    displayName: "Sea Dragon Cloak",
    passive: true,
    description:
      "+1 armour save against non-magical shooting attacks (max 2+).",
    phases: [],
  },
  {
    id: "witchbrew",
    displayName: "Witchbrew",
    passive: true,
    description:
      "This character, their mount, and any unit they have joined cannot lose the Frenzy special rule.",
    phases: [],
  },
];

export default RULES;
