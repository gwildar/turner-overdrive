/**
 * Reorders top-level keys of an `export default { ... }` object alphabetically.
 * Writes in-place. Back up first or rely on git.
 *
 * Usage: node scripts/sort-keys.mjs <file>
 */

import { readFileSync, writeFileSync } from "fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/sort-keys.mjs <file>");
  process.exit(1);
}

const src = readFileSync(file, "utf8");

const start = src.indexOf("{");
const end = src.lastIndexOf("}");
const before = src.slice(0, start + 1);
const after = src.slice(end);

const body = src.slice(start + 1, end);
const entries = [];
let current = null;

for (const line of body.split("\n")) {
  const m = line.match(/^ {2}"?([a-zA-Z0-9_-]+)"?\s*[:=]/);
  if (m) {
    if (current) entries.push(current);
    current = { key: m[1], lines: [line] };
  } else if (current) {
    current.lines.push(line);
  }
}
if (current) entries.push(current);

entries.sort((a, b) => a.key.localeCompare(b.key));

const sorted =
  before +
  "\n" +
  entries.map((e) => e.lines.join("\n")).join("\n") +
  "\n" +
  after +
  "\n";

writeFileSync(file, sorted);
console.log(`Sorted ${entries.length} keys in ${file}`);
