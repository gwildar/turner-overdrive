/**
 * Skaven Renegades supplement data.
 * Draft v1.5.2.2 — community supplement.
 */

export default {
  units: {
    "clanrats-renegade": {
      shared: {
        rules: [
          "Close Order",
          "Horde",
          "Regimental Unit",
          "Scurry Away",
          "Warband",
        ],
        equipment: ["Hand weapons", "light armour"],
        troopType: ["RI"],
        magic: [],
        optionalRules: [],
      },
      stats: [
        {
          A: "1",
          I: "4",
          M: "5",
          S: "3",
          T: "3",
          W: "1",
          BS: "3",
          Ld: "4",
          WS: "3",
          Name: "Clanrat",
          as: 6,
        },
        {
          A: "2",
          I: "4",
          M: "5",
          S: "3",
          T: "3",
          W: "1",
          BS: "3",
          Ld: "5",
          WS: "3",
          Name: "Clawleader",
          as: 6,
        },
      ],
    },

    "screaming-bell-renegade": {
      shared: {
        crewed: true,
        rules: [
          "Armour Bane (2, Rat Ogre only)",
          "Blessings of the Horned Rat",
          "Impact Hits (D6+1)",
          "Large Target",
          "Magic Resistance (-3)",
          "Pushed Into Battle",
          "Scurrying Masses",
          "Stubborn",
          "Terror",
          "Tolling the Bell",
          "Warpstone Weapons",
        ],
        troopType: ["HCh"],
        magic: [],
        optionalRules: [],
      },
      stats: [
        {
          A: "-",
          I: "-",
          M: "5",
          S: "5",
          T: "6",
          W: "5",
          BS: "-",
          Ld: "-",
          WS: "-",
          Name: "Screaming Bell",
          "Magic-Res": "-3",
          "Impact-Hits": "D6+1",
          AS: "4",
          equipment: [],
        },
        {
          A: "3",
          I: "4",
          M: "-",
          S: "5",
          T: "-",
          W: "-",
          BS: "0",
          Ld: "5",
          WS: "3",
          Name: "Rat Ogre Crew (x1)",
          "Magic-Res": "-3",
          rules: ["Warpstone Weapons"],
          equipment: ["Hand weapon"],
        },
      ],
    },

    "plague-furnace-renegade": {
      shared: {
        crewed: true,
        rules: [
          "Frenzy",
          "Great Censer",
          "Impact Hits (D6+1)",
          "Large Target",
          "Magic Resistance (-1)",
          "Poisoned Attacks",
          "Pushed Into Battle",
          "Scurrying Masses",
          "Stomp Attacks (D3+1)",
          "Terror",
        ],
        troopType: ["HCh"],
        magic: [],
        optionalRules: [],
      },
      stats: [
        {
          A: "-",
          I: "-",
          M: "5",
          S: "5",
          T: "6",
          W: "5",
          BS: "-",
          Ld: "-",
          WS: "-",
          Name: "Plague Furnace",
          "Magic-Res": "-1",
          Stomps: "D3+1",
          "Impact-Hits": "D6+1",
          AS: "4",
          equipment: ["Billowing Death"],
        },
        {
          A: "2",
          I: "3",
          M: "-",
          S: "3",
          T: "-",
          W: "-",
          BS: "0",
          Ld: "5",
          WS: "3",
          Name: "Plague Monk Crew (x3)",
          "Magic-Res": "-1",
          equipment: ["Hand weapons"],
        },
      ],
    },

    "hell-pit-abomination-renegade": [
      {
        A: "D6+1",
        I: "4",
        M: "3D6",
        S: "6",
        T: "6",
        W: "6",
        BS: "1",
        Ld: "8",
        WS: "3",
        Name: "Hell Pit Abomination",
        Regen: "5+",
        "Magic-Res": "-1",
        Stomps: "D3+1",
        "Impact-Hits": "D3+1",
        rules: [
          "Abominable Attacks",
          "Close Order",
          "Immune to Psychology",
          "Impact Hits (D3+1)",
          "Large Target",
          "Magic Resistance (-1)",
          "Random Attacks",
          "Random Movement",
          "Regeneration (5+)",
          "Stomp Attacks (D3+1)",
          "Terror",
          "Timmm-berrr!",
          "Too Horrible to Die",
          "Unbreakable",
          "Warpstone Spikes",
        ],
        equipment: ["Warpstone claws", "mutated hide"],
        troopType: ["Be"],
        magic: [],
        optionalRules: [],
      },
    ],
  },

  specialRules: [
    {
      id: "scurry away",
      displayName: "Scurry Away",
      description:
        "This model has a +1 modifier to the result of any Flee roll.",
      phases: ["declare-charges"],
    },
    {
      id: "verminous valour",
      displayName: "Verminous Valour",
      description:
        'A model with this special rule may voluntarily "retire" during the Combat phase if joined to a unit with US 10+, not in a challenge, and before attacks are allocated. The unit may still use this character\'s Leadership. In subsequent turns, the model may return to a fighting rank before challenges are issued.',
      phases: ["choose-fight"],
    },
    {
      id: "expendable-renegade",
      displayName: "Expendable",
      aliases: ["Expendable {renegade}"],
      description:
        "If all friendly Skaven models engaged in a combat have this rule, friendly Skaven units may target the engaged enemy during the Shooting Phase. Failed To Hit rolls are rolled To Wound against a friendly Expendable unit chosen by the opponent.",
      phases: ["shoot"],
    },
    {
      id: "pushed into battle",
      displayName: "Pushed Into Battle",
      passive: true,
      description:
        "This model (Heavy Chariot) may join a unit of Infantry with Unit Strength 10+. When it does, it must be placed in the centre of the front rank and loses the Lumbering rule. Only one such model may join each unit.",
      phases: [],
    },
    {
      id: "scurrying masses",
      displayName: "Scurrying Masses",
      passive: true,
      description:
        "Whilst within 3\" of a friendly Skaven unit, this unit may add a positive modifier to its Leadership equal to that unit's current Rank Bonus (max Ld 10). Cannot combine with Warband or Inspiring Presence.",
      phases: [],
    },
    {
      id: "blessings of the horned rat",
      displayName: "Blessings of the Horned Rat",
      passive: true,
      description:
        "This model has a 5+ Ward save against any wounds suffered. Any unit joined by the Screaming Bell gains the Stubborn special rule.",
      phases: [],
    },
    {
      id: "tolling the bell",
      displayName: "Tolling the Bell",
      description:
        "During the Command sub-phase, roll 2D6. Effects range from backlash (2) to empowering friendly units to a devastating knell (12). Any double except 1-1 and 6-6 also causes Magical Backlash.",
      phases: ["start-of-turn"],
      yourTurnOnly: true,
    },
    {
      id: "great censer",
      displayName: "Great Censer",
      description:
        'Stomp Attacks made by a Plague Furnace have AP -2. Whilst within 6", enemy units suffer -1 to their Toughness (min 1).',
      phases: ["choose-fight"],
    },
    {
      id: "crushing bulk",
      displayName: "Crushing Bulk",
      description:
        "Stomp Attacks made by the Doomwheel have AP -2. The first time an enemy unit suffers Impact Hits from this model, the enemy becomes Disrupted until end of Combat phase.",
      phases: ["choose-fight"],
    },
    {
      id: "abominable attacks",
      displayName: "Abominable Attacks",
      description:
        'Instead of attacking normally, may choose: Feed (single model in base contact, D3 auto-wounds, no armour save) or Avalanche of Flesh (3" blast, S6 AP-2 hits on all models under template).',
      phases: ["choose-fight"],
    },
    {
      id: "warpstone spikes",
      displayName: "Warpstone Spikes",
      passive: true,
      description:
        "Impact Hits made by a Hell Pit Abomination have AP -2 and Magical Attacks.",
      phases: [],
    },
    {
      id: "warpstone weapons",
      displayName: "Warpstone Weapons",
      passive: true,
      description:
        "A single ordinary hand weapon carried by this model has the Magical Attacks special rule and AP -1. Does not apply if using two hand weapons or any other weapon.",
      phases: [],
    },
    {
      id: "poisoned wind",
      displayName: "Poisoned Wind",
      passive: true,
      description:
        "When rolling To Wound, 5+ always succeeds regardless of Toughness. No armour save permitted (Ward and Regeneration saves allowed). Models with this rule are immune to it.",
      phases: [],
    },
    {
      id: "cloud of flies",
      displayName: "Cloud of Flies",
      description:
        "Any enemy model directing attacks against this character during the Combat phase suffers -1 To Hit.",
      phases: ["choose-fight"],
    },
    {
      id: "cornered rats",
      displayName: "Cornered Rats",
      description:
        'If this unit breaks and flees, it is destroyed. If 10+ models, every unit within 2D6" suffers D3 S3 hits (+1 per 5 models over 5, max +3). Engaged opponents may overrun.',
      phases: ["break-test"],
    },
    {
      id: "life is cheap",
      displayName: "Life is Cheap",
      description:
        "If not in base contact with an enemy, may target any enemy within range even if engaged in combat. Failed To Hit rolls are rolled To Wound against a friendly unit in the combat chosen by the opponent.",
      phases: ["shoot"],
    },
    {
      id: "zzzzap!",
      displayName: "Zzzzap!",
      description:
        "Each Shooting phase (even in combat), automatically shoots 3 Warp Lightning Bolts at nearest unit (friend or foe). Controlling player may prevent by passing a Ld test. On Misfire, consult Doomwheel Mishap chart.",
      phases: ["shoot"],
    },
    {
      id: "eshin infiltration",
      displayName: "Eshin Infiltration",
      description:
        'When a friendly Night Runner or Gutter Runner unit with Ambushers arrives from reserve, it may be placed within 12" of this revealed Master Assassin instead of entering as reinforcements. Cannot charge that turn.',
      phases: ["remaining-moves"],
    },
    {
      id: "hidden-skaven",
      displayName: "Hidden",
      aliases: ["Hidden {skaven}"],
      description:
        "Not placed at deployment. Hidden in a friendly Skaven infantry unit with US 10+. Revealed during any Start of Turn or start of any Combat phase. If host unit is destroyed or flees before reveal, this model is removed.",
      phases: ["start-of-turn"],
    },
    {
      id: "dodge-skaven",
      displayName: "Dodge",
      aliases: ["Dodge {skaven}"],
      passive: true,
      description: "This model has a 5+ Ward Save.",
      phases: [],
    },
  ],

  spells: {
    "horned-rat-renegade": {
      name: "Lore of the Horned Rat",
      faction: "Skaven",
      signatureOnly: true,
      spells: [
        {
          num: "S",
          name: "Skitterleap",
          type: "conveyance",
          cv: "7+",
          range: '18"',
        },
        {
          num: "S",
          name: "Warp Lightning",
          type: "magic-missile",
          cv: "9+",
          range: '18"',
        },
        {
          num: "S",
          name: "Cloud of Corruption",
          type: "magical-vortex",
          cv: "9+",
          range: '9"',
        },
      ],
    },
  },

  magicItems: [
    {
      name: "The Fellblade",
      type: "weapon",
      points: 100,
      effect:
        "S+3, Magical Attacks, Multiple Wounds (D3), Poisoned Attacks. No Armour, Ward or Regeneration saves permitted. During Command sub-phase, roll D6: on 1-2, wielder suffers 1 wound (no armour save, Ward/Regen allowed).",
      phases: ["combat"],
    },
    {
      name: "Weeping Blade",
      type: "weapon",
      points: 40,
      effect: "AP -2, Magical Attacks, Multiple Wounds (D3), Poisoned Attacks.",
      phases: ["combat"],
    },
    {
      name: "Blade of Nurglitch",
      type: "weapon",
      points: 15,
      effect:
        "S+1, Magical Attacks. Any enemy suffering unsaved wounds must pass a Toughness test or suffer -1T (min 1) for the rest of the game.",
      phases: ["combat"],
    },
    {
      name: "Death Globe",
      type: "enchanted-item",
      points: 25,
      singleUse: true,
      effect:
        'Single use. Range 9", Move & Shoot, Quick Shot, Poisoned Wind. May target a specific model. On hit, centre 3" blast over target — all models under template risk being hit.',
      phases: ["shooting"],
    },
    {
      name: "Warpstone Armour",
      type: "armour",
      points: 15,
      extremely: true,
      effect:
        "Heavy armour. May be purchased and worn even without an armour option. A Wizard may wear this without penalty.",
      phases: ["passive"],
      armourBase: 5,
    },
    {
      name: "Cautious Shield",
      type: "armour",
      points: 20,
      effect:
        "Shield. May wield with two hands when combat is chosen — improves armour value by 3 but Attacks reduced to 0 until end of Combat phase.",
      phases: ["combat"],
    },
    {
      name: "Shadow Magnet",
      type: "talisman",
      points: 40,
      effect:
        "Any enemy targeting the bearer or their unit during the Shooting phase suffers an additional -1 To Hit.",
      phases: ["shooting"],
    },
    {
      name: "Warpstone Amulet",
      type: "talisman",
      points: 35,
      effect:
        "4+ Ward save against wounds caused by non-magical enemy attacks.",
      phases: ["passive"],
    },
    {
      name: "Storm Banner",
      type: "banner",
      points: 75,
      singleUse: true,
      effect:
        "Single use. Activate in Command sub-phase. For this turn and next: no Fly, missile range halved, war machines cannot shoot.",
      phases: ["passive"],
    },
    {
      name: "Grand Banner of Superiority",
      type: "banner",
      points: 40,
      effect: "Unit claims +D3 additional combat result points.",
      phases: ["combat"],
    },
    {
      name: "Dwarf Hide Banner",
      type: "banner",
      points: 40,
      effect: "Unit gains Hatred (Dwarfs) and Stubborn.",
      phases: ["passive"],
    },
    {
      name: "Banner of Verminous Scurrying",
      type: "banner",
      points: 35,
      effect: "Unit gains the Swiftstride special rule.",
      phases: ["passive"],
    },
    {
      name: "Plague Banner",
      type: "banner",
      points: 30,
      singleUse: true,
      effect:
        "Plague Monks only. Single use. Activate at start of Combat phase. All Plague Monk models re-roll failed To Hit and To Wound rolls for the remainder of the phase.",
      phases: ["combat"],
    },
    {
      name: "Brass Orb",
      type: "enchanted-item",
      points: 50,
      singleUse: true,
      effect:
        "Single use. Instead of attacking in combat, toss at a single engaged model. Roll To Hit. If successful, target makes an Initiative test — if failed, removed as a casualty.",
      phases: ["combat"],
    },
    {
      name: "Skalm",
      type: "enchanted-item",
      points: 35,
      singleUse: true,
      effect:
        "Single use. During Command sub-phase, recover D3 Wounds and gain +1T until next Start of Turn.",
      phases: ["passive"],
    },
    {
      name: "Skavenbrew",
      type: "enchanted-item",
      points: 20,
      extremely: true,
      singleUse: true,
      effect:
        "Single use. Warlords/Chieftains only. During Command sub-phase, if not in combat, pass a Ld test to give character and joined unit Frenzy until next Start of Turn.",
      phases: ["passive"],
    },
    {
      name: "Warp Condenser",
      type: "arcane",
      points: 50,
      effect:
        'Dispel range +3". +1 to Casting rolls for Magic Missile spells. May re-roll Miscast table result.',
      phases: ["passive"],
    },
    {
      name: "Storm Daemon",
      type: "arcane",
      points: 40,
      effect:
        "Bearer can cast Warp Lightning (Lore of the Horned Rat) as a Bound spell, Power Level 2.",
      phases: ["passive"],
    },
    {
      name: "Warpstone Tokens",
      type: "arcane",
      points: 15,
      extremely: true,
      maxPerModel: 3,
      singleUse: true,
      effect:
        "Single use each. Before a Casting roll, consume a token to add D3 to the roll. Then roll D6 — on a 1, the Wizard loses 1 Wound.",
      phases: [],
    },
  ],
};
