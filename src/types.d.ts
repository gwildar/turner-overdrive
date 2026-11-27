/**
 * Shared types for Turner Overdrive.
 *
 * The app is plain JavaScript; these types are used by `tsc --noEmit`
 * (`npm run typecheck`) via JSDoc annotations, e.g.
 *   /** @type {import("../types").SpecialRule[]} *\/
 * Nothing here is compiled or shipped.
 */

// ─── Phases ──────────────────────────────────────────────────────────────────

export type PhaseId =
  | "strategy"
  | "movement"
  | "shooting"
  | "combat"
  | "scoring";

/** Sub-phase ids from phases.js — the steps the game screen walks through. */
export type SubPhaseId =
  | "start-of-turn"
  | "command"
  | "conjuration"
  | "rally"
  | "declare-charges"
  | "compulsory-moves"
  | "remaining-moves"
  | "shoot"
  | "reserve-moves"
  | "choose-fight"
  | "combat-result"
  | "break-test"
  | "pursuit"
  | "scoring";

/** Where a special rule reminder can appear: any game step, or the deployment screen. */
export type RulePhaseId = SubPhaseId | "deployment";

// ─── Shared value formats ────────────────────────────────────────────────────

/** A save value such as "5+", optionally followed by a condition: "5+ (4+ vs S5+)". */
export type SaveValue = `${2 | 3 | 4 | 5 | 6}+${string}`;

/** Troop type codes used in unit profiles. "Ch"/"NCh" mark characters. */
export type TroopType =
  | "RI"
  | "HI"
  | "MI"
  | "WB"
  | "Sw"
  | "LC"
  | "HC"
  | "MCa"
  | "Be"
  | "LCh"
  | "HCh"
  | "MCr"
  | "WM"
  | "Ch"
  | "NCh";

export type SpellType =
  | "assailment"
  | "conveyance"
  | "enchantment"
  | "hex"
  | "magic-missile"
  | "magical-vortex";

export interface ChargeMod {
  /** Extra inches added to the maximum charge. */
  range: number;
  /** Short label shown in the charge panel, e.g. "Swift". */
  tag: string;
  color: "green" | "orange";
  /** Display order (lower first). */
  order: number;
}

// ─── Special rules (src/data/special-rules/, supplements) ───────────────────

export interface RulePhase {
  subPhaseId: RulePhaseId;
  description: string;
  yourTurnOnly?: boolean;
  opponentOnly?: boolean;
  /** Only shown from this round onwards. */
  fromRound?: number;
  table?: Record<string, string>[];
}

export interface SpecialRule {
  /** Lowercase lookup key, matched against rule names in the army file. */
  id: string;
  displayName: string;
  /** Steps the reminder appears on. A bare id uses the rule-level description and flags. */
  phases: (RulePhaseId | RulePhase)[];
  description?: string;
  passive?: boolean;
  yourTurnOnly?: boolean;
  opponentOnly?: boolean;
  fromRound?: number;
  aliases?: string[];
  ward?: SaveValue;
  chargeMod?: ChargeMod;
  armourMod?: number;
  /** Rule ids this rule also grants (e.g. The Exile's Vow → Stubborn, Veteran). */
  grantsRules?: string[];
}

// ─── Magic items (src/data/magic-items/, supplements) ───────────────────────

export type MagicItemType =
  | "weapon"
  | "armour"
  | "talisman"
  | "arcane-item"
  | "enchanted-item"
  | "banner"
  | "standard"
  | "virtue";

export interface WeaponProfile {
  name: string;
  s: string;
  ap: string;
  rules: string[];
  attacks?: string | null;
}

export interface MagicItem {
  name: string;
  type: MagicItemType;
  points: number;
  effect: string;
  phases: (PhaseId | "passive")[];
  subPhases?: SubPhaseId[];
  yourTurnOnly?: boolean;
  opponentOnly?: boolean;
  extremely?: boolean;
  singleUse?: boolean;
  maxPerModel?: number;
  /** Short label shown next to a banner, e.g. "+1 Combat Res". */
  label?: string;
  // Weapon stats
  s?: string;
  ap?: string;
  attacks?: string;
  reservedAttacks?: number;
  /** Multi-profile weapons (each profile becomes its own weapon row). */
  profiles?: WeaponProfile[];
  // Effects the app computes with
  ward?: SaveValue;
  regen?: SaveValue;
  mr?: number;
  armourBase?: number;
  armourMod?: number;
  armourBane?: number;
  apMod?: number;
  /** e.g. "+1" or "+1 when charging". */
  strengthMod?: string;
  impactHits?: string;
  combatResBonus?: number;
  chargeMod?: ChargeMod;
  grantsRules?: string[];
  removesRules?: string[];
}

