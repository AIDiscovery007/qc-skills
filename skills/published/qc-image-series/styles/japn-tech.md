# japn-tech Style

## Style Card

- Style id: `japn-tech`
- Aliases: `japn`, `japn-explainer`, `tech-explainer`, `极简科技解释`
- Text policy: in-image-text
- Use when: the user wants a minimalist premium explainer series with exact visible claims, evidence lines, numbers, names, or social-cover hooks.
- Do not use when: the user wants wordless abstraction or purely symbolic images.

Use `japn-tech` for flat, hard-edged, minimalist mecha-tech explainer image series. This file defines visual style only; platform ratio and safe zones come from platform presets, and persuasion layout comes from `references/layout.md`.

## Core Look

- Minimal mecha concept-sheet energy, but not a concept sheet frame.
- Clean old-paper color field, dark armor-like solids, hard ink lines, and small crimson anchor marks.
- Flat cel-shaded shapes with hard cuts. No gradients, blur, glow, particles, drop shadows, bevels, visible paper texture, or glass.
- Large quiet negative space. The image should feel controlled, sparse, and mechanical while still making the message readable.
- Use precise linework and abrupt geometry instead of decorative detail.

## Palette

Use these roles consistently across the full set:

| Token | HEX | Role |
| --- | --- | --- |
| BG | `#F2EDE4` | warm off-white paper-color background |
| INK | `#1A1A1E` | main linework and text |
| BONE | `#E8E0D0` | secondary flat planes and pale marks |
| DARK_BLUE | `#1C2333` | main armor surfaces and core shapes |
| CRIMSON | `#C0392B` | anchor nodes, cuts, warning marks |
| CYAN_DIM | `#2A6B7C` | restrained circuit or processing accents |
| SHADOW | `#0D0D10` | hard-cut dark underside shapes |
| MUTED | `#6B6460` | secondary labels and low-emphasis text |

## Geometry

- Use angular, hard-edge shapes: hexagons, square nodes, shards, L-shaped circuit paths, clipped blocks, underline marks, and tiny anchor squares.
- Default stroke weights: `1px` for fine details, `2px` for structural lines, `3px` for heavy hero outlines.
- Avoid rounded corners unless the user explicitly overrides the style.
- Use straight orthogonal or diagonal paths. Avoid soft curves.
- If a dark shape needs an underside, use a hard-cut `SHADOW` region. Never use a soft shadow.

## Series Motifs

Useful recurring motifs:

- AI core: a DARK_BLUE hexagon with an INK outline and a small CRIMSON node.
- Overload: fragmented marks, broken glyphs, or misaligned dark shards.
- Context reduction: removed blocks, cutting line, fewer remaining marks, cleaner output line.
- Multi-agent split: one central object fractured into three isolated pieces with no enclosing container.
- Communication: L-shaped circuit lines meeting at a CRIMSON square node.
- Harness: a geometric control line or open bridle-like path around a core, with anchor squares and a dotted trajectory.
- Conclusion: formula-like marks with a single CRIMSON underline or node.
- Concrete claim: one symbolic mechanism that says the same thing visually.

## Flattening Rules

The source workbook includes documents, cards, and framed note metaphors. For this skill, flatten them:

- Document blocks become loose horizontal strokes, stacked paper silhouettes, or free-floating line clusters without an enclosing frame.
- Meeting-note cards become three unframed horizontal marks plus a title-weight mark.
- Output areas become a clean line, glyph strip, or aligned shard group, not a box.
- Labels sit directly on the background in MUTED or INK; they are never inside pills, badges, tabs, or panels.

## Still-Image Logic

When adapting a timed script:

1. Choose the decisive state for each image: question, overload, reduction, split, communication, control, tension, or conclusion.
2. Use CRIMSON once per image as the visual lock point.
3. Use CYAN_DIM only when the idea is processing, communication, or signal flow.
4. Text should be typographic, not UI-like: generated directly inside the image on the background, no badge, no pill, no label container, no later overlay.

## Style Prompt Block

```md
Flat japn-tech explainer image. Warm off-white BG #F2EDE4, no frame, no card, no panel, no window, no screenshot UI. Minimal content placed directly on clean background. Hard-edge angular geometry, INK #1A1A1E linework and text, DARK_BLUE #1C2333 flat armor solids, BONE #E8E0D0 secondary marks, one CRIMSON #C0392B anchor, CYAN_DIM #2A6B7C only for processing or signal-flow accents. No gradients, no blur, no glow, no shadows, no visible paper texture.
```
