/** @type {import("../../types").SpecialRule[]} */
const RULES = [
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
];

export default RULES;
