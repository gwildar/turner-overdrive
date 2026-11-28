/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  {
    id: "stampede",
    displayName: "Stampede",
    description: "Impact Hits caused by this model have AP -2.",
    phases: ["choose-fight"],
  },
  {
    id: "backstab",
    displayName: "Backstab",
    description:
      "When engaged with an enemy unit's flank or rear arc, may re-roll failed To Hit rolls against that unit.",
    phases: ["choose-fight"],
  },
  {
    id: "blackshard armour",
    displayName: "Blackshard Armour",
    description:
      "5+ Ward save against wounds from Flaming Attacks. A Wizard with this rule may wear armour without penalty.",
    passive: true,
    phases: [],
    ward: "5+ (Flaming Attacks)",
  },
  {
    id: "infernal engineer",
    displayName: "Infernal Engineer",
    description:
      "Unless fleeing or in combat, once per turn a friendly war machine within Command range may re-roll one Scatter or Artillery dice.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "sorcerers curse",
    displayName: "Sorcerer's Curse",
    aliases: ["sorcerer's curse"],
    description:
      "On a miscast, take a Toughness test. Fail = lose 1 Wound and gain +1 Toughness instead of rolling on the Miscast table. Pass = roll on the Miscast table as normal.",
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "quell panic",
    displayName: "Quell Panic",
    description:
      'Unless this unit is fleeing, friendly Levies units within 6" may re-roll failed Panic tests.',
    phases: ["shoot", "compulsory-moves", "break-test"],
  },
  {
    id: "blazing body",
    displayName: "Blazing Body",
    description:
      "At the start of every Combat phase, every model (friend or foe) in base contact without this rule suffers a S3 Flaming hit (no AP). Wounds lost to these hits don't count towards combat result.",
    phases: ["choose-fight"],
  },
  {
    id: "carriage hauler",
    displayName: "Carriage Hauler",
    description:
      'Up to two friendly war machines with Steam Carriage, completely within its rear arc and within 8" at the start of the phase, may move when it moves, finishing in the same area. They count as not having moved unless it used Lumbering Destruction or charged.',
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "lumbering destruction",
    displayName: "Lumbering Destruction",
    description:
      "Cannot march. Instead may roll D6 and add it to Movement — on a natural 1 it halts immediately and cannot move again this turn.",
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "hellbound",
    displayName: "Hellbound",
    description:
      "6+ Ward save against wounds from non-magical enemy attacks; gains Fear and Magical Attacks (Terror if it already has Fear). Once per game, may re-roll one Scatter or Artillery dice. -1 to any Misfire table roll.",
    phases: ["shoot"],
    ward: "6+ (non-magical)",
  },
  {
    id: "skullcracker",
    displayName: "Skullcracker",
    description:
      "Impact Hits (D6+1) become Impact Hits (2D6+2), and it gains Armour Bane (1).",
    phases: ["choose-fight"],
  },
  {
    id: "quake",
    displayName: "Quake",
    description:
      'Until your next Start of Turn, every unit (friend or foe) within 2D6" of the central hole of the scattered template has -1 Movement and cannot use Swiftstride.',
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "slow reload",
    displayName: "Slow Reload",
    description:
      "If it shot last turn, roll D6 before shooting: on 1-2 it does not shoot this turn (+1 with an Ogre Loader).",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "sorcerous miasma",
    displayName: "Sorcerous Miasma",
    description:
      "In combat, enemy models attacking a character on a Lammasu with a magic weapon count as armed with a hand weapon instead.",
    phases: ["choose-fight"],
  },
];

export default RULES;
