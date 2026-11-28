/**
 * Unit names as the screens show them: singular for one model ("Witch
 * Elf"), plural for several ("Witch Elves"). Army lists and profiles mix
 * both forms, so names are turned singular first, then plural if needed.
 */

// Names whose plural isn't a matter of the last word's ending
const IRREGULAR = [
  ["Yeoman Guard", "Yeomen Guard"],
  ["Knight Errant", "Knights Errant"],
];
const PLURALS = new Map(
  IRREGULAR.map(([one, many]) => [one.toLowerCase(), many]),
);
const SINGULARS = new Map(
  IRREGULAR.map(([one, many]) => [many.toLowerCase(), one]),
);

/** "Man" → "Men", "man" → "men" (keeping the capital) */
const swapMan = (word, to) =>
  word.slice(0, -3) +
  (word.at(-3) === "M" ? to[0].toUpperCase() : to[0]) +
  to.slice(1);

/**
 * A unit's name for a panel row: plural when it has several models, its
 * mount in brackets, then the model count ("Witch Elves x24"). The count is
 * left out when the row stands for several identical units (merged), and a
 * name the player chose (customName) stays as they wrote it.
 * @param {{ name: string, strength?: number, merged?: boolean,
 *   mount?: string | object | null, customName?: boolean }} unit
 */
export function unitLabel({
  name,
  strength = 1,
  merged = false,
  mount = null,
  customName = false,
}) {
  const shown = customName ? name : displayUnitName(name, strength);
  // only a mount's name (a parsed unit's `mount` is an object: not shown)
  const mountName = typeof mount === "string" && mount ? ` (${mount})` : "";
  const count =
    !merged && strength > 1
      ? ` <span class="text-wh-muted font-normal">x${strength}</span>`
      : "";
  return `${shown}${mountName}${count}`;
}

/** "Witch Elves", 1 → "Witch Elf"; "Witch Elf", 24 → "Witch Elves" */
export function displayUnitName(name, strength) {
  const singular = toSingular(name);
  return strength > 1 ? toPlural(singular) : singular;
}

function toSingular(name) {
  const known = SINGULARS.get(name.toLowerCase());
  if (known) return known;
  // "Men-at-Arms", "Sisters of the Thorns": only the first part changes
  const split = splitQualifier(name);
  if (split) return toSingular(split[0]) + split[1];
  return name.replace(/(\S+)$/, (last) => {
    if (/(?:el|wol)ves$/i.test(last)) return last.slice(0, -3) + "f";
    if (last.endsWith("ies") && last.length > 4) return last.slice(0, -3) + "y";
    if (/(?:ss|x|z)es$/i.test(last)) return last.slice(0, -2);
    if (/men$/i.test(last)) return swapMan(last, "man"); // Crossbowmen, Men
    if (/(?:ss|us)$/i.test(last)) return last; // Sorceress, Pegasus
    if (last.endsWith("s") && last.length > 2) return last.slice(0, -1);
    return last;
  });
}

function toPlural(name) {
  const known = PLURALS.get(name.toLowerCase());
  if (known) return known;
  const split = splitQualifier(name);
  if (split) return toPlural(split[0]) + split[1];
  return name.replace(/(\S+)$/, (last) => {
    if (/^guard$/i.test(last)) return last; // Temple Guard, Black Guard
    if (/(?:el|wol)f$/i.test(last)) return last.slice(0, -1) + "ves";
    if (/(?:ss|x|z)$/i.test(last)) return last + "es"; // Phoenixes
    if (last.endsWith("s")) return last; // Pegasus, Taurus
    if (/man$/i.test(last)) return swapMan(last, "men");
    if (/[^aeiou]y$/i.test(last)) return last.slice(0, -1) + "ies";
    return last + "s";
  });
}

/**
 * "Sisters of the Thorns" → ["Sisters", " of the Thorns"], "Men-at-Arms" →
 * ["Men", "-at-Arms"]: the part that takes the plural, and the rest
 */
function splitQualifier(name) {
  const m = name.match(/^(.+?)((?:-at-arms| of .+))$/i);
  return m ? [m[1], m[2]] : null;
}
