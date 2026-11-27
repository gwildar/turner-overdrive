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
];

export default RULES;
