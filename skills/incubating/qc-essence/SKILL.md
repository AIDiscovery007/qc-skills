---
name: qc-essence
description: Extracts the irreducible essence of complex input into a final judgment, core pillars, and minimal reasons. Use when the user wants to strip a topic, plan, article, product, or problem down to its decisive essence.
---

# QC Essence

Compress complex input to its irreducible essence.

## Workflow

1. Read the user's input directly; do not interview.
2. If there is no object to analyze, ask for the object in one short sentence.
3. Strip filler, examples, repeated claims, and surface wording.
4. Find the smallest set of independent pillars that can explain the whole.
5. Output only the final judgment, the pillars, and minimal reasons.

## Internal Tests

Run these silently before answering:

- Necessity: removing this pillar leaves something important unexplained.
- Independence: this pillar is not a restatement of another pillar.
- Generativity: this pillar explains multiple surface facts, not just one detail.
- Compression: two pillars cannot merge without losing meaning.

If a pillar fails, merge it, delete it, or replace it.

## Output Rules

- Use the user's language; default to Chinese.
- Do not show the reasoning process.
- Do not write an essay, preface, summary-of-summary, or transition prose.
- Include a final judgment, core pillars, and brief reasons.
- Do not force a fixed number of pillars; use as few as truth allows.
- Each reason should explain why that pillar is irreducible, ideally in one sentence.
- If context is thin, still answer and add one line: `Assumption: ...`

## Shape

Use this shape unless another shorter shape is clearer:

```md
结论：...

支柱：

- ...：...
- ...：...

Assumption: ...
```

Omit `Assumption` when unnecessary.

## Bad Examples

- Bad: ten key takeaways. Fix: keep compressing until only irreducible pillars remain.
- Bad: two pillars say the same thing in different words. Fix: merge them.
- Bad: the explanation is longer than the conclusion. Fix: keep only the reason needed to trust it.

## Final Check

**Before replying, ask**: is this the shortest answer that preserves the user's real information?
