#!/usr/bin/env node
// build-battle-builder-catalog.mjs — compact lookup for importing Battle
// Builder (oldworldrankings.com/builder) .bb.json army lists.
//
// Usage:
//   npm run build:bb-catalog              # fetch the latest content package
//   npm run build:bb-catalog -- --package ~/tow-rules/battle-builder/tow-package.json
//
// A .bb.json export only holds ids (unit entry, option and trait ids). This
// reads Battle Builder's published content package
// (https://content.battle-builder.com/latest/tow/manifest.json) and writes
// src/data/battle-builder-catalog.json with just what the importer needs:
// names, categories, costs, rules and option groups.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import https from "node:https";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(REPO, "src/data/battle-builder-catalog.json");
const MANIFEST = "https://content.battle-builder.com/latest/tow/manifest.json";

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { "User-Agent": "turner-overdrive-catalog/1.0" } },
        (res) => {
          if (res.statusCode !== 200)
            return reject(new Error(`${url}: HTTP ${res.statusCode}`));
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        },
      )
      .on("error", reject);
  });
}

async function loadPackage() {
  const i = process.argv.indexOf("--package");
  if (i !== -1) {
    const p = process.argv[i + 1].replace(/^~/, os.homedir());
    return JSON.parse(fs.readFileSync(p, "utf8"));
  }
  const manifest = JSON.parse(await get(MANIFEST));
  const pkg = manifest.packages.find((p) => p.id === "tow");
  console.log(`Fetching content ${manifest.contentVersion} (${pkg.url})`);
  return JSON.parse(await get(new URL(pkg.url, MANIFEST).href));
}

const data = await loadPackage();
const messages = data.messages.en ?? data.messages;
const msg = (m) =>
  m && typeof m === "object" ? (messages[m.$msg] ?? m.$msg) : m;
const ruleNames = new Map(data.rules.map((r) => [r.id, msg(r.name)]));
const equipmentNames = new Map(data.equipment.map((e) => [e.id, msg(e.name)]));
/** "hatred" + "High Elves" → "Hatred (High Elves)" */
const ruleText = (id, param) => {
  const name = ruleNames.get(id) ?? id;
  // "Extra Attacks (+X)", "Regen (X+)": the parameter replaces the X
  const base = name.replace(/\s*\(\+?X\+?\)$/i, "");
  const full = base === "Regen" ? "Regeneration" : base;
  return param ? `${full} (${param})` : full;
};
const rulesFrom = (items) =>
  items.filter((g) => g.type === "rule").map((g) => ruleText(g.value, g.param));

const units = {};
for (const u of data.unitEntries) {
  const groups = {};
  for (const g of u.selectionGroups || []) {
    const options = {};
    for (const o of g.options) {
      const opt = { n: msg(o.name) };
      if (o.cost) opt.c = o.cost;
      if (o.costScaling === "perModel") opt.pm = 1;
      const rules = rulesFrom(o.grants || []);
      if (rules.length) opt.r = rules;
      // The equipment the option gives ("hand-weapon", "cavalry-spears"):
      // matches the app's weapon names better than the option's label
      const equipment = (o.equipmentRefs || []).map(
        (id) => equipmentNames.get(id) ?? id,
      );
      if (equipment.length) opt.e = equipment;
      options[o.id] = opt;
    }
    groups[g.id] = { l: g.layoutGroup, o: options };
    // Lore choice: options grant "lore-of-…" rules
    if (
      g.options.some((o) =>
        (o.grants || []).some((gr) => /^lore-of-/.test(gr.value)),
      ) &&
      g.layoutGroup === "magic"
    )
      groups[g.id].lore = 1;
  }
  units[u.id] = {
    n: msg(u.name),
    c: u.categoryId,
    b: u.baseCost ?? 0,
    ...(u.minQuantity > 1 || u.maxQuantity !== 1 ? { pm: 1 } : {}),
    r: rulesFrom(u.tags || []),
    // equipment every model has, outside any option group
    ...(u.defaultEquipmentRefs?.length
      ? { e: u.defaultEquipmentRefs.map((id) => equipmentNames.get(id) ?? id) }
      : {}),
    g: groups,
  };
}

const kindOf = new Map(data.traitCategories.map((c) => [c.id, c.kind]));
const traits = {};
for (const t of data.traits)
  traits[t.id] = {
    n: msg(t.name),
    k: kindOf.get(t.categoryId) ?? null,
    c: t.cost ?? 0,
  };

// Force templates name their rules version: "Renegades V2 beta - 1.5.3.1",
// "Renegades V1 - 1.5" → the app's supplement version ids
const forceTemplates = {};
for (const t of data.forceTemplates) {
  const version = msg(t.name).match(/\b(\d+(?:\.\d+)+)$/)?.[1];
  if (version && /renegade/i.test(t.id))
    forceTemplates[t.id] = { v: `v${version}` };
}

const out = {
  source: MANIFEST,
  gameVersion: data.gameVersion?.id ?? null,
  schemaVersion: data.schemaVersion,
  units,
  traits,
  forceTemplates,
};
fs.writeFileSync(OUT, JSON.stringify(out));
console.log(
  `${Object.keys(units).length} units, ${Object.keys(traits).length} traits → ${path.relative(REPO, OUT)} (${(fs.statSync(OUT).size / 1024).toFixed(0)} KB)`,
);
