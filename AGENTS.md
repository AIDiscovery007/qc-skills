# qc-skills Agent Instructions

## Purpose

This repository is a personal collection of agent skills for creation, iteration, and GitHub distribution through `npx skills`.

本仓库用于收集、创建、迭代和分发个人 agent skills，并通过 `npx skills` 从 GitHub 安装。

## Repository Rules

- Keep the repository small, readable, and easy to fork.
- `skills/published/` means formally published, mature skills.
- `skills/incubating/` means drafts and iteration-stage skills.
- Move retired skills to `skills/archive/`.
- "Publish/release a version" means make the skill distributable through `.claude-plugin/plugin.json`; it does not imply moving the skill to `skills/published/`.
- Only move a skill to `skills/published/` when the user explicitly asks for a formal published release.
- Skills in `skills/incubating/` may be added to `.claude-plugin/plugin.json` for iteration releases when the user asks to publish or ship a version.
- Do not add skills from `skills/archive/` to `.claude-plugin/plugin.json`.
- Every distributable skill must have a `SKILL.md` with valid YAML frontmatter containing `name` and `description`.
- Prefer English for skill `name` and `description` so agents can trigger them reliably.
- Bilingual documentation is allowed and preferred for repository-level docs.
- Do not add new dependencies unless the task explicitly needs them.
- Keep scripts simple and deterministic.

## Distribution Checklist

Before releasing an iteration-stage skill:

1. Keep it in `skills/incubating/<skill-name>/` unless the user explicitly asks for a formal published release.
2. Add its actual path to `.claude-plugin/plugin.json`.
3. Add or update the README reference.
4. Validate `.claude-plugin/plugin.json`.
5. Run `npx skills add https://github.com/AIDiscovery007/qc-skills --list` after pushing.

## Formal Publishing Checklist

Only when the user explicitly asks for a formal published release:

1. Move it to `skills/published/<skill-name>/`.
2. Add `./skills/published/<skill-name>` to `.claude-plugin/plugin.json`.
3. Add or update the README reference.
4. Run `scripts/list-skills.sh`.
5. Run `npx skills add https://github.com/AIDiscovery007/qc-skills --list` after pushing.
