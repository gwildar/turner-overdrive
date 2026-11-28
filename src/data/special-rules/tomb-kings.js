/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  // ─── Tomb Kings ───────────────────────────────────────────────────────

  {
    id: "khopesh",
    displayName: "Khopesh",
    description:
      "A single ordinary hand weapon has AP -1. Not with two hand weapons or other weapons; not the mount.",
    phases: ["choose-fight"],
  },
  {
    id: "immortal overseer",
    displayName: "Immortal Overseer",
    description:
      "Take a Leadership test (own Leadership): if passed, one friendly unit within Command range gains +D3 Initiative (max 10) until your next Start of Turn.",
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "stone shaper",
    displayName: "Stone Shaper",
    description:
      "If not in combat, nominate a friendly Necrolith Colossus, Necrosphinx or (Venerable) Ushabti unit within Command range: its Regeneration save improves by 1 until the end of the turn.",
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "unstoppable assault",
    displayName: "Unstoppable Assault",
    description:
      "In a turn it charged, every attack causing an unsaved wound grants one more attack (which can also trigger this). Not Stomp Attacks.",
    phases: ["choose-fight"],
    yourTurnOnly: true,
  },
  {
    id: "soul reaper",
    displayName: "Soul Reaper",
    description:
      "After deployment, nominate one enemy character: this model may re-roll To Hit rolls of a natural 1 against it.",
    phases: ["deployment", "choose-fight"],
  },
  {
    id: "covenant of power",
    displayName: "Covenant of Power",
    description:
      'Friendly Liche Priests within 12" get +1 to Casting rolls; any model (friend or foe) casting a Bound spell within 12" gets +1 (not the Casket\'s own Bound spells).',
    phases: ["conjuration", "remaining-moves", "shoot", "choose-fight"],
  },
  {
    id: "unbound spirits",
    displayName: "Unbound Spirits",
    description:
      'If the crew is reduced to zero Wounds, roll D6 for every unit (friend or foe) within 12": on 4+ it suffers D6 S3 hits, no armour or Regeneration saves. Then remove the Casket.',
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "banner of the king",
    displayName: "Banner of the King",
    description:
      'Replaces "Hold Your Ground" when this model is your Battle Standard Bearer: friendly units within its Command range may re-roll failed Leadership tests, and reduce Wounds lost to Unstable by D3 (not cumulative with Indomitable — use the higher).',
    phases: ["break-test"],
  },
  {
    id: "sworn protector",
    displayName: "Sworn Protector",
    description:
      'If a Monarch of Nehekhara within 3" suffers a hit, you may transfer the hit and all its effects to this model.',
    phases: ["shoot", "choose-fight"],
    opponentOnly: true,
  },
  {
    id: "vortex of souls",
    displayName: "Vortex of Souls",
    passive: true,
    description:
      'May cast Light of Death (Magic Missile, 7+, 36") or Light of Protection (Enchantment, 8+, Self, Remains in Play) as bound spells with Power Level 2. Light of Protection immediately expires if Light of Death is cast.',
    phases: [],
  },
  {
    id: "arise!",
    displayName: "Arise!",
    description:
      'If not engaged, take a Leadership test. Pass: a single friendly Nehekharan Undead unit within 12" recovers Wounds — Infantry/Swarms: Wizard Level + D3; Cavalry/War Beasts: Wizard Level + 1; Monstrous Infantry/Cavalry/Light Chariot: Wizard Level; Behemoth/Heavy Chariot/War Machine: 1 Wound.',
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "the terrors below",
    displayName: "The Terrors Below",
    description:
      "When this unit enters via From Beneath the Sands, nominate one enemy regular or heavy infantry unit within 8\". That unit makes Initiative tests equal to this unit's Unit Strength — each failed test removes one model as a casualty.",
    phases: ["compulsory-moves"],
  },
  {
    id: "from beneath the sands",
    displayName: "From Beneath the Sands",
    description:
      'If not engaged, choose a friendly unit with Nehekharan Undead and Ambushers in reserve and take a Leadership test. Pass: place the unit within 12" of this model and outside 6" of enemies — it cannot charge this turn and counts as having moved. Fail: unit is delayed until your next turn. Ambushers units still arrive automatically at Round 5.',
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "my will be done",
    displayName: "My Will Be Done",
    description:
      'Take a Leadership test. Pass: choose one bonus lasting until next Start of Turn for this model, its mount, and joined unit — "Forward to Glory!": +D3 Movement; "My Worthy Champions!": +1 Weapon Skill; "Strike like the Cobra!": +D3 Initiative. Not cumulative (no effect if used again on same unit this turn).',
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "eternal taskmaster",
    displayName: "Eternal Taskmaster",
    description:
      "Once per Command sub-phase, take a Leadership test. Pass: character and joined unit gain Extra Attacks (+1) and Hatred (all enemies) until next Start of Turn.",
    phases: ["command"],
    yourTurnOnly: true,
  },
  {
    id: "nehekharan phalanx",
    displayName: "Nehekharan Phalanx",
    description:
      "Units in Close Order with shields may choose not to Give Ground when losing combat. This protection fails if the winner's Unit Strength exceeds twice the loser's.",
    phases: ["combat-result"],
  },
  {
    id: "steadfast discipline",
    displayName: "Steadfast Discipline",
    description:
      "Unit may perform Volley Fire even after moving this turn, or while performing a Stand & Shoot charge reaction.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "arrows of asaph",
    displayName: "Arrows of Asaph",
    description: "Disregard all modifiers when making ranged attack rolls.",
    phases: ["shoot"],
    yourTurnOnly: true,
  },
  {
    id: "dry as dust",
    displayName: "Dry as Dust",
    description:
      "When this model suffers an unsaved Wound from a Flaming Attack, opponent rolls D6: 1–3 wound is harmless; 4+ model suffers 1 additional Wound. Excess wounds don't spill over to the unit.",
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "curse of the necropolis",
    displayName: "Curse of the Necropolis",
    description:
      "When this model loses its final Wound to an enemy attack, the enemy unit that dealt the killing blow must immediately take a Leadership test. If failed, that unit suffers D3 Strength 2 hits with AP −.",
    phases: ["choose-fight"],
  },
  {
    id: "nehekharan undead",
    displayName: "Nehekharan Undead",
    phases: [
      {
        subPhaseId: "remaining-moves",
        description:
          "Cannot march (unless possessing Fly and choosing to fly). Immune to Psychology. Unbreakable — gives ground instead of breaking.",
      },
      {
        subPhaseId: "combat-result",
        description:
          "Unstable: if combat is lost, unit suffers additional Wounds equal to the combat result points lost (no saves of any kind allowed). Characters with this rule cannot join units without it.",
      },
    ],
  },
  {
    id: "cloud of dust",
    displayName: "Cloud of Dust",
    description:
      "Any enemy model targeting this model in the Shooting phase suffers an additional -1 To Hit.",
    phases: ["shoot"],
    opponentOnly: true,
  },
  {
    id: "herald of despair",
    displayName: "Herald of Despair",
    description:
      "Enemy units in base contact with Nekaph or his unit roll an extra D6 for Fear and Terror tests and discard the lowest.",
    phases: ["choose-fight"],
  },
  {
    id: "settras champion",
    displayName: "Settra's Champion",
    aliases: ["settra's champion"],
    description:
      "Must always issue and accept challenges; his challenges cannot be refused. In a challenge he strikes Killing Blow on To Wound rolls of 5 or 6.",
    phases: ["choose-fight"],
  },
  {
    id: "scarab prince",
    displayName: "Scarab Prince",
    description:
      'When Apophas loses his last Wound, every enemy unit within 2D6" suffers 2D6 S2 AP -1 hits.',
    phases: ["shoot", "choose-fight"],
  },
  {
    id: "usirians reaper",
    displayName: "Usirian's Reaper",
    aliases: ["usirian's reaper"],
    description:
      "After deployment, nominate an enemy character: Apophas re-rolls failed To Hit and To Wound rolls against it, and his hits on it have Magical Attacks.",
    phases: ["deployment", "choose-fight"],
  },
  {
    id: "commander of legions",
    displayName: "Commander of Legions",
    description:
      "Settra has the Arise! rule and may use it even while engaged in combat.",
    phases: ["conjuration"],
    yourTurnOnly: true,
  },
  {
    id: "settra does not kneel!",
    displayName: "Settra Does Not Kneel!",
    aliases: ["settra does not kneel"],
    description:
      "Settra must always accept a challenge, unless Nekaph is in the same combat — then Nekaph must accept it for him.",
    phases: ["choose-fight"],
  },
  {
    id: "settra the great",
    displayName: "Settra the Great",
    description:
      'Settra must be the General and the Hierophant. Command range 18".',
    passive: true,
    phases: [],
  },
];

export default RULES;
