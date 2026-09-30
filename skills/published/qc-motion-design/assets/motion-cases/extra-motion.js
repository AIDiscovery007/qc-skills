const extraCleanup=new Map();
function onExtraStop(element,stop){extraCleanup.set(element,stop);}
function stopExtras(root){extraCleanup.forEach((stop,element)=>{if(root.contains(element))stop();});root.getAnimations({subtree:true}).forEach(finishMotion);}
function selectMode(card,id,focus=false){
 const previous=$('.variant-panel:not([hidden])',card);
 if(previous?.dataset.mode===id)return;
 if(previous){stopExtras(previous);if(previous.contains($('#task-capsule')))cancelTask();}
 $$('[role="tab"]',card).forEach(tab=>{const active=tab.dataset.mode===id;tab.setAttribute('aria-selected',active);tab.tabIndex=active?0:-1;if(active&&focus)tab.focus();});
 $$('.variant-panel',card).forEach(panel=>{panel.hidden=panel.dataset.mode!==id;panel.inert=panel.hidden;});
}
$$('.variant-tabs[role="tablist"]').forEach(list=>{
 const card=list.closest('.component-card'),tabs=$$('[role="tab"]',list);
 list.addEventListener('click',e=>{const tab=e.target.closest('[role="tab"]');if(tab)selectMode(card,tab.dataset.mode);});
 list.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const index=tabs.indexOf(document.activeElement);const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(index+(e.key==='ArrowLeft'?-1:1)+tabs.length)%tabs.length;selectMode(card,tabs[next].dataset.mode,true);});
});

// Decode real image bytes before replacing the placeholder. An invalid resource tests failure.
const loadImage=$('#progressive-image'),imageState=$('#image-state');
let imageRequest=null,imageGeneration=0,imageURL=null;
async function loadLandscape(fail=false){
 imageRequest?.abort();const generation=++imageGeneration,controller=new AbortController();imageRequest=controller;
 loadImage.classList.remove('ready');loadImage.hidden=true;imageState.textContent='正在载入…';
 try{
  const response=await fetch(fail?'data:image/svg+xml,invalid-svg':'assets/motion-landscape.svg',{signal:controller.signal});
  if(!response.ok)throw new Error('load failed');
  const url=URL.createObjectURL(await response.blob()),decoded=new Image();decoded.src=url;
  try{await decoded.decode();}catch(error){URL.revokeObjectURL(url);throw error;}
  if(generation!==imageGeneration){URL.revokeObjectURL(url);return;}
  if(imageURL)URL.revokeObjectURL(imageURL);imageURL=url;loadImage.src=url;loadImage.hidden=false;loadImage.classList.add('ready');
  animateDemo(loadImage,[{opacity:0},{opacity:1}],{duration:260});imageState.textContent='图片已就绪';$('#image-load').textContent='重新载入';
 }catch(error){if(generation===imageGeneration)imageState.textContent=error.name==='AbortError'?'载入已取消':'载入失败，请重试';}
 finally{if(generation===imageGeneration)imageRequest=null;}
}
$('#image-load').addEventListener('click',()=>loadLandscape());$('#image-fail').addEventListener('click',()=>loadLandscape(true));
onExtraStop(loadImage,()=>{if(imageRequest){imageGeneration++;imageRequest.abort();imageRequest=null;imageState.textContent='载入已取消';}});
$('#compare-range').addEventListener('input',e=>{const value=Number(e.target.value);$('.compare-after').style.clipPath=`inset(0 ${100-value}% 0 0)`;$('.compare-divider').style.left=value+'%';$('#compare-value').textContent=`显示 ${value}%`;});
$('#line-toggle').addEventListener('click',()=>{const on=$('#draw-path').classList.toggle('drawn');$('#line-toggle').setAttribute('aria-pressed',on);$('#line-toggle').textContent=on?'收回路线':'描绘路线';});
$('#error-form').addEventListener('submit',e=>{
 e.preventDefault();const input=$('#demo-code'),valid=/^\d{4}$/.test(input.value);input.setAttribute('aria-invalid',!valid);$('#code-status').textContent=valid?'校验通过':'请输入完整的 4 位数字';
 if(!valid){const current=getComputedStyle(input).transform;animateDemo(input,[{transform:current},{transform:'translateX(-6px)'},{transform:'translateX(5px)'},{transform:'translateX(-3px)'},{transform:'translateX(0px)'}],{duration:260,easing:'ease-out'});}
});
$('#demo-code').addEventListener('input',()=>{$('#demo-code').removeAttribute('aria-invalid');$('#code-status').textContent='本地校验，不提交数据';});
const scrollDemo=$('#scroll-demo');
function updateScroll(){const progress=scrollDemo.scrollTop/Math.max(1,scrollDemo.scrollHeight-scrollDemo.clientHeight);$('#scroll-traveler').style.left=`${progress*100}%`;$('#scroll-percent').textContent=Math.round(progress*100)+'%';}
scrollDemo.addEventListener('scroll',updateScroll,{passive:true});
const parallax=$('#parallax-scroll');
function updateParallax(){const progress=userReduced?0:parallax.scrollTop/Math.max(1,parallax.scrollHeight-parallax.clientHeight);$('.parallax-sun').style.transform=`translateY(${-progress*18}px)`;$('.parallax-far').style.transform=`translateY(${-progress*36}px)`;$('.parallax-near').style.transform=`translateY(${-progress*90}px)`;}
parallax.addEventListener('scroll',updateParallax,{passive:true});

