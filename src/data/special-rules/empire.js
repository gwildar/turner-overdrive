/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  {
    id: "hold the line!",
    displayName: '"Hold the Line!"',
    aliases: ["hold the line"],
    description:
      "This character and any joined unit automatically pass any Panic tests they are required to make.",
    phases: ["break-test"],
  },
  {
    id: "prayers of sigmar",
    displayName: "Prayers of Sigmar",
    description:
      "During Command sub-phase: take a Leadership test. If passed, one Prayer takes effect until next Start of Turn. Includes: Hammer of Sigmar (+1S, +1A for self and joined unit), Shield of Sigmar (5+ Ward), Sigmar's Condemnation (fear-causing, auto-wound on 6 vs chaos/undead).",
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "prayers of ulric",
    displayName: "Prayers of Ulric",
    description:
      "During Command sub-phase: take a Leadership test. If passed, one Prayer takes effect. Includes: Battle Howl (Terror and +1S for self and joined unit until next Start of Turn), Winter's Fury (Flaming Attacks, re-roll 1s To Wound), Wolf's Speed (+D3\" Movement).",
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "master of battle",
    displayName: "Master of Battle",
    description:
      "A joined unit of Empire Knights, Inner Circle Knights or Demigryph Knights gains Immune to Psychology (lost if this model leaves).",
    passive: true,
    phases: [],
  },
  {
    id: "feel no pain",
    displayName: "Feel No Pain",
    description:
      "6+ Ward save against wounds from non-magical enemy attacks; 5+ against those of Strength 5 or higher.",
    passive: true,
    phases: [],
    ward: "6+ (5+ vs non-magical S5+)",
  },
  {
    id: "holy fervour",
    displayName: "Holy Fervour",
    description:
      'Unless this unit is fleeing, friendly units within 6" automatically pass Fear tests and may re-roll failed Panic tests.',
    phases: ["choose-fight", "shoot", "compulsory-moves", "break-test"],
  },
  {
    id: "symbol of might",
    displayName: "Symbol of Might",
    description:
      'A Lector of Sigmar on the War Altar has a 12" Command range (18" if General).',
    passive: true,
    phases: [],
  },
  {
    id: "witch bane",
    displayName: "Witch Bane",
    description:
      "All Wizards (friend or foe) within this model's Command range suffer -2 to Casting rolls.",
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
  },
  {
    id: "suffer not",
    displayName: "Suffer Not...",
    aliases: ["suffer not...", "suffer not…"],
    description:
      "Specialism chosen at list building (tell your opponent at deployment). The Witch Hunter and any unit it joins gain: The Witch — Hatred (enemy Wizards), Magic Resistance (-2); The Revenant — Hatred (Undead), Flaming Attacks; The Mutant — Hatred (Warriors & Beasts of Chaos), Magic Resistance (-1); The Daemon — Hatred (Daemonic models), Magical Attacks.",
    phases: ["deployment", "choose-fight"],
  },
  {
    id: "clouds of soot & smoke",
    displayName: "Clouds of Soot & Smoke",
    aliases: ["clouds of soot and smoke"],
    description:
      'Unless mounted, counts as behind full cover whilst within 3" of a friendly war machine unit.',
    phases: ["shoot"],
    opponentOnly: true,
  },
  {
    id: "master of ballistics",
    displayName: "Master of Ballistics",
    description:
      "Unless fleeing or in combat, once per turn a friendly Empire war machine within Command range may use this model's BS or re-roll one Artillery dice.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "crushing weight",
    displayName: "Crushing Weight",
    description:
      "Stomp Attacks have AP -1. Treats low linear obstacles as dangerous terrain (not impassable).",
    phases: ["remaining-moves", "choose-fight"],
  },
  {
    id: "stable firing platform",
    displayName: "Stable Firing Platform",
    description:
      "The crew's missile weapons can shoot even if the War Wagon marched this turn.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "nuln state troops",
    displayName: "Nuln State Troops",
    description:
      "Army building: a regimental unit of (Veteran) State Troops with halberds plus 1-2 detachments of State Missile Troops (handguns) and/or Swordsmen (hand weapons and shields). Detachments may upgrade a Sergeant for free.",
    passive: true,
    phases: [],
  },
  {
    id: "steam power",
    displayName: "Steam Power",
    description:
      "Cannot march. Instead may roll 2D6, discard the lowest, and add the result to Movement (see Temperamental).",
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "temperamental",
    displayName: "Temperamental",
    description:
      "A natural 1 on either dice of a Steam Power or Charge roll: choose Bang! (lose 1 Wound) or Phweee! (halt, cannot move again this turn). Double 1: lose 1 Wound and halt.",
    phases: ["declare-charges", "remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "prayer of the damned",
    displayName: "Prayer of the Damned",
    description:
      "Take a Leadership test (own Leadership). If passed, until your next Start of Turn this character and its unit have a 6+ Ward save, 5+ against wounds caused in combat by Fear- or Terror-causing enemies.",
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "zealot",
    displayName: "Zealot",
    description: "Can only join a unit with the Fanatical Zeal rule.",
    passive: true,
    phases: [],
  },
  {
    id: "fanatical zeal",
    displayName: "Fanatical Zeal",
    description:
      "Can only be joined by a Lector or Priest of Sigmar, who becomes Unbreakable while with the unit.",
    passive: true,
    phases: [],
  },
  {
    id: "inner circle",
    displayName: "Inner Circle",
    description:
      "In combat, this model (not its mount) may re-roll To Hit rolls of a natural 1.",
    phases: ["choose-fight"],
  },
  {
    id: "blessings of ulric",
    displayName: "Blessings of Ulric",
    description: "6+ Ward save against wounds from Flaming Attacks.",
    passive: true,
    phases: [],
    ward: "6+ (Flaming Attacks)",
  },
  {
    id: "grand master of the knights panther",
    displayName: "Grand Master of the Knights Panther",
    description:
      "Knights Panther: may re-roll one natural 1 on a Charge roll (before discarding dice). May only join a Knights Panther unit.",
    phases: ["declare-charges"],
    yourTurnOnly: true,
  },
  {
    id: "skilled duellist",
    displayName: "Skilled Duellist",
    description:
      "If he slays an enemy in a challenge in a turn he charged, he may issue a second challenge, fought immediately (not his mount).",
    phases: ["choose-fight"],
    yourTurnOnly: true,
  },
];

export default RULES;
