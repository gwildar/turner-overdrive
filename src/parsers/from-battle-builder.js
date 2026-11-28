/**
 * Battle Builder (oldworldrankings.com/builder) .bb.json import.
 *
 * A .bb.json export holds only ids: unit entries, the options picked in each
 * selection group, and traits (magic items and the like). This turns one
 * into the shape of an Old World Builder export, using the compact catalog
 * built by scripts/build-battle-builder-catalog.mjs, so the OWB parser does
 * the rest. The converted list is what gets stored, so the catalog is only
 * needed at import.
 */

import { LORES, LORE_NAME_TO_KEY } from "../data/spells.js";

/** @param {any} json */
export function isBattleBuilderList(json) {
  return (
    typeof json?.factionId === "string" &&
    Array.isArray(json?.units) &&
    json.units.every((u) => typeof u?.unitEntryId === "string")
  );
}

const CATEGORIES = [
  "characters",
  "core",
  "special",
  "rare",
  "mercenaries",
  "allies",
];

/**
 * Battle Builder unit entries whose slug differs from the app's unit key.
 * The OWB parser looks stats up by the id prefix, so the converted unit
 * carries the app's key.
 */
const UNIT_KEYS = {
  // The VC Renegade draft's Vampire Lord (its Vampire Count)
  "tow/vampire-counts/vampire-lord": "vampire-count-renegade",
  // Wild Herd's Centigor Chieftain is the Warhoof
  "tow/beastmen-brayherds/centigor-chieftain": "warhoof",
  "tow/daemons-of-chaos/herald-of-khorne": "daemonic-herald-of-khorne",
  "tow/daemons-of-chaos/herald-of-nurgle": "daemonic-herald-of-nurgle",
  "tow/daemons-of-chaos/herald-of-slaanesh": "daemonic-herald-of-slaanesh",
  "tow/daemons-of-chaos/herald-of-tzeentch": "daemonic-herald-of-tzeentch",
  "tow/daemons-of-chaos/herald-of-khorne-renegade":
    "daemonic-herald-of-khorne-renegade",
  "tow/daemons-of-chaos/herald-of-nurgle-renegade":
    "daemonic-herald-of-nurgle-renegade",
  "tow/daemons-of-chaos/herald-of-slaanesh-renegade":
    "daemonic-herald-of-slaanesh-renegade",
  "tow/daemons-of-chaos/herald-of-tzeentch-renegade":
    "daemonic-herald-of-tzeentch-renegade",
  "tow/daemons-of-chaos/daemon-prince": "daemon-prince-daemons-of-chaos",
  "tow/warriors-of-chaos/daemon-princes": "daemon-prince-warriors-of-chaos",
  "tow/warriors-of-chaos/galrauch-the-great-drake": "galrauch",
  "tow/warriors-of-chaos/gigantic-spawn": "gigantic-spawn-of-chaos",
  "tow/dark-elves/dark-elf-crossbowmen": "repeater-crossbowmen",
  "tow/dwarfen-mountain-holds/bolt-thrower": "bolt-thrower-dwarfs",
  "tow/dwarfen-mountain-holds/cannon": "cannon-dwarfs",
  "tow/dwarfen-mountain-holds/dwarf-engineer": "engineer",
  "tow/dwarfen-mountain-holds/dwarf-engineer-sappers": "engineer-sapper",
  "tow/empire-of-man/great-cannon": "great-cannon-empire",
  "tow/empire-of-man/mortar": "mortar-empire",
  "tow/kingdom-of-bretonnia/sergeants-at-arms": "sergeant-at-arms",
  "tow/kingdom-of-bretonnia/battle-pilgrims-grail-reliquae": "battle-pilgrims",
  "tow/kingdom-of-bretonnia/yeoman-guard": "yeomen-guard",
  "tow/tomb-kings-of-khemri/skeleton-warriors": "skeleton-warriors-tomb-kings",
  "tow/vampire-counts/skeleton-warriors": "skeleton-warriors-vampire-counts",
  "tow/wood-elf-realms/treemen": "treeman",
  "tow/wood-elf-realms/treemen-ancients": "treeman-ancient",
  "tow/wood-elf-realms/araloth": "araloth-lord-of-talsyn",
  "tow/chaos-dwarfs/chaos-dwarf-despot": "despot",
  "tow/chaos-dwarfs/k-daai-fireborn": "k'daai-fireborn",
  "tow/chaos-dwarfs/taur-ruk": "bull-centaur-taur'ruk",
};

/**
 * Names the OWB parser would misread: it looks for weapons in the unit name
 * (for war machines), so "Dark Elf Crossbowmen" would gain a Crossbow.
 */
const UNIT_NAMES = {
  "tow/dark-elves/dark-elf-crossbowmen": "Repeater Crossbowmen",
};

/** The app's lore key for a lore option ("lore-of-the-wilds" → "the-wilds") */
function loreKey(id, name) {
  if (LORES[id]) return id;
  const n = name.toLowerCase();
  return LORE_NAME_TO_KEY[n] ?? LORE_NAME_TO_KEY[`lore of ${n}`] ?? id;
}

/** Armour and shields can sit in "equipment" groups */
const ARMOUR_RE = /armour|shield|barding|armor/i;

/** "tow/dark-elves/de-renegade-v1" → "de-renegade"; grand army → the army. */
function compositionOf(forceTemplateId, army) {
  const id =
    String(forceTemplateId ?? "")
      .split("/")
      .pop() ?? "";
  if (!id || id === "grand-army") return army;
  return id.replace(/-v\d+$/, "");
}

