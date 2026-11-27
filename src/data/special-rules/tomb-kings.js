/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  // ─── Tomb Kings ───────────────────────────────────────────────────────

  {
    id: "fear of elves",
    displayName: "Fear of Elves",
    passive: true,
    description:
      "Elves of any type cause Fear in models with this special rule.",
    phases: [],
  },
  {
    id: "indomitable",
    displayName: "Indomitable",
    description:
      "Reduce the wounds suffered from Unstable by the number in brackets. Not cumulative: a unit uses the highest Indomitable value among its models.",
    phases: ["break-test"],
  },
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
];

export default RULES;
