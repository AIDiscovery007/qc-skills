---
name: qc-motion-design
description: Design, implement, explain, or review interaction motion for web interfaces and frontend components. Use for button feedback, overlay transitions, state changes, drag gestures, timing, easing, motion performance, and reduced-motion support. Not for static layout, typography, or color design alone.
---

# qc-motion-design

## 目标与边界

让动效解释操作反馈、状态关系、空间方向与流程变化。
依据操作频率和用户目的判断是否需要动画，优先复用项目已有组件与动画机制。
只调整任务涉及的交互与动效；示例时长、幅度和弹簧参数作为调试起点，不作为通用标准。

## 执行流程

1. 明确目标组件、触发操作、起止状态、使用频率和输入方式。从需求与现有代码中获取信息；只有必要信息缺失时，才询问用户。
2. 按 [动效决策](references/motion-decisions.md) 判断是否保留动画，并为保留的动画选择目的、时长、缓动与方向。
3. 按需读取组件模式和工程实现，处理连续触发、中断、取消、键盘与减少动态效果路径。让业务状态驱动反馈，不用动画结束事件决定业务成功。
4. 根据用户请求直接修改目标代码、交付设计说明或报告审查问题。实现时复用项目已有机制，并清理动画、监听器与异步工作。
5. 按 [审查与验证](references/review.md) 检查相关操作，交付时简述动效变化、设计原因、已执行的验证和未验证的限制。

## 参考文件路由

| 当前任务 | 读取的文件 | 文件提供的内容 |
| --- | --- | --- |
| 判断是否动画，或选择时长与缓动 | [motion-decisions.md](references/motion-decisions.md) | 频率、目的、曲线、时长和例外 |
| 设计或修改具体交互组件 | [component-patterns.md](references/component-patterns.md) | 按钮、浮层、切换、通知、拖拽、反馈与加载模式 |
| 实现动画，或排查性能与输入适配 | [implementation.md](references/implementation.md) | 动画机制、渲染成本、生命周期与无障碍路径 |
| 审查组件，或验证本次实现 | [review.md](references/review.md) | 交互场景、结果判定与审查输出 |
| 将动效术语转换成具体行为 | [vocabulary.md](references/vocabulary.md) | 术语对应的主体、动作与对象 |
| 解释依据、核对原文或维护规则 | [sources.md](references/sources.md) | 三份动效原文、规则取舍与工程补充 |

## 可运行案例

[Motion cases](assets/motion-cases/README.md) 随 skill 一并安装，包含可操作的组件、设计说明、原文索引和实现提示词。用户需要查看效果、选择模式或复用案例时，按该说明启动本地页面；默认无需读取全部案例代码。

需要实现某个案例时，按组件名称或 ID 在 `assets/motion-cases/` 中定位代码，结合目标项目改写。Source Notes 中的“从零实现 / 优化已有”提示词可直接用于发起任务；示例的视觉样式与参数不作为项目约束。

## 核心约束

- 为每项动效说明它帮助用户理解什么；删除缺乏用途的重复运动。
- 让高频操作与键盘触发的状态切换及时完成，不增加装饰性等待；真实异步任务仍按结果更新状态。
- 让新输入中断旧动画，并从当前状态转向新目标；不用动画阻塞后续输入或劫持滚动。
- 让空间动效保留元素的身份、触发原点和移动方向。
- 响应 `prefers-reduced-motion`，移除非必要位移、缩放与旋转，保留可读的状态反馈。
- 优先使用 `transform` 和 `opacity`。仅在目标效果确有需要时选择裁剪、滤镜或布局动画，并验证实际成本。
- 简述设计理由；用户要求出处时，再用来源文件的章节展开依据，并区分实现选择与原文要求。

## 指令与交付用语

用动词开头的操作指令说明要做什么、作用于什么对象。
描述交互时，明确用户、组件等实际主体，并补充触发条件和完成状态。
例如：“用户通过指针按下按钮时，按钮在 140ms 内缩小至 0.97，反馈输入已被接收；减少动态效果路径保留静态反馈。”
避免使用“优化体验”“更加丝滑”等无法验证的独立要求。
