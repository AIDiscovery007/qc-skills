# Layout System

Use this after the message map and platform preset, before style. Layout decides persuasion structure, reading path, and element placement. Platform decides ratio and safe zones. Style decides visual language.

Goal: make the source-backed claim readable in two seconds without turning the image into a dense poster.

## Operating Rules

- Pick one layout pattern per image. Do not mix patterns unless the user explicitly asks for a complex poster.
- Layout is the marketing argument: hook first, proof second, meaning third.
- Keep text and visual proof on the same glance path. A reader should not hunt for the connection.
- Use negative space as structure. Do not add frames, cards, panels, boxes, badges, or UI containers.
- Every prompt must state: layout pattern, reading path, headline position, focal object position, evidence cue position, and accent position.
- This is the only layer that decides where headline, focal object, evidence cue, and accent mark sit on the canvas.
- For `textless` styles, replace `headline` with `primary idea mark` and replace `proof line` with `evidence mark`.
- If the visual looks elegant but the claim is not obvious, simplify the layout before changing style.

## Decision SOP

Apply these rules from top to bottom. Stop at the first match.

1. If the image is a cover or opening hook, use `hero-claim`.
2. If one number, percentage, date, or name is the strongest proof, use `metric-impact`.
3. If the message depends on before/after, old/new, human/AI, or yes/no contrast, use `contrast-gap`.
4. If the message explains why something happens, use `mechanism-flow`.
5. If the message is a change over time, use `timeline-turn`.
6. If the message comes from a person, company, paper, or interview source, use `authority-viewpoint`.
7. If the message is a tradeoff, risk, or unresolved tension, use `tension-map`.
8. If the image is a closing summary or final lesson, use `takeaway-lock`.

## Patterns

### hero-claim

Use for covers and first images.

- Reading path: headline -> focal object -> proof line.
- Vertical canvas: headline upper third, focal object middle, proof line lower third.
- Landscape canvas: headline left third, focal object right-middle, proof line below headline.
- The symbolic object must explain the claim, not decorate it.

### metric-impact

Use when the fact itself is the hook.

- Reading path: metric -> claim -> mechanism cue.
- Make the number, date, or name the largest visible element.
- Place the claim close to the metric. Place the mechanism cue as a simple cause/effect mark nearby.
- Do not bury the metric in a paragraph or label cluster.

### contrast-gap

Use when meaning comes from difference.

- Reading path: side A -> gap/cut -> side B -> takeaway.
- Separate the two ideas with negative space, a cut line, or a shifted axis, not a split-screen frame.
- Keep both sides visually comparable so the difference is instantly legible.
- Use short labels only when the contrast would otherwise be ambiguous.

### mechanism-flow

Use when the reader needs to understand causality.

- Reading path: input -> transformation -> output.
- Use three or fewer nodes. More nodes become a diagram, not a cover image.
- Put the key claim near the transformation point, because that is where the insight lives.
- Make the output state visibly different from the input state.

### timeline-turn

Use when timing changes the meaning.

- Reading path: past/current state -> turning point -> consequence.
- Use one visible turn node, not a full history chart.
- Dates or time ranges should be short and source-backed.
- The turn point should carry the accent mark.

### authority-viewpoint

Use for interviews, named experts, companies, papers, or official claims.

- Reading path: name/source -> claim -> evidence cue.
- The source name should be visible but not louder than the claim unless the name is the hook.
- Use quotation energy without drawing a quote card: large claim text, small source line, one grounded visual object.
- Do not invent portrait likenesses unless the source provides or requests them.

### tension-map

Use when the idea is a strategic tradeoff.

- Reading path: force A -> pressure point -> force B -> consequence.
- Put the tension at the center. Let opposing marks push toward it from different directions.
- Use one short consequence line to explain why the tension matters.
- Avoid generic warning imagery; name the actual risk, cost, or constraint.

### takeaway-lock

Use for closing images.

- Reading path: final claim -> proof crumb -> accent lock.
- Use the quietest layout in the set.
- Keep one sentence-level takeaway and one small evidence cue.
- The accent mark should feel like a period, underline, or lock point.

## Prompt Insert

Add this block to every image prompt:

```md
Layout: [pattern name]. Reading path: [first -> second -> third].
Place headline [position], focal object [position], evidence cue [position], accent [position].
For textless styles: Place primary idea mark [position], focal object [position], evidence mark [position], accent [position].
```
