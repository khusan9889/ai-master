/* AI Master — сайт. Языки: uz (по умолчанию), ru, en. */
'use strict';

/* ================== ICONS ================== */
const IP={
 check:'<path d="M20 6 9 17l-5-5"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',back:'<path d="M19 12H5M11 18l-6-6 6-6"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 play:'<path d="M7 4.5v15l12-7.5z"/>',pause:'<path d="M7 5v14M17 5v14"/>',spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',plus:'<path d="M12 5v14M5 12h14"/>',down:'<path d="m6 9 6 6 6-6"/>',
 book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/>',
 award:'<circle cx="12" cy="8" r="6"/><path d="M8.2 13.4 7 22l5-3 5 3-1.2-8.6"/>',
 msg:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',warn:'<path d="M12 3 2 21h20z"/><path d="M12 10v4M12 17h.01"/>',
 bulb:'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z"/>',
 phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
 send:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
 sprout:'<path d="M12 21v-9"/><path d="M12 12c0-4.4 3-7 8-7 0 4.4-3 7-8 7z"/><path d="M12 14c0-3.3-2.6-5.5-7-5.5 0 3.3 2.6 5.5 7 5.5z"/>',
 briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
 trend:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',code:'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
 cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
 pen:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
 chart:'<path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/>',
 bot:'<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 13v1M15 13v1M9 17h6"/>',
 layers:'<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
 read:'<path d="M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z"/>',
 terminal:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
 users:'<path d="M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"/><circle cx="9" cy="7" r="4"/><path d="M22 20v-1a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
 signal:'<path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
 mobile:'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
 refresh:'<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 vol:'<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
 mute:'<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/>',
 telegram:'<path d="m21 4-18 7.5 6 2 2 6 3.5-4.5 5 3.5z"/><path d="m9 13.5 8-6"/>'
};
const ic=(n,cls='ico',sw=1.75)=>`<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IP[n]||IP.layers}</svg>`;
const LOGO=(s=32)=>`<svg width="${s}" height="${s}" viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="30" fill="#FF6B1A"/><path d="M32 42 L56 62 L32 82" fill="none" stroke="#111318" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M64 84 H86" fill="none" stroke="#111318" stroke-width="12" stroke-linecap="round"/></svg>`;

/* ================== LANGUAGE ================== */
const LANGS=['uz','ru','en'];
let LANG=(()=>{const q=new URLSearchParams(location.search).get('lang');if(LANGS.includes(q))return q;try{const s=localStorage.getItem('am_lang');if(LANGS.includes(s))return s}catch(e){}return 'uz'})();
try{localStorage.setItem('am_lang',LANG)}catch(e){}
document.documentElement.lang=LANG;
const LI=()=>LANGS.indexOf(LANG);
function pluralRu(n,forms){const [a,b,c]=forms;n=Math.abs(n)%100;const n1=n%10;if(n>10&&n<20)return c;if(n1>1&&n1<5)return b;if(n1===1)return a;return c}
function t(k,vars){const e=I18N[k];let s=e?(e[LI()]||e[1]):k;
 if(s.includes('|')&&vars&&'n' in vars){const f=s.split('|');s=LANG==='ru'?pluralRu(vars.n,f):LANG==='en'?(vars.n===1?f[0]:f[1]):f[0]}
 if(vars)for(const[a,b]of Object.entries(vars))s=s.split('{'+a+'}').join(b);return s}
const L=v=>v&&typeof v==='object'?(v[LANG]||v.ru||v.uz||v.en||''):(v||'');
const CTR=()=>CONTRACTS[LANG]||CONTRACTS.ru;

/* ================== DATA ================== */
const COVERS={a:['#F2601A','#B2321A'],b:['#3046C5','#18236E'],c:['#2A2F3D','#111318'],d:['#13804F','#0A4A2F'],e:['#5B3FD1','#2D1C80'],f:['#C2571C','#6E2D0E']};
const AUD={beginner:'sprout',work:'briefcase',business:'trend',dev:'code'};
const AUD_ICON={beginner:'cpu',work:'pen',business:'trend',dev:'code'};
const TOOLS=['ChatGPT','Claude','Gemini','Midjourney','Copilot','n8n','Telegram','Python','Excel','Google Sheets','Notion','Perplexity'];
let COURSES=[],PLANS=[],SETTINGS={};
const fmt=n=>Number(n).toLocaleString('ru-RU').replace(/ |,/g,' ')+' '+t('sum');
const course=id=>COURSES.find(c=>c.id===id);
const allLessons=c=>c.modules.flatMap(m=>m.l);
function findLesson(lid){for(const c of COURSES)for(const l of allLessons(c))if(l.id===lid)return {c,l};return null}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
const bestPlan=()=>PLANS.find(p=>p.best)||PLANS[0];
const minMonthly=()=>Math.round(Math.min(...PLANS.map(p=>p.price/p.months)));
const level=c=>t('lvl_'+(c.level||'beginner'));
const totalLessons=()=>COURSES.reduce((a,c)=>a+allLessons(c).length,0);

/* ================== LOCAL STATE ================== */
const KEY='aimaster_v3';
let S={done:{},quiz:{},sandboxRuns:{day:'',n:0},mentor:{day:'',n:0}};
try{const raw=localStorage.getItem(KEY);if(raw)S=Object.assign(S,JSON.parse(raw))}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
const today=()=>new Date().toISOString().slice(0,10);
const isOpen=(c,l)=>(l&&l.free)||c.price===0;
const viewed=()=>{try{return JSON.parse(sessionStorage.getItem('am_viewed')||'[]')}catch(e){return []}};
function addViewed(id){try{const v=viewed().filter(x=>x!==id);v.unshift(id);sessionStorage.setItem('am_viewed',JSON.stringify(v.slice(0,8)))}catch(e){}}
// курс, на странице которого сейчас находится посетитель
function ctxCourse(){const r=location.hash.slice(1);if(r.startsWith('course-'))return r.slice(7);if(r.startsWith('lesson-')){const f=findLesson(r.slice(7));return f?f.c.id:''}return ''}

