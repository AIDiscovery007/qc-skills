# Chapter Divider Mode

Use this when the user wants chapter split images, section divider images, chapter title cards, or a source turned into chapter break visuals.

Goal: produce a `series-spec.md` whose prompts create a set of identical-layout title cards. These are not covers, posters, explainers, or symbolic images.

## Operating Rules

- Only make chapter divider title cards: solid color background plus chapter title text.
- Do not use `styles/*.md` or `references/layout.md` in this mode.
- Do not add focal objects, evidence cues, icons, illustrations, chapter summaries, subtitles, logos, decorative marks, gradients, textures, borders, frames, cards, panels, shadows, or per-image composition changes.
- Every image prompt must repeat the same `Fixed layout reference` block exactly, then change only `Exact chapter title`.
- Use platform presets only for canvas ratio and safe zone. If no platform is named, use `base` 16:9.
- If the user asks for a different background color, text color, alignment, font mood, or ratio, apply it once to the fixed reference and keep it identical for all prompts.
- If the user provides or selects a previous divider image as a layout reference, use [Reference-Locked Generation](#reference-locked-generation).
- If the user does not provide a reference image, use the bundled default reference at `assets/chapter-divider-reference.png`.

## Language Detection

Detect the output title language before writing chapter titles.

1. If the user explicitly requests a language, use that language.
2. Otherwise, use the dominant language of the source text or transcript.
3. If the source is mixed-language, use the language that carries the main narrative. Preserve source terms, product names, and proper nouns in their original form.
4. If the title already exists in the source as a chapter heading, keep its language unless the user asks for translation.
5. Do not default to Chinese, English, or any other fixed language.

Record this in `series-spec.md`:

```md
Output title language: <detected or requested language>
Language basis: explicit user request | dominant source language | existing source headings | mixed-source judgment
```

## Chapter Extraction

- Use real headings, timestamps, outline markers, transcript turns, or major topic shifts from the source.
- Keep each chapter title short enough for a title card. Prefer 2 lines or fewer.
- If a title would overflow, shorten or rephrase the title in the output language before prompt writing. Do not resize one image differently from the others.
- If the source has no clear headings, create concise titles in the detected output language.
- Do not create claims, evidence lines, or takeaways. The chapter title is the only visible content.
- If chapter count is not specified, choose the smallest set that covers the source's major sections without over-segmenting.

## Fixed Layout Reference

Paste this block into every chapter divider prompt, with only the bracketed language, canvas, safe zone, colors, typeface guidance, and exact title filled from the current job:

```md
Fixed layout reference: Chapter Divider Layout v1.
Canvas: [platform canvas ratio and recommended size].
Safe zone: [platform safe zone].
Background: single solid color #F2EDE4, no texture, no gradient, no image.
Visible content: chapter title text only.
Output title language: [detected or requested language].
Typeface: clean bold sans-serif appropriate for the detected language and script; use stable system/editorial sans-serif forms, not decorative display lettering.
Font weight: bold.
Text color: #1A1A1E.
Title size: large and consistent across every image; about 88px on a 1920x1080 canvas, scaled proportionally for other ratios.
Line height: 1.16.
Text block width: 72% of canvas.
Placement: text block centered horizontally and vertically.
Alignment: centered.
Max lines: 2.
Do not change font size, line height, text block width, placement, or alignment for individual titles; shorten the title instead.
No subtitle unless the user explicitly asks for one. No chapter number unless the user explicitly asks for numbering or the source heading already includes it.
No logo, icon, object, illustration, evidence cue, accent mark, frame, card, border, texture, gradient, shadow, or decoration.
The only variable between images is Exact chapter title.
```

## Reference-Locked Generation

Use this when the user provides a previous chapter divider image to stabilize the next images. If no image is provided, use the bundled default reference.

Goal: treat the provided image as the edit target and layout reference. Replace only the title text while preserving the visual template.

Record this in `series-spec.md`:

```md
Reference image: <absolute path or bundled assets/chapter-divider-reference.png>
Reference role: edit target / layout reference | bundled default layout reference
Preserve from reference: canvas, background, title center point, baseline, font size, font weight, line height, text color, and title block position.
Reference-lock limit: image generation can improve consistency but cannot guarantee pixel-identical text metrics; use deterministic text rendering if strict consistency is required.
```

For every generated image prompt, use this structure:

```md
Use the provided reference image as the exact chapter divider template.
Replace only the readable title text with: "[Exact chapter title]".
Preserve the reference image's canvas, background, title center point, baseline, glyph height, font weight, line height, text color, and title block position.
Do not scale shorter titles up to fill the original title width.
Do not shrink longer titles unless they would exceed the reference title block; if needed, wrap to two lines inside the same reference text block.
Do not move the title block.
Do not add chapter numbers, subtitles, icons, objects, decorations, borders, cards, shadows, outlines, gradients, logos, watermarks, or extra text.
```

Reference priority:

1. User-provided reference image.
2. Bundled `assets/chapter-divider-reference.png`.
3. Fixed layout parameters without image reference, only if the bundled asset is unavailable.

Use reference-locking only for generation/editing. The planning deliverable remains one `series-spec.md`; do not copy the reference image into the output spec folder unless the user explicitly asks.

## Deterministic Rendering

Use `scripts/render-chapter-dividers.py` when the user asks for actual raster chapter divider files or when image generation fails to preserve consistent text size and placement.

Requires Python with Pillow (`PIL`) available. If Pillow is missing, report that deterministic raster rendering needs Pillow instead of silently falling back to inconsistent image-generation text rendering.

This renderer uses the selected reference image to measure:

- canvas size
- original title bounding box
- title center point
- reference title height
- background color

Then it renders each title with one fixed font size and one fixed center point. Short titles do not scale up. Longer titles wrap to two lines inside the same text block; they shrink only when they cannot otherwise fit.

Default bundled-reference example:

```bash
python skills/published/qc-image-series/scripts/render-chapter-dividers.py \
  --out-dir qc-image-series-output/chapter-dividers \
  --title "短标题" \
  --title "A Longer Chapter Title"
```

Custom-reference example:

```bash
python skills/published/qc-image-series/scripts/render-chapter-dividers.py \
  --reference /absolute/path/to/reference.png \
  --out-dir qc-image-series-output/chapter-dividers \
  --title "短标题"
```

This deterministic path is the stable fallback for strict size and position consistency. Image generation with a reference image can still be used for visual exploration, but it must not be treated as a guarantee of pixel-identical text metrics.

## Prompt Assembly

Use this exact order for every chapter prompt:

```md
Platform: [platform], canvas [ratio], safe zone [margin].
[Paste the same Fixed layout reference block.]
Exact chapter title: "[title in output title language]".
Render the exact chapter title as the only readable text. Keep all layout, size, type style, color, placement, and background identical to the fixed layout reference.
```

## Output Shape

Write `series-spec.md` in this shape:

```md
# <Source Object Name> · Chapter Divider Spec
Platform: xiaohongshu | douyin-vertical | douyin-horizontal | bilibili | base
Canvas: ...
Mode: chapter-divider
Output title language: ...
Language basis: ...
Fixed layout reference: Chapter Divider Layout v1
Source: ...
Source normalization: existing transcript | sidecar subtitles | downloaded subtitles | embedded subtitles | ASR transcript | direct text

## Chapter Map
- ...

1. <chapter title>
   Exact chapter title: ...
   Prompt: ...
   Consistency notes: Only the exact chapter title changes from other prompts.

## Consistency Check
- ...
```

## QA Checklist

- `series-spec.md` records output title language and language basis.
- Every prompt repeats the same fixed layout reference.
- The only visible content is the chapter title.
- Only `Exact chapter title` changes between prompts.
- No prompt changes font size, line height, text block width, placement, or alignment for a single title.
- Reference-locked specs record the reference image path or bundled default asset, role, preserved invariants, and layout-lock limit.
- If actual raster chapter dividers are requested, deterministic rendering is used or the remaining image-generation drift is explicitly reported.
- No prompt includes objects, icons, evidence cues, decorations, subtitles, logos, frames, cards, shadows, gradients, or textures.
- Chapter titles are source-grounded, concise, and written in the detected or requested language.
