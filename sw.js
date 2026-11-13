const C='edd-v6';
const F=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','emblem.png','card.jpg','foto.jpg','foto-2.jpg','foto-3.jpg','fonts/roboto-latin.woff2','fonts/roboto-latin-ext.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
