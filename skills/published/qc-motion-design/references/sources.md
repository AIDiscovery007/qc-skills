# 来源与取舍

仅在解释依据、核对原文或维护规则时读取本文件。
本 skill 以三份动效原文为基础；使用时无需读取原始仓库或在线资源。
本文维护三份原文的来源标记 S1–S3，以及整理时补充的工程约束 S4。
下列行号对应本次重构时的原文。原文变化后，按章节名重新定位，不沿用未经核对的行号。

## S1：设计工程文档

文件：`animation-design-skill.md`。文档声明其内容来自 Emil Kowalski 的设计工程哲学。

| 章节 | 原文行号 | 重构后的归属 |
| --- | --- | --- |
| Core Philosophy | 18–36 | 主入口的目标；决策文件中的一致性与可理解性 |
| Review Format | 38–60 | 审查文件中的 Before / After / Why 表格 |
| The Animation Decision Framework | 62–145 | 决策文件中的频率、目的、缓动与时长 |
| Spring Animations | 147–195 | 工程文件中的物理动效选择 |
| Component Building Principles | 197–349 | 组件模式中的按压、浮层、提示与状态变化 |
| CSS Transform Mastery / clip-path for Animation | 351–442 | 组件模式中的原点、位移、选项卡、长按与比较 |
| Gesture and Drag Interactions | 444–480 | 组件模式中的手势与边界行为 |
| Performance Rules / Accessibility | 482–560 | 工程文件中的性能与输入适配 |
| The Sonner Principles / Stagger Animations | 562–640 | 默认体验、动态打断、计时与错峰策略 |
| Debugging Animations / Review Checklist | 642–679 | 审查文件中的验证场景 |

原文短引：“Every animation must have a clear answer to "why does this animate?"”（L83）。

## S2：动效术语表

文件：`animation-vocabulary.md`。

| 章节 | 原文行号 | 重构后的归属 |
| --- | --- | --- |
| Entrances & Exits / Sequencing & Timing / Movement & Transforms | 5–40 | 术语文件中的状态与编排 |
| Transitions Between States / Scroll / Feedback & Interaction | 42–76 | 术语文件中的状态、输入与滚动 |
| Easing / Spring Animations | 78–102 | 决策文件与物理术语 |
| Looping & Ambient Motion / Polish & Effects | 104–129 | 装饰、数值与视觉精修术语 |
| Performance / Principles to Know | 131–154 | 性能术语、频率与减少动态效果 |

原文短引：“Motion should serve a function — orient, give feedback, show relationships — not just decorate.”（L146）。

## S3：Motion & Playfulness 演讲整理

文件：`Benjamin_De_Cock_Motion_Playfulness_CSS_Day_2018.md`。内容是 Benjamin De Cock 在 CSS Day 2018 演讲的中文整理，属于历史材料。

| 章节 | 原文行号 | 重构后的归属 |
| --- | --- | --- |
| 3.1 小交互，大不同 | 27–29 | 组件模式中的低频表情反馈 |
| 4.1–4.3 动效设计 | 35–56 | 决策文件中的准确隐喻、状态连接与流程解释 |
| 5.1 代码作为设计工具 / 5.2 渐进式图像加载 | 62–74 | 可交互的说明内容与渐进加载模式 |
| 6.1 设计层面 | 88–124 | 动效目的、偏好、速度与缓动 |
| 6.2 开发层面 | 128–156 | 属性选择、WAAPI 与 will-change |
| 七、动效的五大核心价值 / 核心精炼 | 159–165、189–199 | 主入口的因果、方向、理解与反馈原则 |

原文短引：“将用户行为与界面结果建立清晰、可预期的逻辑关联。”（L48）。

## 冲突处理

| 原文中的差异 | 本 skill 采用的规则 | 取舍理由 |
| --- | --- | --- |
| S1 禁止 UI 使用 ease-in；S3 为退场列出 ease-in | 普通交互进出场默认采用 ease-out。 | 用户触发变化时，界面应先响应输入。 |
| S3 强烈反对 linear，但保留持续滚动例外；S1 为恒速运动与长按进度使用 linear | 普通状态切换不默认使用 linear；恒速旋转与真实进度可使用 linear。 | 匀速运动具有明确语义，不应因修辞性禁令失真。 |
| S1 建议 UI 小于 300ms，同时列出 200–500ms 弹层范围与 2 秒长按 | 普通过渡优先小于 300ms；大幅移动可延长；确认等待独立计算。 | 三者分别对应响应速度、运动距离与操作语义。 |
| S1、S3 强调只动 transform / opacity，但也展示裁剪、模糊、布局和 SVG | 优先使用合成友好的属性，并对必要例外测量成本。 | 默认策略不能被误写成与原文示例互斥的硬限制。 |
| S1、S3 对 GPU、库简写、CSS 与 WAAPI 使用绝对性能表述 | 根据当前版本、属性与目标浏览器验证实际执行路径。 | 历史实现细节不能自动成为跨版本保证。 |
| S1 声称关键帧会从零重启，但也推荐 WAAPI 的程序化控制 | 优先用 transition 处理简单可逆状态，并根据实际实现验证中断行为。 | API 类型本身不能证明每种实现都保留或丢失连续性。 |
| S1 禁止键盘触发动画；减少动态效果部分允许必要淡化 | 键盘触发的装饰性切换即时完成；减少动态效果保留必要反馈。 | 分别处理输入效率和用户对运动的偏好。 |

## S4：重构时补充的工程约束

S4 是本次整理的标记，不是第四份原始文档。以下规则用于补齐可执行性，不得将其冒充为原文引文：

- 用真实业务结果驱动反馈，并清理组件卸载后的异步工作。
- 为模态框、提示和视觉副本维护焦点路径与无障碍语义。
- 为手势提供键盘等效路径，并处理指针取消、捕获丢失和重复提交；在页面隐藏或窗口失焦时取消待完成的长按。
- 优先使用最近的同向释放速度，避免整段平均速度误判轻甩方向。
- 为自动消失通知补充焦点与悬停暂停规则，为加载内容补充失败路径。
- 将强制布局描述为读写交错问题，不把所有布局动画等同于 layout thrashing。

## 删除与保留范围

保留会改变设计决策或实现结果的知识。
本 skill 不保留固定欢迎语、课程推广、商业回报数字、下载量、个人身份扮演或重复格式示例。
本 skill 不把 Stripe 的视觉风格、示例网站配色、特定动画库或固定组件数量设为通用要求。
三份原文随 [Motion cases](../assets/motion-cases/README.md) 保存在 `../assets/motion-cases/sources/`，供按需核对；不必在日常任务中全文加载。维护者通过文件名、章节与行号核对出处。
用户要求逐字引用时，读取可用原文后再引用；原文不可用时，明确区分摘要与逐字引文。
