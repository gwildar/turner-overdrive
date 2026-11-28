/**
 * Blast template tool: a bottom sheet over any game screen. Set the target
 * unit's formation and base size, drag (or nudge) the template to where it
 * landed, and see which models are hit automatically and which on a 4+.
 * Loaded only when opened (see tools/launchers.js).
 */
import {
  BASE_SIZES,
  MM_PER_INCH,
  TEMPLATES,
  describeOffset,
  templateCoverage,
} from "./blast-template.js";
import { getTemplateToolSettings, saveTemplateToolSettings } from "../state.js";

const NUDGE_MM = MM_PER_INCH / 2;
const FILES = { min: 1, max: 20 };
const RANKS = { min: 1, max: 10 };
const COVER_FILL = {
  full: "var(--color-wh-phase-shooting)",
  partial: "var(--color-wh-phase-combat)",
  none: "var(--color-wh-card)",
};

/** @type {{ settings: ReturnType<typeof getTemplateToolSettings>, offset: { x: number, y: number }, opener: HTMLElement | null, onKey: ((e: KeyboardEvent) => void) | null }} */
const state = {
  settings: null,
  offset: { x: 0, y: 0 },
  opener: null,
  onKey: null,
};

const baseOf = (key) =>
  /** @type {[number, number]} */ (key.split("x").map(Number));
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function diameter() {
  const t = TEMPLATES[state.settings.size];
  return state.settings.legacy ? t.legacy : t.diameter;
}

function coverage() {
  const { files, ranks, base } = state.settings;
  return templateCoverage({
    files,
    ranks,
    base: baseOf(base),
    diameter: diameter(),
    offset: state.offset,
  });
}

/** How far the template can move: until it no longer touches the unit */
function limits() {
  const [bw, bd] = baseOf(state.settings.base);
  const r = diameter() / 2;
  return {
    x: (state.settings.files * bw) / 2 + r,
    y: (state.settings.ranks * bd) / 2 + r,
  };
}

function setOffset(x, y) {
  const lim = limits();
  state.offset = { x: clamp(x, -lim.x, lim.x), y: clamp(y, -lim.y, lim.y) };
  render();
}

function save() {
  saveTemplateToolSettings(state.settings);
}

/**
 * Open the tool.
 * @param {{ size?: 3 | 5 | null, opener?: HTMLElement | null }} [opts]
 */
export function openBlastTemplateTool({ size = null, opener = null } = {}) {
  closeBlastTemplateTool();
  state.settings = getTemplateToolSettings();
  if (size === 3 || size === 5) state.settings.size = size;
  state.offset = { x: 0, y: 0 };
  state.opener = opener;

  const el = document.createElement("div");
  el.id = "blast-tool";
  el.className =
    "fixed inset-0 z-50 flex items-end sm:items-center justify-center";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-labelledby", "blast-tool-title");
  el.innerHTML = sheetHtml();
  document.body.appendChild(el);
  bind(el);
  render();
  /** @type {HTMLElement} */ (el.querySelector("#blast-close")).focus();
}

export function closeBlastTemplateTool() {
  document.getElementById("blast-tool")?.remove();
  if (state.onKey) document.removeEventListener("keydown", state.onKey);
  state.onKey = null;
  state.opener?.focus?.();
  state.opener = null;
}

