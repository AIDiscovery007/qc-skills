# Platform Presets

Use platform presets for canvas, safe zones, and text scale only. Do not put layout patterns, palette, geometry, or illustration style here.

## Routing

- `xiaohongshu`: aliases `小红书`, `XHS`, `RED`; ratio `3:4`.
- `douyin-vertical`: aliases `抖音竖版`, `抖音竖版封面`; ratio `3:4`.
- `douyin-horizontal`: aliases `抖音横版`, `抖音横版封面`; ratio `4:3`.
- `bilibili`: aliases `bilibili`, `B站`, `哔哩哔哩`; ratio `16:9`.
- `base`: default when no platform is named; ratio `16:9`.

If the user says only `抖音` or `douyin`, default to `douyin-vertical` unless the source or user intent clearly calls for a horizontal cover.

If the user asks for multiple platforms, keep one `series-spec.md`. For each image unit, write one prompt variant per platform and keep the same style tokens and core message.

## xiaohongshu

- Canvas: `3:4` vertical feed card.
- Use for: note covers, carousel covers, visual essays.
- Text: one strong headline, one short evidence line. Add metric/date/name only when source-backed.
- Safe zone: keep important text and focal marks inside an 8% margin.
- Bias toward immediate readability in a feed; do not overfill the vertical canvas.

## douyin-vertical

- Canvas: `3:4` vertical cover.
- Use for: default Douyin cover images and vertical social cards.
- Text: larger than xiaohongshu; one hook line should survive phone-size scanning.
- Safe zone: keep important text and focal marks inside a 10% margin.
- Do not simulate phone UI, playback controls, comment overlays, or app chrome.

## douyin-horizontal

- Canvas: `4:3` horizontal cover.
- Use for: Douyin horizontal covers or when the user explicitly asks for 横版封面.
- Text: one hook line plus one evidence line; keep both readable at feed thumbnail size.
- Safe zone: keep important text and focal marks inside an 8% margin.
- Do not simulate phone UI, playback controls, comment overlays, or app chrome.

## bilibili

- Canvas: `16:9` landscape video cover.
- Use for: video thumbnails, episode covers, horizontal explainers.
- Text: one thumbnail-readable title line or two short lines. Add metric/name/date only when source-backed.
- Safe zone: keep important text and focal marks inside a 6% margin.
- Make the core claim readable at thumbnail size without turning the image into a poster full of text.