/* ================== ANALYTICS ================== */
const T=(()=>{
 const rid=()=>(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)).replace(/-/g,'').slice(0,24);
 const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};
 const ss=(k,v)=>{try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){return null}};
 let vid=ls('am_v');if(!vid){vid=rid();ls('am_v',vid)}
 let sess=null;try{sess=JSON.parse(ss('am_s')||'null')}catch(e){}
 const q=new URLSearchParams(location.search);
 const hasUtm=['utm_source','fbclid','gclid','yclid'].some(k=>q.get(k));
 if(!sess||Date.now()-sess.last>30*60e3||hasUtm){
  sess={id:rid(),last:Date.now(),pings:0,c:{us:q.get('utm_source')||'',um:q.get('utm_medium')||'',uc:q.get('utm_campaign')||'',ux:q.get('utm_content')||'',ut:q.get('utm_term')||'',fb:q.get('fbclid')?1:0,gc:q.get('gclid')?1:0,yc:q.get('yclid')?1:0,ref:document.referrer||''}};
 }
 const persist=()=>{sess.last=Date.now();ss('am_s',JSON.stringify(sess))};persist();
 let queue=[];
 function flush(){if(!queue.length)return;const body=JSON.stringify({v:vid,s:sess.id,c:sess.c,l:LANG,e:queue});queue=[];
  if(!(navigator.sendBeacon&&navigator.sendBeacon('/api/t',new Blob([body],{type:'text/plain'}))))fetch('/api/t',{method:'POST',body,headers:{'Content-Type':'text/plain'},keepalive:true}).catch(()=>{})}
 function ev(t,n,d,p){queue.push({t,n:n||'',d:d||{},p:p??(location.hash.slice(1)||'home'),ts:Date.now()});persist();if(queue.length>=10)flush()}
 setInterval(flush,3000);
 addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flush()});
 addEventListener('pagehide',flush);
 setInterval(()=>{if(document.visibilityState==='visible'&&sess.pings<40){sess.pings++;ev('ping')}},30000);
 return {ev,flush,ctx:()=>({v:vid,s:sess.id,c:sess.c})};
})();
const PX={
 init(s){
  if(s.metaPixelId){!function(f,b,e,v,n,t2,s2){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t2=b.createElement(e);t2.async=!0;t2.src=v;s2=b.getElementsByTagName(e)[0];s2.parentNode.insertBefore(t2,s2)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',s.metaPixelId)}
  if(s.yandexMetrikaId){(function(m,e,t2,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t2),a=e.getElementsByTagName(t2)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(+s.yandexMetrikaId,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true,defer:true})}
  if(s.gaId){const g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id='+s.gaId;document.head.appendChild(g);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',s.gaId,{send_page_view:false})}
 },
 page(){if(window.fbq)fbq('track','PageView');if(window.ym&&SETTINGS.yandexMetrikaId)ym(+SETTINGS.yandexMetrikaId,'hit',location.href);if(window.gtag&&SETTINGS.gaId)gtag('event','page_view',{page_location:location.href})},
 goal(name,data={}){if(window.fbq){if(name==='lead')fbq('track','Lead',data);else if(name==='subscribe'||name==='buy_course')fbq('track','InitiateCheckout',data);else fbq('trackCustom',name,data)}
  if(window.ym&&SETTINGS.yandexMetrikaId)ym(+SETTINGS.yandexMetrikaId,'reachGoal',name,data);if(window.gtag&&SETTINGS.gaId)gtag('event',name==='lead'?'generate_lead':name,data)}
};

/* ================== UI helpers ================== */
function toast(msg){document.querySelectorAll('.toast').forEach(x=>x.remove());const el=document.createElement('div');el.className='toast';el.setAttribute('role','status');el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),3400)}
function modal(html){document.getElementById('layer').innerHTML=`<div class="modal-bg" data-act="closeModal"><div class="modal" role="dialog" aria-modal="true"><button class="iconbtn x" data-act="closeModal" aria-label="${t('close')}">${ic('x')}</button>${html}</div></div>`;setTimeout(()=>document.querySelector('.modal input[name=name]')?.focus(),60)}
function closeModal(){document.getElementById('layer').innerHTML=''}
function go(r){if(location.hash==='#'+r)render();else location.hash=r}
function cover(c,h=150){const [a,b]=COVERS[c.cover]||COVERS.a;return `<div class="ccover" style="background:linear-gradient(140deg,${a},${b});height:${h}px">${c.isNew?`<span class="nw">${t('new')}</span>`:''}<span class="lb">${esc(L(c.topic))}</span><span class="gl">${ic(c.icon||AUD_ICON[c.audience]||'layers')}</span></div>`}
function priceTag(c){return c.price===0?`<span class="price free">${t('free')}</span>`:`<span class="price">${fmt(c.price)}</span>`}
function courseCard(c,i=0){const n=allLessons(c).length;return `<a class="card ccard rv" style="--d:${i*90}ms" href="#course-${c.id}">${cover(c)}
 <div class="body"><h3>${esc(L(c.title))}</h3><p class="desc">${esc(L(c.desc))}</p>
 <div class="meta"><span>${ic('book','ico s')} ${t('n_lessons',{n})}</span><span>${ic('clock','ico s')} ${t('hours',{n:c.hours})}</span><span>${ic('signal','ico s')} ${level(c)}</span></div>
 <div class="row between" style="margin-top:auto;padding-top:10px">${priceTag(c)}<span class="arr">${ic('arrow')}</span></div></div></a>`}
function fmtPhone(v){let d=v.replace(/\D/g,'');if(!d.startsWith('998'))d='998'+d.replace(/^998?/,'');d=d.slice(0,12);return '+'+[d.slice(0,3),d.slice(3,5),d.slice(5,8),d.slice(8,10),d.slice(10,12)].filter(Boolean).join(' ')}
const cta=(id,item,place)=>`data-cta="${id}" data-item="${esc(item||'')}" data-place="${place}"`;
const H=(tag,k,cls='')=>`<${tag} class="${cls}">${t(k)}</${tag}>`;

/* ---- заявки ---- */
function leadForm(o){o=Object.assign({type:'consult',cta:t('f_send'),fields:[]},o);
 return `<form class="col" data-submit="lead" style="gap:14px">
  <input type="hidden" name="type" value="${o.type}"><input type="hidden" name="item" value="${esc(o.item||'')}">
  <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
  <label class="f">${t('f_name')}<input name="name" autocomplete="name" required placeholder="${esc(t('f_name_ph'))}"></label>
  <label class="f">${t('f_phone')}<input name="phone" type="tel" inputmode="tel" autocomplete="tel" data-phone value="+998 " required></label>
  ${o.fields.includes('company')?`<label class="f">${t('f_company')}<input name="company" required></label><label class="f">${t('f_size')}<select name="size"><option>${t('f_size1')}</option><option>10–50</option><option>50–200</option><option>${t('f_size4')}</option></select></label>`:''}
  ${o.fields.includes('message')?`<label class="f">${t('f_msg')}<textarea name="message" rows="3" placeholder="${esc(t('f_optional'))}"></textarea></label>`:''}
  <button class="btn lg block">${esc(o.cta)}</button>
  <p class="tiny muted" style="text-align:center">${t('f_note')} <a href="#privacy">${t('privacy')}</a></p></form>`}
function leadSuccess(){return `<div class="success"><div class="ok">${ic('check','ico',2.5)}</div><h3 style="font-size:22px">${t('ok_t')}</h3><p class="muted">${t('ok_p')}</p></div>`}
function openLead(type,item){
 const p=PLANS.find(x=>x.id===item);const c=course(item)||course(ctxCourse());let h,sub,fields=[],btn=t('f_send');
 if(type==='plan'&&p){h=t('plan_h');sub=t('plan_sub',{n:p.months,p:fmt(p.price)})}
 else if(type==='buy'&&c){h=t('buy_h');sub=t('buy_sub',{c:esc(L(c.title)),p:fmt(c.price)})}
 else if(type==='business'){h=t('biz_h');sub=t('biz_sub');fields=['company','message'];btn=t('biz_cta')}
 else {type='consult';h=t('consult_h');sub=c?t('consult_course',{c:esc(L(c.title))}):t('consult_sub')}
 T.ev('lead_open',type,{item:item||c?.id||''});
 modal(`<div class="col" style="gap:8px;margin-bottom:22px;padding-right:28px"><h3 style="font-size:26px">${h}</h3><p class="muted">${sub}</p></div>${leadForm({type,item:item||'',fields,cta:btn})}`)}

/* ================== HEADER / FOOTER ================== */
let sheetOpen=false;
const langSwitch=()=>`<div class="langs" role="group" aria-label="Language">${LANGS.map(l=>`<button class="${l===LANG?'on':''}" data-act="lang" data-arg="${l}" aria-pressed="${l===LANG}">${l.toUpperCase()}</button>`).join('')}</div>`;
function renderNav(){const r=location.hash.slice(1)||'home';const on=(...x)=>x.some(p=>r.startsWith(p))?'on':'';
 document.getElementById('nav').innerHTML=`
 <a class="logo" href="#home" aria-label="AI Master">${LOGO()}<span>AI Master</span></a>
 <nav class="navlinks"><a href="#catalog" class="${on('catalog','course-')}">${t('nav_courses')}</a><a href="#home" data-act="toDemo">${t('nav_demo')}</a><a href="#pricing" class="${on('pricing')}">${t('nav_pricing')}</a><a href="#business" class="${on('business')}">${t('nav_business')}</a></nav>
 <div class="navright">${langSwitch()}<button class="btn sm hide-xs" data-act="lead" data-arg="consult" ${cta('consult','','header')}>${t('cta_lead')}</button>
 <button class="iconbtn burger" data-act="burger" aria-label="Menu" aria-expanded="${sheetOpen}">${ic(sheetOpen?'x':'menu')}</button></div>`;
 document.getElementById('sheet')?.remove();
 if(sheetOpen){const d=document.createElement('div');d.className='sheet';d.id='sheet';
  d.innerHTML=`<a class="big" href="#catalog">${t('nav_courses')} ${ic('arrow')}</a><a class="big" href="#home" data-act="toDemo">${t('nav_demo')} ${ic('arrow')}</a><a class="big" href="#pricing">${t('nav_pricing')} ${ic('arrow')}</a><a class="big" href="#business">${t('nav_business')} ${ic('arrow')}</a>
  <button class="btn lg block" style="margin-top:20px" data-act="lead" data-arg="consult" ${cta('consult','','header')}>${t('cta_lead')}</button>`;document.body.appendChild(d)}}
