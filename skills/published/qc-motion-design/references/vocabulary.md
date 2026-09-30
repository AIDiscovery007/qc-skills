# 动效术语

在用户使用动效术语时查阅对应分组，再把术语改写为目标元素的行为。术语只命名效果，不构成添加该效果的要求。

## 出入场与状态

| 术语 | 主体、动作与对象 |
| --- | --- |
| Fade in / Fade out | 元素提高或降低自身透明度，显示或隐藏内容。 |
| Slide in / Enter / Exit | 元素沿指定方向进入或离开可见区域。 |
| Scale in / Pop in | 元素调整自身缩放；Pop in 额外越过目标比例后回落。 |
| Reveal | 遮罩或裁剪边界逐步显示目标内容。 |
| Crossfade | 旧内容降低透明度，新内容在同一区域提高透明度。 |
| Continuity transition | 元素保持身份并连接前后位置、尺寸或状态。 |
| Morph | 元素连续改变自身形状，连接两个外观状态。 |
| Shared element transition | 同一视觉元素连接不同视图中的起止位置与形态。 |
| Layout animation / Accordion / Collapse | 元素在布局变化或内容展开收起时，连续改变显示范围或位置。 |
| Direction-aware transition | 内容根据前进或返回方向选择相反的移动方向。 |
| Page transition / View transition | 页面或浏览器将前后视图连接为一个视觉过程。 |

## 变换与编排

| 术语 | 主体、动作与对象 |
| --- | --- |
| Translate / Scale / Rotate / Skew | 元素分别改变自身位移、比例、角度或倾斜程度。 |
| 3D tilt / Flip / Perspective | 元素围绕三维轴旋转；透视设置控制观察深度。 |
| Transform origin / Origin-aware animation | 元素围绕指定原点变换；锚定动效将原点对应到触发器。 |
| Keyframes / Interpolation | 关键帧指定属性值；插值过程计算帧间状态。 |
| Stagger / Orchestration | 多个元素依次开始运动，或按同一时间关系协调动作。 |
| Delay / Duration / Fill mode | 时间设置分别控制开始等待、播放长度与区间外的属性表现。 |
| Stepped animation | 元素按离散步骤改变状态，不生成连续过渡。 |

## 输入与滚动

| 术语 | 主体、动作与对象 |
| --- | --- |
| Hover effect / Press feedback | 元素在悬停或按下时改变外观，确认当前输入。 |
| Hold to confirm | 控件在用户持续按住期间显示确认进度。 |
| Drag / Drag to reorder | 指针带动元素移动，或带动元素改变列表顺序。 |
| Swipe to dismiss | 用户滑动目标元素，触发目标关闭。 |
| Rubber-banding | 元素在越过边界后减弱位移，并在释放后返回。 |
| Shake / Wiggle / Ripple | 元素短暂摆动，或从按下位置扩散波纹，表达反馈。 |
| Scroll reveal / Scroll-driven animation | 滚动触发元素出现，或直接控制动画进度。 |
| Parallax | 不同视觉层以不同速度随滚动移动，表达深度。 |

## 曲线与物理

| 术语 | 主体、动作与对象 |
| --- | --- |
| Easing / Cubic-bezier / Asymmetric easing | 曲线控制属性随时间变化的速率；非对称曲线分配不同的加速与减速节奏。 |
| Ease-out / Ease-in / Ease-in-out / Linear | 动作分别采用先快后慢、先慢后快、慢快慢或匀速变化。 |
| Spring / Stiffness / Damping / Mass | 弹簧根据目标、刚度、阻尼与质量计算元素运动。 |
| Bounce / Perceptual duration | 元素越过目标后回落；感知时长描述用户认为动作已完成的时间。 |
| Momentum / Velocity | 元素携带运动惯性；速度同时描述变化快慢与方向。 |
| Interruptible animation | 新输入使当前动画转向新目标，不必先完成旧目标。 |

## 装饰与精修

| 术语 | 主体、动作与对象 |
| --- | --- |
| Marquee / Loop / Alternate | 内容持续滚动、重复播放，或轮流正向与反向播放。 |
| Orbit / Pulse / Float / Idle animation | 元素沿轨道移动、重复缩放淡化、上下漂浮，或在空闲时轻微运动。 |
| Blur / Clip-path / Mask | 滤镜模糊内容；裁剪限定边界；遮罩控制区域可见程度。 |
| Before / after slider | 滑块改变两个叠放结果的可见比例。 |
| Line drawing | SVG 描边逐步显示目标路径。 |
| Text morph / Typewriter | 文字变形或逐字出现，以强调内容变化。 |
| Skeleton / Shimmer | 占位结构表达待加载区域；高光可扫过占位结构。 |
| Number ticker / Tabular numbers | 数字以滚动或递增方式更新；等宽数字限制数值变化引发的位移。 |
| Anticipation / Follow-through / Squash & stretch | 元素先反向预备、在主动作后继续收尾，或通过形变表达重量与弹性。 |

## 性能与原则

| 术语 | 主体、动作与对象 |
| --- | --- |
| Frame rate / Dropped frame / Jank | 帧率衡量绘制节奏；错过帧期限可能造成可见卡顿。 |
| Compositing / Hardware acceleration | 浏览器在符合条件时通过合成路径处理视觉层；具体属性仍需实测。 |
| will-change | 样式向浏览器提示即将变化的属性，可能增加图层与内存成本。 |
| Layout thrashing | 代码交替读取几何信息和修改布局，触发重复强制布局。 |
| Purposeful animation / Spatial consistency | 动效服务明确目的，并保持目标元素在状态变化中的身份与方向关系。 |
| Frequency of use / Perceived performance | 使用频率决定动效的克制程度；响应时机影响用户感知的速度。 |
| Reduced motion | 界面依据用户偏好减少非必要运动，并保留必要状态反馈。 |

依据：S2「Animation Vocabulary」各节。性能术语采用限定表述，取舍见 [sources.md](sources.md)。
