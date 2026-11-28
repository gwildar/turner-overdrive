/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  {
    id: "warriors duel",
    displayName: "Warriors' Duel",
    passive: true,
    phases: [],
    description:
      "Before the first-turn roll-off, either player may propose a Warriors' Duel. Each side nominates one champion (infantry or cavalry, exactly 1 Wound). Champions fight in a challenge until one falls — the winner's army takes the first turn. If both fall simultaneously, revert to a standard roll-off. If the opponent declines, Wolves of the Sea automatically takes the first turn.",
  },
  {
    id: "caged fury",
    displayName: "Caged Fury",
    description:
      "Take a Leadership test. If failed, roll immediately on the Hellcannon Misfire table.",
    phases: ["start-of-turn"],
    yourTurnOnly: true,
  },
  {
    id: "sacrifice",
    displayName: "Sacrifice",
    description:
      "Only while joined to a unit: before a Casting roll, remove one model of the unit as a casualty and add its Wounds characteristic to the result (doesn't negate a double 1).",
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "thralls of chaos",
    displayName: "Thralls of Chaos",
    description:
      "Cannot be your General and can only join a unit with the Dark Pawns rule.",
    passive: true,
    phases: [],
  },
  {
    id: "dark pawns",
    displayName: "Dark Pawns",
    description:
      "Friendly units don't take Panic tests when this unit is destroyed or Breaks within 6\", or when it flees through them.",
    phases: ["shoot", "compulsory-moves", "break-test"],
  },
  {
    id: "unseen threat",
    displayName: "Unseen Threat",
    description:
      'In reserve: +1 or -1 to the roll for arriving as reinforcements. Arrives more than 4" (not 8") from enemy units.',
    phases: ["start-of-turn"],
    yourTurnOnly: true,
  },
  {
    id: "rampant mutation",
    displayName: "Rampant Mutation",
    description:
      "When this unit's combat is chosen, roll D6 for its mutation, lasting this Combat phase.",
    phases: [
      {
        subPhaseId: "choose-fight",
        description:
          "When this unit's combat is chosen, roll D6 for its mutation, lasting this Combat phase.",
        table: [
          { D6: "1-2", Result: "Venomous Fangs: Poisoned Attacks" },
          { D6: "3-4", Result: "Razor Talons: all attacks AP -2" },
          { D6: "5-6", Result: "Decapitating Claws: Killing Blow" },
        ],
      },
    ],
  },
  {
    id: "relentless warriors",
    displayName: "Relentless Warriors",
    description: "6+ Ward save against wounds from non-magical enemy attacks.",
    passive: true,
    phases: [],
    ward: "6+ (non-magical)",
  },
  {
    id: "warped form",
    displayName: "Warped Form",
    description:
      "When this unit's combat is chosen, pick a Transfiguration lasting until your next Start of Turn.",
    phases: [
      {
        subPhaseId: "choose-fight",
        description:
          "When this unit's combat is chosen, pick a Transfiguration lasting until your next Start of Turn.",
        table: [
          {
            Transfiguration: "Enlarged Claws",
            Effect: "Weapons' AP improved by 1 and Armour Bane (2)",
          },
          {
            Transfiguration: "Barbed Protrusions",
            Effect: "Extra Attacks (+1)",
          },
          {
            Transfiguration: "Toughened Flesh",
            Effect: "+1 Toughness and armour value improved by 2",
          },
        ],
      },
    ],
  },
  {
    id: "explosive demise",
    displayName: "Explosive Demise",
    description:
      'When this model loses its last Wound, before it is removed from play, every unit (friend or foe) within 6" suffers D6 Strength 5 hits, each with AP -2.',
    phases: ["choose-fight"],
  },
  {
    id: "warpfire aura",
    displayName: "Warpfire Aura",
    description:
      'Other models (friend and foe) cannot make Ward saves while within 3" of this model.',
    phases: ["choose-fight", "shoot"],
  },
  {
    id: "fire and chaos",
    displayName: "Fire and Chaos",
    aliases: ["fire & chaos"],
    description:
      "5+ Ward save against wounds caused by attacks with the Magical Attacks or Flaming Attacks special rule.",
    phases: ["choose-fight"],
    ward: "5+ (Magical or Flaming Attacks)",
  },
  {
    id: "handler",
    displayName: "Handler",
    description:
      "Deploys with its Chaos Warhounds unit and can't leave it. Unless fleeing, friendly Chaos Warhound units within its Command range may use its Leadership.",
    passive: true,
    phases: [],
  },
  {
    id: "breath of change",
    displayName: "Breath of Change",
    description:
      "Once per game, instead of Dark Fire or Fumes of Contagion: flame template from the front arc; every model hit (friend or foe) takes a Toughness test — failed = removed as a casualty.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "spirit of galrauch",
    displayName: "Spirit of Galrauch",
    description:
      "Take a Leadership test. If failed, until next turn: Wizard Level 1 (one spell per turn), Random Movement (2D6), and in combat D3 of his attacks hit himself (those wounds count for the enemy's combat result).",
    phases: ["start-of-turn"],
    yourTurnOnly: true,
  },
  {
    id: "two-headed dragon",
    displayName: "Two-headed Dragon",
    description:
      "May use Dark Fire of Chaos or Fumes of Contagion in its Shooting phase, not both.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
];

export default RULES;
