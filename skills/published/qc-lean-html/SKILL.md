---
name: qc-lean-html
description: Renders complex content into compact, self-contained HTML reports and visualizations. Use when the user wants a plan, report, analysis, article, or idea understood and rendered as efficient self-contained HTML.
---

# QC Lean HTML

Turn the user's request into one concise, useful HTML file.

## Workflow

1. Infer the best information structure for this request.
2. Pick a short ASCII slug.
3. From the target repo root, run this skill's `scripts/prepare-output.sh <slug>`.
4. Copy `references/design-tokens.css` into the HTML's inline `<style>`.
5. Write a complete HTML file to the printed path.
6. Verify the file exists, is non-empty, and contains `<!doctype html>`, `<html`, and `<style`.
7. Run `open <html-path>` to show it in the default browser.

## Priorities

- Philosophy: strip the request to its useful shape; less is more.
- Preserve the user's information; remove only filler and repetition.
- Make the main point obvious first, then show only the support needed to trust it.
- Use one self-contained file: inline CSS, system fonts, no external assets.
- Do not link the token file; copy it inline so the HTML stays self-contained.
- Default to no JavaScript; use tiny inline JavaScript only when interaction is necessary.
- Use `docs/report/` for output; this skill is for content understanding and rendering, not UI prototyping.
- Treat `docs/` as local output; the script keeps it ignored by Git.

## Design Tokens

- `references/design-tokens.css` is the only visual token source.
- Use its exact values for `--paper`, `--ink`, `--muted`, `--line`, `--accent`, radius, border, and spacing.
- Do not invent colors, second accents, gradients, or decorative color fields.
- Express risk/success/warning through wording, layout, border, weight, and spacing, not new colors.
- SVG markers, lines, nodes, and focus states must use these tokens.

## Information Structure

- Do not force a fixed layout; choose the structure that best fits the request.
- Lead with one conclusion, decision, or tension; support it with 3-5 key ideas per screen.
- Pick the visual grammar that matches the relationship:
  `flow`, `timeline`, `hierarchy`, `matrix`, `comparison`, or `metric`.
- If structure works, do not make a prose pile.
- If one sentence works, do not write two.

## Emphasis Logic

- Emphasize only what changes the user's understanding: conclusion, tradeoff, risk, or next action.
- Use one primary focal element; use a second only for contrast or consequence.
- Use accent color sparingly; more than two accents means the priority is unclear.
- Keep secondary information muted, grouped, or below the fold.

## Layout and Visuals

- Use spacious layout, clear hierarchy, and the fixed token palette.
- Keep each screen to 3-5 key ideas; do not crowd the page.
- If a visual lowers effort, draw it; if a sentence or table is clearer, do not.
- Every visual node must carry distinct information; merge anything that travels together.
- Prefer inline SVG for flows, relations, axes, hierarchy, and timelines.
- Use HTML/CSS for simple cards, bars, matrices, and layout.
- Keep diagrams sparse: 3-7 nodes is ideal; above 9, split or simplify.
- SVG must explain, not decorate.

## SVG Geometry

- SVG arrows must terminate on target boundaries, not empty space or node interiors.
- Route lines around text and key shapes; never let text sit directly on a line.
- Put labels beside lines or mask them with a background rect.
- Use separate connection points when multiple lines enter one node.
- Keep text inside node safe areas, away from borders, arrows, and line crossings.

## Bad Examples

- Bad: ten equal cards with the same weight. Fix: choose one lead point and group the rest.
- Bad: an arrow points near a box or crosses a label. Fix: connect to the box edge and reroute.
- Bad: a diagram repeats what one sentence says. Fix: replace it with the sentence.

## Self-check

- Self-check: tokens, density, whitespace, focal points, visual need, geometry, and wording must pass before opening.
- Final response: give the HTML path and one short note.
