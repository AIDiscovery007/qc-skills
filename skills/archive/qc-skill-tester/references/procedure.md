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
- Provider readiness probe for auth, membership, rate, TPM, and context-limit failures.
- How to map runtime options to `Model` and `Thinking Level`.
- How to extract or infer `Session IDs`.
- Runtime-specific permission implications.
- Flags that must be avoided because they disable skills/plugins.

Current default runtime reference: [opencode-runtime.md](opencode-runtime.md).

## Inputs

Collect or infer the target skill name/path/install source, runtime reference, local loading method, expected behavior or artifact, natural trigger prompts, baseline model and thinking level, lower-capability model ladder, provider-readiness criteria, pass criteria, and maximum test cost/time. Prefer prompts that imply the skill without naming it. If unclear, read the target `SKILL.md` and propose the smallest useful matrix.

## Runtime Rules

- Run every child from a clean temp directory such as `tmp/skill-tests/<skill>-<timestamp>/runs/<stage>/<runtime-id>/<n>/`.
- Start each child as a non-interactive CLI process; do not reuse conversations unless explicitly testing resume behavior.
- Give the child access to the target skill through the registration method proven in Stage 1.
- Do not paste the full target skill into the prompt when testing discovery.
- Capture command, cwd, raw prompt, session id, agent environment, model, thinking level, permissions, env overrides, stdout, stderr, and session/transcript path when available.
- Record `Type` for every run group as one of `provider-readiness`, `registration`, `stability`, `compatibility`, or `generalization`.
- Keep fixtures minimal and local. Do not let child agents modify the source skill unless the test prompt requires editing.
- If session logs are unavailable, say so and score from captured output only.

## Permission Preflight

Before launching any child-agent CLI process, build a permission inventory and resolve it once. Include every permission needed for the planned run:

- Execute the selected agent CLI and spawn parallel child processes.
- Read target skill files, runtime references, fixtures, stdout/stderr, and session logs.
- Write temp run directories, reports, copied fixtures, session exports, and cleanup files under `tmp/skill-tests/...`.
- Use network and cost-bearing model/provider calls for all selected providers/models.
- Create local symlinks, copied skill directories, temporary plugin/config files, or runtime-scanned skill entries when registration needs them.
- Export or inspect child sessions/transcripts.
- Use any runtime-specific auto-approval or permission-bypass flag only when explicitly included in the permission request.

If the current session already has all required permissions, record that assumption and continue without asking the user again. If any required permission is missing or uncertain, ask the user once with the complete permission list and wait for confirmation before Stage 0. Do not start partial CLI tests while waiting for permission. If a new permission need appears later, stop, request only that delta, and then continue.

## Stage 0: Provider Readiness

Before registration or skill behavior tests, prove each provider/model can start a minimal child session in the selected runtime. Use the runtime reference's provider-readiness probe.

Classify provider failures separately from skill failures:

- Provider init: runtime cannot initialize the provider, including `ProviderInitError`.
- Auth or membership: missing API key, expired token, disabled provider, missing model membership, or unavailable region.
- Rate or TPM: request is rejected by rate limit, token-per-minute, spend cap, concurrency cap, or quota exhaustion.
- Context capacity: runtime-injected context, installed skills, or provider limits exceed context before the target skill is evaluated.

Do not continue skill evaluation for a provider/model that fails readiness. Mark that provider/model as `blocked` or `partial coverage`, and cite stderr/stdout/session evidence.

## Stage 1: Registration

Prove the selected runtime can discover the target skill before testing behavior. This does not require publishing: use the runtime's local loading method, symlink or copy into a runtime-scanned skills directory, pass a local plugin/config path if supported, or use an already installed skill when testing the installed release.

Use the runtime reference's registration probe. Record the registration method and cleanup path. Do not treat a raw prompt file path as discovery. If the child runtime cannot see the skill, stop and report the harness/setup as blocked.

