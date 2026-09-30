const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icons = {
  grid: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  book: '<path d="M12 5v15M3 4h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v15h-5a5 5 0 0 0-4 2 5 5 0 0 0-4-2H3Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>', close: '<path d="m6 6 12 12M6 18 18 6"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', down: '<path d="m7 10 5 5 5-5"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12l4 4v12a2 2 0 0 1-2 2Z"/><path d="M7 3v6h9V3M7 21v-8h10v8"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  archive: '<rect x="3" y="3" width="18" height="4" rx="1"/><path d="M5 7v14h14V7M9 11h6"/>',
  bold: '<path d="M7 4h6a4 4 0 0 1 0 8H7m0-8v16h7a4 4 0 0 0 0-8H7"/>',
  italic: '<path d="M10 4h8M6 20h8M14 4 10 20"/>',
  underline: '<path d="M6 4v7a6 6 0 0 0 12 0V4M4 21h16"/>',
  link: '<path d="m10 13 4-4M8 15l-2 2a4 4 0 0 1-5-5l4-4a4 4 0 0 1 5 0m4 1 2-2a4 4 0 0 1 5 5l-4 4a4 4 0 0 1-5 0" transform="translate(1 -1)"/>',
  expand: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.layers}</svg>`;
const docs = [
  { file: 'sources/animation-design-skill.md', title: 'Design Engineering', author: 'Emil Kowalski 的设计工程哲学', note: '决策框架 · 组件工艺 · 无障碍' },
  { file: 'sources/animation-vocabulary.md', title: 'Animation Vocabulary', author: '让动效拥有共同的语言', note: '动效术语 · 交互模式 · 性能' },
  { file: 'sources/Benjamin_De_Cock_Motion_Playfulness_CSS_Day_2018.md', title: 'Motion & Playfulness', author: 'Benjamin De Cock · CSS Day 2018', note: '因果连接 · 感知速度 · 细微惊喜' },
];
const components = [
  {id:'press',title:'按压反馈',en:'TACTILE BUTTON',category:'feedback',tag:'即时反馈',description:'轻轻下压 3%，确认点击已被接收。保存状态原位更新，反馈直接对应操作，不用多余动效等待结果。',tokens:['140ms','scale(0.97)','ease-out'],refs:[[0,199,213,'Buttons must feel responsive'],[1,69,69,'Press / Tap feedback'],[2,90,97,'动效要有用']],demo:`<div class="button-wrap demo-centered"><button class="primary" id="save-button">${icon('save')}<span>保存更改</span></button><span id="save-message" class="save-message" role="status"></span></div>`,hint:'按下感受反馈 · 可反复操作'},
  {id:'tabs',title:'分段切换',en:'SEGMENTED CONTROL',category:'state',tag:'状态连接',description:'选中底板沿同一轨道移动，保持前后状态的联系。内容即时切换；方向键导航时取消动画，跟上操作节奏。',tokens:['220ms','ease-in-out','← → 键可用'],refs:[[2,44,50,'4.2 动画的核心价值：连接状态'],[0,95,104,'What easing should it use?'],[1,47,47,'Continuity transition']],demo:`<div class="demo-centered"><div class="segmented" role="tablist" aria-label="项目视图"><span class="segment-indicator" aria-hidden="true"></span>${['概览','进行中','已完成'].map((t,i)=>`<button class="tab-button" id="view-tab-${i}" role="tab" aria-selected="${i===0}" aria-controls="view-panel" tabindex="${i===0?0:-1}">${t}</button>`).join('')}</div><div class="tab-panel" id="view-panel" role="tabpanel" tabindex="0" aria-labelledby="view-tab-0">所有项目，一目了然。</div></div>`,hint:'点击切换，观察底板的连续移动'},
  {id:'popover',title:'锚点浮层',en:'ORIGIN-AWARE POPOVER',category:'space',tag:'空间关系',description:'菜单从按钮下缘展开，以触发点为原点，由 0.95 缩放至 1。空间关系告诉你：这个浮层来自哪里。',tokens:['180ms','origin: top right','scale(0.95 → 1)'],refs:[[0,234,250,'Make popovers origin-aware'],[0,215,230,'Never animate from scale(0)'],[1,40,40,'Origin-aware animation']],demo:`<div class="popover-wrap demo-centered"><button class="secondary popover-trigger" id="popover-trigger" aria-expanded="false" aria-haspopup="menu" aria-controls="popover-menu"><span id="sort-label">最近更新</span>${icon('down')}</button><div class="popover-menu" id="popover-menu" role="menu" inert>${['最近更新','名称排序','创建时间'].map((t,i)=>`<button class="menu-option ${i===0?'selected':''}" role="menuitemradio" aria-checked="${i===0}" tabindex="-1">${t}<span class="menu-check">${i===0?'✓':''}</span></button>`).join('')}</div></div>`,hint:'点击展开 · Esc 关闭'},
  {id:'tooltip',title:'悬停提示',en:'CONSIDERATE TOOLTIP',category:'speed',tag:'高效操作',description:'首次悬停等待 450ms，避免误触；随后移到相邻工具，提示立即出现。键盘聚焦时同样即时可见。',tokens:['首次 450ms','相邻 0ms','fade 125ms'],refs:[[0,252,272,'Tooltips: skip delay on subsequent hovers'],[0,137,145,'Perceived performance'],[1,151,151,'Frequency of use']],stage:'stage-blue',demo:`<div class="toolbar demo-centered" role="toolbar" aria-label="文字格式">${[['bold','加粗'],['italic','斜体'],['underline','下划线'],['link','链接标记']].map(([i,t])=>`<div class="tool-wrap"><button class="icon-button tool-button" aria-label="${t}" aria-describedby="tip-${i}" aria-pressed="false">${icon(i)}</button><span class="tooltip" id="tip-${i}" role="tooltip">${t}</span></div>`).join('')}</div>`,hint:'悬停查看提示 · 点击切换格式状态'},
  {id:'switch',title:'状态开关',en:'STATEFUL SWITCH',category:'state',tag:'状态连接',description:'圆点的位置、轨道颜色和文字一起表达状态。位移克制，快速切换可从当前位置折返，不等待动画结束。',tokens:['180ms','interruptible','role="switch"'],refs:[[0,274,293,'Use CSS transitions over keyframes for interruptible UI'],[1,102,102,'Interruptible animation'],[2,44,50,'4.2 动画的核心价值：连接状态']],demo:`<div class="switch-setting demo-centered"><span class="setting-icon">${icon('bell')}</span><div class="setting-copy"><strong>消息通知</strong><small id="notification-copy">重要动态，不错过</small></div><button id="notification-switch" class="demo-switch" role="switch" aria-label="消息通知" aria-checked="true" aria-describedby="notification-copy"></button></div>`,hint:'快速连续切换，仍然自然响应'},
  {id:'toast',title:'滑动通知',en:'SPATIAL TOAST',category:'space',tag:'空间关系',description:'通知从下方进入，也向下离开；支持下滑与轻甩关闭。状态一直保留到你关闭，不用追赶自动消失的信息。',tokens:['230ms','同向进出','支持拖拽'],refs:[[0,81,91,'What is the purpose?'],[0,446,476,'Momentum-based dismissal / Pointer capture / Multi-touch protection'],[1,152,152,'Spatial consistency']],demo:`<div class="toast-demo"><button class="secondary" id="toast-trigger">${icon('check')}显示保存通知</button><div class="toast" id="demo-toast" inert><span class="toast-check">${icon('check')}</span><div><strong id="toast-title">更改已保存</strong><small>此为演示反馈 · 向下拖动可关闭</small></div><button class="icon-button" id="toast-close" aria-label="关闭保存通知">${icon('close')}</button></div></div>`,hint:'点击触发 · 下滑关闭 · 不自动消失'},
  {id:'modal',title:'聚焦弹窗',en:'FOCUSED DIALOG',category:'space',tag:'空间关系',description:'居中对话框从 0.96 轻微放大，遮罩帮助聚焦。限制焦点范围，支持 Esc 退出，关闭后回到触发按钮。',tokens:['220ms','origin: center','原生 dialog'],refs:[[0,234,236,'Make popovers origin-aware — modal exception'],[0,125,135,'How fast should it be?'],[2,159,165,'动效的五大核心价值']],stage:'stage-blue',demo:`<button class="secondary demo-centered" id="modal-trigger">${icon('expand')}打开专注视图</button>`,hint:'点击打开 · 保留完整的键盘路径'},
  {id:'command',title:'快捷搜索',en:'INSTANT COMMAND',category:'speed',tag:'高效操作',description:'为高频搜索主动省略进出动画。输入、方向键选择、回车跳转，一气呵成；即时响应本身就是设计。',tokens:['0ms','⌘ / Ctrl + K','无进出动画'],refs:[[0,66,79,'Should this animate at all?'],[1,151,151,'Frequency of use'],[2,90,97,'动效要有用']],demo:`<button class="secondary command-trigger demo-centered" id="command-trigger">${icon('search')}<span>寻找一个组件…</span><kbd class="keycap">⌘ K</kbd></button>`,hint:'试试搜索「按钮」或「空间」'},
  {id:'hold',title:'长按确认',en:'DELIBERATE CONFIRMATION',category:'feedback',tag:'即时反馈',description:'长按 2 秒归档演示项，松开立即取消。用静态倒计时保留审慎确认的含义；键盘采用二次确认，并提供恢复。',tokens:['长按 2s','松开即取消','可恢复演示'],refs:[[0,432,434,'Hold-to-delete pattern'],[0,592,606,'Asymmetric enter/exit timing'],[1,70,70,'Hold to confirm']],stage:'stage-rose',demo:`<div class="demo-centered"><button class="secondary hold-button" id="hold-button" aria-describedby="hold-status">${icon('archive')}<span id="hold-label">长按归档演示项</span></button><div id="hold-status" class="hold-status" role="status">仅作用于本页演示，不操作真实文件</div></div>`,hint:'审慎确认，也要允许轻松反悔'},
  {id:'feedback',title:'表情反馈',en:'PLAYFUL FEEDBACK',category:'feedback',tag:'即时反馈',description:'将低频反馈变成一个轻松的表情选择。只在点击时轻微回应，始终显示文字确认，不让装饰影响下一步。',tokens:['160ms','低频交互','无循环动画'],refs:[[2,25,29,'3.1 小交互，大不同'],[0,66,76,'Frequency: rare / first-time'],[1,146,146,'Purposeful animation']],stage:'stage-cream',demo:`<div class="demo-centered"><div class="feedback-group" role="radiogroup" aria-label="这次体验怎么样">${[['😕','不太顺畅'],['😐','一般'],['🙂','还不错'],['😊','很喜欢'],['🤩','超出期待']].map(([emoji,label],i)=>`<button class="feedback-choice" role="radio" aria-label="${label}" aria-checked="false" tabindex="${i===0?0:-1}">${emoji}</button>`).join('')}</div><div class="feedback-copy" id="feedback-copy" role="status">这次体验，感觉怎么样？</div></div>`,hint:'点击表情 · 反馈只保留在本次页面'},
  ...advancedComponents,
  ...extraComponents,
];
$('#component-grid').innerHTML = components.map((c,i)=>`<article class="component-card" id="component-${c.id}" data-category="${c.category}" ${c.category==='advanced'?'data-advanced="true"':''} aria-labelledby="title-${c.id}"><div class="card-top"><span class="component-number">${String(i+1).padStart(2,'0')}</span><h2 id="title-${c.id}">${c.title}</h2><button class="source-button" data-source="${c.id}" aria-label="查看${c.title}的设计依据" title="设计依据">${icon('expand')}</button></div>${renderMotionStage(c)}<div class="card-foot"><span class="english-name">${c.en}</span><span class="category-tag">${c.tag}</span></div></article>`).join('');
$('#reference-list').innerHTML = docs.map((d,i)=>`<button class="reference-item" data-document="${i}"><span class="reference-id">0${i+1}</span><span class="reference-copy"><strong>${d.title} <span>↗</span></strong><small>${d.file}</small></span><span class="reference-caption">${d.note}</span><span>↗</span></button>`).join('');
$$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));

// This motion gallery defaults to standard playback; each component keeps its input-specific behavior.
let userReduced = false;
const noMotion = () => userReduced || document.documentElement.dataset.input === 'keyboard';
function syncMotion(){
  document.documentElement.dataset.reduced = userReduced;
  $('#motion-toggle').setAttribute('aria-checked',!userReduced);
  $('#motion-label').textContent=userReduced?'动效关闭':'动效开启';
}
function finishMotion(a){if(a.effect?.getComputedTiming().iterations===Infinity)a.cancel();else a.finish();}
function cancelMotion(){ document.getAnimations().forEach(finishMotion); }
$('#motion-toggle').addEventListener('click',()=>{userReduced=!userReduced;syncMotion();if(noMotion())cancelMotion();announce(userReduced?'已关闭演示动效':'已恢复标准动效');});
document.addEventListener('keydown',event=>{document.documentElement.dataset.input='keyboard';event.target.closest('.component-card,dialog')?.getAnimations({subtree:true}).forEach(finishMotion);},true);
document.addEventListener('pointerdown',()=>document.documentElement.dataset.input='pointer',true);
document.addEventListener('pointermove',()=>document.documentElement.dataset.input='pointer',{passive:true});
syncMotion();
function announce(message){$('#global-status').textContent=message;}

function filterCards(category){
  $$('.filter').forEach(b=>{const active=b.dataset.filter===category;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
  $$('.component-card').forEach(card=>card.hidden=category==='basic'?card.dataset.category==='advanced':category!=='all'&&card.dataset.category!==category);
  const count=$$('.component-card:not([hidden])').length;
  $('#result-count').textContent=`${String(count).padStart(2,'0')} / ${components.length}`;
  $('#filter-status').textContent=`显示 ${count} 个组件`;
  closePopover();
}
$$('.filter').forEach(b=>b.addEventListener('click',()=>filterCards(b.dataset.filter)));

const dialogTriggers=new Map();
function openDialog(dialog,trigger=document.activeElement){closePopover();dialogTriggers.set(dialog,trigger);dialog.showModal();}
$$('dialog').forEach(dialog=>{
  $$('.close-dialog',dialog).forEach(b=>b.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
  dialog.addEventListener('close',()=>dialogTriggers.get(dialog)?.focus({preventScroll:true}));
});
$('#modal-trigger').addEventListener('click',()=>openDialog($('#demo-dialog')));

const sourceCache=new Map();
async function readSource(index){
  if(!sourceCache.has(index)){const response=await fetch(docs[index].file);if(!response.ok)throw new Error('无法读取原文');sourceCache.set(index,(await response.text()).split('\n'));}
  return sourceCache.get(index);
}
function showSources(title,refs,promptId){
  $('#source-title').textContent=title;
  $('#source-content').replaceChildren();
  refs.forEach(([index,start,end,heading])=>{
    const [principle,why]=sourceNotes[`${index}:${start}:${end}`];
    const section=document.createElement('section');section.className='source-entry';
    const h=document.createElement('h3');h.textContent=principle;
    const reason=document.createElement('p');reason.className='source-reason';
    const label=document.createElement('span');label.textContent='为什么';reason.append(label,why);
    const details=document.createElement('details');details.className='source-excerpt';
    const summary=document.createElement('summary');
    const action=document.createElement('span');action.className='source-action';
    const citation=document.createElement('span');citation.className='source-citation';citation.textContent=`${docs[index].title} · L${start}–${end}`;
    summary.append(action,citation);
    const body=document.createElement('div');body.className='source-original';
    let loading=false;
    details.addEventListener('toggle',async()=>{
      if(!details.open||body.dataset.loaded||loading)return;
      loading=true;body.textContent='正在读取原文…';
      try{
        const lines=await readSource(index);
        const meta=document.createElement('p');meta.className='source-meta';meta.textContent=`${docs[index].file} · ${heading}`;
        const quote=document.createElement('blockquote');quote.textContent=lines.slice(start-1,end).map((line,i)=>`${String(start+i).padStart(3,' ')}  ${line}`).join('\n');
        const link=document.createElement('a');link.href=docs[index].file;link.target='_blank';link.rel='noopener';link.textContent='阅读完整原文 ↗';
        body.replaceChildren(meta,quote,link);body.dataset.loaded='true';
      }catch(error){body.textContent='原文读取失败，请收起后重试。';}
      finally{loading=false;}
    });
    details.append(summary,body);section.append(h,reason,details);$('#source-content').append(section);
  });
  if(promptId)appendMotionPrompts(promptId,title);
  openDialog($('#source-dialog'));
}
$$('[data-source]').forEach(b=>b.addEventListener('click',()=>{const c=components.find(c=>c.id===b.dataset.source);const v=motionVariants[c.id]?.items.find(v=>v.id===$('[role="tab"][aria-selected="true"]',b.closest('.component-card'))?.dataset.mode);showSources(v?`${c.title} · ${v.label}`:c.title,v?.refs||c.refs,v?.id||c.id);}));
$$('[data-document]').forEach(b=>b.addEventListener('click',()=>{
  const index=Number(b.dataset.document);
  const excerpts=[[[0,62,91,'动效决策：频率与目的'],[0,530,560,'无障碍与输入方式']],[[1,142,154,'Principles to Know']],[[2,189,199,'核心精炼'],[2,90,106,'有用的动效与用户偏好']]];
  showSources(docs[index].title,excerpts[index]);
}));

let saveCount=0;
$('#save-button').addEventListener('click',()=>{saveCount++;$('#save-button span').textContent='已保存';$('#save-button svg').outerHTML=icon('check');$('#save-message').textContent=`本页演示 · 已保存 ${saveCount} 次`;});

const tabs=$$('.tab-button');
function selectTab(index,focus=false){
  tabs.forEach((b,i)=>{b.setAttribute('aria-selected',i===index);b.tabIndex=i===index?0:-1;});
  $('.segment-indicator').style.transform=`translateX(${index*100}%)`;
  $('#view-panel').textContent=['所有项目，一目了然。','3 个项目正在稳步推进。','12 个项目已经顺利完成。'][index];
  $('#view-panel').setAttribute('aria-labelledby',tabs[index].id);
  if(focus)tabs[index].focus();
}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>selectTab(i));b.addEventListener('keydown',e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%3;else if(e.key==='ArrowLeft')next=(i+2)%3;else if(e.key==='Home')next=0;else if(e.key==='End')next=2;else return;e.preventDefault();selectTab(next,true);});});

const popover=$('#popover-menu'),popoverTrigger=$('#popover-trigger');
function closePopover(restore=false){popover.classList.remove('open');popover.inert=true;popoverTrigger.setAttribute('aria-expanded','false');if(restore)popoverTrigger.focus();}
function openPopover(focus=false){popover.inert=false;popover.classList.add('open');popoverTrigger.setAttribute('aria-expanded','true');if(focus)$('.menu-option.selected',popover).focus();}
popoverTrigger.addEventListener('click',()=>popover.classList.contains('open')?closePopover():openPopover(document.documentElement.dataset.input==='keyboard'));
popoverTrigger.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();openPopover(true);}});
$$('.menu-option').forEach((b,i)=>{
  b.addEventListener('click',()=>{$$('.menu-option').forEach(el=>{const selected=el===b;el.classList.toggle('selected',selected);el.setAttribute('aria-checked',selected);$('.menu-check',el).textContent=selected?'✓':'';});$('#sort-label').textContent=b.childNodes[0].textContent;closePopover(true);});
  b.addEventListener('keydown',e=>{const options=$$('.menu-option');if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();options[(i+(e.key==='ArrowDown'?1:2))%3].focus();}if(e.key==='Home'||e.key==='End'){e.preventDefault();options[e.key==='Home'?0:2].focus();}});
});
document.addEventListener('pointerdown',e=>{if(!e.target.closest('.popover-wrap'))closePopover();});
document.addEventListener('focusin',e=>{if(!e.target.closest('.popover-wrap')&&popover.classList.contains('open'))closePopover();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&popover.classList.contains('open')){e.preventDefault();closePopover(true);}});

let tipTimer,tipWarmUntil=0;
function hideTips(){clearTimeout(tipTimer);$$('.tooltip.open').forEach(t=>{t.classList.remove('open');tipWarmUntil=performance.now()+700;});}
$$('.tool-button').forEach(b=>{
  const tip=$('#'+b.getAttribute('aria-describedby'));
  function show(immediate=false){hideTips();const instant=immediate||performance.now()<tipWarmUntil;tip.classList.toggle('instant',instant);tipTimer=setTimeout(()=>tip.classList.add('open'),instant?0:450);}
  b.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')show();});
  b.addEventListener('pointerleave',hideTips);
  b.addEventListener('focus',()=>{if(document.documentElement.dataset.input==='keyboard')show(true);});
  b.addEventListener('blur',hideTips);
  b.addEventListener('click',()=>{const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);announce(`${b.getAttribute('aria-label')}已${on?'开启':'关闭'}`);});
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideTips();});
$('#notification-switch').addEventListener('click',e=>{const b=e.currentTarget,on=b.getAttribute('aria-checked')!=='true';b.setAttribute('aria-checked',on);$('#notification-copy').textContent=on?'重要动态，不错过':'已暂停，留一点安静';});

const toast=$('#demo-toast');
let toastCount=0,drag=null,toastExitTimer;
function showToast(){clearTimeout(toastExitTimer);drag=null;toast.style.transform='';toast.style.transition='';toast.inert=false;toast.classList.remove('leaving');toast.classList.add('visible');$('#toast-trigger').style.opacity='0';$('#toast-trigger').style.pointerEvents='none';$('#toast-trigger').disabled=true;$('#toast-title').textContent=`更改已保存${++toastCount>1?' · '+toastCount:''}`;announce('更改已保存。这是本页演示，可关闭或向下滑动。');if(document.documentElement.dataset.input==='keyboard')$('#toast-close').focus();}
function dismissToast(){const restore=toast.contains(document.activeElement);drag=null;toast.style.transition='';toast.style.transform='';toast.classList.add('leaving');toast.classList.remove('visible');toast.inert=true;$('#toast-trigger').style.opacity='';$('#toast-trigger').style.pointerEvents='';$('#toast-trigger').disabled=false;if(restore)$('#toast-trigger').focus();clearTimeout(toastExitTimer);toastExitTimer=setTimeout(()=>toast.classList.remove('leaving'),noMotion()?0:230);}
$('#toast-trigger').addEventListener('click',showToast);
$('#toast-close').addEventListener('click',dismissToast);
toast.addEventListener('pointerdown',e=>{if(e.target.closest('button')||drag||!e.isPrimary||e.button!==0)return;drag={id:e.pointerId,startY:e.clientY,lastY:e.clientY,lastTime:performance.now(),velocity:0,distance:0};toast.setPointerCapture(e.pointerId);toast.style.transition='none';});
toast.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const now=performance.now();drag.velocity=(e.clientY-drag.lastY)/Math.max(1,now-drag.lastTime);drag.lastY=e.clientY;drag.lastTime=now;drag.distance=e.clientY-drag.startY;const y=drag.distance<0?-Math.sqrt(-drag.distance)*2:drag.distance;toast.style.transform=`translateY(${y}px)`;});
function endDrag(e,cancel=false){if(!drag||drag.id!==e.pointerId)return;const dismiss=!cancel&&(drag.distance>50||(drag.distance>8&&drag.velocity>.11&&performance.now()-drag.lastTime<100));drag=null;if(toast.hasPointerCapture(e.pointerId))toast.releasePointerCapture(e.pointerId);toast.style.transition='';toast.style.transform='';if(dismiss)dismissToast();}
toast.addEventListener('pointerup',e=>endDrag(e));toast.addEventListener('pointercancel',e=>endDrag(e,true));toast.addEventListener('lostpointercapture',e=>endDrag(e,true));

const command=$('#command-dialog'),commandInput=$('#command-search');
let commandItems=[],commandIndex=0;
function renderCommands(){const term=commandInput.value.trim().toLowerCase();commandItems=components.filter(c=>`${c.title} ${c.en} ${c.tag} ${c.description} ${(motionVariants[c.id]?.items||[]).map(v=>v.label).join(" ")}`.toLowerCase().includes(term));commandIndex=0;$('#command-results').innerHTML=commandItems.length?commandItems.map((c,i)=>`<button class="command-result" id="result-${c.id}" role="option" aria-selected="${i===0}" tabindex="-1" data-target="${c.id}"><span>${c.title}</span><small>${c.en} ↵</small></button>`).join(''):'<p class="no-results">没有匹配的组件，试试「反馈」或「状态」。</p>';updateCommandSelection();$$('.command-result').forEach(b=>b.addEventListener('click',()=>jumpToComponent(b.dataset.target)));}
function updateCommandSelection(){$$('.command-result').forEach((b,i)=>b.setAttribute('aria-selected',i===commandIndex));if(commandItems.length)commandInput.setAttribute('aria-activedescendant',`result-${commandItems[commandIndex].id}`);else commandInput.removeAttribute('aria-activedescendant');}
function openCommand(){if(command.open)return;commandInput.value='';renderCommands();openDialog(command);commandInput.focus();}
function jumpToComponent(id){const card=$('#component-'+id),term=commandInput.value.trim().toLowerCase(),variant=term&&motionVariants[id]?.items.find(v=>v.label.toLowerCase().includes(term));dialogTriggers.set(command,card);command.close();filterCards('all');if(variant)selectMode(card,variant.id);card.scrollIntoView({block:'center',behavior:'instant'});card.tabIndex=-1;card.focus({preventScroll:true});card.classList.add('flash-focus');card.addEventListener('blur',()=>card.classList.remove('flash-focus'),{once:true});}
commandInput.setAttribute('role','combobox');commandInput.setAttribute('aria-controls','command-results');commandInput.setAttribute('aria-expanded','true');commandInput.setAttribute('aria-autocomplete','list');
$('#command-trigger').addEventListener('click',openCommand);
$('#search-trigger').addEventListener('click',openCommand);
commandInput.addEventListener('input',renderCommands);
commandInput.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp'].includes(e.key)&&commandItems.length){e.preventDefault();commandIndex=(commandIndex+(e.key==='ArrowDown'?1:commandItems.length-1))%commandItems.length;updateCommandSelection();$$('.command-result')[commandIndex].scrollIntoView({block:'nearest'});}if(e.key==='Enter'&&commandItems.length){e.preventDefault();jumpToComponent(commandItems[commandIndex].id);}});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(command.open)command.close();else if(!$('dialog[open]'))openCommand();}});

let holdTimer,holdInterval,holdingPointer=null,archived=false,keyboardArmed=false,suppressHoldClick=false;
const holdButton=$('#hold-button'),holdLabel=$('#hold-label'),holdStatus=$('#hold-status');
function cancelHold(){clearTimeout(holdTimer);clearInterval(holdInterval);holdingPointer=null;holdButton.classList.remove('holding');if(!archived){holdLabel.textContent='长按归档演示项';holdStatus.textContent='已取消 · 长按 2 秒，松开即可中止';}keyboardArmed=false;}
function finishArchive(){suppressHoldClick=holdingPointer!==null;clearTimeout(holdTimer);clearInterval(holdInterval);holdingPointer=null;keyboardArmed=false;archived=true;holdButton.classList.remove('holding');holdLabel.textContent='恢复演示项';holdStatus.textContent='演示项已归档 · 点击即可恢复';}
holdButton.addEventListener('pointerdown',e=>{suppressHoldClick=false;if(archived||holdingPointer!==null||!e.isPrimary||e.button!==0)return;holdingPointer=e.pointerId;holdButton.setPointerCapture(e.pointerId);keyboardArmed=false;holdButton.classList.add('holding');holdLabel.textContent='保持按住…';const start=performance.now();holdStatus.textContent='再按住 2.0 秒';holdInterval=setInterval(()=>holdStatus.textContent=`再按住 ${Math.max(0,2-(performance.now()-start)/1000).toFixed(1)} 秒`,100);holdTimer=setTimeout(finishArchive,2000);});
['pointerup','pointercancel','lostpointercapture'].forEach(type=>holdButton.addEventListener(type,e=>{if(holdingPointer===e.pointerId)cancelHold();}));
holdButton.addEventListener('click',e=>{if(suppressHoldClick){suppressHoldClick=false;return;}if(archived){archived=false;holdLabel.textContent='长按归档演示项';holdStatus.textContent='演示项已恢复';}else if(e.detail===0){if(keyboardArmed)finishArchive();else{keyboardArmed=true;holdLabel.textContent='再次按下确认归档';holdStatus.textContent='Enter / 空格确认，Esc 或移开焦点取消';}}});
holdButton.addEventListener('blur',()=>{if(holdingPointer!==null||keyboardArmed)cancelHold();});
holdButton.addEventListener('keydown',e=>{if(e.repeat&&['Enter',' '].includes(e.key))e.preventDefault();if(e.key==='Escape')cancelHold();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&(holdingPointer!==null||keyboardArmed))cancelHold();});
window.addEventListener('blur',()=>{if(holdingPointer!==null||keyboardArmed)cancelHold();});

const reactions=$$('.feedback-choice');
function selectReaction(index,focus=false){reactions.forEach((b,i)=>{b.setAttribute('aria-checked',i===index);b.tabIndex=i===index?0:-1;});$('#feedback-copy').textContent=`收到「${reactions[index].getAttribute('aria-label')}」，谢谢你的反馈。`;if(focus)reactions[index].focus();}
reactions.forEach((b,i)=>{b.addEventListener('click',()=>selectReaction(i));b.addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'].includes(e.key)){e.preventDefault();selectReaction((i+(['ArrowRight','ArrowDown'].includes(e.key)?1:4))%5,true);}});});

if(new URLSearchParams(location.search).get('collection')==='advanced') filterCards('advanced');