function renderFoot(){const s=SETTINGS;document.getElementById('foot').innerHTML=`<div class="row between" style="align-items:flex-start;gap:28px">
 <div class="col" style="gap:10px"><a class="logo" href="#home">${LOGO(28)}<span>AI Master</span></a><p class="small muted">${t('footer_tag')}</p></div>
 <div class="row" style="gap:28px"><a href="#catalog">${t('nav_courses')}</a><a href="#pricing">${t('nav_pricing')}</a><a href="#business">${t('nav_business')}</a><a href="#privacy">${t('privacy')}</a></div>
 <div class="col" style="gap:6px">${s.contactPhone?`<a href="tel:${esc(s.contactPhone.replace(/\s/g,''))}" class="row" style="gap:8px">${ic('phone','ico s')} ${esc(s.contactPhone)}</a>`:''}${s.contactTelegram?`<a href="https://t.me/${esc(s.contactTelegram.replace('@',''))}" target="_blank" rel="noopener" class="row" style="gap:8px">${ic('telegram','ico s')} ${esc(s.contactTelegram)}</a>`:''}</div>
 </div><div class="row between" style="margin-top:32px"><p class="tiny muted">© ${new Date().getFullYear()} AI Master</p>${langSwitch()}</div>`}

/* ================== HOME ================== */
function pHome(){const pop=COURSES.filter(c=>c.price>0).sort((a,b)=>b.students-a.students).slice(0,3);const students=COURSES.reduce((a,c)=>a+c.students,0);
 const tl=TOOLS.map(x=>`<span>${ic('spark','ico s',2)} ${x}</span>`).join('');
 return `
 <section class="hero"><div class="bgfx"><span class="blob b1"></span><span class="blob b2"></span></div><div class="wrap hero-grid">
  <div class="col h-in" style="gap:28px">
   <h1>${t('hero_t1')}<br><span class="hl">${t('hero_t2')}</span></h1>
   <p class="lead">${t('hero_p')}</p>
   <div class="row" style="gap:12px"><a class="btn lg shine" href="#lesson-p1" ${cta('try_free','prompt-eng','hero')}>${ic('play','ico',2)} ${t('try_free')}</a><a class="btn lg ghost" href="#home" data-act="toDemo" ${cta('demo_open','','hero')}>${t('watch_demo')}</a></div>
   <div class="ticks"><span>${ic('check','ico s',2.2)} ${t('tick1')}</span><span>${ic('check','ico s',2.2)} ${t('tick2')}</span><span>${ic('check','ico s',2.2)} ${t('tick3')}</span></div>
  </div>
  <div class="mockwrap" aria-hidden="true">
   <div class="mock" id="mock">
    <div class="row between"><span class="lb">${t('mock_lbl')}</span><span class="lb" style="color:#4ADE80">● live</span></div>
    <div class="pr"><span id="mkP"></span><span class="cur"></span></div>
    <div class="ans" id="mkA"><div>{</div><div>&nbsp;&nbsp;<span class="k">"amount"</span>: <span class="v">45000000</span>,</div><div>&nbsp;&nbsp;<span class="k">"deadline"</span>: <span class="v">"2026-12-31"</span>,</div><div>&nbsp;&nbsp;<span class="k">"penalty"</span>: <span class="v">0.1</span></div><div>}</div></div>
    <div class="res" id="mkR"><span class="pass">${ic('check','ico s',2.5)} ${t('mock_ok')}</span><span class="score">10/10</span></div>
   </div>
   <div class="chipf c1">${ic('award')} +50 XP</div>
   <div class="chipf c2">${ic('spark')} ${t('mock_mentor')}</div>
  </div>
 </div></section>

 <div class="marq"><div class="cap">${t('tools_t')}</div><div class="tl">${tl}${tl}</div></div>

 <section><div class="wrap">
  <div class="head rv"><h2>${t('dir_t')}</h2><p>${t('dir_p')}</p></div>
  <div class="grid g4">${Object.entries(AUD).map(([k,i],n)=>{const cnt=COURSES.filter(c=>c.audience===k).length;return `<a class="card path rv" style="--d:${n*90}ms" href="#catalog" data-act="pickAud" data-arg="${k}"><span class="tile">${ic(i)}</span><h3>${t('aud_'+k)}</h3><p>${t('aud_'+k+'_d')}</p><span class="go">${t('n_courses',{n:cnt})} ${ic('arrow','ico s')}</span></a>`}).join('')}</div>
 </div></section>

 <section id="demo" style="background:var(--card);border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="wrap demo-grid">
  <div class="col rv" style="gap:22px"><span class="eyebrow">${ic('play','ico s',2)} ${t('demo_k')}</span><h2>${t('demo_t')}</h2><p class="muted" style="font-size:18px">${t('demo_p')}</p>
   <div class="col" style="gap:16px">${[['read','demo_f1'],['terminal','demo_f2'],['check','demo_f3']].map(([i,k])=>`<div class="feat"><span class="tile" style="width:40px;height:40px">${ic(i,'ico s')}</span><b style="padding-top:8px">${t(k)}</b></div>`).join('')}</div></div>
  <div class="vid rv paused" id="vid" style="--d:120ms">
   <video id="demoV" src="/media/demo.mp4#t=3" playsinline muted preload="metadata"></video>
   <div class="ov"><button class="vplay" data-act="vplay"><span class="pb">${ic('play','ico',2)}</span>${t('play_video')}</button></div>
   <div class="vbar"><button data-act="vtoggle" aria-label="Play/Pause" id="vtg">${ic('play','ico s',2)}</button><div class="pg" id="vpg"><i id="vpi"></i></div><button data-act="vsound" id="vsd" aria-label="${t('sound_off')}" title="${t('sound_off')}">${ic('vol','ico s',2)}</button></div>
  </div>
 </div></section>

 <section><div class="wrap">
  <div class="head rv"><h2>${t('how_t')}</h2></div>
  <div class="steps rv" id="steps">${[['read','how1'],['terminal','how2'],['spark','how3']].map(([i,k],n)=>`<div class="step rv" style="--d:${200+n*200}ms"><span class="tile">${ic(i)}</span><h3>${t(k)}</h3><p>${t(k+'_d')}</p></div>`).join('')}</div>
 </div></section>

 <section style="padding-top:0"><div class="wrap">
  <div class="head rv"><h2>${t('ben_t')}</h2></div>
  <div class="grid g3">${[['terminal','ben1'],['spark','ben2'],['award','ben3'],['globe','ben4'],['mobile','ben5'],['refresh','ben6']].map(([i,k],n)=>`<div class="ben rv" style="--d:${(n%3)*90}ms"><span class="tile">${ic(i)}</span><div><h3>${t(k)}</h3><p>${t(k+'_d')}</p></div></div>`).join('')}</div>
 </div></section>

 <section style="padding-top:0"><div class="wrap"><div class="band rv"><div class="grid g4" style="position:relative;z-index:1">
  ${[[students,'+','st1'],[totalLessons(),'','st2'],[4.8,'','st3'],[3,'','st4']].map(([v,s,k])=>`<div><div class="v"><span data-count="${v}">0</span>${s}</div><div class="l">${t(k)}</div></div>`).join('')}
 </div></div></div></section>

 <section style="padding-top:0"><div class="wrap">
  <div class="row between" style="margin-bottom:44px;align-items:flex-end"><h2 class="rv">${t('pop_t')}</h2><a class="btn ghost rv" href="#catalog" ${cta('choose_course','','catalog')}>${t('all_courses')} ${ic('arrow')}</a></div>
  <div class="grid g3">${pop.map(courseCard).join('')}</div>
 </div></section>

 ${pricingSection(true)}

 <section><div class="wrap grid split">
  <div class="faq rv"><h2 style="margin-bottom:12px">${t('faq_t')}</h2>${[1,2,3,4].map(n=>`<details><summary>${t('faq'+n+'_q')}${ic('plus')}</summary><p>${t('faq'+n+'_a')}</p></details>`).join('')}</div>
  <div class="card rv" style="box-shadow:var(--sh);--d:120ms"><div class="col" style="gap:8px;margin-bottom:22px"><h3 style="font-size:24px">${t('q_t')}</h3><p class="muted">${t('q_p')}</p></div>${leadForm({type:'consult',cta:t('q_cta')})}</div>
 </div></section>`}

