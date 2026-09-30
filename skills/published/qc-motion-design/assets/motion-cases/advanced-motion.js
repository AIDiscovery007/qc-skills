// Advanced examples share the gallery's motion preference and retain immediate keyboard behavior.
const advancedInstant = noMotion;
const advancedAnimations = new Map();
function settleAdvanced() {advancedAnimations.forEach(a => a.finish());}
$$('[data-advanced] .slide-context,[data-advanced] .slide-panel,[data-advanced] .stagger-list li,[data-advanced] .step-track,[data-advanced] .accordion-content,[data-advanced] .accordion-plus,[data-advanced] .flip-card,[data-advanced] .task-capsule,[data-advanced] .task-progress>span').forEach(el=>el.classList.add('motion-animated'));
function animateDemo(el, frames, options = {}) {
  advancedAnimations.get(el)?.cancel();
  advancedAnimations.delete(el);
  if (advancedInstant()) return;
  const animation = el.animate(frames,{duration:280,easing:'cubic-bezier(.23,1,.32,1)',...options});
  advancedAnimations.set(el,animation);
  animation.finished.then(()=>{if(advancedAnimations.get(el)===animation)advancedAnimations.delete(el);},()=>{});
}
function moveTo(el,target,options={}) {
  const computed=getComputedStyle(el), start={};
  Object.keys(target).forEach(key=>start[key]=computed[key]);
  Object.assign(el.style,target);
  animateDemo(el,[start,...(options.middle||[]),target],options);
}
function expanded(button, content, open) {button.setAttribute('aria-expanded',open);content.setAttribute('aria-hidden',!open);content.inert=!open;}
let popped=false;
$('#pop-toggle').addEventListener('click',()=>{
  popped=!popped;expanded($('#pop-toggle'),$('#pop-object'),popped);
  $('#pop-toggle').textContent=popped?'收起成就':'领取成就';$('#pop-status').textContent=popped?'已领取：新的里程碑':'点击领取，试试连续开关';
  moveTo($('#pop-object'),{transform:popped?'scale(1) translateY(0px)':'scale(.88) translateY(15px)',opacity:popped?'1':'0'},{duration:popped?380:200,middle:popped?[{transform:'scale(1.045) translateY(-2px)',opacity:1,offset:.65},{transform:'scale(.99) translateY(0px)',opacity:1,offset:.86}]:[]});
});
function slide(open) {
  const panel=$('#slide-panel');expanded($('#slide-toggle'),panel,open);panel.classList.toggle('open',open);panel.parentElement.classList.toggle('active',open);$('#slide-toggle').textContent=open?'收起详情':'展开详情';
  if(!open&&panel.contains(document.activeElement))$('#slide-toggle').focus();
}
$('#slide-toggle').addEventListener('click',()=>slide($('#slide-toggle').getAttribute('aria-expanded')!=='true'));
$('#slide-close').addEventListener('click',()=>slide(false));
$('#component-slide').addEventListener('keydown',e=>{if(e.key==='Escape')slide(false);});
let sheetOpen=false,sheetDrag=null;
const sheet=$('#drag-sheet'),sheetHandle=$('#sheet-handle');
function setSheet(open,spring=false,velocity=0) {
  sheetOpen=open;expanded($('#sheet-toggle'),sheet,open);$('#sheet-toggle').textContent=open?'收起底部面板':'打开底部面板';
  if(!open&&sheet.contains(document.activeElement))$('#sheet-toggle').focus();
  if(spring&&!advancedInstant()) {
    const matrix=new DOMMatrixReadOnly(getComputedStyle(sheet).transform),start=matrix.m42;
    sheet.style.transform='translateY(0px)';
    animateDemo(sheet,Array.from({length:31},(_,i)=>({transform:`translateY(${Math.exp(-18*(i/30*.42))*(start*Math.cos(26*(i/30*.42))+(Math.max(-1.5,Math.min(1.5,velocity))*1000+18*start)/26*Math.sin(26*(i/30*.42)))}px)`,offset:i/30})).map((f,i)=>i===30?{transform:'translateY(0px)',offset:1}:f),{duration:420,easing:'linear'});
  } else moveTo(sheet,{transform:open?'translateY(0px)':'translateY(110%)'},{duration:300});
}
$('#sheet-toggle').addEventListener('click',()=>setSheet(!sheetOpen));$('#sheet-close').addEventListener('click',()=>setSheet(false));
sheetHandle.addEventListener('pointerdown',e=>{
  if(!sheetOpen||sheetDrag||!e.isPrimary||e.button!==0)return;
  const current=new DOMMatrixReadOnly(getComputedStyle(sheet).transform).m42;
  advancedAnimations.get(sheet)?.cancel();sheet.style.transform=`translateY(${current}px)`;
  sheetDrag={id:e.pointerId,start:e.clientY-current,last:e.clientY,time:performance.now(),distance:current,velocity:0};sheetHandle.setPointerCapture(e.pointerId);
});
sheetHandle.addEventListener('pointermove',e=>{
  if(!sheetDrag||e.pointerId!==sheetDrag.id)return;
  const now=performance.now(),distance=e.clientY-sheetDrag.start;
  sheetDrag.velocity=(e.clientY-sheetDrag.last)/Math.max(1,now-sheetDrag.time);sheetDrag.time=now;sheetDrag.last=e.clientY;sheetDrag.distance=distance;
  sheet.style.transform=`translateY(${distance<0?-Math.sqrt(-distance)*2:distance}px)`;
});
function releaseSheet(e,cancel=false) {
  if(!sheetDrag||(e&&e.pointerId!==sheetDrag.id))return;
  const d=sheetDrag;sheetDrag=null;if(sheetHandle.hasPointerCapture(d.id))sheetHandle.releasePointerCapture(d.id);
  const dismiss=!cancel&&(d.distance>60||(d.distance>12&&d.velocity>.35&&performance.now()-d.time<100));setSheet(!dismiss,!dismiss,cancel?0:d.velocity);
}
sheetHandle.addEventListener('pointerup',e=>releaseSheet(e));sheetHandle.addEventListener('pointercancel',e=>releaseSheet(e,true));sheetHandle.addEventListener('lostpointercapture',e=>releaseSheet(e,true));
window.addEventListener('blur',()=>releaseSheet(null,true));$('#component-sheet').addEventListener('keydown',e=>{if(e.key==='Escape'){releaseSheet(null,true);setSheet(false);}});
$('#stagger-toggle').addEventListener('click',()=>{const open=!$('#stagger-list').classList.contains('open');expanded($('#stagger-toggle'),$('#stagger-list'),open);$('#stagger-list').classList.toggle('open',open);$('#stagger-toggle').textContent=open?'收起任务顺序':'展开任务顺序';});
$('#shared-toggle').addEventListener('click',()=>{
  const shell=$('#shared-shell'),art=$('#shared-art'),old=shell.getBoundingClientRect(),oldArt=art.getBoundingClientRect();
  advancedAnimations.get(shell)?.cancel();advancedAnimations.get(art)?.cancel();
  const open=shell.classList.toggle('expanded');$('#shared-toggle').setAttribute('aria-expanded',open);$('#shared-toggle').textContent=open?'返回缩略内容':'展开内容';$('.shared-copy',shell).setAttribute('aria-hidden',!open);
  const next=shell.getBoundingClientRect(),nextArt=art.getBoundingClientRect();
  animateDemo(shell,[{transform:`translate(${old.x-next.x}px,${old.y-next.y}px) scale(${old.width/next.width},${old.height/next.height})`},{transform:'none'}],{duration:320});
  animateDemo(art,[{transform:`translate(${oldArt.x-nextArt.x}px,${oldArt.y-nextArt.y}px)`},{transform:'none'}],{duration:320});
});
$('.shared-copy').setAttribute('aria-hidden','true');
let step=0;
function setStep(index){step=Math.max(0,Math.min(2,index));$('#step-track').style.transform=`translateX(${-step*100}%)`;$$('.step-page').forEach((el,i)=>{el.inert=i!==step;el.setAttribute('aria-hidden',i!==step);});$('#step-prev').disabled=step===0;$('#step-next').disabled=step===2;$('#step-status').textContent=`${step+1} / 3`;}
$('#step-prev').addEventListener('click',()=>setStep(step-1));$('#step-next').addEventListener('click',()=>setStep(step+1));
const reorder=$('#reorder-list');
function reorderBoundaries(){const rows=$$('li',reorder);rows.forEach((row,i)=>{$('.reorder-up',row).setAttribute('aria-disabled',i===0);$('.reorder-down',row).setAttribute('aria-disabled',i===rows.length-1);});}
reorder.addEventListener('click',e=>{
  const button=e.target.closest('button');if(!button||button.getAttribute('aria-disabled')==='true')return;
  const row=button.closest('li'),rows=$$('li',reorder),old=new Map(rows.map(el=>[el,el.getBoundingClientRect()]));
  rows.forEach(el=>advancedAnimations.get(el)?.cancel());
  if(button.classList.contains('reorder-up'))reorder.insertBefore(row,row.previousElementSibling);else reorder.insertBefore(row.nextElementSibling,row);
  const next=new Map(rows.map(el=>[el,el.getBoundingClientRect()]));
  rows.forEach(el=>animateDemo(el,[{transform:`translateY(${old.get(el).y-next.get(el).y}px)`},{transform:'translateY(0px)'}]));
  button.focus({preventScroll:true});reorderBoundaries();$('#reorder-status').textContent=$$('strong',reorder).map(el=>el.textContent).join(' → ');
});reorderBoundaries();
let accordionOpen=false;
function measureAccordion(){if(accordionOpen)$('#accordion-content').style.height=$('#accordion-copy').getBoundingClientRect().height+'px';}
$('#accordion-toggle').addEventListener('click',()=>{accordionOpen=!accordionOpen;expanded($('#accordion-toggle'),$('#accordion-content'),accordionOpen);$('#accordion-content').style.height=accordionOpen?$('#accordion-copy').getBoundingClientRect().height+'px':'0px';});
const accordionObserver=new ResizeObserver(measureAccordion);accordionObserver.observe($('#accordion-copy'));
$('#flip-toggle').addEventListener('click',()=>{const open=$('#flip-card').classList.toggle('flipped');$('#flip-toggle').setAttribute('aria-pressed',open);$('#flip-toggle').textContent=open?'返回正面 ↶':'查看背面 ↻';$('.flip-front').inert=open;$('.flip-front').setAttribute('aria-hidden',open);$('.flip-back').inert=!open;$('.flip-back').setAttribute('aria-hidden',!open);});
let taskTimer=null,taskStart=0;
function taskState(state,title,detail){$('#task-capsule').dataset.state=state;$('#task-title').textContent=title;$('#task-detail').textContent=detail;$('.task-mark').textContent=state==='done'?'✓':state==='running'?'↓':'↗';}
function cancelTask(){if(taskTimer===null)return;clearInterval(taskTimer);taskTimer=null;taskState('idle','导出已取消','没有生成或下载任何文件');$('#task-start').disabled=false;$('#task-cancel').disabled=true;$('#task-start').textContent='重新模拟导出';$('#task-status').textContent='模拟导出已取消';}
$('#task-start').addEventListener('click',()=>{
  if(taskTimer!==null)return;taskStart=performance.now();taskState('running','正在整理笔记','已处理 0%');$('#task-start').disabled=true;$('#task-cancel').disabled=false;$('#task-progress').setAttribute('aria-valuenow','0');$('#task-progress>span').style.transform='scaleX(0)';$('#task-status').textContent='开始模拟导出';
  taskTimer=setInterval(()=>{const progress=Math.min(100,Math.round((performance.now()-taskStart)/12));$('#task-progress').setAttribute('aria-valuenow',progress);$('#task-progress>span').style.transform=`scaleX(${progress/100})`;$('#task-detail').textContent=`已处理 ${progress}%`;
    if(progress===100){clearInterval(taskTimer);taskTimer=null;taskState('done','模拟导出完成','3 份笔记已整理 · 无实际文件');$('#task-start').disabled=false;$('#task-start').textContent='再次播放';$('#task-cancel').disabled=true;$('#task-status').textContent='模拟导出完成，没有实际下载';animateDemo($('.task-mark'),[{transform:'scale(.6)',opacity:0},{transform:'scale(1.12)',opacity:1,offset:.7},{transform:'scale(1)',opacity:1}],{duration:280});}
  },80);
});
$('#task-cancel').addEventListener('click',cancelTask);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelTask();releaseSheet(null,true);settleAdvanced();}});
$$('.filter').forEach(button=>button.addEventListener('click',()=>{if($('#component-sequence').hidden)cancelTask();if($('#component-sheet').hidden)releaseSheet(null,true);}));
