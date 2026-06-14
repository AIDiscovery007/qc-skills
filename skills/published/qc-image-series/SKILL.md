---
name: qc-image-series
description: Creates one message-first series-spec.md with consistent image prompts, platform ratios, discoverable style files, and visual tokens for multi-image series. Use when the user asks to turn a file, article, script, storyboard, outline, video, or audio source into social-platform cover images, series images, carousels, or stable prompt packs.
---

# QC Image Series

## Purpose

Turn a source object into a controlled image-series spec. The output should feel visually consistent and make the source's core information immediately legible. This skill plans images; it does not generate images.

## Deliverable

Create exactly one short slug folder in the current workspace for the source object. Put exactly one file inside it: `series-spec.md`.

## Core Rules

- Message first: every image needs one concrete claim and one visual proof/cue. If the selected style uses text, add exact visible text; if the style is textless, set `Visible text: none`.
- Text policy comes from the selected style. Never plan a separate base image followed by Python, canvas, SVG, Pillow, ImageMagick, or other post-processing text overlay.
- Keep platform, layout, and style separate: platform decides ratio, safe zones, and text scale; layout decides persuasion structure and reading path; style decides palette, geometry, and visual language.
- No-frame flat field: no frames, cards, panels, windows, browser chrome, app mockups, terminal windows, screenshots, slides, dashboards, dialogs, modals, bordered layouts, pills, badges, or tabs. Put content directly on a clean background. Rectangles may be symbols, blocks, marks, or fragments, never enclosing containers.

## Fixed SOP

Follow in order. Do not reorder.

1. Folder: create one short slug folder in the current workspace.
2. Source: if media/audio/URL/subtitle/transcript, read [references/media-source.md](references/media-source.md) and follow its Decision SOP; otherwise use source text directly.
3. Platform: if user names 小红书/抖音/bilibili/B站 or multiple platforms, read [references/platforms.md](references/platforms.md). If only 抖音, use `douyin-vertical`. If none, use `base` 16:9.
4. Style: read [references/style-selection.md](references/style-selection.md). List styles from `styles/*.md`; if the user did not name one, ask them to choose before continuing.
5. Message units: each image gets `core message`, `visible text` or `none`, `focal object`, `evidence cue`, `reader takeaway`. Keep source-backed numbers/names/contrasts/timelines/causes/consequences/tensions. Merge or drop weak units.
6. Layout: read [references/layout.md](references/layout.md). Apply its Decision SOP top to bottom and stop at the first matching pattern.
7. Prompt: repeat platform + layout + style tokens in every prompt. Change only image-specific message fields. Follow the selected text policy inside the prompt.
8. Write: create only `series-spec.md` in the output folder.
9. QA: run the checklist before finishing.

## Prompt Assembly Order

Use this order for every prompt. Timed or motion beats become static `Scene state`.

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
Style: <selected style id>
Text policy: in-image-text | textless
Series tokens: platform + layout + style tokens
Source: ...
Source normalization: existing transcript | sidecar subtitles | downloaded subtitles | embedded subtitles | ASR transcript
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

- Do not generate images, media, HTML previews, contact sheets, thumbnails, scripts, rendering utilities, or hand-rolled media parsing.
- Do not propose generating a base image and adding text later with Python, canvas, SVG, Pillow, ImageMagick, design software, or any post-processing workflow.
- Do not create multiple deliverable files or support artifacts inside the output folder. Temporary media/transcript files may exist outside it while working; the final output folder contains only `series-spec.md`.
- Do not turn the source into generic posters or abstract symbols with weak source grounding.

## QA Checklist

- No content is enclosed in a card, frame, window, panel, or mockup.
- Media sources state how subtitles/transcript were obtained; do not invent transcript content.
- Platform ratio and style tokens are separate and both are explicit.
- Every image names one layout pattern and reading path, and every prompt follows the selected style text policy.
- Each image has one clear source-backed claim, a correct text-policy instruction, and enough clean background around it.
- Motion language from the source has been converted into static visual states.
- The output folder contains `series-spec.md` and no other files.
