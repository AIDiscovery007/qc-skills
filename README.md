# qc-skills

Personal agent skills by Qiao Chao, organized for lightweight iteration and GitHub distribution through `npx skills`.

乔超的个人 agent skills 仓库，用于轻量收集、创建、迭代，并通过 GitHub + `npx skills` 分发。

## Install / 安装

List available skills:

```bash
npx skills add https://github.com/AIDiscovery007/qc-skills --list
```

Install a specific original skill:

```bash
npx skills add https://github.com/AIDiscovery007/qc-skills --skill qc-essence
npx skills add https://github.com/AIDiscovery007/qc-skills --skill qc-lean-html
npx skills add https://github.com/AIDiscovery007/qc-skills --skill qc-skills-setup
npx skills add https://github.com/AIDiscovery007/qc-skills --skill qc-image-series
npx skills add https://github.com/AIDiscovery007/qc-skills --skill qc-think-alone
npx skills add https://github.com/AIDiscovery007/qc-skills --skill qc-investment-analysis
```

Install all original qc skills:

```bash
npx skills add https://github.com/AIDiscovery007/qc-skills --all
```

## Structure / 目录结构

```text
.claude-plugin/plugin.json  # Distribution manifest / 分发清单
skills/published/           # Formally published mature skills / 正式发布的成熟 skills
skills/incubating/          # Draft and iteration-stage skills / 草稿和迭代版 skills
skills/archive/             # Retired skills / 归档 skills
templates/skill/            # Authoring template / 创作模板
scripts/list-skills.sh      # Lists formal published SKILL.md files / 列出正式发布 skills
```

## Distribution Rules / 分发规则

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

## Current Skills / 当前 Skills

### Original / 原创

Distributed by `npx skills --list` from `.claude-plugin/plugin.json`.

#### Formal Published / 正式发布

- [qc-skills-setup](skills/published/qc-skills-setup/SKILL.md)
- [qc-essence](skills/published/qc-essence/SKILL.md)
- [qc-lean-html](skills/published/qc-lean-html/SKILL.md)
- [qc-image-series](skills/published/qc-image-series/SKILL.md)

这些原创 skills 已从 `skills/incubating/` 晋升到 `skills/published/`，并进入分发清单。

#### Iteration Releases / 迭代版分发

- [qc-think-alone](skills/incubating/qc-think-alone/SKILL.md)
- [qc-investment-analysis](skills/incubating/qc-investment-analysis/SKILL.md)

这些 skills 仍在 `skills/incubating/` 中迭代，但已进入分发清单。
