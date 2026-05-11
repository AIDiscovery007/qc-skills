# qc-skills

Personal agent skills by Qiao Chao, organized for lightweight iteration and GitHub distribution through `npx skills`.

乔超的个人 agent skills 仓库，用于轻量收集、创建、迭代，并通过 GitHub + `npx skills` 分发。

## Install / 安装

List available skills:

```bash
npx skills@latest add AIDiscovery007/qc-skills --list
```

Install a specific skill:

```bash
npx skills@latest add AIDiscovery007/qc-skills --skill <skill-name>
```

Install all published skills:

```bash
npx skills@latest add AIDiscovery007/qc-skills --all
```

## Structure / 目录结构

```text
.claude-plugin/plugin.json  # Distribution manifest / 分发清单
skills/published/           # Published skills / 已发布 skills
skills/incubating/          # Draft skills / 草稿 skills
skills/archive/             # Retired skills / 归档 skills
templates/skill/            # Authoring template / 创作模板
scripts/list-skills.sh      # Lists published SKILL.md files / 列出已发布 skills
```

## Publishing Rules / 发布规则

- Only mature skills in `skills/published/` are included in `.claude-plugin/plugin.json`.
- `skills/incubating/` and `skills/archive/` are never added to the manifest.
- Every published skill must contain a `SKILL.md`.
- Skill `name` and `description` should be in English for reliable agent triggering.

- 只有 `skills/published/` 下成熟的 skill 会写入 `.claude-plugin/plugin.json`。
- `skills/incubating/` 和 `skills/archive/` 不进入分发清单。
- 每个正式发布的 skill 都必须包含 `SKILL.md`。
- skill 的 `name` 和 `description` 建议使用英文，便于 agent 稳定触发。

## Current Skills / 当前 Skills

No published skills yet.

当前还没有已发布的 skills。
