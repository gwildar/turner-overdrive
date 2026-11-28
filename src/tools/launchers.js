/**
 * Buttons that open in-game tools, and the one click handler behind them.
 * The tools themselves load only when first opened.
 */

/**
 * A button that opens the blast template tool.
 * @param {{ size?: 3 | 5 | null, label?: string, className?: string }} [opts]
 */
export function blastTemplateButton({ size = null, label, className } = {}) {
  const text = label ?? (size ? `&#9678; ${size}"` : "&#9678; Template");
  return `<button type="button" data-blast-template="${size ?? ""}"
    class="${className ?? "rounded border border-wh-phase-shooting/40 px-1.5 py-px font-mono text-[10px] text-wh-phase-shooting hover:bg-wh-phase-shooting/10"}"
    title="Blast template${size ? ` (${size}")` : ""}" aria-label="Open the blast template tool${size ? ` (${size}")` : ""}">${text}</button>`;
}

let installed = false;

/** Opens tools from any [data-blast-template] button, on any screen */
export function installToolLaunchers() {
  if (installed) return;
  installed = true;
  document.addEventListener("click", async (e) => {
    const target = /** @type {HTMLElement} */ (e.target);
    const btn = /** @type {HTMLElement | null} */ (
      target.closest?.("[data-blast-template]")
    );
    if (!btn) return;
    const { openBlastTemplateTool } = await import("./blast-template-sheet.js");
    const size = Number(btn.dataset.blastTemplate);
    openBlastTemplateTool({
      size: size === 3 || size === 5 ? size : null,
      opener: btn,
    });
  });
}