// ─── Weapons (src/data/weapons.js) ──────────────────────────────────────────

export interface CombatWeapon {
  name: string;
  /** "S", "S+1", "S-1" or a fixed value such as "4". */
  s: string;
  ap: string;
  rules: string[];
  attacks?: string;
  /** Attacks that must be made with this weapon (split from the model's A). */
  reservedAttacks?: number;
  range?: string;
}

export interface RangedWeapon {
  name: string;
  range: string;
  s: string;
  ap: string;
  rules: string[];
  /** Templates and the like — no BS shown. */
  noBS?: boolean;
  /** Key into MISFIRE_TABLES. */
  misfireTable?: string;
  /** RANGED_WEAPONS keys for alternative profiles (e.g. grapeshot). */
  altProfiles?: string[];
}

export interface MisfireTable {
  name: string;
  rows: { roll: string; result: string; effect: string }[];
}

// ─── Unit profiles (src/data/units/, supplements) ───────────────────────────

/**
 * One stat line. Characteristic values are strings because the data uses
 * "-" (none) and "(+1)" (mount bonus to the rider) as well as numbers.
 */
export interface UnitProfile {
  Name: string;
  M: string;
  WS: string;
  BS: string;
  S: string;
  T: string;
  W: string;
  I: string;
  A: string;
  Ld: string;
  rules?: string[];
  equipment?: string[];
  troopType?: TroopType[];
  /** Lore keys this caster can choose from. */
  magic?: string[];
  optionalRules?: string[];
  /** Combat weapon keys (crewed units). */
  weapons?: string[];
  /** Armour save from the model's own equipment, as a number (6 = 6+). */
  as?: number;
  /** Natural armour value for vehicles and monsters, e.g. "4". */
  AS?: string;
  armourMod?: number;
  crewed?: boolean;
  Fly?: string;
  Regen?: string;
  "Magic-Res"?: string;
  "Impact-Hits"?: string;
  Stomps?: string;
}

/**
 * A unit's profiles: either a plain list, or shared fields plus per-line
 * overrides (each stat line is `{ ...shared, ...line }`).
 */
export type UnitEntry =
  | UnitProfile[]
  | { shared: Partial<UnitProfile>; stats: Partial<UnitProfile>[] };

// ─── Spells (src/data/spells.js) ────────────────────────────────────────────

export interface Spell {
  /** "S" for signature spells, otherwise 1–6. */
  num: "S" | number;
  name: string;
  type: SpellType;
  cv: string;
  range: string;
}

export interface Lore {
  name: string;
  spells: Spell[];
  faction?: string;
  signatureOnly?: boolean;
  /** Bound spells: always known, no selection. */
  bound?: boolean;
}

// ─── Army compositions (src/data/army-compositions.js) ─────────────────────

export interface DeploymentCard {
  title: string;
  colour: string;
  description: string;
  items: string[];
}

export interface ArmyComposition {
  name: string;
  /** Bonus rules injected into units whose id starts with one of unitIds. */
  rules: { rule: string; unitIds: string[] }[];
  deploymentCards?: DeploymentCard[];
  /** Lore keys swapped for this composition (the v1.5 lores for Renegade armies). */
  loreRemaps?: Record<string, string>;
}

// ─── Supplements (src/data/supplements/) ────────────────────────────────────

export interface Supplement {
  units?: Record<string, UnitEntry>;
  specialRules?: SpecialRule[];
  magicItems?: MagicItem[];
  spells?: Record<string, Lore>;
  ranged_weapons?: Record<string, RangedWeapon>;
  combat_weapons?: Record<string, CombatWeapon>;
}

// ─── Parsed army (built by src/parsers/from-owb.js) ─────────────────────────

export type UnitCategory =
  | "characters"
  | "lords"
  | "heroes"
  | "core"
  | "special"
  | "rare"
  | "mercenaries"
  | "allies";

/**
 * A special rule on a parsed unit. Rules the app doesn't know about are kept
 * as bare entries with `id: null` so their names still display.
 */
export type ResolvedRule = Omit<SpecialRule, "id"> & { id: string | null };

