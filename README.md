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

### OpenClaw compatibility / OpenClaw 兼容安装

OpenClaw can install these GitHub-distributed skills through `npx skills`; do not use `clawhub install AIDiscovery007/qc-skills`, because ClawHub expects a registry slug, not an `owner/repo` source.

Run from your OpenClaw workspace:

```bash
npx skills@latest add AIDiscovery007/qc-skills --agent openclaw --skill qc-essence qc-lean-html qc-skills-setup --copy -y
```

This writes skills into:

```text
./skills/qc-essence
./skills/qc-lean-html
./skills/qc-skills-setup
```

OpenClaw 可以继续通过 `npx skills` 从 GitHub 安装这些 skills；不要使用 `clawhub install AIDiscovery007/qc-skills`，因为 ClawHub 需要的是注册表 slug，不是 `owner/repo`。

## Structure / 目录结构

```text
.claude-plugin/plugin.json  # Distribution manifest / 分发清单
skills/published/           # Published skills / 已发布 skills
skills/third-party/         # Imported third-party skills / 移植的第三方 skills
skills/incubating/          # Draft skills / 草稿 skills
skills/archive/             # Retired skills / 归档 skills
templates/skill/            # Authoring template / 创作模板
scripts/list-skills.sh      # Lists distributable SKILL.md files / 列出可分发 skills
```

## Publishing Rules / 发布规则

- Mature original skills in `skills/published/` may be included in `.claude-plugin/plugin.json`.
- Imported community skills live in `skills/third-party/` and require source and license attribution in `THIRD_PARTY_NOTICES.md`.
- `skills/incubating/` and `skills/archive/` are never added to the manifest.
- Every published skill must contain a `SKILL.md`.
- Skill `name` and `description` should be in English for reliable agent triggering.

- `skills/published/` 下成熟的原创 skill 可以写入 `.claude-plugin/plugin.json`。
- 社区移植的 skill 放在 `skills/third-party/`，并必须在 `THIRD_PARTY_NOTICES.md` 记录来源和许可证归属。
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

Imported from [mattpocock/skills](https://github.com/mattpocock/skills). See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for source and license details.

- [diagnose](skills/third-party/diagnose/SKILL.md)
- [grill-me](skills/third-party/grill-me/SKILL.md)
- [grill-with-docs](skills/third-party/grill-with-docs/SKILL.md)
- [tdd](skills/third-party/tdd/SKILL.md)
- [write-a-skill](skills/third-party/write-a-skill/SKILL.md)

以上 skills 移植自 [mattpocock/skills](https://github.com/mattpocock/skills)。来源与许可证信息见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
