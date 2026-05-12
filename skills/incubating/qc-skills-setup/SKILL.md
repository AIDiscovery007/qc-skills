---
name: qc-skills-setup
description: Sets up qc-skills compatibility files for agent users. Use when bootstrapping qc-skills, bridging AGENTS.md to CLAUDE.md, or preparing Claude Code to read Codex-style instructions.
---

# QC Skills Setup

From the target repo root, run this skill's `scripts/create-claude-md.sh`.

It creates `CLAUDE.md` with `@AGENTS.md`, or appends that import without overwriting existing Claude instructions.

Stop if `AGENTS.md` is missing.

Verify `CLAUDE.md` contains `@AGENTS.md` and `AGENTS.md` is unchanged.
