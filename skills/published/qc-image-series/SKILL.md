---
name: qc-image-series
description: Creates one series-spec.md with consistent prompts for image series, social covers, carousels, or fixed-layout chapter divider title cards. Use when the user asks to turn a file, article, script, storyboard, outline, video, or audio source into series images, cover prompts, chapter split images, section divider images, or stable prompt packs.
---

# QC Image Series

## Purpose

Turn a source object into a controlled image-series spec. The output should feel visually consistent and make the source's core information immediately legible. For chapter dividers, produce fixed-layout title-card prompts only by default; render actual divider images only when the user explicitly asks for raster assets.

## Deliverable

Create exactly one short slug folder under `qc-image-series-output/` in the current repository root. Put exactly one file inside it: `series-spec.md`.

## Core Rules

- Message first: every image needs one concrete claim and one visual proof/cue. If the selected style uses text, add exact visible text; if the style is textless, set `Visible text: none`.
- Text policy comes from the selected style. Never plan a separate base image followed by Python, canvas, SVG, Pillow, ImageMagick, or other post-processing text overlay.
- Keep platform, layout, and style separate: platform decides ratio, safe zones, and text scale; layout decides persuasion structure and reading path; style decides palette, geometry, and visual language.
- No-frame flat field: no frames, cards, panels, windows, browser chrome, app mockups, terminal windows, screenshots, slides, dashboards, dialogs, modals, bordered layouts, pills, badges, or tabs. Put content directly on a clean background. Rectangles may be symbols, blocks, marks, or fragments, never enclosing containers.
- Chapter dividers are a separate mode: use the same fixed template reference in every prompt, change only the chapter title text, and do not add focal objects, evidence cues, icons, decoration, or layout variation.

## Fixed SOP

Follow in order. Do not reorder.

1. Folder: create one short slug folder under `qc-image-series-output/` in the current repository root.
2. Source: if media/audio/URL/subtitle/transcript, read [references/media-source.md](references/media-source.md) and follow its Decision SOP; otherwise use source text directly.
3. Platform: if user names 小红书/抖音/bilibili/B站 or multiple platforms, read [references/platforms.md](references/platforms.md). If only 抖音, use `douyin-vertical`. If none, use `base` 16:9.
4. Mode: if the user asks for chapter split images, section divider images, chapter title cards, or other divider-only visuals, read [references/chapter-divider.md](references/chapter-divider.md), follow it, and skip style selection and layout selection.
5. Style: read [references/style-selection.md](references/style-selection.md). List styles from `styles/*.md`; if the user did not name one, ask them to choose before continuing.
6. Message units: each image gets `core message`, `visible text` or `none`, `focal object`, `evidence cue`, `reader takeaway`. Keep source-backed numbers/names/contrasts/timelines/causes/consequences/tensions. Merge or drop weak units.
7. Layout: read [references/layout.md](references/layout.md). Apply its Decision SOP top to bottom and stop at the first matching pattern.
8. Prompt: repeat platform + layout + style tokens in every prompt. Change only image-specific message fields. Follow the selected text policy inside the prompt.
9. Write: create only `series-spec.md` in the output folder.
10. QA: run the checklist before finishing.

## Prompt Assembly Order

Use this order for normal message-series prompts. For chapter divider prompts, use [references/chapter-divider.md](references/chapter-divider.md). Timed or motion beats become static `Scene state`.

```md
Platform: [platform], canvas [ratio], safe zone [margin].
Layout: [pattern]. Reading path: [first -> second -> third].
Style: [paste the selected style prompt block].
Core message: [one source-backed claim].
Text instruction: [render exact visible text when in-image-text; Visible text: none and forbid readable text when textless].
Focal object: [one object].
Evidence cue: [number, contrast, timeline, name, or consequence].
Scene state: [static decisive state].
Final image must already follow the selected text policy. Do not add text later.
```

## Output Shape

Write `series-spec.md` in this shape:

```md
# <Source Object Name> · Series Image Spec
Platform: xiaohongshu | douyin-vertical | douyin-horizontal | bilibili | base
Canvas: ...
Mode: message-series | chapter-divider
Style: <selected style id or chapter-divider fixed reference>
Text policy: in-image-text | textless | chapter-title-only
Series tokens: platform + layout + style tokens | fixed chapter divider tokens
Source: ...
Source normalization: existing transcript | sidecar subtitles | downloaded subtitles | embedded subtitles | ASR transcript | direct text
## Message Map
- ...
1. Image title
   Core message: ...
   Layout: ...
   Text instruction: ...
   Prompt: ...
   Consistency notes: ...
## Consistency Check
- ...
```

## Don't Do

- Do not generate images, media, HTML previews, contact sheets, thumbnails, scripts, rendering utilities, or hand-rolled media parsing unless the user explicitly asks for actual chapter divider raster assets.
- Do not propose generating a base image and adding text later with Python, canvas, SVG, Pillow, ImageMagick, design software, or any post-processing workflow.
- Do not create multiple deliverable files or support artifacts inside the output folder. Temporary media/transcript files may exist outside it while working; the final output folder contains only `series-spec.md`.
- Do not turn the source into generic posters or abstract symbols with weak source grounding.
- For chapter dividers, do not invent visual metaphors, objects, icons, evidence marks, subtitles, decorative accents, or per-image layout choices.

## QA Checklist

- No content is enclosed in a card, frame, window, panel, or mockup.
- Media sources state how subtitles/transcript were obtained; do not invent transcript content.
- Platform ratio and style tokens are separate and both are explicit.
- Normal message-series images name one layout pattern and reading path, and every prompt follows the selected style text policy.
- Each image has one clear source-backed claim, a correct text-policy instruction, and enough clean background around it.
- Motion language from the source has been converted into static visual states.
- Chapter divider specs state the detected output language and repeat the same fixed layout reference in every prompt.
- If chapter dividers use a reference image, the spec records the user reference path or bundled default asset, role, preserved invariants, and known limits of image-generation layout locking.
- The output folder contains `series-spec.md` and no other files.
