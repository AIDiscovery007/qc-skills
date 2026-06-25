# QC Skill Tester Procedure

Run skill tests as staged child-agent experiments. This procedure is runtime-neutral: it defines the stages, evidence rules, and report shape. Use a separate runtime reference for concrete CLI commands.

## Runtime Reference Contract

Before running tests, choose one agent runtime reference. Each runtime reference should define:

- Runtime name and default `Agent Environment` value.
- Registration method for installed skills and local draft skills.
- Non-interactive child-run command template.
- Parallel run template.
- Model/provider listing command.
- Session listing/export command when available.
- How to map runtime options to `Model` and `Thinking Level`.
- Flags that must be avoided because they disable skills/plugins.

Current default runtime reference: [opencode-runtime.md](opencode-runtime.md).

## Inputs

Collect or infer the target skill name/path/install source, runtime reference, local loading method, expected behavior or artifact, natural trigger prompts, baseline model and thinking level, lower-capability model ladder, pass criteria, and maximum test cost/time. Prefer prompts that imply the skill without naming it. If unclear, read the target `SKILL.md` and propose the smallest useful matrix.

## Runtime Rules

- Run every child from a clean temp directory such as `tmp/skill-tests/<skill>-<timestamp>/runs/<stage>/<runtime-id>/<n>/`.
- Start each child as a non-interactive CLI process; do not reuse conversations unless explicitly testing resume behavior.
- Give the child access to the target skill through the registration method proven in Stage 1.
- Do not paste the full target skill into the prompt when testing discovery.
- Capture command, cwd, raw prompt, agent runtime, agent environment, model, thinking level, permissions, env overrides, stdout, stderr, and session/transcript path when available.
- Keep fixtures minimal and local. Do not let child agents modify the source skill unless the test prompt requires editing.
- If session logs are unavailable, say so and score from captured output only.

## Stage 1: Registration

Prove the selected runtime can discover the target skill before testing behavior. This does not require publishing: use the runtime's local loading method, symlink or copy into a runtime-scanned skills directory, pass a local plugin/config path if supported, or use an already installed skill when testing the installed release.

Use the runtime reference's registration probe. Record the registration method and cleanup path. Do not treat a raw prompt file path as discovery. If the child runtime cannot see the skill, stop and report the harness/setup as blocked.

## Stage 2: Stability

Use the same raw prompt, same model, same thinking level, same agent runtime, and same agent environment. Start multiple isolated child sessions in parallel; default `n=3`, use `n=5` for release confidence.

Pass when each child triggers or behaviorally follows the target skill and produces the expected result. Score output variance and separate transient CLI/tool failures from skill-design failures.

## Stage 3: Compatibility

Step down through lower-capability models while keeping the raw prompt, target task, fixtures, agent runtime, and agent environment identical. Include at least five different model providers configured locally. If fewer than five providers are available, mark compatibility coverage blocked or partial instead of silently substituting same-provider variants.

For each provider/model, record the exact model id and thinking level. Continue until the model ladder is exhausted, failures become clearly diagnostic, or the cost/time limit is reached.

## Stage 4: Generalization

Use different natural prompts with the same baseline model, same thinking level, same agent runtime, and same agent environment. Start multiple isolated child sessions in parallel.

Prompts should cover nearby user phrasings without naming the skill unless explicit-name fallback is being diagnosed. Pass when the skill still triggers and meets the expected output contract across prompt variations.

## Session Analysis

For each child run, inspect:

- Trigger evidence: runtime says the skill loaded/read, or output follows specific skill instructions unlikely to come from the prompt alone.
- Outcome evidence: required artifact exists, required sections are present, and constraints are followed.
- Failure mode: registration/setup blocked, no trigger, wrong skill, partial trigger, missing resource, prompt ambiguity, permission issue, CLI/runtime issue, model capability issue, or weak generalization.
- Compatibility clues: lower model needed explicit naming, ignored references, skipped verification, or overfit the prompt.

Do not accept "I used the skill" as evidence by itself.

## Judgement Scale

- Registration: `pass` if the runtime can discover the target skill without prompt-file injection; `blocked` if local loading fails.
- Stability: `pass` if all runs pass or only one non-design transient fails; `partial` if pass rate is mixed but diagnosis is clear; `fail` if repeated runs miss trigger or output.
- Compatibility: `pass` if lower-capability runs across five providers meet the minimum contract; `partial` if coverage is incomplete or some lower models need explicit naming; `fail` if lower models cannot reliably trigger or finish.
- Generalization: `pass` if natural prompt variants trigger and meet the contract; `partial` if only some variants work; `fail` if the skill depends on brittle wording.

## Report Shape

Write a compact report at `tmp/skill-tests/<skill>-<timestamp>/report.md` and summarize it to the user:

```md
# Skill Test Report: <target skill>

## Verdict
- Registration: pass|blocked
- Stability: pass|partial|fail
- Compatibility: pass|partial|fail|blocked
- Generalization: pass|partial|fail
- Overall: pass|partial|fail

## Runtime Matrix
| Agent Runtime | Agent Environment | Raw Prompt | Model | Thinking Level | Sessions | Result | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Findings
- ...

## Failure Analysis
- ...

## Overall Analysis
- ...

## Recommended Fixes
- ...
```

The runtime matrix is grouped by child runtime configuration. `Sessions` should summarize count, pass rate, and notable variance; do not include exit code as a matrix field.