/**
 * @param {any} json - a .bb.json export
 * @param {{ units: Record<string, any>, traits: Record<string, any>, forceTemplates?: Record<string, { v: string }> }} catalog
 * @returns {any} an Old World Builder–shaped list
 */
export function battleBuilderToOwb(json, catalog) {
  if (!isBattleBuilderList(json))
    throw new Error("Not a Battle Builder (.bb.json) army list.");
  const army = json.factionId.split("/").pop();
  const owb = {
    name: json.name || "Unknown Army",
    army,
    armyComposition: compositionOf(json.forceTemplateId, army),
    points: json.pointsLimit || 0,
    id: json.id ?? null,
    source: "battle-builder",
    // the Renegade rules version the list was built for, e.g. "v1.5.3.1"
    supplementVersion:
      catalog.forceTemplates?.[json.forceTemplateId]?.v ?? null,
    ...Object.fromEntries(CATEGORIES.map((c) => [c, []])),
  };
  const unknown = [];

  json.units.forEach((u, index) => {
    const entry = catalog.units[u.unitEntryId];
    if (!entry) {
      unknown.push(u.unitEntryId);
      return;
    }
    const slug = UNIT_KEYS[u.unitEntryId] ?? u.unitEntryId.split("/").pop();
    const strength = u.quantity || 1;
    /** @type {Record<string, any>} */
    const raw = {
      id: `${slug}.bb${index}`,
      name_en: UNIT_NAMES[u.unitEntryId] ?? entry.n,
      ...(u.customName ? { name: u.customName } : {}),
      strength,
      points: entry.b,
      equipment: [],
      armor: [],
      options: [],
      mounts: [],
      command: [],
      items: [],
    };
    const rules = [...entry.r];

    for (const sel of u.selectedOptions || []) {
      const group = entry.g[sel.groupId];
      const opt = group?.o[sel.optionId];
      if (!opt) continue; // an option from an older catalog version
      const priced = {
        points: opt.c || 0,
        ...(opt.pm ? { perModel: true } : {}),
        active: true,
      };
      const equipmentName = (opt.e?.length ? opt.e : [opt.n]).join(", ");
      // Rules the option grants, less the one named like the option (the
      // OWB parser reads active option names as rules already)
      const optRules = (opt.r || []).filter(
        (r) => r.toLowerCase() !== opt.n.toLowerCase(),
      );
      const kind =
        !opt.e?.length || group.l === "mount"
          ? group.l
          : opt.e.every((e) => ARMOUR_RE.test(e))
            ? "armour"
            : "weapon";
      switch (kind) {
        case "mount":
          if (sel.optionId !== "on-foot")
            raw.mounts.push({ name_en: opt.n, ...priced });
          break; // the mount's own rules come with the mount
        case "role":
        case "command":
          raw.command.push({
            name_en: opt.n,
            points: opt.c || 0,
            active: true,
          });
          break;
        case "armour":
          raw.armor.push({ name_en: equipmentName, ...priced });
          rules.push(...(opt.r || []));
          break;
        case "weapon":
        case "equipment":
          raw.equipment.push({ name_en: equipmentName, ...priced });
          rules.push(...(opt.r || []));
          break;
        case "magic":
          if (group.lore) {
            raw.lores = Object.entries(group.o).map(([id, o]) =>
              loreKey(id, o.n),
            );
            raw.activeLore = loreKey(sel.optionId, opt.n);
          } else if (/^level \d+ wizard/i.test(opt.n)) {
            // as OWB has it: an active "Wizard" option holding the level
            raw.options.push({
              name_en: "Wizard",
              points: 0,
              active: true,
              options: [{ name_en: opt.n, ...priced }],
            });
          } else raw.options.push({ name_en: opt.n, ...priced });
          break;
        default:
          // upgrades, attachments: named options, plus the rules they grant
          raw.options.push({ name_en: opt.n, ...priced });
          rules.push(...optRules);
      }
    }

    // Default equipment outside the option groups (a Gargantuan Treeman's
    // fists and root eruption), unless an option already gave it
    const has = (name) =>
      [...raw.equipment, ...raw.armor].some((e) =>
        e.name_en.toLowerCase().includes(name.toLowerCase()),
      );
    for (const name of entry.e || []) {
      if (has(name)) continue;
      (ARMOUR_RE.test(name) ? raw.armor : raw.equipment).push({
        name_en: name,
        points: 0,
        active: true,
      });
    }

    // A hand weapon swapped for another weapon is still carried
    const hasHandWeaponOption = Object.values(entry.g).some(
      (g) => g.l === "weapon" && g.o["hand-weapon"],
    );
    if (
      hasHandWeaponOption &&
      !raw.equipment.some((e) => /hand weapon/i.test(e.name_en))
    )
      raw.equipment.unshift({
        name_en: "Hand weapon",
        points: 0,
        active: true,
      });

    const selected = (u.traitIds || [])
      .map((id) => catalog.traits[id])
      .filter(Boolean)
      .map((t) => ({ name_en: t.n, type: t.k, points: t.c }));
    if (selected.length) raw.items.push({ name_en: "Magic Items", selected });

    raw.specialRules = { name_en: [...new Set(rules)].join(", ") };

    const category = CATEGORIES.includes(u.categoryOverride)
      ? u.categoryOverride
      : CATEGORIES.includes(entry.c)
        ? entry.c
        : "core";
    owb[category].push(raw);
  });

  if (unknown.length)
    throw new Error(
      `This list has units the importer doesn't know: ${unknown.join(", ")}. The Battle Builder catalog may need updating.`,
    );
  return owb;
}
