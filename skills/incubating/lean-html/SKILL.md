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

- Preserve the user's information; remove only filler.
- Use one self-contained file: inline CSS, system fonts, no external assets.
- Default to no JavaScript; use tiny inline JavaScript only when interaction is necessary.
- Use `report` for plans/reports/analysis, `prototype` for UI demos, and `other` otherwise.
- Treat `docs/` as local output; the script keeps it ignored by Git.
- Prefer semantic HTML, compact copy, and clear hierarchy over decoration.
- Final response: give the HTML path and one short note.
