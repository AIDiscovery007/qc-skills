# qc-skills

Small personal agent skills for clear thinking, compact outputs, and lightweight distribution.

个人 agent skills 仓库：小、可读、方便 fork，通过 GitHub + `npx skills` 分发。

## Quickstart / 快速开始

List what this repo currently distributes:

```bash
npx skills add https://github.com/AIDiscovery007/qc-skills --list
```

Install one skill:

```bash
npx skills add https://github.com/AIDiscovery007/qc-skills --skill qc-essence
```

Install everything in the manifest:

```bash
npx skills add https://github.com/AIDiscovery007/qc-skills --all
```

## Reference / 技能列表

These are the skills exposed through `.claude-plugin/plugin.json`.

### Published / 正式发布

- [qc-skills-setup](skills/published/qc-skills-setup/SKILL.md) - bridge `AGENTS.md` into Claude-style agent instructions.
- [qc-essence](skills/published/qc-essence/SKILL.md) - compress a topic, article, plan, or problem to its decisive essence.
- [qc-lean-html](skills/published/qc-lean-html/SKILL.md) - render dense content into a compact, self-contained HTML report.
- [qc-image-series](skills/published/qc-image-series/SKILL.md) - create consistent prompt specs for covers, carousels, and image series.

### Incubating / 迭代中

- [qc-think-alone](skills/incubating/qc-think-alone/SKILL.md) - apply a task-first independent thinking posture without forcing an output format.
- [qc-investment-analysis](skills/incubating/qc-investment-analysis/SKILL.md) - analyze markets through dominant constraints, transmission, and portfolio expression.
- [qc-expert-casting](skills/incubating/qc-expert-casting/SKILL.md) - cast one public expert lens for a problem and generate a prompt suffix or Sub Agent `agent.md`.
- [qc-interaction-craft](skills/incubating/qc-interaction-craft/SKILL.md) - design, implement, review, and debug purpose-led product interaction behavior and motion craft.

## Repo Map / 仓库结构

```text
.claude-plugin/plugin.json  # distribution manifest
skills/published/           # mature skills
skills/incubating/          # drafts and iteration releases
skills/archive/             # retired skills
templates/skill/            # authoring template
scripts/list-skills.sh      # lists published SKILL.md files
```

<details>
<summary>Maintainer notes / 维护者说明</summary>

### Distribution Rules / 分发规则

- `.claude-plugin/plugin.json` is the distribution manifest used by `npx skills`.
- "Release/publish a version" means adding the skill's current path to the manifest; it does not require moving the skill to `skills/published/`.
- Only move a skill to `skills/published/` when explicitly doing a formal published release.
- `skills/incubating/` skills may be distributed for iteration when they are intentionally added to the manifest.
- `skills/archive/` is never added to the manifest.
- Every distributable skill must contain a `SKILL.md`.
- Skill `name` and `description` should be in English for reliable agent triggering.

- `.claude-plugin/plugin.json` 是 `npx skills` 使用的分发清单。
- “发布一版”表示把 skill 当前路径加入分发清单，不要求移动到 `skills/published/`。
- 只有明确做“正式发布”时，才把 skill 移动到 `skills/published/`。
- `skills/incubating/` 中的 skill 可以作为迭代版进入分发清单。
- `skills/archive/` 永远不进入分发清单。
- 每个可分发的 skill 都必须包含 `SKILL.md`。
- skill 的 `name` 和 `description` 建议使用英文，便于 agent 稳定触发。

</details>
