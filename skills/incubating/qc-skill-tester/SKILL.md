---
name: qc-skill-tester
description: Evaluates existing agent skills through isolated child-agent CLI runs and session analysis. Use when testing whether a skill can be discovered, triggered, and produce expected results, or when checking usability, repeated-run stability, weaker-model compatibility, prompt trigger coverage, or release readiness for a skill.
---

# QC Skill Tester

Evaluate an existing skill as installed runtime behavior, not only as a Markdown file.

## Purpose

Use this when a user wants to test a target skill. The main agent starts fresh child-agent CLI runs in isolated directories, waits for completion, inspects outputs plus child sessions/logs, and reports usability, stability, and compatibility.

## Inputs

Collect or infer the target skill name/path/install source, local loading method, expected behavior or artifact, natural trigger prompts, available agent CLI, baseline and lower-capability model/effort, pass criteria, and maximum test cost/time. Prefer prompts that imply the skill without naming it. If unclear, read the target `SKILL.md` and propose the smallest useful test matrix.

## Registration Preflight

Before testing behavior, prove the child runtime can discover the target skill. This does not require publishing: pass a local plugin directory or temporary plugin manifest, symlink the target skill into a runtime-scanned skills directory, or use an already installed skill when testing the installed release.

Record the registration method and cleanup path. Do not treat a raw prompt file path as discovery. If the child cannot see the skill, stop and report the harness/setup as blocked.

## Runtime Rules

- Run tests from a clean temp directory such as `tmp/skill-tests/<skill>-<timestamp>/runs/<case>-<n>/`.
- Start each child as a non-interactive CLI process; do not reuse conversations unless explicitly testing resume behavior.
- Give the child access to the target skill through the preflighted loading method.
- Do not paste the full target skill into the prompt when testing discovery.
- Capture command, cwd, model, effort, permissions, env overrides, exit code, stdout, stderr, and session/transcript path when available.
- Keep fixtures minimal and local. Do not let child agents modify the source skill unless the test prompt requires editing.
- Prefer isolated `cwd` over changing `HOME`. If testing a clean home, explicitly load the target skill or plugin path.
- If session logs are unavailable, say so and score from captured output only.

## CLI Pattern

Use the native agent CLI on the machine. Adjust flags from local `--help`.

```bash
mkdir -p tmp/skill-tests/<skill>-<timestamp>/runs/<case>-<n>
cd tmp/skill-tests/<skill>-<timestamp>/runs/<case>-<n>
<agent-cli> <non-interactive-flags> <skill-loading-flags> <model-flags> "<prompt>" \
  > stdout.txt 2> stderr.txt
printf '%s\n' "$?" > exit-code.txt
```

For Claude Code, a typical shape is `claude -p --bare --plugin-dir <plugin-dir> --output-format json --model <model> --effort <effort> "<prompt>"`.

## Test Matrix

1. Usability: after registration preflight passes, run at least one natural trigger prompt. Add one explicit skill-name prompt only as a diagnostic fallback. Pass only when the child triggers or behaviorally follows the skill and produces the expected result.
2. Stability: repeat the same natural prompt in fresh runtimes; default `n=3`, use `n=5` for release confidence. Score pass rate and output variance. Separate transient CLI/tool failures from skill-design failures.
3. Compatibility: re-run the natural prompt with lower-capability settings: weaker model, lower effort, reduced context, or stricter tool permissions. Keep the task and fixtures identical. Pass when the weaker setup still triggers the skill and meets the minimum output contract.

## Session Analysis

For each child run, inspect:

- Trigger evidence: runtime says the skill loaded/read, or output follows specific skill instructions unlikely to come from the prompt alone.
- Outcome evidence: required artifact exists, required sections are present, and constraints are followed.
- Failure mode: registration/setup blocked, no trigger, wrong skill, partial trigger, missing resource, prompt ambiguity, permission issue, CLI/runtime issue, or model capability issue.
- Compatibility clues: lower model needed explicit naming, ignored references, skipped verification, or overfit the prompt.

Do not accept "I used the skill" as evidence by itself.

## Judgement Scale

- Usability: `pass` if natural prompts work; `partial` if only explicit naming works or evidence is behavioral only; `fail` if expected results are absent.
- Stability: `pass` if all runs pass or only one non-design transient fails; `partial` if pass rate is mixed but diagnosis is clear; `fail` if repeated runs miss trigger or output.
- Compatibility: `pass` if lower-capability runs meet the minimum contract; `partial` if they need explicit skill naming; `fail` if they cannot reliably trigger or finish.

## Report Shape

Write a compact report at `tmp/skill-tests/<skill>-<timestamp>/report.md` and summarize it to the user:

```md
# Skill Test Report: <target skill>

## Verdict
- Usability: pass|partial|fail
- Stability: pass|partial|fail
- Compatibility: pass|partial|fail

## Matrix
| Case | Command | Model/Effort | Exit | Result | Evidence |
| --- | --- | --- | --- | --- | --- |

## Findings
- ...

## Failure Analysis
- ...

## Recommended Fixes
- ...
```

## Final Check

Before reporting, verify every verdict cites a captured run or session observation, not just the main agent's expectation.
