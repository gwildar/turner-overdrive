export default [
  // ─── Grand Cathay ────────────────────────────────────────────────────

  {
    id: "celestial forged armour",
    displayName: "Celestial Forged Armour (X+)",
    passive: true,
    phases: [],
    description:
      "Ward save (X+) against any wounds suffered. Wizards may wear this armour without penalty to their casting rolls.",
  },
  {
    id: "mastery of the elemental winds",
    displayName: "Mastery of the Elemental Winds",
    description:
      'Once per turn, if within 6" of one or more friendly Wizards with this rule, apply a +1 modifier to a casting roll. This modifier does not negate a natural double 1.',
    phases: ["conjuration"],
    yourTurnOnly: true,
  },
  {
    id: "will of the dragons",
    displayName: "Will of the Dragons",
    description:
      'May re-roll a failed Panic test when a friendly unit is destroyed within 6", or when fled through by a friendly unit.',
    phases: ["break-test"],
  },
  {
    id: "eye of the dragon",
    displayName: "Eye of the Dragon",
    description:
      "Friendly models with Bombardment weapons may shoot using this model's line of sight rather than their own.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "heavenly beacon",
    displayName: "Heavenly Beacon",
    description:
      'Unless fleeing, friendly units within 12" may re-roll failed Panic or Rally tests. Apply a +1 or -1 modifier when rolling for friendly Ambushers to arrive or be delayed. A Lord Magistrate or Strategist mounted on this model gains a 12" command range.',
    phases: ["rally", "break-test"],
  },
  {
    id: "disengage",
    displayName: "Disengage",
    description:
      'When losing combat and would Give Ground, may Fall Back in Good Order instead (enemy may follow up 2" but cannot pursue). When winning combat and choosing to restrain and reform, may Fall Back in Good Order instead.',
    phases: ["choose-fight"],
  },
  {
    id: "defensive stance",
    displayName: "Defensive Stance",
    description:
      "Unless the unit charged or counts as having charged this turn, re-roll Armour Save rolls of a natural 1 during the Combat phase.",
    phases: ["choose-fight"],
  },
  {
    id: "cathayan black powder",
    displayName: "Cathayan Black Powder",
    description:
      "The first time any unit in a Jade Fleet army armed with a handgun, pistol, brace of pistols, repeater handgun, or repeater pistol shoots, that weapon's range is increased by 3\".",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "cathayan cataphracts",
    displayName: "Cathayan Cataphracts",
    description:
      "When a unit in which the majority of models have this rule makes a follow up move, the unit counts as having charged during the next turn.",
    phases: ["choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "unity and harmony",
    displayName: "Unity & Harmony",
    aliases: ["unity & harmony", "unity and harmony"],
    description:
      'Any unit of Jade Warriors or Jade Lancers within 3" of a friendly Mercenary unit may re-roll To Hit rolls of 1 during the Combat phase.',
    phases: ["choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "wailing spirits",
    displayName: "Wailing Spirits",
    description:
      "Any unit that suffers one or more unsaved wounds from this weapon must make a Panic test as if it had taken heavy casualties.",
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "tower shields",
    displayName: "Tower Shields",
    passive: true,
    phases: [],
    description:
      "Improves armour value by 3 (instead of the standard +1) against attacks from enemy models in the front arc. Offers no protection against attacks from the flank or rear arc.",
  },
  {
    id: "harmony of stone and steel",
    displayName: "Harmony of Stone & Steel",
    aliases: ["harmony of stone & steel"],
    description:
      "Friendly units within Command range may re-roll failed Leadership tests when attempting to reform after running down a foe, when redirecting a charge, or when making a Restraint test.",
    phases: ["movement"],
    yourTurnOnly: true,
  },
  {
    id: "the elemental winds",
    displayName: "The Elemental Winds",
    description:
      'At the start of each turn, roll a D6. 1-2: no effect. 3-4: Winds of Yang — Lore of Yang wizards gain +3" range for Dispel/Enchantment spells; models with Will of the Dragons gain +1M or +1I. 5-6: Winds of Yin — Lore of Yin wizards gain +3" range for Hex/Magic Missile spells; models with Will of the Dragons gain +1WS or +1Ld.',
    phases: ["start-of-turn"],
    yourTurnOnly: true,
  },
  {
    id: "discipline of the dragon",
    displayName: "Discipline of the Dragon",
    description:
      'Once per game during the Command sub-phase, each Sky Lantern not in combat may attempt a Grand Strategy (Leadership test). Success: choose Defiance of the Dragon (Stubborn/Unbreakable), Strength of the Everlasting Empire (cannot be wounded on a 2 to wound), or Fury of the Falling Blade (+1M, re-roll Charge/Flee/Pursuit) for all friendly Cathayan units within 12" until next Start of Turn.',
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "disdain of the dragons",
    displayName: "Disdain of the Dragons",
    description:
      "Enemy models wishing to issue a challenge within Command range must pass a Leadership test (+1 modifier in Human form, +2 in Dragon form). Challenges issued by this model cannot be refused.",
    phases: ["choose-fight"],
  },
  {
    id: "dragon form",
    displayName: "Dragon Form",
    passive: true,
    phases: [],
    description:
      "Troop type is Behemoth. Does not have Inspiring Presence, even if the army's General.",
  },
  {
    id: "human form",
    displayName: "Human Form",
    passive: true,
    phases: [],
    description:
      "Troop type is Heavy Infantry. Follows all rules for a Heavy Infantry character.",
  },
  {
    id: "transformation",
    displayName: "Transformation",
    description:
      'During the Command sub-phase, place the new form\'s model within 6" of the current form (not within 1" of friendly or 3" of enemy models). Remove previous form, recover D3 Wounds. Cannot charge that turn; counts as having moved for shooting.',
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "transformation of the dragon",
    displayName: "Transformation of the Dragon",
    description:
      "May switch between Human form (Heavy Infantry character) and Dragon form (Behemoth, no Inspiring Presence) during the Command sub-phase. Wounds are shared. Reduced to 0W in Dragon form: transform to Human form, recover D3W, cannot return to Dragon form. Human to Dragon transformation allows escaping combat.",
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "death of a dragon",
    displayName: "Death of a Dragon",
    passive: true,
    phases: [],
    description:
      "Wounds apply to both character profiles simultaneously. Reduced to 0W in Dragon form: transform to Human form, recover D3W, cannot return to Dragon form. Reduced to 0W in Human form: removed as a casualty.",
  },
  {
    id: "enough for everyone",
    displayName: "Enough for Everyone",
    description:
      "When an Ogre Loader has gunpowder bombs, the entire war machine crew also gains access to those weapons.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "grand strategist",
    displayName: "Grand Strategist",
    description:
      "Unless fleeing, all friendly units within Command range (except your General) may use this character's Leadership. Once per turn, a friendly unit that wins combat within Command range may Fall Back in Good Order instead of pursuing or following up.",
    phases: ["break-test", "choose-fight"],
  },
  {
    id: "granite sentinel",
    displayName: "Granite Sentinel",
    passive: true,
    phases: [],
    description:
      "Armour value improved by 1. Immune to Multiple Wounds (X): if suffering an unsaved wound from a Multiple Wounds attack, loses only 1 Wound.",
  },
  {
    id: "implacable",
    displayName: "Implacable",
    description:
      "Once per game when charged, may choose not to Give Ground if combat is lost. Once per game, may re-roll its Charge roll.",
    phases: ["movement", "choose-fight"],
  },
  {
    id: "jade sentinel",
    displayName: "Jade Sentinel",
    description:
      "Knows one spell (chosen before deployment) from Battle Magic or Elementalism, cast as a Bound spell with Power Level 3.",
    phases: ["conjuration"],
    yourTurnOnly: true,
  },
  {
    id: "mastery of the storm winds",
    displayName: "Mastery of the Storm Winds",
    description:
      "May discard up to two randomly generated spells (instead of one), replacing them with spells from Lore of Yang, Lore of Yin, a signature spell, or The Storm Dragon's Fury (Magic Missile, CV 10+, 18\", 2D3 S5 AP-3 Flaming Attacks hits; target must Give Ground).",
    phases: ["conjuration"],
    yourTurnOnly: true,
  },
  {
    id: "mercenary crew",
    displayName: "Mercenary Crew",
    description:
      "Ogre Loader grants the war machine crew +1 Movement and Stubborn. Once per game, the war machine may fire twice during the Shooting phase, or re-roll a single Artillery dice.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "mercenary handgun drill",
    displayName: "Mercenary Handgun Drill",
    description:
      "Once per game, each unit or detachment of State Missile Troops in a Jade Fleet army can fire with one additional rank.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "obsidian sentinel",
    displayName: "Obsidian Sentinel",
    description:
      'Magic Resistance (-2). Enemy wizards within 12" must make a Leadership test before casting: failed = -3 to casting roll; passed = -1 to casting roll.',
    phases: ["conjuration"],
    opponentOnly: true,
  },
  {
    id: "supreme matriarch of nan-gau",
    displayName: "Supreme Matriarch of Nan-Gau",
    passive: true,
    phases: [],
    description:
      "If Miao Ying is included, she becomes the General. One unit of Jade Warriors or Jade Lancers may be upgraded to Celestial Dragon Guard (+2 pts/model): +1WS and +1Ld (max 10), and Celestial Armour (6+) Ward save.",
  },
  {
    id: "terracotta sentinel",
    displayName: "Terracotta Sentinel",
    passive: true,
    phases: [],
    description: "Gains the Regeneration (6+) special rule.",
  },
  {
    id: "war balloons",
    displayName: "War Balloons",
    passive: true,
    phases: [],
    description:
      "Up to one Sky Lantern per 1,000 points may gain Ambushers (+15 pts). Once per game, a Sky Lantern held in reserve may re-roll the dice when rolling to arrive as reinforcements or be delayed.",
  },
  {
    id: "sky lantern bombs",
    displayName: "Sky Lantern Bombs",
    phases: [
      {
        subPhaseId: "shoot",
        description: "Roll a D6 to determine the bombing run result:",
        table: [
          {
            roll: "1",
            result: "Premature Detonation",
            effect:
              "The release mechanism jams and a bomb explodes prematurely. This model loses a single Wound.",
          },
          {
            roll: "2",
            result: "Dud",
            effect:
              "A solitary bomb is released but fails to detonate, landing on an enemy model. The enemy unit loses a single Wound.",
          },
          {
            roll: "3-4",
            result: "Direct Hit",
            effect:
              'Place a large (5") blast template over the centre of the enemy unit; it scatters D6". Any model underneath risks a Strength 5 hit, AP -2.',
          },
          {
            roll: "5-6",
            result: "Bombs Away",
            effect:
              'Place two small (3") blast templates over the enemy unit; each scatters D6". Any model underneath risks a Strength 5 hit, AP -2.',
          },
        ],
      },
    ],
  },
  {
    id: "warpstone sentinel",
    displayName: "Warpstone Sentinel",
    passive: true,
    phases: [],
    description:
      "Magical Attacks. Enemy units in base contact suffer -1 Toughness (minimum 1).",
  },
  {
    id: "warriors of the field",
    displayName: "Warriors of the Field",
    passive: true,
    phases: [],
    description:
      "Units of Peasant Levy do not become Disrupted by difficult or dangerous terrain. Up to one Peasant Levy unit per 1,000 points may purchase Move Through Cover for +20 pts.",
  },
  {
    id: "warriors of the land",
    displayName: "Warriors of the Land",
    description:
      "When Falling Back in Good Order, may choose which dice to discard when making the Flee roll rather than automatically discarding the lowest.",
    phases: ["movement"],
  },
  {
    id: "warriors of the wind",
    displayName: "Warriors of the Wind",
    passive: true,
    phases: [],
    description:
      "Up to one Peasant Levy unit per 1,000 points may have Reserve Move and Scouts for +2 pts per model.",
  },
  {
    id: "wrath of the storm",
    displayName: "Wrath of the Storm",
    description:
      "All units of Jade Warriors and Jade Lancers in an army led by Miao Ying gain Hatred (Warriors of Chaos & Daemonic models).",
    phases: ["choose-fight"],
    yourTurnOnly: true,
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
    description:
      "5+ Ward save against wounds caused by attacks with the Magical Attacks or Flaming Attacks special rule.",
    phases: ["choose-fight"],
  },
  {
    id: "warriors duel",
    displayName: "Warriors' Duel",
    passive: true,
    phases: [],
    description:
      "Before the first-turn roll-off, either player may propose a Warriors' Duel. Each side nominates one champion (infantry or cavalry, exactly 1 Wound). Champions fight in a challenge until one falls — the winner's army takes the first turn. If both fall simultaneously, revert to a standard roll-off. If the opponent declines, Wolves of the Sea automatically takes the first turn.",
  },
];
