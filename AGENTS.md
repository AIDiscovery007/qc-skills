# qc-skills Agent Instructions

## Purpose

This repository is a personal collection of agent skills for creation, iteration, and GitHub distribution through `npx skills`.

本仓库用于收集、创建、迭代和发布个人 agent skills，并通过 `npx skills` 从 GitHub 分发。

## Repository Rules

- Keep the repository small, readable, and easy to fork.
- Publish only mature skills from `skills/published/`.
- Keep drafts in `skills/incubating/`.
- Move retired skills to `skills/archive/`.
- Do not add skills from `skills/incubating/` or `skills/archive/` to `.claude-plugin/plugin.json`.
- Every published skill must have a `SKILL.md` with valid YAML frontmatter containing `name` and `description`.
- Prefer English for skill `name` and `description` so agents can trigger them reliably.
- Bilingual documentation is allowed and preferred for repository-level docs.
- Do not add new dependencies unless the task explicitly needs them.
- Keep scripts simple and deterministic.

## Publishing Checklist

Before publishing a skill:

1. Move it to `skills/published/<skill-name>/`.
2. Add `./skills/published/<skill-name>` to `.claude-plugin/plugin.json`.
3. Add or update the README reference.
4. Run `scripts/list-skills.sh`.
5. Run `npx skills add https://github.com/AIDiscovery007/qc-skills --list` after pushing.
