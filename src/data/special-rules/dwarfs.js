/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  // ─── Dwarfs ───────────────────────────────────────────────────────────

  {
    id: "ancestral grudge",
    displayName: "Ancestral Grudge",
    description:
      "Hatred (enemy characters). If joined to Longbeards or Hammerers, that unit also gains this rule.",
    phases: ["choose-fight"],
  },
  {
    id: "ancestral fury",
    displayName: "Ancestral Fury",
    description:
      'During a turn in which the unit charged 3" or more, or made a follow-up move, gains +1 Strength.',
    phases: ["choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "gromril armour",
    displayName: "Gromril Armour",
    description: "Re-roll natural 1s on Armour Save rolls.",
    phases: ["shoot", "choose-fight"],
    opponentOnly: false,
  },
  {
    id: "gromril weapons",
    displayName: "Gromril Weapons",
    description:
      "Hand weapon has AP -1. Does not apply with two hand weapons, other weapon types, or runed weapons.",
    phases: ["choose-fight"],
  },
  {
    id: "deathblow",
    displayName: "Deathblow",
    description:
      "When reduced to zero Wounds by an enemy attack during Combat, the unit that killed it suffers a S3 AP -1 hit (or the attacking model if in a challenge).",
    phases: ["choose-fight"],
    opponentOnly: true,
  },
  {
    id: "dwarf crafted",
    displayName: "Dwarf Crafted",
    description:
      "No -1 To Hit penalty for shooting as a Stand & Shoot charge reaction.",
    phases: ["declare-charges"],
    opponentOnly: true,
  },
  {
    id: "rune lore",
    displayName: "Rune Lore",
    description:
      'May attempt a Wizardly Dispel as if a Wizard, without Wizard Levels: Anvil of Doom 24" range, +3; Runelord 21", +2; Runesmith 18", +1.',
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    opponentOnly: true,
  },
  {
    id: "forgefire",
    displayName: "Forgefire",
    description:
      "A unit this character joins gains Armour Bane (2) and Flaming Attacks (lost if the character leaves).",
    phases: ["choose-fight"],
  },
  {
    id: "doomseeker",
    displayName: "Doomseeker",
    description:
      "At the end of the battle a slain Doomseeker is worth no Victory Points; a surviving one gives the enemy bonus VP equal to its points cost.",
    phases: ["scoring"],
  },
  {
    id: "whirlwind of death",
    displayName: "Whirlwind of Death",
    description:
      "Impact Hits use the whirling blades of death profile. To Wound rolls of 4+ always succeed, regardless of Toughness.",
    phases: ["choose-fight"],
  },
  {
    id: "runes of warding",
    displayName: "Runes of Warding",
    description: "5+ Ward save against wounds from Flaming Attacks.",
    passive: true,
    phases: [],
    ward: "5+ (Flaming Attacks)",
  },
  {
    id: "ancestral shield",
    displayName: "Ancestral Shield",
    description:
      "The Anvil of Doom and the Forgefather & Anvil Guard have a 5+ Ward save against any wounds suffered.",
    passive: true,
    phases: [],
    ward: "5+",
  },
  {
    id: "strike the runes",
    displayName: "Strike the Runes",
    description:
      "Can cast the Bound spells (Power Level 2) Rune of Oath & Steel, Rune of Hearth & Home, Rune of Haste & Urgency and Rune of Wrath & Ruin.",
    phases: ["conjuration", "shoot"],
    yourTurnOnly: true,
  },
  {
    id: "slayer of daemons",
    displayName: "Slayer of Daemons",
    description:
      "To Wound rolls of 4+ always succeed, regardless of Toughness. Unsaved wounds against Warp-spawned models or Behemoths have Multiple Wounds (D3).",
    phases: ["choose-fight"],
  },
  {
    id: "artillery master",
    displayName: "Artillery Master",
    description:
      "Unless fleeing or in combat, once per turn a friendly Quarrellers, Thunderers or Dwarf war machine unit within Command range may re-roll natural 1s To Hit, or re-roll one Artillery dice.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "entrenchment",
    displayName: "Entrenchment",
    description:
      "For each character with this rule, Entrench one non-character war machine during deployment: it counts as behind partial cover and defending a low linear obstacle until it moves.",
    phases: ["deployment"],
  },
  {
    id: "stand back chief",
    displayName: '"Stand Back Chief"',
    aliases: ['"stand back chief"', "stand back, chief"],
    description:
      'Cannot be targeted by enemy shooting or enemy spells whilst within 3" of a friendly war machine unit.',
    phases: ["shoot", "conjuration"],
    opponentOnly: true,
  },
  {
    id: "venerable",
    displayName: "Venerable",
    description:
      'Unless this unit is fleeing, friendly units within 6" may re-roll failed Panic tests.',
    phases: ["shoot", "compulsory-moves", "break-test"],
  },
  {
    id: "runes of protection",
    displayName: "Runes of Protection",
    description: "6+ Ward save against wounds from non-magical enemy attacks.",
    passive: true,
    phases: [],
    ward: "6+ (non-magical)",
  },
  {
    id: "fight me!",
    displayName: '"Fight Me!"',
    aliases: ['"fight me!"', "fight me"],
    description:
      "Every model with this rule can issue and accept challenges as if it were a character.",
    phases: ["choose-fight"],
  },
  {
    id: "dive bomb",
    displayName: "Dive Bomb",
    description:
      "Once per game, fly over one enemy unit not in combat: after moving, it suffers D6 S3 AP -1 hits per model that moved over it. Each natural 1 rolled for hits: this unit loses a Wound instead.",
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "royal guard",
    displayName: "Royal Guard",
    description:
      "One Hammerers unit per King or Thane. While joined by a King or Thane, every model can issue and accept challenges as if a character.",
    phases: ["choose-fight"],
  },
  {
    id: "stoic defenders",
    displayName: "Stoic Defenders",
    description: "In a turn it was charged, +1 Initiative and +1 Attacks.",
    phases: ["choose-fight"],
    opponentOnly: true,
  },
  {
    id: "bombing run",
    displayName: "Bombing Run",
    description:
      "Fly over one enemy unit not in combat; after moving, roll D6 on the Bombing Run table.",
    phases: [
      {
        subPhaseId: "remaining-moves",
        description:
          "Fly over one enemy unit not in combat; after moving, roll D6 on the Bombing Run table.",
        yourTurnOnly: true,
        table: [
          { D6: "1", Result: "Premature Detonation: this model loses 1 Wound" },
          { D6: "2", Result: "Dud: the enemy unit loses 1 Wound" },
          {
            D6: "3-4",
            Result:
              'Direct Hit: large (5") template over the unit\'s centre, scatters D6"; S4 AP -1 hits',
          },
          {
            D6: "5-6",
            Result:
              'Bombs Away: two small (3") templates over the unit, each scatters D6"; S4 AP -1 hits',
          },
        ],
      },
    ],
  },
  {
    id: "dig in!",
    displayName: '"Dig In!"',
    aliases: ['"dig in!"', "dig in"],
    description:
      "If not in combat, take a Leadership test: if passed, this character and its unit are Entrenched (partial cover, defending a low linear obstacle) until they move.",
    phases: ["command"],
  },
  {
    id: "hostile terrain",
    displayName: "Hostile Terrain",
    description:
      "Any enemy model ending its move within the Command range of a non-fleeing, non-engaged character with this rule takes a Dangerous Terrain test.",
    phases: ["remaining-moves", "compulsory-moves"],
    opponentOnly: true,
  },
  {
    id: "hit & run",
    displayName: "Hit & Run",
    aliases: ["hit and run"],
    description:
      "If it wins a round of combat, may Fall Back in Good Order instead of following up or pursuing.",
    phases: ["combat-result"],
  },
  {
    id: "king of the slayer hold",
    displayName: "King of the Slayer Hold",
    description:
      "Ungrim may join Hammerers or Slayers. Hammerers he joins gain Immune to Psychology and Unbreakable. As General of a Royal Clan army: Daemon and Dragon Slayers as Characters, 0-1 Slayers per 1,000 pts as Core, 0-4 Doomseekers per 1,000 pts as Special.",
    passive: true,
    phases: [],
  },
  {
    id: "blessings of grimnir",
    displayName: "Blessings of Grimnir",
    description:
      'May attempt a Wizardly Dispel as if a Wizard: Dispel range 21", +1 to Dispel rolls.',
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    opponentOnly: true,
  },
  {
    id: "slayer",
    displayName: "Slayer",
    description:
      "To Wound rolls of 4+ always succeed, regardless of target's Toughness.",
    phases: ["choose-fight"],
  },
  {
    id: "slayer of dragons",
    displayName: "Slayer of Dragons",
    description:
      "To Wound rolls of 4+ always succeed. Each unsaved wound against a behemoth has Multiple Wounds (D3).",
    phases: ["choose-fight"],
  },
  {
    id: "prepared positions",
    displayName: "Prepared Positions",
    description:
      "During deployment, Entrench one non-character war machine and one unit of Quarrellers or Thunderers: partial cover and defending a low linear obstacle until they move.",
    phases: ["deployment"],
  },
  {
    id: "range finding optics",
    displayName: "Range Finding Optics",
    description:
      "Unless fleeing or in combat, once per turn a friendly Quarrellers, Thunderers or Dwarf war machine unit within Command range may re-roll To Hit 1s or one Artillery dice. Burlok and his unit ignore the long range penalty.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "borne aloft",
    displayName: "Borne Aloft",
    description:
      "The character and three Shieldbearers form one model with a split profile (Split Profile (Cavalry)); otherwise heavy infantry.",
    passive: true,
    phases: [],
  },
  {
    id: "grudgelore",
    displayName: "Grudgelore",
    description:
      "Once the Grudgestone is set, Thorgrim and his unit replace Hatred (Orcs & Goblins) with Hatred (all enemies).",
    phases: ["choose-fight"],
  },
];

export default RULES;