function sheetHtml() {
  const { files, ranks, base, legacy } = state.settings;
  const stepper = (id, label, value, { min, max }) => `
    <label class="flex flex-col gap-1 text-[10px] uppercase tracking-wide text-wh-muted">
      ${label}
      <span class="flex items-center rounded-lg border border-wh-border bg-wh-card">
        <button type="button" class="px-2.5 py-1.5 text-wh-text" data-step="${id}" data-delta="-1" aria-label="Fewer ${label.toLowerCase()}">&minus;</button>
        <input id="${id}" type="number" inputmode="numeric" min="${min}" max="${max}" value="${value}"
          class="w-10 bg-transparent text-center font-mono text-sm text-wh-text [appearance:textfield]" />
        <button type="button" class="px-2.5 py-1.5 text-wh-text" data-step="${id}" data-delta="1" aria-label="More ${label.toLowerCase()}">+</button>
      </span>
    </label>`;
  return `
    <div data-close class="absolute inset-0 bg-black/60"></div>
    <div class="blast-sheet relative w-full max-w-lg max-h-[92dvh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-wh-border bg-wh-surface p-4 shadow-2xl">
      <div class="flex items-center justify-between mb-3">
        <h2 id="blast-tool-title" class="text-lg font-bold text-wh-text">Blast Template</h2>
        <button id="blast-close" type="button" class="rounded-lg px-2 py-1 text-wh-muted hover:text-wh-text" aria-label="Close">&#10005;</button>
      </div>

      <div class="flex flex-wrap items-end gap-3 mb-3">
        <div class="flex flex-col gap-1 text-[10px] uppercase tracking-wide text-wh-muted">
          Template
          <div class="flex rounded-lg border border-wh-border overflow-hidden" role="group" aria-label="Template size">
            <button type="button" data-size="3" class="px-3 py-1.5 font-mono text-sm">3"</button>
            <button type="button" data-size="5" class="px-3 py-1.5 font-mono text-sm">5"</button>
          </div>
        </div>
        ${stepper("blast-files", "Files", files, FILES)}
        ${stepper("blast-ranks", "Ranks", ranks, RANKS)}
        <label class="flex flex-col gap-1 text-[10px] uppercase tracking-wide text-wh-muted">
          Base (mm)
          <select id="blast-base" class="rounded-lg border border-wh-border bg-wh-card px-2 py-1.5 font-mono text-sm text-wh-text">
            ${BASE_SIZES.map(([w, d]) => `<option value="${w}x${d}" ${`${w}x${d}` === base ? "selected" : ""}>${w}×${d}</option>`).join("")}
          </select>
        </label>
      </div>

      <svg id="blast-board" class="w-full rounded-lg bg-wh-bg touch-none select-none cursor-grab outline-none focus-visible:ring-2 focus-visible:ring-wh-accent"
        tabindex="0" role="img" aria-label="Unit and template: drag the template, or use the arrow keys"></svg>

      <div class="mt-2 flex items-center gap-3">
        <div class="grid grid-cols-3 gap-1" role="group" aria-label="Nudge the template half an inch">
          <span></span><button type="button" class="blast-nudge" data-nudge="0,-1" aria-label="Forward">&#9650;</button><span></span>
          <button type="button" class="blast-nudge" data-nudge="-1,0" aria-label="Left">&#9664;</button>
          <button type="button" class="blast-nudge text-[10px]" data-centre aria-label="Centre on the unit">&#9678;</button>
          <button type="button" class="blast-nudge" data-nudge="1,0" aria-label="Right">&#9654;</button>
          <span></span><button type="button" class="blast-nudge" data-nudge="0,1" aria-label="Back">&#9660;</button><span></span>
        </div>
        <div class="text-sm">
          <div class="text-[10px] uppercase tracking-wide text-wh-muted">From the unit's centre</div>
          <div id="blast-offset" class="font-mono text-wh-text" aria-live="polite"></div>
          <label class="mt-1 flex items-center gap-1.5 text-xs text-wh-muted">
            <input id="blast-legacy" type="checkbox" ${legacy ? "checked" : ""} class="accent-wh-accent" />
            Older templates (75/125&nbsp;mm)
          </label>
        </div>
      </div>

      <div id="blast-results" class="mt-3 grid grid-cols-3 gap-2" aria-live="polite"></div>
    </div>`;
}

function render() {
  const el = document.getElementById("blast-tool");
  if (!el) return;
  const cov = coverage();
  const r = diameter() / 2;
  const lim = limits();
  const pad = 4;
  const vb = [
    -lim.x - pad,
    -lim.y - pad - 6,
    2 * (lim.x + pad),
    2 * (lim.y + pad) + 6,
  ];
  const svg = el.querySelector("#blast-board");
  svg.setAttribute("viewBox", vb.join(" "));
  const stroke = Math.max(vb[2], vb[3]) / 300;
  svg.innerHTML = `
    <text x="0" y="${-cov.depth / 2 - 2}" text-anchor="middle" font-size="${Math.max(4, vb[2] / 40)}"
      fill="var(--color-wh-muted)" letter-spacing="1">FRONT</text>
    ${cov.bases
      .map(
        (
          b,
        ) => `<rect x="${b.x0}" y="${b.y0}" width="${b.x1 - b.x0}" height="${b.y1 - b.y0}"
          fill="${COVER_FILL[b.cover]}" fill-opacity="${b.cover === "none" ? 1 : 0.85}"
          stroke="var(--color-wh-border)" stroke-width="${stroke}" data-cover="${b.cover}" />`,
      )
      .join("")}
    <g id="blast-template" pointer-events="none">
      <circle cx="${state.offset.x}" cy="${state.offset.y}" r="${r}" fill="var(--color-wh-text)"
        fill-opacity="0.14" stroke="var(--color-wh-text)" stroke-width="${stroke * 1.5}" />
      <path d="M${state.offset.x - 3} ${state.offset.y}h6M${state.offset.x} ${state.offset.y - 3}v6"
        stroke="var(--color-wh-text)" stroke-width="${stroke}" />
    </g>`;

  for (const b of el.querySelectorAll("[data-size]")) {
    const on =
      Number(/** @type {HTMLElement} */ (b).dataset.size) ===
      state.settings.size;
    b.className = `px-3 py-1.5 font-mono text-sm ${on ? "bg-wh-accent text-wh-bg font-bold" : "text-wh-text"}`;
    b.setAttribute("aria-pressed", String(on));
  }
  el.querySelector("#blast-offset").textContent = describeOffset(state.offset);

  const total = state.settings.files * state.settings.ranks;
  const expected = Number.isInteger(cov.expected)
    ? cov.expected
    : cov.expected.toFixed(1);
  const tile = (label, value, colour, note = "") => `
    <div class="rounded-lg bg-wh-card p-2 text-center">
      <div class="font-mono text-2xl font-bold" style="color:${colour}">${value}</div>
      <div class="text-[10px] uppercase tracking-wide text-wh-muted">${label}</div>
      ${note ? `<div class="text-[10px] text-wh-muted/70">${note}</div>` : ""}
    </div>`;
  el.querySelector("#blast-results").innerHTML =
    tile("Hit automatically", cov.full, COVER_FILL.full, "completely under") +
    tile("Roll 4+", cov.partial, COVER_FILL.partial, "partly under") +
    tile(
      "Expected hits",
      expected,
      "var(--color-wh-text)",
      `of ${total} models`,
    );
}

