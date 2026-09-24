# OpenCode Runtime Reference

Concrete command templates for running QC Skill Tester against OpenCode. Use this file only for OpenCode-specific mechanics; keep staged test logic in [procedure.md](procedure.md).

## Runtime Identity

- `Agent Runtime`: `opencode`
- Default `Agent Environment`: `opencode`
- `Model`: OpenCode `--model` value in `provider/model` format.
- `Thinking Level`: OpenCode `--variant` value. Record `default` when no `--variant` is used.
- `Session IDs`: use the OpenCode session id from JSON output, `opencode session list`, or the exported session file. If unavailable, record `unavailable` and cite the run directory.

Use `--agent <agent-name>` only when the test intentionally fixes a specific OpenCode agent profile. Otherwise omit it and keep `Agent Environment` as `opencode`.

Do not use `--pure` unless intentionally testing a no-plugin/no-external-skill baseline. It disables external plugins and can create false registration failures.

## Permission Mapping

For OpenCode runs, the permission preflight should cover:

- Running `opencode run`, `opencode models`, `opencode session list`, and `opencode export`.
- Writing run directories under `tmp/skill-tests/...`.
- Reading installed or local target skill files.
- Network/provider usage for each selected `provider/model`.
- Parallel child sessions for stability and generalization stages.
- Symlink/copy/config changes used to make a draft skill visible to OpenCode.
- Reading and exporting OpenCode session data.

Use `--dangerously-skip-permissions` only when the user explicitly approved auto-approving OpenCode child-agent permissions for the isolated test scope. Do not add it silently.

## Model Discovery

```bash
opencode models --verbose > models.txt 2> models.stderr.txt
opencode models <provider> --verbose > models-<provider>.txt 2> models-<provider>.stderr.txt
```

## Session Discovery

Snapshot recent sessions before and after runs:

```bash
opencode session list --format json --max-count 50 > sessions-before.json
opencode session list --format json --max-count 50 > sessions-after.json
```

Export a session transcript when a session id is available:

```bash
opencode export "<session-id>" --sanitize > session.json
```

Derive session ids by diffing `sessions-before.json` and `sessions-after.json`, or by reading session identifiers from `stdout.jsonl` events when present. Store the matched id in each run directory as `session-id.txt`.

## Provider Readiness Probe

Run this before registration and before compatibility attempts for each provider/model:

```bash
mkdir -p tmp/skill-tests/<skill>-<timestamp>/runs/provider-readiness/<runtime-id>/<n>
cd tmp/skill-tests/<skill>-<timestamp>/runs/provider-readiness/<runtime-id>/<n>
opencode session list --format json --max-count 50 > sessions-before.json
opencode run --format json \
  --model "<provider/model>" \
  --variant "<thinking-level>" \
  --title "provider-readiness-<runtime-id>-<n>" \
  "Reply with exactly: provider-ready" \
  > stdout.jsonl 2> stderr.txt
opencode session list --format json --max-count 50 > sessions-after.json
```

Classify these as provider readiness failures, not skill failures: `ProviderInitError`, missing credentials, membership/model access errors, quota/spend cap errors, rate-limit or TPM errors, and context-window errors before the target skill prompt is evaluated.

## One Child Run

```bash
mkdir -p tmp/skill-tests/<skill>-<timestamp>/runs/<stage>/<runtime-id>/<n>
cd tmp/skill-tests/<skill>-<timestamp>/runs/<stage>/<runtime-id>/<n>
opencode run --format json \
  --model "<provider/model>" \
  --variant "<thinking-level>" \
  --title "<stage>-<runtime-id>-<n>" \
  "<raw prompt>" \
  > stdout.jsonl 2> stderr.txt
```

## Parallel Child Runs

```bash
for n in 1 2 3; do
  run_dir="tmp/skill-tests/<skill>-<timestamp>/runs/<stage>/<runtime-id>/$n"
  mkdir -p "$run_dir"
  (
    cd "$run_dir" &&
    opencode run --format json \
      --model "<provider/model>" \
      --variant "<thinking-level>" \
      --title "<stage>-<runtime-id>-$n" \
      "<raw prompt>" \
      > stdout.jsonl 2> stderr.txt
  ) &
done
wait
```

## Registration Probe

Use this after configuring the target skill through an installed skill, local symlink/copy, or other OpenCode-visible loading path:

```bash
opencode run --format json \
  --model "<baseline-provider/model>" \
  --variant "<baseline-thinking-level>" \
  --title "registration-<skill>" \
  "I need to test whether the <skill> skill is available in this OpenCode runtime. Without solving a larger task, identify whether you can use that skill and cite the evidence you used." \
  > stdout.jsonl 2> stderr.txt
```

If this probe cannot show discovery evidence, report Stage 1 as blocked instead of continuing to stability or compatibility.

## Small Context and Low TPM Providers

OpenCode injects runtime, agent, tool, and skill context before the target prompt reaches the model. Small-context or low-TPM providers can fail before the target skill is evaluated.

For those providers:

- Run provider readiness with the same skill-loading path used by the real test.
- Run compatibility attempts sequentially instead of parallel when TPM is low.
- Use the smallest natural prompt and fixtures that still test the skill.
- Avoid attached files unless the target skill requires them.
- Keep `--variant` minimal/default when high reasoning increases token use.
- If the provider fails before skill instructions are evaluated, mark compatibility as provider/runtime capacity blocked or partial coverage, not as a skill-design failure.
