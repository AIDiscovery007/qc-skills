# Motion Grammar

Use this reference after the purpose and causal map are clear. It provides the language of feel: exact interaction vocabulary, timing, easing, direction, sequence, and motion pattern.

## Vocabulary Selection Protocol

Precise vocabulary is prompt control. It tells the model what kind of interaction is intended before it invents visuals or code.

Choose 1-3 terms before choosing timing or implementation:

1. Pick the primary purpose from the causal map.
2. Select the narrowest term that names the interaction pattern.
3. Add one supporting term only if it clarifies sequence, physics, or polish.
4. Reject vague phrasing such as "smooth animation", "nice transition", "subtle effect", or "make it dynamic" unless it is translated into exact terms.

Use this shape:

```md
Vocabulary: shared element transition + ease-out + press feedback
Why these terms: preserve object identity, respond immediately, and keep the action tactile.
```

Do not pick vocabulary first. Purpose decides vocabulary; vocabulary then constrains values and code.

## Fallback Vocabulary

If unsure, use these safe defaults:

| Situation | Vocabulary |
| --- | --- |
| Clickable control | press feedback |
| Anchored floating surface | origin-aware animation + scale in |
| New content appears in place | fade |
| Content expands vertically | accordion |
| Item moves between layouts | shared element transition |
| User drags element away | drag + swipe to dismiss |
| Loading placeholder | skeleton or shimmer |
| No clear state relationship | none; choose `No motion` |

## Vocabulary Lexicon

| Purpose | Prefer these terms | Use when |
| --- | --- | --- |
| Immediate feedback | press feedback, tap feedback, ripple, shake, wiggle | The UI must acknowledge input, success, or rejection |
| State continuity | crossfade, morph, shared element transition, layout animation, accordion, direction-aware transition | The user must understand how one state became another |
| Entrance or exit | fade, slide, scale in, pop in, reveal, enter, exit | A thing appears, disappears, mounts, or unmounts |
| Spatial anchoring | transform origin, origin-aware animation, perspective, 3D tilt, flip | The surface should feel attached to a trigger or spatial source |
| Sequence | stagger, orchestration, delay, duration, keyframes, interpolation, stepped animation | Multiple elements or beats need deliberate timing |
| Gesture | drag, drag to reorder, swipe to dismiss, rubber-banding, momentum, velocity, interruptible animation | The user directly manipulates an element |
| Scroll or route | scroll reveal, scroll-driven animation, parallax, page transition, view transition | Motion is tied to scroll or navigation |
| Ambient or expressive | marquee, loop, alternate, orbit, pulse, float, idle animation | Motion runs on its own and must not block work |
| Polish or effect | blur, clip-path, mask, line drawing, text morph, skeleton, shimmer, number ticker, typewriter | A specialized visual treatment carries meaning or improves perceived quality |
| Performance | compositing, will-change, layout thrashing, frame rate, dropped frame, jank | The design depends on smoothness or must be debugged |

The selected terms should appear in the final answer or implementation notes so the design intent remains inspectable.

## Easing

Use stronger custom curves for UI. Built-in curves often feel weak.

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```

| Situation | Easing |
| --- | --- |
| User-triggered entrance or open state | `var(--ease-out)` |
| Object already visible and moving or morphing | `var(--ease-in-out)` |
| Tiny hover or color state | short `ease` or a custom ease |
| Drawer or sheet gesture | `var(--ease-drawer)` or spring |
| Spinner, marquee, ambient constant motion | `linear` |

Avoid `ease-in` for ordinary UI responses because the slow start can feel like latency.

## Duration

| Interaction | Typical duration |
| --- | --- |
| Press feedback | 100-160ms |
| Tooltip or tiny popover | 125-200ms |
| Dropdown, menu, select | 150-250ms |
| Toast, modal, drawer | 200-500ms |
| Marketing explanation or story | Longer only when it teaches |
| Deliberate confirmation | Slow while confirming, fast when canceled |

Most product UI should stay under 300ms. Longer motion needs a purpose the user can feel.

## Vocabulary To Values

After choosing terms, map them to values:

| Vocabulary | Typical value direction |
| --- | --- |
| press feedback | 100-160ms, `scale(0.95)` to `scale(0.98)`, ease-out |
| origin-aware animation | transform origin from trigger, short scale plus opacity |
| shared element transition | preserve object identity, avoid unrelated fade-only swaps |
| layout animation | keep distance modest, use ease-in-out or spring |
| swipe to dismiss | use drag distance plus velocity, keep exit direction consistent |
| rubber-banding | add damping/friction beyond boundary |
| stagger | 30-80ms between items, never block interaction |
| reveal or clip-path | use direction that explains what is being uncovered |
| shimmer or skeleton | communicate loading, avoid pretending content is ready |
| number ticker | use tabular numbers to prevent layout shift |

If a selected vocabulary term is not in the table, map it to the closest row and state that assumption.

## Springs

Use springs when the interaction has momentum, interruption, or direct manipulation:

- Drag interactions.
- Swipe-to-dismiss.
- Gesture boundaries.
- Elements that must reverse smoothly mid-flight.
- Decorative mouse tracking, if it does not impair function.

Keep bounce subtle in normal product UI. Use more bounce only when the component's personality is playful.

## Sequence

Stagger can make groups feel organic, but it is decorative. Keep delays short, usually 30-80ms, and never block interaction while items enter.

Use direction consistently. If something can be swiped away, its entrance and exit should support that same spatial model.

## Entrances And Exits

Avoid `scale(0)`. Start near the final state and combine with opacity:

```css
.entering {
  opacity: 0;
  transform: scale(0.95);
}
```

Exit can often be faster than enter. The user has already understood the object; now the interface should get out of the way.