/** A magic item on a parsed unit. */
export type ResolvedMagicItem = MagicItem & {
  /** Bought for the unit's champion, not the whole unit. */
  championOnly?: boolean;
};

/** A combat weapon resolved for a unit. */
export interface ResolvedWeapon {
  name: string;
  s: string;
  ap: string;
  rules: string[];
  magical: boolean;
  attacks: string | null;
  reservedAttacks: number | null;
  profiles?: WeaponProfile[] | null;
}

/** A shooting weapon resolved for a unit. */
export type ResolvedShootingWeapon = RangedWeapon & {
  magical: boolean;
  attacks: string | null;
  /** Set when the weapon belongs to a mount's crew (uses the crew's BS). */
  crewBS?: string | null;
  crewName?: string;
};

/** A crew member riding a mount (e.g. a chariot's charioteers). */
export interface MountCrew {
  name: string;
  i: string;
  ws: string;
  bs: string;
  s: string;
  a: string;
  equipment: string[];
}

/** A mount resolved by findMount(). Characteristics are as in UnitProfile. */
export interface Mount {
  name: string;
  /** Movement in inches. */
  m: number;
  stomp: string | null;
  impactHits: string | null;
  /** Toughness/Wounds the mount adds to its rider ("(+1)" → 1). */
  tBonus: number;
  wBonus: number;
  ws: string;
  s: string;
  i: string;
  a: string;
  /** Natural armour save as a number (4 = 4+). */
  as: number | null;
  /** Lowercase combat weapon keys. */
  weapons: string[];
  crew: MountCrew[] | null;
  troopType: TroopType | null;
  armourBane: number | null;
  /** Fly movement in inches. */
  f: number | null;
  /** Ranged weapon key of a breath attack. */
  breath: string | null;
  /** The mount's special rules, as written in the unit data. */
  rules: string[];
}

/** Models attached to a unit, e.g. beasts in a Wood Elf Beast Pack. */
export interface Detachment {
  id: string;
  name: string;
  strength: number;
  points: number;
  stats: UnitProfile[];
  weapons: ResolvedWeapon[];
  specialRules: ResolvedRule[];
}

export interface SpellSelectionMode {
  /** Lore Familiar: choose spells freely. */
  canChoose: boolean;
  /** Arcane Familiar: choose from all lores. */
  multiLore: boolean;
  /** Cursed Coven: only one spell. */
  maxSpells: number | null;
}

export interface Unit {
  /** OWB unit id, e.g. "dark-elf-dreadlord.abc123". Stable across re-parses. */
  id: string;
  name: string;
  category: UnitCategory;
  /** Number of models. */
  strength: number;
  points: number;
  /** Stat lines: the unit itself first, then champions, crew or embedded mounts. */
  stats: UnitProfile[];
  weapons: ResolvedWeapon[];
  shootingWeapons: ResolvedShootingWeapon[];
  magicItems: ResolvedMagicItem[];
  specialRules: ResolvedRule[];
  mount: Mount | null;
  /** e.g. "4+", or null for no save. */
  armourSave: string | null;
  /** The mount's natural save makes the rider's mundane armour redundant. */
  armourSaveFromMount: boolean;
  ward: string | null;
  regen: string | null;
  /** e.g. "-2". */
  magicResistance: string | null;
  poisonedAttacks: boolean;
  stomp: string | null;
  impactHits: string | null;
  detachments: Detachment[];
  isGeneral: boolean;
  isBSB: boolean;
  hasChampion: boolean;
  hasStandard: boolean;
  hasMusician: boolean;
  isCaster: boolean;
  /** Lore keys this caster can use. */
  lores: string[];
  spellSelectionMode: SpellSelectionMode;
  /** Core lore chosen on the spell selection screen. */
  activeLore: string | null;
  /** Faction lores whose signature spells are also available. */
  factionLores: string[];
  unitStrength: number;
}

export interface Army {
  name: string;
  /** OWB army id, e.g. "dark-elves". */
  armySlug: string;
  faction: string;
  points: number;
  /** Army of Infamy / composition key, e.g. "de-renegade". */
  composition: string | null;
  /** Community supplement version the army was resolved with, e.g. "v1.5.2.2"; null for none. */
  supplementVersion?: string | null;
  /** OWB list id, used for the "view in Old World Builder" link. */
  owbId: string | null;
  units: Unit[];
  /** Sub-phases this army never uses (e.g. Undead skip Rally). */
  skipPhases: SubPhaseId[];
}
