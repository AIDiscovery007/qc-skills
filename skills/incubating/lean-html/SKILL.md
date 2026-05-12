---
name: lean-html
description: Renders user requirements into compact, self-contained HTML files. Use when the user wants a plan, prototype, report, analysis, or idea visualized as efficient HTML.
---

# Lean HTML

Turn the user's request into one dense, useful HTML file.

## Workflow

1. Understand the request and choose `report`, `prototype`, or `other`.
2. Pick a short ASCII slug.
3. From the target repo root, run this skill's `scripts/prepare-output.sh <category> <slug>`.
4. Write a complete HTML file to the printed path.
5. Verify the file exists, is non-empty, and contains `<!doctype html>`, `<html`, and `<style`.
6. Run `open <html-path>` to show it in the default browser.

## Rules

- Philosophy: strip the request to its useful shape; less is more.
- Preserve the user's information; remove only filler and repetition.
- Use one self-contained file: inline CSS, system fonts, no external assets.
- Default to no JavaScript; use tiny inline JavaScript only when interaction is necessary.
- Use `report` for plans/reports/analysis, `prototype` for UI demos, and `other` otherwise.
- Treat `docs/` as local output; the script keeps it ignored by Git.
- Use spacious layout, clear hierarchy, and at most four colors.
- Keep each screen to 3-5 key ideas; do not crowd the page.
- If one sentence works, do not write two.
- If a visual lowers effort, draw it; if a sentence or table is clearer, do not.
- If structure works, do not make a prose pile.
- Every visual node must carry distinct information; merge anything that travels together.
- Use one or two focal elements only; accent more than that means you have not chosen.
- Prefer inline SVG for flows, relations, axes, hierarchy, and timelines.
- Use HTML/CSS for simple cards, bars, matrices, and layout.
- Pick the visual grammar: `flow`, `timeline`, `hierarchy`, `matrix`, `comparison`, or `metric`.
- Keep diagrams sparse: 3-7 nodes is ideal; above 9, split or simplify.
- SVG must explain, not decorate.
- Self-check: colors, density, whitespace, focal points, visual need, and wording must pass before opening.
- Final response: give the HTML path and one short note.
