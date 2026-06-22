# Interaction Craft

Use this reference when shaping a concrete component or microinteraction. Each pattern exists only if it serves the purpose named earlier.

## Pattern Picker

Use this table before writing custom behavior:

| Need | Pattern | Default values |
| --- | --- | --- |
| Control acknowledges click/tap | Press feedback | `scale(0.97)`, 120-160ms |
| Anchored surface opens | Origin-aware popover | trigger origin, opacity + `scale(0.97)` |
| Text hint appears | Tooltip | delayed first hover, instant adjacent hover |
| Dynamic UI can be toggled quickly | CSS transition | no keyframes |
| Visual states crossfade awkwardly | Light blur bridge | `blur(2px)` max by default |
| User confirms destructive action | Hold-to-confirm | slow fill, fast release |
| User dismisses surface by gesture | Drag/swipe | threshold plus velocity |
| Boundary is reached during drag | Rubber-banding | damping/friction |

If no row matches, do not invent a complex pattern. Use no motion or a simple opacity transition.

## Press Feedback

Purpose: prove that the interface heard the user's input.

```css
.button {
  transition: transform 160ms var(--ease-out);
}

.button:active {
  transform: scale(0.97);
}
```

Use `scale(0.95)` to `scale(0.98)`. Smaller controls need subtler changes.

## Origin-Aware Popovers

Purpose: preserve spatial causality between trigger and surface.

Anchored UI should scale from the trigger. Modals are the exception because they belong to the viewport center.

```css
.popover {
  transform-origin: var(--radix-popover-content-transform-origin);
}
```

## Tooltips

Purpose: explain controls without slowing expert scanning.

- Use an initial delay to prevent accidental activation.
- Once one tooltip is open, adjacent tooltips should appear instantly.
- Skip animation during rapid tooltip-to-tooltip travel when supported.

## Transitions Versus Keyframes

Purpose: keep user-driven UI interruptible.

CSS transitions retarget mid-flight. Keyframes restart from their first frame. Use transitions or springs for rapidly toggled UI; use keyframes for predetermined motion.

## Blur As Bridge

Purpose: make a crossfade read as one changing object instead of two overlapping objects.

```css
.content.transitioning {
  filter: blur(2px);
  opacity: 0.7;
}
```

Keep blur light. Heavy blur is expensive and often hides unclear design.

## Clip-Path Patterns

Purpose: reveal, compare, or confirm without adding extra layout machinery.

```css
.overlay {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 200ms var(--ease-out);
}

.button:active .overlay {
  clip-path: inset(0 0 0 0);
  transition: clip-path 2s linear;
}
```

Use cases:

- Hold-to-confirm.
- Active tab color wipe.
- Image reveal.
- Before/after slider.
- Scroll reveal.

For hold-to-confirm, slow fill expresses deliberation; fast release expresses cancellation.

## Drag And Gesture

Purpose: make direct manipulation feel physical and forgiving.

- Use momentum; a quick flick can dismiss even if distance is short.
- Add damping beyond boundaries instead of hard stops.
- Capture pointer events once drag starts.
- Ignore extra touch points after a drag begins.
- Prefer friction to invisible walls.

Minimum implementation requirements:

- Track start position and elapsed time.
- Use both distance and velocity.
- Capture pointer events when possible.
- Release capture and clean listeners on end/cancel.
- Keep keyboard and reduced-motion alternatives.

```js
const elapsed = Date.now() - dragStartTime;
const velocity = Math.abs(distance) / elapsed;

if (Math.abs(distance) >= threshold || velocity > 0.11) {
  dismiss();
}
```

## Transform Details

- `translateY(100%)` moves an element by its own height.
- `scale()` scales children, which is useful for tactile feedback.
- `transform-origin` should match the perceived anchor.
- 3D transforms can add depth, but only when depth clarifies or supports the object's character.