let planSel=null;
function pricingSection(onHome){const p=PLANS.find(x=>x.id===planSel)||bestPlan();const paid=COURSES.filter(c=>c.price>0).map(c=>c.price);
 return `<section id="plans" ${onHome?'style="padding-top:0"':''}><div class="wrap">
 <div class="head rv">${onHome?`<h2>${t('pricing_t')}</h2>`:`<h1 style="font-size:clamp(36px,5vw,56px)">${t('pricing_t')}</h1>`}<p>${t('pricing_p')}</p></div>
 <div class="grid g3" style="align-items:stretch" id="pricingGrid">
  <div class="card plan rv"><h3>${t('free')}</h3><div class="price" style="font-size:34px">0 ${t('sum')}</div>
   <ul><li>${ic('check','ico s',2.2)} ${t('plan_free_1')}</li><li>${ic('check','ico s',2.2)} ${t('plan_free_2')}</li></ul>
   <a class="btn ghost block" style="margin-top:auto" href="#lesson-p1" ${cta('try_free','prompt-eng','pricing')}>${t('plan_free_btn')}</a></div>
  <div class="card plan rv" style="--d:90ms"><h3>${t('plan_one')}</h3><div class="price" style="font-size:34px">${t('from_price',{p:fmt(paid.length?Math.min(...paid):0)})}</div>
   <ul><li>${ic('check','ico s',2.2)} ${t('plan_one_1')}</li><li>${ic('check','ico s',2.2)} ${t('plan_one_2')}</li></ul>
   <a class="btn ghost block" style="margin-top:auto" href="#catalog" ${cta('choose_course','','pricing')}>${t('choose_course')}</a></div>
  <div class="card plan best rv" style="--d:180ms"><span class="badge">${t('best')}</span><h3>${t('plan_all')}</h3>
   <div class="seg">${PLANS.map(x=>`<button class="${x.id===p.id?'on':''}" data-act="planPick" data-arg="${x.id}">${t('months',{n:x.months})}</button>`).join('')}</div>
   <div class="pnum"><div class="price" style="font-size:34px">${fmt(p.price)}</div><p class="small muted">${t('per_month',{p:fmt(Math.round(p.price/p.months))})}</p></div>
   <ul><li>${ic('check','ico s',2.2)} ${t('plan_all_1')}</li><li>${ic('check','ico s',2.2)} ${t('plan_all_2')}</li></ul>
   <button class="btn block shine" style="margin-top:auto" data-act="lead" data-arg="plan" data-lead-item="${p.id}" ${cta('subscribe',p.id,'pricing')}>${t('subscribe')}</button></div>
 </div></div></section>`}

/* ================== CATALOG / COURSE ================== */
let catF={q:'',aud:''};
function pCatalog(){return `<section style="padding-top:48px"><div class="wrap col" style="gap:28px">
 <h1 class="rv" style="font-size:clamp(36px,5vw,56px)">${t('nav_courses')}</h1>
 <div class="row rv" style="gap:12px"><div class="chips" id="catChips">${catChips()}</div>
  <label style="position:relative;flex:1;min-width:220px;max-width:340px;margin-left:auto"><span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--muted);display:flex">${ic('search','ico s')}</span><input type="search" placeholder="${t('search')}" value="${esc(catF.q)}" data-input="catq" style="padding-left:40px" aria-label="${t('search')}"></label></div>
 <div class="grid g3" id="catGrid">${catalogItems()}</div></div></section>`}
function catChips(){return `<button class="chip ${!catF.aud?'on':''}" data-act="catAud" data-arg="">${t('all')}</button>${Object.keys(AUD).map(k=>`<button class="chip ${catF.aud===k?'on':''}" data-act="catAud" data-arg="${k}">${t('aud_'+k)}</button>`).join('')}`}
function catalogItems(){const q=catF.q.toLowerCase().trim();
 const list=COURSES.filter(c=>(!q||[c.title,c.desc,c.topic].map(v=>Object.values(v||{}).join(' ')).join(' ').toLowerCase().includes(q)||allLessons(c).some(l=>Object.values(l.t).join(' ').toLowerCase().includes(q)))&&(!catF.aud||c.audience===catF.aud));
 return list.length?list.map(courseCard).join(''):`<div class="empty" style="grid-column:1/-1"><b>${t('nothing')}</b><button class="btn ghost sm" data-act="catReset">${t('reset')}</button></div>`}
function refreshCatalog(){document.getElementById('catGrid').innerHTML=catalogItems();document.getElementById('catChips').innerHTML=catChips();observe()}

function pCourse(id){const c=course(id);if(!c)return pNotFound();
 const ls=allLessons(c);const first=ls.find(l=>l.free)||ls[0];const free=c.price===0;const bp=bestPlan();let k=0;
 return `<section style="padding-top:32px"><div class="wrap col" style="gap:24px">
 <nav class="crumbs"><a href="#catalog">${t('nav_courses')}</a>${ic('arrow','ico s')}<span>${esc(L(c.topic))}</span></nav>
 <div class="course-grid">
 <div class="col" style="gap:40px">
  <div class="col h-in" style="gap:18px"><h1 style="font-size:clamp(34px,4.6vw,52px)">${esc(L(c.title))}</h1><p style="font-size:19px;color:var(--ink2)">${esc(L(c.desc))}</p>
   <div class="meta" style="font-size:15px"><span>${ic('book','ico s')} ${t('n_lessons',{n:ls.length})}</span><span>${ic('layers','ico s')} ${t('n_modules',{n:c.modules.length})}</span><span>${ic('clock','ico s')} ${t('hours',{n:c.hours})}</span><span>${ic('signal','ico s')} ${level(c)}</span><span>${ic('award','ico s')} ${t('tick3')}</span></div></div>
  <div class="col rv" style="gap:16px"><h2 style="font-size:26px">${t('learn_t')}</h2><div class="grid g2" style="gap:14px">${c.outcomes.map(o=>`<div class="outc">${ic('check','ico',2.2)}<span>${esc(L(o))}</span></div>`).join('')}</div></div>
  <div class="col rv" style="gap:14px"><div class="row between"><h2 style="font-size:26px">${t('program')}</h2><span class="muted small">${t('n_lessons',{n:ls.length})}</span></div>
   ${c.modules.map((m,mi)=>`<details class="mod" ${mi<2?'open':''}><summary><span>${mi+1}. ${esc(L(m.t))}</span><span class="row" style="gap:10px"><span class="small muted">${t('n_lessons',{n:m.l.length})}</span>${ic('down','ico s')}</span></summary>
    <div class="ls">${m.l.map(l=>{k++;return `<a href="#lesson-${l.id}"><span class="num ${S.done[l.id]?'done':''}">${S.done[l.id]?ic('check','ico',2.5):k}</span><span style="flex:1">${esc(L(l.t))}</span>${isOpen(c,l)?(free?'':`<span class="tag">${t('free')}</span>`):`<span class="muted">${ic('lock','ico s')}</span>`}</a>`}).join('')}</div></details>`).join('')}
  </div>
 </div>
 <aside class="card buybox rv" style="box-shadow:var(--sh)">${cover(c,120)}<div class="col" style="gap:14px;padding:24px">
  ${priceTag(c)}
  ${free?`<a class="btn lg block" href="#lesson-${first.id}" ${cta('try_free',c.id,'course')}>${t('start_course')}</a>`
   :`<button class="btn lg block shine" data-act="lead" data-arg="buy" data-lead-item="${c.id}" ${cta('buy_course',c.id,'course')}>${t('buy')}</button>
    <a class="btn ghost block" href="#lesson-${first.id}" ${cta('try_free',c.id,'course')}>${ic('play','ico s',2)} ${t('trial')}</a>
    ${bp?`<button class="btn link small" style="justify-content:center;color:var(--muted);font-weight:500" data-act="lead" data-arg="plan" data-lead-item="${bp.id}" ${cta('subscribe',bp.id,'course')}>${t('or_sub',{p:fmt(minMonthly())})}</button>`:''}`}
  <div class="col small" style="gap:8px;border-top:1px solid var(--line);padding-top:14px;color:var(--ink2)"><b style="color:var(--ink)">${t('included')}</b><span class="row" style="gap:8px">${ic('terminal','ico s')} ${t('inc1')}</span><span class="row" style="gap:8px">${ic('spark','ico s')} ${t('inc2')}</span><span class="row" style="gap:8px">${ic('award','ico s')} ${t('inc3')}</span></div>
  <button class="btn ghost block sm" data-act="lead" data-arg="consult" ${cta('consult',c.id,'course')}>${ic('msg','ico s')} ${t('ask_course')}</button>
 </div></aside></div></div></section>`}

