(function(){
  const DAYS = ['sat','sun','mon','tue','wed','thu','fri'];
  const DAY_LABELS = {sat:'Saturday',sun:'Sunday',mon:'Monday',tue:'Tuesday',wed:'Wednesday',thu:'Thursday',fri:'Friday'};
  const DEFAULT_PLAN = {sat:'push',sun:'pull',mon:'legs',tue:'rest',wed:'push',thu:'pull',fri:'rest'};
  const DEFAULT_EXERCISES = [
    {id:'bench',name:'Bench press',category:'push'},
    {id:'ohp',name:'Overhead press',category:'push'},
    {id:'pullup',name:'Pull-ups',category:'pull'},
    {id:'row',name:'Barbell row',category:'pull'},
    {id:'squat',name:'Squat',category:'legs'},
    {id:'rdl',name:'Romanian deadlift',category:'legs'}
  ];
  const DEFAULT_HABITS = [{id:'h-water',name:'Water goal',preset:true},{id:'h-sleep',name:'Sleep 7+ hrs',preset:true},{id:'h-steps',name:'Steps goal',preset:true}];

  const ICONS = {
    'tab-home':'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M4 10.5L12 4l8 6.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 9.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M10 20v-5h4v5" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>',
    'tab-tasks':'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 12.2l2.3 2.3L16 9" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'tab-train':'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M4 10v4M20 10v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="1.5" y="9" width="3.2" height="6" rx="1.2" fill="currentColor"/><rect x="19.3" y="9" width="3.2" height="6" rx="1.2" fill="currentColor"/><path d="M7 12h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    'tab-health':'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M20.3 4.9a5.2 5.2 0 0 0-7.35 0L12 5.85l-.95-.95a5.2 5.2 0 0 0-7.35 7.35L12 20.55l8.3-8.3a5.2 5.2 0 0 0 0-7.35z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'tab-habits':'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M12 3c1 3-3 4.5-3 8a3 3 0 0 0 6 0c0-1-0.5-2-0.5-2c1.5 1 2.5 3 2.5 5a5 5 0 0 1-10 0c0-4.5 3.5-6 5-11z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/></svg>',
    'tab-more':'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="8" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="16" cy="12" r="1.3" fill="currentColor"/></svg>',
    dashboard:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor"/><rect x="13" y="3" width="8" height="5" rx="2" fill="currentColor"/><rect x="13" y="10" width="8" height="11" rx="2" fill="currentColor"/><rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor"/></svg>',
    dumbbell:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><rect x="1.5" y="9" width="4" height="6" rx="1.5" fill="currentColor"/><rect x="18.5" y="9" width="4" height="6" rx="1.5" fill="currentColor"/><rect x="6" y="10.5" width="12" height="3" rx="1.5" fill="currentColor"/></svg>',
    checklist:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" stroke-width="2"/><path d="M7 9l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 15.5l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    fire:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M12 2c1 3-3 4-3 7a3 3 0 0 0 6 0c0-1-1-2-1-2c2 1 3 3 3 5a5 5 0 0 1-10 0c0-4 3-5 5-10z" fill="currentColor"/></svg>',
    calendar:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" stroke-width="2"/><path d="M3 10h18" stroke="currentColor" stroke-width="2"/><path d="M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    apple:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    music:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M9 18V5l11-2v13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="18" r="3" fill="currentColor"/><circle cx="18" cy="16" r="3" fill="currentColor"/></svg>',
    settings:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="2"/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M19.07 19.07l-2.12-2.12M7.05 7.05L4.93 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    moon:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 1 0 10.5 10.5z" fill="currentColor"/></svg>',
    pill:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><rect x="6" y="4" width="12" height="16" rx="4" fill="currentColor"/><ellipse cx="12" cy="4.5" rx="6" ry="1.8" fill="currentColor" opacity="0.55"/></svg>',
    book:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M4 5a2 2 0 0 1 2-2h6v18H6a2 2 0 0 1-2-2V5z" fill="currentColor"/><path d="M20 5a2 2 0 0 0-2-2h-6v18h6a2 2 0 0 0 2-2V5z" fill="currentColor" opacity="0.55"/></svg>',
    clapper:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M3 9l1.3-4h4l-1.3 4z" fill="currentColor"/><path d="M8.3 9l1.3-4h4l-1.3 4z" fill="currentColor"/><path d="M13.6 9l1.3-4h4l-1.3 4z" fill="currentColor"/><rect x="3" y="9" width="18" height="11" rx="2" fill="currentColor"/></svg>',
    star:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.6 6.8L12 16.9 5.8 20.4l1.6-6.8L2.2 9l6.9-.7L12 2z" fill="currentColor"/></svg>',
    clock:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 7v5l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>',
    heart:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.35-9.5-8.5C1 9 2.5 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 5.5 4 3.5 7.5C19 16.65 12 21 12 21z" fill="currentColor"/></svg>',
    cap:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><path d="M12 3L1 8l11 5 9-4.09V17h2V8L12 3z" fill="currentColor"/><path d="M5 10.5v4c0 1.5 3 3.5 7 3.5s7-2 7-3.5v-4l-7 3.5-7-3.5z" fill="currentColor" opacity="0.6"/></svg>',
    award:'<svg width="{{S}}" height="{{S}}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="5" fill="currentColor"/><path d="M9 12l-3 8 6-3 6 3-3-8" fill="currentColor" opacity="0.6"/></svg>'
  };
  const TYPE_ICON = {workout:'dumbbell',course:'book',movie:'clapper',plan:'checklist',custom:'star'};
  function icon(name,size){ return (ICONS[name]||'').split('{{S}}').join(size||18); }

  let state = {exercises:[],logs:[],events:[],config:{},nutrition:{},tasks:[],habits:[],habitLogs:{},health:{steps:{},sleep:{},weight:[]},classSchedule:[],courses:[],subjects:[],subjectItems:[]};
  let calYear, calMonth, calSelectedDate=null;

  async function safeGet(key, fallback){ try{ const v=localStorage.getItem('cb_'+key); return v?JSON.parse(v):fallback; }catch(e){ return fallback; } }
  async function save(key, value){ try{ localStorage.setItem('cb_'+key, JSON.stringify(value)); if('Notification' in window && Notification.permission==='granted' && ['tasks','events','habits','habitLogs','classSchedule','config'].includes(key)){ navigator.serviceWorker.ready.then(r=>syncNexaPushSubscription(r)).catch(()=>{}); } }catch(e){ console.error(e); } }
  async function loadAll(){
    state.exercises = await safeGet('exercises', DEFAULT_EXERCISES);
    state.logs = await safeGet('logs', []);
    state.events = await safeGet('events', []);
    state.config = await safeGet('config', {plan:DEFAULT_PLAN, settings:{notifications:{classes:true,habits:true,prayer:true,events:true},notificationLead:{classes:15,habits:0,prayer:0,events:0}}, dashboardOrder:['classes','train','nutrition','habits','tasks','calendar','prayer']});
    if(!state.config.plan) state.config.plan = DEFAULT_PLAN;
    if(!state.config.settings) state.config.settings = {};
    if(!state.config.settings.notifications) state.config.settings.notifications = {classes:true,habits:true,prayer:true,events:true};
    delete state.config.settings.notifications.tasks;
    if(!state.config.settings.notificationLead) state.config.settings.notificationLead={classes:15,habits:0,prayer:0,events:0}; delete state.config.settings.notificationLead.tasks;
    if(!state.config.dashboardOrder) state.config.dashboardOrder = ['classes','train','nutrition','habits','tasks','calendar','prayer'];
    
    state.nutrition = await safeGet('nutrition', {});
    state.tasks = await safeGet('tasks', []);
    const somedayEvents=state.events.filter(e=>!e.date);
    if(somedayEvents.length){somedayEvents.forEach(e=>{if(!state.tasks.some(t=>t.id==='from-'+e.id))state.tasks.push({id:'from-'+e.id,title:e.title,notes:e.notes||'',done:!!e.done,subtasks:[]});});state.events=state.events.filter(e=>!!e.date);localStorage.setItem('cb_tasks',JSON.stringify(state.tasks));localStorage.setItem('cb_events',JSON.stringify(state.events));}
    state.tasks.forEach(t=>{delete t.dueDate;delete t.priority;});
    state.habits = await safeGet('habits', DEFAULT_HABITS);
    state.habitLogs = await safeGet('habitLogs', {});
    state.health = await safeGet('health', {steps:{}, sleep:{}, weight:[]});
    state.classSchedule = await safeGet('classSchedule', []);
    state.subjects = await safeGet('subjects', []);
    state.subjectItems = await safeGet('subjectItems', []);
  }

  function escapeHTML(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
  function showToast(msg){ const t=document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),3000); }
  function nexaConfirm(title,message,confirmLabel='Delete'){return new Promise(resolve=>{const bg=document.createElement('div');bg.className='nexa-confirm-backdrop';bg.innerHTML='<div class="nexa-confirm" role="dialog" aria-modal="true"><h3>'+escapeHTML(title)+'</h3><p>'+escapeHTML(message)+'</p><div class="nexa-confirm-actions"><button class="btn gray" data-cancel>Cancel</button><button class="btn" style="background:#c0392b" data-confirm>'+escapeHTML(confirmLabel)+'</button></div></div>';document.body.appendChild(bg);const finish=v=>{bg.remove();resolve(v)};bg.querySelector('[data-cancel]').onclick=()=>finish(false);bg.querySelector('[data-confirm]').onclick=()=>finish(true);bg.onclick=e=>{if(e.target===bg)finish(false)};});}
  let undoTimer=null,undoEl=null;
  function offerUndo(label,fn){if(undoEl)undoEl.remove();if(undoTimer)clearTimeout(undoTimer);undoEl=document.createElement('div');undoEl.className='undo-toast';undoEl.innerHTML='<span>'+escapeHTML(label)+'</span><button type="button">UNDO</button>';document.body.appendChild(undoEl);undoEl.querySelector('button').onclick=async()=>{clearTimeout(undoTimer);undoEl.remove();undoEl=null;await fn();};undoTimer=setTimeout(()=>{if(undoEl)undoEl.remove();undoEl=null;},5000);}
  function animateOut(el,cls='item-remove'){return new Promise(resolve=>{el.classList.add(cls);setTimeout(resolve,180);});}
  function haptic(ms=12){ try{ if(navigator.vibrate) navigator.vibrate(ms); }catch(_){} }

  const LAT=30.0444, LNG=31.2357;
  const TZ=-(new Date().getTimezoneOffset()/60);
  function deg(x){return x*Math.PI/180;} function rad(x){return x*180/Math.PI;} function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function dayOfYear(d){ return Math.floor((d - new Date(d.getFullYear(),0,0))/86400000); }
  function calcPrayerTimes(date){
    const N=dayOfYear(date), B=deg(360/365*(N-81));
    const EoT = 9.87*Math.sin(2*B) - 7.53*Math.cos(B) - 1.5*Math.sin(B);
    const decl = deg(23.45*Math.sin(deg(360/365*(284+N))));
    const latR = deg(LAT);
    const solarNoon = 12+TZ-LNG/15-EoT/60;
    function hourAngle(a){ const angle=deg(a); const c=(-Math.sin(angle)-Math.sin(latR)*Math.sin(decl))/(Math.cos(latR)*Math.cos(decl)); return rad(Math.acos(clamp(c,-1,1)))/15; }
    function asrHA(){ const alt=Math.atan(1/(1+Math.tan(Math.abs(latR-decl)))); const c=(Math.sin(alt)-Math.sin(latR)*Math.sin(decl))/(Math.cos(latR)*Math.cos(decl)); return rad(Math.acos(clamp(c,-1,1)))/15; }
    return {fajr:solarNoon-hourAngle(19.5), sunrise:solarNoon-hourAngle(0.833), dhuhr:solarNoon+(1/60), asr:solarNoon+asrHA(), maghrib:solarNoon+hourAngle(0.833), isha:solarNoon+hourAngle(17.5)};
  }
  function fmtTime(h){ h=((h%24)+24)%24; let hh=Math.floor(h), mm=Math.round((h-hh)*60); if(mm===60){mm=0;hh+=1;} hh=hh%24; const p=hh>=12?'PM':'AM'; let hh12=hh%12; if(hh12===0)hh12=12; return String(hh12).padStart(2,'0')+':'+String(mm).padStart(2,'0')+' '+p; }
  function getNextPrayer(){
    const times=calcPrayerTimes(new Date());
    const order=[['fajr','Fajr'],['sunrise','Sunrise'],['dhuhr','Dhuhr'],['asr','Asr'],['maghrib','Maghrib'],['isha','Isha']];
    const now=new Date(); const nowH=now.getHours()+now.getMinutes()/60+now.getSeconds()/3600;
    let nextKey=null,nextDiff=Infinity;
    order.forEach(([key])=>{ let d=times[key]-nowH; if(d<0)d+=24; if(d<nextDiff){nextDiff=d;nextKey=key;} });
    return {times,order,nextKey,nextDiff};
  }

  function dateKey(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  function todayKey(){ return dateKey(new Date()); }
  function todayDayCode(){ const map={0:'sun',1:'mon',2:'tue',3:'wed',4:'thu',5:'fri',6:'sat'}; return map[new Date().getDay()]; }
  function computeStreak(){
    const dates=new Set(state.logs.map(l=>l.date)); let streak=0, d=new Date();
    if(!dates.has(todayKey())) d.setDate(d.getDate()-1);
    while(dates.has(dateKey(d))){ streak++; d.setDate(d.getDate()-1); }
    return streak;
  }
  function totalPRs(){ return 0; }

  const TAB_ITEMS = [
    {id:'today', label:'Today', icon:'tab-home'},
    {id:'tasks', label:'Tasks', icon:'tab-tasks'},
    {id:'health', label:'Health', icon:'tab-health'},
    {id:'calendar', label:'Calendar', icon:'calendar'},
    {id:'settings', label:'Settings', icon:'settings'}
  ];
  const PAGES = TAB_ITEMS;

  const SUBTAB_STATE = {tasks:'list', health:'training', settings:'general'};
  function renderTabbar(){
    const wrap = document.getElementById('tabbar');
    wrap.innerHTML = '';
    TAB_ITEMS.forEach(t=>{
      const btn = document.createElement('button');
      btn.className = 'tabitem' + (t.id==='today'?' active':'');
      btn.dataset.tab = t.id;
      btn.innerHTML = icon(t.icon,24) + '<span>'+t.label+'</span>';
      btn.addEventListener('click', ()=>gotoPage(t.id));
      wrap.appendChild(btn);
    });
  }
  function renderSubtabContent(group, sub){
    if(group==='tasks'){
      if(sub==='list'){ renderTaskList(); }
      if(sub==='subjects') renderSubjectsPage();
    }
    if(group==='health'){
      if(sub==='training'){ renderExerciseChips(); renderProgressSelect(); renderRecentSets(); renderPlanEditor(); }
      if(sub==='nutrition') renderNutritionPage();
      if(sub==='habits') renderHabitGrid();
    }
    if(group==='settings'){
      if(sub==='general') renderPlanEditor();
      if(sub==='classes') renderClassesPage();
    }
  }
  function gotoSubtab(group, sub){
    SUBTAB_STATE[group] = sub;
    document.querySelectorAll('#'+group+'-subtabs .subtab').forEach(b=>b.classList.toggle('active', b.dataset.sub===sub));
    document.querySelectorAll('.subpage[data-group="'+group+'"]').forEach(p=>p.classList.toggle('active', p.id===group+'-sub-'+sub));
    renderSubtabContent(group, sub);
  }

  function wireSubtabs(){
    document.querySelectorAll('.subtabs').forEach(bar=>{
      const group = bar.id.replace('-subtabs','');
      bar.querySelectorAll('.subtab').forEach(btn=>{
        btn.addEventListener('click', ()=>gotoSubtab(group, btn.dataset.sub));
      });
    });
  }

  const mainScroll=document.getElementById('main-scroll');
  let mainTouchY=0;
  mainScroll.addEventListener('touchstart',e=>{if(e.touches.length===1) mainTouchY=e.touches[0].clientY;},{passive:true});
  mainScroll.addEventListener('touchmove',e=>{
    if(e.touches.length!==1) return;
    const y=e.touches[0].clientY, dy=y-mainTouchY;
    const atTop=mainScroll.scrollTop<=0;
    const atBottom=mainScroll.scrollTop+mainScroll.clientHeight>=mainScroll.scrollHeight-1;
    if((atTop&&dy>0)||(atBottom&&dy<0)) e.preventDefault();
    mainTouchY=y;
  },{passive:false});

  const tabbarLock=document.getElementById('tabbar');
  tabbarLock.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
  tabbarLock.addEventListener('dragstart',e=>e.preventDefault());
  tabbarLock.addEventListener('contextmenu',e=>e.preventDefault());

  function gotoPage(id){
    document.querySelectorAll('.tabitem').forEach(n=>n.classList.toggle('active', n.dataset.tab===id));
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById('page-'+id).classList.add('active');
    document.getElementById('main-scroll').scrollTop = 0;
    if(id==='today') renderDashboard();
    if(id==='calendar') renderAllCalendarBits();
    if(SUBTAB_STATE[id]){
      renderSubtabContent(id, SUBTAB_STATE[id]);
    }
  }

  function renderStatbar(){
    const doneToday = Object.values((state.habitLogs[todayKey()]||{})).filter(Boolean).length;
    const tasksOpen = state.tasks.filter(t=>!t.done).length;
    const wrap = document.getElementById('statbar');
    wrap.innerHTML = '';
    [['Open tasks',tasksOpen],['Habits today',doneToday+'/'+state.habits.length]]
      .forEach(([lbl,num])=>{
        const cell=document.createElement('div'); cell.className='statcell';
        cell.innerHTML='<div class="num">'+num+'</div><div class="lbl">'+lbl+'</div>';
        wrap.appendChild(cell);
      });
  }
  const WIDGET_DEFS = {
    classes:{title:'Today\u2019s Classes', render:renderWidgetClasses},
    train:{title:'Today\u2019s Training', render:renderWidgetTrain},
    nutrition:{title:'Nutrition', render:renderWidgetNutrition},
    habits:{title:'Habits Today', render:renderWidgetHabits},
    tasks:{title:'Tasks Due Soon', render:renderWidgetTasks},
    calendar:{title:'Upcoming', render:renderWidgetCalendar},
    prayer:{title:'Prayer Times', render:renderWidgetPrayer}
  };
  function renderWidgetTrain(el){
    const day = todayDayCode(); const cat = state.config.plan[day]||'rest';
    if(cat==='rest'){
      el.innerHTML = '<span class="badge rest">REST</span><p style="margin-top:10px;">Rest day \u2014 recover.</p>';
      return;
    }
    const exList = state.exercises.filter(e=>e.category===cat);
    const days = []; for(let i=6;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); days.push(dateKey(d)); }
    const totals = days.map(d=> state.logs.filter(l=>l.category===cat && l.date===d).reduce((s,l)=>s+l.weight*l.reps,0) );
    const maxT = Math.max(...totals, 1);
    const chart = '<div style="display:flex;align-items:flex-end;gap:4px;height:48px;margin-top:10px;">' +
      totals.map(t=>'<div style="flex:1;height:'+Math.max(2,(t/maxT)*48)+'px;background:var(--coral);border-radius:3px 3px 0 0;opacity:'+(t>0?0.9:0.2)+';"></div>').join('') + '</div>';
    el.innerHTML = '<span class="badge '+cat+'">'+cat.toUpperCase()+'</span>' +
      (exList.length ? '<p style="margin-top:10px;">'+exList.map(e=>escapeHTML(e.name)).join(', ')+'</p>' : '<p style="margin-top:10px;">No '+cat+' exercises logged yet.</p>') +
      chart + '<p class="lbl" style="font-size:10px;margin-top:4px;">7-day volume (kg\u00d7reps)</p>';
  }
  function renderWidgetNutrition(el){
    const nut = state.nutrition[todayKey()] || {calories:0,protein:0,carbs:0,fat:0};
    const g = state.config.settings;
    el.innerHTML = ['calories','protein','carbs','fat'].map(k=>{
      const goal = g[k==='calories'?'calGoal':k+'Goal']||0;
      const pct = goal>0 ? Math.min(100,(nut[k]/goal)*100) : (nut[k]>0?15:0);
      const label = k[0].toUpperCase()+k.slice(1);
      const color = k==='calories'?'var(--coral)':k==='protein'?'var(--blue)':k==='carbs'?'var(--gold)':'var(--purple)';
      return '<div class="nutri-row"><div class="nutri-label"><span>'+label+'</span><span class="val">'+Math.round(nut[k])+(goal>0?' / '+Math.round(goal):'')+'</span></div><div class="nutri-bar"><div class="nutri-fill" style="width:'+pct+'%;background:'+color+';"></div></div></div>';
    }).join('');
  }
  function formatHabitTime(value){
    if(!value) return '';
    const [h,m]=String(value).split(':').map(Number);
    if(!Number.isFinite(h)||!Number.isFinite(m)) return value;
    const hour=h%12||12;
    return `${hour}:${String(m).padStart(2,'0')} ${h<12?'AM':'PM'}`;
  }

  function renderWidgetHabits(el){
    const log = state.habitLogs[todayKey()] || {};
    el.innerHTML = state.habits.length ? '<div class="dash-habits">'+state.habits.map(h=>{
      const done = !!log[h.id];
      return '<button type="button" class="dash-habit'+(done?' done':'')+'" data-habit="'+h.id+'"><span>'+escapeHTML(h.name)+(h.time?'<small style="display:block;color:var(--muted);font-size:10px;margin-top:3px;">'+formatHabitTime(h.time)+'</small>':'')+'</span><span class="dash-habit-mark">'+(done?'✓':'')+'</span></button>';
    }).join('')+'</div>' : '<div class="empty-state">No habits yet — add one in Health → Habits.</div>';
    el.querySelectorAll('[data-habit]').forEach(btn=>btn.addEventListener('click', async ()=>{
      const key=todayKey(); if(!state.habitLogs[key]) state.habitLogs[key]={};
      btn.classList.add('item-complete');await new Promise(r=>setTimeout(r,140));state.habitLogs[key][btn.dataset.habit] = !state.habitLogs[key][btn.dataset.habit]; haptic();
      await save('habitLogs', state.habitLogs); renderDashboard();
    }));
  }
  function renderWidgetTasks(el){
    const upcoming=state.tasks.filter(t=>!t.done).slice(0,5);
    el.innerHTML=upcoming.length?upcoming.map(t=>'<div class="dash-task"><div class="dash-task-main"><div class="dash-task-title">'+escapeHTML(t.title)+'</div>'+(t.notes?'<div class="dash-task-date">'+escapeHTML(t.notes)+'</div>':'')+'</div><button class="btn green quick-done" data-done-task="'+t.id+'">Done</button></div>').join(''):'<div class="empty-state">All clear — no open tasks.</div>';
    el.querySelectorAll('[data-done-task]').forEach(b=>b.onclick=async()=>{const t=state.tasks.find(x=>x.id===b.dataset.doneTask);if(t){await animateOut(b.closest('.dash-task'),'item-complete');t.done=true;haptic();await save('tasks',state.tasks);renderDashboard();}});
  }
  function renderWidgetCalendar(el){
    const upcoming = state.events.filter(e=>!e.done && e.date && e.date>=todayKey()).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);
    el.innerHTML = upcoming.length ? upcoming.map(e=>{
      const d=new Date(e.date+'T12:00:00');
      const day=d.toLocaleDateString('en-US',{day:'numeric'});
      const mon=d.toLocaleDateString('en-US',{month:'short'}).toUpperCase();
      const when=e.date===todayKey()?'TODAY':d.toLocaleDateString('en-US',{weekday:'short'}).toUpperCase();
      return '<div class="dash-event"><div class="dash-datebox"><strong>'+day+'</strong><span>'+mon+'</span></div><div class="dash-event-main"><div class="dash-event-title">'+escapeHTML(e.title)+'</div><div class="dash-event-meta">'+when+(e.type?' · '+escapeHTML(e.type).toUpperCase():'')+'</div></div><button class="btn green quick-done" data-done-event="'+e.id+'">Done</button></div>';
    }).join('') : '<div class="empty-state">Nothing upcoming — your calendar is clear.</div>';
    el.querySelectorAll('[data-done-event]').forEach(b=>b.onclick=async()=>{const e=state.events.find(x=>x.id===b.dataset.doneEvent);if(e){await animateOut(b.closest('.dash-event'),'item-complete');e.done=true;haptic();await save('events',state.events);renderDashboard();}});
  }
  function renderWidgetPrayer(el){
    const {times,order,nextKey,nextDiff} = getNextPrayer();
    const h=Math.floor(nextDiff), m=Math.round((nextDiff-h)*60);
    el.innerHTML = '<div class="prayer-list">' + order.map(([k,l])=>'<div class="prayer-item'+(k===nextKey?' next':'')+'"><div class="pname">'+l+'</div><div class="ptime">'+fmtTime(times[k])+'</div></div>').join('') + '</div>' +
      '<p style="text-align:center;margin-top:8px;color:var(--coral);font-weight:700;">Next: '+order.find(o=>o[0]===nextKey)[1]+' in '+h+'h '+m+'m</p>';
  }
  let dragId = null;
  function renderDashboard(){
    document.getElementById('dash-date-overview').textContent = new Date().toLocaleDateString('en-US',{weekday:'long', month:'long', day:'numeric'});
    renderStatbar();
    const grid = document.getElementById('widget-grid');
    grid.innerHTML = '';
    const order = state.config.dashboardOrder.filter(id=>id!=='creatine');
    order.forEach(id=>{
      const def = WIDGET_DEFS[id]; if(!def) return;
      const w = document.createElement('div');
      w.className = 'widget'; w.draggable = true; w.dataset.id = id;
      w.innerHTML = '<div class="widget-head"><h3>'+def.title+'</h3></div><div class="widget-body"></div>';
      w.addEventListener('dragstart', ()=>{ dragId=id; w.classList.add('dragging'); });
      w.addEventListener('dragend', ()=>{ w.classList.remove('dragging'); });
      w.addEventListener('dragover', e=>e.preventDefault());
      w.addEventListener('drop', async e=>{
        e.preventDefault();
        if(!dragId || dragId===id) return;
        const arr = state.config.dashboardOrder;
        const from = arr.indexOf(dragId), to = arr.indexOf(id);
        arr.splice(from,1); arr.splice(to,0,dragId);
        await save('config', state.config); renderDashboard();
      });
      grid.appendChild(w);
      def.render(w.querySelector('.widget-body'));
    });
  }

  let selectedLogCategory = null;
  function distinctExerciseNames(){
    const names = new Set(state.exercises.map(e=>e.name));
    state.logs.forEach(l=>names.add(l.name));
    return Array.from(names).sort();
  }
  function renderExerciseChips(){
    const wrap = document.getElementById('exercise-chips'); wrap.innerHTML = '';
    state.exercises.forEach(ex=>{
      const chip = document.createElement('span');
      chip.className = 'exercise-chip';
      chip.textContent = ex.name;
      chip.onclick = ()=>{
        document.getElementById('log-in-name').value = ex.name;
        selectedLogCategory = ex.category;
        document.querySelectorAll('#log-cat-picker .exercise-chip').forEach(b=>b.classList.toggle('active', b.dataset.cat===ex.category));
      };
      wrap.appendChild(chip);
    });
    const datalist = document.getElementById('exercise-names');
    datalist.innerHTML = distinctExerciseNames().map(n=>'<option value="'+escapeHTML(n)+'">').join('');
  }
  document.getElementById('log-in-name').addEventListener('input', ()=>{
    const typed = document.getElementById('log-in-name').value.trim().toLowerCase();
    const match = state.exercises.find(e=>e.name.toLowerCase()===typed);
    if(match){
      selectedLogCategory = match.category;
      document.querySelectorAll('#log-cat-picker .exercise-chip').forEach(b=>b.classList.toggle('active', b.dataset.cat===match.category));
    }
  });
  document.querySelectorAll('#log-cat-picker .exercise-chip').forEach(btn=>btn.addEventListener('click', ()=>{
    selectedLogCategory = btn.dataset.cat;
    document.querySelectorAll('#log-cat-picker .exercise-chip').forEach(b=>b.classList.toggle('active', b===btn));
  }));
  document.getElementById('log-save-btn').addEventListener('click', async ()=>{
    const name = document.getElementById('log-in-name').value.trim();
    const w = parseFloat(document.getElementById('log-in-weight').value);
    const r = parseInt(document.getElementById('log-in-reps').value);
    const err = document.getElementById('log-err');
    if(!name || !selectedLogCategory || isNaN(w) || w<0 || isNaN(r) || r<1){
      err.textContent = 'Fill in name, category, weight, and reps.'; err.style.display='block'; return;
    }
    err.style.display = 'none';
    if(!state.exercises.find(e=>e.name.toLowerCase()===name.toLowerCase())){
      state.exercises.push({id:name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-'+Date.now(), name, category:selectedLogCategory});
      await save('exercises', state.exercises);
    }
    const prevBest = state.logs.filter(l=>l.name.toLowerCase()===name.toLowerCase()).reduce((m,l)=>Math.max(m,l.weight),0);
    state.logs.push({date:todayKey(), name, category:selectedLogCategory, weight:w, reps:r});
    await save('logs', state.logs);
    document.getElementById('log-in-weight').value=''; document.getElementById('log-in-reps').value='';
    if(w > prevBest) showToast('New best for '+name+': '+w+' kg');
    else showToast('Set logged.');
    renderExerciseChips(); renderProgressSelect(); renderRecentSets();
  });
  function renderRecentSets(){
    const wrap = document.getElementById('recent-sets'); wrap.innerHTML = '';
    state.logs.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,15).forEach(l=>{
      const tr = document.createElement('tr');
      tr.innerHTML = '<td>'+l.date+'</td><td>'+escapeHTML(l.name)+'</td><td><span class="badge '+l.category+'">'+l.category+'</span></td><td>'+l.weight+' kg</td><td>'+l.reps+'</td>';
      wrap.appendChild(tr);
    });
  }
  function renderProgressSelect(){
    const sel = document.getElementById('progress-select'); const prev = sel.value; sel.innerHTML = '';
    distinctExerciseNames().forEach(n=>{ const o=document.createElement('option'); o.value=n; o.textContent=n; sel.appendChild(o); });
    if(prev) sel.value = prev;
    renderProgressChart();
  }
  function renderProgressChart(){
    const name = document.getElementById('progress-select').value;
    const canvas = document.getElementById('progress-canvas'); const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const entries = state.logs.filter(l=>l.name===name).sort((a,b)=>a.date.localeCompare(b.date));
    const statsWrap = document.getElementById('progress-stats');
    if(!entries.length){ ctx.fillStyle='#8A8D93'; ctx.font='13px sans-serif'; ctx.fillText('No sets logged yet.',20,100); statsWrap.innerHTML=''; return; }
    const maxVal = Math.max(...entries.map(e=>e.weight),1);
    const padL=34, padB=20, w=canvas.width-padL-10, h=canvas.height-padB-10;
    const barW = Math.max(4, Math.floor(w/entries.length)-4);
    ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.beginPath();
    ctx.moveTo(padL,10); ctx.lineTo(padL,canvas.height-padB); ctx.lineTo(canvas.width-10,canvas.height-padB); ctx.stroke();
    entries.forEach((e,i)=>{ const bh=(e.weight/maxVal)*h; ctx.fillStyle='#4DA3FF'; ctx.fillRect(padL+i*(barW+4)+4, canvas.height-padB-bh, barW, bh); });
    ctx.fillStyle='#8A8D93'; ctx.font='11px sans-serif'; ctx.fillText(maxVal+' kg',2,16);
    const best = Math.max(...entries.map(e=>e.weight));
    statsWrap.innerHTML = '<table style="margin-top:8px;"><tr><td>Sets logged</td><td>'+entries.length+'</td></tr><tr><td>Best weight</td><td>'+best+' kg</td></tr></table>';
  }

  function openTaskEdit(t){document.getElementById('task-edit-id').value=t.id;document.getElementById('task-in-title').value=t.title;document.getElementById('task-in-notes').value=t.notes||'';document.getElementById('task-form').style.display='block';document.getElementById('task-in-title').focus();}
  function renderTaskList(){
    const wrap = document.getElementById('task-list');
    wrap.innerHTML = '';
    const list = state.tasks.slice().sort((a,b)=>(a.done-b.done));
    if(!list.length){ wrap.innerHTML = '<div class="empty-state">No tasks yet — enjoy the clear list.</div>'; return; }
    list.forEach(t=>{
      const row = document.createElement('div'); row.className='task-row';
      const check = document.createElement('button'); check.className='checkbtn'+(t.done?' checked':''); check.textContent=t.done?'\u2713':'';
      check.onclick = async ()=>{ t.done=!t.done; haptic(); await save('tasks', state.tasks); renderTaskList(); renderStatbar(); };
      const body = document.createElement('div'); body.style.flex='1';
      const subDone = (t.subtasks||[]).filter(s=>s.done).length;
      body.innerHTML = '<div class="ttitle'+(t.done?' done':'')+'">'+escapeHTML(t.title)+'</div>'+((t.subtasks&&t.subtasks.length)?'<div class="task-meta"><span>'+subDone+'/'+t.subtasks.length+' subtasks</span></div>':'');
      row.appendChild(check); row.appendChild(body);
      const edit = document.createElement('button'); edit.className='btn gray small'; edit.textContent='Edit';
      edit.onclick=e=>{e.stopPropagation();openTaskEdit(t);};
      row.appendChild(edit);
      const del = document.createElement('button'); del.className='btn gray small'; del.textContent='Delete';
      del.onclick = async e=>{e.stopPropagation();const idx=state.tasks.findIndex(x=>x.id===t.id),copy=JSON.parse(JSON.stringify(t));await animateOut(row);state.tasks.splice(idx,1);await save('tasks',state.tasks);renderTaskList();renderStatbar();offerUndo('Task deleted',async()=>{state.tasks.splice(Math.min(idx,state.tasks.length),0,copy);await save('tasks',state.tasks);renderTaskList();renderStatbar();});};
      row.appendChild(del);
      body.onclick=()=>openTaskEdit(t);
      let sx=0,dx=0;
      row.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;dx=0;row.classList.add('swiping')},{passive:true});
      row.addEventListener('touchmove',e=>{dx=e.touches[0].clientX-sx;if(Math.abs(dx)>8)row.style.transform='translateX('+Math.max(-90,Math.min(90,dx))+'px)'},{passive:true});
      row.addEventListener('touchend',async()=>{row.classList.remove('swiping');row.style.transform='';if(dx>70){t.done=true;haptic();await save('tasks',state.tasks);renderTaskList();renderStatbar();}else if(dx<-70){haptic();state.tasks=state.tasks.filter(x=>x.id!==t.id);await save('tasks',state.tasks);renderTaskList();renderStatbar();}});
      wrap.appendChild(row);
      (t.subtasks||[]).forEach(st=>{
        const sr = document.createElement('div'); sr.className='subtask-row';
        const sc = document.createElement('button'); sc.className='checkbtn'+(st.done?' checked':''); sc.style.width='16px'; sc.style.height='16px'; sc.textContent=st.done?'\u2713':'';
        sc.onclick = async ()=>{ st.done=!st.done; await save('tasks', state.tasks); renderTaskList(); };
        const lbl = document.createElement('span'); lbl.className = st.done?'done':''; lbl.textContent = st.title;
        sr.appendChild(sc); sr.appendChild(lbl); wrap.appendChild(sr);
      });
      const addSub = document.createElement('div'); addSub.style.padding='4px 0 10px 29px';
      const input = document.createElement('input'); input.type='text'; input.placeholder='+ subtask, press Enter'; input.style.width='70%'; input.style.fontSize='12px'; input.style.padding='5px 8px';
      input.addEventListener('keydown', async e=>{
        if(e.key==='Enter' && input.value.trim()){
          if(!t.subtasks) t.subtasks=[];
          t.subtasks.push({id:'st-'+Date.now(), title:input.value.trim(), done:false});
          await save('tasks', state.tasks); renderTaskList();
        }
      });
      addSub.appendChild(input); wrap.appendChild(addSub);
    });
  }

  function renderHabitGrid(){
    const wrap = document.getElementById('habit-grid'); wrap.innerHTML = '';
    if(!state.habits.length){ wrap.innerHTML='<p>No habits yet.</p>'; return; }
    const days = []; for(let i=13;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); days.push(dateKey(d)); }
    state.habits.forEach(h=>{
      const row = document.createElement('div'); row.className='heat-row';
      let streak=0; for(let i=days.length-1;i>=0;i--){ if((state.habitLogs[days[i]]||{})[h.id]) streak++; else break; }
      const cellsHTML = days.map(d=>'<div class="heat-cell'+(((state.habitLogs[d]||{})[h.id])?' on':'')+'" data-date="'+d+'" data-habit="'+h.id+'"></div>').join('');
      row.innerHTML = '<div class="heat-name">'+escapeHTML(h.name)+(h.time?'<div style="font-size:10px;color:var(--muted);margin-top:2px;">'+formatHabitTime(h.time)+'</div>':'')+'</div><div class="heat-cells">'+cellsHTML+'</div><div class="heat-streak">'+streak+'d streak</div><div class="item-actions"><button class="btn gray small" data-edit-habit="'+h.id+'">Edit</button><button class="btn gray small" data-del-habit="'+h.id+'">Delete</button></div>';
      wrap.appendChild(row);
    });
    wrap.querySelectorAll('[data-edit-habit]').forEach(btn=>btn.addEventListener('click',()=>{const h=state.habits.find(x=>x.id===btn.dataset.editHabit);if(!h)return;document.getElementById('habit-edit-id').value=h.id;document.getElementById('habit-in-name').value=h.name;document.getElementById('habit-in-time').value=h.time||'';document.getElementById('habit-form').style.display='block';document.getElementById('habit-in-name').focus();}));
    wrap.querySelectorAll('[data-del-habit]').forEach(btn=>btn.addEventListener('click', async ()=>{
      if(!await nexaConfirm('Delete habit?','Its history will be removed too.')) return;
      const hid = btn.dataset.delHabit;
      const idx=state.habits.findIndex(h=>h.id===hid),copy=JSON.parse(JSON.stringify(state.habits[idx])),history={};Object.keys(state.habitLogs).forEach(d=>{if(state.habitLogs[d]?.[hid]!==undefined)history[d]=state.habitLogs[d][hid];});
      state.habits.splice(idx,1);Object.keys(state.habitLogs).forEach(d=>{delete state.habitLogs[d][hid];});
      await save('habits',state.habits);await save('habitLogs',state.habitLogs);renderHabitGrid();renderStatbar();
      offerUndo('Habit deleted',async()=>{state.habits.splice(Math.min(idx,state.habits.length),0,copy);Object.entries(history).forEach(([d,v])=>{if(!state.habitLogs[d])state.habitLogs[d]={};state.habitLogs[d][hid]=v;});await save('habits',state.habits);await save('habitLogs',state.habitLogs);renderHabitGrid();renderStatbar();});
    }));
    wrap.querySelectorAll('.heat-cell').forEach(c=>c.addEventListener('click', async ()=>{
      const d=c.dataset.date, hid=c.dataset.habit;
      if(!state.habitLogs[d]) state.habitLogs[d]={};
      state.habitLogs[d][hid] = !state.habitLogs[d][hid];
      await save('habitLogs', state.habitLogs); renderHabitGrid(); renderStatbar();
    }));
  }

  function renderNutritionPage(){
    const nut = state.nutrition[todayKey()] || {calories:0,protein:0,carbs:0,fat:0};
    const g = state.config.settings;
    setBar('cal','calories','calGoal','');
    setBar('protein','protein','proteinGoal','g');
    setBar('carbs','carbs','carbGoal','g');
    setBar('fat','fat','fatGoal','g');
    function setBar(prefix,key,goalKey,unit){
      const goal = g[goalKey]||0; const val = nut[key]||0;
      document.getElementById('nut-'+prefix+'-txt').textContent = Math.round(val)+unit+(goal>0?' / '+Math.round(goal)+unit:'');
      document.getElementById('nut-'+prefix+'-fill').style.width = (goal>0?Math.min(100,(val/goal)*100):(val>0?15:0))+'%';
    }
    document.getElementById('goal-cal').value = g.calGoal||'';
    document.getElementById('goal-protein').value = g.proteinGoal||'';
    document.getElementById('goal-carbs').value = g.carbGoal||'';
    document.getElementById('goal-fat').value = g.fatGoal||'';
    const hist = document.getElementById('nutri-history'); hist.innerHTML = '';
    const dates = Object.keys(state.nutrition).sort().reverse().slice(0,14);
    dates.forEach(d=>{
      const n = state.nutrition[d];
      const tr = document.createElement('tr');
      tr.innerHTML = '<td>'+d+'</td><td>'+Math.round(n.calories)+'</td><td>'+Math.round(n.protein)+'g</td><td>'+Math.round(n.carbs)+'g</td><td>'+Math.round(n.fat)+'g</td>';
      hist.appendChild(tr);
    });
  }

  function jsDayToCol(jsDay){ return (jsDay+1)%7; }
  function typeColor(t){ return {workout:'#FF8A3D',course:'#4DA3FF',movie:'#B072E8',plan:'#33D67A',custom:'#7C818A'}[t]||'#7C818A'; }
  function renderCalendar(){
    document.getElementById('cal-month-label').textContent = new Date(calYear,calMonth,1).toLocaleString('en-US',{month:'long',year:'numeric'});
    const dowRow = document.getElementById('cal-dow-row'); dowRow.innerHTML='';
    ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'].forEach(d=>{ const el=document.createElement('div'); el.className='cal-dow'; el.textContent=d; dowRow.appendChild(el); });
    const grid = document.getElementById('cal-grid'); grid.innerHTML='';
    const first = new Date(calYear,calMonth,1); const offset = jsDayToCol(first.getDay());
    const daysInMonth = new Date(calYear,calMonth+1,0).getDate();
    for(let i=0;i<offset;i++){ const c=document.createElement('div'); c.className='cal-cell empty'; grid.appendChild(c); }
    const todayStr = todayKey();
    for(let d=1; d<=daysInMonth; d++){
      const key = dateKey(new Date(calYear,calMonth,d));
      const cell = document.createElement('div');
      cell.className = 'cal-cell'+(key===todayStr?' today':'')+(key===calSelectedDate?' selected':'');
      const dayEvents = state.events.filter(e=>e.date===key);
      let dots = dayEvents.length ? '<div class="cal-dots">'+dayEvents.slice(0,4).map(e=>'<div class="cal-dot" style="background:'+typeColor(e.type)+'"></div>').join('')+'</div>' : '';
      cell.innerHTML = d+dots;
      cell.onclick = ()=>{ calSelectedDate=key; renderCalendar(); renderCalDayDetail(); };
      grid.appendChild(cell);
    }
  }
  function openEventEdit(ev){document.getElementById('event-edit-id').value=ev.id;document.getElementById('ev-title').value=ev.title;document.getElementById('ev-type').value=ev.type;document.getElementById('ev-date').value=ev.date||'';document.getElementById('ev-notes').value=ev.notes||'';document.getElementById('cal-form').style.display='block';document.getElementById('ev-title').focus();}
  function eventRow(ev){
    const row = document.createElement('div'); row.className='task-row';
    const check = document.createElement('button'); check.className='checkbtn'+(ev.done?' checked':''); check.textContent=ev.done?'\u2713':'';
    check.onclick = async ()=>{ ev.done=!ev.done; await save('events', state.events); renderAllCalendarBits(); };
    row.appendChild(check);
    const body = document.createElement('div'); body.style.flex='1';
    body.innerHTML = '<span class="badge '+ev.type+'">'+ev.type+'</span> <span class="ttitle'+(ev.done?' done':'')+'" style="margin-left:6px;">'+escapeHTML(ev.title)+'</span>';
    row.appendChild(body); body.onclick=()=>openEventEdit(ev);
    const edit=document.createElement('button');edit.className='btn gray small';edit.textContent='Edit';edit.onclick=e=>{e.stopPropagation();openEventEdit(ev);};
    row.appendChild(edit);
    return row;
  }
  function renderCalDayDetail(){
    const wrap = document.getElementById('cal-day-detail');
    if(!calSelectedDate){ wrap.style.display='none'; return; }
    wrap.style.display='block';
    document.getElementById('cal-day-title').textContent = calSelectedDate;
    const list = document.getElementById('cal-day-events');
    const items = state.events.filter(e=>e.date===calSelectedDate);
    list.innerHTML = items.length ? '' : '<p>Nothing here yet.</p>';
    items.forEach(ev=>list.appendChild(eventRow(ev)));
  }
  function renderAllCalendarBits(){ renderCalendar(); renderCalDayDetail(); }

  function renderPlanEditor(){
    const wrap = document.getElementById('plan-days'); wrap.innerHTML='';
    DAYS.forEach(day=>{
      const row = document.createElement('div'); row.className='row'; row.style.padding='8px 0'; row.style.borderBottom='1px solid var(--border)';
      const label = document.createElement('span'); label.textContent = DAY_LABELS[day]; label.style.fontWeight='600'; label.style.fontSize='13px';
      const sel = document.createElement('select'); sel.style.width='130px';
      ['push','pull','legs','rest'].forEach(c=>{ const o=document.createElement('option'); o.value=c; o.textContent=c[0].toUpperCase()+c.slice(1); if(state.config.plan[day]===c)o.selected=true; sel.appendChild(o); });
      sel.onchange = async ()=>{ state.config.plan[day]=sel.value; await save('config', state.config); };
      row.appendChild(label); row.appendChild(sel); wrap.appendChild(row);
    });
  }

  function renderSubjectsPage(){
    const wrap = document.getElementById('subjects-list');
    wrap.innerHTML = '';
    if(!state.subjects.length){
      wrap.innerHTML = '<p style="margin-bottom:14px;">Add a subject below, then add lectures/labs under it \u2014 e.g. "Mathematics" \u2192 "Lec 2", "Lab 4".</p>';
    }
    state.subjects.forEach(s=>{
      const card = document.createElement('div'); card.className = 'card';
      const items = state.subjectItems.filter(i=>i.subjectId===s.id);
      const doneCount = items.filter(i=>i.done).length;
      card.innerHTML = '<div class="row" style="margin-bottom:10px;">' +
        '<h3 style="font-size:16px;font-weight:800;">'+escapeHTML(s.name)+'</h3>' +
        '<span style="font-size:12px;color:var(--muted);">'+doneCount+'/'+items.length+'</span></div>';
      const itemsWrap = document.createElement('div');
      items.forEach(item=>{
        const row = document.createElement('div'); row.className = 'task-row'; row.style.padding = '8px 0';
        const check = document.createElement('button');
        check.className = 'checkbtn' + (item.done ? ' checked' : '');
        check.textContent = item.done ? '\u2713' : '';
        check.onclick = async () => { item.done = !item.done; await save('subjectItems', state.subjectItems); renderSubjectsPage(); };
        const lbl = document.createElement('div'); lbl.style.flex = '1';
        lbl.innerHTML = '<span class="ttitle'+(item.done?' done':'')+'">'+escapeHTML(item.title)+'</span>';
        const del = document.createElement('button'); del.className = 'btn gray small'; del.textContent = '\u2715';
        del.onclick = async () => { state.subjectItems = state.subjectItems.filter(x=>x.id!==item.id); await save('subjectItems', state.subjectItems); renderSubjectsPage(); };
        row.appendChild(check); row.appendChild(lbl); row.appendChild(del);
        itemsWrap.appendChild(row);
      });
      card.appendChild(itemsWrap);

      const addRow = document.createElement('div'); addRow.style.marginTop = '8px';
      const input = document.createElement('input'); input.type = 'text';
      input.placeholder = 'e.g. Lec 2, Lab 4 \u2014 press Enter';
      input.addEventListener('keydown', async e => {
        if(e.key === 'Enter' && input.value.trim()){
          state.subjectItems.push({id:'si-'+Date.now(), subjectId:s.id, title:input.value.trim(), done:false});
          await save('subjectItems', state.subjectItems);
          renderSubjectsPage();
        }
      });
      addRow.appendChild(input);
      card.appendChild(addRow);

      const delSubject = document.createElement('button');
      delSubject.className = 'btn gray small'; delSubject.textContent = 'Delete subject'; delSubject.style.marginTop = '10px';
      delSubject.onclick = async () => {
        if(!await nexaConfirm('Delete subject?','Delete "'+s.name+'" and all its items?')) return;
        state.subjects = state.subjects.filter(x=>x.id!==s.id);
        state.subjectItems = state.subjectItems.filter(x=>x.subjectId!==s.id);
        await save('subjects', state.subjects); await save('subjectItems', state.subjectItems);
        renderSubjectsPage();
      };
      card.appendChild(delSubject);
      wrap.appendChild(card);
    });
  }
  document.getElementById('subject-add-btn').addEventListener('click', async () => {
    const name = document.getElementById('subject-in-name').value.trim();
    if(!name){ showToast('Name the subject first.'); return; }
    state.subjects.push({id:'subj-'+Date.now(), name});
    await save('subjects', state.subjects);
    document.getElementById('subject-in-name').value = '';
    renderSubjectsPage();
    showToast('Subject added.');
  });

  function openClassEdit(c){document.getElementById('class-edit-id').value=c.id;document.getElementById('class-in-subject').value=c.subject;document.getElementById('class-in-room').value=c.room||'';document.getElementById('class-in-type').value=c.type;document.getElementById('class-in-start').value=c.start;document.getElementById('class-in-end').value=c.end;document.getElementById('class-in-notes').value=c.notes||'';document.querySelectorAll('#class-day-picker .exercise-chip').forEach(b=>b.classList.toggle('active',b.dataset.day===c.day));document.getElementById('class-form').style.display='block';document.getElementById('class-in-subject').focus();}
  function renderClassRow(wrap, c){
    const row = document.createElement('div'); row.className='class-row '+c.type;
    const metaBits = ['ROOM '+escapeHTML(c.room||'-')];
    row.innerHTML = '<div class="ctime">'+c.start+' \u2013 '+c.end+'</div>' +
      '<div style="flex:1;"><div class="csubject">'+escapeHTML(c.subject)+'</div><div class="croom">'+metaBits.join(' \u00b7 ')+'</div></div>' +
      '<span class="badge '+c.type+'">'+c.type+'</span>';
    const edit=document.createElement('button');edit.className='btn gray small';edit.textContent='Edit';edit.onclick=e=>{e.stopPropagation();openClassEdit(c);};
    const actions=document.createElement('div');actions.className='item-actions';actions.appendChild(edit);
    const del = document.createElement('button'); del.className='btn gray small'; del.textContent='Delete';
    del.onclick = async e=>{e.stopPropagation();const idx=state.classSchedule.findIndex(x=>x.id===c.id),copy=JSON.parse(JSON.stringify(c));await animateOut(row);state.classSchedule.splice(idx,1);await save('classSchedule',state.classSchedule);renderClassesPage();offerUndo('Class deleted',async()=>{state.classSchedule.splice(Math.min(idx,state.classSchedule.length),0,copy);await save('classSchedule',state.classSchedule);renderClassesPage();});};
    actions.appendChild(del);row.appendChild(actions);
    row.querySelector('.csubject').parentElement.onclick=()=>openClassEdit(c);
    wrap.appendChild(row);
  }
  function renderClassesPage(){
    const datalist = document.getElementById('subject-names');
    if(datalist) datalist.innerHTML = state.subjects.map(s=>'<option value="'+escapeHTML(s.name)+'">').join('');
    const wrap = document.getElementById('class-days-wrap'); wrap.innerHTML = '';
    const daily = state.classSchedule.filter(c=>c.day==='daily').sort((a,b)=>a.start.localeCompare(b.start));
    if(daily.length){
      const header = document.createElement('div'); header.className='day-header';
      header.innerHTML = '<span>Every day</span><span>'+daily.length+' class'+(daily.length===1?'':'es')+'</span>';
      wrap.appendChild(header);
      daily.forEach(c=>renderClassRow(wrap, c));
    }
    DAYS.forEach(day=>{
      const classes = state.classSchedule.filter(c=>c.day===day).sort((a,b)=>a.start.localeCompare(b.start));
      if(!classes.length) return;
      const header = document.createElement('div'); header.className='day-header';
      header.innerHTML = '<span>'+DAY_LABELS[day]+'</span><span>'+classes.length+' class'+(classes.length===1?'':'es')+'</span>';
      wrap.appendChild(header);
      classes.forEach(c=>renderClassRow(wrap, c));
    });
    if(!state.classSchedule.length) wrap.innerHTML = '<p>No classes added yet.</p>';
  }
  document.getElementById('class-new-btn').addEventListener('click', ()=>{document.getElementById('class-edit-id').value='';document.getElementById('class-form').style.display='block';});
  document.getElementById('class-cancel-btn').addEventListener('click', ()=>{ document.getElementById('class-form').style.display='none'; });
  document.querySelectorAll('#class-day-picker .exercise-chip').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(btn.dataset.day==='daily'){
        const nowActive = !btn.classList.contains('active');
        document.querySelectorAll('#class-day-picker .exercise-chip').forEach(b=>b.classList.remove('active')); document.getElementById('class-edit-id').value='';
        if(nowActive) btn.classList.add('active');
      } else {
        document.querySelector('#class-day-picker [data-day="daily"]').classList.remove('active');
        btn.classList.toggle('active');
      }
    });
  });
  document.getElementById('class-save-btn').addEventListener('click', async ()=>{
    const subject = document.getElementById('class-in-subject').value.trim();
    const start = document.getElementById('class-in-start').value;
    const end = document.getElementById('class-in-end').value;
    const selectedDays = Array.from(document.querySelectorAll('#class-day-picker .exercise-chip.active')).map(b=>b.dataset.day);
    if(!subject || !start || !end || !selectedDays.length){ showToast('Fill in subject, time, and pick at least one day.'); return; }
    const room = document.getElementById('class-in-room').value.trim();
    const notes = document.getElementById('class-in-notes').value.trim();
    const type = document.getElementById('class-in-type').value;
    const editId=document.getElementById('class-edit-id').value;
    if(editId){const existing=state.classSchedule.find(x=>x.id===editId);if(existing)Object.assign(existing,{subject,room,notes,day:selectedDays[0],type,start,end});}
    else selectedDays.forEach((day,i)=>{state.classSchedule.push({id:'c-'+Date.now()+'-'+i,subject,room,notes,day,type,start,end});});
    await save('classSchedule', state.classSchedule);
    if(!state.subjects.find(s=>s.name.toLowerCase()===subject.toLowerCase())){
      state.subjects.push({id:'subj-'+Date.now(), name:subject});
      await save('subjects', state.subjects);
    }
    ['class-in-subject','class-in-room','class-in-notes','class-in-start','class-in-end'].forEach(id=>document.getElementById(id).value='');
    document.querySelectorAll('#class-day-picker .exercise-chip').forEach(b=>b.classList.remove('active'));
    document.getElementById('class-form').style.display='none';
    renderClassesPage(); showToast('Class added, and linked to a Subject automatically.');
  });
  document.getElementById('class-make-subjects-btn').addEventListener('click', async ()=>{
    const names = Array.from(new Set(state.classSchedule.map(c=>c.subject)));
    let added = 0;
    names.forEach(name=>{
      if(!state.subjects.find(s=>s.name.toLowerCase()===name.toLowerCase())){
        state.subjects.push({id:'subj-'+Date.now()+'-'+added, name});
        added++;
      }
    });
    if(added){ await save('subjects', state.subjects); showToast(added+' subject(s) created \u2014 check Tasks > Subjects.'); }
    else showToast('All classes already have a matching subject.');
  });
  function classStatus(c){
    if(!c?.start||!c?.end) return null;
    const now=new Date(), cur=now.getHours()*60+now.getMinutes();
    const sm=c.start.split(':').map(Number), em=c.end.split(':').map(Number), s=sm[0]*60+sm[1], e=em[0]*60+em[1];
    if(cur>=s&&cur<=e) return {label:'NOW',cls:'class-live'};
    if(cur<s&&s-cur<=60) return {label:'IN '+(s-cur)+' MIN',cls:'class-soon'};
    if(cur>e) return {label:'PASSED',cls:'class-passed'};
    return null;
  }
  function classHasPassed(c){
    if(!c || !c.end) return false;
    const now = new Date();
    const parts = String(c.end).split(':').map(Number);
    if(parts.length<2 || !Number.isFinite(parts[0]) || !Number.isFinite(parts[1])) return false;
    return now.getHours()*60+now.getMinutes() > parts[0]*60+parts[1];
  }
  function renderWidgetClasses(el){
    const day = todayDayCode();
    const classes = state.classSchedule.filter(c=>c.day===day||c.day==='daily').sort((a,b)=>a.start.localeCompare(b.start));
    el.innerHTML = '';
    if(!classes.length){ el.innerHTML = '<p>No classes today.</p>'; return; }
    classes.forEach(c=>{
      const row = document.createElement('div');
      const status = classStatus(c), passed = status?.label==='PASSED';
      row.className = 'class-row '+c.type+(passed?' passed':'');
      row.style.marginBottom = '8px';
      const metaBits = [];
      if(c.room) metaBits.push('ROOM '+escapeHTML(c.room));
      row.innerHTML =
        '<div style="flex:1;min-width:0;"><div class="csubject">'+escapeHTML(c.subject)+'</div>'+
        (metaBits.length?'<div class="croom">'+metaBits.join(' \u00b7 ')+'</div>':'')+
        '<span class="badge '+c.type+'" style="display:inline-block;margin-top:7px;">'+c.type+'</span></div>'+
        '<div class="ctime" style="width:auto;min-width:92px;text-align:right;align-self:center;color:var(--ink);font-size:13px;">'+c.start+' \u2013 '+c.end+'</div>';
      el.appendChild(row);
    });
  }

  document.getElementById('progress-select').addEventListener('change', renderProgressChart);

  document.getElementById('task-new-btn').addEventListener('click', ()=>{document.getElementById('task-edit-id').value='';document.getElementById('task-form').style.display='block';});
  document.getElementById('task-cancel-btn').addEventListener('click', ()=>{ document.getElementById('task-form').style.display='none'; });
  document.getElementById('task-save-btn').addEventListener('click', async ()=>{
    const title = document.getElementById('task-in-title').value.trim();
    if(!title){ showToast('Give it a title.'); return; }
    const editId=document.getElementById('task-edit-id').value;
    const vals={title,notes:document.getElementById('task-in-notes').value.trim()};
    if(editId){const t=state.tasks.find(x=>x.id===editId);if(t)Object.assign(t,vals);}else state.tasks.push({id:'t-'+Date.now(),...vals,done:false,subtasks:[]});
    await save('tasks', state.tasks);
    document.getElementById('task-in-title').value=''; document.getElementById('task-in-notes').value=''; document.getElementById('task-edit-id').value='';
    document.getElementById('task-form').style.display='none';
    renderTaskList(); renderStatbar(); showToast('Task added.');
  });
  document.getElementById('refresh-app-btn').addEventListener('click', async ()=>{
    const btn=document.getElementById('refresh-app-btn'); btn.disabled=true; btn.textContent='Refreshing…';
    try{
      if('serviceWorker' in navigator){
        const regs=await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(reg=>reg.update().catch(()=>{})));
        const keys=await caches.keys();
        await Promise.all(keys.filter(k=>k.startsWith('nexa-')).map(k=>caches.delete(k)));
      }
    }catch(e){ console.warn('Refresh failed',e); }
    location.reload();
  });

  document.getElementById('habit-new-btn').addEventListener('click', ()=>{document.getElementById('habit-edit-id').value='';document.getElementById('habit-form').style.display='block';});
  document.getElementById('habit-cancel-btn').addEventListener('click', ()=>{ document.getElementById('habit-form').style.display='none'; });
  document.getElementById('habit-save-btn').addEventListener('click', async ()=>{
    const name = document.getElementById('habit-in-name').value.trim();
    if(!name){ showToast('Name the habit.'); return; }
    const time = document.getElementById('habit-in-time').value||null;
    const editId=document.getElementById('habit-edit-id').value;
    if(editId){const h=state.habits.find(x=>x.id===editId);if(h){h.name=name;h.time=time;}}else state.habits.push({id:'h-'+Date.now(), name, time, preset:false});
    await save('habits', state.habits);
    document.getElementById('habit-in-name').value=''; document.getElementById('habit-in-time').value=''; document.getElementById('habit-edit-id').value=''; document.getElementById('habit-form').style.display='none';
    renderHabitGrid(); showToast('Habit added.');
  });

  document.getElementById('nut-add-btn').addEventListener('click', async ()=>{
    const cal=parseFloat(document.getElementById('nut-in-cal').value)||0, protein=parseFloat(document.getElementById('nut-in-protein').value)||0,
      carbs=parseFloat(document.getElementById('nut-in-carbs').value)||0, fat=parseFloat(document.getElementById('nut-in-fat').value)||0;
    if(cal<=0&&protein<=0&&carbs<=0&&fat<=0){ showToast('Add at least one value.'); return; }
    const key=todayKey(); const cur = state.nutrition[key]||{calories:0,protein:0,carbs:0,fat:0};
    state.nutrition[key] = {calories:cur.calories+cal, protein:cur.protein+protein, carbs:cur.carbs+carbs, fat:cur.fat+fat};
    await save('nutrition', state.nutrition);
    ['nut-in-cal','nut-in-protein','nut-in-carbs','nut-in-fat'].forEach(id=>document.getElementById(id).value='');
    renderNutritionPage(); showToast('Logged.');
  });
  document.getElementById('nut-reset-btn').addEventListener('click', async ()=>{
    if(!await nexaConfirm('Reset nutrition?','Reset today\'s totals?','Reset')) return;
    state.nutrition[todayKey()] = {calories:0,protein:0,carbs:0,fat:0};
    await save('nutrition', state.nutrition); renderNutritionPage();
  });
  document.getElementById('save-goals-btn').addEventListener('click', async ()=>{
    state.config.settings.calGoal = parseFloat(document.getElementById('goal-cal').value)||0;
    state.config.settings.proteinGoal = parseFloat(document.getElementById('goal-protein').value)||0;
    state.config.settings.carbGoal = parseFloat(document.getElementById('goal-carbs').value)||0;
    state.config.settings.fatGoal = parseFloat(document.getElementById('goal-fat').value)||0;
    await save('config', state.config); showToast('Targets saved.'); renderNutritionPage();
  });

  document.getElementById('cal-prev').addEventListener('click', ()=>{ calMonth--; if(calMonth<0){calMonth=11;calYear--;} renderCalendar(); });
  document.getElementById('cal-next').addEventListener('click', ()=>{ calMonth++; if(calMonth>11){calMonth=0;calYear++;} renderCalendar(); });
  document.getElementById('cal-add-btn').addEventListener('click', ()=>{ document.getElementById('cal-form').style.display='block'; document.getElementById('ev-date').value=calSelectedDate||''; document.getElementById('ev-title').focus(); });
  document.getElementById('ev-cancel').addEventListener('click', ()=>{ document.getElementById('cal-form').style.display='none'; document.getElementById('ev-title').value=''; document.getElementById('ev-notes').value=''; document.getElementById('event-edit-id').value=''; });
  document.getElementById('ev-save').addEventListener('click', async ()=>{
    const title = document.getElementById('ev-title').value.trim();
    if(!title){ showToast('Give it a title.'); return; }
    const editId=document.getElementById('event-edit-id').value, vals={title,type:document.getElementById('ev-type').value,date:document.getElementById('ev-date').value||null,notes:document.getElementById('ev-notes').value.trim()};
    if(editId){const ev=state.events.find(x=>x.id===editId);if(ev)Object.assign(ev,vals);}else state.events.push({id:'ev-'+Date.now(),...vals,done:false});
    await save('events', state.events);
    document.getElementById('cal-form').style.display='none'; document.getElementById('ev-title').value=''; document.getElementById('ev-notes').value='';
    renderAllCalendarBits(); showToast('Added.');
  });

  document.getElementById('save-settings-btn').addEventListener('click', async ()=>{
    state.config.settings.notifications={};
    state.config.settings.notificationLead={};
    ['classes','habits','prayer','events'].forEach(k=>{state.config.settings.notifications[k]=document.getElementById('notify-'+k).checked;state.config.settings.notificationLead[k]=parseInt(document.getElementById('notify-'+k+'-lead').value,10)||0;});
    await save('config', state.config);
    try{
      if(Notification.permission==='granted'){
        const reg=await navigator.serviceWorker.ready;
        await syncNexaPushSubscription(reg);
      }
    }catch(e){ console.error('Reminder sync failed',e); }
    showToast('Saved.');
  });
  document.getElementById('reset-btn').addEventListener('click', async ()=>{
    if(!await nexaConfirm('Reset all data?','This permanently deletes all Nexa data on this device.','Reset everything')) return;
    localStorage.clear();
    state = {exercises:JSON.parse(JSON.stringify(DEFAULT_EXERCISES)), logs:[], events:[], nutrition:{}, tasks:[], habits:JSON.parse(JSON.stringify(DEFAULT_HABITS)), habitLogs:{},
      classSchedule:[], subjects:[], subjectItems:[], health:{steps:{},sleep:{},weight:[]},
      config:{plan:Object.assign({},DEFAULT_PLAN), settings:{notifications:{classes:true,habits:true,prayer:true,events:true},notificationLead:{classes:15,habits:0,prayer:0,events:0}}, dashboardOrder:['classes','train','nutrition','habits','tasks','calendar','prayer']}};
    for(const k of ['exercises','logs','events','nutrition','tasks','habits','habitLogs','classSchedule','subjects','subjectItems','health','config']) await save(k, state[k]);
    showToast('All data reset.'); gotoPage('today');
  });

  async function init(){
    await loadAll();
    const now = new Date(); calYear=now.getFullYear(); calMonth=now.getMonth();
    const ns=state.config.settings.notifications;
    ['classes','tasks','habits','prayer','events'].forEach(k=>{const el=document.getElementById('notify-'+k);if(el)el.checked=ns[k]!==false;const lead=document.getElementById('notify-'+k+'-lead');if(lead)lead.value=String((state.config.settings.notificationLead||{})[k]||0);});
    renderTabbar();
    wireSubtabs();
    document.getElementById('loading').style.display='none';
    document.getElementById('shell').style.display='flex';
    renderDashboard();
    setInterval(()=>{ if(document.getElementById('page-today').classList.contains('active')) renderDashboard(); }, 60000);
  }
  init();
})();

  function urlBase64ToUint8Array(base64String){
    const padding='='.repeat((4-base64String.length%4)%4);
    const base64=(base64String+padding).replace(/-/g,'+').replace(/_/g,'/');
    const raw=atob(base64);
    return Uint8Array.from([...raw].map(c=>c.charCodeAt(0)));
  }
  async function syncNexaPushSubscription(reg){
    const cfg=window.NEXA_PUSH_CONFIG;
    if(!cfg?.publicKey || !cfg?.subscribeUrl) throw new Error('Push configuration is missing');
    let subscription=await reg.pushManager.getSubscription();
    if(!subscription){
      subscription=await reg.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(cfg.publicKey)
      });
    }
    const response=await fetch(cfg.subscribeUrl,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        subscription:subscription.toJSON(),
        timezone:Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        reminderData:{
          tasks:JSON.parse(localStorage.getItem('cb_tasks')||'[]'),
          events:JSON.parse(localStorage.getItem('cb_events')||'[]'),
          habits:JSON.parse(localStorage.getItem('cb_habits')||'[]'),
          habitLogs:JSON.parse(localStorage.getItem('cb_habitLogs')||'{}'),
          classes:JSON.parse(localStorage.getItem('cb_classSchedule')||'[]'),
          notificationSettings:(JSON.parse(localStorage.getItem('cb_config')||'{}').settings||{}).notifications||{classes:true,tasks:true,habits:true,prayer:true,events:true},
          notificationLead:(JSON.parse(localStorage.getItem('cb_config')||'{}').settings||{}).notificationLead||{classes:15,tasks:0,habits:0,prayer:0,events:0}
        }
      })
    });
    if(!response.ok) throw new Error('Could not save push subscription');
    return subscription;
  }
  async function setupNexaNotifications(){
    const status=document.getElementById('notification-status');
    if(!('serviceWorker' in navigator) || !('Notification' in window) || !('PushManager' in window)){
      if(status) status.textContent='Notifications are not supported in this browser.';
      return;
    }
    try{
      const reg=await navigator.serviceWorker.register('./service-worker.js');
      const refresh=()=>{ if(status) status.textContent = Notification.permission==='granted' ? 'Notifications are enabled.' : (Notification.permission==='denied' ? 'Notifications are blocked in iPhone settings.' : 'Notifications are off.'); };
      refresh();
      if(Notification.permission==='granted') await syncNexaPushSubscription(reg);
      const btn=document.getElementById('enable-notifications-btn');
      if(btn) btn.onclick=async()=>{
        const permission=await Notification.requestPermission(); refresh();
        if(permission==='granted'){
          await syncNexaPushSubscription(reg);
          await reg.showNotification('Nexa notifications are on',{body:'Background reminders are connected.',icon:'./logo.png',badge:'./logo.png',tag:'nexa-enabled'});
          showToast('Notifications enabled');
        }
      };
    }catch(e){ if(status) status.textContent='Could not enable notifications.'; console.error(e); }
  }

  window.addEventListener('load', setupNexaNotifications);
