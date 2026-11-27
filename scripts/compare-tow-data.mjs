#!/usr/bin/env node
// compare-tow-data.mjs — compare a tow.whfb.app snapshot with the app's data
//
// Usage:
//   npm run crawl:rules            # take a snapshot first (~50 min)
//   npm run compare:rules [-- --input ~/tow-rules] [-- --since 2026-06-10]
//
// Reads the raw snapshot written by crawl-tow-rules.mjs and the app's data
// modules, then writes {input}/comparison.md (full report) and
// {input}/comparison.json, and prints a summary.
//
// Compares: unit profiles (characteristics, troop type, armour value,
// equipment), units missing from the app, spells, weapons, magic item
// points, and special rules (unknown to the app / edited since --since).

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appModule = (p) => import(path.join(REPO, p));

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const INPUT = arg("--input", path.join(os.homedir(), "tow-rules")).replace(
  /^~/,
  os.homedir(),
);
const RAW = path.join(INPUT, "raw");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Plain text of a rich-text node. */
const text = (n) =>
  !n
    ? ""
    : n.nodeType === "text"
      ? n.value
      : (n.content || []).map(text).join("");

/** Like text(), but each paragraph and list item on its own line. */
const blockText = (n) =>
  !n
    ? ""
    : n.nodeType === "text"
      ? n.value
      : (n.content || []).map(blockText).join("") +
        (["paragraph", "list-item"].includes(n.nodeType) ? "\n" : "");

/** Comparison key for names: lowercase, no accents or apostrophes. */
const key = (s) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Comparison key for values: also drops spaces, quotes and dash variants. */
const val = (s) =>
  key(s)
    .replace(/[—–]/g, "-")
    .replace(/[^a-z0-9+\-/()*]/g, "");

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const pagesIn = (dir) =>
  fs.existsSync(path.join(RAW, dir))
    ? fs
        .readdirSync(path.join(RAW, dir))
        .map((f) => readJson(path.join(RAW, dir, f)).pageProps)
    : [];

/**
 * Every record of a content type in the given snapshot folders, keyed by id.
 * Records appear inline (sys.contentType) or attached to entries as
 * data.<type> arrays (spells, magic items).
 */
function collect(dirs, type) {
  const found = new Map();
  for (const dir of dirs)
    for (const page of pagesIn(dir))
      (function walk(n, from) {
        if (!n || typeof n !== "object") return;
        // The same record can appear as a full entry or as a stub link
        // (name and slug only); keep the most complete copy.
        const add = (x) => {
          if (!x.fields?.name) return;
          const id = x.sys?.id ?? x.fields.slug;
          const prev = found.get(id);
          if (
            !prev ||
            Object.keys(x.fields).length > Object.keys(prev).length - 2
          )
            found.set(id, {
              ...x.fields,
              _sys: x.sys ?? prev?._sys,
              _pages: prev?._pages ?? new Set(),
            });
          found.get(id)._pages.add(from);
        };
        if (n.sys?.contentType?.sys?.id === type) add(n);
        for (const x of Array.isArray(n.data?.[type]) ? n.data[type] : [])
          add(x);
        for (const v of Object.values(n)) walk(v, from);
      })(page, page.entry?.fields?.slug ?? dir);
  return [...found.values()].map((r) => ({ ...r, _pages: [...r._pages] }));
}

/**
 * Split equipment text into singular item names: "Hand weapons, shields and
 * light armour" → ["hand weapon", "shield", "light armour"]. Per-model labels
 * in multi-model units ("Crew: hand weapons") are dropped.
 */
const equipmentList = (s) =>
  String(s)
    // "Sharp stuff (counts as hand weapons and throwing weapons)" → also
    // list what it counts as, so those items aren't lost with the brackets.
    .replace(/\(counts as (?:an? )?([^)]*)\)/gi, ", $1")
    .split(/,|\band\b|\n/)
    .map((x) =>
      key(x)
        .replace(/^.*?:\s*/, "")
        .replace(/\s*\(.*?\)/g, "")
        .replace(/^(a|an|d3|d6)\s+/, "")
        .replace(/s$/, ""),
    )
    .filter(Boolean);

