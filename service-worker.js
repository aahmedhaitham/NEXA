const CACHE='nexa-v3';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg','./push-config.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return r;}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));});
self.addEventListener('push',event=>{let data={};try{data=event.data?event.data.json():{};}catch(_){data={body:event.data?event.data.text():''};}
event.waitUntil(self.registration.showNotification(data.title||'Nexa',{body:data.body||'You have a reminder.',icon:'./icon.svg',badge:'./icon.svg',tag:data.tag||'nexa-reminder',data:{url:data.url||'./'}}));});
self.addEventListener('notificationclick',event=>{event.notification.close();const target=new URL((event.notification.data&&event.notification.data.url)||'./',self.registration.scope).href;
event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if(c.url.startsWith(self.registration.scope)&&'focus'in c){c.navigate(target);return c.focus();}}return clients.openWindow?clients.openWindow(target):undefined;}));});