## Stage 2: Stability

Use the same raw prompt, same model, same thinking level, same agent runtime, and same agent environment. Start multiple isolated child sessions in parallel; default `n=3`, use `n=5` for release confidence.

Pass when each child triggers or behaviorally follows the target skill and produces the expected result. Score output variance and separate transient CLI/tool failures from skill-design failures.

## Stage 3: Compatibility

Step down through lower-capability models while keeping the raw prompt, target task, fixtures, agent runtime, and agent environment identical. Include at least five different model providers configured locally. If fewer than five providers are available, mark compatibility coverage blocked or partial instead of silently substituting same-provider variants.

For each provider/model, record the exact model id and thinking level. Continue until the model ladder is exhausted, failures become clearly diagnostic, or the cost/time limit is reached.

For small-context or low-TPM providers, first run provider readiness with the same runtime loading method. If the runtime's injected context exceeds limits before the target skill is evaluated, classify it as provider/runtime capacity blocked, not a skill-design failure. Reduce parallelism, run sequentially, use the smallest viable prompt and fixtures, and avoid attachments unless the target skill requires them.

## Stage 4: Generalization

Use different natural prompts with the same baseline model, same thinking level, same agent runtime, and same agent environment. Start multiple isolated child sessions in parallel.

Prompts should cover nearby user phrasings without naming the skill unless explicit-name fallback is being diagnosed. Pass when the skill still triggers and meets the expected output contract across prompt variations.

## Session Analysis

For each child run, inspect:

- Trigger evidence: runtime says the skill loaded/read, or output follows specific skill instructions unlikely to come from the prompt alone.
- Outcome evidence: required artifact exists, required sections are present, and constraints are followed.
- Failure mode: provider readiness blocked, registration/setup blocked, no trigger, wrong skill, partial trigger, missing resource, prompt ambiguity, permission issue, CLI/runtime issue, model capability issue, provider capacity issue, or weak generalization.
- Compatibility clues: lower model needed explicit naming, ignored references, skipped verification, or overfit the prompt.

Do not accept "I used the skill" as evidence by itself.

## Judgement Scale

- Provider Readiness: `pass` if required provider/models can start minimal child sessions; `partial` if some providers are blocked but coverage remains useful; `blocked` if baseline provider/model cannot run.
- Registration: `pass` if the runtime can discover the target skill without prompt-file injection; `blocked` if local loading fails.
- Stability: `pass` if all runs pass or only one non-design transient fails; `partial` if pass rate is mixed but diagnosis is clear; `fail` if repeated runs miss trigger or output.
- Compatibility: `pass` if lower-capability runs across five providers meet the minimum contract; `partial` if coverage is incomplete, some lower models need explicit naming, or some providers are readiness-blocked; `fail` if ready lower models cannot reliably trigger or finish.
- Generalization: `pass` if natural prompt variants trigger and meet the contract; `partial` if only some variants work; `fail` if the skill depends on brittle wording.

## Report Shape

Write a compact report at `tmp/skill-tests/<skill>-<timestamp>/report.md` and summarize it to the user:

```md
# Skill Test Report: <target skill>

## Verdict
- Provider Readiness: pass|partial|blocked
- Registration: pass|blocked
- Stability: pass|partial|fail
- Compatibility: pass|partial|fail|blocked
- Generalization: pass|partial|fail
- Overall: pass|partial|fail

## Runtime Matrix
| Type | Session IDs | Agent Environment | Raw Prompt | Model | Thinking Level | Sessions | Result | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Findings
- ...

## Failure Analysis
- ...

## Overall Analysis
- ...

## Recommended Fixes
- ...
```

The runtime matrix is grouped by child runtime configuration. `Type` identifies the test stage represented by the row. `Session IDs` must contain the concrete child session id or ids for that group. `Sessions` should summarize count, pass rate, and notable variance; do not include exit code as a matrix field.
