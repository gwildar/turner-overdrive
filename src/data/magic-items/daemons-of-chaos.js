export default [
  // ─── chaotic-gifts ─────────────────────────────
  {
    name: `Æther Blade`,
    type: "enchanted-item",
    points: 55,
    effect: `No armour saves are permitted against wounds caused by this Daemon's hand weapon (Ward and Regeneration saves can be attempted as normal).`,
    phases: ["combat"],
  },
  {
    name: `Daemonic Robes`,
    type: "enchanted-item",
    points: 35,
    effect: `This model cannot be wounded by a roll To Wound of 2, regardless of the Strength of the attack.`,
    phases: ["passive"],
  },
  {
    name: `Many Arms*`,
    type: "enchanted-item",
    points: 55,
    effect: `This model has a +1 modifier to its Attacks characteristic.`,
    phases: ["combat"],
    extremely: true,
  },
  {
    name: `Winged Horror`,
    type: "enchanted-item",
    points: 45,
    effect: `Daemonic Heralds whose troop type is regular infantry only. This model gains the Fly (8) and Swiftstride special rules.`,
    phases: ["passive"],
  },

  // ─── chaotic-icons ─────────────────────────────
  {
    name: `Banner of Unholy Victory`,
    type: "banner",
    points: 60,
    effect: `When calculating its combat result, a unit carrying the Banner of Unholy Victory may claim an additional bonus of +D3 combat result points.`,
    phases: ["passive"],
  },
  {
    name: `Standard of Chaotic Glory`,
    type: "banner",
    points: 30,
    effect: `Daemonic Locus only. Friendly Daemonic units gain a +1 modifier to their Leadership characteristic whilst within this character's Command range (to a maximum of 10).`,
    phases: ["passive"],
  },
  {
    name: `Totem of Eternal War`,
    type: "banner",
    points: 45,
    effect: `Daemonic Locus only. Friendly Daemonic units reduce the number of wounds suffered due to the Daemonic Instability special rule by an additional D3 whilst within the Command range of this model.`,
    phases: ["passive"],
  },
];
