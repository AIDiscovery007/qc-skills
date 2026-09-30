# Motion cases

28 个可操作的动效组件，包含 36 种模式和 72 条实现提示词。每个 Source Notes 提供设计理念、设计原因、可展开的原文索引，以及从零实现和优化已有组件两种提示词。

[阅读 qc-motion-design](../../SKILL.md)

## 本地运行

安装 skill 后，在 `qc-motion-design` 目录执行（可让 Agent 定位安装目录并启动）：

```bash
python3 -m http.server 5173 --bind 127.0.0.1
```

打开 <http://127.0.0.1:5173/assets/motion-cases/>。页面使用原生 HTML、CSS 和 JavaScript，无需安装依赖；原文通过 fetch 读取，因此需要 HTTP 服务。

画廊默认开启标准动效，可手动关闭；键盘路径保留各组件原有的即时响应。Skill 在实际项目中仍要求响应用户的减少动态效果偏好。示例参数是当前实现选择，不是 Skill 的通用硬性数值。

## 使用案例

1. 选择组件并操作演示，点击 **Source Notes** 查看设计理念与原因。
2. 选择“从零实现”或“优化已有”，复制提示词，连同目标页面或代码发给 Agent。
3. 需要复用代码时，让 Agent 从随附的 `assets/motion-cases/` 定位对应组件，并适配当前项目。

例如：

> 使用 qc-motion-design，参考 Motion cases 的按钮按压反馈，为当前提交按钮添加动效；沿用项目样式，并处理键盘和减少动态效果路径。

案例是原生 HTML/CSS/JavaScript 参考实现，不是需要额外安装的组件库。`app.js`、`advanced-components.js`、`extra-components.js` 定义组件；对应的 motion 脚本与 CSS 实现交互，`motion-prompts.js` 提供实现提示词。

仓库用户也可在仓库根目录启动上述服务，然后访问 `/examples/motion-cases/`。

## 来源

`sources/` 保留 Source Notes 所引用的三份输入文档及原始行号：

- `animation-design-skill.md`：文档声明基于 Emil Kowalski 的设计工程哲学。
- `animation-vocabulary.md`：动效术语与原则整理。
- `Benjamin_De_Cock_Motion_Playfulness_CSS_Day_2018.md`：Benjamin De Cock 在 CSS Day 2018 的 Motion & Playfulness 演讲中文整理。

来源标记与规则取舍见 [Skill 来源说明](../../references/sources.md)。来源文档保留原有署名；不将其来源内容声明为本项目原创。
