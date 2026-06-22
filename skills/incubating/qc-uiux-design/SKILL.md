---
name: qc-uiux-design
description: Practices purpose-led UI/UX design engineering for polished product interfaces, including interaction intent, motion causality, component feel, frontend craft, and critique. Use when designing, building, or reviewing UI/UX, microinteractions, animation, transitions, gestures, motion polish, frontend component feel, or product interface quality. Do not use for backend-only work, static copywriting, brand identity, illustration prompts, or visual style feedback unless product interaction behavior is central.
---

# QC UI/UX Design

Use this skill to make interfaces feel clear, fast, responsive, and intentional. Interaction design is work, art, and philosophy, but the operating mode is strict: every design move must have a named purpose, a causal map, exact vocabulary, safe defaults, and a validation pass.

## Essence

Final judgment: UI/UX craft is purposeful causality made perceptible through product behavior.

**_A beautiful interface is not the one that moves more; it is the one whose every response makes the user's intention feel understood._**

Core pillars:

- Purpose before effect: no animation, visual flourish, layout, or component behavior is valid until it answers what user understanding or workflow it improves.
- Causality before decoration: motion is strongest when it connects user action to interface result, preserving orientation and mental model.
- Perception before metrics: speed, weight, smoothness, and timing are how users experience quality; implementation must serve that perception without lying.
- Craft before configuration: excellent defaults, edge-case handling, and code-level restraint create trust more reliably than many options.

## Trigger Boundaries

Use this skill when the task is about product interface behavior:

- Designing or reviewing UI/UX flows, components, microinteractions, motion, gestures, transitions, hover/press/tap feedback, loading states, empty states, drawers, popovers, menus, toasts, tooltips, onboarding interactions, or frontend polish.
- Implementing frontend interaction details where timing, easing, state continuity, reduced motion, or component feel matters.
- Debugging janky, slow, confusing, blocking, or inaccessible UI motion.
- Examples: sluggish dropdown, stiff swipe-to-dismiss, annoying command palette animation, unpolished toast, modal that pops in from nowhere.

Do not use this skill when interaction behavior is not central:

- Backend-only, data-only, infrastructure, API, database, or CLI work.
- Static copywriting, naming, marketing positioning, or article editing.
- Brand identity, logo exploration, poster design, illustration prompts, or image style direction with no product UI behavior.
- General code refactoring, testing, or architecture review that does not affect interface behavior.
- Non-examples: refactor an API route, optimize SQL, write headline copy, create a logo, generate a poster prompt, add tests for a utility function.

If the boundary is unclear, use this rule: apply the skill only when visible product interaction behavior is central to the user's request.

## Purpose-Led SOP

First read [references/00-operating-protocol.md](references/00-operating-protocol.md). Then follow this spine in order. Do not propose UI, motion, or code until the required brief is complete.

0. Classify the task.
   Choose exactly one: `design`, `implement`, `review`, or `debug`. Use [references/00-operating-protocol.md](references/00-operating-protocol.md) for the required output contract.
1. Frame the design act.
   State the user job, product context, interaction frequency, input mode, and interruption cost. If information is missing, use the conservative defaults from [references/00-operating-protocol.md](references/00-operating-protocol.md). If the task is broad or taste-driven, use [references/01-purpose-and-philosophy.md](references/01-purpose-and-philosophy.md).
2. Name the purpose.
   Write one sentence: `This design change exists to ...`. Pick one primary purpose from the allowed list. If no valid purpose exists, choose `No motion` and explain why.
3. Map causality.
   Identify user action, before state, after state, unchanged anchor, and what would feel confusing if the transition were instant. Use [references/02-causality-and-motion.md](references/02-causality-and-motion.md) for the motion/no-motion decision.
4. Choose the grammar of feel.
   Select 1-3 precise interaction vocabulary terms from [references/03-motion-grammar.md](references/03-motion-grammar.md) before choosing values. If no term fits, use `No motion`. Then pick timing, easing, rhythm, direction, and intensity from the tables.
5. Shape the interaction.
   Apply concrete patterns only after the purpose is clear: press feedback, popover origin, tooltip behavior, drag physics, clip-path, hover, or gesture handling. Use [references/04-interaction-craft.md](references/04-interaction-craft.md).
6. Materialize it in code.
   Choose the smallest reliable implementation mechanism from the allowed list: CSS transition, CSS animation, WAAPI, SVG, spring library already present in the project, or no motion. Use [references/05-engineering-craft.md](references/05-engineering-craft.md).
7. Critique the result.
   Review whether the design became clearer, faster, and more trustworthy. Use [references/06-validation-and-critique.md](references/06-validation-and-critique.md) before finalizing.

## Review Format

When reviewing UI code or UI behavior, lead with a markdown table:

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 180ms var(--ease-out)` | The property and timing should express the intended state change |

Then add only the short notes needed to explain risk, tradeoff, or verification.

## Motion Brief Shape

When proposing an interaction or animation, fill this brief before implementation details. Do not leave fields blank.

```md
Task type: design | implement | review | debug
Purpose: ...
Vocabulary: [1-3 exact terms, e.g. origin-aware animation, press feedback, shared element transition]
Causal map: [action -> before -> after -> persistent anchor]
Feel: [duration, easing, direction, intensity]
Implementation: [CSS transition | CSS animation | WAAPI | SVG | spring | no motion]
Reduced motion: ...
Validation: ...
```

## Output Rules

- Use the user's language by default.
- Be specific: name the component, exact interaction vocabulary, state transition, timing, easing, and verification method.
- Prefer fewer, sharper changes over broad redesign.
- Do not add motion to repeated keyboard actions, dense workflows, or high-frequency controls unless it is effectively instant.
- Do not recommend visual polish that blocks input, hijacks scroll, hides state, or fights accessibility preferences.
- If a design detail has no purpose, remove it or say why it should not be built.
- If unsure, choose the quieter option: no motion, shorter duration, CSS over JavaScript, transform/opacity over layout properties.
