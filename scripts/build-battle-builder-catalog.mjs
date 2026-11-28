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

/** A unit entry in the catalog's compact form */
function compactUnit(u) {
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
  return {
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

/**
 * A unit entry as a force template changes it (unitOverrides and
 * unitTagGrants): costs, options, groups, rules and category. Profile and
 * weapon changes aren't needed: the app has its own profiles per version.
 */
function applyOverrides(entry, o = {}, grantedTags = []) {
  const u = structuredClone(entry);
  if (o.baseCost != null) u.baseCost = o.baseCost;
  if (o.categoryId) u.categoryId = o.categoryId;
  if (o.minQuantity !== undefined) u.minQuantity = o.minQuantity;
  if (o.maxQuantity !== undefined) u.maxQuantity = o.maxQuantity;
  const removed = new Set(o.removeTagValues || []);
  u.tags = [...(u.tags || []), ...grantedTags, ...(o.addTags || [])]
    .filter((t) => !(t.type === "rule" && removed.has(t.value)))
    .map((t) =>
      t.type === "rule" && o.ruleParams?.[t.value] != null
        ? { ...t, param: o.ruleParams[t.value] }
        : t,
    );
  const removedGroups = new Set(o.removeGroupIds || []);
  u.selectionGroups = [
    ...(u.selectionGroups || []).filter((g) => !removedGroups.has(g.id)),
    ...(o.addSelectionGroups || []),
  ];
  const removedOptions = new Set(o.removeOptionIds || []);
  for (const g of u.selectionGroups) {
    const added = o.addOptionsByGroupId?.[g.id] || [];
    const addedIds = new Set(added.map((x) => x.id));
    g.options = [
      ...g.options.filter(
        (x) => !removedOptions.has(x.id) && !addedIds.has(x.id),
      ),
      ...added,
    ].map((x) => ({
      ...x,
      ...(o.optionCosts?.[x.id] != null ? { cost: o.optionCosts[x.id] } : {}),
      ...(o.optionGrants?.[x.id]
        ? { grants: [...(x.grants || []), ...o.optionGrants[x.id]] }
        : {}),
    }));
  }
  return u;
}

/** The fields (and option groups) of b that differ from a; null = removed */
function diffUnit(a, b) {
  const d = {};
  for (const k of ["n", "c", "b", "pm", "r", "e"])
    if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) d[k] = b[k] ?? null;
  const g = {};
  for (const id of new Set([...Object.keys(a.g), ...Object.keys(b.g)]))
    if (JSON.stringify(a.g[id]) !== JSON.stringify(b.g[id]))
      g[id] = b.g[id] ?? null;
  if (Object.keys(g).length) d.g = g;
  return Object.keys(d).length ? d : null;
}

const units = {};
for (const u of data.unitEntries) units[u.id] = compactUnit(u);
const entryById = new Map(data.unitEntries.map((u) => [u.id, u]));

const kindOf = new Map(data.traitCategories.map((c) => [c.id, c.kind]));
const traits = {};
for (const t of data.traits)
  traits[t.id] = {
    n: msg(t.name),
    k: kindOf.get(t.categoryId) ?? null,
    c: t.cost ?? 0,
  };

// Force templates: the rules version Renegade ones name ("Renegades V2
// beta - 1.5.3.1" → "v1.5.3.1"), and how each changes units (u: only what
// differs from the unit entry) and magic item costs (t)
const forceTemplates = {};
for (const t of data.forceTemplates) {
  const ft = {};
  const version = msg(t.name).match(/\b(\d+(?:\.\d+)+)$/)?.[1];
  if (version && /renegade/i.test(t.id)) ft.v = `v${version}`;

  const grants = new Map(); // unit id → tags from unitTagGrants
  for (const grant of t.unitTagGrants || [])
    for (const id of grant.filter?.entityIds || [])
      grants.set(id, [...(grants.get(id) || []), ...(grant.tags || [])]);
  const changed = new Set([
    ...Object.keys(t.unitOverrides || {}),
    ...grants.keys(),
  ]);
  const u = {};
  for (const id of changed) {
    const entry = entryById.get(id);
    if (!entry) continue;
    const diff = diffUnit(
      units[id],
      compactUnit(applyOverrides(entry, t.unitOverrides?.[id], grants.get(id))),
    );
    if (diff) u[id] = diff;
  }
  if (Object.keys(u).length) ft.u = u;

  const traitCosts = {};
  for (const [id, o] of Object.entries(t.traitOverrides || {}))
    if (o.cost != null && o.cost !== traits[id]?.c) traitCosts[id] = o.cost;
  if (Object.keys(traitCosts).length) ft.t = traitCosts;

  if (Object.keys(ft).length) forceTemplates[t.id] = ft;
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
