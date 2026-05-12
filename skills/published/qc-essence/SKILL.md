---
name: qc-essence
description: Performs model-guided essence extraction into a final judgment, memorable aha moment, core pillars, and minimal reasons for decision clarity. Use when the user wants to strip a topic, article, product, plan, or problem down to its decisive essence.
---

# QC Essence

Compress complex input to its irreducible essence. Think deeply; answer briefly.

## Workflow

1. Read the user's input directly; do not interview.
2. If there is no object to analyze, ask for the object in one short sentence.
3. Silently spread out the representative surface facts, claims, symptoms, and examples.
4. Strip filler, repeated claims, decorative wording, and points that only rename another point.
5. Find the smallest set of independent generators that can explain the whole.
6. Reverse-challenge the result, then output only the final judgment, aha moment, pillars, and minimal reasons.

## Internal Stack

Use silently; do not name these models in the answer:

- First principles: what must be true for this to work or matter?
- Causal generation: what few causes produce most surface facts?
- Constraint/tradeoff: what bottleneck, tension, or scarce resource shapes the outcome?
- System structure: parallel, layered, chained, loop, spectrum, matrix, or network?
- Counterfactual: what would break, invert, or weaken the conclusion?

## Internal Tests

- Necessity: removing this pillar leaves something important unexplained.
- Independence: this pillar is not a restatement of another pillar.
- Generativity: this pillar explains multiple surface facts, not just one detail.
- Compression: two pillars cannot merge without losing meaning.
- Back-generation: this pillar can explain back to the user's main facts or examples.

If a pillar fails, merge it, delete it, or replace it.

## Reverse Challenge

Before answering, attack your own result:

- What is the strongest opposite conclusion?
- Which pillar is a surface symptom, too broad, or actually redundant?
- Which missing pillar would collapse the conclusion?

Use the challenge to revise the answer. Do not output the challenge.

## Structure

Infer the pillar relationship: parallel, layered, chain, loop, spectrum, matrix, or network; add `结构：...` only when it reduces cognitive load.

## Output Rules

- Use the user's language; default to Chinese.
- Do not show reasoning, model names, reverse challenges, essays, prefaces, or transition prose.
- Include a final judgment, mandatory aha moment, core pillars, and brief reasons.
- Put the aha moment immediately after `结论`; format exactly `**_..._**`, with no label.
- Make it one reflective, philosophical sentence distilled from the conclusion and pillars; add no new claim, slogan, mystical metaphor, or empty flourish.
- Do not force a fixed number of pillars; use as few as truth allows.
- Each reason should explain why that pillar is irreducible, ideally in one sentence.
- If context is thin, still answer and add one line: `Assumption: ...`

## Shape

Use this shape unless another shorter shape is clearer:

```md
结论：...

**_..._**

结构：...

支柱：

- ...：...
- ...：...

Assumption: ...
```

Omit `Assumption` when unnecessary; omit `结构` unless it reduces cognitive load.

## Bad Examples

- Bad: ten key takeaways. Fix: keep compressing until only irreducible pillars remain.
- Bad: two pillars say the same thing in different words. Fix: merge them.
- Bad: surface facts are labeled as pillars. Fix: find the generator behind them.
- Bad: every answer becomes a three-layer drill or a 2x2. Fix: infer the real structure.
- Bad: no counterexample was considered. Fix: challenge the opposite conclusion before finalizing.
- Bad: the aha moment is a motivational slogan. Fix: distill the real insight into one grounded sentence.
- Bad: the explanation is longer than the conclusion. Fix: keep only the reason needed to trust it.

## Final Check

**Before replying, ask**: did I find generators, survive the strongest reverse challenge, and preserve the user's real information in the shortest form?
