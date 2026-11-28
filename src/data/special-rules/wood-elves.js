/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  {
    id: "the arrow of kurnous",
    displayName: "The Arrow of Kurnous",
    passive: true,
    phases: [
      {
        subPhaseId: "deployment",
        description:
          'Once deployment is complete (before the first-turn roll-off): if the enemy General is within 36" of any model with this rule, the enemy General suffers a single S3 hit (no armour or Regeneration saves; Ward saves allowed). The opponent gains +1 to their first-turn roll-off if the arrow is fired.',
      },
    ],
  },
  {
    id: "daughters of eternity",
    displayName: "Daughters of Eternity",
    passive: true,
    description: "4+ Ward save.",
    phases: [],
    ward: "4+",
  },
  {
    id: "tree spirit",
    displayName: "Tree Spirit",
    description:
      "Characters with this rule can only join units with it, and those units can only be joined by (or use the Leadership of) such characters — but may use the Leadership of a non-fleeing friendly Tree Spirit character within Command range.",
    passive: true,
    phases: [],
  },
  {
    id: "tree whack",
    displayName: "Tree Whack",
    description:
      "Once per turn, use one Attack for a Tree Whack: nominate a model in an engaged enemy unit; it takes an Initiative test. Fail = D3 hits at this model's Strength, no armour save (Ward/Regeneration allowed).",
    phases: ["choose-fight"],
  },
  {
    id: "talismanic tattoos",
    displayName: "Talismanic Tattoos",
    description: "6+ Ward save against any wounds suffered.",
    passive: true,
    phases: [],
    ward: "6+",
  },
  {
    id: "parry",
    displayName: "Parry",
    aliases: ["parry (wood elves)"],
    description:
      "When fighting with a hand weapon and shield, or Asrai spear and shield, improves its armour value by 1.",
    phases: ["choose-fight"],
  },
  {
    id: "courage beyond compare",
    displayName: "Courage Beyond Compare",
    description:
      "A Guardians of Talsyn unit this character joins gains Immune to Psychology (lost if it leaves).",
    passive: true,
    phases: [],
  },
  {
    id: "troubadour of loec",
    displayName: "Troubadour of Loec",
    description:
      "While joined to Wardancers, this Shadowdancer has the Dances of Loec rule.",
    passive: true,
    phases: [],
  },
  {
    id: "dances of loec",
    displayName: "Dances of Loec",
    description:
      "When this unit's combat is chosen, pick one Dance for the whole unit, lasting this Combat phase.",
    phases: [
      {
        subPhaseId: "choose-fight",
        description:
          "When this unit's combat is chosen, pick one Dance for the whole unit, lasting this Combat phase.",
        table: [
          { Dance: "Whirling Death", Effect: "Weapons' AP improved by 2" },
          { Dance: "Storm of Blades", Effect: "Extra Attacks (+1)" },
          { Dance: "The Shadows Coil", Effect: "4+ Ward save" },
          { Dance: "Woven Mist", Effect: "Enemies attacking it: -1 To Hit" },
        ],
      },
    ],
  },
  {
    id: "guardians of the wildwood",
    displayName: "Guardians of the Wildwood",
    description:
      "In base contact with an enemy causing Fear or Terror: +1 Attacks (max 10) and Multiple Wounds (2).",
    phases: ["choose-fight"],
  },
  {
    id: "deepwood coven",
    displayName: "Deepwood Coven",
    description:
      "Knows one random Battle Magic or Elementalism spell (or that lore's signature spell), cast as a Bound spell: Power Level 0, 1 with a Handmaiden of the Thorn, 2 with Handmaiden and standard bearer.",
    phases: ["conjuration", "shoot"],
    yourTurnOnly: true,
  },
  {
    id: "hawk-eyed archer",
    displayName: "Hawk-eyed Archer",
    description:
      "May target any enemy character in line of sight regardless of the Lone character rules, and may target a specific model (e.g. champion or character) within its target unit.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "run with the pack",
    displayName: "Run with the Pack",
    description:
      "While a Beast Keeper remains, the unit isn't Undisciplined and its war beasts don't fear Flaming Attacks. The unit may use the Movement of most of its models.",
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "boldest of the bold",
    displayName: "Boldest of the Bold",
    description: "Araloth ignores all negative modifiers to his Leadership.",
    passive: true,
    phases: [],
  },
  {
    id: "favour of the goddess",
    displayName: "Favour of the Goddess",
    description: "5+ Ward save against any wounds suffered.",
    passive: true,
    phases: [],
    ward: "5+",
  },
  {
    id: "skaryn the eye thief",
    displayName: "Skaryn the Eye Thief",
    description:
      'Roll D6: on 3+, one enemy model within 18" suffers a S4 AP -1 hit; if it takes an unsaved wound, -D3 WS and I (min 1) for the rest of the game.',
    phases: ["command"],
    yourTurnOnly: true,
  },
];

export default RULES;
