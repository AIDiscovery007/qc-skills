// These targets describe this gallery's implementations, not universal Skill parameters.
const motionTargets = {
  press: '用户按下保存按钮时，按钮以 140ms ease-out 缩小至 0.97，松开后复位，点击后原位更新保存文字',
  tabs: '用户点击分段选项时，选中底板以 220ms ease-in-out 沿轨道移动，内容和选中语义立即切换，方向键切换不播放过渡',
  popover: '用户打开菜单时，浮层从触发按钮下缘的右上锚点以 180ms ease-out 从 scale(0.95)、透明过渡到正常大小和不透明，关闭时反向，支持 Esc 和关闭后焦点恢复',
  tooltip: '用户首次悬停工具时等待 450ms，再以 125ms 淡入并从 scale(0.97) 恢复，移出后 700ms 内悬停相邻工具立即显示，键盘聚焦即时显示，离开后清理等待计时',
  switch: '用户切换通知开关时，圆点以 180ms ease-in-out 横移 14px 或返回，轨道颜色、说明文字和 aria-checked 立即更新，连续点击从当前位置反向',
  toast: '用户触发通知时，通知以 230ms 从下方 translateY(160%) 滑入并以 180ms 淡入，关闭时向下退出，支持下滑与轻甩关闭，取消拖拽时复位，通知保留至用户关闭',
  modal: '用户打开对话框时，内容以 220ms 从 scale(0.96)、透明过渡到正常大小和不透明并显示遮罩，限制焦点范围，支持 Esc，关闭后恢复触发按钮焦点',
  command: '用户点击搜索入口或按 ⌘/Ctrl+K 时，搜索弹窗以 0ms 打开并聚焦输入框，输入即时筛选，方向键选择、Enter 跳转、Esc 关闭，全程不增加进出动画',
  hold: '用户持续按住归档按钮 2 秒后才提交一次演示归档，期间用静态倒计时反馈，提前松开、失焦或指针取消立即终止，键盘采用二次确认并提供恢复操作',
  feedback: '用户选择表情时，按钮以 160ms ease-out 提供轻微按压反馈并即时更新选中语义和确认文字，方向键支持等效选择，不播放循环装饰',
  pop: '用户领取成就时，对象在 380ms 内从 scale(0.88)、下移 15px 和透明弹入，轻微超调至 1.045 后归位，收起时以 200ms 缩小淡出，确认文字立即更新',
  slide: '用户展开详情时，面板以 300ms 从右侧 translateX(100%) 滑入并让背景轻退，收起时沿原方向退出，关闭内容立即不可交互，支持 Esc 和焦点恢复',
  sheet: '用户打开底部面板时以 300ms 上滑，拖动横条时面板直接跟手且向上越界增加阻力，向下超过 60px 或有效轻甩时关闭，否则以约 420ms 弹簧回弹，取消拖拽回到打开状态，并提供按钮等效操作',
  stagger: '用户展开四个任务条目时，每项以 240ms 过渡并间隔 45ms 依次出现，总时长 375ms，收起时反向收回，重复触发接续当前状态',
  shared: '用户展开缩略卡片时，保留同一 DOM 容器和星形标识，用 FLIP 在 320ms 内连接缩略与详情布局，收起时回到原位置，快速切换从当前可见位置接续',
  direction: '用户前进或返回三步内容时，横向轨道以 300ms ease-in-out 向左或向右移动，步骤文字、可操作状态和隐藏内容语义立即更新，快速反向不排队',
  reorder: '用户点击上移或下移按钮时，立即提交列表 DOM 顺序，以 FLIP 在 280ms 内把条目从当前可见位置移至新位置，保留操作按钮焦点，键盘重排即时完成',
  accordion: '用户点击折叠标题时，按实际内容高度以 260ms 展开或收起并推动后续内容，快速反向从当前高度继续，内容或容器尺寸改变后重新测量，折叠内容不可聚焦',
  flip: '用户查看卡片背面时，在 700px 透视下以 420ms 旋转 180 度，再次点击返回正面，隐藏背面透出，只让当前面可访问，键盘操作直接换面',
  sequence: '用户启动本地导出模拟时，任务在 1.2 秒内更新进度，容器以 240ms 连接空闲、运行和完成状态，完成勾选以 280ms 呈现，支持中途取消与重播，结果由模拟任务驱动',
  image: '用户加载图片时，先展示占位，资源成功加载且 decode 完成后以 260ms 淡入图片，失败显示重试，重复请求取消旧请求并阻止旧结果覆盖新结果，释放临时 URL',
  compare: '用户拖动 0–100 的原生滑块时，裁剪上层彩色图片并同步移动分隔线，直接揭示下层灰度图片，进度即时对应滑块值，方向键可调节，不增加缓动延迟',
  line: '用户点击描绘路线时，用 SVG pathLength=1 和 stroke-dashoffset 在 900ms ease-in-out 内从隐藏描到完整路线，再次点击反向擦除，连续触发接续当前进度',
  error: '用户提交非 4 位数字时，输入框在 260ms ease-out 内按 -6px、5px、-3px、0 横向短摆，同时显示错误文字和 aria-invalid，重新输入清除错误，有效输入直接确认',
  scroll: '用户滚动局部内容区域时，将实际 scrollTop 与可滚动距离的比例直接映射为路线标记位置和 0–100% 文本，使用原生滚动且不劫持页面，不叠加延迟动画',
  number: '用户切换用量档位时，数字在 520ms 内以 cubic-out 从当前显示值过渡到 1,280、4,860 或 9,240，保留千分位与等宽数字，真实目标立即可读，快速切换从当前数值继续',
  pan: '用户拖动画布时直接跟手，释放后根据最近速度按 exp(-dt/180) 衰减惯性并在边界停止，再次按下立即接管，方向键每次平移 30px，回中以 280ms 完成，取消手势停止惯性',
  stream: '用户开始本地流式模拟后，数据分四批到达并立即追加，不叠加打字机延迟，分别显示等待、接收、完成和停止状态，取消后停止更新，再次开始清空上一轮内容',
  ripple: '用户点击按钮时，从点击坐标生成覆盖按钮的圆形波纹，以 480ms 从 scale(0)、opacity(0.7) 扩展到 scale(1)、透明，反馈文字立即更新，结束后移除波纹，键盘仅更新状态',
  tilt: '用户在卡片上移动鼠标时，按指针相对中心位置映射 rotateX ±9 度和 rotateY ±11 度，在 650px 透视下以 200ms ease-out 跟随，移出回正，并提供切换视角和回正按钮',
  'drag-order': '用户拖动列表手柄时，条目直接跟手并显示插入线，松开后提交 DOM 顺序并以 280ms FLIP 连接位置，Esc 或指针取消保留原顺序，方向键即时排序且保留焦点',
  morph: '用户切换播放与暂停时，让同一个 SVG 的两组多边形顶点在 240ms 内用 smoothstep 插值成播放三角或暂停双条，状态和标签立即更新，反向操作从当前顶点位置继续',
  crossfade: '用户切换收藏状态时，让原位的两层按钮文案以 180ms ease-out 交叉淡化，保持按钮尺寸，立即更新 aria-pressed 和状态说明，快速切换接续当前透明度',
  waiting: '用户开始等待模拟时，圆环以 900ms linear 循环旋转且仅显示完成和取消操作，模拟完成后停止旋转并以 220ms 描出绿色勾选，取消后显示静态横线，结束状态仅显示重新开始按钮并恢复焦点',
  viewport: '用户滚动局部区域时，条目达到 35% 可见后以 300ms 从下移 18px 和透明过渡至原位不透明，每次激活该模式只播放一次，保留原生滚动并清理观察器',
  parallax: '用户滚动局部区域时，按滚动比例将太阳、远景和近景分别向上移动最多 18px、36px 和 90px，形成由远到近的速度差，直接跟随原生滚动'
};
function motionPrompt(id, title, existing = false) {
  const task = existing
    ? `检查当前项目中用户指定的「${title}」组件，保留业务逻辑、接口和布局，复用现有动效机制，只修改与以下目标不符的部分`
    : `在当前项目中创建可操作的「${title}」组件，复用现有技术栈与样式，并实现以下效果`;
  return `使用 $qc-motion-design，${task}：${motionTargets[id]}；按 Skill 处理适用的中断、取消、焦点和生命周期，键盘操作及时响应，减少动态效果时保留可读反馈；以这些参数复现本例，验证连续触发、键盘和减少动态效果路径，并简述修改与验证结果。`;
}
function appendMotionPrompts(id, title) {
  const section = document.createElement('section');
  section.className = 'source-prompts';
  section.innerHTML = `<div class="prompt-heading"><h3>实现提示词</h3><a href="../../SKILL.md" target="_blank" rel="noopener">qc-motion-design ↗</a></div><p class="prompt-note">复制后发给已安装此 Skill 的 Agent；参数来自本例实现。</p><div class="prompt-toolbar"><div role="tablist" aria-label="提示词场景"><button id="prompt-new" role="tab" aria-selected="true" aria-controls="prompt-panel">从零实现</button><button id="prompt-existing" role="tab" aria-selected="false" aria-controls="prompt-panel" tabindex="-1">优化已有</button></div><button class="prompt-copy" aria-label="复制当前提示词">复制</button></div><div id="prompt-panel" role="tabpanel" aria-labelledby="prompt-new" tabindex="0"><p class="prompt-text"></p></div><span class="prompt-status" role="status"></span>`;
  const tabs = $$('[role="tab"]', section), panel = $('#prompt-panel', section), text = $('.prompt-text', section), status = $('.prompt-status', section);
  function select(index) {
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', i === index); tab.tabIndex = i === index ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tabs[index].id);
    text.textContent = motionPrompt(id, title, index === 1);
    status.textContent = '';
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index;
      select(next); tabs[next].focus();
    });
  });
  $('.prompt-copy', section).addEventListener('click', async () => {
    const copied = text.textContent;
    try { await navigator.clipboard.writeText(copied); if (text.textContent === copied) status.textContent = '已复制'; }
    catch { const range = document.createRange(); range.selectNodeContents(text); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); status.textContent = '请按 ⌘/Ctrl+C 复制选中文字'; }
  });
  select(0);
  $('#source-content').append(section);
}