function bind(el) {
  el.querySelector("[data-close]").addEventListener(
    "click",
    closeBlastTemplateTool,
  );
  el.querySelector("#blast-close").addEventListener(
    "click",
    closeBlastTemplateTool,
  );
  state.onKey = (e) => {
    if (e.key === "Escape") closeBlastTemplateTool();
  };
  document.addEventListener("keydown", state.onKey);

  for (const b of el.querySelectorAll("[data-size]"))
    b.addEventListener("click", () => {
      state.settings.size = /** @type {3 | 5} */ (
        Number(/** @type {HTMLElement} */ (b).dataset.size)
      );
      save();
      setOffset(state.offset.x, state.offset.y);
    });

  const numberInput = (id, { min, max }, key) => {
    const input = /** @type {HTMLInputElement} */ (el.querySelector(`#${id}`));
    const apply = (v) => {
      const n = clamp(Math.round(Number(v) || min), min, max);
      input.value = String(n);
      state.settings[key] = n;
      save();
      setOffset(state.offset.x, state.offset.y);
    };
    input.addEventListener("change", () => apply(input.value));
    for (const b of el.querySelectorAll(`[data-step="${id}"]`))
      b.addEventListener("click", () =>
        apply(
          Number(input.value) +
            Number(/** @type {HTMLElement} */ (b).dataset.delta),
        ),
      );
  };
  numberInput("blast-files", FILES, "files");
  numberInput("blast-ranks", RANKS, "ranks");

  el.querySelector("#blast-base").addEventListener("change", (e) => {
    state.settings.base = /** @type {HTMLSelectElement} */ (e.target).value;
    save();
    setOffset(state.offset.x, state.offset.y);
  });
  el.querySelector("#blast-legacy").addEventListener("change", (e) => {
    state.settings.legacy = /** @type {HTMLInputElement} */ (e.target).checked;
    save();
    render();
  });

  for (const b of el.querySelectorAll("[data-nudge]"))
    b.addEventListener("click", () => {
      const [dx, dy] = /** @type {HTMLElement} */ (b).dataset.nudge
        .split(",")
        .map(Number);
      setOffset(state.offset.x + dx * NUDGE_MM, state.offset.y + dy * NUDGE_MM);
    });
  el.querySelector("[data-centre]").addEventListener("click", () =>
    setOffset(0, 0),
  );

  bindDrag(/** @type {SVGSVGElement} */ (el.querySelector("#blast-board")));
}

/** Drag the template, or tap the board to move it there */
function bindDrag(svg) {
  const toUnit = (e) => {
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  };
  let grab = null;
  svg.addEventListener("pointerdown", (e) => {
    const p = toUnit(e);
    if (!p) return;
    const r = diameter() / 2;
    const inside = Math.hypot(p.x - state.offset.x, p.y - state.offset.y) <= r;
    grab = inside
      ? { x: p.x - state.offset.x, y: p.y - state.offset.y }
      : { x: 0, y: 0 };
    if (!inside) setOffset(p.x, p.y);
    svg.setPointerCapture(e.pointerId);
    svg.classList.add("cursor-grabbing");
  });
  svg.addEventListener("pointermove", (e) => {
    if (!grab) return;
    const p = toUnit(e);
    if (p) setOffset(p.x - grab.x, p.y - grab.y);
  });
  const end = () => {
    grab = null;
    svg.classList.remove("cursor-grabbing");
  };
  svg.addEventListener("pointerup", end);
  svg.addEventListener("pointercancel", end);
  svg.addEventListener("keydown", (e) => {
    const step = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    }[e.key];
    if (!step) return;
    e.preventDefault();
    setOffset(
      state.offset.x + step[0] * NUDGE_MM,
      state.offset.y + step[1] * NUDGE_MM,
    );
  });
}
