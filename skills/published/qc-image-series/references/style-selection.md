# Style Selection

Use this before message units and prompt writing.

Goal: choose a style with the user, without hardcoding style names in `SKILL.md`.

## Style File Contract

Every style lives in `styles/<style-id>.md` and starts with a `## Style Card` section:

```md
## Style Card

- Style id: ...
- Aliases: ...
- Text policy: in-image-text | textless
- Use when: ...
- Do not use when: ...
```

## Selection SOP

1. List every file under `styles/*.md`.
2. Read only each file's `Style Card`.
3. If the user named a style id or alias, use that style and read the full style file.
4. If the user did not name a style, show all available style ids, aliases, text policy, and `Use when` lines. Ask the user to choose one style before building `series-spec.md`.
5. If the user asks to add a new style, create a new `styles/<style-id>.md` file with a `Style Card`. Do not edit `SKILL.md` just to register the style.

## Text Policy

- `in-image-text`: every prompt includes exact visible words generated inside the image.
- `textless`: every prompt says `Visible text: none` and explicitly forbids readable words, labels, captions, letters, numbers, UI text, or later text overlay.