// Equipment that changes the numbers. Natural armour (scaly skin, calloused
// hide…) is stored in the app as the standard armour it equals, so armour is
// only compared when the site lists standard armour alone.
const STANDARD_ARMOUR = [
  "light armour",
  "heavy armour",
  "full plate armour",
  "shield",
  "barding",
];
const isNaturalArmour = (item) =>
  /hide|skin|scale|flesh|carapace|plumage|fuselage|armour|plate|shell/.test(
    item,
  ) && !STANDARD_ARMOUR.includes(item);

// ---------------------------------------------------------------------------
// Units
// ---------------------------------------------------------------------------

const CHARACTERISTICS = ["M", "WS", "BS", "S", "T", "W", "I", "A", "Ld"];
const MARKER_CODES = ["Ch", "NCh"];

// Site slugs that the app stores under a different key.
const UNIT_KEY_ALIASES = {
  "great-cannon": "great-cannon-empire",
  mortar: "mortar-empire",
  "bolt-thrower": "bolt-thrower-dwarfs",
  cannon: "cannon-dwarfs",
  "treemen-ancient": "treeman-ancient",
};

/**
 * The snapshot links troop types by id without their names, so infer each
 * id's app code from the units both sides agree on. An id that never
 * appears on its own is a marker (Character / Named Character).
 */
function inferTroopTypes(pairs) {
  const appearsAlone = new Set(
    pairs.filter((p) => p.site.length === 1).map((p) => p.site[0]),
  );
  const votes = {};
  for (const { site, app } of pairs)
    for (const id of site) {
      const pool = appearsAlone.has(id)
        ? app.filter((c) => !MARKER_CODES.includes(c))
        : app.filter((c) => MARKER_CODES.includes(c));
      for (const code of pool) {
        votes[id] ??= {};
        votes[id][code] = (votes[id][code] || 0) + 1;
      }
    }
  const map = {};
  for (const [id, v] of Object.entries(votes)) {
    const [[code, n]] = Object.entries(v).sort((a, b) => b[1] - a[1]);
    const total = pairs.filter((p) => p.site.includes(id)).length;
    map[id] = { code, agree: n, total };
  }
  return map;
}

