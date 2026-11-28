/** @type {import("../../types").SpecialRule[]} */
const RULES = [
  {
    id: "too horrible to die",
    displayName: "Too Horrible To Die",
    description:
      "First time this model loses its last Wound, roll D6: 1-3 removed; 4-5 replaced with a Rat Swarm (Skaven) or equivalent; 6 recovers D3 Wounds.",
    phases: ["shoot", "choose-fight"],
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
