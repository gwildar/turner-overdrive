/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  // ─── Greenskins ──────────────────────────────────────────────────────

  {
    id: "waaagh!",
    displayName: "Waaagh!",
    aliases: ["waaagh"],
    description:
      "Once per game during the Command sub-phase: take a Leadership test. If passed, this character, their mount, and any joined Orc unit may re-roll To Hit rolls of 1, and gains +1 to combat result, until next Start of Turn.",
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "da boyz",
    displayName: "Da Boyz",
    description:
      "Army building: one Black Orc War Boss or Big Boss for each Black Orc Mob, and vice versa.",
    passive: true,
    phases: [],
  },
  {
    id: "quell impetuosity",
    displayName: "Quell Impetuosity",
    description:
      'A friendly Impetuous unit within 6" may re-roll a failed Leadership test when testing whether it must declare a charge.',
    phases: ["declare-charges"],
    yourTurnOnly: true,
  },
  {
    id: "tusker charge",
    displayName: "Tusker Charge",
    description:
      "In a turn it charged, a War Boar's tusks are S+1, AP -1. Not the rider, chariot or crew.",
    phases: ["choose-fight"],
  },
  {
    id: "mob rule",
    displayName: "Mob Rule",
    description:
      "While joined to a unit of Orcs or Black Orcs with US 10+, +1 to Casting rolls.",
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "squigs go wild",
    displayName: "Squigs Go Wild",
    description:
      'If the Squig Herd Breaks and flees with 5+ Cave Squigs, every unit (friend or foe) within 2D6" suffers D3 S5 AP -1 hits (+1 to the D3 per extra five Squigs). Then the herd is removed as destroyed.',
    phases: ["break-test"],
  },
  {
    id: "ker-splat",
    displayName: "Ker-splat",
    description: "Treats all difficult terrain as dangerous terrain.",
    phases: ["compulsory-moves", "remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "spiked ball & chains",
    displayName: "Spiked Ball & Chains",
    aliases: ["spiked ball and chains"],
    description: "Impact Hits caused by this model have AP -3.",
    phases: ["compulsory-moves", "choose-fight"],
  },
  {
    id: "bonegrinder giant attacks",
    displayName: "Bonegrinder Giant Attacks",
    phases: [
      {
        subPhaseId: "choose-fight",
        description: "Instead of normal attacks, roll a D6:",
        table: [
          {
            roll: "1",
            result: "'Eadbutt",
            effect: "D6+1 wounds, no armour or regeneration saves.",
          },
          {
            roll: "2",
            result: "Belly Flop",
            effect: '5" blast, Strength, AP -2.',
          },
          {
            roll: "3-4",
            result: "Mighty Swing",
            effect: "2D6 attacks, S+2, AP -3.",
          },
          {
            roll: "5",
            result: "Grind its Bones",
            effect:
              "Each base-contact infantry model tests Strength or is removed as a casualty; repeat on 4+.",
          },
          {
            roll: "6",
            result: "Crush Underfoot",
            effect: "All base-contact models suffer D6 hits at S+3, AP -3.",
          },
        ],
      },
    ],
  },
  {
    id: "choppas",
    displayName: "Choppas",
    description:
      "During a turn in which it charged, a model with this special rule may re-roll any rolls To Wound of a natural 1, and improves the Armour Piercing characteristic of its weapon(s) by 1.",
    phases: ["choose-fight"],
  },
  {
    id: "da troll calla",
    displayName: "Da Troll Calla",
    description:
      "Unless he is fleeing, friendly Troll Mobs within Ogdruz's Command range may use his Leadership characteristic instead of their own.",
    phases: ["command"],
  },
  {
    id: "ignore goblin panic",
    displayName: "Ignore Goblin Panic",
    passive: true,
    phases: [],
    description:
      "Does not take Panic tests caused by friendly Goblinoid units being destroyed or fleeing through the unit.",
  },
  {
    id: "indiscriminate hunger",
    displayName: "Indiscriminate Hunger",
    description:
      'At Start of Turn, if within 1" of a friendly unit, take a Leadership test. If failed, the unit attacks the nearest friendly unit this turn instead of the nearest enemy.',
    phases: ["start-of-turn"],
    yourTurnOnly: true,
  },
  {
    id: "motherly love",
    displayName: "Motherly Love",
    passive: true,
    phases: [],
    description:
      "Friendly Troll units within Command range may use this model's Leadership for Leadership tests and may re-roll failed Regeneration saves.",
  },
  {
    id: "protect da boss",
    displayName: "Protect Da Boss",
    description:
      "A character joined to this unit improves their armour save by 1 (max 1+). The character may use Look Out, Sir! with only 2 rank-and-file models present (instead of 5).",
    phases: ["choose-fight"],
  },
  {
    id: "slimy shanks",
    displayName: "Slimy Shanks",
    passive: true,
    phases: [],
    description:
      "Unit ignores the movement penalties for difficult terrain. Enemy models moving into base contact with this unit treat that movement as difficult terrain.",
  },
  {
    id: "enhanced regeneration",
    displayName: "Enhanced Regeneration",
    description:
      "Models with Regeneration (X+) may re-roll failed Regeneration saves against Wounds caused by non-magical attacks.",
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "ignore panic",
    displayName: "Ignore Panic",
    description:
      'No Panic test when a friendly unit without Ignore Panic is destroyed or Breaks and flees within 6", or when fled through by a friendly unit without Ignore Panic.',
    phases: ["shoot", "compulsory-moves", "break-test"],
  },
  {
    id: "fear of elves",
    displayName: "Fear of Elves",
    passive: true,
    description:
      "Elves of any type cause Fear in models with this special rule.",
    phases: [],
  },
  {
    id: "release the fanatics!",
    displayName: "Release the Fanatics!",
    aliases: ["release the fanatics"],
    description:
      'Unless fleeing or in Marching Column, a concealing unit may release Fanatics: place each within 3". They move 2D6" in your chosen direction this Compulsory Moves, randomly after that, through units; a natural double or terrain contact removes them. Can\'t be charged; can be shot as a lone character.',
    phases: [
      {
        subPhaseId: "start-of-turn",
        description:
          'Concealing units (not fleeing or in Marching Column) may release Fanatics: place each within 3" of the unit.',
        yourTurnOnly: true,
      },
      {
        subPhaseId: "compulsory-moves",
        description:
          'Fanatics move 2D6" (your chosen direction the turn released, random after), through any units. A natural double, or touching difficult/dangerous/impassable terrain or a linear obstacle, removes them. Two Fanatics colliding are both removed.',
      },
    ],
  },
  {
    id: "skulking menace",
    displayName: "Skulking Menace",
    description:
      "Nasty Skulkers hide in a Goblin Mob and must be revealed at the start of its first round of combat (placed as joined characters); removed if the unit is destroyed or flees first.",
    phases: ["choose-fight"],
  },
  {
    id: "syphoned strength",
    displayName: "Syphoned Strength",
    description:
      'Within 3" of a friendly, non-fleeing Troll Mob of US 6+, +1 to Casting rolls.',
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "bully",
    displayName: "Bully",
    description:
      "Deploys with its war machine and can't leave it. Unless fleeing, friendly war machines within its Command range may use its Leadership.",
    passive: true,
    phases: [],
  },
];

export default RULES;