async function compareUnits() {
  const { UNIT_STATS } = await appModule("src/data/units.js");
  const { resolveUnitEntry } = await appModule("src/parsers/resolve.js");
  const { COMBAT_WEAPONS, RANGED_WEAPONS } = await appModule(
    "src/data/weapons.js",
  );
  const weaponNames = new Set(
    Object.entries({ ...COMBAT_WEAPONS, ...RANGED_WEAPONS }).flatMap(([k, w]) =>
      [k, w.name].map((n) => key(n).replace(/s$/, "")),
    ),
  );
  const site = collect(["warhammer-armies"], "armyListEntry").filter(
    (e) => e.unitProfile,
  );
  const appKeys = new Map(Object.keys(UNIT_STATS).map((k) => [key(k), k]));
  const appKeyFor = (slug) => appKeys.get(key(UNIT_KEY_ALIASES[slug] ?? slug));

  const matched = [];
  const missing = [];
  for (const e of site) {
    const k = appKeyFor(e.slug);
    if (k) matched.push({ e, k, app: resolveUnitEntry(UNIT_STATS[k]) });
    else
      missing.push({
        name: e.name,
        slug: e.slug,
        armies: e._pages,
        created: e._sys?.createdAt?.slice(0, 10),
      });
  }

  const troopMap = inferTroopTypes(
    matched.map(({ e, app }) => ({
      site: (e.troopType || []).map((t) => t.sys?.id),
      app: app[0]?.troopType || [],
    })),
  );

  const units = [];
  for (const { e, k, app } of matched) {
    const changes = [];
    const appByName = new Map(app.map((p) => [key(p.Name), p]));
    for (const sp of e.unitProfile) {
      const ap = appByName.get(key(sp.Name));
      if (!ap) {
        changes.push({
          kind: "profile",
          what: `site has profile "${sp.Name}"; app doesn't`,
        });
        continue;
      }
      for (const c of CHARACTERISTICS)
        if (String(sp[c] ?? "").trim() !== String(ap[c] ?? "").trim())
          changes.push({
            kind: "stat",
            what: `${sp.Name} ${c}`,
            app: ap[c],
            site: sp[c],
          });
    }
    const siteNames = new Set(e.unitProfile.map((p) => key(p.Name)));
    for (const ap of app)
      if (!siteNames.has(key(ap.Name)))
        changes.push({
          kind: "profile",
          what: `app has profile "${ap.Name}"; site doesn't`,
        });

    // Troop type
    const siteTypes = (e.troopType || [])
      .map((t) => troopMap[t.sys?.id]?.code ?? "?")
      .sort();
    const appTypes = [...(app[0]?.troopType || [])].sort();
    if (siteTypes.join() !== appTypes.join())
      changes.push({
        kind: "troop type",
        what: "troop type",
        app: appTypes.join(", "),
        site: siteTypes.join(", "),
      });

    // Armour value (vehicles and monsters with a natural save)
    if (e.armourValue) {
      const appAV = app[0]?.AS
        ? `${app[0].AS}+`
        : app[0]?.as
          ? `${app[0].as}+`
          : "";
      if (val(appAV) !== val(e.armourValue))
        changes.push({
          kind: "armour value",
          what: "armour value",
          app: appAV || "none",
          site: e.armourValue,
        });
    }

    // Equipment: weapons the app knows, plus standard armour and shields
    const siteItems = equipmentList(blockText(e.equipment));
    const appItems = app.flatMap((p) =>
      (p.equipment || []).flatMap(equipmentList),
    );
    const compareArmour = !siteItems.some(isNaturalArmour);
    const relevant = (item) =>
      item !== "hand weapon" &&
      (weaponNames.has(item) ||
        (compareArmour && STANDARD_ARMOUR.includes(item)));
    const siteSet = [...new Set(siteItems.filter(relevant))].sort();
    const appSet = [...new Set(appItems.filter(relevant))].sort();
    const onlySite = siteSet.filter((x) => !appSet.includes(x));
    const onlyApp = appSet.filter((x) => !siteSet.includes(x));
    if (siteItems.length && (onlySite.length || onlyApp.length))
      changes.push({
        kind: "equipment",
        what: "equipment",
        app: onlyApp.length ? `has ${onlyApp.join(", ")}` : "",
        site: onlySite.length ? `has ${onlySite.join(", ")}` : "",
      });

    if (changes.length)
      units.push({
        key: k,
        name: e.name,
        armies: e._pages,
        updated: e._sys?.updatedAt?.slice(0, 10),
        changes,
      });
  }
  return {
    siteCount: site.length,
    matched: matched.length,
    units,
    missing,
    troopMap,
  };
}

// ---------------------------------------------------------------------------
// Spells
// ---------------------------------------------------------------------------

const SPELL_TYPES = {
  assailment: "assailment",
  "magic missile": "magic-missile",
  hex: "hex",
  "magical vortex": "magical-vortex",
  conveyance: "conveyance",
  enchantment: "enchantment",
};

