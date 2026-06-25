# OpenCode Runtime Reference

Concrete command templates for running QC Skill Tester against OpenCode. Use this file only for OpenCode-specific mechanics; keep staged test logic in [procedure.md](procedure.md).

## Runtime Identity

- `Agent Runtime`: `opencode`
- Default `Agent Environment`: `opencode`
- `Model`: OpenCode `--model` value in `provider/model` format.
- `Thinking Level`: OpenCode `--variant` value. Record `default` when no `--variant` is used.

Use `--agent <agent-name>` only when the test intentionally fixes a specific OpenCode agent profile. Otherwise omit it and keep `Agent Environment` as `opencode`.

Do not use `--pure` unless intentionally testing a no-plugin/no-external-skill baseline. It disables external plugins and can create false registration failures.

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
