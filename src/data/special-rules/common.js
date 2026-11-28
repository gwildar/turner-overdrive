/** @type {import("../../types").SpecialRule[]} */
const RULES = [
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
    id: "wilful beast",
    displayName: "Wilful Beast",
    description:
      "At Start of Turn, mount makes a Leadership test (unmodified). If failed, the mount gains Frenzy (not the rider, and no +1 Attack for rider) until next Start of Turn.",
    phases: ["start-of-turn"],
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
    id: "beguiling aura",
    displayName: "Beguiling Aura",
    description:
      "Enemy models must pass Ld test before rolling To Hit against this model; if failed, only natural 6s hit.",
    phases: ["choose-fight"],
    opponentOnly: true,
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
    id: "martial prowess",
    displayName: "Martial Prowess",
    description:
      "+1 Weapon Skill in the first round of combat. Can make supporting attacks to its flank or rear, as well as its front.",
    phases: ["choose-fight"],
  },
  {
    id: "ogre charge",
    displayName: "Ogre Charge",
    description:
      "The AP of any Impact Hits caused by this model (not its mount) is improved by the current Rank Bonus of its unit.",
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
    id: "root eruption",
    displayName: "Root Eruption",
    description:
      'Root eruption shoots like a stone thrower (Bombardment) with the blast template shown (3" Gargantuan Treeman, 5" Gargantuan Treeman Ancient). On a Misfire this model loses a single Wound instead of rolling on a Misfire table. Multiple Wounds (D3+1) applies only to a model under the template\'s central hole.',
    phases: ["shoot"],
    yourTurnOnly: true,
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
    id: "indomitable",
    displayName: "Indomitable",
    description:
      "Reduce the wounds suffered from Unstable by the number in brackets. Not cumulative: a unit uses the highest Indomitable value among its models.",
    phases: ["break-test"],
  },
];

export default RULES;
