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

  let state = {exercises:[],logs:[],events:[],config:{},nutrition:{},tasks:[],habits:[],habitLogs:{},health:{steps:{},sleep:{},weight:[]},prayerLogs:{},customReminders:[],classSchedule:[],courses:[],subjects:[],subjectItems:[]};
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
    state.habits.forEach(h=>{ if(!Array.isArray(h.days)||!h.days.length) h.days=['daily']; });
    state.habitLogs = await safeGet('habitLogs', {});
    state.prayerLogs = await safeGet('prayerLogs', {});
    state.customReminders = await safeGet('customReminders', []);
    if(state.config.settings.calendarReminderHours===undefined) state.config.settings.calendarReminderHours=24;
    let migratedEventReminders=false;state.events.forEach(e=>{if(e.reminderHours===undefined){e.reminderHours=Number(state.config.settings.calendarReminderHours??24);migratedEventReminders=true;}});if(migratedEventReminders)await save('events',state.events);
    state.health = await safeGet('health', {steps:{}, sleep:{}, weight:[]});
    state.classSchedule = await safeGet('classSchedule', []);
    state.subjects = await safeGet('subjects', []);
    state.subjectItems = await safeGet('subjectItems', []);
    if(!Array.isArray(state.config.classSubjectSuggestions)){state.config.classSubjectSuggestions=state.subjects.map(s=>s.name);}if(!Array.isArray(state.config.hiddenClassSubjectSuggestions))state.config.hiddenClassSubjectSuggestions=[];await save('config',state.config);
  }

  function escapeHTML(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
  function showToast(msg){ const t=document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),3000); }
  function nexaConfirm(title,message,confirmLabel='Delete'){return new Promise(resolve=>{const bg=document.createElement('div');bg.className='nexa-confirm-backdrop';bg.innerHTML='<div class="nexa-confirm" role="dialog" aria-modal="true"><h3>'+escapeHTML(title)+'</h3><p>'+escapeHTML(message)+'</p><div class="nexa-confirm-actions"><button class="btn gray" data-cancel>Cancel</button><button class="btn" style="background:#c0392b" data-confirm>'+escapeHTML(confirmLabel)+'</button></div></div>';document.body.appendChild(bg);const finish=v=>{bg.remove();resolve(v)};bg.querySelector('[data-cancel]').onclick=()=>finish(false);bg.querySelector('[data-confirm]').onclick=()=>finish(true);bg.onclick=e=>{if(e.target===bg)finish(false)};});}
  let undoTimer=null,undoEl=null;
  function offerUndo(label,fn){if(undoEl)undoEl.remove();if(undoTimer)clearTimeout(undoTimer);undoEl=document.createElement('div');undoEl.className='undo-toast';undoEl.innerHTML='<span>'+escapeHTML(label)+'</span><button type="button">UNDO</button>';document.body.appendChild(undoEl);undoEl.querySelector('button').onclick=async()=>{clearTimeout(undoTimer);undoEl.remove();undoEl=null;await fn();};undoTimer=setTimeout(()=>{if(undoEl)undoEl.remove();undoEl=null;},5000);}
  function animateOut(el,cls='item-remove'){return new Promise(resolve=>{el.classList.add(cls);setTimeout(resolve,180);});}
  function haptic(ms=12){ try{ if(navigator.vibrate) navigator.vibrate(ms); }catch(_){} }

  const LAT=30.0444, LNG=31.2357;
  function deg(x){return x*Math.PI/180;} function rad(x){return x*180/Math.PI;} function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function dayOfYear(d){ return Math.floor((d - new Date(d.getFullYear(),0,0))/86400000); }
  function calcPrayerTimes(date){
    const N=dayOfYear(date), B=deg(360/365*(N-81));
    const EoT = 9.87*Math.sin(2*B) - 7.53*Math.cos(B) - 1.5*Math.sin(B);
    const decl = deg(23.45*Math.sin(deg(360/365*(284+N))));
    const latR = deg(LAT);
    const TZ=-(new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTimezoneOffset()/60);
    const solarNoon = 12+TZ-LNG/15-EoT/60;
    function hourAngle(a){ const angle=deg(a); const c=(-Math.sin(angle)-Math.sin(latR)*Math.sin(decl))/(Math.cos(latR)*Math.cos(decl)); return rad(Math.acos(clamp(c,-1,1)))/15; }
    function asrHA(){ const alt=Math.atan(1/(1+Math.tan(Math.abs(latR-decl)))); const c=(Math.sin(alt)-Math.sin(latR)*Math.sin(decl))/(Math.cos(latR)*Math.cos(decl)); return rad(Math.acos(clamp(c,-1,1)))/15; }
    return {fajr:solarNoon-hourAngle(19.5), sunrise:solarNoon-hourAngle(0.833), dhuhr:solarNoon+(1/60), asr:solarNoon+asrHA(), maghrib:solarNoon+hourAngle(0.833), isha:solarNoon+hourAngle(17.5)};
  }
  function fmtTime(h){ h=((h%24)+24)%24; let hh=Math.floor(h), mm=Math.round((h-hh)*60); if(mm===60){mm=0;hh+=1;} hh=hh%24; const p=hh>=12?'PM':'AM'; let hh12=hh%12; if(hh12===0)hh12=12; return String(hh12).padStart(2,'0')+':'+String(mm).padStart(2,'0')+' '+p; }
  function formatClassTime(value){const parts=String(value||'').split(':').map(Number);if(parts.length<2||!Number.isFinite(parts[0])||!Number.isFinite(parts[1]))return value||'';const h=parts[0],m=String(parts[1]).padStart(2,'0');return (h%12||12)+':'+m+' '+(h>=12?'PM':'AM');}
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
      btn.addEventListener('click', ()=>{
        const now = Date.now();
        const previous = Number(btn.dataset.lastTap || 0);
        btn.dataset.lastTap = String(now);
        if(now - previous <= 450){
          btn.dataset.lastTap = '0';
          gotoPage(t.id);
          const firstSubtab = {tasks:'list',health:'training',settings:'general'}[t.id];
          if(firstSubtab) gotoSubtab(t.id, firstSubtab);
          const scrollContainer = document.getElementById('main-scroll');
          scrollContainer.scrollTop = 0;
          scrollContainer.scrollTo(0, 0);
          requestAnimationFrame(()=>{
            scrollContainer.scrollTop = 0;
            scrollContainer.scrollTo(0, 0);
          });
          return;
        }
        gotoPage(t.id);
      });
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
      renderPlanEditor();
      renderClassesPage();
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
  let mainTouchY=0, timePickerGesture=false;
  mainScroll.addEventListener('touchstart',e=>{
    if(e.touches.length===1) mainTouchY=e.touches[0].clientY;
    const target=e.target;
    timePickerGesture=!!(target&&target.closest&&target.closest('input[type="time"]'));
  },{passive:true});
  document.addEventListener('focusin',e=>{
    if(e.target&&e.target.matches&&e.target.matches('input[type="time"]')) timePickerGesture=true;
  });
  document.addEventListener('focusout',e=>{
    if(e.target&&e.target.matches&&e.target.matches('input[type="time"]')) setTimeout(()=>{timePickerGesture=false;},250);
  });
  mainScroll.addEventListener('touchmove',e=>{
    if(e.touches.length!==1) return;
    const y=e.touches[0].clientY, dy=y-mainTouchY;
    if(timePickerGesture||(document.activeElement&&document.activeElement.matches('input[type="time"]'))){mainTouchY=y;return;}
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
    const scrollContainer = document.getElementById('main-scroll');
    scrollContainer.scrollTop = 0;
    scrollContainer.scrollTo(0, 0);
    requestAnimationFrame(()=>{
      scrollContainer.scrollTop = 0;
      scrollContainer.scrollTo(0, 0);
    });
    if(id==='today') renderDashboard();
    if(id==='calendar') renderAllCalendarBits();
    if(SUBTAB_STATE[id]){
      renderSubtabContent(id, SUBTAB_STATE[id]);
    }
  }

  function habitDayCode(d){ const map={0:'sun',1:'mon',2:'tue',3:'wed',4:'thu',5:'fri',6:'sat'}; return map[d.getDay()]; }
  function habitStreak(h){let d=new Date();d.setHours(12,0,0,0);if(!habitIsScheduled(h,d)||!((state.habitLogs[dateKey(d)]||{})[h.id]))d.setDate(d.getDate()-1);let streak=0,guard=0;while(guard++<370){if(!habitIsScheduled(h,d)){d.setDate(d.getDate()-1);continue;}if((state.habitLogs[dateKey(d)]||{})[h.id]){streak++;d.setDate(d.getDate()-1);continue;}break;}return streak;}
  function renderCustomReminders(){}
  async function syncPushIfEnabled(){try{if('Notification'in window&&Notification.permission==='granted'){const reg=await navigator.serviceWorker.ready;await syncNexaPushSubscription(reg);}}catch(e){console.error('Reminder sync failed',e);}}

  function habitIsScheduled(h,d=new Date()){ const days=Array.isArray(h.days)&&h.days.length?h.days:['daily']; return days.includes('daily')||days.includes(habitDayCode(d)); }
  function habitTimeForDate(h,d=new Date()){const key=habitDayCode(d),weekly=h.weeklyTimes||{};return weekly[key]!==undefined?weekly[key]:(h.time||null);}
  function renderHabitWeeklyTimes(h={}){const wrap=document.getElementById('habit-weekly-times');if(!wrap)return;const weekly=h.weeklyTimes||{};const days=[['mon','Monday'],['tue','Tuesday'],['wed','Wednesday'],['thu','Thursday'],['fri','Friday'],['sat','Saturday'],['sun','Sunday']];wrap.innerHTML='<div class="habit-time-head">Optional: set a different time for each day</div>'+days.map(([key,label])=>'<label class="habit-time-row"><span>'+label+'</span><input type="time" data-habit-time-day="'+key+'" value="'+(weekly[key]===undefined?'':weekly[key])+'" aria-label="'+label+' reminder time"></label>').join('')+'<p class="habit-time-help">Leave a day blank to use the default time above.</p>';}
  function readHabitWeeklyTimes(){const result={},form=document.getElementById('habit-weekly-times');if(!form)return result;form.querySelectorAll('[data-habit-time-day]').forEach(input=>{if(input.value)result[input.dataset.habitTimeDay]=input.value;});return result;}
  function scheduledHabitsForDate(d=new Date()){ return state.habits.filter(h=>habitIsScheduled(h,d)); }
  function renderStatbar(){
    const scheduled=scheduledHabitsForDate();
    const doneToday = scheduled.filter(h=>(state.habitLogs[todayKey()]||{})[h.id]).length;
    const tasksOpen = state.tasks.filter(t=>!t.done).length + state.subjectItems.filter(i=>!i.done).length;
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
    }).join('')+'<button type="button" class="btn secondary full dash-nutrition-add" id="dash-nutrition-add">+ Add nutrition</button>';
    el.querySelector('#dash-nutrition-add').textContent='+ Add food';
    el.querySelector('#dash-nutrition-add').onclick=()=>{gotoPage('health');gotoSubtab('health','nutrition');};
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
    const scheduled = scheduledHabitsForDate();
    el.innerHTML = scheduled.length ? '<div class="dash-habits">'+scheduled.map(h=>{
      const done = !!log[h.id];
      return '<button type="button" class="dash-habit'+(done?' done':'')+'" data-habit="'+h.id+'"><span>'+escapeHTML(h.name)+(h.time?'<small style="display:block;color:var(--muted);font-size:10px;margin-top:3px;">'+formatHabitTime(h.time)+'</small>':'')+'</span><span class="dash-habit-mark">'+(done?'✓':'')+'</span></button>';
    }).join('')+'</div>' : '<div class="empty-state">No habits scheduled today.</div>';
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
      return '<div class="dash-event dash-event-clickable" role="button" tabindex="0" data-open-event="'+e.id+'"><div class="dash-datebox"><strong>'+day+'</strong><span>'+mon+'</span></div><div class="dash-event-main"><div class="dash-event-title">'+escapeHTML(e.title)+'</div><div class="dash-event-meta">'+when+(e.type?' · '+(e.type==='custom'?'OTHER':escapeHTML(e.type).toUpperCase()):'')+'</div></div></div>';
    }).join('') : '<div class="empty-state">Nothing upcoming — your calendar is clear.</div>';
    const openEvent=b=>{const e=state.events.find(x=>x.id===b.dataset.openEvent);if(!e)return;gotoPage('calendar');calSelectedDate=e.date;renderCalendar();renderCalDayDetail();openEventEdit(e);};
    el.querySelectorAll('[data-open-event]').forEach(b=>{b.onclick=()=>openEvent(b);b.onkeydown=ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();openEvent(b);}};});
  }
  function renderWidgetPrayer(el){
    const {times,order,nextKey,nextDiff} = getNextPrayer();
    const h=Math.floor(nextDiff), m=Math.round((nextDiff-h)*60);
    el.innerHTML = '<div class="prayer-list">' + order.map(([k,l])=>'<div class="prayer-item'+(k===nextKey?' next':'')+'"><div class="pname">'+l+'</div><div class="ptime">'+fmtTime(times[k])+'</div></div>').join('') + '</div><p style="text-align:center;margin-top:8px;color:var(--coral);font-weight:700;">Next: '+order.find(o=>o[0]===nextKey)[1]+' in '+h+'h '+m+'m</p>';
  }
  document.addEventListener('dblclick', e=>{ if(!e.target.closest('input,textarea,select,button,a')) e.preventDefault(); }, {passive:false});

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
    wrap.style.display = 'flex'; wrap.style.flexWrap = 'wrap'; wrap.style.alignItems = 'center'; wrap.style.gap = '6px';
    state.exercises.forEach(ex=>{
      const item = document.createElement('span');
      item.style.cssText = 'display:inline-flex;align-items:center;border:1px solid var(--border);border-radius:12px;overflow:hidden;margin:3px;';
      const chip = document.createElement('button');
      chip.type = 'button'; chip.className = 'exercise-chip'; chip.textContent = ex.name;
      chip.style.margin = '0'; chip.style.border = '0'; chip.style.borderRadius = '0';
      chip.onclick = ()=>{
        document.getElementById('log-in-name').value = ex.name;
        selectedLogCategory = ex.category;
        document.querySelectorAll('#log-cat-picker .exercise-chip').forEach(b=>b.classList.toggle('active', b.dataset.cat===ex.category));
      };
      const remove = document.createElement('button');
      remove.type = 'button'; remove.textContent = '×'; remove.title = 'Remove '+ex.name;
      remove.setAttribute('aria-label','Remove exercise '+ex.name);
      remove.style.cssText = 'padding:0 9px;align-self:stretch;background:rgba(255,255,255,.04);border:0;border-left:1px solid var(--border);color:var(--muted);font-size:18px;cursor:pointer;';
      remove.onclick = async (event)=>{
        event.stopPropagation();
        if(!await nexaConfirm('Remove exercise?','Remove "'+ex.name+'" from Quick fill and suggestions? Its logged sets and related progress history will also be deleted.','Remove exercise')) return;
        state.exercises = state.exercises.filter(x=>x.id!==ex.id);
        state.logs = state.logs.filter(l=>l.name.toLowerCase()!==ex.name.toLowerCase());
        await save('exercises',state.exercises);
        await save('logs',state.logs);
        if(document.getElementById('log-in-name').value.trim().toLowerCase()===ex.name.toLowerCase()){
          document.getElementById('log-in-name').value='';
          selectedLogCategory=null;
          document.querySelectorAll('#log-cat-picker .exercise-chip').forEach(b=>b.classList.remove('active'));
        }
        renderExerciseChips(); renderProgressSelect(); renderRecentSets(); renderDashboard(); renderStatbar();
        showToast('Exercise removed.');
      };
      item.appendChild(chip); item.appendChild(remove); wrap.appendChild(item);
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
    const list = state.tasks.slice().sort((a,b)=>(a.done-b.done)||state.tasks.indexOf(a)-state.tasks.indexOf(b));
    if(!list.length){ wrap.innerHTML = '<div class="empty-state">No tasks yet — enjoy the clear list.</div>'; return; }
    list.forEach(t=>{
      const row = document.createElement('div'); row.className='task-row'; row.dataset.taskId=t.id;
      const grip=document.createElement('button');grip.type='button';grip.className='task-drag-handle';grip.textContent='⠿';grip.title='Drag to reorder';grip.setAttribute('aria-label','Drag to reorder task');
      grip.addEventListener('pointerdown',e=>{
        if(e.button!==0&&e.pointerType==='mouse')return;
        e.preventDefault();
        const rect=row.getBoundingClientRect(),startX=e.clientX,startY=e.clientY,grabX=e.clientX-rect.left,grabY=e.clientY-rect.top;
        let moved=false,ghost=null,hoverRow=null,finished=false;
        const clear=()=>document.querySelectorAll('.task-row.task-drop-target').forEach(n=>n.classList.remove('task-drop-target'));
        const move=ev=>{
          if(finished)return;
          if(Math.abs(ev.clientY-startY)>5||Math.abs(ev.clientX-startX)>5)moved=true;
          if(!moved)return;
          if(!ghost){ghost=row.cloneNode(true);ghost.classList.add('task-drag-preview');ghost.style.width=rect.width+'px';document.body.appendChild(ghost);row.classList.add('is-dragging');}
          ghost.style.left=Math.max(4,Math.min(window.innerWidth-rect.width-4,ev.clientX-grabX))+'px';
          ghost.style.top=Math.max(4,ev.clientY-grabY)+'px';
          const scrollBox=document.getElementById('main-scroll');
          if(scrollBox){const sr=scrollBox.getBoundingClientRect(),edge=68;let speed=ev.clientY<sr.top+edge?-Math.ceil((sr.top+edge-ev.clientY)/5):ev.clientY>sr.bottom-edge?Math.ceil((ev.clientY-(sr.bottom-edge))/5):0;if(speed)scrollBox.scrollTop+=Math.max(-18,Math.min(18,speed));}
          else if(ev.clientY<64)window.scrollBy(0,-12);else if(ev.clientY>window.innerHeight-64)window.scrollBy(0,12);
          const hit=document.elementFromPoint(ev.clientX,ev.clientY);
          hoverRow=hit&&hit.closest('.task-row[data-task-id]');
          if(hoverRow===row||hoverRow&&hoverRow.parentElement!==row.parentElement)hoverRow=null;
          clear();if(hoverRow)hoverRow.classList.add('task-drop-target');
        };
        const finish=async ev=>{
          if(finished)return;finished=true;
          document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',finish);document.removeEventListener('pointercancel',finish);
          clear();if(ghost)ghost.remove();row.classList.remove('is-dragging');
          if(!moved)return;
          const hit=Number.isFinite(ev.clientY)?document.elementFromPoint(ev.clientX,ev.clientY):null;
          const target=hit&&hit.closest('.task-row[data-task-id]')||hoverRow;
          if(!target||target===row||target.parentElement!==row.parentElement)return;
          const from=state.tasks.findIndex(x=>x.id===t.id),to=state.tasks.findIndex(x=>x.id===target.dataset.taskId);
          if(from<0||to<0||state.tasks[from].done!==state.tasks[to].done)return;
          const dragged=state.tasks.splice(from,1)[0];state.tasks.splice(state.tasks.findIndex(x=>x.id===target.dataset.taskId),0,dragged);
          await save('tasks',state.tasks);renderTaskList();
        };
        document.addEventListener('pointermove',move,{passive:false});document.addEventListener('pointerup',finish,{once:true});document.addEventListener('pointercancel',finish,{once:true});
      });
      const check = document.createElement('button'); check.className='checkbtn'+(t.done?' checked':''); check.textContent=t.done?'\u2713':'';
      check.onclick = async ()=>{ t.done=!t.done; haptic(); await save('tasks', state.tasks); renderTaskList(); renderStatbar(); };
      const body = document.createElement('div'); body.style.flex='1';
      const subDone = (t.subtasks||[]).filter(s=>s.done).length;
      body.innerHTML = '<div class="ttitle'+(t.done?' done':'')+'">'+escapeHTML(t.title)+'</div>'+((t.subtasks&&t.subtasks.length)?'<div class="task-meta"><span>'+subDone+'/'+t.subtasks.length+' subtasks</span></div>':'');
      row.append(grip,check,body);
      const edit = document.createElement('button'); edit.className='btn gray small'; edit.textContent='Edit';
      edit.onclick=e=>{e.stopPropagation();openTaskEdit(t);};
      row.appendChild(edit);
      const del = document.createElement('button'); del.className='btn gray small'; del.textContent='Delete';
      del.onclick = async e=>{e.stopPropagation();const idx=state.tasks.findIndex(x=>x.id===t.id),copy=JSON.parse(JSON.stringify(t));await animateOut(row);state.tasks.splice(idx,1);await save('tasks',state.tasks);renderTaskList();renderStatbar();offerUndo('Task deleted',async()=>{state.tasks.splice(Math.min(idx,state.tasks.length),0,copy);await save('tasks',state.tasks);renderTaskList();renderStatbar();});};
      row.appendChild(del);
      body.onclick=()=>openTaskEdit(t);
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
    const week=[];{const today=new Date();today.setHours(12,0,0,0);const start=new Date(today);start.setDate(today.getDate()-((today.getDay()+1)%7));for(let i=0;i<7;i++){const d=new Date(start);d.setDate(start.getDate()+i);week.push(d);}}const month=[];for(let i=29;i>=0;i--){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-i);month.push(d);}
    state.habits.forEach(h=>{const row=document.createElement('div');row.className='habit-progress-card';row.dataset.habitId=h.id;const streak=habitStreak(h);const dayCells=week.map(d=>{const key=dateKey(d),scheduled=habitIsScheduled(h,d),on=!!((state.habitLogs[key]||{})[h.id]);return '<button type="button" class="habit-day'+(on?' on':'')+(!scheduled?' muted':'')+(key===todayKey()?' today':'')+'" data-date="'+key+'" data-habit="'+h.id+'" '+(!scheduled?'disabled':'')+'><span>'+['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]+'</span><b>'+(on?'✓':d.getDate())+'</b></button>';}).join('');const monthCells=month.map(d=>{const key=dateKey(d),scheduled=habitIsScheduled(h,d),on=!!((state.habitLogs[key]||{})[h.id]);return '<button type="button" title="'+key+'" class="habit-month-day'+(on?' on':'')+(!scheduled?' muted':'')+'" data-date="'+key+'" data-habit="'+h.id+'" '+(!scheduled?'disabled':'')+'>'+d.getDate()+'</button>';}).join('');const scheduleLabel=(Array.isArray(h.days)&&h.days.length&&h.days[0]!=='daily')?h.days.map(x=>x.toUpperCase()).join(' · '):'Every day';row.innerHTML='<div class="habit-progress-head"><button type="button" class="habit-order-handle" title="Drag to reorder habits" aria-label="Drag to reorder '+escapeHTML(h.name)+'">⠿</button><div class="heat-name">'+escapeHTML(h.name)+(h.time||Object.keys(h.weeklyTimes||{}).length?'<div class="habit-time">'+(Object.keys(h.weeklyTimes||{}).length?'Custom times by day':formatHabitTime(h.time))+'</div>':'')+'<div class="habit-schedule">'+scheduleLabel+'</div></div><div class="heat-streak"><b>'+streak+'</b><span>day streak</span></div></div><div class="habit-week">'+dayCells+'</div><button type="button" class="btn ghost small habit-history-toggle" data-history="'+h.id+'">View 30-day history</button><div class="habit-month" data-month="'+h.id+'" hidden>'+monthCells+'</div><div class="item-actions"><button class="btn gray small" data-edit-habit="'+h.id+'">Edit</button><button class="btn gray small" data-del-habit="'+h.id+'">Delete</button></div>';wrap.appendChild(row);});
    wrap.querySelectorAll('.habit-order-handle').forEach(grip=>grip.addEventListener('pointerdown',e=>{
      if(e.button!==0&&e.pointerType==='mouse')return;
      const row=grip.closest('.habit-progress-card[data-habit-id]');
      if(!row)return;
      e.preventDefault();
      const rect=row.getBoundingClientRect();
      const offsetX=e.clientX-rect.left,offsetY=e.clientY-rect.top;
      let moved=false,finished=false,ghost=null,targetRow=null;
      const clearTargets=()=>wrap.querySelectorAll('.habit-progress-card.habit-drop-target').forEach(n=>n.classList.remove('habit-drop-target'));
      const move=ev=>{
        if(finished)return;
        if(Math.abs(ev.clientY-e.clientY)>5||Math.abs(ev.clientX-e.clientX)>5)moved=true;
        if(!moved)return;
        if(!ghost){
          ghost=row.cloneNode(true);
          ghost.classList.remove('habit-drop-target');
          ghost.classList.add('habit-drag-preview');
          ghost.style.width=rect.width+'px';
          ghost.style.left=(ev.clientX-offsetX)+'px';
          ghost.style.top=(ev.clientY-offsetY)+'px';
          document.body.appendChild(ghost);
          row.classList.add('is-dragging');
          haptic(8);
        }
        ghost.style.left=(ev.clientX-offsetX)+'px';
        ghost.style.top=(ev.clientY-offsetY)+'px';
        const scrollBox=document.getElementById('main-scroll');
        if(scrollBox){
          const sr=scrollBox.getBoundingClientRect(),edge=68,speed=ev.clientY<sr.top+edge?-Math.ceil((sr.top+edge-ev.clientY)/5):ev.clientY>sr.bottom-edge?Math.ceil((ev.clientY-(sr.bottom-edge))/5):0;
          if(speed)scrollBox.scrollTop+=Math.max(-18,Math.min(18,speed));
        }else{
          const edge=64;
          if(ev.clientY<edge)window.scrollBy(0,-Math.min(18,Math.ceil((edge-ev.clientY)/4)));
          else if(ev.clientY>window.innerHeight-edge)window.scrollBy(0,Math.min(18,Math.ceil((ev.clientY-(window.innerHeight-edge))/4)));
        }
        const hit=document.elementFromPoint(ev.clientX,ev.clientY);
        targetRow=hit&&hit.closest('.habit-progress-card[data-habit-id]');
        if(targetRow===row)targetRow=null;
        clearTargets();
        if(targetRow)targetRow.classList.add('habit-drop-target');
      };
      const finish=async ev=>{
        if(finished)return;finished=true;
        document.removeEventListener('pointermove',move);
        document.removeEventListener('pointerup',finish);
        document.removeEventListener('pointercancel',finish);
        clearTargets();
        if(ghost)ghost.remove();
        row.classList.remove('is-dragging');
        if(!moved)return;
        const hit=Number.isFinite(ev.clientY)?document.elementFromPoint(ev.clientX,ev.clientY):null;
        const finalTarget=hit&&hit.closest('.habit-progress-card[data-habit-id]')||targetRow;
        if(!finalTarget||finalTarget===row)return;
        const from=state.habits.findIndex(x=>x.id===row.dataset.habitId),to=state.habits.findIndex(x=>x.id===finalTarget.dataset.habitId);
        if(from<0||to<0||from===to)return;
        const item=state.habits.splice(from,1)[0];
        state.habits.splice(to,0,item);
        renderHabitGrid();renderDashboard();
        await save('habits',state.habits);
        showToast('Habit order updated.');
      };
      document.addEventListener('pointermove',move,{passive:false});
      document.addEventListener('pointerup',finish,{once:true});
      document.addEventListener('pointercancel',finish,{once:true});
    }));
    wrap.querySelectorAll('[data-history]').forEach(btn=>btn.onclick=()=>{const box=wrap.querySelector('[data-month="'+btn.dataset.history+'"]');box.hidden=!box.hidden;btn.textContent=box.hidden?'View 30-day history':'Hide 30-day history';});
    wrap.querySelectorAll('[data-edit-habit]').forEach(btn=>btn.addEventListener('click',()=>{
      const h=state.habits.find(x=>x.id===btn.dataset.editHabit);if(!h)return;
      document.getElementById('habit-edit-id').value=h.id;document.getElementById('habit-in-name').value=h.name;document.getElementById('habit-in-time').value=h.time||'';renderHabitWeeklyTimes(h);
      document.querySelectorAll('#habit-day-picker .exercise-chip').forEach(b=>b.classList.toggle('active',(Array.isArray(h.days)&&h.days.length?h.days:['daily']).includes(b.dataset.day)));
      document.getElementById('habit-form').style.display='block';document.getElementById('habit-in-name').focus();
    }));
    wrap.querySelectorAll('[data-del-habit]').forEach(btn=>btn.addEventListener('click', async ()=>{
      if(!await nexaConfirm('Delete habit?','Its history will be removed too.')) return;
      const hid = btn.dataset.delHabit;
      const idx=state.habits.findIndex(h=>h.id===hid),copy=JSON.parse(JSON.stringify(state.habits[idx])),history={};Object.keys(state.habitLogs).forEach(d=>{if(state.habitLogs[d]?.[hid]!==undefined)history[d]=state.habitLogs[d][hid];});
      state.habits.splice(idx,1);Object.keys(state.habitLogs).forEach(d=>{delete state.habitLogs[d][hid];});
      await save('habits',state.habits);await save('habitLogs',state.habitLogs);renderHabitGrid();renderStatbar();
      offerUndo('Habit deleted',async()=>{state.habits.splice(Math.min(idx,state.habits.length),0,copy);Object.entries(history).forEach(([d,v])=>{if(!state.habitLogs[d])state.habitLogs[d]={};state.habitLogs[d][hid]=v;});await save('habits',state.habits);await save('habitLogs',state.habitLogs);renderHabitGrid();renderStatbar();});
    }));
    wrap.querySelectorAll('.habit-day,.habit-month-day').forEach(c=>c.addEventListener('click', async ()=>{
      if(c.classList.contains('muted')) return;
      const d=c.dataset.date, hid=c.dataset.habit;
      if(!state.habitLogs[d]) state.habitLogs[d]={};
      state.habitLogs[d][hid] = !state.habitLogs[d][hid];
      renderHabitGrid(); renderStatbar(); renderDashboard();
      await save('habitLogs', state.habitLogs);
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
  function openEventEdit(ev){document.getElementById('event-edit-id').value=ev.id;document.getElementById('ev-title').value=ev.title;document.getElementById('ev-type').value=ev.type;document.getElementById('ev-date').value=ev.date||'';document.getElementById('ev-time').value=ev.time||'09:00';document.getElementById('ev-reminder').value=ev.reminderHours===undefined?'default':String(ev.reminderHours);document.getElementById('ev-notes').value=ev.notes||'';document.getElementById('cal-form').style.display='block';}
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

  function getWorkoutCategories(){
    const custom=Array.isArray(state.config.workoutCategories)?state.config.workoutCategories:[];
    return Array.from(new Set(['push','pull','legs',...custom].map(c=>String(c||'').trim()).filter(c=>c&&c.toLowerCase()!=='rest')));
  }
  function renderWorkoutCategoryPicker(){
    const picker=document.getElementById('log-cat-picker'); if(!picker)return;
    const current=selectedLogCategory;
    picker.innerHTML='';
    getWorkoutCategories().forEach(cat=>{
      const btn=document.createElement('button');btn.type='button';btn.className='exercise-chip';btn.dataset.cat=cat;
      btn.textContent=cat.charAt(0).toUpperCase()+cat.slice(1);
      btn.classList.toggle('active',current===cat);
      btn.onclick=()=>{selectedLogCategory=cat;picker.querySelectorAll('.exercise-chip').forEach(b=>b.classList.toggle('active',b===btn));};
      picker.appendChild(btn);
    });
  }
  function renderPlanEditor(){
    const wrap = document.getElementById('plan-days'); wrap.innerHTML='';
    const categories=getWorkoutCategories();
    DAYS.forEach(day=>{
      const row = document.createElement('div'); row.className='row'; row.style.padding='8px 0'; row.style.borderBottom='1px solid var(--border)';
      const label = document.createElement('span'); label.textContent = DAY_LABELS[day]; label.style.fontWeight='600'; label.style.fontSize='13px';
      const sel = document.createElement('select'); sel.style.width='150px';
      [...categories,'rest'].forEach(c=>{ const o=document.createElement('option'); o.value=c; o.textContent=c==='rest'?'Rest':c.charAt(0).toUpperCase()+c.slice(1); if((state.config.plan[day]||'rest')===c)o.selected=true; sel.appendChild(o); });
      sel.onchange = async ()=>{ state.config.plan[day]=sel.value; await save('config', state.config); renderDashboard(); };
      row.appendChild(label); row.appendChild(sel); wrap.appendChild(row);
    });
    const customWrap=document.createElement('div');customWrap.style.marginTop='14px';
    customWrap.innerHTML='<label style="display:block;margin-bottom:6px;font-size:12px;color:var(--muted);">Custom workout splits</label><div style="display:flex;gap:8px;"><input id="workout-category-input" type="text" maxlength="24" placeholder="e.g. Upper, Lower, Arms" style="min-width:0;flex:1;"><button type="button" class="btn small" id="workout-category-add">Add</button></div><p style="font-size:11px;color:var(--muted);margin-top:6px;">Add your own split names; they’ll appear in the weekly schedule and workout logger.</p><div id="workout-category-list" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;"></div>';
    wrap.appendChild(customWrap);
    const list=customWrap.querySelector('#workout-category-list');
    categories.filter(c=>!['push','pull','legs'].includes(c.toLowerCase())).forEach(cat=>{
      const chip=document.createElement('span');chip.className='workout-category-chip';
      const name=document.createElement('span');name.textContent=cat;
      const remove=document.createElement('button');remove.type='button';remove.className='workout-category-remove';remove.textContent='×';remove.title='Remove '+cat;remove.setAttribute('aria-label','Remove '+cat+' workout split');
      remove.onclick=async()=>{
        if(!await nexaConfirm('Remove workout split?','Remove “'+cat+'” from your workout split options? Any weekdays using it will be changed to Rest.','Remove'))return;
        state.config.workoutCategories=(state.config.workoutCategories||[]).filter(c=>String(c).toLowerCase()!==cat.toLowerCase());
        DAYS.forEach(day=>{if(String(state.config.plan[day]||'').toLowerCase()===cat.toLowerCase())state.config.plan[day]='rest';});
        if(String(selectedLogCategory||'').toLowerCase()===cat.toLowerCase())selectedLogCategory='push';
        await save('config',state.config);renderPlanEditor();renderWorkoutCategoryPicker();renderDashboard();showToast('Workout split removed.');
      };
      chip.append(name,remove);list.appendChild(chip);
    });
    const addCategory=async()=>{
      const input=customWrap.querySelector('#workout-category-input'), name=input.value.trim().replace(/\s+/g,' ');
      if(!name)return;
      if(name.toLowerCase()==='rest'||categories.some(c=>c.toLowerCase()===name.toLowerCase())){showToast('That workout split already exists.');return;}
      state.config.workoutCategories=[...(state.config.workoutCategories||[]),name];
      await save('config',state.config);renderPlanEditor();renderWorkoutCategoryPicker();showToast('Workout split added.');
    };
    customWrap.querySelector('#workout-category-add').onclick=addCategory;
    customWrap.querySelector('#workout-category-input').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addCategory();}});
    renderWorkoutCategoryPicker();
  }

  function renderSubjectsPage(){
    const wrap=document.getElementById('subjects-list');
    const expandedSubjectIds=new Set([...wrap.querySelectorAll('.subject-card.subject-expanded')].map(card=>card.dataset.subjectId));
    wrap.innerHTML='';
    if(!state.subjects.length) wrap.innerHTML='<p style="margin-bottom:14px;color:var(--muted);">Add a subject, then add lectures or labs inside it.</p>';
    const iconButton=(label,icon)=>{const b=document.createElement('button');b.type='button';b.className='subject-icon-btn';b.textContent=icon;b.title=label;b.setAttribute('aria-label',label);return b;};
    state.subjects.forEach(s=>{
      const card=document.createElement('div');card.className='card subject-card';card.dataset.subjectId=s.id;
      const items=state.subjectItems.filter(i=>i.subjectId===s.id);
      const head=document.createElement('div');head.className='subject-heading';
      const heading=document.createElement('button');heading.type='button';heading.className='subject-title';heading.textContent=s.name;heading.title='Tap to rename subject';
      const count=document.createElement('span');count.className='subject-count';count.textContent=items.filter(i=>i.done).length+'/'+items.length;
      const rename=async()=>{
        const input=document.createElement('input');input.className='subject-rename-input';input.value=s.name;input.setAttribute('aria-label','Subject name');
        heading.replaceWith(input);input.focus();input.select();
        let finished=false;
        const finish=async saveName=>{
          if(finished)return;finished=true;
          const value=input.value.trim();
          if(saveName&&value){s.name=value;await save('subjects',state.subjects);}
          else if(saveName&&!value)showToast('Subject name cannot be empty.');
          renderSubjectsPage();
        };
        input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();finish(true);}if(e.key==='Escape')finish(false);});
        input.addEventListener('blur',()=>finish(true));
      };
      heading.ondblclick=e=>{e.preventDefault();rename();};
      heading.title='Double-tap or double-click to rename subject';
      const delSubject=iconButton('Delete subject','×');delSubject.classList.add('subject-delete-btn');
      delSubject.onclick=async()=>{
        if(!await nexaConfirm('Delete subject?','Delete "'+s.name+'" and all its tasks?'))return;
        state.subjects=state.subjects.filter(x=>x.id!==s.id);state.subjectItems=state.subjectItems.filter(x=>x.subjectId!==s.id);
        await save('subjects',state.subjects);await save('subjectItems',state.subjectItems);renderSubjectsPage();renderStatbar();
      };
      const subjectGrip=iconButton('Drag to reorder subject','⠿');subjectGrip.classList.add('subject-list-drag-handle');subjectGrip.addEventListener('pointerdown',e=>{if(e.button!==0&&e.pointerType==='mouse')return;e.preventDefault();const startY=e.clientY;let moved=false;const move=ev=>{if(Math.abs(ev.clientY-startY)>5)moved=true;if(!moved)return;const target=document.elementFromPoint(ev.clientX,ev.clientY);const targetCard=target&&target.closest('.subject-card');document.querySelectorAll('.subject-card.subject-card-drop').forEach(n=>n.classList.remove('subject-card-drop'));if(targetCard&&targetCard!==card)targetCard.classList.add('subject-card-drop');};const finish=async ev=>{document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',finish);document.removeEventListener('pointercancel',finish);document.querySelectorAll('.subject-card.subject-card-drop').forEach(n=>n.classList.remove('subject-card-drop'));if(!moved)return;const target=document.elementFromPoint(ev.clientX,ev.clientY);const targetCard=target&&target.closest('.subject-card');if(!targetCard||targetCard===card)return;const from=state.subjects.findIndex(x=>x.id===s.id);const targetIndex=state.subjects.findIndex(x=>x.id===targetCard.dataset.subjectId);if(from<0||targetIndex<0)return;const dragged=state.subjects.splice(from,1)[0];state.subjects.splice(state.subjects.findIndex(x=>x.id===targetCard.dataset.subjectId),0,dragged);await save('subjects',state.subjects);renderSubjectsPage();};document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerup',finish,{once:true});document.addEventListener('pointercancel',finish,{once:true});});head.append(subjectGrip,heading,count,delSubject);card.appendChild(head);
      const itemsWrap=document.createElement('div');itemsWrap.className='subject-items';itemsWrap.hidden=!expandedSubjectIds.has(s.id);
      if(!itemsWrap.hidden)card.classList.add('subject-expanded');
      const toggleSubject=()=>{itemsWrap.hidden=!itemsWrap.hidden;addRow.hidden=itemsWrap.hidden;card.classList.toggle('subject-expanded',!itemsWrap.hidden);};
      heading.onclick=e=>{e.stopPropagation();toggleSubject();};
      items.forEach(item=>{
        const row=document.createElement('div');row.className='subject-task-row';row.dataset.subjectItemId=item.id;
        const grip=document.createElement('span');grip.className='subject-drag-handle';grip.textContent='⠿';grip.title='Drag to reorder or move';grip.setAttribute('aria-label','Drag task');
        grip.draggable=false;
        grip.style.touchAction='none';
        let pointerDragStarted=false;
        grip.addEventListener('pointerdown',e=>{
          if(e.button!==0&&e.pointerType==='mouse')return;
          e.preventDefault();
          pointerDragStarted=true;
          const rect=row.getBoundingClientRect();
          const grabX=Math.max(0,Math.min(rect.width,e.clientX-rect.left));
          const grabY=Math.max(0,Math.min(rect.height,e.clientY-rect.top));
          row.classList.add('is-dragging');
          const preview=row.cloneNode(true);
          preview.classList.add('subject-drag-preview');
          preview.style.width=rect.width+'px';
          preview.style.left=Math.max(4,Math.min(window.innerWidth-rect.width-4,e.clientX-grabX))+'px';
          preview.style.top=Math.max(4,e.clientY-grabY-8)+'px';
          preview.style.maxWidth='calc(100vw - 20px)';
          document.body.appendChild(preview);
          requestAnimationFrame(()=>preview.classList.add('is-lifted'));
          const move=ev=>{
            if(!pointerDragStarted)return;
            preview.style.left=Math.max(4,Math.min(window.innerWidth-rect.width-4,ev.clientX-grabX))+'px';
            preview.style.top=Math.max(4,ev.clientY-grabY-8)+'px';
            const target=document.elementFromPoint(ev.clientX,ev.clientY);
            document.querySelectorAll('.subject-task-row').forEach(r=>r.classList.remove('drop-target'));
            const targetRow=target&&target.closest('.subject-task-row');
            if(targetRow&&targetRow!==row)targetRow.classList.add('drop-target');
            const targetCard=target&&target.closest('.subject-card');
            document.querySelectorAll('.subject-card').forEach(c=>c.classList.remove('subject-card-drop'));
            if(targetCard&&targetCard!==card&&!targetRow)targetCard.classList.add('subject-card-drop');
          };
          const finish=async ev=>{
            if(!pointerDragStarted)return;
            pointerDragStarted=false;
            document.removeEventListener('pointermove',move);
            document.removeEventListener('pointerup',finish);
            document.removeEventListener('pointercancel',finish);
            row.classList.remove('is-dragging');
            preview.remove();
            document.querySelectorAll('.subject-task-row').forEach(r=>r.classList.remove('drop-target'));
            document.querySelectorAll('.subject-card').forEach(c=>c.classList.remove('subject-card-drop'));
            const target=document.elementFromPoint(ev.clientX,ev.clientY);
            const targetRow=target&&target.closest('.subject-task-row');
            const targetCard=target&&target.closest('.subject-card');
            if(targetRow&&targetRow.dataset.subjectItemId!==item.id){
              const dragged=state.subjectItems.find(x=>x.id===item.id);
              if(!dragged)return;
              state.subjectItems=state.subjectItems.filter(x=>x.id!==item.id);
              dragged.subjectId=targetRow.closest('.subject-card').dataset.subjectId;
              const targetIndex=state.subjectItems.findIndex(x=>x.id===targetRow.dataset.subjectItemId);
              state.subjectItems.splice(targetIndex<0?state.subjectItems.length:targetIndex,0,dragged);
              await save('subjectItems',state.subjectItems);renderSubjectsPage();renderStatbar();
            }else if(targetCard&&targetCard!==card){
              const dragged=state.subjectItems.find(x=>x.id===item.id);
              if(!dragged)return;
              state.subjectItems=state.subjectItems.filter(x=>x.id!==item.id);
              dragged.subjectId=targetCard.dataset.subjectId;state.subjectItems.push(dragged);
              await save('subjectItems',state.subjectItems);renderSubjectsPage();renderStatbar();
            }
          };
          document.addEventListener('pointermove',move,{passive:true});
          document.addEventListener('pointerup',finish,{once:true});
          document.addEventListener('pointercancel',finish,{once:true});
        });
        const check=document.createElement('button');check.className='checkbtn'+(item.done?' checked':'');check.textContent=item.done?'✓':'';
        check.setAttribute('aria-label',item.done?'Mark incomplete':'Mark complete');
        check.onclick=async()=>{item.done=!item.done;await save('subjectItems',state.subjectItems);renderSubjectsPage();renderStatbar();};
        const title=document.createElement('button');title.type='button';title.className='subject-task-title'+(item.done?' done':'');title.textContent=item.title;title.title='Tap to edit task name';
        const edit=async()=>{
          const input=document.createElement('input');input.className='subject-rename-input';input.value=item.title;input.setAttribute('aria-label','Task name');
          title.replaceWith(input);input.focus();input.select();let finished=false;
          const finish=async saveName=>{if(finished)return;finished=true;const value=input.value.trim();if(saveName&&value){item.title=value;await save('subjectItems',state.subjectItems);}else if(saveName&&!value)showToast('Task name cannot be empty.');renderSubjectsPage();};
          input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();finish(true);}if(e.key==='Escape')finish(false);});
          input.addEventListener('blur',()=>finish(true));
        };
        title.onclick=edit;
        title.onclick=null;
        title.ondblclick=edit;
        title.title='Double-tap or double-click to edit task name';
        const del=iconButton('Delete task','×');del.onclick=async()=>{state.subjectItems=state.subjectItems.filter(x=>x.id!==item.id);await save('subjectItems',state.subjectItems);renderSubjectsPage();renderStatbar();};
        row.append(grip,check,title,del);itemsWrap.appendChild(row);
      });
      itemsWrap.addEventListener('dragover',e=>{e.preventDefault();e.dataTransfer.dropEffect='move';card.classList.add('subject-card-drop');});
      itemsWrap.addEventListener('dragleave',e=>{if(!card.contains(e.relatedTarget))card.classList.remove('subject-card-drop');});
      itemsWrap.addEventListener('drop',async e=>{
        if(e.target.closest('[data-subject-item-id]'))return;e.preventDefault();card.classList.remove('subject-card-drop');
        const draggedId=e.dataTransfer.getData('text/plain');const dragged=state.subjectItems.find(x=>x.id===draggedId);if(!dragged)return;
        state.subjectItems=state.subjectItems.filter(x=>x.id!==draggedId);dragged.subjectId=s.id;state.subjectItems.push(dragged);
        await save('subjectItems',state.subjectItems);renderSubjectsPage();renderStatbar();
      });
      const addRow=document.createElement('div');addRow.className='subject-add-row';addRow.hidden=itemsWrap.hidden;
      const input=document.createElement('input');input.type='text';input.placeholder='Add a task…';input.setAttribute('aria-label','New task for '+s.name);
      input.addEventListener('keydown',async e=>{
        if(e.key==='Enter'&&input.value.trim()){
          e.preventDefault();
          state.subjectItems.push({id:'si-'+Date.now(),subjectId:s.id,title:input.value.trim(),done:false});
          await save('subjectItems',state.subjectItems);
          renderSubjectsPage();renderStatbar();
          const nextInput=wrap.querySelector('.subject-card[data-subject-id="'+s.id+'"] .subject-add-row input');
          if(nextInput){nextInput.focus();nextInput.setSelectionRange(nextInput.value.length,nextInput.value.length);}
        }
      });
      addRow.appendChild(input);card.append(itemsWrap,addRow);wrap.appendChild(card);
    });
  }
  document.getElementById('subject-add-btn').addEventListener('click', async () => {
    const name = document.getElementById('subject-in-name').value.trim();
    if(!name){ showToast('Name the subject first.'); return; }
    state.subjects.push({id:'subj-'+Date.now(), name});
    await save('subjects', state.subjects);
    document.getElementById('subject-in-name').value = '';
    renderSubjectsPage(); renderStatbar();
    showToast('Subject added.');
  });

  function openClassEdit(c){document.getElementById('class-edit-id').value=c.id;document.getElementById('class-in-subject').value=c.type==='gap'?'':c.subject;document.getElementById('class-in-room').value=c.room||'';document.getElementById('class-in-type').value=c.type;document.getElementById('class-in-type').dispatchEvent(new Event('change'));document.getElementById('class-in-start').value=c.start;document.getElementById('class-in-end').value=c.end;document.getElementById('class-in-notes').value=c.notes||'';document.querySelectorAll('#class-day-picker .exercise-chip').forEach(b=>b.classList.toggle('active',b.dataset.day===c.day));document.getElementById('class-form').style.display='block';document.getElementById('class-in-subject').focus();}
  function renderClassRow(wrap, c){
    const row = document.createElement('div'); row.className='class-row '+c.type;
    const isGap=c.type==='gap';
    const metaBits = c.room?['ROOM '+escapeHTML(c.room)]:[];
    row.innerHTML = '<div class="ctime">'+formatClassTime(c.start)+' \u2013 '+formatClassTime(c.end)+'</div>' +
      '<div style="flex:1;"><div class="csubject">'+escapeHTML(isGap?'Free period':c.subject)+'</div>'+(metaBits.length?'<div class="croom">'+metaBits.join(' \u00b7 ')+'</div>':'')+'</div>' +
      '<span class="badge '+c.type+'">'+(isGap?'FREE PERIOD':escapeHTML(c.type))+'</span>';
    const edit=document.createElement('button');edit.className='btn gray small';edit.textContent='Edit';edit.onclick=e=>{e.stopPropagation();openClassEdit(c);};
    const actions=document.createElement('div');actions.className='item-actions';actions.appendChild(edit);
    const del = document.createElement('button'); del.className='btn gray small'; del.textContent='Delete';
    del.onclick = async e=>{e.stopPropagation();const idx=state.classSchedule.findIndex(x=>x.id===c.id),copy=JSON.parse(JSON.stringify(c));await animateOut(row);state.classSchedule.splice(idx,1);await save('classSchedule',state.classSchedule);renderClassesPage();offerUndo('Class deleted',async()=>{state.classSchedule.splice(Math.min(idx,state.classSchedule.length),0,copy);await save('classSchedule',state.classSchedule);renderClassesPage();});};
    actions.appendChild(del);row.appendChild(actions);
    row.querySelector('.csubject').parentElement.onclick=()=>openClassEdit(c);
    wrap.appendChild(row);
  }
  function renderClassSubjectSuggestions(){
    const wrap=document.getElementById('class-subject-suggestions');if(!wrap)return;
    const input=document.getElementById('class-in-subject');const query=(input.value||'').trim().toLowerCase();
    const names=Array.isArray(state.config.classSubjectSuggestions)?state.config.classSubjectSuggestions:[];
    const shown=names.filter(name=>!query||name.toLowerCase().includes(query));wrap.innerHTML='';
    if(!shown.length){wrap.style.display='none';return;}wrap.style.display='flex';
    shown.forEach(name=>{const chip=document.createElement('span');chip.className='class-subject-suggestion';const pick=document.createElement('button');pick.type='button';pick.className='class-subject-pick exercise-chip';pick.textContent=name;pick.onclick=()=>{input.value=name;wrap.style.display='none';};const remove=document.createElement('button');remove.type='button';remove.className='class-subject-remove';remove.textContent='×';remove.title='Remove '+name+' from quick suggestions';remove.setAttribute('aria-label','Remove '+name+' suggestion');remove.onclick=async()=>{state.config.classSubjectSuggestions=names.filter(n=>n!==name);state.config.hiddenClassSubjectSuggestions=Array.isArray(state.config.hiddenClassSubjectSuggestions)?state.config.hiddenClassSubjectSuggestions:[];if(!state.config.hiddenClassSubjectSuggestions.some(n=>n.toLowerCase()===name.toLowerCase()))state.config.hiddenClassSubjectSuggestions.push(name);await save('config',state.config);renderClassSubjectSuggestions();showToast('Removed '+name+' from suggestions.');};chip.append(pick,remove);wrap.appendChild(chip);});
  }
  document.getElementById('class-in-subject').addEventListener('input',renderClassSubjectSuggestions);
  document.getElementById('class-in-subject').addEventListener('focus',renderClassSubjectSuggestions);
  document.getElementById('class-in-type').addEventListener('change',()=>{const gap=document.getElementById('class-in-type').value==='gap';document.getElementById('class-subject-field').style.display=gap?'none':'';document.getElementById('class-in-subject').placeholder='e.g. Mathematics';document.getElementById('class-subject-suggestions').style.display=gap?'none':'';document.getElementById('class-save-btn').textContent=gap?'Save free period':'Save class';});
  document.addEventListener('click',e=>{const wrap=document.getElementById('class-subject-suggestions');if(wrap&&!wrap.contains(e.target)&&e.target.id!=='class-in-subject')wrap.style.display='none';});

  function renderClassesPage(){
    renderClassSubjectSuggestions();
    const wrap=document.getElementById('class-days-wrap');wrap.innerHTML='';
    const makeGroup=(label,items)=>{if(!items.length)return;const section=document.createElement('section');section.className='class-day-group';const header=document.createElement('button');header.type='button';header.className='day-header collapsed';header.innerHTML='<span>'+label+'</span><span class="class-day-count">'+items.length+' class'+(items.length===1?'':'es')+' <span aria-hidden="true">⌄</span></span>';const list=document.createElement('div');list.className='class-day-items';list.hidden=true;items.forEach(item=>renderClassRow(list,item));header.onclick=()=>{list.hidden=!list.hidden;header.classList.toggle('collapsed',list.hidden);header.querySelector('.class-day-count').innerHTML=items.length+' class'+(items.length===1?'':'es')+' <span aria-hidden="true">'+(list.hidden?'⌄':'⌃')+'</span>';};section.append(header,list);wrap.appendChild(section);};
    const daily=state.classSchedule.filter(c=>c.day==='daily').sort((a,b)=>a.start.localeCompare(b.start));if(daily.length)makeGroup('Every day',daily,'daily');
    DAYS.forEach(day=>makeGroup(DAY_LABELS[day],state.classSchedule.filter(c=>c.day===day).sort((a,b)=>a.start.localeCompare(b.start))));
  }
  const classForm=document.getElementById('class-form');function closeClassForm(){classForm.style.display='none';document.getElementById('class-subject-suggestions').style.display='none';}document.getElementById('class-new-btn').addEventListener('click', ()=>{if(classForm.style.display!=='none'){closeClassForm();return;}document.getElementById('class-edit-id').value='';['class-in-subject','class-in-room','class-in-notes','class-in-start','class-in-end'].forEach(id=>document.getElementById(id).value='');document.getElementById('class-in-type').value='lecture';document.getElementById('class-in-type').dispatchEvent(new Event('change'));document.querySelectorAll('#class-day-picker .exercise-chip').forEach(b=>b.classList.remove('active'));classForm.style.display='block';renderClassSubjectSuggestions();});classForm.addEventListener('click',e=>{if(e.target===classForm)closeClassForm();});document.addEventListener('click',e=>{if(classForm.style.display==='none'||classForm.contains(e.target)||e.target.closest('#class-new-btn')||e.target.closest('#class-days-wrap .item-actions'))return;closeClassForm();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&classForm.style.display!=='none')closeClassForm();});
  document.getElementById('class-cancel-btn').addEventListener('click', closeClassForm);
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
    const type = document.getElementById('class-in-type').value;
    const subjectInput = document.getElementById('class-in-subject').value.trim();
    const subject = type==='gap'?'Free period':subjectInput;
    const start = document.getElementById('class-in-start').value;
    const end = document.getElementById('class-in-end').value;
    const selectedDays = Array.from(document.querySelectorAll('#class-day-picker .exercise-chip.active')).map(b=>b.dataset.day);
    if((type!=='gap'&&!subject)||!start||!end||end<=start||!selectedDays.length){showToast('Fill in the required fields, choose a valid time range, and pick at least one day.');return;}
    const room = document.getElementById('class-in-room').value.trim();
    const notes = document.getElementById('class-in-notes').value.trim();
    const editId=document.getElementById('class-edit-id').value;
    if(editId){const existing=state.classSchedule.find(x=>x.id===editId);if(existing)Object.assign(existing,{subject,room,notes,day:selectedDays[0],type,start,end});}
    else selectedDays.forEach((day,i)=>{state.classSchedule.push({id:'c-'+Date.now()+'-'+i,subject,room,notes,day,type,start,end});});
    await save('classSchedule', state.classSchedule);
    if(type!=='gap'&&!state.subjects.find(s=>s.name.toLowerCase()===subject.toLowerCase())){
      state.subjects.push({id:'subj-'+Date.now(), name:subject});
      await save('subjects', state.subjects);
    }
    state.config.classSubjectSuggestions=Array.isArray(state.config.classSubjectSuggestions)?state.config.classSubjectSuggestions:[];
    state.config.hiddenClassSubjectSuggestions=Array.isArray(state.config.hiddenClassSubjectSuggestions)?state.config.hiddenClassSubjectSuggestions:[];if(type!=='gap'&&!state.config.hiddenClassSubjectSuggestions.some(n=>n.toLowerCase()===subject.toLowerCase())&&!state.config.classSubjectSuggestions.some(n=>n.toLowerCase()===subject.toLowerCase())){state.config.classSubjectSuggestions.push(subject);await save('config',state.config);}
    ['class-in-subject','class-in-room','class-in-notes','class-in-start','class-in-end'].forEach(id=>document.getElementById(id).value='');
    document.querySelectorAll('#class-day-picker .exercise-chip').forEach(b=>b.classList.remove('active'));
    document.getElementById('class-form').style.display='none';
    document.getElementById('class-in-type').value='lecture';document.getElementById('class-in-type').dispatchEvent(new Event('change'));renderClassesPage(); showToast(type==='gap'?'Free period added.':'Class added, and linked to a Subject automatically.');
  });
  document.getElementById('class-make-subjects-btn').addEventListener('click', async ()=>{
    const names = Array.from(new Set(state.classSchedule.filter(c=>c.type!=='gap').map(c=>c.subject)));
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
      row.className = 'class-row dash-class-row '+c.type+(passed?' passed':'');
      row.style.marginBottom = '8px';
      const metaBits = [];
      if(c.room) metaBits.push('ROOM '+escapeHTML(c.room));
      const isGap=c.type==='gap';
      row.innerHTML =
        '<div class="dash-class-main">'+(isGap?'':'<div class="csubject">'+escapeHTML(c.subject)+'</div>')+
        (metaBits.length?'<div class="croom">'+metaBits.join(' · ')+'</div>':'')+
        '<span class="badge '+c.type+'" style="display:inline-block;margin-top:'+(isGap?'0':'7')+'px;">'+(isGap?'FREE PERIOD':escapeHTML(c.type))+'</span></div>'+
        '<div class="ctime dash-class-time">'+formatClassTime(c.start)+' – '+formatClassTime(c.end)+'</div>';
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
    const button=document.getElementById('refresh-app-btn');
    if(button.dataset.refreshing==='true') return;
    button.dataset.refreshing='true';
    button.disabled=true;
    button.setAttribute('aria-busy','true');
    const icon=button.querySelector('.settings-section-icon');
    if(icon) icon.innerHTML='<span class="settings-loading-spinner" aria-hidden="true"></span>';
    try{
      if('serviceWorker' in navigator){
        const regs=await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(reg=>reg.update().catch(()=>{})));
        for(const reg of regs){if(reg.waiting)reg.waiting.postMessage({type:'SKIP_WAITING'});}
      }
    }catch(e){console.warn('App update check failed',e);}
    window.location.reload();
  });

  const habitForm=document.getElementById('habit-form');
  function closeHabitForm(){habitForm.style.display='none';}
  document.getElementById('habit-new-btn').addEventListener('click', ()=>{
    if(habitForm.style.display!=='none'){closeHabitForm();return;}
    document.getElementById('habit-edit-id').value='';
    document.getElementById('habit-in-name').value='';
    document.getElementById('habit-in-time').value='';
    renderHabitWeeklyTimes({});
    document.querySelectorAll('#habit-day-picker .exercise-chip').forEach(b=>b.classList.toggle('active',b.dataset.day==='daily'));
    habitForm.style.display='block';
  });
  document.getElementById('habit-cancel-btn').addEventListener('click',closeHabitForm);
  habitForm.addEventListener('click',e=>{if(e.target===habitForm)closeHabitForm();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&habitForm.style.display!=='none')closeHabitForm();});
  document.querySelectorAll('#habit-day-picker .exercise-chip').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(btn.dataset.day==='daily'){
        const active=!btn.classList.contains('active');
        document.querySelectorAll('#habit-day-picker .exercise-chip').forEach(b=>b.classList.remove('active'));
        if(active) btn.classList.add('active');
      }else{
        document.querySelector('#habit-day-picker [data-day="daily"]').classList.remove('active');
        btn.classList.toggle('active');
      }
    });
  });
  document.getElementById('habit-save-btn').addEventListener('click', async ()=>{
    const name = document.getElementById('habit-in-name').value.trim();
    if(!name){ showToast('Name the habit.'); return; }
    const time = document.getElementById('habit-in-time').value||null;
    const weeklyTimes=readHabitWeeklyTimes();
    const selectedDays = Array.from(document.querySelectorAll('#habit-day-picker .exercise-chip.active')).map(b=>b.dataset.day);
    if(!selectedDays.length){ showToast('Pick at least one day.'); return; }
    const editId=document.getElementById('habit-edit-id').value;
    if(editId){const h=state.habits.find(x=>x.id===editId);if(h){h.name=name;h.time=time;h.days=selectedDays;h.weeklyTimes=weeklyTimes;}}
    else state.habits.push({id:'h-'+Date.now(), name, time, days:selectedDays, weeklyTimes, preset:false});
    renderHabitGrid();renderStatbar();renderDashboard();
    await save('habits', state.habits);
    document.getElementById('habit-in-name').value=''; document.getElementById('habit-in-time').value=''; renderHabitWeeklyTimes({}); document.getElementById('habit-edit-id').value='';
    document.querySelectorAll('#habit-day-picker .exercise-chip').forEach(b=>b.classList.remove('active'));
    document.getElementById('habit-day-picker [data-day="daily"]').classList.add('active');
    document.getElementById('habit-form').style.display='none';
    showToast(editId?'Habit updated.':'Habit added.');
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
  document.getElementById('cal-add-btn').addEventListener('click', ()=>{ document.getElementById('cal-form').style.display='block'; document.getElementById('event-edit-id').value='';document.getElementById('ev-date').value=calSelectedDate||todayKey();document.getElementById('ev-time').value='09:00';document.getElementById('ev-reminder').value='default';document.getElementById('ev-title').focus(); });
  document.getElementById('ev-cancel').addEventListener('click', ()=>{ document.getElementById('cal-form').style.display='none'; document.getElementById('ev-title').value=''; document.getElementById('ev-notes').value=''; document.getElementById('event-edit-id').value=''; });
  document.getElementById('ev-save').addEventListener('click', async ()=>{
    const title = document.getElementById('ev-title').value.trim();
    if(!title){ showToast('Give it a title.'); return; }
    const editId=document.getElementById('event-edit-id').value, reminderValue=document.getElementById('ev-reminder').value, vals={title,type:document.getElementById('ev-type').value,date:document.getElementById('ev-date').value||null,time:document.getElementById('ev-time').value||'09:00',reminderHours:reminderValue==='default'?Number(state.config.settings.calendarReminderHours??24):Number(reminderValue),notes:document.getElementById('ev-notes').value.trim()};
    if(editId){const ev=state.events.find(x=>x.id===editId);if(ev)Object.assign(ev,vals);}else state.events.push({id:'ev-'+Date.now(),...vals,done:false});
    await save('events', state.events);
    document.getElementById('cal-form').style.display='none'; document.getElementById('ev-title').value=''; document.getElementById('ev-notes').value='';
    renderAllCalendarBits(); await syncPushIfEnabled(); showToast('Saved.');
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
    await syncPushIfEnabled();renderCustomReminders();showToast('Saved.');
  });
  document.getElementById('reset-btn').addEventListener('click', async ()=>{
    if(!await nexaConfirm('Reset all data?','This permanently deletes all Nexa data on this device.','Reset everything')) return;
    localStorage.clear();
    state = {exercises:JSON.parse(JSON.stringify(DEFAULT_EXERCISES)), logs:[], events:[], nutrition:{}, tasks:[], habits:JSON.parse(JSON.stringify(DEFAULT_HABITS)), habitLogs:{},
      classSchedule:[], subjects:[], subjectItems:[], health:{steps:{},sleep:{},weight:[]},prayerLogs:{},customReminders:[],
      config:{plan:Object.assign({},DEFAULT_PLAN), settings:{calendarReminderHours:24,notifications:{classes:true,habits:true,prayer:true,events:true},notificationLead:{classes:15,habits:0,prayer:0,events:0}}, dashboardOrder:['classes','train','nutrition','habits','tasks','calendar','prayer'],classSubjectSuggestions:[]}};
    for(const k of ['exercises','logs','events','nutrition','tasks','habits','habitLogs','prayerLogs','customReminders','classSchedule','subjects','subjectItems','health','config']) await save(k, state[k]);
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
          customReminders:JSON.parse(localStorage.getItem('cb_customReminders')||'[]'),
          habits:JSON.parse(localStorage.getItem('cb_habits')||'[]'),
          habitLogs:JSON.parse(localStorage.getItem('cb_habitLogs')||'{}'),
          classes:JSON.parse(localStorage.getItem('cb_classSchedule')||'[]'),
          notificationSettings:(JSON.parse(localStorage.getItem('cb_config')||'{}').settings||{}).notifications||{classes:true,tasks:true,habits:true,prayer:true,events:true},
          notificationLead:(JSON.parse(localStorage.getItem('cb_config')||'{}').settings||{}).notificationLead||{classes:15,tasks:0,habits:0,prayer:0,events:0},
          calendarReminderHours:(JSON.parse(localStorage.getItem('cb_config')||'{}').settings||{}).calendarReminderHours??24
        }
      })
    });
    if(!response.ok) throw new Error('Could not save push subscription');
    return subscription;
  }
  async function setupNexaNotifications(){
    const status=document.getElementById('notification-status');
    if(!('serviceWorker' in navigator)) {
      if(status) status.textContent='Service workers are not supported in this browser.';
      return;
    }
    try{
      const hadController=!!navigator.serviceWorker.controller;
      const reg=await navigator.serviceWorker.register('./service-worker.js',{updateViaCache:'none'});
      reg.update().catch(()=>{});
      if(reg.waiting) reg.waiting.postMessage({type:'SKIP_WAITING'});
      if(hadController&&!window.__nexaUpdateListener){
        window.__nexaUpdateListener=true;
        navigator.serviceWorker.addEventListener('controllerchange',()=>{
          const status=document.getElementById('notification-status');
          if(status)status.textContent='Nexa update ready. Tap Refresh app to reload safely.';
        });
      }
      if(!('Notification' in window) || !('PushManager' in window)){
        if(status) status.textContent='App updates are enabled; notifications are not supported in this browser.';
        return;
      }
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
