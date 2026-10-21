# Launching a developer agent

Checked against vendor docs in October 2026. Agent interfaces change quickly, so confirm anything marked "verify" with the agent's `--help` or docs before relying on it.

## Which mode to use

1. User works in the agent's desktop app (for example the macOS app): use the **app launch / deep link**, so the session shows up in the app. Headless runs are invisible there.
2. No app, the user asks for it, or the run is unattended: use a **headless command**.
3. Unsure: ask once.

URL-encode the prompt in every link (spaces `%20`, line breaks `%0A`).

## App launch / deep links (session visible in the app; user presses Enter)

| Agent | Link | Notes |
|---|---|---|
| Codex app | `codex://new?prompt=<prompt>&path=<abs path>` | Opens the session in the Codex app. Also `codex://threads/new?...` and `originUrl=<git remote>`. Needs at least one of `prompt`, `path`, `originUrl`. Effort: no public docs list a link parameter, so state high effort in the prompt and have the user confirm the app's effort setting is High. If the user has a working method, use that. |
| Claude Code | `claude-cli://open?cwd=<abs path>&q=<prompt>` | Opens a terminal session on the user's machine. `repo=<owner/name>` works instead of `cwd` for a known clone. `q` max 5,000 chars. Handler registers after the first prompt sent in an interactive session. No effort parameter documented. For a VS Code tab use `vscode://anthropic.claude-code/open`. |
| Cursor | `cursor://anysphere.cursor-deeplink/prompt?text=<prompt>` | Opens in the current workspace, no path parameter. Web form: `https://cursor.com/link/prompt?text=...`. Full URL max 10,000 chars. |

Open a link from the shell with `open` (macOS), `xdg-open` (Linux), or `start "" "<url>"` (Windows).

## Headless commands (no manual step, effort settable, not shown in the app)

| Agent | Command | Notes |
|---|---|---|
| Codex CLI | `codex exec -c model_reasoning_effort="high" "<prompt>"` | Run from the repo root. Verify flags with `codex exec --help`. |
| Claude Code | `claude -p "<prompt>"` | Run from the repo root. Set effort with the CLI's effort option or settings; verify with `claude --help`. |

## Any other agent

If it has a desktop app and the user uses it, look for a deep link or URL scheme that opens a session there. Otherwise use its headless CLI mode. Last resort: hand the user the full prompt to paste. Look up its docs for how to set high reasoning effort; if it has none, say so in the prompt ("think carefully and thoroughly") and tell the user.

## Running several developers in parallel

Create one worktree per iteration first, for example `git worktree add ../wt-<iteration> -b iter/<iteration>`, and point each session at its own worktree path.

- **Headless**: start one command per worktree in the background from inside that worktree, then collect each output and exit status. Remove finished worktrees with `git worktree remove` after merging.
- **Codex app / Claude Code links**: one link per worktree, using `path=` (Codex) or `cwd=` (Claude Code) set to that worktree. The user presses Enter on each.
- **Cursor**: its prompt link has no path parameter, so open each worktree in its own Cursor window first, then use the link there.

## Review loop note

Headless runs return their output to you, so the developer's report arrives automatically. With app launches the session lives in the user's app, so ask the user to paste the developer's final report back, or read the commit from the repo.
