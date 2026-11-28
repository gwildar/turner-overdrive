/**
 * Identical units listed once: the first of each kind is kept and flagged
 * `merged` when there were more (screens then skip the "x10" model count,
 * which would be misleading for several units).
 *
 *   mergeDuplicates(rows, (r) => `${r.name}||${r.ld}`)
 *
 * @template T
 * @param {T[]} entries
 * @param {(entry: T) => string} keyOf - what makes two entries "the same"
 * @returns {(T & { merged: boolean })[]} in first-seen order
 */
export function mergeDuplicates(entries, keyOf) {
  const byKey = new Map();
  for (const entry of entries) {
    const key = keyOf(entry);
    if (byKey.has(key)) byKey.get(key).merged = true;
    else byKey.set(key, { ...entry, merged: false });
  }
  return [...byKey.values()];
}