async function compareSpells() {
  const { LORES } = await appModule("src/data/spells.js");
  const noBracket = (s) => key(s).replace(/\s*\(.*\)\s*$/, "");
  const loreKey = (s) =>
    key(s)
      .replace(/^lore of (the )?/, "")
      .replace(/\s*\(renegade\)\s*$/, "");
  const allSpells = collect(["the-lores-of-magic"], "spell");
  let same = 0;
  const diffs = [];
  const missing = [];
  for (const page of pagesIn("the-lores-of-magic")) {
    const loreName = page.entry?.fields?.name;
    // Renegade lores are stored as "<lore>-v1.5" alongside the core lore.
    const sameName = Object.entries(LORES).filter(
      ([, l]) => loreKey(l.name) === loreKey(loreName),
    );
    const isRenegade = /\(renegade\)\s*$/i.test(loreName);
    const appLore = (sameName.find(
      ([k]) => k.endsWith("-v1.5") === isRenegade,
    ) ?? sameName[0])?.[1];
    for (const s of allSpells.filter((s) =>
      s._pages.includes(page.entry.fields.slug),
    )) {
      const cells = {};
      (function rows(n) {
        if (!n || typeof n !== "object") return;
        if (n.nodeType === "table-row") {
          const [k, v] = (n.content || []).map((c) => text(c).trim());
          if (k) cells[k] = v;
        }
        for (const v of Object.values(n)) rows(v);
      })(s.body);
      const a = appLore?.spells.find(
        (x) => noBracket(x.name) === noBracket(s.name),
      );
      if (!a) {
        missing.push(`${loreName}: ${s.name}`);
        continue;
      }
      const d = [];
      if (val(a.cv) !== val(cells["Casting Value"]))
        d.push(`CV ${a.cv} → ${cells["Casting Value"]}`);
      if (val(a.range) !== val(cells.Range))
        d.push(`range ${a.range} → ${cells.Range}`);
      if (a.type !== SPELL_TYPES[key(cells.Type)])
        d.push(`type ${a.type} → ${cells.Type}`);
      if (d.length) diffs.push(`${loreName}: ${s.name}: ${d.join(", ")}`);
      else same++;
    }
  }
  return { same, diffs, missing };
}

// ---------------------------------------------------------------------------
// Weapons
// ---------------------------------------------------------------------------