/* ================== LESSON ================== */
let LP={lesson:null,chat:[]};let LCACHE={};
async function loadLesson(lid){const key=lid+':'+LANG;
 try{const r=await fetch('/api/lessons/'+encodeURIComponent(lid)+'?lang='+LANG);const j=await r.json().catch(()=>({}));LCACHE[key]=r.status===402?{locked:true}:r.ok?{data:j.lesson}:{error:j.error||'error'}}
 catch(e){LCACHE[key]={error:'net'}}
 if(LCACHE[key].data!==undefined)T.ev('lesson',lid,{a:'start'});
 if(location.hash.slice(1)==='lesson-'+lid)render()}
function soonLesson(l){return {min:10,blocks:[{t:'text',html:`<h2>${esc(L(l.t))}</h2>`},{t:'callout',kind:'tip',h:t('soon_h'),html:t('soon_p')}]}}
function lessonData(lid){const f=findLesson(lid);const x=LCACHE[lid+':'+LANG];if(!x||x.data===undefined)return null;return x.data&&x.data.blocks?x.data:soonLesson(f.l)}
function pLesson(lid){const f=findLesson(lid);if(!f)return pNotFound();const {c,l}=f;
 const ls=allLessons(c);const idx=ls.findIndex(x=>x.id===lid);
 if(LP.lesson!==lid)LP={lesson:lid,chat:[]};
 const cache=LCACHE[lid+':'+LANG];if(!cache)loadLesson(lid);
 const data=lessonData(lid);
 const req=data?data.blocks.filter(b=>b.req):[];const reqDone=req.filter(blockDone).length;
 const pct=data?(req.length?Math.round(reqDone/req.length*100):100):0;
 const next=ls[idx+1];
 let body;
 if(cache&&cache.locked)body=lockedHTML(c);
 else if(cache&&cache.error)body=`<div class="card empty"><b>${t('load_err')}</b><button class="btn" data-act="retryLesson" data-arg="${lid}">${t('retry')}</button></div>`;
 else if(!data)body=`<div class="col" style="gap:14px"><div class="skel" style="height:44px;width:70%"></div><div class="skel" style="height:18px"></div><div class="skel" style="height:160px"></div></div>`;
 else body=data.blocks.map((b,i)=>renderBlock(b,i,lid)).join('')+`
  <div class="card row between block" style="margin-top:40px;gap:16px"><div class="col" style="gap:2px"><b>${reqDone<req.length?t('left',{n:req.length-reqDone}):t('done')}</b><span class="small muted">${reqDone<req.length?t('answer_above'):next?t('go_next'):t('last')}</span></div>
  ${next?`<button class="btn" data-act="nextLesson" data-arg="${lid}" ${reqDone<req.length?'disabled':''}>${t('next_lesson')} ${ic('arrow','ico s')}</button>`:`<a class="btn" href="#course-${c.id}">${t('to_course')}</a>`}</div>`;
 let k=0;
 return `<div class="lbar"><div class="in">
   <button class="iconbtn" data-act="toggleToc" aria-label="${t('contents')}">${ic('menu')}</button>
   <div class="col" style="gap:5px;flex:1;min-width:0"><span class="ttl">${esc(L(l.t))}</span><div class="row" style="gap:10px;flex-wrap:nowrap"><div class="progress" style="flex:1;max-width:240px"><i style="width:${pct}%"></i></div><span class="tiny muted" style="white-space:nowrap">${t('of',{i:idx+1,n:ls.length})}</span></div></div>
   ${langSwitch()}
   ${c.price>0?`<button class="btn sm hide-xs" data-act="lead" data-arg="buy" data-lead-item="${c.id}" ${cta('buy_course',c.id,'lesson')}>${t('buy')}</button>`:''}
   <a class="iconbtn" href="#course-${c.id}" aria-label="${t('close')}">${ic('x')}</a>
 </div></div>
 <div class="lesson-layout">
 <aside class="toc" id="toc"><a href="#course-${c.id}" style="font-weight:600;color:var(--ink)">${ic('back','ico s')} ${esc(L(c.title))}</a>
  <div class="cp tiny muted">${t('n_lessons',{n:ls.length})} · ${t('hours',{n:c.hours})}</div>
  ${c.modules.map((m,mi)=>`<div class="mh">${mi+1}. ${esc(L(m.t))}</div>${m.l.map(x=>{k++;return `<a href="#lesson-${x.id}" class="${x.id===lid?'on':''}"><span class="num ${S.done[x.id]?'done':''}">${S.done[x.id]?ic('check','ico',2.5):k}</span><span style="flex:1">${esc(L(x.t))}</span>${!isOpen(c,x)?`<span class="muted">${ic('lock','ico s')}</span>`:''}</a>`}).join('')}`).join('')}
 </aside>
 <div class="lesson-main"><div class="reader">${body}
  <div class="row between" style="margin-top:28px">${idx>0?`<a class="btn ghost sm" href="#lesson-${ls[idx-1].id}">${ic('back','ico s')} ${t('back')}</a>`:'<span></span>'}${next?`<a class="btn ghost sm" href="#lesson-${next.id}">${t('next')} ${ic('arrow','ico s')}</a>`:''}</div>
 </div></div></div>
 ${data&&!(cache&&cache.locked)?`<button class="btn dark fab" data-act="toggleMentor">${ic('spark','ico s',2)} <span class="hide-xs">${t('mentor')}</span></button>${mentorPanel()}`:''}`}
function lockedHTML(c){const bp=bestPlan();return `<div class="card lock block"><span class="tile">${ic('lock')}</span><h2 style="font-size:28px">${t('locked_h')}</h2><p class="muted" style="max-width:420px">${t('locked_p')}</p>
 <div class="row" style="justify-content:center"><button class="btn lg" data-act="lead" data-arg="buy" data-lead-item="${c.id}" ${cta('buy_course',c.id,'lesson')}>${t('buy')} · ${fmt(c.price)}</button>${bp?`<button class="btn ghost lg" data-act="lead" data-arg="plan" data-lead-item="${bp.id}" ${cta('subscribe',bp.id,'lesson')}>${t('subscribe')}</button>`:''}</div></div>`}
