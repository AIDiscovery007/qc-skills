# Validation And Critique

Use this reference before finalizing a design proposal, implementation, or review.

## Critique Stance

Critique the purpose first, then the motion, then the code. Do not argue from preference alone. Tie each critique to clarity, causality, speed, trust, accessibility, or implementation stability.

## Required Review Table

When reviewing UI code or behavior, lead with:

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 180ms var(--ease-out)` | The animated property and curve should match the intended state change |

Rows should be concrete. Name the component, property, value, timing, or event behavior.

## Pre-Implementation Check

- User job is explicit.
- Purpose is named in one sentence.
- Motion/no-motion decision follows frequency and interruption cost.
- State map identifies action, before, after, and persistent anchor.
- 1-3 exact interaction vocabulary terms are selected before timing and implementation.
- Component personality matches the product context.
- Implementation mechanism is the smallest reliable one.
- Reduced motion behavior is planned.

If any item fails, do not continue to implementation. Fill the missing field or choose `No motion`.

## Code Review Checks

| Issue | Better direction |
| --- | --- |
| `transition: all` | Specify exact animated properties |
| Entry starts at `scale(0)` | Start near final size with opacity |
| UI response uses `ease-in` | Use ease-out or custom curve |
| Anchored popover scales from center | Set origin from trigger |
| Keyboard action visibly animates | Remove or make effectively instant |
| Routine UI motion exceeds 300ms | Shorten unless spatial distance justifies it |
| Hover animation runs on touch | Gate with hover/pointer media query |
| Rapidly toggled UI uses keyframes | Use transition or spring |
| Drag hits hard stop | Add damping or friction |
| Motion blocks input | Make it interruptible or remove it |
| Reduced motion missing | Add reduced-motion path |
| Layout properties animate every frame | Use transform/opacity or simplify |
| Design says "smooth animation" without naming pattern | Replace with exact vocabulary such as shared element transition, press feedback, reveal, or origin-aware animation |

## Feel QA

- Play animation at 2x to 5x slower speed.
- Check transform origin, direction, opacity, and color timing.
- Rapidly toggle the state and verify it retargets cleanly.
- Test keyboard flow with no perceived delay.
- Test touch gestures on a real device when possible.
- Test reduced motion.
- Check under CPU or network load when performance matters.

## Fixed Final Check

Before final response or handoff, answer:

```md
Purpose named: yes/no
Causal map complete: yes/no
Exact vocabulary selected: yes/no
No forbidden moves: yes/no
Reduced motion path: yes/no
Implementation smallest reasonable option: yes/no
Validation method named: yes/no
```

If any answer is `no`, revise before finalizing.

## Pass Criteria

The design passes when:

- The user can understand what changed without thinking.
- The interface response feels causally linked to the user's action.
- Motion never blocks the next intended action.
- The product feels faster, clearer, or more trustworthy.
- Edge cases are handled invisibly.
- The implementation is smaller than the experience it creates.
