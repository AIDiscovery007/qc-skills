# Engineering Craft

Use this reference when converting a design decision into frontend implementation.

## Code Is Part Of The Design

Implementation choices affect trust. A code-driven visual can be lightweight, responsive, localizable, and interactive. A static asset can be heavier but simpler. Choose the material that best serves the user's understanding.

Good uses of code as design material:

- Inline SVG placeholders for instant progressive image loading.
- WAAPI for programmatic animation that still uses browser animation machinery.
- SVG path animation when CSS border animation lacks smoothness.
- Generated visual systems when manual variation is too rigid.
- WebGL or 3D transforms only when depth is part of the idea.

## Pick The Smallest Mechanism

| Need | Mechanism |
| --- | --- |
| Simple state change | CSS transition |
| Predetermined non-interactive motion | CSS keyframes |
| Programmatic animation with browser performance | WAAPI |
| Gesture, momentum, interruption | Spring or gesture library |
| Precise path/stroke/reveal | SVG |
| High-frequency workflow | No motion or near-instant feedback |

If the project already has an animation library, follow its existing pattern. If not, do not add one for a single interaction.

## Default Implementation Recipes

| Case | Recipe |
| --- | --- |
| Button press | CSS transition on `transform`; `:active { transform: scale(0.97); }` |
| Menu/popover | CSS transition on `opacity, transform`; trigger-based `transform-origin` when available |
| Modal | CSS transition on `opacity, transform`; centered origin |
| Drawer | transform translate, CSS transition or existing spring/gesture library |
| Tooltip | opacity + small scale; delay logic from component library |
| List item entrance | opacity + translateY, optional 30-50ms stagger |
| Reduced motion | remove translate/scale; keep opacity or color |

## Animate Cheap Properties

Default to `transform` and `opacity`. Avoid animating properties that force layout or paint:

- `width`
- `height`
- `top`
- `left`
- `margin`
- `padding`
- heavy `box-shadow`
- heavy `filter`

Stable 30fps often feels better than unstable 60fps.

If forced to animate layout, keep the affected subtree small and verify performance. Do not animate layout properties in large lists, dashboards, or data grids.

## WAAPI Example

```js
element.animate(
  [
    { clipPath: "inset(0 0 100% 0)" },
    { clipPath: "inset(0 0 0 0)" }
  ],
  {
    duration: 1000,
    fill: "forwards",
    easing: "cubic-bezier(0.77, 0, 0.175, 1)"
  }
);
```

## Main-Thread Awareness

Animation libraries can be excellent, but shorthand properties may run on the main thread depending on the library. If animation drops frames during loading or heavy work, test direct CSS or a full `transform` string before adding complexity.

Avoid changing inherited CSS variables on a container during high-frequency drag if it causes recalculation across many children. Update the animated element directly when needed.

Use `will-change` only for real performance problems. It can create layers and consume memory.

## Reduced Motion

Reduced motion means fewer and gentler movements, not zero feedback. Keep opacity or color changes when they aid comprehension. Remove large position shifts, parallax, zooming, or long ambient loops.

```css
@media (prefers-reduced-motion: reduce) {
  .panel {
    transform: none;
    transition: opacity 160ms ease;
  }
}
```

## Touch And Hover

Do not apply hover-only motion on touch devices.

```css
@media (hover: hover) and (pointer: fine) {
  .item:hover {
    transform: scale(1.03);
  }
}
```

## Implementation Stop Rules

Stop and choose a simpler implementation when:

- The effect needs a new dependency for one component.
- The code needs timers and listeners that are not cleaned up.
- The animation can hide the real state.
- Reduced motion cannot be expressed simply.
- The interaction is used in rapid keyboard or data-entry flow.