let numberFrame=0,numberValue=1280,numberTarget=1280;
function drawNumber(){ $('#number-value').textContent=Math.round(numberValue).toLocaleString('en-US'); }
function settleNumber(){cancelAnimationFrame(numberFrame);numberFrame=0;numberValue=numberTarget;drawNumber();}
$$('[data-number]').forEach(button=>button.addEventListener('click',()=>{
 cancelAnimationFrame(numberFrame);numberTarget=Number(button.dataset.number);$('#number-target').textContent=`目标 ${numberTarget.toLocaleString('en-US')} 次`;
 $$('[data-number]').forEach(b=>b.setAttribute('aria-pressed',b===button));if(noMotion()){settleNumber();return;}
 const start=numberValue,time=performance.now();function tick(now){const t=Math.min(1,(now-time)/520);numberValue=start+(numberTarget-start)*(1-(1-t)**3);drawNumber();numberFrame=t<1?requestAnimationFrame(tick):0;}numberFrame=requestAnimationFrame(tick);
}));onExtraStop($('#number-value'),settleNumber);

// Inertia is time-based and stops at the visible map bounds; direct dragging remains immediate.
const panViewport=$('#pan-viewport'),panWorld=$('#pan-world');
let panX=0,panY=0,panDrag=null,panFrame=0;
function drawPan(){const boundX=Math.max(0,(540-panViewport.clientWidth)/2),boundY=Math.max(0,(360-panViewport.clientHeight)/2);panX=Math.max(-boundX,Math.min(boundX,panX));panY=Math.max(-boundY,Math.min(boundY,panY));panWorld.style.transform=`translate(${panX}px,${panY}px)`;}
function stopPan(){cancelAnimationFrame(panFrame);panFrame=0;if(panDrag){const id=panDrag.id;panDrag=null;if(panViewport.hasPointerCapture(id))panViewport.releasePointerCapture(id);}}
panViewport.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0||panDrag)return;cancelAnimationFrame(panFrame);panDrag={id:e.pointerId,x:e.clientX,y:e.clientY,time:performance.now(),vx:0,vy:0};panViewport.setPointerCapture(e.pointerId);});
panViewport.addEventListener('pointermove',e=>{if(!panDrag||panDrag.id!==e.pointerId)return;const now=performance.now(),dt=Math.max(1,now-panDrag.time),dx=e.clientX-panDrag.x,dy=e.clientY-panDrag.y;panX+=dx;panY+=dy;panDrag={id:e.pointerId,x:e.clientX,y:e.clientY,time:now,vx:dx/dt,vy:dy/dt};drawPan();});
function releasePan(e,cancel=false){
 if(!panDrag||e.pointerId!==panDrag.id)return;const drag=panDrag;stopPan();if(cancel||noMotion()||performance.now()-drag.time>100)return;
 let vx=Math.max(-2,Math.min(2,drag.vx)),vy=Math.max(-2,Math.min(2,drag.vy)),last=performance.now();
 function glide(now){const dt=Math.min(32,now-last);last=now;vx*=Math.exp(-dt/180);vy*=Math.exp(-dt/180);const nextX=panX+vx*dt,nextY=panY+vy*dt;panX=nextX;panY=nextY;drawPan();if(panX!==nextX)vx=0;if(panY!==nextY)vy=0;panFrame=Math.hypot(vx,vy)>.015?requestAnimationFrame(glide):0;}
 panFrame=requestAnimationFrame(glide);
}
panViewport.addEventListener('pointerup',e=>releasePan(e));['pointercancel','lostpointercapture'].forEach(type=>panViewport.addEventListener(type,e=>releasePan(e,true)));
panViewport.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();stopPan();panX+=e.key==='ArrowLeft'?30:e.key==='ArrowRight'?-30:0;panY+=e.key==='ArrowUp'?30:e.key==='ArrowDown'?-30:0;drawPan();});
$('#pan-reset').addEventListener('click',()=>{stopPan();const from=getComputedStyle(panWorld).transform;panX=panY=0;drawPan();animateDemo(panWorld,[{transform:from},{transform:'translate(0px,0px)'}]);});
panViewport.addEventListener('pointerdown',()=>{const current=new DOMMatrixReadOnly(getComputedStyle(panWorld).transform);advancedAnimations.get(panWorld)?.cancel();panX=current.m41;panY=current.m42;drawPan();});
onExtraStop(panWorld,stopPan);new ResizeObserver(()=>{if(panViewport.clientWidth)drawPan();}).observe(panViewport);