function blockDone(b){if(b.t==='quiz')return !!(S.quiz[b.id]&&S.quiz[b.id].ok);if(b.t==='sandbox')return !!(S.quiz[b.id]&&S.quiz[b.id].score>=7);return true}
const CALL_IC={tip:'bulb',important:'info',error:'warn',example:'check'};
function renderBlock(b,i,lid){
 if(b.t==='text')return `<div class="block txt" data-sel>${b.html}</div>`;
 if(b.t==='callout')return `<div class="block"><div class="callout ${b.kind}" data-sel><span class="ci">${ic(CALL_IC[b.kind]||'info')}</span><div><div class="h">${esc(b.h)}</div><div>${b.html}</div></div></div></div>`;
 if(b.t==='diagram')return `<div class="block"><div class="card" style="padding:18px;background:#fff">${b.svg}<p class="small" style="text-align:center;margin-top:8px;color:#71717A">${esc(b.cap)}</p></div></div>`;
 if(b.t==='formula')return `<div class="block"><div class="formula">${b.html}<div class="cap">${esc(b.cap)}</div></div></div>`;
 if(b.t==='code')return `<div class="block"><div class="code"><div class="hd"><span>${esc(b.lang)}</span><button data-act="copy" data-arg="${i}">${ic('copy','ico s')} ${t('copy')}</button></div><pre>${hl(b.code,b.lang)}</pre></div></div>`;
 if(b.t==='quiz'){const st=S.quiz[b.id];return `<div class="block quiz"><span class="eyebrow" style="color:var(--blue)">${ic('target','ico s')} ${t('check_self')}</span><h3 style="margin:8px 0 2px;font-size:20px">${esc(b.q)}</h3>
  ${b.opts.map((o,k)=>{const pk=st&&st.pick===k;return `<button class="opt ${pk?(o.ok?'ok':'bad'):''}" data-act="quiz" data-arg="${lid}|${i}|${k}"><span class="l">${pk?(o.ok?ic('check','ico s',2.5):ic('x','ico s',2.5)):String.fromCharCode(65+k)}</span><span>${esc(o.t)}</span></button>${pk?`<div class="why"><b>${o.ok?t('right'):t('wrong')}</b>${esc(o.why)}</div>`:''}`}).join('')}</div>`}
 if(b.t==='sandbox')return sandboxHTML(b);
 return ''}
