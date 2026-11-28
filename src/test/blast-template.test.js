import { describe, it, expect, beforeEach } from "vitest";
import {
  templateCoverage,
  describeOffset,
  weaponBlastSize,
  usesBlastTemplate,
  TEMPLATES,
  MM_PER_INCH,
} from "../tools/blast-template.js";
import {
  openBlastTemplateTool,
  closeBlastTemplateTool,
} from "../tools/blast-template-sheet.js";
import { getTemplateToolSettings } from "../state.js";

const cover = (opts) =>
  templateCoverage({
    files: 5,
    ranks: 4,
    base: [25, 25],
    diameter: TEMPLATES[3].diameter,
    offset: { x: 0, y: 0 },
    ...opts,
  });

describe("templateCoverage", () => {
  it('3" centred on a 5×4 block of 25 mm bases', () => {
    // 76.2 mm across: the 2×2 bases around the centre (outer corners
    // 35.4 mm away) lie completely under it
    const c = cover();
    expect(c.full).toBe(2);
    expect(c.full + c.partial).toBeGreaterThan(4);
    expect(c.bases).toHaveLength(20);
    expect(c.expected).toBe(c.full + c.partial / 2);
  });

  it('a 5" template covers more than a 3"', () => {
    const small = cover();
    const large = cover({ diameter: TEMPLATES[5].diameter });
    expect(large.full).toBeGreaterThan(small.full);
  });

  it("counts nothing when the template is off the unit", () => {
    const c = cover({ offset: { x: 200, y: 0 } });
    expect(c.full + c.partial).toBe(0);
  });

  it("a base exactly filling the template's reach is partial, not full", () => {
    // one 100×100 base under a 3" (76 mm) template: can't be completely under
    const c = cover({ files: 1, ranks: 1, base: [100, 100] });
    expect(c.full).toBe(0);
    expect(c.partial).toBe(1);
  });

  it("older templates are a little smaller", () => {
    expect(TEMPLATES[3].legacy).toBeLessThan(TEMPLATES[3].diameter);
    expect(TEMPLATES[5].legacy).toBe(125);
  });
});

describe("describeOffset", () => {
  it.each([
    [{ x: 0, y: 0 }, "Centred"],
    [{ x: -MM_PER_INCH * 1.5, y: 0 }, '1½" left'],
    [{ x: MM_PER_INCH, y: MM_PER_INCH * 2 }, '1" right, 2" back'],
    [{ x: 0, y: -MM_PER_INCH / 2 }, '½" forward'],
  ])("%o → %s", (offset, text) => expect(describeOffset(offset)).toBe(text));
});

describe("weapons with blast templates", () => {
  it("reads the size from the weapon's rules", () => {
    expect(weaponBlastSize({ rules: ['Bombardment (3" blast)'] })).toBe(3);
    expect(
      weaponBlastSize({
        notes: 'shoots like a stone thrower: 5" blast template',
      }),
    ).toBe(5);
  });

  it("knows Bombardment weapons use a template even without a size", () => {
    const w = { rules: ["Bombardment (blast: see Root Eruption)"] };
    expect(usesBlastTemplate(w)).toBe(true);
    expect(weaponBlastSize(w)).toBe(null);
    expect(usesBlastTemplate({ rules: ["Quick Shot"] })).toBe(false);
  });
});

describe("blast template tool", () => {
  beforeEach(() => {
    localStorage.clear();
    closeBlastTemplateTool();
  });

  const tool = () => document.getElementById("blast-tool");
  const results = () => tool().querySelector("#blast-results").textContent;

  it("opens as a dialog with the unit, template and results", () => {
    openBlastTemplateTool({ size: 5 });
    expect(tool().getAttribute("role")).toBe("dialog");
    expect(tool().querySelectorAll("#blast-board rect")).toHaveLength(20);
    expect(
      tool().querySelector('[data-size="5"]').getAttribute("aria-pressed"),
    ).toBe("true");
    expect(results()).toContain("Hit automatically");
    expect(results()).toContain("of 20 models");
  });

  it("changing the formation redraws the unit and is remembered", () => {
    openBlastTemplateTool();
    tool().querySelector('[data-step="blast-files"][data-delta="1"]').click();
    expect(tool().querySelectorAll("#blast-board rect")).toHaveLength(24);
    expect(getTemplateToolSettings().files).toBe(6);
  });

  it("nudges the template half an inch and shows where it is", () => {
    openBlastTemplateTool();
    const offset = () => tool().querySelector("#blast-offset").textContent;
    expect(offset()).toBe("Centred");
    tool().querySelector('[data-nudge="-1,0"]').click();
    tool().querySelector('[data-nudge="-1,0"]').click();
    expect(offset()).toBe('1" left');
    tool().querySelector("[data-centre]").click();
    expect(offset()).toBe("Centred");
  });

  it("closes with Escape and the close button", () => {
    openBlastTemplateTool();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(tool()).toBeNull();
    openBlastTemplateTool();
    /** @type {HTMLElement} */ (tool().querySelector("#blast-close")).click();
    expect(tool()).toBeNull();
  });
});