// The mock source emits chunks; rendering never adds a second artificial typing delay.
let streamTimer=null,streamPart=0;
const streamChunks=['好的，我们先明确这次交互的目标。','\n\n用户每次输入，都应得到及时回应。','内容随数据到达，界面立即显示。','\n\n当用户取消时，停止后续更新。'];
function stopStream(){if(streamTimer!==null){clearTimeout(streamTimer);streamTimer=null;$('#stream-state').textContent='接收已停止';}$('#stream-start').disabled=false;if(document.activeElement===$('#stream-cancel'))$('#stream-start').focus();$('#stream-cancel').disabled=true;}
function emitChunk(){streamTimer=null;$('#stream-output').textContent+=streamChunks[streamPart++];$('#stream-state').textContent=`已接收 ${streamPart} / ${streamChunks.length} 段`;if(streamPart<streamChunks.length)streamTimer=setTimeout(emitChunk,520+streamPart*90);else{$('#stream-state').textContent='接收完成';$('#stream-start').disabled=false;$('#stream-cancel').disabled=true;}}
$('#stream-start').addEventListener('click',()=>{stopStream();streamPart=0;$('#stream-output').textContent='';$('#stream-state').textContent='等待数据…';$('#stream-start').disabled=true;$('#stream-cancel').disabled=false;streamTimer=setTimeout(emitChunk,400);});
$('#stream-cancel').addEventListener('click',stopStream);onExtraStop($('#stream-output'),stopStream);

const rippleButton=$('#ripple-button');
rippleButton.addEventListener('click',e=>{
 $('#ripple-status').textContent='点击已接收';if(noMotion())return;
 const rect=rippleButton.getBoundingClientRect(),size=Math.hypot(rect.width,rect.height)*2,x=e.detail?e.clientX-rect.left:rect.width/2,y=e.detail?e.clientY-rect.top:rect.height/2;
 const ink=document.createElement('i');ink.className='ripple-ink';ink.style.cssText=`width:${size}px;height:${size}px;left:${x-size/2}px;top:${y-size/2}px`;rippleButton.append(ink);
 const animation=ink.animate([{transform:'scale(0)',opacity:.7},{transform:'scale(1)',opacity:0}],{duration:480,easing:'cubic-bezier(.23,1,.32,1)'});animation.finished.then(()=>ink.remove(),()=>ink.remove());
});
onExtraStop(rippleButton,()=>$$('.ripple-ink',rippleButton).forEach(el=>el.remove()));
const tiltCard=$('#tilt-card');let tiltSide=1;
function resetTilt(){tiltCard.style.transform='none';}
$('.tilt-scene').addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||noMotion())return;const rect=e.currentTarget.getBoundingClientRect(),x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;tiltCard.style.transform=`rotateX(${-y*18}deg) rotateY(${x*22}deg)`;});
$('.tilt-scene').addEventListener('pointerleave',resetTilt);$('#tilt-reset').addEventListener('click',resetTilt);$('#tilt-turn').addEventListener('click',()=>{tiltSide*=-1;tiltCard.style.transform=userReduced?'none':`rotateY(${tiltSide*12}deg) rotateX(6deg)`;});onExtraStop(tiltCard,resetTilt);

