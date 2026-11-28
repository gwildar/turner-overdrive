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
    id: "scouts",
    displayName: "Scouts",
    passive: true,
    description:
      'Deploy after all other units from both armies. Must be placed >12" from enemy models. Cannot charge on first turn.',
    phases: [],
  },
  {
    id: "vanguard",
    displayName: "Vanguard",
    description:
      "After deployment, make a Vanguard move (basic movement, no march). Cannot declare charges on first turn.",
    phases: [],
  },
  {
    id: "stupidity",
    displayName: "Stupidity",
    description:
      "Unless fleeing or in combat, test Ld. If failed: cannot move, shoot, cast, or dispel until next Start of Turn. Must Hold if charged.",
    phases: ["start-of-turn"],
    yourTurnOnly: true,
  },
  {
    id: "ambushers",
    displayName: "Ambushers",
    aliases: ["Ambush"],
    phases: [
      {
        subPhaseId: "start-of-turn",
        fromRound: 2,
        description:
          "Roll D6 for each unit in reserve. 4+: arrives during Compulsory Moves. Auto-arrives round 5.",
      },
      {
        subPhaseId: "compulsory-moves",
        fromRound: 2,
        description:
          'Arriving Ambushers enter from any board edge chosen by controlling player, >8" from enemy. Cannot march; count as having moved for shooting.',
      },
    ],
  },
  {
    id: "rallying cry",
    displayName: "Rallying Cry",
    description:
      "During Command sub-phase, a non-engaged character nominates a fleeing friendly unit within Command range to take a Rally test. If failed, the unit may still try again in the Rally sub-phase.",
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "frenzy",
    displayName: "Frenzy",
    phases: [
      {
        subPhaseId: "declare-charges",
        description:
          "If majority Frenzied, unit must declare a charge if able. Cannot choose Flee as a charge reaction.",
      },
      {
        subPhaseId: "choose-fight",
        description:
          "+1 Attack during a turn the unit charged or the turn after a follow-up move. Auto-passes Fear, Panic, Terror tests. Lost after losing a combat round.",
      },
      {
        subPhaseId: "pursuit",
        description: "Cannot make Restraint tests — must pursue.",
      },
    ],
    yourTurnOnly: true,
  },
  {
    id: "impetuous",
    displayName: "Impetuous",
    description:
      "If able to charge, must take Ld test. If failed, must declare a charge.",
    phases: ["declare-charges"],
    yourTurnOnly: true,
  },
  {
    id: "counter charge",
    displayName: "Counter Charge",
    description:
      "Charge reaction vs cavalry/chariots/monsters charging front arc. Pivot to face, move D3+1\" toward charger. Both units count as having charged. Cannot use if distance < charger's M.",
    phases: ["declare-charges"],
    opponentOnly: true,
  },
  {
    id: "fire & flee",
    displayName: "Fire & Flee",
    description:
      "Charge reaction: Stand & Shoot then Flee. Flee roll discards lowest D6. Cannot use if distance < charger's M.",
    phases: ["declare-charges"],
    opponentOnly: true,
  },
  {
    id: "feigned flight",
    displayName: "Feigned Flight",
    description:
      "If this unit Flees (or Fire & Flees) as a charge reaction, it automatically rallies at the end of its move.",
    phases: ["declare-charges"],
  },
  {
    id: "random movement",
    displayName: "Random Movement",
    description:
      "Moves only during Compulsory Moves (distance determined by dice roll). Cannot march, charge, or manoeuvre beyond wheeling. Contacting an enemy counts as a charge.",
    phases: ["compulsory-moves"],
  },
  {
    id: "drilled",
    displayName: "Drilled",
    description:
      'Free "redress the ranks" before moving. Can march within 8" of enemy without Ld test. Characters joining the unit gain Drilled.',
    phases: ["remaining-moves"],
  },
  {
    id: "swiftstride",
    displayName: "Swiftstride",
    chargeMod: { range: 3, tag: "Swift", color: "green", order: 1 },
    phases: [
      {
        subPhaseId: "declare-charges",
        yourTurnOnly: true,
        description:
          'Max declarable charge range is M+6+3" (instead of M+6"). May add +D6 to Charge, Flee, or Pursuit rolls.',
      },
      {
        subPhaseId: "pursuit",
        description: "May add +D6 to Pursuit or Flee rolls.",
      },
    ],
  },
  {
    id: "fly",
    displayName: "Fly",
    phases: [
      {
        subPhaseId: "remaining-moves",
        yourTurnOnly: true,
        description:
          'Move using Fly (X) characteristic, passing freely over models/terrain. Can march within 8" of enemy without Ld test. Must start and end on ground. Cannot join units without Fly. May charge using Fly movement, passing over intervening models and terrain.',
      },
    ],
  },
  {
    id: "fast cavalry",
    displayName: "Fast Cavalry",
    description: "In Open Order, may perform Quick Turn even after marching.",
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "move through cover",
    displayName: "Move Through Cover",
    description:
      "No movement penalty for difficult/dangerous terrain. Re-roll 1s on Dangerous Terrain tests.",
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "lumbering",
    displayName: "Lumbering",
    description:
      "After moving, unless it charged, marched or fled, a Lumbering model may pivot about its centre to change its facing by up to 90°.",
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "dragged along",
    displayName: "Dragged Along",
    description:
      "If within 1\" of a friendly infantry unit (10+ models, not fleeing), may use that unit's Movement characteristic.",
    phases: ["remaining-moves"],
  },
  {
    id: "stony stare",
    displayName: "Stony Stare",
    description:
      "At the start of each Combat phase, enemy models in base contact must pass an Initiative test or suffer D3 S2 hits. No armour saves (Ward and Regeneration allowed).",
    phases: ["choose-fight"],
  },
  {
    id: "cleaving blow",
    displayName: "Cleaving Blow",
    description:
      "Natural 6 To Wound: regular infantry, heavy infantry, light/heavy cavalry, and war beasts cannot take armour or Regeneration saves (Ward saves allowed).",
    phases: ["choose-fight"],
  },
  {
    id: "breath weapon",
    displayName: "Breath Weapon",
    description:
      "Once per round in Shooting phase. Place flame template from model's front arc. Cannot be used in combat or for Stand & Shoot.",
    phases: ["shoot"],
  },
  {
    id: "volley fire",
    displayName: "Volley Fire",
    description:
      "Half the models in each rank beyond the front (rounding up) may shoot, in addition to front rank. Cannot use if moved or declared Stand & Shoot.",
    phases: ["shoot"],
  },
  {
    id: "move & shoot",
    displayName: "Move & Shoot",
    description:
      "Weapon can be used in the Shooting phase even if the model marched.",
    phases: ["shoot"],
  },
  {
    id: "move or shoot",
    displayName: "Move or Shoot",
    description:
      "Weapon cannot be used if the model moved for any reason this turn (including rallying or reforming).",
    phases: ["shoot"],
  },
  {
    id: "needs more nails",
    displayName: "Needs More Nails",
    description:
      "When firing Grapeshot: declare target and check range, then roll an Artillery dice. On a Misfire, roll on the Misfire table immediately. On a number, the target suffers that many automatic hits.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "multiple shots",
    displayName: "Multiple Shots",
    description:
      "Fire X shots at -1 To Hit, or a single shot at normal BS. Entire unit must choose the same option.",
    phases: ["shoot"],
  },
  {
    id: "quick shot",
    displayName: "Quick Shot",
    description:
      "No -1 To Hit penalty for moving and shooting. Can Stand & Shoot regardless of distance.",
    phases: ["shoot"],
  },
  {
    id: "ignores cover",
    displayName: "Ignores Cover",
    description: "Ignore To Hit modifiers from partial or full cover.",
    phases: ["shoot"],
  },
  {
    id: "ponderous",
    displayName: "Ponderous",
    description:
      "-2 To Hit when moving and shooting (instead of the normal -1).",
    phases: ["shoot"],
  },
  {
    id: "cumbersome",
    displayName: "Cumbersome",
    description: "Weapon cannot be used for Stand & Shoot charge reactions.",
    phases: ["declare-charges", "shoot"],
  },
  {
    id: "evasive",
    displayName: "Evasive",
    description:
      "When targeted during opponent's Shooting phase, unit may Fall Back in Good Order (flee away from the shooter then auto-rally).",
    phases: ["shoot"],
    opponentOnly: true,
  },
  {
    id: "reserve move",
    displayName: "Reserve Move",
    description:
      "After all shooting, if unit did not charge/march/flee, make a basic move (no march). Resolved at end of Shooting phase.",
    phases: ["reserve-moves"],
  },
  {
    id: "elven reflexes",
    displayName: "Elven Reflexes",
    description:
      "+1 Initiative (max 10) during the first round of any combat. Does not apply to mount.",
    phases: ["choose-fight"],
  },
  {
    id: "strike first",
    displayName: "Strike First",
    description:
      "Initiative becomes 10 (before other modifiers). Cancelled out by Strike Last.",
    phases: ["choose-fight"],
  },
  {
    id: "strike last",
    displayName: "Strike Last",
    description:
      "Initiative becomes 1 (before other modifiers). Cancelled out by Strike First.",
    phases: ["choose-fight"],
  },
  {
    id: "extra attacks",
    displayName: "Extra Attacks",
    description:
      "+X modifier to Attacks characteristic. If random, roll when combat is chosen.",
    phases: ["choose-fight"],
  },
  {
    id: "random attacks",
    displayName: "Random Attacks",
    description:
      "Roll dice to determine number of attacks each combat turn. Roll separately for each model.",
    phases: ["choose-fight"],
  },
  {
    id: "furious charge",
    displayName: "Furious Charge",
    description:
      '+1 Attack during a turn in which the model charged 3" or more.',
    phases: ["choose-fight"],
  },
  {
    id: "first charge",
    displayName: "First Charge",
    description:
      "If the unit's first charge of the game is successful, the charge target becomes Disrupted until end of Combat phase.",
    phases: ["choose-fight"],
  },
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
    id: "wilful beast",
    displayName: "Wilful Beast",
    description:
      "At Start of Turn, mount makes a Leadership test (unmodified). If failed, the mount gains Frenzy (not the rider, and no +1 Attack for rider) until next Start of Turn.",
    phases: ["start-of-turn"],
  },
  {
    id: "witchbrew",
    displayName: "Witchbrew",
    passive: true,
    description:
      "This character, their mount, and any unit they have joined cannot lose the Frenzy special rule.",
    phases: [],
  },
  {
    id: "hatred",
    displayName: "Hatred",
    description:
      "Re-roll failed To Hit rolls against hated enemies during the first round of combat.",
    phases: ["choose-fight"],
  },
  {
    id: "killing blow",
    displayName: "Killing Blow",
    description:
      "Natural 6 To Wound: infantry/cavalry target cannot take armour or Regeneration saves (Ward saves allowed). Loses all remaining Wounds.",
    phases: ["choose-fight"],
  },
  {
    id: "monster slayer",
    displayName: "Monster Slayer",
    description:
      "Natural 6 To Wound vs monsters: no armour or Regeneration saves (Ward saves allowed). Monster loses all remaining Wounds.",
    phases: ["choose-fight"],
  },
  {
    id: "fear",
    displayName: "Fear",
    phases: [
      {
        subPhaseId: "declare-charges",
        opponentOnly: true,
        description:
          "When charging a Fear-causing unit with higher Unit Strength, take Ld test or fail the charge.",
      },
      {
        subPhaseId: "choose-fight",
        description:
          "When fighting a Fear-causing enemy with higher Unit Strength, take Ld test or suffer -1 To Hit against that enemy.",
      },
    ],
  },
  {
    id: "terror",
    displayName: "Terror",
    phases: [
      {
        subPhaseId: "declare-charges",
        yourTurnOnly: true,
        description:
          "When a Terror-causing unit declares a charge, the target takes Ld test — failed = must Flee. Also causes Fear.",
      },
      {
        subPhaseId: "break-test",
        description:
          "If the winning side includes Terror-causing units, losing units suffer -1 Ld on Break tests.",
      },
    ],
  },
  {
    id: "fight in extra rank",
    displayName: "Fight in Extra Rank",
    description: "Models behind the fighting rank may make supporting attacks.",
    phases: ["choose-fight"],
  },
  {
    id: "shieldwall",
    displayName: "Shieldwall",
    description:
      "Once per game, a Close Order unit with shields that is charged may Give Ground instead of Falling Back in Good Order.",
    phases: ["break-test"],
  },
  {
    id: "stubborn",
    displayName: "Stubborn",
    description:
      "May decline first Break test — automatically Falls Back in Good Order instead. Does not transfer between Stubborn characters and non-Stubborn units.",
    phases: ["break-test"],
  },
  {
    id: "unbreakable",
    displayName: "Unbreakable",
    description:
      "Never takes Break tests. Automatically Gives Ground when losing combat. Non-Unbreakable characters cannot join.",
    phases: ["break-test"],
  },
  {
    id: "unstable",
    displayName: "Unstable",
    description:
      "Loses 1 extra Wound per point of combat result lost by. No Regeneration saves. Wounds split between characters and unit.",
    phases: ["break-test"],
  },
  {
    id: "untutored arcanist",
    displayName: "Untutored Arcanist",
    description:
      "When rolling on the Miscast table, roll an extra D6 and discard the highest result.",
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
  },
  {
    id: "timmm-berrr!",
    displayName: "Timmm-berrr!",
    description:
      "When a behemoth is slain, roll off to determine fall direction. Units in base contact in that arc suffer D6 hits at model's S with AP -1.",
    phases: ["choose-fight"],
  },
  {
    id: "poisoned attacks",
    displayName: "Poisoned Attacks",
    phases: [
      {
        subPhaseId: "shoot",
        yourTurnOnly: true,
        description:
          "Natural 6 To Hit: +2 To Wound modifier. Cannot use if To Hit needs 7+ or hits automatically. Does not apply to spells or magic weapons.",
      },
      {
        subPhaseId: "choose-fight",
        description:
          "Natural 6 To Hit: +2 To Wound modifier. Cannot use if To Hit needs 7+ or hits automatically.",
      },
    ],
  },
  {
    id: "flaming attacks",
    displayName: "Flaming Attacks",
    description:
      "Attacks are Flaming. Causes Fear in war beasts/swarms. Does not apply to spells or magic weapons.",
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "multiple wounds",
    displayName: "Multiple Wounds",
    description:
      "Each unsaved wound is multiplied by X. Excess wounds do not spill over to other models.",
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "regeneration",
    displayName: "Regeneration",
    phases: [
      {
        subPhaseId: "shoot",
        description:
          "After losing a Wound, roll D6: X+ recovers the Wound (still counts for combat result). AP rules do not affect Regeneration.",
      },
      {
        subPhaseId: "choose-fight",
        description:
          "After losing a Wound, roll D6: X+ recovers the Wound (still counts for combat result).",
      },
    ],
  },
  {
    id: "blessings of the lady",
    displayName: "Blessings of the Lady",
    description:
      "6+ Ward save (5+ vs S5+). Lost if the unit flees or a character refuses a challenge.",
    phases: ["choose-fight"],
  },
  {
    id: "finest warhorses",
    displayName: "Finest Warhorses",
    phases: [
      {
        subPhaseId: "declare-charges",
        yourTurnOnly: true,
        description:
          "Re-roll any natural 1s on Charge, Flee, or Pursuit rolls (before discarding dice).",
      },
      {
        subPhaseId: "pursuit",
        description:
          "Re-roll any natural 1s on Flee or Pursuit rolls (before discarding dice).",
      },
    ],
  },
  {
    id: "crusader's zeal",
    displayName: "Crusader's Zeal",
    chargeMod: { range: 1, tag: "Zeal", color: "orange", order: 2 },
    phases: [
      {
        subPhaseId: "declare-charges",
        yourTurnOnly: true,
        description:
          '+1" to maximum charge range and +1 to Charge roll result. Also gains Impetuous.',
      },
    ],
  },
  {
    id: "earn your spurs",
    displayName: "Earn Your Spurs",
    description:
      'Enemy standards captured worth 100 VPs. Within 6" of a Grail Vow model or Lord of Bretonnia, re-roll natural 1s To Hit.',
    phases: ["choose-fight"],
  },
  {
    id: "beguiling aura",
    displayName: "Beguiling Aura",
    description:
      "Enemy models must pass Ld test before rolling To Hit against this model; if failed, only natural 6s hit.",
    phases: ["choose-fight"],
    opponentOnly: true,
  },
  {
    id: "Peasant's Duty",
    displayName: "Peasant's Duty",
    description:
      "May Give Ground instead of Fall Back in Good Order. Friendly Levies within Command range re-roll failed Panic tests.",
    phases: ["break-test"],
  },
  {
    id: "the grail vow",
    displayName: "The Grail Vow",
    description:
      "Immune to Psychology, Magical Attacks, Stubborn. Cannot refuse challenges.",
    phases: ["choose-fight"],
    ward: "6+ (5+ > S5)",
  },
  {
    id: "the questing vow",
    displayName: "The Questing Vow",
    description: "Stubborn. Re-roll failed Fear, Panic, and Terror tests.",
    phases: ["break-test"],
  },
  {
    id: "exile's vow",
    displayName: "The Exile's Vow",
    aliases: ["the exile's vow", "the exile's vow (replaces the knight's vow)"],
    passive: true,
    phases: [],
    description: "Replaces The Knight's Vow. Grants Stubborn and Veteran.",
    grantsRules: ["stubborn", "veteran"],
  },
  {
    id: "peasantry",
    displayName: "Peasantry",
    description:
      "Within 6\" of a non-fleeing Knight's/Questing/Grail Vow model, may use that model's Ld. Standard cannot be taken as a trophy.",
    phases: ["command", "rally", "break-test"],
  },
  {
    id: "blessed knight",
    displayName: "Blessed Knight",
    phases: [],
    description:
      "The Green Knight has a 5+ Ward save against any wounds suffered.",
    ward: "5+",
  },
  {
    id: "guardian of the sacred sites",
    displayName: "Guardian of the Sacred Sites",
    description:
      "Not deployed. Each Start of Turn he is off the battlefield, roll D6: 3+ awakens him (automatic from round 5).",
    phases: [
      {
        subPhaseId: "start-of-turn",
        description:
          "If the Green Knight is not on the battlefield, roll D6: 3+ awakens him (automatic from round 5).",
        yourTurnOnly: true,
      },
      {
        subPhaseId: "compulsory-moves",
        description:
          'If awakened this turn, place him completely within any natural terrain feature (woods, difficult or dangerous terrain), not within 1" of an enemy.',
        yourTurnOnly: true,
      },
      {
        subPhaseId: "remaining-moves",
        description:
          'Instead of moving, if completely within natural terrain and not in combat, may be removed and placed completely within a different natural terrain feature (not within 1" of an enemy). Cannot move again this phase.',
        yourTurnOnly: true,
      },
    ],
  },

  {
    id: "aura of the fay",
    displayName: "Aura of the Fay",
    description:
      "When slain he is removed but may be awakened again with Guardian of the Sacred Sites, at a cumulative -1 to the roll and -1 Wounds characteristic (min 1) each time. The enemy only scores Victory Points for him the first time.",
    phases: ["start-of-turn"],
    yourTurnOnly: true,
  },

  {
    id: "arcane backlash",
    displayName: "Arcane Backlash",
    phases: [
      {
        subPhaseId: "conjuration",
        opponentOnly: true,
        description:
          "+1 to Dispel rolls. On any natural double (except double 1), the spell is unbound and the casting Wizard loses a Wound.",
      },
      {
        subPhaseId: "remaining-moves",
        opponentOnly: true,
        description:
          "+1 to Dispel rolls vs Conveyance spells. On any natural double (except double 1), the spell is unbound and the casting Wizard loses a Wound.",
      },
      {
        subPhaseId: "shoot",
        opponentOnly: true,
        description:
          "+1 to Dispel rolls vs Magic Missiles. On any natural double (except double 1), the spell is unbound and the casting Wizard loses a Wound.",
      },
      {
        subPhaseId: "choose-fight",
        description:
          "+1 to Dispel rolls vs Assailment spells. On any natural double (except double 1), the spell is unbound and the casting Wizard loses a Wound.",
      },
    ],
  },
  {
    id: "armoured hide",
    displayName: "Armoured Hide",
    passive: true,
    phases: [],
    description:
      "Improves armour value by X. Models without armour are treated as having armour value 7+.",
  },
  {
    id: "close order",
    displayName: "Close Order",
    passive: true,
    phases: [
      {
        subPhaseId: "combat-result",
        description:
          "+1 combat result bonus when in Close Order formation and unit strength >= 10",
      },
    ],
    description:
      "Unit may adopt Close Order formation (ranks and files, base-to-base).",
  },
  {
    id: "open order",
    displayName: "Open Order",
    passive: true,
    phases: [],
    description: "Unit may adopt Open Order formation.",
  },
  {
    id: "skirmishers",
    displayName: "Skirmishers",
    passive: true,
    phases: [],
    description:
      "Unit may adopt Skirmish formation (loose group, increased manoeuvrability).",
  },
  {
    id: "ethereal",
    displayName: "Ethereal",
    passive: true,
    phases: [],
    description:
      "Treats all terrain as open ground. Can only be wounded by Magical attacks. Non-Ethereal characters cannot join.",
  },
  {
    id: "large target",
    displayName: "Large Target",
    passive: true,
    phases: [],
    description:
      "No cover benefit. LoS can be drawn over/through non-Large Target units. Shooters get +1 rank when targeting.",
  },
  {
    id: "flammable",
    displayName: "Flammable",
    passive: true,
    phases: [],
    description: "Cannot make Regeneration saves against Flaming attacks.",
  },
  {
    id: "warp-spawned",
    displayName: "Warp-spawned",
    passive: true,
    phases: [],
    description:
      "Cannot make Regeneration saves against Magical attacks. Non-Warp-spawned characters cannot join.",
  },
  {
    id: "magical attacks",
    displayName: "Magical Attacks",
    passive: true,
    phases: [],
    description:
      "All attacks are Magical. All spells and magic item hits are inherently Magical.",
  },
  {
    id: "immune to psychology",
    displayName: "Immune to Psychology",
    phases: [
      {
        subPhaseId: "combat-result",
        description:
          "Auto-passes Fear, Panic, Terror tests (if majority). Cannot choose Flee as a charge reaction.",
      },
      {
        subPhaseId: "break-test",
        description:
          "Auto-passes Panic and Fear tests (if majority). Still required to take a Break test if combat is lost.",
      },
    ],
  },
  {
    id: "magic resistance",
    displayName: "Magic Resistance",
    passive: true,
    phases: [],
    description:
      "Enemy casting rolls targeting this unit suffer -X penalty. Does not stack (use highest).",
  },
  {
    id: "requires two hands",
    displayName: "Requires Two Hands",
    passive: true,
    phases: [],
    description:
      "Cannot use a shield in combat. Shield still protects against shooting/magic.",
  },
  {
    id: "horde",
    displayName: "Horde",
    passive: true,
    phases: [],
    description: "Max Rank Bonus increased by 1.",
  },
  {
    id: "warband",
    displayName: "Warband",
    passive: true,
    phases: [],
    description:
      "Ld bonus = current Rank Bonus (max Ld 10). May re-roll Charge rolls. Bonus does not apply to Restraint or Impetuous tests.",
  },
  {
    id: "levies",
    displayName: "Levies",
    passive: true,
    phases: [],
    description:
      "Cannot benefit from Inspiring Presence or Hold your Ground. Other units ignore this unit's rout for Panic.",
  },
  {
    id: "mercenaries",
    displayName: "Mercenaries",
    passive: true,
    phases: [],
    description:
      "Cannot benefit from Inspiring Presence or Hold your Ground. Cannot be joined by characters from a different army list.",
  },
  {
    id: "loner",
    displayName: "Loner",
    passive: true,
    phases: [],
    description:
      "Cannot be General. Cannot join a unit without Loner, and vice versa.",
  },
  {
    id: "veteran",
    displayName: "Veteran",
    phases: [
      "rally",
      "remaining-moves",
      {
        subPhaseId: "shoot",
        description:
          "If majority, unit may re-roll failed Leadership tests (not Break tests).",
        opponentOnly: true,
      },
      "choose-fight",
    ],
    description:
      "If majority, unit may re-roll failed Leadership tests (not Break tests).",
  },
  {
    id: "chariot runners",
    displayName: "Chariot Runners",
    passive: true,
    phases: [],
    description:
      'Friendly chariots can draw LoS over/through and move through this unit (Skirmish formation). Unit coherency extends to friendly chariots within 1".',
  },
  {
    id: "detachment",
    displayName: "Detachment",
    passive: true,
    phases: [],
    description:
      "Unit can be fielded as a detachment alongside a parent regiment.",
  },
  {
    id: "regimental unit",
    displayName: "Regimental Unit",
    passive: true,
    phases: [],
    description: "Unit can be accompanied by detachments.",
  },
  {
    id: "motley crew",
    displayName: "Motley Crew",
    passive: true,
    phases: [],
    description:
      "Unit may include differently equipped models or mixed troop types. Separate attack rolls per type; casualties split evenly.",
  },
  {
    id: "monster handlers",
    displayName: "Monster Handlers",
    passive: true,
    phases: ["choose-fight"],
    description:
      "If the monster suffers an unsaved wound, roll a D6. On a roll of 1-4 the monster loses a Wound, but on a roll of 5+ one of the handlers is removed instead.",
  },
  {
    id: "howdah",
    displayName: "Howdah",
    passive: true,
    phases: [],
    description:
      "Split profile (as chariots) and Firing Platform rules. Otherwise treated as a behemoth.",
  },
  {
    id: "arrows of isha",
    displayName: "Arrows of Isha",
    description: "Bows gain Armour Bane (1) and AP -1.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "blessings of asuryan",
    displayName: "Blessings of Asuryan",
    passive: true,
    phases: [],
    description:
      "5+ Ward save against wounds caused by attacks with the Flaming Attacks special rule.",
  },
  {
    id: "blizzard aura",
    displayName: "Blizzard Aura",
    description: "Enemy models in base contact become subject to Strike Last.",
    phases: ["choose-fight"],
  },
  {
    id: "champions of chrace",
    displayName: "Champions of Chrace",
    description:
      'Any model in a Lion Guard unit can accept challenges like a character. Once per turn, a character joined to a Lion Guard unit may re-roll a failed "Look Out, Sir!" roll.',
    phases: ["choose-fight"],
  },
  {
    id: "deflect shots",
    displayName: "Deflect Shots",
    passive: true,
    phases: [],
    description:
      "6+ Ward save against wounds caused by non-magical shooting attacks.",
  },
  {
    id: "dragon armour",
    displayName: "Dragon Armour",
    passive: true,
    phases: [],
    description:
      "6+ Ward save against any wounds suffered. A Wizard with this rule may wear armour without penalty.",
    armourMod: 0,
  },
  {
    id: "enfeebling cold",
    displayName: "Enfeebling Cold",
    description: "Enemy models in base contact suffer -1 Strength (minimum 1).",
    phases: ["choose-fight"],
  },
  {
    id: "from the ashes",
    displayName: "From The Ashes",
    description:
      "When a Flamespyre Phoenix loses its last Wound, roll a D6: 1-2 removed; 3-5 explodes (D6 S3 AP-1 Flaming hits to enemies in base contact) then removed; 6 reborn, recovers D3 Wounds.",
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "horn of isha",
    displayName: "Horn of Isha",
    description:
      "Single use. During the Command sub-phase, take a Leadership test. If passed, the character and their unit gain +1 To Hit and +1 To Wound until the next Start of Turn.",
    phases: ["start-of-turn"],
  },
  {
    id: "ithilmar armour",
    displayName: "Ithilmar Armour",
    passive: true,
    phases: [],
    description:
      "Re-roll any rolls of 1 on Dangerous Terrain tests. Wizards may wear armour without penalty.",
    aliases: ["Ithilmar Barding"],
  },
  {
    id: "ithilmar barding",
    displayName: "Ithilmar Barding",
    passive: true,
    phases: [],
    description:
      "Re-roll any rolls of 1 on Dangerous Terrain tests. Wizards may wear armour without penalty.",
    aliases: ["Ithilmar Armour"],
  },
  {
    id: "ithilmar weapons",
    displayName: "Ithilmar Weapons",
    description:
      "When fighting with a single, non-magical hand weapon, re-roll natural 1s To Hit. Does not apply to mount. Inactive if using two hand weapons or another weapon type.",
    phases: ["choose-fight"],
  },
  {
    id: "king's guard",
    displayName: "King's Guard",
    description:
      "Any model in a White Lions of Chrace unit joined by your General can issue and accept challenges like a character. Lost if the General leaves the unit.",
    phases: ["choose-fight"],
  },
  {
    id: "lileath's blessing",
    displayName: "Lileath's Blessing",
    description: "Once per turn, re-roll a single failed Casting roll.",
    phases: ["conjuration"],
  },
  {
    id: "lion cloak",
    displayName: "Lion Cloak",
    passive: true,
    phases: [],
    description:
      "Improves armour value by 1 (max 2+) against non-magical shooting attacks.",
  },
  {
    id: "martial prowess",
    displayName: "Martial Prowess",
    description:
      "+1 Weapon Skill in the first round of combat. Can make supporting attacks to its flank or rear, as well as its front.",
    phases: ["choose-fight"],
  },

  {
    id: "mighty constitution",
    displayName: "Mighty Constitution",
    description:
      'During a turn in which he charged 3"+, gains +1 Strength. Immune to Poisoned Attacks (attackers must roll To Wound normally).',
    phases: ["choose-fight"],
  },
  {
    id: "naval discipline",
    displayName: "Naval Discipline",
    description:
      "Lothern Sea Guard may Stand & Shoot regardless of how close the charging unit is. After resolving shooting, the unit may perform a free redress the ranks manoeuvre.",
    phases: ["shoot"],
  },
  {
    id: "valour of ages",
    displayName: "Valour of Ages",
    description:
      "Re-roll any failed Panic test caused by heavy casualties or being fled through by a friendly unit.",
    phases: ["break-test"],
  },
  {
    id: "wake of fire",
    displayName: "Wake of Fire",
    description:
      "During the Remaining Moves sub-phase, may fly over a single unengaged enemy unit. That unit suffers D6 S4 hits, AP -1, Flaming Attacks.",
    phases: ["remaining-moves"],
  },
  {
    id: "witness to destiny",
    displayName: "Witness to Destiny",
    passive: true,
    phases: [],
    description:
      "6+ Ward save against wounds caused by non-magical enemy attacks.",
  },
  {
    id: "abyssal cloak",
    displayName: "Abyssal Cloak",
    passive: true,
    phases: [],
    description:
      "Enemy models targeting this model during the Shooting phase suffer a -2 To Hit modifier for firing at long range, rather than the usual -1.",
  },
  {
    id: "accomplished archers",
    displayName: "Accomplished Archers",
    passive: true,
    phases: [],
    description:
      "Unless mounted on a Lothern Skycutter, a Sea Guard Garrison Commander gains Evasive and Fire & Flee. Any Lothern Sea Guard unit joined by this character also receives those rules.",
  },
  {
    id: "commanding voice",
    displayName: "Commanding Voice",
    passive: true,
    phases: [],
    description:
      'Ishaya\'s Command Range is increased by 3" (to 12", or 15" if she is the General).',
  },
  {
    id: "precision strikes",
    displayName: "Precision Strikes",
    description:
      "A Lothern Sea Guard unit joined by Ishaya Vess improves the AP of its weapons by 1.",
    phases: ["choose-fight"],
  },
  {
    id: "sons of caledor",
    displayName: "Sons of Caledor",
    passive: true,
    phases: [],
    description:
      "Unit may only be joined by your General, or by a character with the Blood of Caledor Elven Honour.",
  },
  {
    id: "chracian warriors",
    displayName: "Chracian Warriors",
    passive: true,
    phases: [],
    description:
      "Unit may only be joined by your General, or by a character with the Chracian Hunter Elven Honour.",
  },
  {
    id: "warriors of nagarythe",
    displayName: "Warriors of Nagarythe",
    passive: true,
    phases: [],
    description:
      "Unit may only be joined by a character with the Shadow Stalker Elven Honour.",
  },
  {
    id: "warriors of the white tower",
    displayName: "Warriors of the White Tower",
    passive: true,
    phases: [],
    description:
      "Unit may only be joined by a High Elf Mage, or by a character with the Warden of Saphery or Loremaster Elven Honour.",
  },
  {
    id: "armies of the sea lord",
    displayName: "Armies of the Sea Lord",
    passive: true,
    phases: [],
    description:
      "Characters in a Sea Guard Garrison may only choose: Shadow Stalker, Pure of Heart, or Sea Guard Elven Honours.",
  },
  {
    id: "chracian pride",
    displayName: "Chracian Pride",
    passive: true,
    phases: [],
    description:
      "Characters in a Chracian Warhost may only choose: Shadow Stalker, Chracian Hunter, or Pure of Heart Elven Honours.",
  },
  {
    id: "from the mists",
    displayName: "From the Mists",
    passive: true,
    phases: [],
    description:
      "After deployment but before Scouts/Vanguard, you may remove one deployed unit and redeploy it anywhere in your deployment zone.",
  },
  {
    id: "from the storm clouds",
    displayName: "From the Storm Clouds",
    passive: true,
    phases: [],
    description:
      "0-1 Lothern Skycutter per 1,000 points. Skycutters may gain Ambushers for +10 points per model.",
  },
  {
    id: "hidden trails",
    displayName: "Hidden Trails",
    passive: true,
    phases: [],
    description:
      "0-1 unit of Elven Spearmen or Archers per 1,000 points may gain Move Through Cover for +1 pt/model. Once per game, +1 or -1 to an Ambushers reserve arrival roll.",
  },
  {
    id: "old world rangers",
    displayName: "Old World Rangers",
    passive: true,
    phases: [],
    description:
      "0-1 Shadow Warriors unit (10 or fewer Unit Strength) gains Ambushers for free.",
  },
  {
    id: "pride of the fleet",
    displayName: "Pride of the Fleet",
    passive: true,
    phases: [],
    description:
      "Sea Guard gain the Regimental Unit rule. 0-1 Sea Guard unit per 1,000 points gains Drilled for free.",
  },
  {
    id: "warriors of chrace",
    displayName: "Warriors of Chrace",
    passive: true,
    phases: [],
    description:
      "Elven Spearmen or Archers in a Chracian Warhost may purchase Lion Cloaks (+1 armour vs non-magical shooting) for +10 points per unit.",
  },
  {
    id: "warriors of the wilderness",
    displayName: "Warriors of the Wilderness",
    description:
      'After terrain is placed, place one extra area of difficult terrain (3"-9" across) anywhere outside the opponent\'s deployment zone and more than 6" from special features — it may be within 12" of the centre.',
    phases: ["deployment"],
  },

  {
    id: "ogre charge",
    displayName: "Ogre Charge",
    description:
      "The AP of any Impact Hits caused by this model (not its mount) is improved by the current Rank Bonus of its unit.",
    phases: ["choose-fight"],
  },
  {
    id: "bull charge",
    displayName: "Bull Charge",
    description:
      "Impact Hits caused by this model (not its mount) have an Armour Piercing characteristic of -1.",
    phases: ["choose-fight"],
  },
  {
    id: "thunderous charge",
    displayName: "Thunderous Charge",
    description: "Impact Hits caused by this model have an AP of -2.",
    phases: ["choose-fight"],
  },
  {
    id: "mournfang charge",
    displayName: "Mournfang Charge",
    description:
      "Impact Hits caused by this model have Armour Bane (1) and AP -1.",
    phases: ["choose-fight"],
  },
  {
    id: "belly flop",
    displayName: "Belly Flop",
    description:
      "Place a 3\" blast template over the target unit centre. Models underneath suffer a hit at this model's Strength with AP -2.",
    phases: ["choose-fight"],
  },
  {
    id: "giant attacks",
    displayName: "Giant Attacks",
    phases: [
      {
        subPhaseId: "choose-fight",
        description: "Instead of normal attacks, roll a D6:",
        table: [
          {
            roll: "1",
            result: "'Eadbutt",
            effect: "D3+1 wounds, no armour or regeneration saves.",
          },
          {
            roll: "2",
            result: "Belly Flop",
            effect: '3" blast, Strength, AP -2.',
          },
          {
            roll: "3-4",
            result: "Mighty Swing",
            effect: "D6+1 attacks, S+1, AP -2.",
          },
          {
            roll: "5",
            result: "Thump with Club",
            effect: "One model, S+4, AP -4, Multiple Wounds (D6).",
          },
          {
            roll: "6",
            result: "Jump Up and Down",
            effect: "D6+1 hits, no armour saves allowed.",
          },
        ],
      },
    ],
  },
  {
    id: "pick up and",
    displayName: "Pick Up And...",
    aliases: ["pick up and...", "pick up and…"],
    description:
      "Instead of normal attacks vs infantry/heavy infantry: target makes Initiative test. Fail = one model removed as casualty. Then roll D6: 4+ = repeat. 1-3 = stop.",
    phases: ["choose-fight"],
  },
  {
    id: "numbing chill",
    displayName: "Numbing Chill",
    description:
      "Enemy models in base contact suffer -1 WS and -1 Initiative (minimum 1).",
    phases: ["choose-fight"],
  },
  {
    id: "butcher's cauldron",
    displayName: "Butcher's Cauldron",
    aliases: ["butchers cauldron"],
    phases: [
      {
        subPhaseId: "choose-fight",
        description: "Replaces Impact Hits (2) with Impact Hits (D3+1).",
      },
      {
        subPhaseId: "command",
        yourTurnOnly: true,
        description:
          "If not in combat, take a Leadership test. Pass: character and joined unit gain Regeneration (5+) until next Start of Turn. Fail: lose 1 Wound.",
      },
    ],
  },
  {
    id: "blessings of the volcano god",
    displayName: "Blessings of the Volcano God",
    description: "4+ Ward save against wounds caused by Flaming Attacks.",
    phases: ["choose-fight", "shoot"],
  },
  {
    id: "stone skeleton",
    displayName: "Stone Skeleton",
    passive: true,
    phases: [
      {
        subPhaseId: "choose-fight",
        description:
          "When suffering an unsaved wound from Multiple Wounds (X), reduce the number of wounds lost by 1 (minimum 1).",
      },
    ],
  },
  {
    id: "ravenous hunger",
    displayName: "Ravenous Hunger",
    chargeMod: { range: 0, tag: "Ravenous", color: "orange", order: 3 },
    description: "When declaring a charge, may re-roll the Charge roll.",
    phases: ["declare-charges"],
    yourTurnOnly: true,
  },
  {
    id: "look-out gnoblar",
    displayName: "Look-out Gnoblar",
    description:
      'Champion/character may make "Look Out, Sir!" with 2+ rank-and-file (instead of 5). With 5+, may re-roll the roll.',
    phases: ["shoot"],
  },
  {
    id: "largely insignificant",
    displayName: "Largely Insignificant",
    passive: true,
    phases: [],
    description:
      "Unit never causes friendly Panic tests. Cannot be joined by a character without this rule.",
  },
  {
    id: "running with the pack",
    displayName: "Running with the Pack",
    passive: true,
    phases: [],
    description:
      "Hunter joining Sabretusks gains Swiftstride. Sabretusks lose Impetuous while the Hunter remains.",
  },
  {
    id: "traps and snares",
    displayName: "Traps & Snares",
    aliases: ["traps & snares"],
    description:
      "Any enemy model that ends its charge move in base contact with this model must make a Dangerous Terrain test.",
    phases: ["choose-fight"],
  },
  {
    id: "bellowers and musicians",
    displayName: "Bellowers & Musicians",
    aliases: ["bellowers & musicians"],
    passive: true,
    phases: [],
    description:
      "Ogre musicians are Bellowers who use their voice instead of instruments. Function as standard musicians.",
  },
  {
    id: "grind them down!",
    displayName: "Grind Them Down!",
    aliases: ["grind them down"],
    description:
      "Friendly Chariot-type models within General's Command range may re-roll dice when determining Impact Hits.",
    phases: ["choose-fight"],
    yourTurnOnly: true,
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
    id: "aspect of the hound",
    displayName: "Aspect of the Hound",
    passive: true,
    description:
      "The character and their unit may re-roll any To Hit rolls of a natural 1 during the Combat phase.",
    phases: [],
  },
  {
    id: "aspect of the bear",
    displayName: "Aspect of the Bear",
    passive: true,
    description: "+1 Strength and +1 Toughness. Infantry or cavalry only.",
    phases: [],
  },
  {
    id: "aspect of the boar",
    displayName: "Aspect of the Boar",
    passive: true,
    description:
      "Impact Hits (1). Weapon AP improves by 1 on a turn in which the character charged.",
    phases: [],
  },
  {
    id: "aspect of the cat",
    displayName: "Aspect of the Cat",
    passive: true,
    description:
      "Armour Bane (1). May re-roll failed To Hit rolls during a challenge.",
    phases: [],
  },

  // ─── Universal combat ─────────────────────────────────────────────────

  {
    id: "stampede",
    displayName: "Stampede",
    description: "Impact Hits caused by this model have AP -2.",
    phases: ["choose-fight"],
  },
  {
    id: "blood frenzy",
    displayName: "Blood Frenzy",
    description:
      "When this model inflicts an unsaved wound, it becomes Frenzied (not its rider). May gain Frenzy this way even if lost previously.",
    phases: ["choose-fight"],
  },
  {
    id: "too horrible to die",
    displayName: "Too Horrible To Die",
    description:
      "First time this model loses its last Wound, roll D6: 1-3 removed; 4-5 replaced with a Rat Swarm (Skaven) or equivalent; 6 recovers D3 Wounds.",
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "cold blooded",
    displayName: "Cold Blooded",
    passive: true,
    description:
      "When making a Fear, Panic, or Terror test, roll an extra D6 and discard the highest result.",
    phases: ["command", "rally", "choose-fight", "break-test"],
  },
  {
    id: "aquatic",
    displayName: "Aquatic",
    passive: true,
    description:
      "No movement penalty in water terrain features (streams, rivers, lakes, swamps designated as water features).",
    phases: ["remaining-moves"],
  },
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
    id: "lance formation",
    displayName: "Lance Formation",
    description:
      "A unit in Lance formation with Unit Strength 5+ claims +1 combat result.",
    phases: ["combat-result"],
  },
  {
    id: "backstab",
    displayName: "Backstab",
    description:
      "When engaged with an enemy unit's flank or rear arc, may re-roll failed To Hit rolls against that unit.",
    phases: ["choose-fight"],
  },
  {
    id: "ensorcelled weapons",
    displayName: "Ensorcelled Weapons",
    description:
      "A single non-magical hand weapon has Magical Attacks and AP -1. Not with two hand weapons or other weapons; not the mount.",
    phases: ["choose-fight"],
  },
  {
    id: "chaos armour",
    displayName: "Chaos Armour",
    description:
      "Ward save shown in brackets (Daemons of Chaos: 4+). A Wizard with this rule may wear armour without penalty.",
    passive: true,
    phases: [],
    ward: "4+",
  },
  {
    id: "obsidian blades",
    displayName: "Obsidian Blades",
    description:
      "A single non-magical hand weapon has AP -1. Not with two hand weapons or other weapons; not the mount.",
    phases: ["choose-fight"],
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
    id: "the knights vow",
    displayName: "The Knight's Vow",
    aliases: ["the knight's vow"],
    description:
      'No Panic test when a friendly Peasantry unit is destroyed within 6", or flees through this unit. Cannot be joined by (or join) Peasantry characters/units.',
    phases: ["shoot", "compulsory-moves", "break-test"],
  },
  {
    id: "aura of the lady",
    displayName: "Aura of the Lady",
    description: "Any unit this character has joined gains Magical Attacks.",
    phases: ["choose-fight"],
  },
  {
    id: "shield of the lady",
    displayName: "Shield of the Lady",
    description:
      "In a joined unit of US 10+ with a Chivalrous Vow, may retire to the rear at any time: cannot attack or be attacked, but still confers Leadership and rules and may cast as if in the fighting rank.",
    phases: ["choose-fight"],
  },
  {
    id: "dispersed formation",
    displayName: "Dispersed Formation",
    aliases: ["dispersed formation,"],
    description:
      'Skirmish coherency is 3" (not 1"). Unlike other Skirmishers, has a 90° front vision arc, not 360°.',
    passive: true,
    phases: [],
  },
  {
    id: "grinding wheels",
    displayName: "Grinding Wheels",
    description:
      "Stomp Attacks have AP -2 (not against Behemoths). Treats low linear obstacles as open terrain.",
    phases: ["remaining-moves", "choose-fight"],
  },
  {
    id: "immovable object",
    displayName: "Immovable Object",
    description:
      "Cannot be moved by its crew in Remaining Moves once deployed. May still pivot freely and make follow-up moves.",
    phases: ["remaining-moves"],
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
    id: "parry",
    displayName: "Parry",
    aliases: ["parry (wood elves)"],
    description:
      "When fighting with a hand weapon and shield, or Asrai spear and shield, improves its armour value by 1.",
    phases: ["choose-fight"],
  },
  {
    id: "arcane vassal",
    displayName: "Arcane Vassal",
    description:
      'Once per turn (not fleeing or in combat), a friendly Slann within 12" may channel a spell through this model: range, targeting, line of sight and effects measured from this model. Not Self spells.',
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "beast handlers",
    displayName: "Beast Handlers",
    description:
      "Enemy shooting at the Pack: roll D6 per hit — 1-4 hits a Salamander/Razordon, 5+ a Skink Handler. In combat, enemies must attack models in base contact (or the closest in the fighting rank).",
    phases: ["shoot", "choose-fight"],
    opponentOnly: true,
  },
  {
    id: "grail reliquae",
    displayName: "Grail Reliquae",
    description:
      'Counts as six models (2 in each of the first three ranks), and as standard bearer and musician. Cannot lose Wounds while Battle Pilgrims remain. Within 12" of a non-fleeing friendly Grail Vow model, the unit is Immune to Psychology and Unbreakable.',
    phases: ["break-test"],
  },
  {
    id: "retinue of the saints",
    displayName: "Retinue of the Saints",
    description:
      "Army may include one Grail Reliquae per character or unit with the Grail Vow.",
    passive: true,
    phases: [],
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
    id: "caged fury",
    displayName: "Caged Fury",
    description:
      "Take a Leadership test. If failed, roll immediately on the Hellcannon Misfire table.",
    phases: ["start-of-turn"],
    yourTurnOnly: true,
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
    id: "living saints",
    displayName: "Living Saints",
    description:
      "Every model in the unit can issue and accept challenges as if it were a character.",
    phases: ["choose-fight"],
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
    id: "arcane shield",
    displayName: "Arcane Shield",
    description: "5+ Ward save against any wounds suffered.",
    passive: true,
    phases: [],
    ward: "5+",
  },
  {
    id: "guardians",
    displayName: "Guardians",
    description:
      "If a friendly Slann within 3\" suffers a hit in the Shooting phase, roll D6: on 2+ you may transfer the hit to this unit. Within a Slann's Command range, every model can issue and accept challenges as if a character.",
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "skirmish screen",
    displayName: "Skirmish Screen",
    description:
      'Can see and move through friendly Skink Skirmisher units in Skirmish formation (nudge Skinks aside). Skinks within 1" may count it as part of their unit for coherency.',
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "drop rocks",
    displayName: "Drop Rocks",
    description:
      "Once per game, fly over one enemy unit not in combat: after moving, it suffers D3 S4 hits per model that moved over it.",
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "toad rage",
    displayName: "Toad Rage",
    description:
      "Before the game (after Scouts), place one blot toad marker per Ripperdactyl Riders unit on an enemy unit. Against a marked unit, Ripperdactyls (not riders) gain Extra Attacks (+1) and re-roll To Hit rolls of a natural 1.",
    phases: ["deployment", "choose-fight"],
  },
  {
    id: "impervious defence",
    displayName: "Impervious Defence",
    description:
      "Enemy units cannot claim bonus combat result for being engaged with this model's flank or rear.",
    phases: ["combat-result"],
  },
  {
    id: "primeval roar",
    displayName: "Primeval Roar",
    description:
      'Once per game, take a Leadership test (own Leadership): if passed, friendly Lizardmen units within 7" gain Furious Charge until the end of the turn.',
    phases: ["command"],
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
    id: "safe from harm",
    displayName: "Safe From Harm",
    description:
      "Enemy shooting at a Rat Ogre unit with Packmasters: roll D6 per hit — 1-4 hits a Rat Ogre. In combat, enemies must attack models in base contact (or the closest in the fighting rank).",
    phases: ["shoot", "choose-fight"],
    opponentOnly: true,
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
    id: "an unholy union",
    displayName: "An Unholy Union",
    description:
      'Within 6" of a friendly Beastmen unit, Warriors of Chaos units (not characters) re-roll To Hit rolls of a natural 1; within 6" of a Warriors of Chaos unit, Beastmen units (not characters) re-roll To Wound rolls of a natural 1. Within 6" of a unit from the other list: -1 to Flee rolls. Not characters or units in both lists.',
    phases: ["choose-fight", "declare-charges"],
  },
  {
    id: "untrusting allies",
    displayName: "Untrusting Allies",
    description:
      "Warriors of Chaos and Beastmen characters cannot join each other's units (nor Chaos Cultists), and units cannot use the Leadership of the other list's characters.",
    passive: true,
    phases: [],
  },
  {
    id: "for the dark gods!",
    displayName: '"For the Dark Gods!"',
    aliases: ['"for the dark gods!"', "for the dark gods"],
    description:
      "A character who kills their opponent in a challenge must roll on the Gaze of the Gods table. Once per game, your General may re-roll the D6 on that table.",
    phases: ["combat-result"],
  },
  {
    id: "chaos rewards",
    displayName: "Chaos Rewards",
    description:
      "Narrative play: after sharing muster lists, roll 2D6 three times (plus any bought rolls) for each Champion or Chieftain of Ruin.",
    phases: [
      {
        subPhaseId: "deployment",
        description:
          "Narrative play: after sharing muster lists, roll 2D6 three times (plus any bought rolls) for each Champion or Chieftain of Ruin.",
        table: [
          { "2D6": "2", Result: "Curse of Ambition: Stupidity (or -1 Ld)" },
          { "2D6": "3", Result: "Flare of Anger: Impetuous (or -1 Ld for it)" },
          { "2D6": "4", Result: "Deadly Precision: weapons' AP +D3 in combat" },
          { "2D6": "5", Result: "Grisly Fortitude: +1 Wounds" },
          { "2D6": "6", Result: "Dark Executioner: +1 WS" },
          { "2D6": "7", Result: "Daemonic Swiftness: +1 Initiative" },
          { "2D6": "8", Result: "Unchecked Fury: Hatred (all enemies)" },
          { "2D6": "9", Result: "Iron Fortitude: +1 Toughness (max 7)" },
          { "2D6": "10", Result: "Strength of Chaos: +1 Strength" },
          { "2D6": "11", Result: "Ruinous Blessings: Regeneration (5+)" },
          {
            "2D6": "12",
            Result: "Champion of the Gods: +D3 Attacks (max 7), +1 Ld",
          },
        ],
      },
    ],
  },
  {
    id: "flee to safety",
    displayName: "Flee To Safety",
    description:
      "A baggage cart that touches or crosses the board edge in the opponent's deployment zone is removed from play but not destroyed.",
    phases: ["remaining-moves"],
    yourTurnOnly: true,
  },
  {
    id: "non-combatant",
    displayName: "Non-Combatant",
    description:
      "Cannot charge, pursue, overrun or follow up, and cannot use the General's Inspiring Presence or a Battle Standard's Hold Your Ground.",
    phases: ["declare-charges", "break-test"],
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
    id: "razor tusks",
    displayName: "Razor Tusks",
    description:
      "In a turn it charged, the AP of its tusks (hand weapon) improves by 1. Not the chariot or crew.",
    phases: ["choose-fight"],
  },
  {
    id: "crown of antlers",
    displayName: "Crown of Antlers",
    description:
      "Impact Hits caused by this model have Armour Bane (1) and AP -1.",
    phases: ["choose-fight"],
  },
  {
    id: "resolute",
    displayName: "Resolute",
    description: "-1 to Flee rolls and Pursuit rolls (minimum 1).",
    phases: ["pursuit", "break-test"],
  },
  {
    id: "gaze of the gods",
    displayName: "Gaze of the Gods",
    phases: [
      {
        subPhaseId: "command",
        yourTurnOnly: true,
        description:
          "May roll on the Gaze of the Gods table. Applies to the Champion only, not any mount:",
        table: [
          {
            roll: "1",
            result: "Damned by Chaos",
            effect:
              "Gains Stupidity for the remainder of the game. If already affected, suffers -1 Leadership (minimum 2).",
          },
          {
            roll: "2",
            result: "Unnatural Quickness",
            effect:
              "+1 Initiative until the next Start of Turn sub-phase (maximum 10).",
          },
          {
            roll: "3",
            result: "Iron Skin",
            effect:
              "+1 Toughness until the next Start of Turn sub-phase (maximum 10).",
          },
          {
            roll: "4",
            result: "Murderous Mutation",
            effect:
              "+1 Weapon Skill for the remainder of the game (maximum 10).",
          },
          {
            roll: "5",
            result: "Dark Fury",
            effect: "+1 Attacks for the remainder of the game (maximum 10).",
          },
          {
            roll: "6",
            result: "Apotheosis",
            effect:
              "+1 Strength and +1 Leadership for the remainder of the game (maximum 10).",
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
    id: "indomitable",
    displayName: "Indomitable",
    description:
      "Reduce the wounds suffered from Unstable by the number in brackets. Not cumulative: a unit uses the highest Indomitable value among its models.",
    phases: ["break-test"],
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
  {
    id: "the wyrm slayer",
    displayName: "The Wyrm Slayer",
    description:
      "If he kills an enemy monstrous infantry, monstrous cavalry, monstrous creature or behemoth in combat, he gains Terror for the rest of the game.",
    phases: ["choose-fight"],
  },
  {
    id: "sorcerous miasma",
    displayName: "Sorcerous Miasma",
    description:
      "In combat, enemy models attacking a character on a Lammasu with a magic weapon count as armed with a hand weapon instead.",
    phases: ["choose-fight"],
  },
  {
    id: "deploying weapon teams",
    displayName: "Deploying Weapon Teams",
    description:
      'Deploys at the same time as its parent unit, within 3" of it.',
    phases: ["deployment"],
  },
  {
    id: "weapon team leadership",
    displayName: "Weapon Team Leadership",
    description:
      "Within 3\" of its parent unit, +Ld equal to that unit's current Rank Bonus (max 10).",
    passive: true,
    phases: [],
  },
  {
    id: "targeting weapon teams",
    displayName: "Targeting Weapon Teams",
    description:
      'Within 3" of a non-fleeing parent unit of 5+ models, cannot be targeted by enemy shooting or spells unless it is the closest target.',
    phases: ["shoot"],
    opponentOnly: true,
  },
];

export default RULES;