function hl(code,lang){let h=esc(code);if(lang==='Python'){h=h.replace(/(#.*)$/gm,'<span class="c">$1</span>').replace(/\b(from|import|print|def|return|for|in)\b/g,'<span class="k">$1</span>').replace(/\b(LinearRegression|fit|predict)\b/g,'<span class="fn">$1</span>')}else{h=h.replace(/(&quot;[a-z_]+&quot;)/g,'<span class="s">$1</span>')}return h}

/* ---- песочница (имитация модели; оценивает код) ---- */
function sandboxHTML(b){const st=S.quiz[b.id]||{};
 return `<div class="block sbx col" style="gap:14px" id="${esc(b.id)}">
  <span class="lbl">${ic('terminal','ico s')} ${t('sb')}</span>
  <div class="col" style="gap:6px"><span class="lbl">${t('sb_contract')}</span><div class="doc">${esc(CTR().A.text).replace(/\n/g,'<br>')}</div></div>
  <label class="col" style="gap:6px"><span class="lbl">${t('your_prompt')}</span><textarea id="sbPrompt" placeholder="${esc(t('sb_ph'))}">${esc(st.prompt||'')}</textarea></label>
  <div class="row"><button class="btn" data-act="sbCheck" data-arg="${esc(b.id)}">${t('sb_check')}</button><button class="btn ghost" data-act="sbHint">${ic('bulb','ico s')} ${t('hint')}</button></div>
  <div class="out" id="sbOut">${esc(st.out||t('sb_out'))}</div>
  <div id="sbRes">${st.checks?checksHTML(st):''}</div></div>`}
function checksHTML(st){return `<div class="col" style="gap:4px"><div class="row between"><span class="lbl">${t('sb_result')}</span><span style="font-family:Manrope;font-weight:800;font-size:28px;color:${st.score>=7?'#4ADE80':'#FF9A5C'}">${st.score}/10</span></div>
 ${st.checks.map((c,i)=>`<div class="chk" style="animation-delay:${i*80}ms"><span class="ic ${c.ok?'y':'n'}">${ic(c.ok?'check':'x','ico',3)}</span><span>${esc(t(c.k+(c.ok?'':'_x')))}</span></div>`).join('')}
 <div class="tiny" style="color:#A9A8A3;margin-top:6px">${st.score>=7?t('sb_pass'):t('sb_need')}</div></div>`}
function useRun(){if(S.sandboxRuns.day!==today())S.sandboxRuns={day:today(),n:0};if(S.sandboxRuns.n>=15){toast(t('sb_limit'));return false}S.sandboxRuns.n++;save();return true}
function fakeModel(prompt,k){const p=prompt.toLowerCase();const d=k;
 if(!/json/.test(p))return LANG==='en'?`The contract amount is UZS ${d.amount.toLocaleString('en-US')}, the deadline is ${d.human}, the penalty is ${d.penalty}% per day.`:LANG==='ru'?`В договоре сумма ${d.amount.toLocaleString('ru-RU')} сум, срок — ${d.human}, пеня — ${String(d.penalty).replace('.',',')}% в день.`:`Shartnoma summasi ${d.amount.toLocaleString('ru-RU')} soʻm, muddat — ${d.human}, penya — kuniga ${String(d.penalty).replace('.',',')}%.`;
 const keys=/amount|deadline|penalty/.test(p)?['amount','deadline','penalty']:LANG==='ru'?['сумма','срок','пеня']:LANG==='en'?['sum','date','fine']:['summa','muddat','penya'];
 const num=/числ|number|son|raqam|0\.1|процент|percent|foiz/.test(p),iso=/гггг|yyyy|iso|\d{4}-\d{2}/.test(p),only=/только|only|faqat|без поясн|izohsiz|no explanation/.test(p);
 const o={};o[keys[0]]=/числ|number|son|raqam|сум|uzs|soʻm|so'm/.test(p)?d.amount:d.amount.toLocaleString('ru-RU')+' '+t('sum');o[keys[1]]=iso?d.deadline:d.human;o[keys[2]]=num?d.penalty:d.penalty+'%';
 const js=JSON.stringify(o,null,2);return only?js:(LANG==='en'?'Here is the data:\n':LANG==='ru'?'Вот данные из договора:\n':'Shartnoma maʼlumotlari:\n')+js}
function extractJSON(s){const m=s.match(/\{[\s\S]*\}/);if(!m)return null;try{return JSON.parse(m[0])}catch(e){return null}}
function checkOne(text,exp){const o=extractJSON(text);const r={json:!!o,amount:false,deadline:false,penalty:false};if(!o)return r;
 r.amount=typeof o.amount==='number'&&o.amount===exp.amount;r.deadline=o.deadline===exp.deadline;const pv=o.penalty;r.penalty=typeof pv==='number'&&(Math.abs(pv-exp.penalty)<1e-9||Math.abs(pv-exp.penalty/100)<1e-9);return r}

/* ---- наставник (демо-ответы) ---- */
function mentorPanel(){return `<aside class="drawer" id="mentor" aria-label="${t('mentor')}"><div class="hd"><b class="row" style="gap:8px">${ic('spark','ico s',2)} ${t('mentor')}</b><button class="iconbtn" data-act="toggleMentor" aria-label="${t('close')}">${ic('x')}</button></div>
 <div class="msgs" id="msgs">${LP.chat.length?LP.chat.map(m=>`<div class="msg ${m.role==='user'?'u':'a'}">${esc(m.content)}</div>`).join(''):`<div class="msg a">${t('mentor_hi')}</div>`}</div>
 <div class="row" style="padding:0 12px 8px;gap:6px"><button class="chip" data-act="mentorQuick" data-arg="simpler">${t('simpler')}</button><button class="chip" data-act="mentorQuick" data-arg="example">${t('example')}</button></div>
 <form data-submit="mentor"><input id="mentorIn" placeholder="${esc(t('ask_ph'))}" autocomplete="off"><button class="btn" aria-label="Send">${ic('send','ico s')}</button></form></aside>`}
function openMentor(){document.getElementById('mentor')?.classList.add('open')}
async function mentorAsk(q,kind){if(S.mentor.day!==today())S.mentor={day:today(),n:0};if(S.mentor.n>=10){toast(t('mentor_limit'));return}
 S.mentor.n++;save();LP.chat.push({role:'user',content:q});const box=document.getElementById('msgs');if(!box)return;
 box.insertAdjacentHTML('beforeend',`<div class="msg u">${esc(q)}</div><div class="msg a" id="pending">…</div>`);box.scrollTop=box.scrollHeight;
 await new Promise(r=>setTimeout(r,650));
 const s=q.toLowerCase();const ans=t(kind||(/(prost|прощ|simpl|sodda)/.test(s)?'m_simple':/(пример|example|misol)/.test(s)?'m_example':/(промпт|prompt|задан|task|topshiriq)/.test(s)?'m_task':'m_default'));
 const el=document.getElementById('pending');if(el){el.textContent=ans;el.removeAttribute('id')}LP.chat.push({role:'assistant',content:ans});box.scrollTop=box.scrollHeight}

/* ================== OTHER PAGES ================== */
function pBusiness(){return `<section class="hero"><div class="bgfx"><span class="blob b1"></span></div><div class="wrap hero-grid" style="align-items:start">
 <div class="col h-in" style="gap:28px"><h1 style="font-size:clamp(36px,5vw,58px)">${t('biz_t')}</h1>
  <p class="lead">${t('biz_p')}</p>
  <div class="col" style="gap:22px;margin-top:8px">${[['users','biz1'],['layers','biz2'],['chart','biz3']].map(([i,k])=>`<div class="row" style="gap:16px;flex-wrap:nowrap;align-items:flex-start"><span class="tile">${ic(i)}</span><div><h3>${t(k)}</h3><p class="muted">${t(k+'_d')}</p></div></div>`).join('')}</div>
 </div>
 <div class="card mockwrap" style="box-shadow:var(--sh)"><div class="col" style="gap:8px;margin-bottom:22px"><h3 style="font-size:24px">${t('biz_form_t')}</h3><p class="muted">${t('biz_form_p')}</p></div>${leadForm({type:'business',fields:['company','message'],cta:t('biz_cta')})}</div>
 </div></section>`}
function pPrivacy(){return `<section style="padding-top:48px"><div class="wrap narrow col" style="gap:18px"><h1 style="font-size:clamp(32px,4.4vw,44px)">${t('pr_t')}</h1>
 <p>${t('pr1')}</p><p>${t('pr2')}</p><p>${t('pr3')}${SETTINGS.contactTelegram?` Telegram: ${esc(SETTINGS.contactTelegram)}`:''}${SETTINGS.contactPhone?` · ${esc(SETTINGS.contactPhone)}`:''}</p></div></section>`}
function pNotFound(){return `<section><div class="wrap empty"><h2>${t('not_found')}</h2><a class="btn" href="#home">${t('to_home')}</a></div></section>`}

/* ================== ANIMATIONS ================== */
let rvObs=null,cntObs=null,mockTimer=null;
function observe(){
 if(!('IntersectionObserver' in window)){document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'));return}
 rvObs=rvObs||new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rvObs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
 document.querySelectorAll('.rv:not(.in)').forEach(e=>rvObs.observe(e));
 cntObs=cntObs||new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){countUp(e.target);cntObs.unobserve(e.target)}}),{threshold:.6});
 document.querySelectorAll('[data-count]').forEach(e=>cntObs.observe(e));
}
function countUp(el){const to=Number(el.dataset.count);const dec=String(to).includes('.')?1:0;const t0=performance.now(),D=1400;
 const f=n=>dec?n.toFixed(1).replace('.',LANG==='en'?'.':','):Math.round(n).toLocaleString('ru-RU').replace(/ |,/g,' ');
 (function step(now){const p=Math.min(1,(now-t0)/D);const e=1-Math.pow(1-p,3);el.textContent=f(to*e);if(p<1)requestAnimationFrame(step)})(t0)}
function runMock(){clearTimeout(mockTimer);const P=document.getElementById('mkP');if(!P)return;
 const text=t('mock_prompt');const lines=[...document.querySelectorAll('#mkA div')];const R=document.getElementById('mkR');
 if(matchMedia('(prefers-reduced-motion:reduce)').matches){P.textContent=text;lines.forEach(l=>l.classList.add('on'));R.classList.add('on');return}
 P.textContent='';lines.forEach(l=>l.classList.remove('on'));R.classList.remove('on');let i=0;
 const type=()=>{if(!document.getElementById('mkP'))return;if(i<=text.length){P.textContent=text.slice(0,i);i+=2;mockTimer=setTimeout(type,28)}else{let j=0;const show=()=>{if(!document.getElementById('mkP'))return;if(j<lines.length){lines[j++].classList.add('on');mockTimer=setTimeout(show,180)}else{R.classList.add('on');mockTimer=setTimeout(runMock,4200)}};mockTimer=setTimeout(show,400)}};
 mockTimer=setTimeout(type,700)}

/* ================== DEMO VIDEO + MUSIC ================== */
let musicOn=true;
function demoEls(){return {v:document.getElementById('demoV'),a:document.getElementById('demoA'),w:document.getElementById('vid')}}
function bindVideo(){const {v,a,w}=demoEls();if(!v)return;
 const sync=()=>{if(Math.abs(a.currentTime-v.currentTime)>.25)a.currentTime=v.currentTime};
 v.onplay=()=>{w.classList.add('playing');w.classList.remove('paused');document.getElementById('vtg').innerHTML=ic('pause','ico s',2);if(musicOn){a.currentTime=v.currentTime;a.play().catch(()=>{})}};
 v.onpause=()=>{w.classList.remove('playing');w.classList.add('paused');document.getElementById('vtg').innerHTML=ic('play','ico s',2);a.pause()};
 v.ontimeupdate=()=>{const i=document.getElementById('vpi');if(i)i.style.width=(v.currentTime/v.duration*100)+'%';if(!a.paused)sync()};
 v.onseeked=sync;
 v.onended=()=>{a.pause();T.ev('click','demo_done',{place:'demo'});const ov=w.querySelector('.vplay');if(ov)ov.innerHTML=`<span class="pb">${ic('refresh','ico',2)}</span>${t('replay')}`};
 document.getElementById('vpg').onclick=e=>{const r=e.currentTarget.getBoundingClientRect();v.currentTime=(e.clientX-r.left)/r.width*v.duration};
}
function stopDemo(){const a=document.getElementById('demoA');if(a)a.pause()}

/* ================== ROUTER ================== */
let pricingObs=null;
function render(){const r=location.hash.slice(1)||'home';const isLesson=r.startsWith('lesson-');let html;
 stopDemo();
 if(r==='home')html=pHome();else if(r==='catalog')html=pCatalog();else if(r.startsWith('course-'))html=pCourse(r.slice(7));
 else if(isLesson)html=pLesson(r.slice(7));else if(r==='pricing')html=pricingSection(false);else if(r==='business')html=pBusiness();else if(r==='privacy')html=pPrivacy();else html=pNotFound();
 document.getElementById('hdr').style.display=isLesson?'none':'';document.getElementById('footer').style.display=isLesson?'none':'';
 if(!isLesson)renderNav();document.getElementById('app').innerHTML=html;if(!isLesson)renderFoot();
 observe();runMock();bindVideo();
 pricingObs?.disconnect();const pg=document.getElementById('pricingGrid');
 if(pg&&'IntersectionObserver' in window){pricingObs=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){T.ev('view','pricing');pricingObs.disconnect()}},{threshold:.4});pricingObs.observe(pg)}}
function setTitle(r){const c=r.startsWith('course-')&&course(r.slice(7));const l=r.startsWith('lesson-')&&findLesson(r.slice(7));
 document.title=c?L(c.title)+' — AI Master':l?L(l.l.t)+' — AI Master':I18N['title_'+r]?t('title_'+r):t('title_home')}