const dragList=$('#drag-order-list');let orderDrag=null;
function clearDrop(){ $$('li',dragList).forEach(row=>row.classList.remove('drop-before','drop-after')); }
function announceOrder(){ $('#drag-order-state').textContent=$$('strong',dragList).map(el=>el.textContent).join(' → '); }
function finishOrder(cancel=false){
 if(!orderDrag)return;const {row,handle,id,target}=orderDrag;orderDrag=null;
 const rows=$$('li',dragList),before=new Map(rows.map(el=>[el,el.getBoundingClientRect()]));
 const others=rows.filter(el=>el!==row);if(!cancel)dragList.insertBefore(row,others[target]||null);
 row.classList.remove('dragging');row.style.transform='';clearDrop();if(handle.hasPointerCapture(id))handle.releasePointerCapture(id);
 const after=new Map(rows.map(el=>[el,el.getBoundingClientRect()]));rows.forEach(el=>animateDemo(el,[{transform:`translateY(${before.get(el).y-after.get(el).y}px)`},{transform:'none'}]));
 $('#drag-order-state').textContent=cancel?'已取消，顺序未改变':$$('strong',dragList).map(el=>el.textContent).join(' → ');
}
dragList.addEventListener('pointerdown',e=>{const handle=e.target.closest('.drag-grip');if(!handle||!e.isPrimary||e.button!==0||orderDrag)return;const row=handle.closest('li');$$('li',dragList).forEach(el=>{advancedAnimations.get(el)?.finish();});orderDrag={id:e.pointerId,row,handle,start:e.clientY,target:$$('li',dragList).indexOf(row)};row.classList.add('dragging');handle.setPointerCapture(e.pointerId);});
dragList.addEventListener('pointermove',e=>{if(!orderDrag||orderDrag.id!==e.pointerId)return;const {row}=orderDrag,others=$$('li',dragList).filter(el=>el!==row),rects=others.map(el=>el.getBoundingClientRect());orderDrag.target=rects.filter(rect=>e.clientY>rect.top+rect.height/2).length;row.style.transform=`translateY(${e.clientY-orderDrag.start}px)`;clearDrop();if(others[orderDrag.target])others[orderDrag.target].classList.add('drop-before');else others.at(-1)?.classList.add('drop-after');});
dragList.addEventListener('pointerup',e=>{if(orderDrag?.id===e.pointerId)finishOrder();});['pointercancel','lostpointercapture'].forEach(type=>dragList.addEventListener(type,e=>{if(orderDrag?.id===e.pointerId)finishOrder(true);}));
dragList.addEventListener('keydown',e=>{if(e.key==='Escape'){finishOrder(true);return;}const handle=e.target.closest('.drag-grip');if(!handle||!['ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();finishOrder(true);const row=handle.closest('li');if(e.key==='ArrowUp'&&row.previousElementSibling)dragList.insertBefore(row,row.previousElementSibling);if(e.key==='ArrowDown'&&row.nextElementSibling)dragList.insertBefore(row.nextElementSibling,row);handle.focus();announceOrder();});onExtraStop(dragList,()=>finishOrder(true));

const morphPlay=[[30,20,50,32,50,68,30,80],[50,32,80,50,80,50,50,68]],morphPause=[[30,20,44,20,44,80,30,80],[58,20,72,20,72,80,58,80]];
let morphPoints=morphPlay.map(p=>[...p]),morphFrame=0,morphOn=false;
function drawMorph(){['.morph-left','.morph-right'].forEach((selector,i)=>$(selector).setAttribute('points',morphPoints[i].join(' ')));}
function settleMorph(){cancelAnimationFrame(morphFrame);morphFrame=0;morphPoints=(morphOn?morphPause:morphPlay).map(p=>[...p]);drawMorph();}
$('#morph-toggle').addEventListener('click',()=>{cancelAnimationFrame(morphFrame);morphOn=!morphOn;$('#morph-toggle').setAttribute('aria-pressed',morphOn);$('#morph-toggle').setAttribute('aria-label',morphOn?'暂停':'播放');$('#morph-state').textContent=morphOn?'播放中 · 图标演示':'已暂停 · 图标演示';if(noMotion()){settleMorph();return;}const from=morphPoints.map(p=>[...p]),to=morphOn?morphPause:morphPlay,time=performance.now();function tick(now){const t=Math.min(1,(now-time)/240),p=t*t*(3-2*t);morphPoints=from.map((points,i)=>points.map((v,j)=>v+(to[i][j]-v)*p));drawMorph();morphFrame=t<1?requestAnimationFrame(tick):0;}morphFrame=requestAnimationFrame(tick);});onExtraStop($('#morph-toggle'),settleMorph);
$('#crossfade-button').addEventListener('click',()=>{const button=$('#crossfade-button'),on=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',on);$('#crossfade-state').textContent=on?'已收藏这条笔记':'已取消收藏';});
let waitState='idle';
function setWaiting(state){
 if((state==='done'||state==='cancelled')&&waitState!=='running')return;
 waitState=state;const running=state==='running',start=$('#wait-start'),done=$('#wait-done'),cancel=$('#wait-cancel');
 const startedHere=running&&document.activeElement===start,restoreFocus=!running&&(document.activeElement===done||document.activeElement===cancel);
 $('.waiting-scene').dataset.state=state;$('#wait-spinner').classList.toggle('running',running);
 start.hidden=running;start.disabled=running;done.hidden=cancel.hidden=!running;done.disabled=cancel.disabled=!running;
 start.textContent=state==='done'?'再次运行':state==='cancelled'?'重新开始':'开始等待';
 $('#wait-state').textContent=running?'正在等待响应…':state==='done'?'任务已完成':state==='cancelled'?'任务已取消':'等待开始';
 $('#wait-detail').textContent=running?'本地模拟 · 等待结果，可随时取消':state==='done'?'本次模拟已完成':state==='cancelled'?'本次模拟已停止':'本地模拟 · 点击开始';
 if(startedHere)done.focus({preventScroll:true});else if(restoreFocus)start.focus({preventScroll:true});
 if(state==='done')animateDemo($('.wait-check'),[{strokeDashoffset:1},{strokeDashoffset:0}],{duration:220});
}
$('#wait-start').addEventListener('click',()=>setWaiting('running'));$('#wait-done').addEventListener('click',()=>setWaiting('done'));$('#wait-cancel').addEventListener('click',()=>setWaiting('cancelled'));onExtraStop($('#wait-spinner'),()=>{if($('#wait-spinner').classList.contains('running'))setWaiting('cancelled');});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting||entry.target.dataset.revealed)return;entry.target.dataset.revealed='true';animateDemo(entry.target,[{transform:'translateY(18px)',opacity:0},{transform:'none',opacity:1}],{duration:300});}),{root:$('#reveal-scroll'),threshold:.35});$$('.reveal-item').forEach(el=>revealObserver.observe(el));
onExtraStop($('#reveal-scroll'),()=>$$('.reveal-item').forEach(el=>delete el.dataset.revealed));

function syncExtraMotion(){
 if(userReduced){settleNumber();settleMorph();stopPan();resetTilt();}
 updateParallax();
}
$('#motion-toggle').addEventListener('click',syncExtraMotion);
document.addEventListener('keydown',e=>{if(e.target.closest('#component-number'))settleNumber();if(e.target.closest('#component-sequence'))settleMorph();if(e.target.closest('#component-pan'))stopPan();},true);
$$('.filter').forEach(button=>button.addEventListener('click',()=>$$('.component-card[hidden]').forEach(stopExtras)));
const cardVisibility=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('extra-offscreen',!entry.isIntersecting)));$$('.component-card').forEach(card=>cardVisibility.observe(card));
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopExtras($('#component-grid'));});
window.addEventListener('blur',()=>{stopPan();finishOrder(true);});
window.addEventListener('pagehide',()=>{stopExtras($('#component-grid'));if(imageURL)URL.revokeObjectURL(imageURL);revealObserver.disconnect();cardVisibility.disconnect();});
