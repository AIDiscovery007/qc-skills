# Operating Protocol

Use this file first every time. It makes the skill stable even when the model has weak design judgment.

## Hard Rule

Do not rely on taste alone. Every output must pass these gates in order:

0. Task type selected.
1. User job and context named.
2. One primary purpose selected.
3. Causal map completed.
4. Motion decision selected.
5. Exact vocabulary selected.
6. Values and implementation selected from tables.
7. Validation checked.

If a gate cannot be completed, use the conservative fallback in that gate. Do not invent unsupported details.

## Gate 0: Task Type

Choose exactly one:

| Task type | Use when | Output |
| --- | --- | --- |
| `design` | User asks what interaction, UI, or motion should be | Motion brief plus recommendation |
| `implement` | User asks to edit or write frontend code | Motion brief, then code changes |
| `review` | User asks for critique, audit, or review | Before/After/Why table first |
| `debug` | User reports broken, janky, slow, or wrong UI behavior | Reproduction hypothesis, likely cause, fix, validation |

If two seem possible, choose `review` for existing UI/code and `design` for new UI.

If the task may not belong to this skill, ask one question: is visible product interaction behavior central? If no, do not use this skill's full SOP; answer with the more appropriate non-UI approach.

Quick boundary examples:

- Use: sluggish dropdown, unpolished toast, mobile drawer animation, stiff swipe-to-dismiss, confusing modal entrance.
- Do not use: API refactor, SQL optimization, static headline copy, logo design, poster prompt, generic unit tests.

## Gate 1: Conservative Defaults

When the user does not specify context, use these defaults:

| Missing info | Default |
| --- | --- |
| Product type | professional product UI |
| Frequency | occasional |
| Input mode | pointer and keyboard |
| User skill | mixed novice and expert |
| Motion intensity | subtle |
| Duration | 180ms for small UI, 220ms for menus, 260ms for dialogs |
| Easing | `var(--ease-out)` |
| Implementation | CSS transition |
| Reduced motion | opacity/color only, no position movement |

Override defaults only when the user or code clearly demands it.

## Gate 2: Purpose Picker

Pick exactly one primary purpose:

| Purpose | Use when |
| --- | --- |
| `orientation` | User must know where they are or where an element came from |
| `feedback` | UI must acknowledge input immediately |
| `state continuity` | A before/after state must feel connected |
| `explanation` | Motion teaches a process or relationship |
| `attention` | User must notice a meaningful update |
| `perceived speed` | Waiting or loading should feel responsive |
| `trust` | Detail signals consistency, precision, or care |
| `deliberate play` | Rare moment can carry warmth without slowing work |

If none fit, output `No motion` and continue with static UI or simpler feedback.

## Gate 3: Causal Map

Fill every field:

```md
User action: ...
Before state: ...
After state: ...
Persistent anchor: ...
Confusion if instant: ...
Frequency: repeated | daily | occasional | rare
Input mode: keyboard | pointer | touch | mixed
```

Fallbacks:

- If there is no user action, use `ambient/non-interactive`.
- If there is no persistent anchor, use `screen position` or `selected item`.
- If confusion if instant is `none`, choose `No motion`.

## Gate 4: Motion Decision

| Condition | Decision |
| --- | --- |
| Keyboard or command surface used repeatedly | `No motion` |
| Dense workflow or rapid data entry | `No motion` or `near-instant feedback` |
| Button, toggle, checkbox, icon button | `Functional motion` with `press feedback` |
| Popover, menu, select, tooltip | `Functional motion` with origin or fade/scale |
| Modal, drawer, toast | `Functional motion` with spatial direction |
| Onboarding, empty state, success, rare celebration | `Expressive polish` if it does not block work |

No motion is a valid high-quality design decision.

## Gate 5: Required Brief

Before implementation or recommendation, produce this exact brief:

```md
Task type: ...
Purpose: ...
Vocabulary: ...
Causal map: ...
Feel: ...
Implementation: ...
Reduced motion: ...
Validation: ...
```

For very small code reviews, the brief may be one line, but the fields must still be present.

## Gate 6: Forbidden Moves

Do not output these unless explicitly explaining a problem:

- "make it smooth" without exact vocabulary.
- "add animation" without purpose.
- `transition: all`.
- Entry from `scale(0)`.
- Visible animation for repeated keyboard actions.
- Motion that blocks taps, clicks, typing, or rapid selection.
- Hover effects on touch without media query.
- Layout-property animation when transform/opacity can solve it.
- New animation dependency unless the project already uses it or the user asks.