let lastRoute='';
function onRoute(){const r=location.hash.slice(1)||'home';sheetOpen=false;const changed=r!==lastRoute;lastRoute=r;setTitle(r);
 if(r.startsWith('course-'))addViewed(r.slice(7));
 render();
 if(changed){if(pendingDemo){pendingDemo=false;setTimeout(()=>document.getElementById('demo')?.scrollIntoView({behavior:'smooth'}),60)}else window.scrollTo({top:0,left:0,behavior:'instant'});T.ev('pv','',{},r);PX.page()}}
addEventListener('hashchange',onRoute);
addEventListener('scroll',()=>document.getElementById('hdr').classList.toggle('scrolled',scrollY>8),{passive:true});
let pendingDemo=false;

/* ================== EVENTS ================== */
function lessonBlocks(lid){return lessonData(lid)?.blocks||[]}
document.addEventListener('click',async e=>{
 const tr=e.target.closest('[data-cta]');
 if(tr){const id=tr.dataset.cta;T.ev('click',id,{item:tr.dataset.item||'',place:tr.dataset.place||''});if(id==='subscribe'||id==='buy_course')PX.goal(id,{content_name:tr.dataset.item||''})}
 const a=e.target.closest('[data-act]');if(!a)return;const act=a.dataset.act,arg=a.dataset.arg;
 if(a.tagName==='A'&&!['pickAud','closeModal'].includes(act))e.preventDefault();
 switch(act){
  case 'closeModal':if(a.classList.contains('modal-bg')&&e.target!==a)break;closeModal();break;
  case 'burger':sheetOpen=!sheetOpen;renderNav();break;
  case 'lang':{if(arg===LANG)break;LANG=arg;try{localStorage.setItem('am_lang',LANG)}catch(_){}document.documentElement.lang=LANG;
   if(new URLSearchParams(location.search).has('lang')){const u=new URL(location.href);u.searchParams.set('lang',LANG);history.replaceState(null,'',u)}
   setTitle(location.hash.slice(1)||'home');const y=scrollY;render();scrollTo({top:y,behavior:'instant'});break}
  case 'toDemo':sheetOpen=false;if((location.hash.slice(1)||'home')==='home'){renderNav();document.getElementById('demo')?.scrollIntoView({behavior:'smooth'})}else{pendingDemo=true;location.hash='home'}break;
  case 'lead':openLead(arg,a.dataset.leadItem);break;
  case 'pickAud':catF={q:'',aud:arg};break;
  case 'catAud':catF.aud=arg;refreshCatalog();break;
  case 'catReset':catF={q:'',aud:''};render();break;
  case 'planPick':{planSel=arg;const y=scrollY;render();scrollTo({top:y,behavior:'instant'});break}
  case 'vplay':{const {v}=demoEls();if(v.ended||v.currentTime>=v.duration-0.1||!v.dataset.started){v.currentTime=0;v.dataset.started='1'}v.play();T.ev('click','demo_play',{place:'demo'});break}
  case 'vtoggle':{const {v}=demoEls();v.paused?v.play():v.pause();break}
  case 'vsound':{const {v,a:au}=demoEls();musicOn=!musicOn;a.innerHTML=ic(musicOn?'vol':'mute','ico s',2);a.title=t(musicOn?'sound_off':'sound_on');if(musicOn&&!v.paused){au.currentTime=v.currentTime;au.play().catch(()=>{})}else au.pause();break}
  case 'toggleMentor':document.getElementById('mentor')?.classList.toggle('open');setTimeout(()=>document.getElementById('mentorIn')?.focus(),250);break;
  case 'toggleToc':document.getElementById('toc')?.classList.toggle('open');break;
  case 'retryLesson':delete LCACHE[arg+':'+LANG];render();break;
  case 'copy':{const b=lessonBlocks(location.hash.slice(8))[arg];try{await navigator.clipboard.writeText(b.code);toast(t('copied'))}catch(_){}break}
  case 'quiz':{const [lid,bi,k]=arg.split('|');const b=lessonBlocks(lid)[bi];if(!b)break;const prev=S.quiz[b.id];S.quiz[b.id]={pick:Number(k),ok:b.opts[k].ok||!!(prev&&prev.ok)};save();const y=scrollY;render();scrollTo({top:y,behavior:'instant'});break}
  case 'nextLesson':{S.done[arg]=true;save();T.ev('lesson',arg,{a:'done'});const ls=allLessons(findLesson(arg).c);const i=ls.findIndex(x=>x.id===arg);go('lesson-'+ls[i+1].id);break}
  case 'sbCheck':{const p=document.getElementById('sbPrompt').value.trim();if(p.length<10){toast(t('sb_longer'));break}if(!useRun())break;
    const out=document.getElementById('sbOut');out.textContent=t('sb_think');a.disabled=true;await new Promise(r=>setTimeout(r,800));
    const K=CTR();const t1=fakeModel(p,K.A),t2=fakeModel(p,K.B);const A=checkOne(t1,K.A),B=checkOne(t2,K.B);
    let score=0;const checks=[];[['json',3],['amount',2],['deadline',2],['penalty',3]].forEach(([k,pts])=>{const ok=A[k]&&B[k];if(ok)score+=pts;checks.push({ok,k:'c_'+k})});
    S.quiz[arg]={prompt:p,out:t1,score,checks};save();const y=scrollY;render();scrollTo({top:y,behavior:'instant'});break}
  case 'sbHint':openMentor();mentorAsk(t('sb_hint_q'),'m_task');break;
  case 'mentorQuick':mentorAsk(t(arg==='simpler'?'simpler':'example')+(selText?`: «${selText}»`:''),arg==='simpler'?'m_simple':'m_example');selText='';break;
 }
});
document.addEventListener('input',e=>{const el=e.target;
 if(el.matches('[data-phone]')){const v=fmtPhone(el.value);if(v!==el.value)el.value=v}
 if(el.dataset.input==='catq'){catF.q=el.value;document.getElementById('catGrid').innerHTML=catalogItems();observe()}});
document.addEventListener('submit',async e=>{const f=e.target;const k=f.dataset.submit;if(!k)return;e.preventDefault();
 if(k==='lead'){const btn=f.querySelector('button');const fd=Object.fromEntries(new FormData(f).entries());
  if(fd.phone.replace(/\D/g,'').length<12){toast(t('err_phone'));return}
  btn.disabled=true;const label=btn.textContent;btn.textContent=t('f_sending');
  try{const r=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...fd,course:ctxCourse(),viewed:viewed(),lang:LANG,page:location.hash.slice(1)||'home',...T.ctx()})});
   const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||t('err_send'));
   PX.goal('lead',{content_name:fd.type});f.parentElement.innerHTML=leadSuccess()}
  catch(er){toast(er.message==='Failed to fetch'?t('err_net'):er.message);btn.disabled=false;btn.textContent=label}return}
 if(k==='mentor'){const i=document.getElementById('mentorIn');const q=i.value.trim();if(!q)return;i.value='';mentorAsk(q)}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();document.getElementById('mentor')?.classList.remove('open');if(sheetOpen){sheetOpen=false;renderNav()}}});
let selText='';
document.addEventListener('mouseup',()=>{setTimeout(()=>{const s=window.getSelection();const txt=s?String(s).trim():'';const an=s&&s.anchorNode&&s.anchorNode.parentElement;if(txt.length>3&&an&&an.closest('[data-sel]'))selText=txt.slice(0,400)},10)});

/* ================== BOOT ================== */
(async function boot(){
 try{const r=await fetch('/api/catalog');if(!r.ok)throw new Error();const j=await r.json();COURSES=j.courses;PLANS=j.plans;SETTINGS=j.settings}
 catch(e){document.getElementById('app').innerHTML=`<div class="wrap empty" style="padding:120px 20px"><h2>${t('unavailable')}</h2><button class="btn" onclick="location.reload()">${t('refresh')}</button></div>`;return}
 PX.init(SETTINGS);onRoute();
})();
