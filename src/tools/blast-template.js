/**
 * Blast template coverage: which bases in a rank-and-file unit lie under a
 * round template.
 *
 * Rules (Risk of Being Hit): a model whose base lies completely underneath
 * a template is hit automatically; partially underneath, it's hit on a 4+.
 * (The central hole isn't modelled — easy to judge on the table.)
 *
 * Units are in millimetres. The unit is centred on (0, 0), its front edge
 * at the top (negative y); the template centre is offset from the unit's
 * centre.
 */

export const MM_PER_INCH = 25.4;

/** Template diameters in mm; older GW templates were 75 mm and 125 mm */
export const TEMPLATES = {
  3: { diameter: 3 * MM_PER_INCH, legacy: 75 },
  5: { diameter: 5 * MM_PER_INCH, legacy: 125 },
};

/** Base sizes, frontage × depth in mm (as whfb.app's calculator lists) */
export const BASE_SIZES = [
  [20, 20],
  [25, 25],
  [25, 50],
  [30, 30],
  [30, 60],
  [40, 40],
  [40, 60],
  [50, 50],
  [50, 75],
  [50, 100],
  [60, 100],
  [75, 50],
  [100, 50],
  [100, 60],
  [100, 75],
  [100, 150],
  [150, 100],
];

/**
 * @typedef {{ file: number, rank: number, x0: number, y0: number, x1: number, y1: number, cover: "full" | "partial" | "none" }} BaseCover
 */

/**
 * @param {{ files: number, ranks: number, base: [number, number],
 *   diameter: number, offset: { x: number, y: number } }} opts
 * @returns {{ bases: BaseCover[], full: number, partial: number,
 *   expected: number, width: number, depth: number }}
 */
export function templateCoverage({ files, ranks, base, diameter, offset }) {
  const [bw, bd] = base;
  const width = files * bw;
  const depth = ranks * bd;
  const r = diameter / 2;
  const r2 = r * r;
  const { x: cx, y: cy } = offset;
  const bases = [];
  let full = 0;
  let partial = 0;
  for (let rank = 0; rank < ranks; rank++) {
    for (let file = 0; file < files; file++) {
      const x0 = -width / 2 + file * bw;
      const y0 = -depth / 2 + rank * bd;
      const x1 = x0 + bw;
      const y1 = y0 + bd;
      // completely under: the base's farthest corner is inside the circle
      const fx = Math.max(Math.abs(x0 - cx), Math.abs(x1 - cx));
      const fy = Math.max(Math.abs(y0 - cy), Math.abs(y1 - cy));
      // partially under: the base's nearest point is inside the circle
      const nx = Math.max(x0 - cx, 0, cx - x1);
      const ny = Math.max(y0 - cy, 0, cy - y1);
      /** @type {BaseCover["cover"]} */
      const cover =
        fx * fx + fy * fy <= r2
          ? "full"
          : nx * nx + ny * ny < r2
            ? "partial"
            : "none";
      if (cover === "full") full++;
      else if (cover === "partial") partial++;
      bases.push({ file, rank, x0, y0, x1, y1, cover });
    }
  }
  return { bases, full, partial, expected: full + partial / 2, width, depth };
}

/**
 * The template's offset from the unit centre in words, in inches:
 * "1½" left, 2" back", or "Centred".
 * @param {{ x: number, y: number }} offset - mm
 */
export function describeOffset({ x, y }) {
  const part = (mm, neg, pos) => {
    const halfInches = Math.round(Math.abs(mm) / (MM_PER_INCH / 2));
    if (halfInches === 0) return null;
    const whole = Math.floor(halfInches / 2);
    const text = `${whole || ""}${halfInches % 2 ? "½" : ""}"`;
    return `${text} ${mm < 0 ? neg : pos}`;
  };
  const parts = [part(x, "left", "right"), part(y, "forward", "back")].filter(
    Boolean,
  );
  return parts.length ? parts.join(", ") : "Centred";
}

/**
 * The blast size a weapon names ('Bombardment (3" blast)', "…a 5" blast
 * template…"), or null.
 * @param {object} weapon
 * @returns {3 | 5 | null}
 */
export function weaponBlastSize(weapon) {
  const text = JSON.stringify(weapon ?? {});
  const m = text.match(/\b([35])\\?" blast/);
  if (m) return /** @type {3 | 5} */ (Number(m[1]));
  return null;
}

/** Whether a weapon uses a blast template at all */
export function usesBlastTemplate(weapon) {
  return /bombardment|blast template|" blast/i.test(
    JSON.stringify(weapon ?? {}),
  );
}
