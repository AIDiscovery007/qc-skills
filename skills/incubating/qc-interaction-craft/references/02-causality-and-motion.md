# Causality And Motion

Use this reference when deciding whether a transition, animation, gesture, or playful detail should exist.

## Motion Decision Gate

Answer in order:

1. What did the user do?
2. What changed because of that action?
3. What must remain mentally continuous?
4. What would be confusing, jarring, or less trustworthy if it changed instantly?
5. How often will the user see this?

If the answers are weak, remove the motion.

## Safe Default Rule

When uncertain, choose the least disruptive option:

1. No motion.
2. Near-instant feedback under 160ms.
3. Functional motion under 250ms.
4. Expressive motion only for rare moments.

Do not choose expressive polish for repeated work.

## Frequency Rules

| Frequency | Default |
| --- | --- |
| Hundreds of times per day, especially keyboard actions | No visible animation |
| Tens of times per day, such as hover, toolbar, list navigation | Nearly instant or extremely subtle |
| Occasional, such as modal, drawer, select, toast | Functional motion |
| Rare, first-time, onboarding, success, storytelling | Expressive motion can be useful |

Animation must never block input. If the user acts faster than the animation, the UI should keep up.

## Valid Motion Jobs

- Connect states: show how A became B.
- Preserve orientation: prevent the user from losing their place.
- Give feedback: acknowledge press, save, drag, swipe, selection, or rejection.
- Explain a relationship: make a flow, product mechanism, or process legible.
- Guide attention: direct focus to a meaningful update.
- Improve perceived performance: make wait states feel responsive.
- Add deliberate play: humanize rare moments without compromising the task.

## Negative Signals

Remove or reduce motion when:

- The purpose is only "looks cool".
- It delays a repeated workflow.
- It hijacks scroll.
- It blocks taps, clicks, keyboard input, or rapid entry.
- It hides the actual state.
- It conflicts with reduced-motion preferences.
- The component is in a dense operational surface.

## State Map Template

Use this before proposing values:

```md
User action:
Before state:
After state:
Persistent anchor:
Motion purpose:
Frequency:
Input mode:
No-motion alternative:
Risk if overdone:
```

## Output Decision

End the decision with one of:

- `No motion`: explain why clarity or speed is better without it.
- `Functional motion`: name the state relationship it clarifies.
- `Expressive polish`: name why this rare moment can carry more personality.

## Common Decisions

| Component or situation | Decision | Vocabulary |
| --- | --- | --- |
| Button press | Functional motion | press feedback |
| Checkbox, toggle, segmented control | Functional motion | state continuity, press feedback |
| Popover or menu from trigger | Functional motion | origin-aware animation, scale in |
| Tooltip | Functional motion | fade, delay |
| Modal | Functional motion | fade, scale in |
| Drawer or sheet | Functional motion | slide, swipe to dismiss |
| Toast | Functional motion | slide, swipe to dismiss |
| Route change with related object | Functional motion | shared element transition |
| Keyboard command palette | No motion | none |
| Data grid rapid editing | No motion | none |
| Marketing product explanation | Expressive polish | orchestration, reveal, line drawing |