// The site writes "N/A" where the app writes "Template" (range) or "—" (AP).
const weaponVal = (s) =>
  ["na", "n/a", "template", "-", ""].includes(val(s))
    ? "-"
    : val(s).replace(/"/g, "");

async function compareWeapons() {
  const { RANGED_WEAPONS, COMBAT_WEAPONS } = await appModule(
    "src/data/weapons.js",
  );
  const site = collect(
    ["weapons-of-war", "magic-items", "warhammer-armies"],
    "weaponProfile",
  );
  const app = [
    ...Object.values(RANGED_WEAPONS).map((w) => ({ ...w, kind: "ranged" })),
    ...Object.values(COMBAT_WEAPONS).map((w) => ({ ...w, kind: "combat" })),
  ];
  let same = 0;
  const diffs = [];
  for (const a of app) {
    const cands = site.filter(
      (s) => key(s.name.replace(/\s*\(profile\)\s*$/i, "")) === key(a.name),
    );
    if (!cands.length) continue;
    const matches = (s) =>
      (a.kind === "combat" || weaponVal(s.range) === weaponVal(a.range)) &&
      weaponVal(s.strength) === weaponVal(a.s) &&
      weaponVal(s.armourPiercing) === weaponVal(a.ap);
    if (cands.some(matches)) same++;
    else
      diffs.push(
        `${a.name} (${a.kind}): app ${a.range ?? ""} S ${a.s}, AP ${a.ap} | site ${cands
          .map(
            (s) => `${s.range ?? ""} S ${s.strength}, AP ${s.armourPiercing}`,
          )
          .join(" / ")}`,
      );
  }
  return { same, diffs };
}

// ---------------------------------------------------------------------------
// Magic items
// ---------------------------------------------------------------------------

async function compareItems() {
  // Core items only: supplement items have their own (Renegade) costs
  const { CORE_MAGIC_ITEMS: MAGIC_ITEMS } = await appModule(
    "src/data/magic-items.js",
  );
  const site = collect(["magic-items", "warhammer-armies"], "magicItem").filter(
    (i) => i.cost !== undefined,
  );
  let same = 0;
  const diffs = [];
  for (const a of MAGIC_ITEMS) {
    const c = site.filter(
      (s) => key(s.name).replace(/\*$/, "") === key(a.name),
    );
    if (!c.length) continue;
    // costOverride holds the real price when it isn't a flat cost
    // ("+15 points per Character / +3 points per model"); cost is then a
    // placeholder.
    const costs = (s) =>
      s.costOverride
        ? /^free$/i.test(String(s.costOverride).trim())
          ? [0]
          : (String(s.costOverride).match(/\d+/g) || []).map(Number)
        : [/^free$/i.test(String(s.cost)) ? 0 : Number(s.cost)];
    if (c.some((s) => costs(s).includes(a.points))) same++;
    else
      diffs.push(
        `${a.name}: app ${a.points} pts | site ${[...new Set(c.map((s) => s.costOverride ?? s.cost))].join(" / ")} pts`,
      );
  }
  return { same, diffs };
}

// ---------------------------------------------------------------------------
// Special rules
// ---------------------------------------------------------------------------

async function compareRules(since) {
  const { CORE_RULES } = await appModule("src/data/special-rules.js");
  const { SUPPLEMENT_RULES } = await appModule("src/data/supplements/index.js");
  const ruleKey = (s) =>
    key(s)
      .replace(/\s*\(.*?\)\s*$/, "")
      .replace(/\*$/, "");
  const known = new Set();
  for (const r of [...CORE_RULES, ...SUPPLEMENT_RULES])
    for (const n of [r.id, r.displayName, ...(r.aliases || [])])
      known.add(ruleKey(n));

  const siteRules = pagesIn("special-rules")
    .map((p) => p.entry)
    .filter((e) => e?.fields?.name)
    .map((e) => ({
      name: e.fields.name,
      updated: e.sys?.updatedAt?.slice(0, 10),
      created: e.sys?.createdAt?.slice(0, 10),
    }));

  const usage = new Map();
  for (const e of collect(["warhammer-armies"], "armyListEntry")) {
    const names = new Set();
    (function links(n) {
      if (!n || typeof n !== "object") return;
      if (n.nodeType === "entry-hyperlink") names.add(ruleKey(text(n)));
      for (const c of n.content || []) links(c);
    })(e.specialRules);
    for (const n of names) {
      if (!n) continue;
      const u = usage.get(n) ?? { count: 0, units: [] };
      u.count++;
      if (u.units.length < 3) u.units.push(e.name);
      usage.set(n, u);
    }
  }
  const unknown = [...usage]
    .filter(([n]) => !known.has(n))
    .sort((a, b) => b[1].count - a[1].count)
    .map(([rule, u]) => ({ rule, ...u }));
  return {
    unknown,
    edited: siteRules.filter(
      (r) => r.updated > since && known.has(ruleKey(r.name)),
    ),
    created: siteRules.filter((r) => r.created > since),
  };
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

function report({ meta, since, units, spells, weapons, items, rules }) {
  const L = [];
  L.push(`# tow.whfb.app vs Turner Overdrive data`, "");
  L.push(
    `Snapshot: buildId \`${meta.buildId}\`, completed ${meta.completedAt ?? "?"}. "Since" date for rules: ${since}.`,
    "",
  );
  L.push(`| Area | Same | Differs | Notes |`, `|---|---|---|---|`);
  L.push(
    `| Units | ${units.matched - units.units.length} of ${units.matched} | ${units.units.length} | ${units.missing.length} site units not in the app |`,
  );
  L.push(
    `| Spells | ${spells.same} | ${spells.diffs.length} | ${spells.missing.length} not matched by name |`,
  );
  L.push(
    `| Weapons | ${weapons.same} | ${weapons.diffs.length} | matched by name only |`,
  );
  L.push(
    `| Magic item points | ${items.same} | ${items.diffs.length} | display only; totals come from the OWB file |`,
  );
  L.push(
    `| Special rules | – | ${rules.edited.length} edited, ${rules.created.length} new since ${since} | ${rules.unknown.length} rule names used by units have no app entry |`,
    "",
  );

  const kinds = ["stat", "troop type", "armour value", "equipment", "profile"];
  for (const kind of kinds) {
    const rows = units.units.flatMap((u) =>
      u.changes.filter((c) => c.kind === kind).map((c) => ({ u, c })),
    );
    if (!rows.length) continue;
    L.push(
      `## Units — ${kind} (${rows.length})`,
      "",
      `| Unit | Army lists | Site updated | What | App | Site |`,
      `|---|---|---|---|---|---|`,
    );
    for (const { u, c } of rows)
      L.push(
        `| ${u.name} (\`${u.key}\`) | ${u.armies.slice(0, 2).join(", ")} | ${u.updated ?? ""} | ${c.what} | ${c.app ?? ""} | ${c.site ?? ""} |`,
      );
    L.push("");
  }
  L.push(
    `## Units on the site but not in the app (${units.missing.length})`,
    "",
    `| Unit | Slug | Army lists | Created |`,
    `|---|---|---|---|`,
  );
  for (const m of units.missing)
    L.push(
      `| ${m.name} | \`${m.slug}\` | ${m.armies.slice(0, 3).join(", ")} | ${m.created ?? ""} |`,
    );
  L.push(
    "",
    `## Troop type mapping (inferred)`,
    "",
    `| Site id | App code | Agreement |`,
    `|---|---|---|`,
  );
  for (const [id, t] of Object.entries(units.troopMap))
    L.push(`| \`${id}\` | ${t.code} | ${t.agree}/${t.total} |`);
  L.push(
    "",
    `## Spells`,
    "",
    ...(spells.diffs.length
      ? spells.diffs.map((d) => `- ${d}`)
      : ["All matched spells are identical."]),
  );
  if (spells.missing.length)
    L.push("", "Not matched by name:", ...spells.missing.map((d) => `- ${d}`));
  L.push(
    "",
    `## Weapons (${weapons.diffs.length})`,
    "",
    ...weapons.diffs.map((d) => `- ${d}`),
  );
  L.push(
    "",
    `## Magic item points (${items.diffs.length})`,
    "",
    ...items.diffs.map((d) => `- ${d}`),
  );
  L.push(
    "",
    `## Special rules edited since ${since} (${rules.edited.length})`,
    "",
    ...rules.edited.map((r) => `- ${r.name} (${r.updated})`),
  );
  L.push(
    "",
    `## Special rules created since ${since} (${rules.created.length})`,
    "",
    ...rules.created.map((r) => `- ${r.name} (${r.created})`),
  );
  L.push(
    "",
    `## Rule names used by units with no app entry (${rules.unknown.length})`,
    "",
  );
  L.push(
    "Some are handled elsewhere (Impact Hits, Stomp Attacks, Armour Bane, lores, armour).",
    "",
  );
  for (const u of rules.unknown)
    L.push(`- ${u.count}× ${u.rule} — e.g. ${u.units.join(", ")}`);
  return L.join("\n") + "\n";
}

async function main() {
  if (!fs.existsSync(RAW))
    throw new Error(`No snapshot at ${INPUT} — run npm run crawl:rules first`);
  const meta = readJson(path.join(INPUT, "meta.json"));
  const since = arg("--since", "2026-06-10");
  const [units, spells, weapons, items, rules] = [
    await compareUnits(),
    await compareSpells(),
    await compareWeapons(),
    await compareItems(),
    await compareRules(since),
  ];
  const result = { meta, since, units, spells, weapons, items, rules };
  fs.writeFileSync(
    path.join(INPUT, "comparison.json"),
    JSON.stringify(result, null, 1),
  );
  fs.writeFileSync(path.join(INPUT, "comparison.md"), report(result));

  const count = (k) =>
    units.units.reduce(
      (n, u) => n + u.changes.filter((c) => c.kind === k).length,
      0,
    );
  console.log(
    `Units:   ${units.matched}/${units.siteCount} matched; ${units.units.length} differ — stats ${count("stat")}, troop type ${count("troop type")}, armour ${count("armour value")}, equipment ${count("equipment")}, profiles ${count("profile")}; ${units.missing.length} missing from app`,
  );
  console.log(
    `Spells:  ${spells.same} same, ${spells.diffs.length} differ, ${spells.missing.length} unmatched`,
  );
  console.log(`Weapons: ${weapons.same} same, ${weapons.diffs.length} differ`);
  console.log(
    `Items:   ${items.same} same points, ${items.diffs.length} differ`,
  );
  console.log(
    `Rules:   ${rules.edited.length} edited and ${rules.created.length} new since ${since}; ${rules.unknown.length} used by units with no app entry`,
  );
  console.log(`\nReport: ${path.join(INPUT, "comparison.md")}`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
