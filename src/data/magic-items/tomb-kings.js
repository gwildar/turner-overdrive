export default [
  // ─── Tomb Kings of Khemri Banners ───────────────────────────────────
  {
    name: "Standard of the Cursing Word",
    type: "banner",
    points: 80,
    effect:
      "Battle Standard Bearer only. At the start of each Combat phase, choose one enemy unit in base contact with the bearer's unit. That unit must re-roll all successful rolls To Hit until the end of the phase.",
    phases: ["combat"],
  },
  {
    name: "Icon of the Sacred Eye",
    type: "banner",
    points: 50,
    effect: "All models in the unit gain +1 Weapon Skill.",
    phases: ["combat"],
  },
  {
    name: "Royal Standard of Settra",
    type: "banner",
    points: 50,
    effect:
      "All models in the unit gain the Hatred special rule. The unit causes Terror.",
    phases: ["combat"],
  },
  {
    name: "Sigil of Centuries",
    type: "banner",
    points: 45,
    effect: 'All enemy units within 6" of this banner suffer -1 Initiative.',
    phases: ["combat"],
  },
  {
    name: "Icon of Rakaph",
    type: "banner",
    points: 40,
    effect:
      "Once per game, the unit carrying this banner may perform a free Reform during the Remaining Moves sub-phase without counting as having marched.",
    phases: ["movement"],
    subPhases: ["remaining-moves"],
  },
  {
    name: "Tapestry of Conquered Lands",
    type: "banner",
    points: 35,
    effect:
      "If the unit carrying this banner captures an enemy standard, the bearer's side scores an additional D3 Victory Points.",
    phases: ["combat"],
  },
  {
    name: "Banner of the Desert Winds",
    type: "banner",
    points: 30,
    effect:
      "Infantry only. The unit gains the Vanguard and Reserve Move special rules.",
    phases: ["movement"],
  },
  {
    name: "Mirage Banner",
    type: "banner",
    points: 20,
    effect:
      "All enemy units shooting at the unit carrying this banner suffer -1 To Hit.",
    phases: ["shooting"],
  },

  // ─── incantations-scrolls ─────────────────────────────
  {
    name: `Scroll of Awakening`,
    type: "arcane-item",
    points: 40,
    effect: `Type Magic Missile Casting Value 9 Range 27" Place a small (3") blast template so that its central hole is directly over the centre of the target enemy unit. Any enemy model whose base lies underneath the template risks being hit and suffering a single Strength 4 hit with an AP of -2.`,
    phases: ["strategy"],
  },
  {
    name: `Scroll of Righteous Smiting`,
    type: "arcane-item",
    points: 10,
    effect: `Type Enchantment Casting Value 7 Range Self Remains in play. Whilst this spell is in play, friendly units whose troop type is war machine that are within the caster's Command range can re-roll a single Artillery dice or Scatter dice per turn.`,
    phases: ["strategy"],
  },
  {
    name: `Scroll of Summoning`,
    type: "arcane-item",
    points: 45,
    effect: `Type Enchantment Casting Value 8 Range 21" The target friendly unit regains D3 lost Wounds and, until your next Start of Turn sub-phase, improves the armour value of its Regeneration save by 1.`,
    phases: ["strategy"],
  },
  {
    name: `Scroll of the Outcast Dead`,
    type: "arcane-item",
    points: 35,
    effect: `Type Magical Vortex Casting Value 8 Range 18" Remains in play. Place a small (3") blast template so that its central hole is within 18" of the caster. Whilst in play, the template is treated as difficult terrain. The template scatters D6" during every Start of Turn sub-phase. Any unit (friend or foe) that moves through the template, or that the template moves over, suffers a single Strength 4 hit with an AP of -2. This hit has the Multiple Wounds (D3) special rule. Any unit that suffers one or more unsaved wounds from this weapon must make a Panic test as if it had taken heavy casualties.`,
    phases: ["strategy"],
  },
  {
    name: `Scroll of Urgency`,
    type: "arcane-item",
    points: 30,
    effect: `Type Conveyance Casting Value 7 Range 21" If the target friendly unit has already moved during this Movement phase (not including failed charge moves), it can immediately move again.`,
    phases: ["strategy"],
  },
  {
    name: `Scroll of Withering`,
    type: "arcane-item",
    points: 50,
    effect: `Type Hex Casting Value 8 Range 21" Until your next Start of Turn sub-phase, the target enemy unit suffers a -1 modifier to its Strength and Initiative characteristics and cannot make any Ward or Regeneration saves. This Bound spell may target an enemy unit engaged in combat.`,
    phases: ["strategy"],
  },
];
