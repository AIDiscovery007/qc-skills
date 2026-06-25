---
name: qc-skill-tester
description: Evaluates existing agent skills through isolated child-agent CLI runs and session analysis. Use when testing whether a skill can be discovered, triggered, and produce expected results, or when checking usability, repeated-run stability, weaker-model compatibility, prompt trigger coverage, or release readiness for a skill.
---

# QC Skill Tester

Evaluate an existing skill as installed runtime behavior, not only as a Markdown file.

## Scope

Use this when a user wants to test whether a target skill can be discovered, triggered, and used reliably by child agents.

The staged procedure is runtime-neutral. Runtime-specific CLI commands live in separate reference files.

## Procedure

Read [references/procedure.md](references/procedure.md), then read the runtime reference for the selected agent. If the user does not specify a runtime, use [references/opencode-runtime.md](references/opencode-runtime.md).

1. Registration: prove the selected agent runtime can discover the target skill.
2. Stability: run the same prompt, same model, same agent environment in multiple isolated sessions.
3. Compatibility: step down through lower-capability models across at least five different providers.
4. Generalization: run different prompts with the same model and agent environment in multiple isolated sessions.
5. Overall analysis: combine run evidence, session observations, and output quality into a final judgement.

## Output

Write `tmp/skill-tests/<skill>-<timestamp>/report.md` and summarize the result to the user.

The report matrix must be grouped by child runtime configuration, not by individual case. It must include each runtime's raw prompt, model, thinking level, agent environment, aggregate result, and evidence. Do not include exit code as a matrix field.

## Final Check

Before reporting, verify every verdict cites captured child-run output or session observations, not just the main agent's expectation.
