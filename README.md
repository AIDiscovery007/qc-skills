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
```

Install all original qc skills:

```bash
npx skills add https://github.com/AIDiscovery007/qc-skills --skill qc-essence qc-lean-html qc-skills-setup
```

## Structure / 目录结构

```text
.claude-plugin/plugin.json  # Distribution manifest / 分发清单
skills/published/           # Published skills / 已发布 skills
skills/third-party/         # Imported third-party skills / 移植的第三方 skills
skills/incubating/          # Draft skills / 草稿 skills
skills/archive/             # Retired skills / 归档 skills
templates/skill/            # Authoring template / 创作模板
scripts/list-skills.sh      # Lists published SKILL.md files / 列出已发布 skills
```

## Publishing Rules / 发布规则

- Mature original skills in `skills/published/` may be included in `.claude-plugin/plugin.json`.
- Imported community skills live in `skills/third-party/` for personal use only and are not included in `.claude-plugin/plugin.json`.
- `skills/incubating/` and `skills/archive/` are never added to the manifest.
- Every published skill must contain a `SKILL.md`.
- Skill `name` and `description` should be in English for reliable agent triggering.

- `skills/published/` 下成熟的原创 skill 可以写入 `.claude-plugin/plugin.json`。
- 社区移植的 skill 放在 `skills/third-party/` 供个人使用，不进入 `.claude-plugin/plugin.json`。
- `skills/incubating/` 和 `skills/archive/` 不进入分发清单。
- 每个正式发布的 skill 都必须包含 `SKILL.md`。
- skill 的 `name` 和 `description` 建议使用英文，便于 agent 稳定触发。

## Current Skills / 当前 Skills

### Original / 原创

Distributed by `npx skills --list` from `skills/published/`.

- [qc-skills-setup](skills/published/qc-skills-setup/SKILL.md)
- [qc-essence](skills/published/qc-essence/SKILL.md)
- [qc-lean-html](skills/published/qc-lean-html/SKILL.md)

这些原创 skills 已从 `skills/incubating/` 晋升到 `skills/published/`，并进入分发清单。

### Third-party / 第三方

Imported from [mattpocock/skills](https://github.com/mattpocock/skills) for personal repository use only. They are kept in this repo with source and license attribution, but they are not distributed through `npx skills add https://github.com/AIDiscovery007/qc-skills`.

- [diagnose](skills/third-party/diagnose/SKILL.md)
- [grill-me](skills/third-party/grill-me/SKILL.md)
- [grill-with-docs](skills/third-party/grill-with-docs/SKILL.md)
- [tdd](skills/third-party/tdd/SKILL.md)
- [write-a-skill](skills/third-party/write-a-skill/SKILL.md)

以上 skills 移植自 [mattpocock/skills](https://github.com/mattpocock/skills)，仅保留在仓库内供个人使用，不通过本仓库的安装命令分发。来源与许可证信息见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
